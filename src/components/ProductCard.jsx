import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import { useCart } from "../Context/CartContext";
import { motion, useInView } from "framer-motion";
import ProductCardDesign from "./ProductCardDesign";
import defaultStore from "../data/defaultStore";

const ProductCard = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const { store } = useStore();
  const { addToCart, cartItems } = useCart();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  // Fallback defaults to ensure exactly 6 featured products exist
  const defaultFeatured = [
    { id: 1, name: "Mathematics Book", image: "/images/kn1.jpg", price: 1200, rating: 4.5 },
    { id: 2, name: "Novel: The Journey", image: "/images/novel.jpg", price: 1800, rating: 4.8 },
    { id: 3, name: "Exam Prep Guide", image: "/images/kn2.jpg", price: 1800, rating: 4.2 },
    { id: 4, name: "Office Notebook", image: "/images/nt1.jpg", price: 500, rating: 4.0 },
    { id: 5, name: "Kids Coloring Book", image: "/images/kn5.jpg", price: 800, rating: 4.7 },
    { id: 6, name: "Stationery Set", image: "/images/pencil1.jpg", price: 4200, rating: 4.3 },
  ];

  const rawFeatured =
    store.featuredProducts && store.featuredProducts.length >= 6
      ? store.featuredProducts
      : defaultStore.featuredProducts || defaultFeatured;

  // Normalize image URLs and format prices
  const featured = rawFeatured.slice(0, 6).map((p, idx) => ({
    ...p,
    id: p.id || idx + 1,
    name: p.name || p.title || `Featured Product ${idx + 1}`,
    image:
      p.image && p.image.includes("novel1.jpg")
        ? "/images/novel.jpg"
        : p.image || defaultFeatured[idx]?.image,
    price: p.price || 999,
    rating: p.rating || (4.3 + (idx % 5) * 0.1).toFixed(1),
  }));

  // Row 1: First 3 Cards (Right-to-Left Headlines Ticker)
  const row1 = featured.slice(0, 3);
  // Row 2: Next 3 Cards (Left-to-Right Continuous Ticker)
  const row2 = featured.slice(3, 6);

  // Replicate 4 times for a seamless, continuous marquee loop
  const repeatedRow1 = [...row1, ...row1, ...row1, ...row1];
  const repeatedRow2 = [...row2, ...row2, ...row2, ...row2];

  const handleAdd = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-4 sm:py-6 md:py-8 overflow-hidden transition-colors duration-300"
    >
      {/* Inline styles for continuous tickers with NO cursor/hover pause */}
      <style>{`
        @keyframes tickerLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes tickerRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-ticker-left {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: tickerLeft 22s linear infinite;
        }
        .animate-ticker-right {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: tickerRight 22s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Heading: Synchronized entrance on scroll */}
        <div className="relative z-20 text-center mb-3 sm:mb-4 md:mb-5 px-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-[#4C5FAD] dark:text-blue-300 text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1.5"
          >
            <span>Top Picks & Best Sellers</span>
          </motion.div>

          {/* Heading - smoothly animates from LEFT on scroll */}
          <motion.h2
            initial={{ opacity: 0, x: -70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight uppercase tracking-tight"
          >
            Featured Products
          </motion.h2>

          {/* Subtitle - smoothly animates from RIGHT on scroll */}
          <motion.p
            initial={{ opacity: 0, x: 70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-300 max-w-lg mx-auto leading-relaxed"
          >
            Check out our best selling products and grab your favorites
          </motion.p>
        </div>

        {/* Continuous Marquee Arena: Two Rows showing exactly 3 cards at a time */}
        <div className="relative w-full flex flex-col gap-2.5 sm:gap-3.5 overflow-hidden py-1">
          {/* Subtle side fade masks for elegant broadcast ticker aesthetic */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 sm:w-8 md:w-12 bg-gradient-to-r from-blue-50/70 dark:from-gray-950/90 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 sm:w-8 md:w-12 bg-gradient-to-l from-blue-50/70 dark:from-gray-950/90 to-transparent z-10" />

          {/* ROW 1: Exactly 3 Cards visible at a time (Right-to-Left Continuous TV Headline Ticker) */}
          <div className="overflow-hidden w-full [container-type:inline-size]">
            <div className="animate-ticker-left flex gap-3 sm:gap-5 md:gap-7 lg:gap-9 py-1">
              {repeatedRow1.map((product, idx) => {
                const cartItem = cartItems?.find((item) => item.id === product.id);
                const isInCart = Boolean(cartItem);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <ProductCardDesign
                    key={`r1-${product.id}-${idx}`}
                    image={product.image}
                    title={product.name}
                    price={`Rs ${product.price.toLocaleString()}`}
                    rating={product.rating}
                  >
                    <button
                      onClick={() => handleAdd(product)}
                      className={`px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-[9px] md:text-[11px] font-semibold transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap flex items-center gap-0.5 sm:gap-1 ${
                        isInCart
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-[#4C5FAD] hover:bg-[#3F5198] text-white hover:shadow-md"
                      }`}
                    >
                      <span className="hidden sm:inline">{isInCart ? `Added (${quantity})` : "Add to Cart"}</span>
                      <span className="sm:hidden">{isInCart ? `✓ (${quantity})` : "+ Add"}</span>
                    </button>

                    {isInCart && (
                      <button
                        onClick={() => navigate("/cart")}
                        className="bg-[#314182] hover:bg-[#233066] text-white px-1 sm:px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] font-medium transition-all cursor-pointer whitespace-nowrap"
                        title="View Cart"
                      >
                        🛒
                      </button>
                    )}
                  </ProductCardDesign>
                );
              })}
            </div>
          </div>

          {/* ROW 2: Exactly 3 Cards visible at a time (Left-to-Right Continuous Animation) */}
          <div className="overflow-hidden w-full [container-type:inline-size]">
            <div className="animate-ticker-right flex gap-3 sm:gap-5 md:gap-7 lg:gap-9 py-1">
              {repeatedRow2.map((product, idx) => {
                const cartItem = cartItems?.find((item) => item.id === product.id);
                const isInCart = Boolean(cartItem);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <ProductCardDesign
                    key={`r2-${product.id}-${idx}`}
                    image={product.image}
                    title={product.name}
                    price={`Rs ${product.price.toLocaleString()}`}
                    rating={product.rating}
                  >
                    <button
                      onClick={() => handleAdd(product)}
                      className={`px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-full text-[7px] sm:text-[9px] md:text-[11px] font-semibold transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap flex items-center gap-0.5 sm:gap-1 ${
                        isInCart
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-[#4C5FAD] hover:bg-[#3F5198] text-white hover:shadow-md"
                      }`}
                    >
                      <span className="hidden sm:inline">{isInCart ? `Added (${quantity})` : "Add to Cart"}</span>
                      <span className="sm:hidden">{isInCart ? `✓ (${quantity})` : "+ Add"}</span>
                    </button>

                    {isInCart && (
                      <button
                        onClick={() => navigate("/cart")}
                        className="bg-[#314182] hover:bg-[#233066] text-white px-1 sm:px-1.5 py-0.5 rounded-full text-[7px] sm:text-[9px] font-medium transition-all cursor-pointer whitespace-nowrap"
                        title="View Cart"
                      >
                        🛒
                      </button>
                    )}
                  </ProductCardDesign>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;