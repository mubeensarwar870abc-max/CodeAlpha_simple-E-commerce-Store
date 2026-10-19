import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import { FaSearch, FaArrowRight, FaBookOpen } from "react-icons/fa";

const HeroSection = () => {
  const navigate = useNavigate();
  const { store } = useStore();

  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  // Get all products from all categories
  const allProducts = useMemo(() => {
    const products = [];

    store.categories.forEach((category) => {
      category.sections?.forEach((section) => {
        section.products?.forEach((product) => {
          products.push({
            ...product,
            categoryId: category.id,
            categoryRoute: category.route,
            categoryName: category.name || category.title || category.id,
          });
        });
      });
    });

    // Also include featured products
    store.featuredProducts?.forEach((product) => {
      const alreadyExists = products.some(
        (item) => item.id === product.id
      );

      if (!alreadyExists) {
        products.push({
          ...product,
          categoryId: null,
          categoryRoute: null,
          categoryName: "Featured Products",
        });
      }
    });

    return products;
  }, [store.categories, store.featuredProducts]);

  // Show matching products when user types
  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return allProducts
      .filter((product) => {
        const productName = (
          product.name ||
          product.title ||
          ""
        ).toLowerCase();

        return productName.includes(query);
      })
      .slice(0, 6);
  }, [searchText, allProducts]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Navigate to category
  const handleCategoryClick = (category) => {
    if (!category.route) return;

    const route = category.route.startsWith("/")
      ? category.route
      : `/${category.route}`;

    setSearchText("");
    setShowSuggestions(false);

    navigate(route);
  };

  // Navigate to product's existing category page
  const handleProductClick = (product) => {
    if (!product.categoryRoute) {
      // Featured products without a category
      setSearchText("");
      setShowSuggestions(false);

      navigate("/#products");
      return;
    }

    const route = product.categoryRoute.startsWith("/")
      ? product.categoryRoute
      : `/${product.categoryRoute}`;

    setSearchText("");
    setShowSuggestions(false);

    navigate(route);
  };

  // Search button behavior
  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      setShowSuggestions(true);
      return;
    }

    // First try product
    if (filteredProducts.length > 0) {
      handleProductClick(filteredProducts[0]);
      return;
    }

    // Then try category
    const category = store.categories.find((cat) => {
      const categoryName = (
        cat.name ||
        cat.title ||
        cat.id ||
        ""
      ).toLowerCase();

      return categoryName.includes(query);
    });

    if (category) {
      handleCategoryClick(category);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 lg:pb-20 transition-colors duration-300">
      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left Content - Smooth entrance from left with no abruptness */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Tagline / Kicker Badge */}
          <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-blue-50/80 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[9px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase mb-1.5 sm:mb-2.5 self-start">
            <FaBookOpen className="text-blue-500 text-[9px] sm:text-[11px]" />
            <span>Welcome to BookNest</span>
          </div>

          {/* Heading - Styled matching Image 1: Bold, uppercase, clean line breaks */}
          <h1 className="text-sm sm:text-xl md:text-3xl lg:text-[44px] xl:text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight leading-[1.18] uppercase">
            Discover Books That <br />
            <span className="text-blue-600 dark:text-blue-400">Inspire Your Mind</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="mt-1.5 sm:mt-2.5 md:mt-4 text-gray-600 dark:text-gray-300 text-[10px] sm:text-xs md:text-sm lg:text-base leading-relaxed max-w-lg line-clamp-3 sm:line-clamp-none">
            Buy books, stationery, and learning essentials at one place. Simple, fast, and affordable.
          </p>

          {/* Search Box - Modern pill search bar */}
          <div
            ref={searchRef}
            className="relative mt-2.5 sm:mt-4 md:mt-6 flex w-full max-w-md shadow-sm rounded-full bg-white dark:bg-gray-900 border border-gray-300/80 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/50 transition-all p-0.5 sm:p-1"
          >
            <div className="flex items-center pl-2 sm:pl-3 text-gray-400 dark:text-gray-500">
              <FaSearch className="text-[10px] sm:text-xs md:text-sm text-gray-400 dark:text-gray-500" />
            </div>

            <input
              type="text"
              value={searchText}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search books, stationery..."
              className="w-full min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-[11px] sm:text-xs md:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium rounded-full transition-colors whitespace-nowrap shadow-sm"
            >
              Search
            </button>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden text-left">
                {/* Categories */}
                {store.categories?.length > 0 && (
                  <div className="p-2.5 sm:p-3">
                    <p className="text-[9px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Categories
                    </p>

                    <div className="space-y-0.5">
                      {store.categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleCategoryClick(category)}
                          className="w-full text-left px-2.5 py-1 rounded-md text-xs sm:text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                        >
                          {category.name || category.title || category.id}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {searchText.trim() && (
                  <div className="border-t border-gray-100 p-2.5 sm:p-3">
                    <p className="text-[9px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Products
                    </p>

                    {filteredProducts.length > 0 ? (
                      <div className="space-y-1">
                        {filteredProducts.map((product) => (
                          <button
                            key={`${product.categoryId || "featured"}-${product.id}`}
                            type="button"
                            onClick={() => handleProductClick(product)}
                            className="w-full flex items-center gap-2.5 text-left px-2 py-1.5 rounded-lg hover:bg-blue-50 transition"
                          >
                            <img
                              src={product.image}
                              alt={product.name || product.title || "Product"}
                              className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded bg-white p-0.5 border border-gray-100"
                            />

                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                                {product.name || product.title}
                              </p>

                              <p className="text-[10px] sm:text-xs text-gray-500">
                                {product.categoryName}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 px-2 py-1">
                        No product found.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action CTA Buttons - Pill shape matching Image 1 */}
          <div className="mt-2.5 sm:mt-4 md:mt-6 flex flex-wrap items-center gap-1.5 sm:gap-3">
            <button
              onClick={() =>
                document.getElementById("offers")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg transition-all whitespace-nowrap uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>Shop Now</span>
              <FaArrowRight className="text-[9px] sm:text-[11px]" />
            </button>

            <button
              onClick={() =>
                document.getElementById("categories")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="border border-blue-600/80 hover:border-blue-600 bg-white/70 hover:bg-white text-blue-600 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[10px] sm:text-xs md:text-sm font-semibold rounded-full hover:shadow-sm transition-all whitespace-nowrap uppercase tracking-wider"
            >
              Explore Categories
            </button>
          </div>
        </motion.div>

        {/* Right Image - Smooth entrance from the most right side of the page */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: "70vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.45,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="relative flex items-center justify-center max-w-[190px] sm:max-w-[280px] md:max-w-[380px] lg:max-w-[460px] w-full">
            <img
              src="/images/hero-books-open.png"
              alt="Stack of colorful books with open book on top"
              className="w-auto h-auto max-h-[240px] sm:max-h-[340px] md:max-h-[460px] lg:max-h-[530px] object-contain select-none"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
