import { PropsWithChildren, ReactNode } from "react";
import { useQuery } from "urql";
import { ProductCardPrice } from "./components/product-card-price";
import { ProductCardImagePortrait } from "./components/product-card-portrait-image";
import { ProductCardImageLandscape } from "./components/product-card-landscape-image";
import { ProductCardActions } from "./components/product-card-actions";
import { ProductCardTags } from "./components/product-card-tags";
import { ProductCardActionsWine } from "./components/product-card-actions-wine";
import { ProductCardContext, useProduct } from "./product-card-context";
import ProductQuery from "./queries/product-query";
import { cn } from "../utils";

type ProductCard = {
  image?: ReactNode;
  name?: ReactNode;
  price?: ReactNode;
  actions?: ReactNode;
  tags?: ReactNode;
  productId: string;
  className?: string;
  bonus?: boolean;
};

const ProductCard = ({
  image = null,
  name = null,
  price = null,
  productId,
  className,
  tags = null,
  actions = null,
}: PropsWithChildren<ProductCard>) => {
  // guards
  const hasPrice = Boolean(price);
  const hasName = Boolean(name);
  const hasImage = Boolean(image);
  const hasActions = Boolean(actions);
  const hasTags = Boolean(tags);
  const hasPriceOrName = hasPrice || hasName; // if either is present we need to render some markup
  const hasPriceAndName = hasPrice && hasName; // if both are present we need to render a divider

  const [result] = useQuery({
    query: ProductQuery,
    variables: { id: productId },
  });

  const { data, fetching, error } = result;

  if (fetching)
    return (
      <div className="w-full rounded-lg bg-gray-200 transition-colors animate-pulse h-96"></div>
    );

  if (error) return <p>Oh no... {error.message}</p>;
  if (!data || !data.product) return <p>No data</p>;

  return (
    <ProductCardContext.Provider
      value={{
        product: {
          id: data.product.id,
          name: data.product.title,
          image: {
            portrait: {
              url:
                data.product.image?.portrait.url ||
                "https://via.placeholder.com/250x350",
            },
            landscape: {
              url:
                data.product.image?.landscape.url ||
                "https://via.placeholder.com/650x250",
            },
          },
          price: {
            value: data.product.price?.value || 0,
            currency: data.product.price?.currency || "EUR",
          },
        },
      }}
    >
      <div
        className={cn(
          className,
          "relative text-center border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        )}
      >
        {hasImage && <div>{image}</div>}
        {hasTags && <div>{tags}</div>}
        {hasPriceOrName && (
          <div className="p-3">
            {hasName && name}
            {hasPriceAndName && <hr className="m-2" />}
            {hasPrice && price}
          </div>
        )}
        {hasActions && <div className="mb-3">{actions}</div>}
      </div>
    </ProductCardContext.Provider>
  );
};

const ProductCardName = () => {
  const { product } = useProduct();
  return <h2 className="h-12 overflow-hidden text-ellipsis">{product.name}</h2>;
};

ProductCard.ImagePortrait = ProductCardImagePortrait;
ProductCard.ImageLandscape = ProductCardImageLandscape;
ProductCard.Name = ProductCardName;
ProductCard.Price = ProductCardPrice;
ProductCard.Actions = ProductCardActions;
ProductCard.Tags = ProductCardTags;
ProductCard.ActionsWine = ProductCardActionsWine;

export default ProductCard;
