import { PropsWithChildren, ReactNode } from "react";
import {
  ProductCardContext,
  Product,
  useProduct,
} from "./product-card-context";
import { cn } from "../utils";
import { ProductCardPrice } from "./components/product-card-price";
import { ProductCardImagePortrait } from "./components/product-card-portrait-image";
import { ProductCardImageLandscape } from "./components/product-card-landscape-image";
import { ProductCardActions } from "./components/product-card-actions";
import { ProductCardTags } from "./components/product-card-tags";
import { ProductCardActionsWine } from "./components/product-card-actions-wine";
import { Bla } from "./components/product-card-blabla";

type ProductCard = {
  image?: ReactNode;
  name?: ReactNode;
  price?: ReactNode;
  actions?: ReactNode;
  tags?: ReactNode;
  product: Product;
  className?: string;
  bonus?: boolean;
};

const ProductCard = ({
  image = null,
  name = null,
  price = null,
  product,
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

  return (
    <ProductCardContext.Provider value={{ product }}>
      <div
        className={cn(
          className,
          "border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow",
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
        {hasActions && <div>{actions}</div>}
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
ProductCard.Bla = Bla;

export default ProductCard;
