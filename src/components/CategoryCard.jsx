import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import { motion, useInView } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoryCardSVG = () => {
  return (
    <svg
      viewBox="0 0 800 800"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Dot Pattern */}
        <pattern
          id="categoryDots"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="4"
            cy="4"
            r="2"
            fill="#4C5FAD"
            opacity="0.18"
          />
        </pattern>

        {/* Blue Gradient */}
        <linearGradient
          id="categoryBlue"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#4C5FAD" />
          <stop offset="100%" stopColor="#3F5198" />
        </linearGradient>
      </defs>

      {/* White Background */}
      <rect
        x="0"
        y="0"
        width="800"
        height="800"
        fill="#FFFFFF"
      />

      {/* Top Header Bar */}
      <rect
        x="0"
        y="0"
        width="800"
        height="48"
        fill="#4C5FAD"
      />

      {/* Main Circular Frame */}
      <circle
        cx="400"
        cy="160"
        r="130"
        fill="#FFFFFF"
        stroke="#4C5FAD"
        strokeWidth="12"
      />

      {/* Upper Left Dot Pattern */}
      <circle
        cx="100"
        cy="180"
        r="100"
        fill="url(#categoryDots)"
      />

      {/* Upper Right Dot Pattern */}
      <circle
        cx="700"
        cy="180"
        r="100"
        fill="url(#categoryDots)"
      />

      {/* Center Dot Pattern */}
      <circle
        cx="400"
        cy="430"
        r="180"
        fill="url(#categoryDots)"
        opacity="0.5"
      />

      {/* Lower Left Wireframe */}
      <g
        fill="none"
        stroke="#4C5FAD"
        strokeWidth="3"
        opacity="0.22"
      >
        <path d="M0 700 L180 560 L260 800 Z" />
        <path d="M40 800 L180 560 L320 800" />
        <path d="M0 620 L260 800" />
      </g>

      {/* Lower Right Wireframe */}
      <g
        fill="none"
        stroke="#4C5FAD"
        strokeWidth="3"
        opacity="0.22"
      >
        <path d="M800 700 L620 560 L540 800 Z" />
        <path d="M760 800 L620 560 L480 800" />
        <path d="M800 620 L540 800" />
      </g>

      {/* Bottom Footer Bar */}
      <rect
        x="0"
        y="704"
        width="800"
        height="96"
        fill="#4C5FAD"
      />
    </svg>
  );
};

const SingleCategoryCard = ({ cat, navigate, isElevated, isDimmed }) => {
  if (!cat) return null;

  const targetRoute = cat.route || (cat.id ? `/${cat.id}` : "/books");

  const handleNavigate = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(targetRoute);
  };

  return (
    <div
      onClick={handleNavigate}
      className={`
        group
        relative
        w-[125px] sm:w-[150px] md:w-[175px] lg:w-[195px]
        aspect-square
        min-h-0
        rounded-tl-2xl sm:rounded-tl-3xl
        rounded-br-2xl sm:rounded-br-3xl
        rounded-tr-md
        rounded-bl-md
        overflow-hidden
        cursor-pointer
        select-none
        flex
        flex-col
        items-center
        text-center
        transition-shadow
        duration-300
        ${
          isElevated
            ? "shadow-2xl ring-2 ring-blue-500/30"
            : isDimmed
            ? "shadow-sm opacity-60"
            : "shadow-lg ring-1 ring-blue-500/10"
        }
      `}
    >
      {/* SVG Background */}
      <CategoryCardSVG />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center px-1.5 sm:px-2 md:px-3">
        {/* Category Icon */}
        <div
          onClick={handleNavigate}
          className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-base sm:text-xl md:text-2xl lg:text-3xl leading-none drop-shadow-sm group-hover:scale-110 transition-transform cursor-pointer"
        >
          {cat.icon}
        </div>

        {/* Category Title - Clickable to navigate */}
        <h3
          onClick={handleNavigate}
          className="absolute left-1/2 -translate-x-1/2 top-[43%] w-[86%] text-[8px] leading-[1.15] sm:text-[10px] md:text-xs lg:text-[13px] font-bold text-gray-800 dark:text-gray-900 text-center break-words overflow-hidden cursor-pointer hover:text-[#4C5FAD] group-hover:text-[#4C5FAD] transition-colors"
          title={`View ${cat.title}`}
        >
          {cat.title}
        </h3>

        {/* View All Button - Clickable to navigate */}
        <button
          type="button"
          onClick={handleNavigate}
          className="absolute left-1/2 -translate-x-1/2 bottom-[12%] z-30 bg-[#4C5FAD] text-white text-[7px] sm:text-[8px] md:text-[10px] font-medium px-2.5 sm:px-3 md:px-3.5 py-0.5 sm:py-1 rounded-full hover:bg-[#3F5198] hover:scale-105 active:scale-95 transition-all whitespace-nowrap shadow-sm hover:shadow cursor-pointer"
        >
          View All
        </button>
      </div>
    </div>
  );
};

