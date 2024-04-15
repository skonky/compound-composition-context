import { useMemo, useState } from "react";
import { Product } from "../product-card/product-card-context";
import { CartItem, useCart } from "./cart-context";
import { cn } from "../utils";

type CartComponent = {
  items?: CartItem<Product>[];
  totalPrice: number;
};

export const CartComponent = ({ totalPrice }: CartComponent) => {
  const cart = useCart();
  const items = useMemo(() => cart.items, [cart.items]);
  const [collapsed, setCollapsed] = useState(true);

  if (totalPrice === 0)
    return (
      <div className="text-gray-700 bg-white z-10 p-3 shadow-md w-40 ml-auto">
        Cart is empty
      </div>
    );
  return (
    <div
      className={cn(
        "bg-white p-2 shadow-md mb-10 text-right",
        collapsed && "w-40 ml-auto",
      )}
    >
      <div className="flex gap-3 justify-end">
        <p className="text-xl font-black">€ {totalPrice.toFixed(2)} </p>
        {!collapsed && <button onClick={cart.emptyCart}>🗑️</button>}
      </div>
      <hr className="my-3" />
      {!collapsed ? (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex gap-5 items-center justify-between",
                item.bonus && "text-orange-500",
              )}
            >
              <p className="text-xs">
                {item.name} ({item.quantity})
              </p>
              <div className="flex items-center">
                <span className="text-xs">
                  € {(item.price.value * item.quantity).toFixed(2)}
                </span>
                <button
                  className="ml-3 text-xs"
                  onClick={() =>
                    cart.decreaseQuantityOrRemoveProduct(item.id, item.quantity)
                  }
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <hr />
            <p className="text-xs text-right mr-6">
              Sub Total: € {totalPrice.toFixed(2)}
            </p>
            <p className="text-xs text-right mr-6">
              VAT(21%): € {(totalPrice * 0.21).toFixed(2)}
            </p>
            <p className="text-xs text-right mr-6 font-bold">
              Total: € {totalPrice.toFixed(2)}
            </p>
            <hr />
          </div>

          <button
            className="text-xs text-right pr-4"
            onClick={() => setCollapsed(true)}
          >
            🙈 Hide cart
          </button>
        </div>
      ) : (
        <button
          className="text-xs text-right"
          onClick={() => setCollapsed(false)}
        >
          👀 Show cart
        </button>
      )}
    </div>
  );
};
