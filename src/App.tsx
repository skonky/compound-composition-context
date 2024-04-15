import "./App.css";
import { CartComponent } from "./cart/cart";
import { useCart } from "./cart/cart-context";
import ProductCard from "./product-card/product-card";
import { Product } from "./product-card/product-card-context";
import { ProductCardLandscape } from "./product-card/variants/product-card-landscape";
import { ProductCardPortrait } from "./product-card/variants/product-card-portrait";

const products = [
  {
    id: "1",
    name: "Bolletje Zoute pepsels",
    price: {
      currency: "USD",
      value: 2.45,
    },
    image: {
      portrait: {
        url: "https://static.ah.nl/dam/product/AHI_43545239393837313536?revLabel=1&rendition=400x400_JPG_Q85&fileType=binary",
      },
      landscape: {
        url: "https://via.placeholder.com/600x250",
      },
    },
  },
  {
    id: "2",
    name: "Lay's Oven baked roasted paprika",
    price: {
      currency: "USD",
      value: 2,
    },
    bonus: true,
    image: {
      portrait: {
        url: "https://static.ah.nl/dam/product/AHI_43545239373932383836?revLabel=2&rendition=400x400_JPG_Q85&fileType=binary",
      },
      landscape: {
        url: "https://via.placeholder.com/600x250",
      },
    },
  },
  {
    id: "3",
    name: "Oma's rendang",
    price: {
      currency: "USD",
      value: 4.75,
    },
    image: {
      portrait: {
        url: "https://static.ah.nl/mam/bonus/AHMAM_PRD742904?rendition=708px&fileType=binary",
      },
      landscape: {
        url: "https://via.placeholder.com/600x250",
      },
    },
  },
  {
    id: "4",
    name: "AH Perla napoli",
    price: {
      currency: "USD",
      value: 8.21,
    },
    bonus: true,
    image: {
      portrait: {
        url: "https://static.ah.nl/dam/product/AHI_43545239373938373536?revLabel=1&rendition=400x400_JPG_Q85&fileType=binary",
      },
      landscape: {
        url: "https://via.placeholder.com/600x250",
      },
    },
  },
] satisfies Product[];

function App() {
  const cart = useCart();
  return (
    <>
      <CartComponent totalPrice={cart.getTotalCartPrice()} />
      <h1 className="text-4xl mb-5 font-bold">Compound Composition Webshop</h1>
      <div className="max-w-3xl m-auto">
        <h2 className="text-2xl font-semibold mb-3">Product card portrait</h2>
        <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCardPortrait
              key={product.id}
              product={product}
              bonus={product.bonus}
              onAddToCart={cart.addProductToCart}
            />
          ))}
        </div>
        <div>
          <h2 className="text-3xl font-semibold mt-16 mb-3">
            Product card landscape
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCardLandscape
                onAddToCart={cart.addProductToCart}
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mt-16 mb-3">
            Custom compo without buttons
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                image={<ProductCard.ImageLandscape />}
                name={<ProductCard.Name />}
                price={<ProductCard.Bla />}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
