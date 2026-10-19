import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { FiArrowLeft, FiX, FiPlus, FiMinus } from "react-icons/fi";

const PASTEL_COLORS = [
  "bg-[#ffeef6]", // Soft pink (like lavender foam soap)
  "bg-[#fff9db]", // Soft pastel yellow/amber (like method men)
  "bg-[#e0f5fe]", // Soft light cyan/mint (like lemon mint)
  "bg-[#f3e8ff]", // Soft lavender purple
  "bg-[#e8f7ee]", // Soft pastel green
  "bg-[#fff0e6]", // Soft pastel peach
];

// Sample items matching the exact user screenshot demo
const DEMO_ITEMS = [
  {
    id: "demo-1",
    title: "lavender foam hand soap",
    subtitle: "lavendar",
    price: 4.0,
    quantity: 2,
    image: "/images/f1.jpg",
  },
  {
    id: "demo-2",
    title: "method men bar soap",
    subtitle: "sea + surf",
    price: 4.0,
    quantity: 2,
    image: "/images/f2.jpg",
  },
  {
    id: "demo-3",
    title: "lemon mint foam hand soap",
    subtitle: "lemon mint",
    price: 4.0,
    quantity: 2,
    image: "/images/f3.jpg",
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToCart,
    totalPrice,
  } = useCart();

  // Determine default currency: if cart has items with price > 100, default to Rs; otherwise £
  const hasHighPriceItems = useMemo(() => {
    return cartItems.some((item) => (item.price || 0) > 100);
  }, [cartItems]);

  const [currency, setCurrency] = useState(hasHighPriceItems ? "Rs" : "£");

  // Automatically adapt currency when catalog items (Rs) or demo items (£) are in cart
  React.useEffect(() => {
    if (cartItems.length > 0) {
      const hasHigh = cartItems.some((item) => (item.price || 0) > 100);
      setCurrency(hasHigh ? "Rs" : "£");
    }
  }, [cartItems]);

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherCredit, setVoucherCredit] = useState(0);

  // Currency-aware format
  const isGBP = currency === "£";
  const formatMoney = (val) => {
    if (isGBP) {
      return `£${Number(val || 0).toFixed(2)}`;
    }
    return `Rs ${Math.round(val || 0).toLocaleString()}`;
  };

  // Milestone thresholds
  const t1 = isGBP ? 25 : 2500; // Free shipping
  const t2 = isGBP ? 40 : 4000; // Extra 5% off
  const t3 = isGBP ? 50 : 5000; // Free Dopp Kit

  const subtotal = totalPrice || 0;

  // Milestone Progress calculations
  const progress1 = Math.min(100, Math.max(0, (subtotal / t1) * 100));
  const progress2 =
    subtotal < t1
      ? 0
      : Math.min(100, Math.max(0, ((subtotal - t1) / (t2 - t1)) * 100));
  const progress3 =
    subtotal < t2
      ? 0
      : Math.min(100, Math.max(0, ((subtotal - t2) / (t3 - t2)) * 100));

  const reached1 = subtotal >= t1;
  const reached2 = subtotal >= t2;
  const reached3 = subtotal >= t3;

  // Discounts & Fees
  // Milestone 2 grants extra 5% off automatically
  const milestoneDiscount = reached2 ? subtotal * 0.05 : 0;
  const couponDiscount = (subtotal * discountPercent) / 100;
  const totalDiscount = milestoneDiscount + couponDiscount + voucherCredit;

  // Milestone 1 grants Free Shipping; otherwise other processing fee is £2.00 or Rs 200
  const baseProcessingFee = isGBP ? 2.0 : 200;
  const processingFee =
    subtotal === 0 ? 0 : reached1 ? 0 : baseProcessingFee;

  const grandTotal = Math.max(
    0,
    subtotal - totalDiscount + processingFee
  );

  const handleApplyCoupon = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      const code = couponCode.trim().toUpperCase();
      if (!code) {
        setDiscountPercent(0);
        setCouponMsg("");
        return;
      }
      if (code === "0000" || code === "SAVE5" || code === "PROMO5") {
        setDiscountPercent(5);
        setCouponMsg("5% coupon applied!");
      } else if (code === "SAVE10" || code === "BOOK10") {
        setDiscountPercent(10);
        setCouponMsg("10% coupon applied!");
      } else {
        setDiscountPercent(0);
        setCouponMsg("Invalid code");
      }
    }
  };

  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;
    const credit = isGBP ? 3.0 : 300;
    setVoucherCredit(credit);
    setIsVoucherOpen(false);
  };

  const handleLoadDemo = () => {
    clearCart();
    DEMO_ITEMS.forEach((item) => {
      addToCart(item);
    });
    setCurrency("£");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-1.5 xs:px-2.5 sm:px-4 md:px-8">
      {/* Main Card Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl md:rounded-[36px] shadow-sm md:shadow-md border border-gray-100 p-2.5 xs:p-3 sm:p-6 md:p-8 lg:p-10">
        
        {/* Top Bar with Back Arrow and Currency Selector */}
        <div className="flex items-center justify-between mb-2 xs:mb-3 sm:mb-5">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go Back"
            className="p-1 xs:p-1.5 sm:p-2 -ml-1 text-gray-800 hover:text-black hover:-translate-x-1 transition-transform"
          >
            <FiArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Currency Toggle */}
          <div className="inline-flex items-center bg-gray-100/90 rounded-full p-0.5 text-[8px] xs:text-[10px] sm:text-xs">
            <button
              onClick={() => setCurrency("£")}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium transition-colors ${
                currency === "£"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              £ GBP
            </button>
            <button
              onClick={() => setCurrency("Rs")}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-medium transition-colors ${
                currency === "Rs"
                  ? "bg-white text-gray-900 shadow-xs"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Rs PKR
            </button>
          </div>
        </div>

        {/* 
          PARENT GRID CONTAINER: 
          Preserves the exact 2-column layout on ALL screen sizes as instructed:
          Left side has shopping cart header, 3 top child milestone divs, and dynamic products.
          Right side has the summary card.
        */}
        <div className="grid grid-cols-12 gap-2 xs:gap-3 sm:gap-5 md:gap-8 items-start">
          
          {/* ================= LEFT MAIN SECTION ================= */}
          <div className="col-span-7 sm:col-span-7 md:col-span-8 min-w-0 flex flex-col">
            
            {/* Heading */}
            <h1 className="text-sm xs:text-base sm:text-2xl md:text-3xl font-extrabold text-gray-900 lowercase tracking-tight mb-2 sm:mb-4 md:mb-6">
              shopping cart
            </h1>

            {/* THREE CHILD DIVS AT THE TOP IN A ROW */}
            <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-4 md:gap-6 mb-3 xs:mb-4 sm:mb-6 md:mb-8">
              
              {/* Milestone 1: Free Shipping */}
              <div className="flex flex-col">
                <div className="flex items-start gap-1 xs:gap-1.5 sm:gap-2 mb-1 xs:mb-1.5 sm:mb-2 min-h-[34px] xs:min-h-[40px] sm:min-h-[48px]">
                  {/* Delivery Truck Icon with purple checkmark badge */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    {reached1 && (
                      <span className="absolute -top-1 -left-1 w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 bg-[#7052ff] text-white rounded-full flex items-center justify-center text-[6px] xs:text-[8px] sm:text-[9px] font-bold shadow-xs">
                        ✓
                      </span>
                    )}
                    <svg
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="3" width="14" height="13" rx="1" />
                      <polygon points="15 8 19 8 22 11 22 16 15 16 15 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="17.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-tighter leading-tight truncate">
                      GET FREE SHIPPING
                    </p>
                    <p className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-extrabold text-gray-900 mt-0.5">
                      {formatMoney(t1)}
                    </p>
                  </div>
                </div>

                {/* Yellow Progress Bar */}
                <div className="w-full bg-[#f0f1f7] h-1 xs:h-1.5 sm:h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ffc82c] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress1}%` }}
                  />
                </div>
              </div>

              {/* Milestone 2: Save Extra 5% */}
              <div className="flex flex-col">
                <div className="flex items-start gap-1 xs:gap-1.5 sm:gap-2 mb-1 xs:mb-1.5 sm:mb-2 min-h-[34px] xs:min-h-[40px] sm:min-h-[48px]">
                  {/* Coupon / Voucher Icon with purple checkmark badge */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    {reached2 && (
                      <span className="absolute -top-1 -left-1 w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 bg-[#7052ff] text-white rounded-full flex items-center justify-center text-[6px] xs:text-[8px] sm:text-[9px] font-bold shadow-xs">
                        ✓
                      </span>
                    )}
                    <svg
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                      <path d="M9 9h.01" />
                      <path d="m15 9-6 6" />
                      <path d="M15 15h.01" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-tighter leading-tight truncate">
                      SAVE EXTRA 5% OFF
                    </p>
                    <p className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-extrabold text-gray-900 mt-0.5">
                      {formatMoney(t2)}
                    </p>
                  </div>
                </div>

                {/* Yellow Progress Bar */}
                <div className="w-full bg-[#f0f1f7] h-1 xs:h-1.5 sm:h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ffc82c] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress2}%` }}
                  />
                </div>
              </div>

              {/* Milestone 3: Get Free Dopp Kit */}
              <div className="flex flex-col">
                <div className="flex items-start gap-1 xs:gap-1.5 sm:gap-2 mb-1 xs:mb-1.5 sm:mb-2 min-h-[34px] xs:min-h-[40px] sm:min-h-[48px]">
                  {/* Pouch / Dopp Kit / Gift Card Icon with purple checkmark badge */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    {reached3 && (
                      <span className="absolute -top-1 -left-1 w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 bg-[#7052ff] text-white rounded-full flex items-center justify-center text-[6px] xs:text-[8px] sm:text-[9px] font-bold shadow-xs">
                        ✓
                      </span>
                    )}
                    <svg
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                      <circle cx="12" cy="14" r="1.5" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-tighter leading-tight truncate">
                      GET A FREE DOPP KIT
                    </p>
                    <p className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-extrabold text-gray-900 mt-0.5">
                      {formatMoney(t3)}
                    </p>
                  </div>
                </div>

                {/* Yellow Progress Bar */}
                <div className="w-full bg-[#f0f1f7] h-1 xs:h-1.5 sm:h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ffc82c] h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress3}%` }}
                  />
                </div>
              </div>

            </div>

            {/* DYNAMIC PRODUCT ROWS CONTAINER */}
            <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 md:space-y-4">
              {cartItems.length === 0 ? (
                /* Sleek Empty State inside grid with Demo Loader */
                <div className="bg-[#fafafc] rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center border border-dashed border-gray-200">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1">
                    Your cart is empty
                  </p>
                  <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-400 mb-3 sm:mb-4 max-w-sm mx-auto">
                    Add products from the store or load the preview demo to explore this design.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={handleLoadDemo}
                      className="bg-[#7052ff] hover:bg-[#5b3df0] text-white text-[8px] xs:text-[10px] sm:text-xs font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition"
                    >
                      Load Demo Cart
                    </button>
                    <button
                      onClick={() => navigate("/books")}
                      className="border border-gray-300 text-gray-700 text-[8px] xs:text-[10px] sm:text-xs font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-50 transition"
                    >
                      Browse Books
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic Items List */
                cartItems.map((item, index) => {
                  const productImage =
                    item.image ||
                    item.imageUrl ||
                    item.thumbnail ||
                    item.img ||
                    "";
                  const pastelBg =
                    item.bgTint ||
                    PASTEL_COLORS[index % PASTEL_COLORS.length];
                  const itemTitle = item.title || item.name || "Product";
                  const itemSubtitle =
                    item.subtitle ||
                    item.author ||
                    item.category ||
                    "standard edition";

                  return (
                    <div
                      key={item.id}
                      className="bg-[#fafafc] hover:bg-[#f6f7fb] transition-colors rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-3 md:p-4 flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-4 border border-transparent hover:border-gray-100"
                    >
                      {/* Product Thumbnail with Pastel Background */}
                      <div
                        onClick={() => navigate("/#products")}
                        title="View product on home page"
                        className={`w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-lg xs:rounded-xl sm:rounded-2xl ${pastelBg} flex-shrink-0 flex items-center justify-center overflow-hidden p-1 sm:p-1.5 cursor-pointer hover:opacity-90 transition`}
                      >
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={itemTitle}
                            className="w-full h-full object-contain drop-shadow-xs"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              if (e.currentTarget.nextSibling) {
                                e.currentTarget.nextSibling.style.display =
                                  "block";
                              }
                            }}
                          />
                        ) : null}
                        <div
                          style={{
                            display: productImage ? "none" : "block",
                          }}
                          className="text-[8px] xs:text-[10px] sm:text-xs text-gray-400 font-bold"
                        >
                          📦
                        </div>
                      </div>

                      {/* Product Title and Subtitle */}
                      <div
                        onClick={() => navigate("/#products")}
                        title="View product on home page"
                        className="min-w-0 flex-1 ml-0.5 xs:ml-1 sm:ml-2 cursor-pointer group"
                      >
                        <h2 className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold text-gray-900 group-hover:text-blue-600 lowercase truncate leading-tight transition-colors">
                          {itemTitle}
                        </h2>
                        <p className="text-[7px] xs:text-[8px] sm:text-[10px] md:text-xs text-gray-400 lowercase truncate mt-0.5">
                          {itemSubtitle}
                        </p>
                      </div>

                      {/* Quantity Selector Pill: - 2 + */}
                      <div className="bg-white border border-gray-200/80 rounded-full px-1 xs:px-1.5 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 shadow-xs flex-shrink-0">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          aria-label="Decrease quantity"
                          className="text-gray-500 hover:text-gray-900 transition-colors text-[9px] xs:text-[10px] sm:text-xs font-bold px-0.5 select-none"
                        >
                          <FiMinus className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3" />
                        </button>
                        <span className="text-[8px] xs:text-[10px] sm:text-xs font-bold text-gray-800 min-w-[10px] xs:min-w-[12px] sm:min-w-[16px] text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="text-gray-500 hover:text-gray-900 transition-colors text-[9px] xs:text-[10px] sm:text-xs font-bold px-0.5 select-none"
                        >
                          <FiPlus className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3" />
                        </button>
                      </div>

                      {/* Product Price */}
                      <div className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-900 ml-1 xs:ml-2 sm:ml-4 md:ml-6 flex-shrink-0 text-right min-w-[34px] xs:min-w-[42px] sm:min-w-[56px]">
                        {formatMoney(item.price * item.quantity)}
                      </div>

                      {/* Remove Button '×' */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-gray-400 hover:text-red-500 transition-colors ml-0.5 xs:ml-1 sm:ml-2 flex-shrink-0 p-0.5 cursor-pointer"
                      >
                        <FiX className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Actions if cart has items */}
            {cartItems.length > 0 && (
              <div className="flex items-center justify-between mt-3 xs:mt-4 sm:mt-6 pt-2 border-t border-gray-100 text-[8px] xs:text-[10px] sm:text-xs">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-medium transition"
                >
                  Clear cart
                </button>
                <button
                  onClick={() => navigate("/books")}
                  className="text-gray-500 hover:text-gray-800 font-medium transition"
                >
                  + Add more items
                </button>
              </div>
            )}

          </div>

          {/* ================= RIGHT SUMMARY SECTION ================= */}
          <div className="col-span-5 sm:col-span-5 md:col-span-4 min-w-0">
            <div className="bg-[#f9fafe] rounded-xl sm:rounded-2xl md:rounded-3xl p-2 xs:p-2.5 sm:p-4 md:p-6 lg:p-7 border border-gray-100/90 shadow-xs flex flex-col justify-between">
              
              <div>
                {/* Heading */}
                <h2 className="text-xs xs:text-sm sm:text-lg md:text-2xl font-extrabold text-gray-900 lowercase tracking-tight mb-2 xs:mb-3 sm:mb-5">
                  summary
                </h2>

                {/* Coupon Code Row */}
                <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
                  <span className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm text-gray-500 font-medium lowercase truncate">
                    coupon code
                  </span>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyDown={handleApplyCoupon}
                    onBlur={handleApplyCoupon}
                    placeholder="0000"
                    className="w-10 xs:w-12 sm:w-16 md:w-20 bg-white border border-gray-200 text-gray-800 text-[8px] xs:text-[9px] sm:text-xs text-center py-0.5 sm:py-1 px-1 rounded-full outline-none focus:border-[#7052ff] focus:ring-1 focus:ring-[#7052ff] font-mono placeholder-gray-300"
                  />
                </div>

                {couponMsg && (
                  <p className="text-[7px] xs:text-[8px] sm:text-[10px] text-right text-emerald-600 font-medium -mt-1 mb-2">
                    {couponMsg}
                  </p>
                )}

                {/* E-Voucher Row */}
                <div className="flex items-center justify-between gap-1 mb-3 xs:mb-4 sm:mb-5">
                  <span className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm text-gray-500 font-medium lowercase truncate">
                    e-voucher
                  </span>
                  <button
                    onClick={() => setIsVoucherOpen((prev) => !prev)}
                    className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-semibold text-[#7052ff] hover:underline"
                  >
                    + add
                  </button>
                </div>

                {/* Expandable Voucher Input */}
                {isVoucherOpen && (
                  <div className="mb-3 p-1.5 xs:p-2 bg-white rounded-lg border border-purple-100 flex items-center gap-1">
                    <input
                      type="text"
                      placeholder="ENTER CODE"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full text-[8px] xs:text-[10px] sm:text-xs outline-none uppercase font-mono px-1"
                    />
                    <button
                      onClick={handleApplyVoucher}
                      className="bg-[#7052ff] text-white text-[7px] xs:text-[9px] sm:text-xs px-2 py-0.5 rounded-md"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {/* Divider Line */}
                <div className="border-t border-gray-200/60 my-2 xs:my-2.5 sm:my-4" />

                {/* Price Breakdown */}
                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 text-[8px] xs:text-[9px] sm:text-xs md:text-sm">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="lowercase">subtotal</span>
                    <span className="font-semibold text-gray-800">
                      {formatMoney(subtotal)}
                    </span>
                  </div>

                  {/* Other Processing Fee */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="lowercase">other processing fee</span>
                    <span className="font-semibold text-gray-800">
                      {reached1 ? (
                        <span className="text-emerald-600 font-bold">Free</span>
                      ) : (
                        formatMoney(processingFee)
                      )}
                    </span>
                  </div>

                  {/* Taxes */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="lowercase">est taxes</span>
                    <span className="font-semibold text-gray-800">—</span>
                  </div>

                  {/* Milestone 2 Extra Discount (if reached) */}
                  {reached2 && (
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span className="lowercase">extra 5% reward</span>
                      <span>-{formatMoney(milestoneDiscount)}</span>
                    </div>
                  )}

                  {/* Coupon Discount (if applied) */}
                  {discountPercent > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span className="lowercase">coupon ({discountPercent}%)</span>
                      <span>-{formatMoney(couponDiscount)}</span>
                    </div>
                  )}

                  {/* Voucher Credit (if applied) */}
                  {voucherCredit > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span className="lowercase">e-voucher credit</span>
                      <span>-{formatMoney(voucherCredit)}</span>
                    </div>
                  )}
                </div>

                {/* Total and Grand Total */}
                <div className="border-t border-gray-200/60 my-2 xs:my-2.5 sm:my-4 pt-1.5 xs:pt-2 sm:pt-3 space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-[8px] xs:text-[9px] sm:text-xs md:text-sm text-gray-600">
                    <span className="lowercase font-medium">total</span>
                    <span className="font-bold text-gray-900">
                      {formatMoney(grandTotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[9px] xs:text-[10px] sm:text-sm md:text-lg font-black text-gray-900 pt-1">
                    <span className="lowercase">grand total</span>
                    <span>{formatMoney(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => navigate("/order-summary")}
                disabled={cartItems.length === 0}
                className="w-full mt-3 xs:mt-4 sm:mt-6 bg-[#7052ff] hover:bg-[#5b3df0] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] text-white font-semibold py-1.5 xs:py-2 sm:py-3 md:py-3.5 px-2 xs:px-3 sm:px-6 rounded-full transition-all text-center text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base lowercase shadow-md shadow-indigo-100"
              >
                proceed to checkout
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;