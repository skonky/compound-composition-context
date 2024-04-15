import "./App.css";
import { CartComponent } from "./cart/cart";
import { useCart } from "./cart/cart-context";
import ProductCard from "./product-card/product-card";
import { ProductCardLandscape } from "./product-card/variants/product-card-landscape";
import { ProductCardPortrait } from "./product-card/variants/product-card-portrait";
import { gql, useQuery } from "urql";

const ProductsQuery = gql`
  #graphql
  {
    products {
      id
    }
  }
`;

function App() {
  const cart = useCart();
  const [result] = useQuery({
    query: ProductsQuery,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Fetching products</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  if (!data || !data.products) return <p>No data</p>;

  return (
    <>
      <CartComponent totalPrice={cart.getTotalCartPrice()} />
      <h1 className="text-4xl mb-5 font-bold">Compound Composition Webshop</h1>
      <div className="max-w-3xl m-auto">
        <h2 className="text-2xl font-semibold mb-3">Product card portrait</h2>
        <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.products.map((product: { id: string }) => (
            <ProductCardPortrait
              key={product.id}
              productId={product.id}
              onAddToCart={cart.addProductToCart}
            />
          ))}
        </div>
        <div>
          <h2 className="text-3xl font-semibold mt-16 mb-3">
            Product card landscape
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.products.map((product: { id: string }) => (
              <ProductCardLandscape
                onAddToCart={cart.addProductToCart}
                key={product.id}
                productId={product.id}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mt-16 mb-3">
            Custom composition with only an image
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.products.map((product: { id: string }) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                image={<ProductCard.ImageLandscape />}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
