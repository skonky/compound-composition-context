import { useMemo, useState } from "react";
import { Product } from "../product-card/product-card-context";
import { CartItem, useCart } from "./cart-context";
import { cn } from "../utils";
import { Button } from "@adhese/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@adhese/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@adhese/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

type CartComponent = {
  items?: CartItem<Product>[];
  totalPrice: number;
};

export const CartComponent = ({ totalPrice }: CartComponent) => {
  const cart = useCart();
  const items = useMemo(() => cart.items, [cart.items]);
  const [open, setOpen] = useState(false);

  if (totalPrice === 0)
    return (
      <div className="text-left text-muted-foreground z-10 py-3">
        Cart is empty
      </div>
    );

  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <CollapsibleTrigger className="flex gap-2" asChild>
        <Button variant="outline" size="default" className="my-3">
          <ChevronUp
            size={18}
            className={cn(open ? "rotate-180" : "rotate-0", "transition-all")}
          />
          {open ? "Hide cart" : "Show cart"}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">Lijstje:</div>
          {items.map(item => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <div>
                  <div
                    className={cn(
                      "grid grid-cols-3",
                      item.bonus && "text-orange-500"
                    )}
                  >
                    <p className="text-xs truncate col-span-2">
                      <span className="text-muted-foreground inline-block w-6">
                        {item.quantity}x
                      </span>{" "}
                      {item.name}
                    </p>
                    <div className="flex items-center col-span-1 justify-end gap-1">
                      <span className="text-xs">
                        € {(item.price.value * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className="text-[10px]"
                        onClick={() =>
                          cart.decreaseQuantityOrRemoveProduct(
                            item.id,
                            item.quantity
                          )
                        }
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                  <TooltipContent>{item.name}</TooltipContent>
                </div>
              </TooltipTrigger>
            </Tooltip>
          ))}
          <div className="flex flex-col gap-2 text-right">
            <hr />
            <p className="text-xs mr-1 text-muted-foreground">
              Sub Total: € {totalPrice.toFixed(2)}
            </p>
            <p className="text-xs mr-1 text-muted-foreground">
              VAT(21%): € {(totalPrice * 0.21).toFixed(2)}
            </p>
            <p className="text-xs mr-1 font-bold">
              Total: € {totalPrice.toFixed(2)}
            </p>
            <hr />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
