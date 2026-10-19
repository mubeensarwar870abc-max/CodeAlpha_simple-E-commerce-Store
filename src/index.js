import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import { StoreProvider } from "./Context/StoreContext";
import { AdminProvider } from "./Context/AdminContext";
import { OrderProvider } from "./Context/OrderContext";
import { ThemeProvider } from "./Context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <StoreProvider>
          <AdminProvider>
            <OrderProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </OrderProvider>
          </AdminProvider>
        </StoreProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
