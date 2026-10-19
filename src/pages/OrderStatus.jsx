import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiFileText,
  FiCheckCircle,
  FiBox,
  FiTruck,
  FiPackage,
  FiCheck,
  FiCreditCard,
  FiHeadphones,
  FiSearch,
} from "react-icons/fi";
import { useStore } from "../Context/StoreContext";

const OrderStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { store } = useStore();

  const siteName = store?.settings?.siteName || "BookNest";

  // Load latest order or fallback bookstore order
  const [order, setOrder] = useState(() => {
    try {
      const saved = localStorage.getItem("latestOrder");
      if (saved) return JSON.parse(saved);
    } catch {
      /* fallback */
    }
    return {
      id: "SDGT1254FD",
      createdAt: new Date().toISOString(),
      status: "In Progress",
      items: [
        {
          id: 1,
          name: "Sahih Bukhari (Urdu Edition)",
          subtitle: "Islamic Books Collection",
          image: "/images/1.jpg",
          price: 4200,
          quantity: 1,
        },
        {
          id: 2,
          name: "Mathematics Prep Guide",
          subtitle: "Exam Preparation",
          image: "/images/kn1.jpg",
          price: 1200,
          quantity: 2,
        },
        {
          id: 3,
          name: "Kara Karam Ka Tajmehl",
          subtitle: "Urdu Novels Collection",
          image: "/images/novel1.jpg",
          price: 1800,
          quantity: 1,
        },
        {
          id: 4,
          name: "Executive Office Notebook",
          subtitle: "Office Supplies & Stationery",
          image: "/images/nt1.jpg",
          price: 500,
          quantity: 2,
        },
      ],
      subtotal: 8200,
      shipping: 0,
      grandTotal: 8200,
    };
  });

  const [searchInput, setSearchInput] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Check URL params for orderId if passed
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qOrderId = params.get("orderId");
    if (qOrderId) {
      setSearchInput(qOrderId);
    }
  }, [location.search]);

  const handleSearchOrder = (e) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) return;

    try {
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);
        const found = parsed.find(
          (o) =>
            o.id?.toLowerCase() === query.toLowerCase() ||
            o.id?.toLowerCase().includes(query.toLowerCase())
        );
        if (found) {
          setOrder(found);
          return;
        }
      }
    } catch {
      /* ignore */
    }

    // If searching for default ID or custom ID, update order ID display
    setOrder((prev) => ({
      ...prev,
      id: query.startsWith("#") ? query.slice(1) : query,
    }));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSubscribed(false);
    }, 4000);
  };

  // Currency detector & formatter
  const isPKR = order?.currency === "Rs" || (order?.grandTotal > 200);
  const formatMoney = (val) => {
    const num = Number(val || 0);
    if (isPKR) {
      return `Rs ${Math.round(num).toLocaleString()}`;
    }
    return `$${num.toFixed(2)}`;
  };

  // Steps matching the uploaded image exactly:
  // 1. Order Placed | 2. Accepted | 3. In Progress | 4. On the Way | 5. Delivered
  const steps = [
    {
      id: 1,
      name: "Order Placed",
      icon: <FiFileText className="w-5 h-5 sm:w-6 sm:h-6" />,
      date: "20 Dec 2026",
      time: "11:00 AM",
      completed: true,
      active: false,
    },
    {
      id: 2,
      name: "Accepted",
      icon: <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      date: "20 Dec 2026",
      time: "11:15 AM",
      completed: true,
      active: false,
    },
    {
      id: 3,
      name: "In Progress",
      icon: <FiBox className="w-5 h-5 sm:w-6 sm:h-6" />,
      date: "Expected",
      time: "20 Dec 2026",
      completed: false,
      active: true,
    },
    {
      id: 4,
      name: "On the Way",
      icon: <FiTruck className="w-5 h-5 sm:w-6 sm:h-6" />,
      date: "Expected",
      time: "21 Dec 2026",
      completed: false,
      active: false,
    },
    {
      id: 5,
      name: "Delivered",
      icon: <FiPackage className="w-5 h-5 sm:w-6 sm:h-6" />,
      date: "Expected",
      time: "21 Dec 2026",
      completed: false,
      active: false,
    },
  ];

  const currentOrderId = order?.id?.startsWith("#")
    ? order.id
    : `#${order?.id || "SDGT1254FD"}`;

  return (
    <div className="min-h-screen bg-[#fafafc]">
      
      {/* ================= BREADCRUMB HEADER BANNER ================= */}
      <section className="relative bg-gradient-to-b from-[#f0f4fa] to-[#fafafc] pt-28 sm:pt-36 pb-12 sm:pb-16 text-center px-4 overflow-hidden">
        {/* Subtle decorative dot pattern */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="mt-2 text-xs sm:text-sm font-medium text-gray-500">
            <span
              onClick={() => navigate("/")}
              className="hover:text-blue-600 cursor-pointer transition"
            >
              {siteName}
            </span>{" "}
            / <span className="text-gray-800">Track Your Order</span>
          </p>

          {/* Quick Lookup Bar */}
          <form
            onSubmit={handleSearchOrder}
            className="mt-6 sm:mt-8 max-w-md mx-auto flex items-center bg-white rounded-full shadow-sm border border-gray-200 p-1 pl-4"
          >
            <FiSearch className="text-gray-400 w-4 h-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. #SDGT1254FD)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-3 py-1.5 text-xs sm:text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 font-mono"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition shadow-sm"
            >
              Track
            </button>
          </form>
        </div>
      </section>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-16">
        
        {/* Section Heading & Order ID */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-xl font-bold text-gray-900">
            Order Status
          </h2>
          <p className="text-xs sm:text-sm font-bold text-gray-600 mt-0.5">
            Order ID : <span className="text-blue-600 font-mono">{currentOrderId}</span>
          </p>
        </div>

        {/* ================= ORDER STATUS STEPPER CARD ================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8 md:p-10 mb-8 overflow-hidden">
          
          {/* Stepper Grid / Flex Row */}
          <div className="relative">
            
            {/* The Horizontal Progress Line */}
            <div className="absolute top-[52px] sm:top-[64px] left-[10%] right-[10%] h-1 bg-gray-200 -z-0">
              {/* Completed segment in brand Blue */}
              <div
                className="h-full bg-blue-600 transition-all duration-700"
                style={{ width: "35%" }}
              />
            </div>

            {/* Steps Container */}
            <div className="relative z-10 grid grid-cols-5 gap-1 sm:gap-2 text-center">
              {steps.map((step) => {
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    
                    {/* Top Icon */}
                    <div
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform ${
                        step.completed || step.active
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Step Title */}
                    <p
                      className={`text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold mt-1 sm:mt-2 text-center truncate max-w-full ${
                        step.completed || step.active
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </p>

                    {/* Checkmark Node on the line */}
                    <div className="my-2 sm:my-3">
                      {step.completed ? (
                        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                          <FiCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      ) : step.active ? (
                        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center animate-pulse shadow-xs">
                          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-600" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Date & Time below */}
                    <div className="text-[7px] xs:text-[8px] sm:text-[11px] text-gray-500 leading-tight">
                      <p className="font-medium">{step.date}</p>
                      <p className="text-gray-400">{step.time}</p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* ================= PRODUCTS CARD ================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8 mb-12">
          
          <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-3 sm:mb-5">
            Products
          </h3>

          <div className="divide-y divide-gray-100">
            {order.items?.map((item, index) => {
              const itemTitle = item.title || item.name || "Product Name";
              const itemSubtitle =
                item.subtitle || item.category || "Book & Stationery";
              const itemQty = item.quantity || 1;
              const itemPrice = item.price || 0;
              const itemImage =
                item.image || item.imageUrl || "/images/1.jpg";

              return (
                <div
                  key={item.id || index}
                  className="py-3 sm:py-4 flex items-center justify-between gap-3"
                >
                  {/* Left: Thumbnail & Name */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden p-1.5">
                      <img
                        src={itemImage}
                        alt={itemTitle}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          if (e.currentTarget.nextSibling) {
                            e.currentTarget.nextSibling.style.display = "block";
                          }
                        }}
                      />
                      <span
                        style={{ display: "none" }}
                        className="text-xs text-gray-400"
                      >
                        📚
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-base font-bold text-gray-900 truncate">
                        {itemTitle}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 truncate mt-0.5">
                        {itemSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Quantity & Line Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900">
                      {formatMoney(itemPrice * itemQty)}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400">
                      Qty: {itemQty}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= 3 FEATURE HIGHLIGHTS (VALUE BAR) ================= */}
        {/* Same as the bottom feature row in the reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-t border-b border-gray-200/80 mb-16">
          
          {/* Feature 1: Free Shipping */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FiBox className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Free Shipping</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Free shipping for order above Rs 2,500
              </p>
            </div>
          </div>

          {/* Feature 2: Flexible Payment */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FiCreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                Flexible Payment
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Multiple secure payment options
              </p>
            </div>
          </div>

          {/* Feature 3: 24x7 Support */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FiHeadphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">24×7 Support</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                We support online all days.
              </p>
            </div>
          </div>

        </div>

        {/* ================= NEWSLETTER SECTION ================= */}
        {/* Matching the reference image layout and text with BookNest brand colors */}
        <section className="relative rounded-3xl bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-blue-50/60 p-8 sm:p-12 text-center overflow-hidden border border-blue-100/60 shadow-xs mb-8">
          
          <span className="inline-block px-3 py-1 bg-white text-blue-700 text-xs font-semibold rounded-full shadow-xs mb-3">
            Our Newsletter
          </span>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight max-w-xl mx-auto">
            Subscribe to Our Newsletter to Get{" "}
            <span className="text-blue-600">Updates on Our Latest Offers</span>
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Get 20% off on your first order just by subscribing to our newsletter
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter Email Address"
              required
              className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-xs sm:text-sm text-gray-800 outline-none focus:border-blue-600 shadow-xs"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full transition shadow-md shadow-blue-200 flex-shrink-0"
            >
              Subscribe
            </button>
          </form>

          {newsletterSubscribed && (
            <p className="text-xs text-emerald-600 font-semibold mt-3">
              🎉 Thank you for subscribing! Check your inbox for your 20% discount code.
            </p>
          )}

        </section>

      </div>

    </div>
  );
};

export default OrderStatus;
