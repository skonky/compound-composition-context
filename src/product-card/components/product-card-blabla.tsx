import { useProduct } from "../product-card-context";

export const Bla = () => {
  const { product } = useProduct();
  const abHeader = true;
  if (abHeader) {
    return <p className="bg-emerald-500">{product.price.value}</p>;
  }
  return <p className="bg-red-500">{product.price.value}</p>;
};