const CategoryCard = () => {
  const navigate = useNavigate();
  const { store } = useStore();

  const categories = store.categories || [];

  const [centerIdx, setCenterIdx] = useState(0);
  const [stage, setStage] = useState(0); // 0: cards enter smoothly together, overlay & surge; 1: vanish & cycle

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  // Advance to next cycle (loops through all categories)
  const nextCycle = useCallback(() => {
    setCenterIdx((prev) => (prev + 2) % (categories.length || 1));
    setStage(0);
  }, [categories.length]);

  const handleNext = () => {
    setCenterIdx((prev) => (prev + 1) % (categories.length || 1));
    setStage(0);
  };

  const handlePrev = () => {
    setCenterIdx((prev) => (prev - 1 + (categories.length || 1)) % (categories.length || 1));
    setStage(0);
  };

  // Continuous animation lifecycle:
  // Does NOT pause on hover.
  // Stage 0 (3450ms): Center card and side cards enter smoothly and leisurely, overlay 10% and side cards surge forward
  // Stage 1 (450ms): Cards smoothly fade and cycle advances to next cards
  useEffect(() => {
    if (!isInView || categories.length === 0) return;

    let timer;
    if (stage === 0) {
      timer = setTimeout(() => {
        setStage(1);
      }, 3450);
    } else if (stage === 1) {
      timer = setTimeout(() => {
        nextCycle();
      }, 450);
    }

    return () => clearTimeout(timer);
  }, [stage, isInView, categories.length, nextCycle]);

  if (categories.length === 0) return null;

  // The 3 active cards for the current cycle
  const centerCard = categories[centerIdx % categories.length];
  const leftCard = categories[(centerIdx + 1) % categories.length];
  const rightCard = categories[(centerIdx + 2) % categories.length];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-blue-50/20 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-4 sm:py-6 md:py-8 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Heading: Elevated with z-20 and clean spacing above cards parent div */}
        <div className="relative z-20 text-center mb-3 sm:mb-4 md:mb-5 px-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-[#4C5FAD] dark:text-blue-300 text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1.5"
          >
            <span>Featured Collections</span>
          </motion.div>

          {/* Heading - smoothly animates in from LEFT on every scroll */}
          <motion.h2
            initial={{ opacity: 0, x: -70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight uppercase tracking-tight"
          >
            Shop by Categories
          </motion.h2>

          {/* Subtitle - smoothly animates in from RIGHT simultaneously at the same time on every scroll */}
          <motion.p
            initial={{ opacity: 0, x: 70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-300 max-w-lg mx-auto leading-relaxed"
          >
            Quickly explore books and stationery using color-coded categories
          </motion.p>
        </div>

        {/* Interactive 3D Category Arena: Elevated clearly below the heading with generous height */}
        <div className="relative z-10 flex items-center justify-center w-full h-[175px] sm:h-[200px] md:h-[235px] lg:h-[255px] my-1 sm:my-2">
          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            aria-label="Previous category"
            className="absolute left-1 sm:left-3 md:left-6 lg:left-10 z-40 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#4C5FAD] dark:text-blue-400 hover:bg-[#4C5FAD] hover:text-white transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-[10px] sm:text-xs" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            aria-label="Next category"
            className="absolute right-1 sm:right-3 md:right-6 lg:right-10 z-40 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[#4C5FAD] dark:text-blue-400 hover:bg-[#4C5FAD] hover:text-white transition-colors cursor-pointer"
          >
            <FaChevronRight className="text-[10px] sm:text-xs" />
          </motion.button>

          {/* Dead-Center Cards Anchor */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* CENTER CARD: Enters smoothly from the right edge, settles dead-center, then steps back as side cards arrive */}
            <motion.div
              key={`center-${centerCard.route}-${centerIdx}`}
              initial={{ x: "70vw", opacity: 0, scale: 0.94 }}
              animate={
                stage === 0
                  ? {
                      x: ["70vw", "0vw", "0vw"],
                      scale: [0.94, 1, 0.84],
                      opacity: [0, 1, 0.7],
                      zIndex: 10,
                    }
                  : { x: "0vw", opacity: 0, scale: 0.75, zIndex: 5 }
              }
              transition={
                stage === 0
                  ? {
                      duration: 3.45,
                      delay: 0,
                      times: [0, 0.45, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }
                  : {
                      duration: 0.45,
                      ease: "easeInOut",
                      delay: 0,
                    }
              }
              className="absolute pointer-events-auto"
            >
              <SingleCategoryCard
                cat={centerCard}
                navigate={navigate}
                isElevated={false}
                isDimmed={stage === 1}
              />
            </motion.div>

            {/* LEFT CARD: Enters from the left edge of the page, overlays 10% on center card, surges forward */}
            <motion.div
              key={`left-${leftCard.route}-${centerIdx}`}
              initial={{ x: "-70vw", opacity: 0, scale: 0.92 }}
              animate={
                stage === 0
                  ? {
                      x: ["-70vw", "0vw", "0vw"],
                      scale: [0.92, 1, 1.08],
                      opacity: [0, 1, 1],
                      zIndex: 30,
                    }
                  : { x: "0vw", opacity: 0, scale: 0.88, zIndex: 30 }
              }
              transition={
                stage === 0
                  ? {
                      duration: 3.15,
                      delay: 0.30,
                      times: [0, 0.48, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }
                  : {
                      duration: 0.45,
                      ease: "easeInOut",
                      delay: 0,
                    }
              }
              className="absolute pointer-events-none"
            >
              <div style={{ transform: "translateX(-90%)" }} className="pointer-events-auto">
                <SingleCategoryCard
                  cat={leftCard}
                  navigate={navigate}
                  isElevated={true}
                  isDimmed={false}
                />
              </div>
            </motion.div>

            {/* RIGHT CARD: Enters from the right edge with a noticeable delay after center card, overlays 10%, surges forward */}
            <motion.div
              key={`right-${rightCard.route}-${centerIdx}`}
              initial={{ x: "70vw", opacity: 0, scale: 0.92 }}
              animate={
                stage === 0
                  ? {
                      x: ["70vw", "0vw", "0vw"],
                      scale: [0.92, 1, 1.08],
                      opacity: [0, 1, 1],
                      zIndex: 30,
                    }
                  : { x: "0vw", opacity: 0, scale: 0.88, zIndex: 30 }
              }
              transition={
                stage === 0
                  ? {
                      duration: 2.90,
                      delay: 0.55,
                      times: [0, 0.50, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }
                  : {
                      duration: 0.45,
                      ease: "easeInOut",
                      delay: 0,
                    }
              }
              className="absolute pointer-events-none"
            >
              <div style={{ transform: "translateX(90%)" }} className="pointer-events-auto">
                <SingleCategoryCard
                  cat={rightCard}
                  navigate={navigate}
                  isElevated={true}
                  isDimmed={false}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category Pill Indicators / Quick Selectors: Directly navigates to category page when clicked */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3"
        >
          {categories.map((cat, idx) => {
            const isActive = idx === (centerIdx % categories.length);
            const targetRoute = cat.route || (cat.id ? `/${cat.id}` : "/books");
            return (
              <motion.button
                key={cat.id || cat.route || idx}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate(targetRoute);
                }}
                className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md ${
                  isActive
                    ? "bg-[#4C5FAD] text-white shadow-sm ring-2 ring-[#4C5FAD]/40 scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#4C5FAD]/15 hover:text-[#4C5FAD] dark:hover:bg-blue-900/40 dark:hover:text-blue-300"
                }`}
                title={`Go to ${cat.title} collection`}
              >
                <span className="text-[12px] sm:text-sm">{cat.icon}</span>
                <span>{cat.title}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryCard;