import ProductCard from "../product-card";
import { Product } from "../product-card-context";

type ProductCardLandscape = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export const ProductCardLandscape = ({
  product,
  onAddToCart,
}: ProductCardLandscape) => {
  return (
    <ProductCard
      key={product.id}
      product={product}
      name={<ProductCard.Name />}
      image={<ProductCard.ImageLandscape />}
      price={<ProductCard.Price />}
      actions={<ProductCard.Actions onAddToCart={onAddToCart} />}
    />
  );
};
