import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    id: "ali",
    name: "Mr. Ali Raza",
    role: "Parent & Regular Buyer",
    badge: "Verified Parent",
    rating: 5,
    feedback:
      "Amazing collection of school textbooks and storybooks! Delivery was super fast across Lahore and the books were packed in pristine condition. Highly recommended!",
    avatarGradient: "from-[#4C5FAD] to-[#314182]",
    initials: "AR",
    itemPurchased: "Complete Syllabus Set",
  },
  {
    id: "sara",
    name: "Sara Khan",
    role: "Medical Student",
    badge: "Verified Student",
    rating: 5,
    feedback:
      "I found all my exam preparation guides and high-grade notebooks in one place. Affordable rates, genuine copies, and quick tracking saved me so much time!",
    avatarGradient: "from-[#2563EB] to-[#60A5FA]",
    initials: "SK",
    itemPurchased: "Exam Prep & Notebooks",
  },
  {
    id: "fatima",
    name: "Mrs. Fatima Tariq",
    role: "Senior School Educator",
    badge: "Verified Educator",
    rating: 5,
    feedback:
      "Outstanding customer service and wide variety. The geometry boxes and art stationery sets for our school students were top quality. BookNest is our trusted store!",
    avatarGradient: "from-[#3F5198] to-[#4C5FAD]",
    initials: "FT",
    itemPurchased: "Stationery & Geometry Kits",
  },
];

// Staggered zero-gravity floating configurations with amplified amplitude, sway, tilt, and shadow modulation
const floatingVariants = [
  {
    animate: {
      y: [-25, 26, -25],
      x: [-7, 7, -7],
      rotate: [-4.2, 3.8, -4.2],
      boxShadow: [
        "0 26px 38px -8px rgba(76, 95, 173, 0.25), 0 12px 18px -6px rgba(76, 95, 173, 0.16)",
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
        "0 26px 38px -8px rgba(76, 95, 173, 0.25), 0 12px 18px -6px rgba(76, 95, 173, 0.16)",
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
      y: [26, -25, 26],
      x: [7, -7, 7],
      rotate: [3.8, -4.2, 3.8],
      boxShadow: [
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
        "0 26px 38px -8px rgba(76, 95, 173, 0.25), 0 12px 18px -6px rgba(76, 95, 173, 0.16)",
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
      ],
      transition: {
        duration: 4.1,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      },
    },
  },
  {
    animate: {
      y: [-27, 24, -27],
      x: [-7.5, 6.5, -7.5],
      rotate: [-4.5, 3.5, -4.5],
      boxShadow: [
        "0 26px 38px -8px rgba(76, 95, 173, 0.25), 0 12px 18px -6px rgba(76, 95, 173, 0.16)",
        "0 3px 8px -2px rgba(76, 95, 173, 0.08), 0 1px 3px -1px rgba(76, 95, 173, 0.05)",
        "0 26px 38px -8px rgba(76, 95, 173, 0.25), 0 12px 18px -6px rgba(76, 95, 173, 0.16)",
      ],
      transition: {
        duration: 3.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8,
      },
    },
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-blue-50/20 via-white to-blue-50/40 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-6 sm:py-8 md:py-12 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Heading: Synchronized entrance on scroll */}
        <div className="relative z-20 text-center mb-4 sm:mb-6 md:mb-8 px-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-[#4C5FAD] dark:text-blue-300 text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1.5"
          >
            <span>Customer Testimonials</span>
          </motion.div>

          {/* Heading - smoothly animates from LEFT on scroll */}
          <motion.h2
            initial={{ opacity: 0, x: -70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white leading-tight uppercase tracking-tight"
          >
            What Our Customers Say
          </motion.h2>

          {/* Subtitle - smoothly animates from RIGHT on scroll */}
          <motion.p
            initial={{ opacity: 0, x: 70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-300 max-w-lg mx-auto leading-relaxed"
          >
            Real feedback from parents, students, and teachers who trust BookNest
          </motion.p>
        </div>

        {/* 3 Review Cards with Doubled Zero-Gravity Floating Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full py-6 sm:py-8 md:py-10">
          {testimonials.map((t, index) => {
            const floatAnim = floatingVariants[index % floatingVariants.length];

            return (
              <motion.div
                key={t.id}
                variants={floatAnim}
                animate="animate"
                whileHover={{ scale: 1.07, y: -30, transition: { duration: 0.25 } }}
                className="
                  relative
                  rounded-2xl
                  bg-white dark:bg-gray-800/95
                  border border-blue-100/90 dark:border-gray-700/80
                  hover:ring-2 hover:ring-blue-500/25
                  transition-all duration-300
                  p-4 sm:p-5 md:p-6
                  flex flex-col justify-between
                  overflow-hidden
                  select-none
                  cursor-pointer
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
                    <radialGradient id={`testGlow-${t.id}`} cx="85%" cy="15%" r="75%">
                      <stop offset="0%" stopColor="#E0EFFE" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                    <pattern id={`testDots-${t.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="2.5" cy="2.5" r="1.3" fill="#4C5FAD" opacity="0.08" />
                    </pattern>
                  </defs>

                  <rect width="350" height="260" fill={`url(#testGlow-${t.id})`} />
                  <rect width="350" height="260" fill={`url(#testDots-${t.id})`} />
                  {/* Top BookNest Royal Blue accent bar */}
                  <rect x="0" y="0" width="350" height="3.5" fill="#4C5FAD" opacity="0.85" />
                </svg>

                {/* Decorative SVG Quotation Mark */}
                <svg
                  viewBox="0 0 32 32"
                  className="absolute top-4 right-4 w-9 h-9 text-[#4C5FAD] opacity-15 pointer-events-none"
                  fill="currentColor"
                >
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z" />
                </svg>

                {/* Card Top: Rating Stars & Verified Badge */}
                <div className="relative z-10 flex items-center justify-between mb-3">
                  {/* Golden 5 Stars in SVG */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Verified Customer Badge SVG */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-[#4C5FAD] dark:text-blue-300 text-[10px] font-semibold tracking-wide">
                    <svg viewBox="0 0 16 16" className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <span>{t.badge}</span>
                  </div>
                </div>

                {/* Card Middle: Customer Review Quote */}
                <div className="relative z-10 mb-4">
                  <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm leading-relaxed italic">
                    "{t.feedback}"
                  </p>
                </div>

                {/* Card Bottom: User Profile Info */}
                <div className="relative z-10 flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  {/* Avatar Circle with Royal Blue Gradient */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.avatarGradient} flex items-center justify-center text-white text-xs font-bold shadow-md ring-2 ring-white dark:ring-gray-700`}
                  >
                    {t.initials}
                  </div>

                  {/* Name, Role & Purchased Product */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                      {t.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {t.role}
                    </p>
                    <p className="text-[10px] text-[#4C5FAD] dark:text-blue-400 font-medium truncate mt-0.5">
                      ✓ {t.itemPurchased}
                    </p>
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

export default Testimonials;
