import { useProduct } from "../product-card-context";

export const ProductCardTags = () => {
  const { product } = useProduct();
  return (
    <div className="flex gap-3 justify-center items-center py-2 h-8">
      {product.bonus && (
        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-lg">
          Bonus
        </span>
      )}
    </div>
  );
};
