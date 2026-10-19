import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useOrders } from "../Context/OrderContext";
import { useStore } from "../Context/StoreContext";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCreditCard,
  FiTruck,
  FiChevronDown,
  FiPhoneCall,
  FiShoppingBag,
} from "react-icons/fi";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { store } = useStore();

  const siteName = store?.settings?.siteName || "Business";
  const contactWhatsApp = store?.settings?.contactWhatsApp || "+92 316 0612173";

  // Form state matching the uploaded screenshot fields
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    country: "Pakistan",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // Payment method selection & expansion state
  const [showPaymentDiv, setShowPaymentDiv] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "card"
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardHolder: "",
  });

  // Currency & calculations matching the cart page
  const hasHighPriceItems = useMemo(() => {
    return cartItems.some((item) => (item.price || 0) > 100);
  }, [cartItems]);

  const currency = hasHighPriceItems ? "Rs" : "£";
  const isGBP = currency === "£";

  const formatMoney = (val) => {
    if (isGBP) {
      return `£${Number(val || 0).toFixed(2)}`;
    }
    return `Rs ${Math.round(val || 0).toLocaleString()}`;
  };

  const subtotal = totalPrice || 0;

  // Milestone matching Cart page:
  // Thresholds: £25 / Rs 2,500 gives Free Shipping; £40 / Rs 4,000 gives 5% extra discount
  const freeShippingThreshold = isGBP ? 25 : 2500;
  const extraDiscountThreshold = isGBP ? 40 : 4000;

  const isFreeShipping = subtotal >= freeShippingThreshold;
  const baseShippingFee = isGBP ? 2.0 : 200;
  const shippingCost = subtotal === 0 ? 0 : isFreeShipping ? 0 : baseShippingFee;

  const extraDiscount = subtotal >= extraDiscountThreshold ? subtotal * 0.05 : 0;
  const grandTotal = Math.max(0, subtotal - extraDiscount + shippingCost);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Required";
    }
    if (!formData.secondName.trim()) {
      newErrors.secondName = "Required";
    }
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Address required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone required";
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = "Invalid number";
    }

    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber.trim()) {
        newErrors.cardNumber = "Card required";
      }
      if (!cardDetails.cardExpiry.trim()) {
        newErrors.cardExpiry = "Expiry required";
      }
      if (!cardDetails.cardCvc.trim()) {
        newErrors.cardCvc = "CVC required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return;
    }

    const order = {
      customer: {
        fullName: `${formData.firstName} ${formData.secondName}`.trim(),
        firstName: formData.firstName,
        secondName: formData.secondName,
        phone: formData.phone,
        email: formData.email,
        address: formData.streetAddress,
        city: formData.city,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      items: cartItems,
      subtotal: subtotal,
      shipping: shippingCost,
      discount: extraDiscount,
      grandTotal: grandTotal,
      paymentMethod:
        paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card",
    };

    const newOrder = addOrder(order);

    localStorage.setItem(
      "latestOrder",
      JSON.stringify({
        ...order,
        id: newOrder.id,
        status: newOrder.status,
        createdAt: newOrder.createdAt,
      })
    );

    clearCart();
    navigate("/order-confirmation");
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f5f8] pt-24 sm:pt-28 pb-16 px-3 sm:px-6">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-12 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-4">
            <FiShoppingBag />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mb-6">
            Please add products to your cart before proceeding to checkout.
          </p>
          <div className="flex justify-center gap-2.5">
            <button
              onClick={() => navigate("/cart")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition"
            >
              Go to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-gray-300 text-gray-700 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f8] pt-16 xs:pt-20 sm:pt-24 pb-12 sm:pb-16 px-1.5 xs:px-2.5 sm:px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* ================= TOP HEADER BAR ================= */}
        <div className="px-3 xs:px-4 sm:px-8 md:px-10 py-3 sm:py-5 border-b border-gray-100 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs group-hover:scale-105 transition-transform">
              $
            </div>
            <span className="font-extrabold text-gray-900 text-sm xs:text-base sm:text-xl tracking-tight">
              {siteName}
            </span>
          </div>

          {/* Back to Shopping Cart Link */}
          <button
            onClick={() => navigate("/cart")}
            className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-gray-600 hover:text-black uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            <FiArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            BACK TO SHOPPING CART
          </button>
        </div>

        {/* 
          PARENT GRID CONTAINER: 
          Preserved side-by-side grid layout on ALL screen sizes:
          Left Side (col-span-7 / col-span-8): User's address details
          Right Side (col-span-5 / col-span-4): Order summary
        */}
        <div className="p-2 xs:p-3 sm:p-6 md:p-8 lg:p-10 grid grid-cols-12 gap-1.5 xs:gap-2.5 sm:gap-5 md:gap-8 items-start">
          
          {/* ================= LEFT CHILD DIV: USER'S DETAILS ================= */}
          <div className="col-span-7 sm:col-span-7 md:col-span-7 lg:col-span-8 min-w-0 bg-white">
            
            {/* Header / Title */}
            <h1 className="text-sm xs:text-base sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Address details
            </h1>
            <p className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1 mb-3 sm:mb-6 leading-tight sm:leading-relaxed">
              Dynamically whiteboard frictionless models for client-centric architectures.
            </p>

            {/* Sub-heading: Delivery address */}
            <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-4">
              Delivery address
            </h2>

            {/* Form Fields */}
            <form className="space-y-2 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
              
              {/* Row 1: First Name & Second Name (Always 2 columns) */}
              <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-4">
                <div>
                  <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5 truncate">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Mateusz"
                    className={`w-full bg-[#fafafc] border rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.firstName ? "border-red-500 bg-red-50/30" : "border-gray-200"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-[7px] xs:text-[8px] sm:text-xs mt-0.5">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5 truncate">
                    SECOND NAME
                  </label>
                  <input
                    type="text"
                    name="secondName"
                    value={formData.secondName}
                    onChange={handleChange}
                    placeholder="Wierzbicki"
                    className={`w-full bg-[#fafafc] border rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.secondName ? "border-red-500 bg-red-50/30" : "border-gray-200"
                    }`}
                  />
                  {errors.secondName && (
                    <p className="text-red-500 text-[7px] xs:text-[8px] sm:text-xs mt-0.5">{errors.secondName}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Street Address */}
              <div>
                <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5">
                  STREET ADDRESS
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  placeholder="Street and number"
                  className={`w-full bg-[#fafafc] border rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                    errors.streetAddress ? "border-red-500 bg-red-50/30" : "border-gray-200"
                  }`}
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-[7px] xs:text-[8px] sm:text-xs mt-0.5">{errors.streetAddress}</p>
                )}
              </div>

              {/* Row 3: City & Zip Code (Always 2 columns) */}
              <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-4">
                <div>
                  <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5 truncate">
                    CITY
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`w-full bg-[#fafafc] border rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.city ? "border-red-500 bg-red-50/30" : "border-gray-200"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-[7px] xs:text-[8px] sm:text-xs mt-0.5">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5 truncate">
                    ZIP CODE
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="00-000"
                    className="w-full bg-[#fafafc] border border-gray-200 rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row 4: Country */}
              <div>
                <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5">
                  COUNTRY
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#fafafc] border border-gray-200 rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Poland">Poland</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                  </select>
                  <FiChevronDown className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-3.5 h-3.5" />
                </div>
              </div>

              {/* Row 5: Phone Number */}
              <div>
                <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="123456789"
                  className={`w-full bg-[#fafafc] border rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500 bg-red-50/30" : "border-gray-200"
                  }`}
                />
                <p className="text-[7px] xs:text-[8px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1">
                  Keep 9-digit format with no spaces and dashes.
                </p>
                {errors.phone && (
                  <p className="text-red-500 text-[7px] xs:text-[8px] sm:text-xs mt-0.5">{errors.phone}</p>
                )}
              </div>

              {/* Optional Email */}
              <div>
                <label className="block text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1.5">
                  EMAIL ADDRESS (OPTIONAL)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-[#fafafc] border border-gray-200 rounded-md sm:rounded-lg px-2 xs:px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* ================= PAYMENT BUTTON & EXPANDABLE PAYMENT DIV ================= */}
              <div className="pt-2 sm:pt-4 border-t border-gray-100 mt-3 sm:mt-6">
                
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-700">
                    Payment Method
                  </span>
                  
                  {/* Small button for payment */}
                  <button
                    type="button"
                    onClick={() => setShowPaymentDiv((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-[8px] xs:text-[9px] sm:text-xs font-semibold text-[#1877f2] bg-blue-50 hover:bg-blue-100 px-2 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition"
                  >
                    <span>{showPaymentDiv ? "Hide" : "Select Payment"}</span>
                    <FiChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        showPaymentDiv ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Status chip if payment method chosen */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="inline-flex items-center gap-1 text-[7px] xs:text-[8px] sm:text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 sm:py-1 rounded-md font-medium border border-emerald-100 truncate">
                    <FiCheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-emerald-600 flex-shrink-0" />
                    {paymentMethod === "cod" ? "Cash on Delivery (No Extra Fee)" : "Credit / Debit Card"}
                  </span>
                </div>

                {/* THE EXPANDED PAYMENT OPTIONS DIV */}
                {showPaymentDiv && (
                  <div className="mt-2 sm:mt-3 p-2 xs:p-3 sm:p-4 bg-[#fafafc] rounded-lg sm:rounded-xl border border-gray-200 space-y-2 sm:space-y-3 transition-all duration-300">
                    
                    {/* Option 1: Cash on Delivery (no extra charges) */}
                    <div
                      onClick={() => setPaymentMethod("cod")}
                      className={`p-2 xs:p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        paymentMethod === "cod"
                          ? "bg-white border-blue-500 shadow-xs"
                          : "bg-white/60 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            paymentMethod === "cod"
                              ? "border-blue-600 bg-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {paymentMethod === "cod" && (
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            <span className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-gray-900 truncate">
                              Cash on Delivery
                            </span>
                            <span className="bg-emerald-100 text-emerald-800 text-[6px] xs:text-[7px] sm:text-[10px] font-bold px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full flex-shrink-0">
                              No Extra Charges
                            </span>
                          </div>
                          <p className="text-[7px] xs:text-[8px] sm:text-xs text-gray-500 mt-0.5 truncate">
                            Pay with cash when delivered.
                          </p>
                        </div>
                      </div>
                      <FiTruck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-1" />
                    </div>

                    {/* Option 2: Card Details */}
                    <div
                      onClick={() => setPaymentMethod("card")}
                      className={`p-2 xs:p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl border cursor-pointer transition ${
                        paymentMethod === "card"
                          ? "bg-white border-blue-500 shadow-xs"
                          : "bg-white/60 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                              paymentMethod === "card"
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300"
                            }`}
                          >
                            {paymentMethod === "card" && (
                              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-gray-900">
                            Credit / Debit Card
                          </span>
                        </div>
                        <FiCreditCard className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gray-400" />
                      </div>

                      {/* Card Details Inputs */}
                      {paymentMethod === "card" && (
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 space-y-2 sm:space-y-3">
                          <div>
                            <label className="block text-[7px] xs:text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                              CARD NUMBER
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={cardDetails.cardNumber}
                              onChange={handleCardChange}
                              placeholder="4242 •••• •••• 4242"
                              maxLength="19"
                              className="w-full bg-[#fafafc] border border-gray-200 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] xs:text-[9px] sm:text-xs font-mono outline-none focus:bg-white focus:border-blue-500"
                            />
                            {errors.cardNumber && (
                              <p className="text-red-500 text-[7px] xs:text-[8px] mt-0.5">
                                {errors.cardNumber}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <div>
                              <label className="block text-[7px] xs:text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                                EXPIRY DATE
                              </label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={cardDetails.cardExpiry}
                                onChange={handleCardChange}
                                placeholder="MM / YY"
                                maxLength="5"
                                className="w-full bg-[#fafafc] border border-gray-200 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] xs:text-[9px] sm:text-xs font-mono outline-none focus:bg-white focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-[7px] xs:text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                                CVC / CVV
                              </label>
                              <input
                                type="password"
                                name="cardCvc"
                                value={cardDetails.cardCvc}
                                onChange={handleCardChange}
                                placeholder="123"
                                maxLength="4"
                                className="w-full bg-[#fafafc] border border-gray-200 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] xs:text-[9px] sm:text-xs font-mono outline-none focus:bg-white focus:border-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>

              {/* Submit Order Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#1877f2] hover:bg-[#1464cc] active:scale-[0.99] text-white font-bold py-2 xs:py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-lg sm:rounded-xl transition shadow-md shadow-blue-200 text-[9px] xs:text-[10px] sm:text-xs md:text-sm tracking-wide uppercase"
                >
                  Place Order
                </button>
              </div>

            </form>

          </div>

          {/* ================= RIGHT CHILD DIV: ORDER SUMMARY ================= */}
          <div className="col-span-5 sm:col-span-5 md:col-span-5 lg:col-span-4 min-w-0 bg-white">
            
            {/* The Order Summary Card matching the uploaded image */}
            <div className="border border-gray-200/80 rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-5 md:p-6 shadow-xs bg-white">
              
              <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-4">
                Order summary
              </h2>

              {/* Table Column Headers */}
              <div className="grid grid-cols-12 text-[7px] xs:text-[8px] sm:text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-1.5 sm:pb-2 border-b border-gray-100">
                <div className="col-span-7">PRODUCT</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-3 text-right">PRICE</div>
              </div>

              {/* Dynamic Product Rows */}
              <div className="divide-y divide-gray-100 py-1 sm:py-2 max-h-72 overflow-y-auto">
                {cartItems.map((item) => {
                  const productImage =
                    item.image ||
                    item.imageUrl ||
                    item.thumbnail ||
                    item.img ||
                    "";
                  const itemTitle = item.title || item.name || "Product name";
                  const itemSubtitle =
                    item.subtitle ||
                    item.author ||
                    item.category ||
                    "Standard Edition";
                  const itemPrice = item.price || 0;
                  const itemQty = item.quantity || 1;

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 items-center py-1.5 sm:py-3 gap-1 sm:gap-2"
                    >
                      {/* Product Column */}
                      <div className="col-span-7 flex items-center gap-1.5 sm:gap-3 min-w-0">
                        {/* Square image box */}
                        <div className="w-7 h-7 xs:w-9 xs:h-9 sm:w-11 sm:h-11 rounded-md sm:rounded-lg bg-[#eef1f6] flex-shrink-0 flex items-center justify-center overflow-hidden p-0.5 sm:p-1">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={itemTitle}
                              className="w-full h-full object-contain"
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
                            className="text-[8px] xs:text-[10px] text-gray-400 font-bold"
                          >
                            📦
                          </div>
                        </div>

                        {/* Title and subtitle */}
                        <div className="min-w-0 flex-1">
                          <p className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-semibold text-gray-900 truncate">
                            {itemTitle}
                          </p>
                          <p className="text-[6px] xs:text-[7px] sm:text-[10px] text-gray-400 truncate">
                            {itemSubtitle}
                          </p>
                        </div>
                      </div>

                      {/* Qty Column */}
                      <div className="col-span-2 text-center text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-medium text-gray-600">
                        {itemQty}
                      </div>

                      {/* Price Column */}
                      <div className="col-span-3 text-right text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-bold text-gray-900 truncate">
                        {formatMoney(itemPrice * itemQty)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal & Shipping Breakdown */}
              <div className="pt-2 sm:pt-3 border-t border-gray-100 space-y-1 sm:space-y-2 text-[8px] xs:text-[9px] sm:text-xs md:text-sm">
                
                <div className="flex items-center justify-between text-gray-600">
                  <span className="truncate">Subtotal ({totalQuantity} items)</span>
                  <span className="font-semibold text-gray-800 ml-1">
                    {formatMoney(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span className="truncate">Shipping cost</span>
                  <span className="font-semibold text-gray-800 ml-1">
                    {isFreeShipping ? (
                      <span className="text-emerald-600 font-bold">Free</span>
                    ) : (
                      formatMoney(shippingCost)
                    )}
                  </span>
                </div>

                {extraDiscount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-medium">
                    <span className="truncate">Extra 5% Discount</span>
                    <span className="ml-1">-{formatMoney(extraDiscount)}</span>
                  </div>
                )}

              </div>

              {/* Total Line */}
              <div className="pt-2 sm:pt-4 mt-2 sm:mt-3 border-t border-gray-200/80 flex items-center justify-between">
                <span className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-gray-900">Total</span>
                <span className="text-[10px] xs:text-xs sm:text-base md:text-lg font-extrabold text-gray-900">
                  {formatMoney(grandTotal)}
                </span>
              </div>

            </div>

            {/* Need help? Contact us! section below summary card */}
            <div className="mt-3 sm:mt-6 px-1">
              <p className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-bold text-gray-800">
                Need help? Contact us!
              </p>
              <p className="text-[7px] xs:text-[8px] sm:text-[11px] text-gray-400 mt-0.5">
                Please call:
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <FiPhoneCall className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-blue-600 flex-shrink-0" />
                <a
                  href={`https://wa.me/${contactWhatsApp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[8px] xs:text-[9px] sm:text-xs md:text-sm font-bold text-gray-900 hover:text-blue-600 transition truncate"
                >
                  {contactWhatsApp}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderSummary;