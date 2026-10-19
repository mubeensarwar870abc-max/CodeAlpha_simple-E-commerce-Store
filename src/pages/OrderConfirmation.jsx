import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiCheckCircle,
  FiTruck,
  FiChevronDown,
  FiShoppingBag,
  FiX,
  FiSave,
  FiCheck,
} from "react-icons/fi";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // Load latest order from localStorage with fallback demo order
  const [order, setOrder] = useState(() => {
    try {
      const saved = localStorage.getItem("latestOrder");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      /* fallback */
    }
    // High-fidelity fallback matching the uploaded image
    return {
      id: "356925420",
      customer: {
        fullName: "John Smith",
        firstName: "John",
        secondName: "Smith",
        email: "john.smith1@gmail.com",
        phone: "+91 94256 32056",
        address: "123 Elm Street",
        city: "Anytown",
        zipCode: "USA 12345",
        country: "United States",
        billingSameAsShipping: true,
      },
      items: [
        {
          id: 1,
          name: "MacBook Air",
          title: "MacBook Air",
          price: 1500.0,
          quantity: 1,
          image: "/images/f1.jpg",
        },
      ],
      subtotal: 1690.26,
      shipping: 60.0,
      taxes: 80.0,
      discount: 10.0,
      grandTotal: 1820.26,
      status: "Confirmed",
      paymentMethod: "Cash on Delivery",
    };
  });

  // Edit Information Modal State (User authority to edit)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    billingAddress: "",
    billingSameAsShipping: true,
  });

  const [updateSuccessMsg, setUpdateSuccessMsg] = useState("");
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [isSummaryCollapsed, setIsSummaryCollapsed] = useState(false);

  // Sync edit form with current order customer data
  useEffect(() => {
    if (order && order.customer) {
      setEditFormData({
        fullName: order.customer.fullName || `${order.customer.firstName || ""} ${order.customer.secondName || ""}`.trim() || "John Smith",
        email: order.customer.email || "john.smith1@gmail.com",
        phone: order.customer.phone || "+91 94256 32056",
        address: order.customer.address || "123 Elm Street",
        city: order.customer.city || "Anytown",
        zipCode: order.customer.zipCode || "12345",
        country: order.customer.country || "United States",
        billingAddress: order.customer.billingAddress || order.customer.address || "123 Elm Street",
        billingSameAsShipping: order.customer.billingSameAsShipping !== false,
      });
    }
  }, [order]);

  // Currency detector & formatter
  const isPKR = order?.currency === "Rs" || (order?.grandTotal > 500 && order?.subtotal > 300);
  const formatMoney = (val) => {
    const num = Number(val || 0);
    if (isPKR) {
      return `Rs ${Math.round(num).toLocaleString()}`;
    }
    return `$${num.toFixed(2)}`;
  };

  // Open Edit Modal
  const openEdit = () => {
    setIsEditModalOpen(true);
  };

  // Handle Edit Input Change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save updated customer details
  const handleSaveDetails = (e) => {
    e.preventDefault();
    const updatedCustomer = {
      ...order.customer,
      fullName: editFormData.fullName,
      email: editFormData.email,
      phone: editFormData.phone,
      address: editFormData.address,
      city: editFormData.city,
      zipCode: editFormData.zipCode,
      country: editFormData.country,
      billingAddress: editFormData.billingSameAsShipping
        ? editFormData.address
        : editFormData.billingAddress,
      billingSameAsShipping: editFormData.billingSameAsShipping,
    };

    const updatedOrder = {
      ...order,
      customer: updatedCustomer,
    };

    setOrder(updatedOrder);
    try {
      localStorage.setItem("latestOrder", JSON.stringify(updatedOrder));
    } catch {
      /* ignore */
    }

    setIsEditModalOpen(false);
    setUpdateSuccessMsg("Information updated successfully!");
    setTimeout(() => setUpdateSuccessMsg(""), 4000);
  };

  const customer = order?.customer || {};
  const orderId = order?.id || "356925420";
  const subtotal = order?.subtotal ?? 1690.26;
  const shipping = order?.shipping ?? 60.0;
  const taxes = order?.taxes ?? 80.0;
  const discount = order?.discount ?? 10.0;
  const total = order?.grandTotal ?? 1820.26;

  return (
    <div className="min-h-screen bg-[#f4f5f8] pt-16 xs:pt-20 sm:pt-24 pb-12 sm:pb-16 px-1.5 xs:px-2.5 sm:px-4 md:px-8">
      {/* Main Card Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-2.5 xs:p-3 sm:p-6 md:p-8 lg:p-10">
        
        {/* Success Alert Banner if updated */}
        {updateSuccessMsg && (
          <div className="mb-3 sm:mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] xs:text-[10px] sm:text-xs rounded-lg px-3 py-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <FiCheckCircle className="text-emerald-600" />
              {updateSuccessMsg}
            </span>
            <button
              onClick={() => setUpdateSuccessMsg("")}
              className="text-emerald-600 hover:text-emerald-800"
            >
              <FiX className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* 
          PARENT GRID CONTAINER: 
          Strictly maintained side-by-side 2-column layout on ALL screen sizes:
          Left Side (col-span-7): Order details, final overview, track order button
          Right Side (col-span-5): Customer cards with full user edit authority
        */}
        <div className="grid grid-cols-12 gap-2 xs:gap-2.5 sm:gap-5 md:gap-8 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="col-span-7 sm:col-span-7 md:col-span-7 min-w-0 flex flex-col">
            
            {/* Top Left Header */}
            <div className="mb-3 sm:mb-6">
              <h1 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Your Order
              </h1>

              <div className="mt-1.5 sm:mt-3">
                <p className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-gray-900">
                  Order ID : <span className="font-semibold text-gray-700">{orderId}</span>
                </p>
                <p className="text-[7px] xs:text-[8px] sm:text-xs text-gray-400 mt-0.5">
                  Thank you. Your order has been Confirmed.
                </p>
              </div>
            </div>

            {/* 
              FINAL OVERVIEW / ORDER SUMMARY CARD:
              Contains: Subtotal, Shipping Charge, Taxes, Discount, Total
              (No repeated image rows as instructed by user)
            */}
            <div className="border border-gray-200/80 rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-5 md:p-6 bg-white shadow-xs">
              
              <div
                onClick={() => setIsSummaryCollapsed((prev) => !prev)}
                className="flex items-center justify-between cursor-pointer mb-2 sm:mb-4 select-none"
              >
                <h2 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900">
                  Order Summary
                </h2>
                <FiChevronDown
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                    isSummaryCollapsed ? "-rotate-90" : ""
                  }`}
                />
              </div>

              {!isSummaryCollapsed && (
                <div className="space-y-1.5 xs:space-y-2 sm:space-y-3.5 text-[8px] xs:text-[9px] sm:text-xs md:text-sm pt-1">
                  
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">Subtotal</span>
                    <span className="font-bold text-gray-900 ml-1">
                      {formatMoney(subtotal)}
                    </span>
                  </div>

                  {/* Shipping Charge */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">Shipping Charge</span>
                    <span className="font-bold text-gray-900 ml-1">
                      {shipping === 0 ? "Free" : formatMoney(shipping)}
                    </span>
                  </div>

                  {/* Taxes */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">Taxes</span>
                    <span className="font-bold text-gray-900 ml-1">
                      {taxes === 0 ? "—" : formatMoney(taxes)}
                    </span>
                  </div>

                  {/* Discount */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="truncate">Discount</span>
                    <span className="font-bold text-emerald-600 ml-1">
                      {discount > 0 ? `-${formatMoney(discount)}` : formatMoney(0)}
                    </span>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-gray-100 my-1.5 sm:my-3" />

                  {/* Total Line */}
                  <div className="flex items-center justify-between text-[9px] xs:text-[10px] sm:text-sm md:text-base pt-0.5">
                    <span className="font-extrabold text-gray-900">Total</span>
                    <span className="font-extrabold text-gray-900">
                      {formatMoney(total)}
                    </span>
                  </div>

                </div>
              )}

            </div>

            {/* 
              BEAUTIFUL TRACK ORDER BUTTON:
              Allows customer to track their order
            */}
            <div className="mt-3 sm:mt-6 space-y-2">
              <button
                onClick={() => navigate(`/track-order?orderId=${encodeURIComponent(orderId)}`)}
                className="w-full bg-[#1877f2] hover:bg-[#1464cc] active:scale-[0.99] text-white font-bold py-2 xs:py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-lg sm:rounded-xl transition shadow-md shadow-blue-100 text-[9px] xs:text-[10px] sm:text-xs md:text-sm flex items-center justify-center gap-1.5 sm:gap-2 uppercase tracking-wide"
              >
                <FiTruck className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Track Your Order</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-1.5 xs:py-2 sm:py-2.5 px-3 rounded-lg sm:rounded-xl transition text-[8px] xs:text-[9px] sm:text-xs text-center"
              >
                Continue Shopping
              </button>
            </div>

          </div>

          {/* ================= RIGHT COLUMN ================= */}
          {/* Displays Customer, Customer Information, Shipping Address, Billing Address with User Edit Authority */}
          <div className="col-span-5 sm:col-span-5 md:col-span-5 min-w-0 space-y-1.5 xs:space-y-2 sm:space-y-3 md:space-y-4">
            
            {/* Card 1: Customer Card */}
            <div className="border border-gray-200/80 rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <h3 className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 truncate">
                  Customer
                </h3>
                <FiChevronDown className="w-3 h-3 text-gray-400" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-[8px] xs:text-[9px] sm:text-xs text-gray-600 truncate">
                <FiUser className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                <span className="font-semibold text-gray-800 truncate">
                  {customer.fullName || "John Smith"}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 text-[7px] xs:text-[8px] sm:text-[11px] text-gray-400 mt-1 truncate">
                <FiShoppingBag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                <span>1 Order • Verified Customer</span>
              </div>
            </div>

            {/* Card 2: Customer Information Card (with edit icon) */}
            <div className="border border-gray-200/80 rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <h3 className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 truncate">
                  Customer Information
                </h3>
                <button
                  onClick={() => openEdit("customer")}
                  title="Edit Customer Information"
                  className="p-1 text-gray-400 hover:text-blue-600 transition"
                >
                  <FiEdit2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              <div className="space-y-1 text-[8px] xs:text-[9px] sm:text-xs text-gray-600">
                <div className="flex items-center gap-1 sm:gap-2 truncate">
                  <FiMail className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate text-gray-700">
                    {customer.email || "john.smith1@gmail.com"}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 truncate">
                  <FiPhone className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate text-gray-700">
                    {customer.phone || "+91 94256 32056"}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Shipping Address Card (with edit icon) */}
            <div className="border border-gray-200/80 rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <h3 className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 truncate">
                  Shipping Address
                </h3>
                <button
                  onClick={() => openEdit("shipping")}
                  title="Edit Shipping Address"
                  className="p-1 text-gray-400 hover:text-blue-600 transition"
                >
                  <FiEdit2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              <div className="space-y-0.5 sm:space-y-1 text-[8px] xs:text-[9px] sm:text-xs text-gray-600">
                <div className="flex items-center gap-1 sm:gap-2 truncate font-semibold text-gray-800">
                  <FiUser className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{customer.fullName || "John Smith"}</span>
                </div>
                <p className="text-gray-500 pl-3.5 sm:pl-5 truncate">
                  {customer.address || "123 Elm Street"}
                </p>
                <p className="text-gray-500 pl-3.5 sm:pl-5 truncate">
                  {customer.city || "Anytown"}, {customer.zipCode || "12345"}
                </p>
                <p className="text-gray-500 pl-3.5 sm:pl-5 truncate">
                  {customer.country || "United States"}
                </p>

                <div className="pt-1 pl-3.5 sm:pl-5">
                  <button
                    onClick={() => openEdit("shipping")}
                    className="inline-flex items-center gap-1 text-[7px] xs:text-[8px] sm:text-[10px] font-semibold text-[#1877f2] hover:underline"
                  >
                    <FiMapPin className="w-2.5 h-2.5" />
                    <span>select on map</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4: Billing Address Card (with edit icon) */}
            <div className="border border-gray-200/80 rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold text-gray-900 truncate">
                  Billing Address
                </h3>
                <button
                  onClick={() => openEdit("billing")}
                  title="Edit Billing Address"
                  className="p-1 text-gray-400 hover:text-blue-600 transition"
                >
                  <FiChevronDown className="w-3 h-3" />
                </button>
              </div>
              <p className="text-[7px] xs:text-[8px] sm:text-xs text-gray-400 truncate">
                {customer.billingSameAsShipping !== false
                  ? "Same as shipping address"
                  : customer.billingAddress || customer.address || "Same as shipping address"}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ================= EDIT INFORMATION MODAL ================= */}
      {/* Allows the user authority to edit any information about herself or himself */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiEdit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Edit Your Information
                  </h3>
                  <p className="text-xs text-gray-400">
                    Update your details anytime on this page
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDetails} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={editFormData.fullName}
                  onChange={handleEditChange}
                  className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleEditChange}
                    className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditChange}
                  className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                  required
                />
              </div>

              {/* City, Zip, Country */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={editFormData.city}
                    onChange={handleEditChange}
                    className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-2 sm:px-3 py-2 text-xs text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={editFormData.zipCode}
                    onChange={handleEditChange}
                    className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-2 sm:px-3 py-2 text-xs text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={editFormData.country}
                    onChange={handleEditChange}
                    className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-2 sm:px-3 py-2 text-xs text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Billing Address checkbox */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                  <input
                    type="checkbox"
                    name="billingSameAsShipping"
                    checked={editFormData.billingSameAsShipping}
                    onChange={handleEditChange}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Billing address is same as shipping address</span>
                </label>

                {!editFormData.billingSameAsShipping && (
                  <div className="mt-2">
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Custom Billing Address
                    </label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={editFormData.billingAddress}
                      onChange={handleEditChange}
                      placeholder="Enter billing address"
                      className="w-full bg-[#fafafc] border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 outline-none focus:bg-white focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1877f2] hover:bg-[#1464cc] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-blue-200"
                >
                  <FiSave className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= LIVE ORDER TRACKING MODAL ================= */}
      {showTrackingModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-xl border border-gray-100">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FiTruck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">
                    Order Tracking
                  </h3>
                  <p className="text-xs text-gray-400">
                    ID: {orderId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTrackingModal(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Tracking Progress Timeline */}
            <div className="py-2 space-y-4">
              
              {/* Step 1: Placed */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                  <FiCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Order Placed</p>
                  <p className="text-[11px] text-gray-400">Your order has been placed in our system</p>
                </div>
              </div>

              {/* Step 2: Confirmed */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs flex-shrink-0">
                  <FiCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">Order Confirmed</p>
                  <p className="text-[11px] text-gray-400">Merchant has verified and approved items</p>
                </div>
              </div>

              {/* Step 3: Packing & In Transit */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0 animate-pulse">
                  <FiTruck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs sm:text-sm font-bold text-blue-600">Dispatched & In Transit</p>
                    <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.2 rounded-full">Active</span>
                  </div>
                  <p className="text-[11px] text-gray-400">Carrier: Express Logistics • Est. delivery: 2-3 days</p>
                </div>
              </div>

              {/* Step 4: Out for Delivery */}
              <div className="flex items-start gap-3 opacity-50">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Out for Delivery</p>
                  <p className="text-[11px] text-gray-400">Courier rider assigned to your area</p>
                </div>
              </div>

              {/* Step 5: Delivered */}
              <div className="flex items-start gap-3 opacity-50">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs flex-shrink-0">
                  5
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-700">Delivered</p>
                  <p className="text-[11px] text-gray-400">Package handed over to customer</p>
                </div>
              </div>

            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowTrackingModal(false)}
                className="bg-[#1877f2] text-white px-5 py-2 rounded-xl text-xs font-bold transition hover:bg-[#1567d3]"
              >
                Close Tracking
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default OrderConfirmation;