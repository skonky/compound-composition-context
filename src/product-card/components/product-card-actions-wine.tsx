import { MouseEvent, useMemo } from "react";
import { Product, useProduct } from "../product-card-context";
import { useCart } from "../../cart/cart-context";
import { cn } from "../../utils";

type ProductCardActions = {
  onAddToCart: (product: Product) => void;
};
export const ProductCardActionsWine = ({ onAddToCart }: ProductCardActions) => {
  const { product } = useProduct();
  const cart = useCart();
  const cartItems = useMemo(() => cart.items, [cart.items]);
  const itemInCart = cartItems.find((item) => item.id === product.id);

  const handleOnClickAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart(product);
  };

  const handleOnClickDecreaseOrRemoveFromCart = (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    cart.decreaseQuantityOrRemoveProduct(product.id, 1);
  };

  return (
    <div className="flex gap-4 items-center justify-center p-3">
      WIJN
      {!itemInCart ? (
        <button
          onClick={handleOnClickAddToCart}
          className={cn(
            "bg-black text-xs px-5 py-2 text-white rounded-full",
            product.bonus && "bg-orange-500 text-white",
          )}
        >
          Add to cart
        </button>
      ) : (
        <>
          <button
            onClick={handleOnClickAddToCart}
            className={cn(
              "bg-black text-xs px-3 py-2 text-white rounded-full",
              product.bonus && "bg-orange-500 text-white",
            )}
          >
            +
          </button>
          {itemInCart.quantity}
          <button
            onClick={handleOnClickDecreaseOrRemoveFromCart}
            className={cn(
              "bg-gray-200 text-xs px-3 py-2 text-black rounded-full",
              product.bonus && "bg-orange-300 text-white",
            )}
          >
            -{" "}
          </button>
        </>
      )}
    </div>
  );
};
