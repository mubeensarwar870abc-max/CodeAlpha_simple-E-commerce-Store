import React from "react";

const ProductCardDesign = ({
  image,
  title = "Product Name",
  price = "Rs 0",
  rating = "4.5",
  children,
}) => {
  const imgSrc = image?.includes("novel1.jpg")
    ? "/images/novel.jpg"
    : image || "/images/kn1.jpg";

  return (
    <div
      className="
        group
        relative
        flex-shrink-0
        w-[calc((100cqw-2.5rem)/3)] sm:w-[calc((100cqw-4rem)/3)] md:w-[calc((100cqw-5.5rem)/3)] lg:w-[calc((100cqw-7rem)/3)]
        h-[88px] sm:h-[100px] md:h-[108px] lg:h-[116px]
        rounded-xl sm:rounded-2xl
        overflow-hidden
        bg-white dark:bg-gray-800/95
        border border-blue-100/90 dark:border-gray-700/80
        shadow-sm hover:shadow-md
        transition-colors duration-300
        select-none
        flex items-center
      "
    >
      {/* Background SVG Design matching BookNest Royal Blue theme */}
      <svg
        viewBox="0 0 400 150"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Royal Blue Gradient for Angle Ribbon */}
          <linearGradient id="cardBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4C5FAD" />
            <stop offset="100%" stopColor="#314182" />
          </linearGradient>

          {/* Accent Sky Blue Stripe */}
          <linearGradient id="cardSkyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>

          {/* Dot Pattern in Royal Blue */}
          <pattern id="cardDotPattern" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="#4C5FAD" opacity="0.10" />
          </pattern>
        </defs>

        {/* Base White Card Background */}
        <rect width="400" height="150" fill="#FFFFFF" rx="14" />

        {/* Right Angle Ribbon in Royal Blue */}
        <path d="M 285 0 L 400 0 L 400 150 L 250 150 Z" fill="url(#cardBlueGrad)" />

        {/* Cyan/Sky Accent Stripe */}
        <path d="M 276 0 L 285 0 L 250 150 L 241 150 Z" fill="url(#cardSkyGrad)" opacity="0.8" />

        {/* Subtle Royal Blue Dot Pattern on Left Section */}
        <rect x="0" y="0" width="235" height="150" fill="url(#cardDotPattern)" />

        {/* Subtle Geometric Diagonal Lines on Ribbon */}
        <path d="M 325 0 L 385 110" stroke="#FFFFFF" strokeWidth="2" opacity="0.25" fill="none" />
        <path d="M 350 0 L 400 80" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.18" fill="none" />
      </svg>

      {/* Card Content Layout: Resizable according to screen sizes */}
      <div className="relative z-10 w-full h-full flex items-center justify-between px-2 sm:px-3 md:px-3.5 py-1.5 sm:py-2">
        {/* Left Side: Product Information & Action Buttons */}
        <div className="flex flex-col justify-between h-full min-w-0 flex-1 pr-1 sm:pr-2.5 z-10 py-0.5">
          <div className="min-w-0">
            {/* Rating Stars & Badge */}
            <div className="flex items-center gap-1 mb-0.5">
              <span className="inline-flex items-center gap-0.5 px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#4C5FAD] dark:text-blue-300 text-[7px] sm:text-[8px] md:text-[9px] font-bold tracking-wider uppercase">
                ★ {rating}
              </span>
              <span className="hidden sm:inline text-[7px] sm:text-[8px] md:text-[9px] text-gray-400 dark:text-gray-400 font-medium">Featured</span>
            </div>

            {/* Product Title - Clean responsive truncate */}
            <h3
              className="text-[9px] sm:text-[11px] md:text-xs font-bold text-gray-800 dark:text-white leading-tight truncate"
              title={title}
            >
              {title}
            </h3>

            {/* Price */}
            <p className="text-[9px] sm:text-[11px] md:text-xs lg:text-[13px] font-extrabold text-[#4C5FAD] dark:text-blue-400 mt-0.5 leading-none">
              {price}
            </p>
          </div>

          {/* Action Buttons Container */}
          {children && (
            <div className="flex items-center gap-1 mt-0.5">
              {children}
            </div>
          )}
        </div>

        {/* Right Side: Resizable Framed Product Image - Fully visible, never cut off */}
        <div className="relative z-10 flex items-center justify-center flex-shrink-0 pr-0.5 sm:pr-1">
          <div className="h-[62px] w-[62px] sm:h-[74px] sm:w-[74px] md:h-[82px] md:w-[82px] lg:h-[88px] lg:w-[88px] rounded-xl sm:rounded-2xl bg-white/95 dark:bg-gray-900/95 border-2 border-white dark:border-gray-700 shadow-sm p-1 flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <img
              src={imgSrc}
              alt={title}
              loading="lazy"
              onError={(e) => {
                if (!e.target.dataset.tried) {
                  e.target.dataset.tried = "true";
                  e.target.src = "/images/novel.jpg";
                }
              }}
              className="max-h-full max-w-full object-contain select-none drop-shadow-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDesign;