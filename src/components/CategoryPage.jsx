import React, { useRef, useCallback } from "react";
import { useStore } from "../Context/StoreContext";
import { useCart } from "../Context/CartContext";
import CategoryProductCard from "./CategoryProductCard";

const CategoryPage = ({ categoryId, isMenuOpen }) => {
  const { getCategory } = useStore();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const category = getCategory(categoryId);

  const sectionRefs = useRef({});

  const handleAdd = useCallback(
    (item) => {
      const product = {
        ...item,

        // Category product uses "title"
        // Cart uses "name"
        name: item.name || item.title,

        // Use discounted price in cart
        price:
          item.discountPrice ??
          Math.round(
            item.price - (item.price * (item.discount || 0)) / 100
          ),
      };

      addToCart(product);
    },
    [addToCart]
  );

  const handleRemove = useCallback(
    (item) => {
      removeFromCart(item.id);
    },
    [removeFromCart]
  );

  if (!category) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Category not found
      </div>
    );
  }

  const scrollToSection = (sectionId) => {
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50/50 dark:bg-gray-950 transition-colors duration-300">
      {/* Category Navigation */}
      {category.navButtons?.length > 0 && (
        <div
          className={`sticky top-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-3.5 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all duration-300 ${
            isMenuOpen ? "hidden" : "z-40"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4 max-w-7xl mx-auto">
            {category.navButtons.map((btn) => (
              <button
                key={btn.sectionId}
                onClick={() => scrollToSection(btn.sectionId)}
                className={`${btn.color} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Sections */}
      {category.sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            sectionRefs.current[section.id] = el;
          }}
          className={`${
            index % 2 === 0
              ? "bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
              : "bg-white dark:bg-gray-950"
          } py-10 sm:py-14 transition-colors duration-300`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
              {section.title}{" "}
              <span className={section.colorClass || "text-[#4C5FAD] dark:text-blue-400"}>
                {section.titleHighlight}
              </span>
            </h2>

            {section.products.length === 0 ? (
              <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">
                No products found in this section.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-7 gap-y-8 sm:gap-y-10 md:gap-y-12 justify-items-center py-6">
                {section.products.map((item, idx) => (
                  <CategoryProductCard
                    key={item.id}
                    item={item}
                    index={idx}
                    isAdded={cartItems.some((cartItem) => cartItem.id === item.id)}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                    colorClass={section.colorClass}
                    priceMode={section.priceMode}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CategoryPage;