import { createContext, useContext } from "react";
type Product = {
  id: string;
  name: string;
  bonus?: boolean;
  price: {
    currency: string;
    value: number;
  };
  image: {
    portrait: {
      url: string;
    };
    landscape: {
      url: string;
    };
  };
};

type ProductCardContext = {
  product: Product;
};

const ProductCardContext = createContext<ProductCardContext | null>(null);

function useProduct() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductCard.* Component");
  }

  return context;
}

export { useProduct, ProductCardContext, type Product };
