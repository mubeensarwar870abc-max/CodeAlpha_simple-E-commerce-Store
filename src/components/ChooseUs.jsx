import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const points = [
  {
    id: "pricing",
    title: "Affordable Prices",
    description: "Get books and stationery at pocket-friendly rates.",
    shortDesc: "Best rates & deals",
    badge: "Cost Saver",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#EEF2FF" />
        <path d="M14 20C14 16.6863 16.6863 14 20 14H28C31.3137 14 34 16.6863 34 20V28C34 31.3137 31.3137 34 28 34H20C16.6863 34 14 31.3137 14 28V20Z" fill="#4C5FAD" opacity="0.15" />
        {/* Wallet / Price Tag Shape */}
        <path d="M16 18H32V30C32 31.1046 31.1046 32 30 32H18C16.8954 32 16 31.1046 16 30V18Z" stroke="#4C5FAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 22H32" stroke="#4C5FAD" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 15L26 15" stroke="#314182" strokeWidth="2.5" strokeLinecap="round" />
        {/* Coin / Badge */}
        <circle cx="24" cy="27" r="2.5" fill="#3B82F6" stroke="#4C5FAD" strokeWidth="1.5" />
        <path d="M30 14L34 18" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "collection",
    title: "Wide Collection",
    description: "Explore a vast variety of books and stationery essentials.",
    shortDesc: "Huge library variety",
    badge: "10K+ Books",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#EEF2FF" />
        <path d="M14 20C14 16.6863 16.6863 14 20 14H28C31.3137 14 34 16.6863 34 20V28C34 31.3137 31.3137 34 28 34H20C16.6863 34 14 31.3137 14 28V20Z" fill="#4C5FAD" opacity="0.15" />
        {/* Open Book */}
        <path d="M24 18V32M24 18C21.5 16.5 17.5 16.5 15 18V31C17.5 29.5 21.5 29.5 24 31M24 18C26.5 16.5 30.5 16.5 33 18V31C30.5 29.5 26.5 29.5 24 31" stroke="#4C5FAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Bookmark star */}
        <path d="M24 13L25 15.5L27.5 15.5L25.5 17L26.5 19.5L24 18L21.5 19.5L22.5 17L20.5 15.5L23 15.5L24 13Z" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "Fast Delivery",
    description: "Quick, trackable and reliable delivery at your doorstep.",
    shortDesc: "Speedy doorstep drop",
    badge: "Express Drop",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#EEF2FF" />
        <path d="M14 20C14 16.6863 16.6863 14 20 14H28C31.3137 14 34 16.6863 34 20V28C34 31.3137 31.3137 34 28 34H20C16.6863 34 14 31.3137 14 28V20Z" fill="#4C5FAD" opacity="0.15" />
        {/* Delivery Truck */}
        <path d="M14 20H26V30H14V20Z" stroke="#4C5FAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 23H31L34 26V30H26V23Z" stroke="#4C5FAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="30" r="2.5" fill="#3B82F6" stroke="#4C5FAD" strokeWidth="1.5" />
        <circle cx="30" cy="30" r="2.5" fill="#3B82F6" stroke="#4C5FAD" strokeWidth="1.5" />
        {/* Speed Wind Lines */}
        <path d="M11 22H13M10 26H12M11 30H13" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "returns",
    title: "Easy Returns",
    description: "Hassle-free 7-day replacement and customer refund policy.",
    shortDesc: "7-day easy exchange",
    badge: "Guaranteed",
    svg: (
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="#EEF2FF" />
        <path d="M14 20C14 16.6863 16.6863 14 20 14H28C31.3137 14 34 16.6863 34 20V28C34 31.3137 31.3137 34 28 34H20C16.6863 34 14 31.3137 14 28V20Z" fill="#4C5FAD" opacity="0.15" />
        {/* Circular Return Arrow */}
        <path d="M24 16C28.4183 16 32 19.5817 32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 21.5 17.15 19.26 19 17.8" stroke="#4C5FAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 14V18H15" stroke="#4C5FAD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Verification Checkmark */}
        <path d="M21 24L23.5 26.5L28 21.5" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Staggered zero-gravity floating configurations with DOUBLED amplitude, sway, tilt, and shadow modulation
const floatingVariants = [
  {
    animate: {
      y: [-25, 26, -25],
      x: [-7, 7, -7],
      rotate: [-4.5, 4.0, -4.5],
      boxShadow: [
        "0 26px 38px -8px rgba(76, 95, 173, 0.28), 0 12px 18px -6px rgba(76, 95, 173, 0.18)",
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
        "0 26px 38px -8px rgba(76, 95, 173, 0.28), 0 12px 18px -6px rgba(76, 95, 173, 0.18)",
      ],
      transition: {
        duration: 3.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0,
      },
    },
  },
  {
    animate: {
      y: [26, -24, 26],
      x: [7, -7, 7],
      rotate: [4.0, -4.5, 4.0],
      boxShadow: [
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
        "0 26px 38px -8px rgba(76, 95, 173, 0.28), 0 12px 18px -6px rgba(76, 95, 173, 0.18)",
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
      ],
      transition: {
        duration: 3.9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  },
  {
    animate: {
      y: [-28, 23, -28],
      x: [-8, 6, -8],
      rotate: [-4.8, 3.6, -4.8],
      boxShadow: [
        "0 26px 38px -8px rgba(76, 95, 173, 0.28), 0 12px 18px -6px rgba(76, 95, 173, 0.18)",
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
        "0 26px 38px -8px rgba(76, 95, 173, 0.28), 0 12px 18px -6px rgba(76, 95, 173, 0.18)",
      ],
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6,
      },
    },
  },
  {
    animate: {
      y: [24, -27, 24],
      x: [6, -8, 6],
      rotate: [3.6, -4.6, 3.6],
      boxShadow: [
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
        "0 26px 38px -8px rgba(76, 95, 173, 0.28), 0 12px 18px -6px rgba(76, 95, 173, 0.18)",
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
      ],
      transition: {
        duration: 3.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  },
];

const ChooseUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-blue-50/20 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-6 sm:py-8 md:py-12 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-2.5 sm:px-4 md:px-6">
        {/* Section Heading: Synchronized entrance on scroll */}
        <div className="relative z-20 text-center mb-4 sm:mb-6 md:mb-8 px-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-[#4C5FAD] dark:text-blue-300 text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1.5"
          >
            <span>Our Core Commitments</span>
          </motion.div>

          {/* Heading - smoothly animates from LEFT on scroll */}
          <motion.h2
            initial={{ opacity: 0, x: -70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight uppercase tracking-tight"
          >
            Why Choose Us?
          </motion.h2>

          {/* Subtitle - smoothly animates from RIGHT on scroll */}
          <motion.p
            initial={{ opacity: 0, x: 70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-300 max-w-lg mx-auto leading-relaxed"
          >
            Our customers love us for a reason. Here’s why you should too!
          </motion.p>
        </div>

        {/* 4 Cards in EXACTLY ONE ROW on all screen sizes with generous clearance for doubled float travel */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 lg:gap-5 w-full py-6 sm:py-8 md:py-10">
          {points.map((point, index) => {
            const floatAnim = floatingVariants[index % floatingVariants.length];

            return (
              <motion.div
                key={point.id}
                variants={floatAnim}
                animate="animate"
                whileHover={{ scale: 1.1, y: -30, transition: { duration: 0.25 } }}
                className="
                  relative
                  rounded-xl sm:rounded-2xl
                  bg-white dark:bg-gray-800/95
                  border border-blue-100/90 dark:border-gray-700/80
                  hover:ring-2 hover:ring-blue-500/25
                  transition-all duration-300
                  p-1.5 sm:p-3 md:p-4 lg:p-5
                  flex flex-col items-center text-center
                  overflow-hidden
                  select-none
                  cursor-pointer
                "
              >
                {/* Background SVG Motif with Royal Blue dot matrix and subtle glow */}
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id={`glow-${point.id}`} cx="50%" cy="0%" r="80%">
                      <stop offset="0%" stopColor="#E0EFFE" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                    <pattern id={`dots-${point.id}`} width="12" height="12" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.2" fill="#4C5FAD" opacity="0.08" />
                    </pattern>
                  </defs>

                  <rect width="200" height="200" fill={`url(#glow-${point.id})`} />
                  <rect width="200" height="200" fill={`url(#dots-${point.id})`} />
                  {/* Subtle top accent bar */}
                  <rect x="0" y="0" width="200" height="3" fill="#4C5FAD" opacity="0.8" />
                </svg>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
                  {/* SVG Icon Container in BookNest Royal Blue palette */}
                  <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center mb-1 sm:mb-2 md:mb-3 drop-shadow-xs">
                    {point.svg}
                  </div>

                  {/* Title */}
                  <h3 className="text-[9px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-800 dark:text-white leading-tight mb-0.5 sm:mb-1">
                    {point.title}
                  </h3>

                  {/* Description: full on tablet/desktop, compact shortDesc on mobile */}
                  <p className="text-[7px] sm:text-[10px] md:text-xs text-gray-500 dark:text-gray-300 leading-tight sm:leading-snug">
                    <span className="hidden sm:inline">{point.description}</span>
                    <span className="inline sm:hidden">{point.shortDesc}</span>
                  </p>

                  {/* Micro badge pill */}
                  <div className="mt-1 sm:mt-2">
                    <span className="inline-block px-1 sm:px-2 py-0.5 rounded-full bg-blue-50/90 dark:bg-blue-950/70 text-[#4C5FAD] dark:text-blue-300 text-[6px] sm:text-[8px] md:text-[9px] font-semibold tracking-wide uppercase border border-blue-100/60 dark:border-blue-800/60">
                      {point.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
