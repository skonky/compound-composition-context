import { useProduct } from "../product-card-context";

export const ProductCardPrice = () => {
  const { product } = useProduct();
  return <p className="mt-4">€ {product.price.value.toFixed(2)}</p>;
};
