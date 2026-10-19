import React, { useRef, useCallback } from "react";
import { useStore } from "../Context/StoreContext";
import { useCart } from "../Context/CartContext";
import CategoryProductCard from "../components/CategoryProductCard";

const KidsStationary = ({ isMenuOpen }) => {
  const { getCategory } = useStore();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const category = getCategory("kids-stationary");

  const basicRef = useRef(null);
  const clipRef = useRef(null);
  const calculaterRef = useRef(null);
  const geometryRef = useRef(null);

  const scrollToSection = useCallback((ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const getProducts = useCallback(
    (sectionId) =>
      category?.sections.find((s) => s.id === sectionId)?.products ?? [],
    [category]
  );

  const basicAccessories = getProducts("basic");
  const clipBoards = getProducts("clipboards");
  const calculaters = getProducts("calculators");
  const geometry = getProducts("geometry");

  const isInCart = useCallback(
    (id) => cartItems.some((cartItem) => cartItem.id === id),
    [cartItems]
  );

  const handleAdd = useCallback(
    (item) => {
      if (!isInCart(item.id)) {
        const product = {
          ...item,
          name: item.name || item.title,
          price:
            item.discountPrice ??
            Math.round(
              item.price - (item.price * (item.discount || 0)) / 100
            ),
        };

        addToCart(product);
      }
    },
    [isInCart, addToCart]
  );

  const handleRemove = useCallback(
    (item) => {
      if (isInCart(item.id)) {
        removeFromCart(item.id);
      }
    },
    [isInCart, removeFromCart]
  );

  const renderProductList = (items, colorClass) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-7 gap-y-8 sm:gap-y-10 md:gap-y-12 justify-items-center py-6">
      {items.map((item, idx) => (
        <CategoryProductCard
          key={item.id}
          item={item}
          index={idx}
          isAdded={isInCart(item.id)}
          onAdd={handleAdd}
          onRemove={handleRemove}
          colorClass={colorClass}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300">
      <div
        className={`sticky top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-3.5 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ${
          isMenuOpen ? "hidden" : "z-40"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4 max-w-7xl mx-auto">
          <button
            onClick={() => scrollToSection(basicRef)}
            className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Accessories
          </button>

          <button
            onClick={() => scrollToSection(clipRef)}
            className="bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            ClipBoards Collection
          </button>

          <button
            onClick={() => scrollToSection(calculaterRef)}
            className="bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Calculater Collection
          </button>

          <button
            onClick={() => scrollToSection(geometryRef)}
            className="bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Geometry Box
          </button>
        </div>
      </div>

      <section
        ref={basicRef}
        className="bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            Basic <span className="text-blue-600 dark:text-blue-400">Accessories Collection</span>
          </h2>
          {renderProductList(basicAccessories, "text-blue-600")}
        </div>
      </section>

      <section
        ref={clipRef}
        className="bg-white dark:bg-gray-950 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            ClipBoard <span className="text-purple-600 dark:text-purple-400">Collection</span>
          </h2>
          {renderProductList(clipBoards, "text-purple-600")}
        </div>
      </section>

      <section
        ref={calculaterRef}
        className="bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            Calculaters <span className="text-green-600 dark:text-green-400">Collection</span>
          </h2>
          {renderProductList(calculaters, "text-green-600")}
        </div>
      </section>

      <section
        ref={geometryRef}
        className="bg-white dark:bg-gray-950 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            Geometry <span className="text-orange-600 dark:text-orange-400">Box Collection</span>
          </h2>
          {renderProductList(geometry, "text-orange-600")}
        </div>
      </section>
    </div>
  );
};

export default KidsStationary;