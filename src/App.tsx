import { Routes, Route, Outlet, Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import "./App.css";
import { CartComponent } from "./cart/cart";
import { CartProvider, useCart } from "./cart/cart-context";
import ProductCard from "./product-card/product-card";
import { ProductCardLandscape } from "./product-card/variants/product-card-landscape";
import { ProductCardPortrait } from "./product-card/variants/product-card-portrait";
import {
  Provider,
  cacheExchange,
  createClient,
  fetchExchange,
  useQuery,
} from "urql";
import ProductsQuery, {
  useProducts,
} from "./product-card/queries/products-query";
import { TooltipProvider } from "@adhese/ui/tooltip";

const client = createClient({
  url: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clv0x437c1rl707wb5djll7cb/master",
  exchanges: [cacheExchange, fetchExchange],
});

export default function App() {
  return (
    <div>
      <CartProvider>
        <TooltipProvider>
          <Provider value={client}>
            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="dashboard" element={<Dashboard />} />
                {/* Using path="*"" means "match anything", so it acts
                like a catch-all for URLs that we don't have explicit
                routes for. */}
              </Route>
            </Routes>
          </Provider>
        </TooltipProvider>
      </CartProvider>
    </div>
  );
}
function Layout() {
  const cart = useCart();
  return (
    <div className="flex items-start gap-4 p-3">
      <StickyBox offsetTop={12} offsetBottom={20}>
        <div className="w-64 bg-gray-200 rounded-xl p-4">
          <nav className="">
            <ul className="text-left flex flex-col gap-3">
              <li className="border-b pb-2 border-gray-300">
                <Link to="/">Home</Link>
              </li>
              <li className="border-b pb-2 border-gray-300">
                <Link to="/products">Products</Link>
              </li>
            </ul>
            <CartComponent totalPrice={cart.getTotalCartPrice()} />
          </nav>
        </div>
      </StickyBox>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function Home() {
  const products = useProducts();
  const cart = useCart();

  if (typeof products === "boolean") {
    if (products) return <p>Fetching products</p>;
  }

  if (products instanceof Error) {
    return <p>Oh no... {products.message}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Heehe</h2>
      <div className="grid grid-cols-2 gap-3">
        {products?.map((product: { id: string }) => (
          <ProductCardLandscape
            onAddToCart={cart.addProductToCart}
            key={product.id}
            productId={product.id}
          />
        ))}
      </div>
    </div>
  );
}

function Products() {
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
      <div className="max-w-3xl m-auto">
        <h2 className="text-2xl font-semibold mb-3">All products</h2>
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
                price={<ProductCard.Price />}
                name={<ProductCard.Name />}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
