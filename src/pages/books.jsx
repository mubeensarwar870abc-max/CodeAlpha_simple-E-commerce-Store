import React, { useRef } from "react";
import { useStore } from "../Context/StoreContext";
import { useCart } from "../Context/CartContext";
import CategoryProductCard from "../components/CategoryProductCard";

const Books = ({ isMenuOpen }) => {
  const { getCategory } = useStore();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const category = getCategory("books");

  const islamicRef = useRef(null);
  const novelsRef = useRef(null);
  const learningRef = useRef(null);
  const notesRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getProducts = (sectionId) =>
    category?.sections.find((s) => s.id === sectionId)?.products ?? [];

  const books = getProducts("islamic");
const novels = getProducts("novels");
const learningBooks = getProducts("learning");
const noteBooks = getProducts("notes");

  const handleAdd = (item) => {
    const alreadyAdded = cartItems.some(
      (cartItem) => cartItem.id === item.id
    );

    if (!alreadyAdded) {
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
  };

  const handleRemove = (item) => {
    const alreadyAdded = cartItems.some(
      (cartItem) => cartItem.id === item.id
    );

    if (alreadyAdded) {
      removeFromCart(item.id);
    }
  };

  const renderProductList = (items, colorClass) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-7 gap-y-8 sm:gap-y-10 md:gap-y-12 justify-items-center py-6">
      {items.map((item, idx) => (
        <CategoryProductCard
          key={item.id}
          item={item}
          index={idx}
          isAdded={cartItems.some((cartItem) => cartItem.id === item.id)}
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
            onClick={() => scrollToSection(islamicRef)}
            className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Islamic Books
          </button>

          <button
            onClick={() => scrollToSection(novelsRef)}
            className="bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Urdu Novels
          </button>

          <button
            onClick={() => scrollToSection(learningRef)}
            className="bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Learning Books
          </button>

          <button
            onClick={() => scrollToSection(notesRef)}
            className="bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Note Books
          </button>
        </div>
      </div>

      <section
        ref={islamicRef}
        className="bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            Islamic <span className="text-blue-600 dark:text-blue-400">Books Collection</span>
          </h2>
          {renderProductList(books, "text-blue-600")}
        </div>
      </section>

      <section
        ref={novelsRef}
        className="bg-white dark:bg-gray-950 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            Urdu <span className="text-purple-600 dark:text-purple-400">Novels Collection</span>
          </h2>
          {renderProductList(novels, "text-purple-600")}
        </div>
      </section>

      <section
        ref={learningRef}
        className="bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            Learning <span className="text-green-600 dark:text-green-400">Books Collection</span>
          </h2>
          {renderProductList(learningBooks, "text-green-600")}
        </div>
      </section>

      <section
        ref={notesRef}
        className="bg-white dark:bg-gray-950 py-10 sm:py-14 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white uppercase tracking-tight mb-8 sm:mb-10">
            Note <span className="text-orange-600 dark:text-orange-400">Books Collection</span>
          </h2>
          {renderProductList(noteBooks, "text-orange-600")}
        </div>
      </section>
    </div>
  );
};

export default Books;