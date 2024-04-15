import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./cart/cart-context.tsx";
import { Provider, createClient, cacheExchange, fetchExchange } from "urql";

const client = createClient({
  url: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clv0x437c1rl707wb5djll7cb/master",
  exchanges: [cacheExchange, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <Provider value={client}>
        <App />
      </Provider>
    </CartProvider>
  </React.StrictMode>,
);
