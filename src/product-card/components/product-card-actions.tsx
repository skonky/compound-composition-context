import { MouseEvent, useMemo } from "react";
import { Product, useProduct } from "../product-card-context";
import { useCart } from "../../cart/cart-context";
import { cn } from "../../utils";
import { Button } from "@adhese/ui/button";

type ProductCardActions = {
  onAddToCart: (product: Product) => void;
};
export const ProductCardActions = ({ onAddToCart }: ProductCardActions) => {
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
      {!itemInCart ? (
        <Button
          onClick={handleOnClickAddToCart}
          className={cn(
            "text-white",
            product.bonus && "bg-orange-500 text-white",
          )}
        >
          Add to cart
        </Button>
      ) : (
        <>
          <Button
            size="icon"
            onClick={handleOnClickAddToCart}
            className={cn(product.bonus && "bg-orange-500 text-white")}
          >
            +
          </Button>
          {itemInCart.quantity}
          <Button
            size="icon"
            onClick={handleOnClickDecreaseOrRemoveFromCart}
            className={cn(product.bonus && "bg-orange-300 text-white")}
          >
            -{" "}
          </Button>
        </>
      )}
    </div>
  );
};
