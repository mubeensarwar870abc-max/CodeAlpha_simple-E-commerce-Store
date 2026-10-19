import React from "react";
import { motion } from "framer-motion";

// 4 Zero-gravity floating animation variants (identical rhythm and feel to Testimonials / What Our Customers Say)
const productFloatingVariants = [
  {
    animate: {
      y: [-12, 13, -12],
      x: [-3, 3, -3],
      rotate: [-1.8, 1.8, -1.8],
      boxShadow: [
        "0 18px 28px -6px rgba(76, 95, 173, 0.20), 0 8px 12px -4px rgba(76, 95, 173, 0.12)",
        "0 2px 6px -2px rgba(76, 95, 173, 0.06), 0 1px 3px -1px rgba(76, 95, 173, 0.04)",
        "0 18px 28px -6px rgba(76, 95, 173, 0.20), 0 8px 12px -4px rgba(76, 95, 173, 0.12)",
      ],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0,
      },
    },
  },
  {
    animate: {
      y: [13, -12, 13],
      x: [3, -3, 3],
      rotate: [1.8, -1.8, 1.8],
      boxShadow: [
        "0 2px 6px -2px rgba(76, 95, 173, 0.06), 0 1px 3px -1px rgba(76, 95, 173, 0.04)",
        "0 18px 28px -6px rgba(76, 95, 173, 0.20), 0 8px 12px -4px rgba(76, 95, 173, 0.12)",
        "0 2px 6px -2px rgba(76, 95, 173, 0.06), 0 1px 3px -1px rgba(76, 95, 173, 0.04)",
      ],
      transition: {
        duration: 4.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.35,
      },
    },
  },
  {
    animate: {
      y: [-14, 11, -14],
      x: [-3.5, 3, -3.5],
      rotate: [-2, 1.6, -2],
      boxShadow: [
        "0 18px 28px -6px rgba(76, 95, 173, 0.20), 0 8px 12px -4px rgba(76, 95, 173, 0.12)",
        "0 2px 6px -2px rgba(76, 95, 173, 0.06), 0 1px 3px -1px rgba(76, 95, 173, 0.04)",
        "0 18px 28px -6px rgba(76, 95, 173, 0.20), 0 8px 12px -4px rgba(76, 95, 173, 0.12)",
      ],
      transition: {
        duration: 3.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7,
      },
    },
  },
  {
    animate: {
      y: [11, -13, 11],
      x: [3, -3.5, 3],
      rotate: [1.6, -2, 1.6],
      boxShadow: [
        "0 2px 6px -2px rgba(76, 95, 173, 0.06), 0 1px 3px -1px rgba(76, 95, 173, 0.04)",
        "0 18px 28px -6px rgba(76, 95, 173, 0.20), 0 8px 12px -4px rgba(76, 95, 173, 0.12)",
        "0 2px 6px -2px rgba(76, 95, 173, 0.06), 0 1px 3px -1px rgba(76, 95, 173, 0.04)",
      ],
      transition: {
        duration: 3.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.05,
      },
    },
  },
];

const CategoryProductCard = ({
  item,
  index = 0,
  isAdded = false,
  onAdd,
  onRemove,
  colorClass,
  priceMode,
}) => {
  if (!item) return null;

  const floatVariant = productFloatingVariants[index % productFloatingVariants.length];

  const isFixedPrice = priceMode === "fixed";
  const discountedPrice = isFixedPrice
    ? item.discountPrice ?? item.price
    : Math.round(item.price - (item.price * (item.discount || 0)) / 100);

  const discountPercent = !isFixedPrice && item.discount > 0
    ? item.discount
    : item.discountPrice && item.price && item.price > item.discountPrice
    ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
    : 0;

  const title = item.title || item.name || "Product";
  const rating = item.rating || 4;

  return (
    <motion.div
      variants={floatVariant}
      animate="animate"
      whileHover={{ scale: 1.05, y: -14, transition: { duration: 0.22 } }}
      className="
        group
        relative
        w-full
        max-w-[155px] sm:max-w-[175px] md:max-w-[195px] lg:max-w-[205px]
        mx-auto
        rounded-xl
        bg-white dark:bg-gray-800/95
        border border-blue-100/90 dark:border-gray-700/80
        hover:border-blue-300 dark:hover:border-blue-500/50
        flex flex-col
        overflow-hidden
        transition-colors duration-300
        select-none
      "
    >
      {/* Background SVG Motif with Royal Blue dots and soft glow */}
      <svg
        viewBox="0 0 350 260"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`cardGlow-${item.id}-${index}`} cx="85%" cy="15%" r="75%">
            <stop offset="0%" stopColor="#E0EFFE" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <pattern id={`cardDots-${item.id}-${index}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.2" fill="#4C5FAD" opacity="0.06" />
          </pattern>
        </defs>
        <rect width="350" height="260" fill={`url(#cardGlow-${item.id}-${index})`} />
        <rect width="350" height="260" fill={`url(#cardDots-${item.id}-${index})`} />
        {/* Top BookNest Royal Blue Accent Bar */}
        <rect x="0" y="0" width="350" height="2.5" fill="#4C5FAD" opacity="0.9" />
      </svg>

      {/* Product Image Area - Decreased 30% in Length/Height for Compact Proportion */}
      <div className="relative w-full h-20 sm:h-24 md:h-26 bg-gray-50/80 dark:bg-gray-900/60 flex items-center justify-center p-2 overflow-hidden">
        {discountPercent > 0 && (
          <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold bg-green-500 text-white shadow-xs">
            {discountPercent}% OFF
          </span>
        )}
        <img
          src={item.image}
          alt={title}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 drop-shadow-xs"
        />
      </div>

      {/* Product Content Body - Decreased 30% Width and Length */}
      <div className="relative z-10 p-2 sm:p-2.5 flex flex-col flex-grow">
        {/* Title */}
        <h3
          className="text-[11px] sm:text-xs font-bold text-gray-800 dark:text-gray-100 line-clamp-1 leading-snug group-hover:text-[#4C5FAD] dark:group-hover:text-blue-400 transition-colors"
          title={title}
        >
          {title}
        </h3>

        {/* Pricing */}
        <div className="mt-0.5 flex items-baseline gap-1 flex-wrap">
          {item.price > discountedPrice && (
            <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-500 line-through">
              Rs {item.price}
            </span>
          )}
          <span className={`text-[11px] sm:text-xs md:text-sm font-extrabold ${colorClass || "text-[#4C5FAD] dark:text-blue-400"}`}>
            Rs {discountedPrice}
          </span>
        </div>

        {/* Rating Stars */}
        <div className="mt-0.5 flex items-center text-yellow-400 text-[9px] sm:text-[10px]">
          {"★".repeat(Math.min(5, Math.max(1, Math.round(rating))))}
          {"☆".repeat(Math.max(0, 5 - Math.round(rating)))}
          <span className="ml-1 text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500">
            ({Number(rating).toFixed(1)})
          </span>
        </div>

        {/* Action Buttons - Compact */}
        <div className="mt-auto pt-2 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd && onAdd(item);
            }}
            className={`flex-1 py-1 px-1.5 rounded-md text-[9px] sm:text-[10px] font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
              isAdded
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-[#4C5FAD] hover:bg-[#3F5198] text-white"
            }`}
          >
            {isAdded ? "✓ Added" : "Add to Cart"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove && onRemove(item);
            }}
            className="py-1 px-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-md text-[9px] sm:text-[10px] font-semibold transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            title="Remove from Cart"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryProductCard;
