import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import { useCart } from "../Context/CartContext";
import { useTheme } from "../Context/ThemeContext";
import {
  FaHome,
  FaBoxOpen,
  FaList,
  FaTags,
  FaStar,
  FaPhoneAlt,
  FaShoppingCart,
  FaCog,
  FaTruck,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { store } = useStore();
  const { cartItems } = useCart();
  const { toggleTheme, isDark } = useTheme();

  const siteName = store.settings.siteName || "BookNest";
  const whatsapp = store.settings.contactWhatsApp || "923160612173";

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <nav className="w-full bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-xs border-b border-gray-100 dark:border-gray-800 fixed top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div
          onClick={() => scrollToSection("hero")}
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer tracking-tight"
        >
          {siteName}
        </div>

        <ul className="hidden desktop:flex items-center space-x-6 text-gray-700 dark:text-gray-200 font-medium">
          <li
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaHome /> Home
          </li>

          <li
            onClick={() => scrollToSection("products")}
            className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaBoxOpen /> Products
          </li>

          <li
            onClick={() => scrollToSection("categories")}
            className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaList /> Categories
          </li>

          <li
            onClick={() => scrollToSection("offers")}
            className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaTags /> Offers
          </li>

          <li
            onClick={() => scrollToSection("reviews")}
            className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaStar /> Reviews
          </li>

          <li
            onClick={() =>
              window.open(`https://wa.me/${whatsapp}`, "_blank")
            }
            className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaPhoneAlt /> Contact
          </li>

          <li
            onClick={() => navigate("/track-order")}
            className="flex items-center gap-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            title="Track Your Order"
          >
            <FaTruck /> Track
          </li>

          {/* Desktop Dark / Light Mode Toggle Button */}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50/80 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-amber-500 dark:text-yellow-300 border border-blue-100 dark:border-gray-700 transition-all shadow-2xs cursor-pointer active:scale-95"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Dark / Light Mode"
            >
              {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-xs text-gray-600 dark:text-gray-300" />}
            </button>
          </li>

          <li
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 relative transition-colors"
            title="Shopping Cart"
          >
            <FaShoppingCart />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </li>

          <li
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-500 text-gray-400 dark:text-gray-500 text-sm transition-colors"
            title="Admin Dashboard"
          >
            <FaCog />
          </li>
        </ul>

        <div className="desktop:hidden flex items-center gap-3">
          {/* Mobile Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50/80 dark:bg-gray-800 text-amber-500 dark:text-yellow-300 border border-blue-100 dark:border-gray-700 transition-all cursor-pointer active:scale-95"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Dark / Light Mode"
          >
            {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-xs text-gray-600" />}
          </button>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer text-gray-700 dark:text-gray-200"
            title="Shopping Cart"
          >
            <FaShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          <div
            className="text-2xl cursor-pointer text-gray-800 dark:text-gray-200"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            ☰
          </div>
        </div>
      </div>

      <div
        className={`desktop:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 space-y-4 text-gray-700 dark:text-gray-200 border-t border-gray-100 dark:border-gray-800 transition-colors">
          <p
            onClick={() => {
              scrollToSection("hero");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaHome /> Home
          </p>

          <p
            onClick={() => {
              scrollToSection("products");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaBoxOpen /> Products
          </p>

          <p
            onClick={() => {
              scrollToSection("categories");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaList /> Categories
          </p>

          <p
            onClick={() => {
              scrollToSection("offers");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaTags /> Offers
          </p>

          <p
            onClick={() => {
              scrollToSection("reviews");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaStar /> Reviews
          </p>

          <p
            onClick={() => {
              window.open(`https://wa.me/${whatsapp}`, "_blank");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FaPhoneAlt /> Contact
          </p>

          <p
            onClick={() => {
              navigate("/track-order");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer text-blue-600 dark:text-blue-400 font-semibold"
          >
            <FaTruck /> Track Order
          </p>

          {/* Mobile Dark / Light Mode Switch Row */}
          <div
            onClick={toggleTheme}
            className="flex items-center justify-between cursor-pointer py-2 text-gray-700 dark:text-gray-200 border-t border-gray-100 dark:border-gray-800 pt-3"
          >
            <span className="flex items-center gap-2.5">
              {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-gray-500 dark:text-gray-400" />}
              <span className="font-medium text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-gray-800 text-[#4C5FAD] dark:text-yellow-300 font-bold border border-blue-100 dark:border-gray-700">
              {isDark ? "DARK ON" : "LIGHT ON"}
            </span>
          </div>

          <p
            onClick={() => {
              navigate("/admin");
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 pt-1"
          >
            <FaCog /> Admin
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;