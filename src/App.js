import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import ChooseUs from "./components/ChooseUs";
import Testimonials from "./components/Testimonials";
import Offers from "./components/Offers";
import ScrollToHash from "./components/ScrollToHash";
import CategoryPage from "./components/CategoryPage";

import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderStatus from "./pages/OrderStatus";

import Books from "./pages/books";
import OfficeSupplies from "./pages/OfficeSupplies";
import KidsStationary from "./pages/KidsStationary";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminFeatured from "./pages/admin/AdminFeatured";
import AdminOffers from "./pages/admin/AdminOffers";
import AdminSettings from "./pages/admin/AdminSettings";

import {
  AdminProtectedRoute,
  AdminPublicRoute,
} from "./components/AdminRoute";

import { useCart } from "./Context/CartContext";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  // Existing CartContext logic
  const {
    cartItems,
    addToCart,
    removeFromCart,
  } = useCart();

  // Calculate total cart quantity
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Add product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Remove product from cart
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  // Props used by category pages
  const categoryPageProps = {
    onAddToCart: handleAddToCart,
    onRemoveFromCart: handleRemoveFromCart,
    isMenuOpen,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ScrollToHash />

      <Navbar
        cartCount={cartCount}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <section id="hero" className="scroll-mt-24">
                <HeroSection />
              </section>

              <section id="categories" className="scroll-mt-20">
                <CategoryCard />
              </section>

              <section id="products" className="scroll-mt-20">
                <ProductCard
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              </section>

              <section id="why-choose-us" className="scroll-mt-20">
                <ChooseUs />
              </section>

              <section id="offers" className="scroll-mt-20">
                <Offers />
              </section>

              <section id="reviews" className="scroll-mt-20">
                <Testimonials />
              </section>
            </>
          }
        />

        {/* CATEGORY PAGES */}
        <Route
          path="/books"
          element={<Books {...categoryPageProps} />}
        />

        <Route
          path="/novels"
          element={
            <CategoryPage
              categoryId="novels"
              {...categoryPageProps}
            />
          }
        />

        <Route
          path="/exam-preparation"
          element={
            <CategoryPage
              categoryId="exam-preparation"
              {...categoryPageProps}
            />
          }
        />

        <Route
          path="/office-supplies"
          element={
            <OfficeSupplies {...categoryPageProps} />
          }
        />

        <Route
          path="/kids-stationary"
          element={
            <KidsStationary {...categoryPageProps} />
          }
        />

        {/* CART & ORDER */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/order-summary"
          element={<OrderSummary />}
        />

        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />

        <Route
          path="/track-order"
          element={<OrderStatus />}
        />

        <Route
          path="/order-status"
          element={<OrderStatus />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN ORDERS */}
        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN CATEGORY */}
        <Route
          path="/admin/category/:categoryId"
          element={
            <AdminProtectedRoute>
              <AdminCategory />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN FEATURED */}
        <Route
          path="/admin/featured"
          element={
            <AdminProtectedRoute>
              <AdminFeatured />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN OFFERS */}
        <Route
          path="/admin/offers"
          element={
            <AdminProtectedRoute>
              <AdminOffers />
            </AdminProtectedRoute>
          }
        />

        {/* ADMIN SETTINGS */}
        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <AdminSettings />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      {/* Footer hidden on admin pages */}
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;