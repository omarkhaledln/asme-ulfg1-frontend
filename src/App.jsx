import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import ResourcesPage from "./pages/ResourcesPage";
import MembersPage from "./pages/MembersPage";


import "./styles/main.css";

export default function App() {
  const [cart, setCart] = useState([]);

  const [toast, setToast] = useState("");

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    setToast("Item added to cart!");
    setTimeout(() => setToast(""), 1500);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );

    setToast("Item removed from cart");
    setTimeout(() => setToast(""), 1500);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Router>
      <div className="app-shell">
        <Header cartCount={cartCount} />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/" element={<Navigate to="/products" replace />} /> */}
            <Route
              path="/products"
              element={<ProductsPage onAddToCart={handleAddToCart} cart={cart} />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
             <Route path="/members" element={<MembersPage />} />
            <Route
              path="/cart"
              element={
                <CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} />
              }
            />
            <Route
              path="*"
              element={<div style={{ padding: "2rem" }}>Not found</div>}
            />
          </Routes>
        </main>
        <Footer />
        {toast && <div className="toast">{toast}</div>}
      </div>
    </Router>
  );
}
