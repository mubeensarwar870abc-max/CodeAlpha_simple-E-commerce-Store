import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import { motion, useInView } from "framer-motion";
import { FaTag, FaArrowRight, FaCheck, FaCopy, FaFire, FaClock } from "react-icons/fa";

const defaultOffersData = [
  {
    id: 1,
    title: "Notebooks Mega Sale",
    tag: "30% OFF",
    code: "STUDY30",
    description: "High quality spiral and hardbound notebooks at up to 30% discount. Perfect for school & college students.",
    image: "/images/nt1.jpg",
    route: "/office-supplies",
    badge: "Top Seller",
    expiry: "Limited Time Deal",
    gradient: "from-[#4C5FAD] to-[#2563EB]",
  },
  {
    id: 2,
    title: "School Bags & Covers",
    tag: "FLAT 25% OFF",
    code: "BAGS25",
    description: "Durable school bags, project files and test clipboard sets with special back-to-school promotional prices.",
    image: "/images/cp1.jpg",
    route: "/kids-stationary",
    badge: "Hot Bundle",
    expiry: "Flash Sale",
    gradient: "from-[#2563EB] to-[#60A5FA]",
  },
  {
    id: 3,
    title: "Stationery Essentials",
    tag: "BUY 2 GET 1 FREE",
    code: "STATIONERY",
    description: "Pencils, pointer pens, geometry boxes and sketch colors at unbelievable bundle deals for creative kids.",
    image: "/images/pencil1.jpg",
    route: "/kids-stationary",
    badge: "Best Value",
    expiry: "Popular Offer",
    gradient: "from-[#3F5198] to-[#4C5FAD]",
  },
];

