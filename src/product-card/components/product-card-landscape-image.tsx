import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useProduct } from "../product-card-context";

export const ProductCardImageLandscape = () => {
  const { product } = useProduct();
  return (
    <div className="w-full overflow-hidden">
      <AspectRatio ratio={6 / 2.5}>
        <img
          className="object-fill"
          src={product.image.landscape.url}
          alt={product.name}
        />
      </AspectRatio>
    </div>
  );
};
