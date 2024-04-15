import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Product } from "../product-card/product-card-context";

type CartItem<T> = {
  quantity: number;
  id: string;
  totalPrice: {
    currency: string;
    value: number;
  };
} & T;

type CartContext = {
  items: CartItem<Product>[];
  addProductToCart: (product: Product) => void;
  decreaseQuantityOrRemoveProduct: (
    productId: string,
    quantity: number,
  ) => void;
  getTotalCartPrice: () => number;
  getTotalCartItems: () => number;
  emptyCart: () => void;
};

const CartContext = createContext<CartContext | null>(null);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem<Product>[]>([]);

  function getTotalCartPrice() {
    return items.reduce(
      (acc, item) => acc + item.price.value * item.quantity,
      0,
    );
  }

  function getTotalCartItems() {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }
  function emptyCart() {
    setItems([]);
  }

  function decreaseQuantityOrRemoveProduct(
    productId: string,
    quantity: number = 1,
  ) {
    const item = items.find((item) => item.id === productId);
    if (item?.quantity === quantity) {
      setItems(items.filter((item) => item.id !== productId));
      return;
    }
    if (item?.quantity && item.quantity <= 1) {
      setItems(items.filter((item) => item.id !== productId));
    } else {
      setItems(
        items.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - quantity,
                totalPrice: {
                  currency: item.totalPrice.currency,
                  value: item.totalPrice.value - item.price.value,
                },
              }
            : item,
        ),
      );
    }
  }

  function addProductToCart(product: Product) {
    const itemAlreadyInCart = items.find((item) => item.id === product.id);

    if (itemAlreadyInCart) {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: {
                  currency: item.totalPrice.currency,
                  value: item.totalPrice.value + product.price.value,
                },
              }
            : item,
        ),
      );
    } else {
      setItems([
        ...items,
        {
          ...product,
          quantity: 1,
          totalPrice: {
            currency: product.price.currency,
            value: product.price.value,
          },
        },
      ]);
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addProductToCart,
        getTotalCartItems,
        getTotalCartPrice,
        decreaseQuantityOrRemoveProduct,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export { CartContext, CartProvider, useCart, type CartItem };
