import { PropsWithChildren } from "react";
import { ProductCardContext, Product } from "./product-card-context";

const ProductCard = ({ product }: PropsWithChildren<{ product: Product }>) => {
  <ProductCardContext.Provider
    value={{ product }}
  ></ProductCardContext.Provider>;
};

export default ProductCard;
