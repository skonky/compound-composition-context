import ProductCard from "../product-card";
import { Product } from "../product-card-context";

type ProductCardPortrait = {
  productId: string;
  onAddToCart: (product: Product) => void;
  bonus?: boolean;
};

export const ProductCardPortrait = ({
  productId,
  onAddToCart,
  bonus = false,
}: ProductCardPortrait) => {
  return (
    <ProductCard
      className="max-w-[400px] w-full m-auto md:w-auto md:max-w-full md:m-0"
      bonus={bonus}
      key={productId}
      productId={productId}
      name={<ProductCard.Name />}
      tags={<ProductCard.Tags />}
      image={<ProductCard.ImagePortrait />}
      price={<ProductCard.Price />}
      actions={<ProductCard.Actions onAddToCart={onAddToCart} />}
    />
  );
};
