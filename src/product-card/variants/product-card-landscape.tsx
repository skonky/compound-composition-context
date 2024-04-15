import ProductCard from "../product-card";
import { Product } from "../product-card-context";

type ProductCardLandscape = {
  productId: string;
  onAddToCart: (product: Product) => void;
};

export const ProductCardLandscape = ({
  productId,
  onAddToCart,
}: ProductCardLandscape) => {
  return (
    <ProductCard
      key={productId}
      productId={productId}
      name={<ProductCard.Name />}
      image={<ProductCard.ImageLandscape />}
      price={<ProductCard.Price />}
      actions={<ProductCard.Actions onAddToCart={onAddToCart} />}
    />
  );
};
