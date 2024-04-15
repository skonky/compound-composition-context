import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useProduct } from "../product-card-context";

export const ProductCardImagePortrait = ({ ratio }: { ratio?: number }) => {
  const { product } = useProduct();
  return (
    <div className="w-full overflow-hidden p-8">
      <AspectRatio ratio={ratio || 4 / 4}>
        <img src={product.image.portrait.url} />
      </AspectRatio>
    </div>
  );
};