const Offers = () => {
  const navigate = useNavigate();
  const { store } = useStore();
  const [copiedId, setCopiedId] = useState(null);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });

  const rawOffers = store.offers && store.offers.length >= 3 ? store.offers : defaultOffersData;

  const offers = rawOffers.slice(0, 3).map((item, idx) => ({
    ...defaultOffersData[idx],
    ...item,
    tag: defaultOffersData[idx]?.tag || "SPECIAL DEAL",
    code: defaultOffersData[idx]?.code || `DEAL${idx + 1}`,
    badge: defaultOffersData[idx]?.badge || "Special Offer",
    expiry: defaultOffersData[idx]?.expiry || "Limited Offer",
    image: item.image || defaultOffersData[idx]?.image,
    route: defaultOffersData[idx]?.route || "/books",
  }));

  const handleCopyCode = (e, id, code) => {
    e.stopPropagation();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2200);
  };

  const handleClaimOffer = (route) => {
    navigate(route || "/books");
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-2.5 sm:py-4 md:py-6 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-1.5 sm:px-3 md:px-6">
        {/* Section Heading: Synchronized entrance on scroll */}
        <div className="relative z-20 text-center mb-2 sm:mb-4 md:mb-5 px-1 sm:px-2">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-800 text-[#4C5FAD] dark:text-blue-300 text-[8px] sm:text-[9px] md:text-xs font-semibold tracking-wider uppercase mb-0.5 sm:mb-1"
          >
            <FaFire className="text-amber-500 text-[8px] sm:text-[10px]" />
            <span>Exclusive Deals & Discounts</span>
          </motion.div>

          {/* Heading - smoothly animates from LEFT on scroll */}
          <motion.h2
            initial={{ opacity: 0, x: -70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 dark:text-white leading-tight uppercase tracking-tight"
          >
            Special Offers
          </motion.h2>

          {/* Subtitle - smoothly animates from RIGHT on scroll */}
          <motion.p
            initial={{ opacity: 0, x: 70 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 70 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-0.5 sm:mt-1 text-[9px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-300 max-w-lg mx-auto leading-tight sm:leading-relaxed line-clamp-1"
          >
            Grab massive discounts on premium books, notebooks, and learning packages
          </motion.p>
        </div>

        {/* 3 Offer Cards Grid - exactly 3 columns across ALL screen sizes */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 w-full py-1 sm:py-2">
          {offers.map((offer, index) => {
            const isCopied = copiedId === offer.id;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: index % 2 === 0 ? [-3, 4, -3] : [4, -3, 4],
                        scale: 1,
                      }
                    : { opacity: 0, y: 25, scale: 0.95 }
                }
                transition={{
                  y: {
                    duration: 3.6 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  },
                  opacity: { duration: 0.5, delay: index * 0.12 },
                  scale: { duration: 0.5, delay: index * 0.12 },
                }}
                whileHover={{ scale: 1.03, y: -6, transition: { duration: 0.2 } }}
                onClick={() => handleClaimOffer(offer.route)}
                className="
                  group
                  relative
                  rounded-xl sm:rounded-2xl
                  bg-white dark:bg-gray-800/95
                  border border-blue-100/90 dark:border-gray-700/80
                  shadow-xs sm:shadow-sm hover:shadow-xl
                  hover:ring-2 hover:ring-blue-500/25
                  transition-all duration-300
                  flex flex-col justify-between
                  overflow-hidden
                  cursor-pointer
                  select-none
                "
              >
                {/* Background SVG Motif with Royal Blue dot matrix & soft glow */}
                <svg
                  viewBox="0 0 380 420"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id={`offerRadial-${offer.id}`} cx="90%" cy="10%" r="80%">
                      <stop offset="0%" stopColor="#E0EFFE" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                    <pattern id={`offerDotPat-${offer.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
                      <circle cx="2.5" cy="2.5" r="1.3" fill="#4C5FAD" opacity="0.08" />
                    </pattern>
                  </defs>

                  <rect width="380" height="420" fill={`url(#offerRadial-${offer.id})`} />
                  <rect width="380" height="420" fill={`url(#offerDotPat-${offer.id})`} />
                  {/* Top royal blue accent bar */}
                  <rect x="0" y="0" width="380" height="3" fill="#4C5FAD" opacity="0.9" />
                </svg>

                {/* Card Header Media & Badges */}
                <div className="relative z-10 w-full p-1 sm:p-2 md:p-3 pb-0">
                  {/* Image showcase box with subtle border and zoom effect */}
                  <div className="relative w-full h-18 sm:h-28 md:h-36 lg:h-44 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border border-blue-100/70 shadow-inner flex items-center justify-center">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      onError={(e) => {
                        if (!e.target.dataset.tried) {
                          e.target.dataset.tried = "true";
                          e.target.src = "/images/nt1.jpg";
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Discount Badge in Royal Blue & Cyan */}
                    <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2 z-20 flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 md:px-2 py-0.5 rounded-full bg-gradient-to-r from-[#4C5FAD] to-[#2563EB] text-white text-[7px] sm:text-[9px] md:text-xs font-black shadow-xs tracking-wide uppercase">
                      <FaTag className="text-amber-300 text-[6px] sm:text-[8px] md:text-[9px]" />
                      <span>{offer.tag}</span>
                    </div>

                    {/* Expiry / Urgency Pill (hidden on smallest screens to prevent overlap) */}
                    <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 md:top-2 md:right-2 z-20 hidden min-[360px]:flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-gray-700 text-[6px] sm:text-[8px] md:text-[9px] font-semibold shadow-2xs">
                      <FaClock className="text-blue-500 text-[6px] sm:text-[7px]" />
                      <span>{offer.expiry}</span>
                    </div>

                    {/* Badge Pill on bottom left of image */}
                    <div className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 md:bottom-2 md:left-2 z-20">
                      <span className="px-1 sm:px-1.5 py-0.5 rounded bg-white/95 text-[#4C5FAD] text-[6px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-wider shadow-2xs">
                        {offer.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="relative z-10 p-1.5 sm:p-2.5 md:p-3.5 pt-1.5 sm:pt-2 flex flex-col justify-between flex-1">
                  <div>
                    {/* Offer Title */}
                    <h3 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-900 dark:text-white group-hover:text-[#4C5FAD] dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-1 mb-0.5">
                      {offer.title}
                    </h3>

                    {/* Offer Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-[8px] sm:text-[10px] md:text-xs leading-tight line-clamp-1 sm:line-clamp-2 mb-1 sm:mb-2">
                      {offer.description}
                    </p>
                  </div>

                  {/* Coupon Code Strip & CTA Action */}
                  <div className="pt-1 sm:pt-1.5 border-t border-gray-100 dark:border-gray-700/80 flex flex-col gap-1 sm:gap-1.5">
                    {/* Promo Code Box with One-Click Copy */}
                    <div className="flex items-center justify-between bg-blue-50/70 dark:bg-gray-900/80 border border-blue-100/80 dark:border-gray-700 rounded-md sm:rounded-lg px-1 sm:px-2 py-0.5 sm:py-1">
                      <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
                        <span className="text-[7px] sm:text-[9px] text-gray-400 dark:text-gray-400 font-semibold uppercase hidden min-[360px]:inline">
                          Code:
                        </span>
                        <span className="text-[8px] sm:text-[10px] md:text-xs font-mono font-bold text-[#4C5FAD] dark:text-blue-300 tracking-tight truncate">
                          {offer.code}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleCopyCode(e, offer.id, offer.code)}
                        className={`inline-flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] md:text-[10px] font-semibold transition-all cursor-pointer ${
                          isCopied
                            ? "bg-green-600 text-white"
                            : "bg-white dark:bg-gray-800 text-[#4C5FAD] dark:text-blue-300 border border-blue-200 dark:border-gray-600 hover:bg-blue-600 hover:text-white shadow-2xs"
                        }`}
                        title="Click to copy coupon code"
                      >
                        {isCopied ? (
                          <>
                            <FaCheck className="text-[6px] sm:text-[8px]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <FaCopy className="text-[6px] sm:text-[8px]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Claim Offer CTA Button */}
                    <button
                      type="button"
                      onClick={() => handleClaimOffer(offer.route)}
                      className="w-full mt-0.5 bg-[#4C5FAD] hover:bg-[#3F5198] text-white py-1 sm:py-1.5 md:py-2 px-1 sm:px-2 rounded-md sm:rounded-xl text-[8px] sm:text-[10px] md:text-xs font-semibold transition-all shadow-2xs hover:shadow-sm flex items-center justify-center gap-1 cursor-pointer active:scale-98"
                    >
                      <span className="truncate">Claim Offer</span>
                      <FaArrowRight className="text-[7px] sm:text-[9px] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
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

export default Offers;
