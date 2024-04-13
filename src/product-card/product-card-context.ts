import { createContext, useContext } from "react";
type Product = {
  id: string;
  name: string;
  price: {
    currency: string;
    value: number;
  };
  image: {
    url: string;
  };
};

type ProductCardContext = {
  product: Product;
};

const ProductCardContext = createContext<ProductCardContext | null>(null);

function useProductCard() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error("useProductCard must be used within a ProductCardProvider");
  }

  return context;
}

export { useProductCard, ProductCardContext, type Product };
