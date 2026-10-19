import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../Context/AdminContext";
import {
  FiGrid,
  FiShoppingCart,
  FiBox,
  FiList,
  FiTag,
  FiSettings,
  FiLogOut,
  FiSearch,
  FiUser,
  FiChevronDown,
  FiExternalLink,
  FiMenu,
  FiX,
  FiBookOpen,
  FiHome,
} from "react-icons/fi";
import CustomerDemographicMap from "../../components/CustomerDemographicMap";

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const [ticketFilter, setTicketFilter] = useState("all");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  // Monthly trend bar chart data matching the 3-bar per month design
  const trendData = [
    { month: "Jan", newH: 45, renH: 25, ordH: 60 },
    { month: "Feb", newH: 65, renH: 35, ordH: 50 },
    { month: "Mar", newH: 58, renH: 30, ordH: 70 },
    { month: "Apr", newH: 40, renH: 22, ordH: 45 },
    { month: "May", newH: 75, renH: 45, ordH: 80 },
    { month: "Jun", newH: 85, renH: 50, ordH: 90 },
    { month: "Jul", newH: 80, renH: 48, ordH: 88 },
  ];

  // Recent transactions matching image
  const transactions = [
    { id: 1, name: "S. Ferguson", card: "VISA", amount: "+$80", cardBg: "bg-blue-600" },
    { id: 2, name: "M. Sterling", card: "MC", amount: "+$120", cardBg: "bg-orange-600" },
    { id: 3, name: "Q. Hawthorn", card: "VISA", amount: "+$45", cardBg: "bg-blue-600" },
    { id: 4, name: "H. Hawthorne", card: "AMEX", amount: "+$210", cardBg: "bg-emerald-600" },
    { id: 5, name: "L. Whitcher", card: "VISA", amount: "+$65", cardBg: "bg-blue-600" },
    { id: 6, name: "C. Frost", card: "MC", amount: "+$110", cardBg: "bg-orange-600" },
    { id: 7, name: "W. Brooks", card: "VISA", amount: "+$95", cardBg: "bg-blue-600" },
  ];

  // Support tickets data
  const tickets = [
    {
      id: 1,
      email: "jessica.smith123@example.com",
      issue: "Login issue",
      status: "OPEN",
      statusColor: "bg-emerald-500",
      filter: "open",
    },
    {
      id: 2,
      email: "david.jones44@gmail.com",
      issue: "Billing inquiry",
      status: "PENDING",
      statusColor: "bg-amber-500",
      filter: "pending",
    },
    {
      id: 3,
      email: "emily.wilson78@outlook.com",
      issue: "Product Exchange",
      status: "CLOSED",
      statusColor: "bg-red-500",
      filter: "closed",
    },
    {
      id: 4,
      email: "andrew.johnson22@heyinbox.org",
      issue: "Feature Request",
      status: "OPEN",
      statusColor: "bg-emerald-500",
      filter: "open",
    },
  ];

  const filteredTickets =
    ticketFilter === "all"
      ? tickets
      : tickets.filter((t) => t.filter === ticketFilter);

  // Render sidebar contents for both desktop and mobile drawer
  const renderSidebarContent = (isMobile = false) => (
    <div className="flex flex-col justify-between h-full select-none bg-[#0b1329] text-white">
      <div>
        {/* Top Brand Logo & Name: NestBook */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            {/* Book Icon Badge */}
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0">
              <FiBookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-tight text-white truncate">
              NestBook<span className="text-blue-500">.</span>
            </span>
          </div>

          {/* Close button on mobile */}
          {isMobile && (
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Links with Icons: Overview, Transactions, Categories, Special Offers, Featured Products, Settings, View Store */}
        <nav className="p-2 sm:p-2.5 space-y-1">
          {/* Overview */}
          <button
            onClick={() => {
              navigate("/admin/dashboard");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs transition shadow-xs text-left"
          >
            <FiGrid className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Overview</span>
          </button>

          {/* Transactions */}
          <button
            onClick={() => {
              navigate("/admin/orders");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs transition text-left"
          >
            <FiShoppingCart className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Transactions</span>
          </button>

          {/* Categories */}
          <button
            onClick={() => {
              navigate("/admin/category/books");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs transition text-left"
          >
            <FiList className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Categories</span>
          </button>

          {/* Special Offers */}
          <button
            onClick={() => {
              navigate("/admin/offers");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs transition text-left"
          >
            <FiTag className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Special Offers</span>
          </button>

          {/* Featured Products */}
          <button
            onClick={() => {
              navigate("/admin/featured");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs transition text-left"
          >
            <FiBox className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Featured Products</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              navigate("/admin/settings");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs transition text-left"
          >
            <FiSettings className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Settings</span>
          </button>

          {/* Home Page */}
          <button
            onClick={() => {
              navigate("/");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs transition text-left"
          >
            <FiHome className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Home Page</span>
          </button>

          {/* View Store */}
          <button
            onClick={() => {
              navigate("/");
              if (isMobile) setIsMobileSidebarOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-medium text-xs transition text-left"
          >
            <FiExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">View Store</span>
          </button>
        </nav>
      </div>

      {/* Bottom: Logout Option with Arrow */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-red-400 hover:bg-red-500/10 text-xs font-semibold transition text-left"
        >
          <FiLogOut className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f7] flex">
      
      {/* =========================================================
          MOBILE SIDEBAR (Slide-over drawer when toggled)
      ========================================================== */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs"
          />
          <aside className="relative w-44 bg-[#0b1329] text-white flex flex-col justify-between z-50 h-full shadow-2xl border-r border-slate-800">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}

      {/* =========================================================
          DESKTOP SLIM SIDEBAR (Compact width w-40 to w-44, sticky,
          in-flow flex child so it NEVER overlays right content)
      ========================================================== */}
      <aside className="hidden md:flex flex-col justify-between w-40 lg:w-44 flex-shrink-0 bg-[#0b1329] text-white sticky top-0 h-screen select-none border-r border-slate-800 z-30">
        {renderSidebarContent(false)}
      </aside>

      {/* =========================================================
          RIGHT MAIN DASHBOARD CONTAINER (flex-1 in normal flow)
      ========================================================== */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        
        {/* ================= TOP HEADER BAR ================= */}
        <header className="bg-white border-b border-gray-200/70 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-1.5 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100"
            >
              <FiMenu className="w-5 h-5" />
            </button>

            {/* Heading: Dashboard */}
            <h1 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">
              Dashboard
            </h1>
          </div>

          {/* Right: Search Pill & Profile Option */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Dark Search Pill Input matching image */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search transactions, customers, subscriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 md:w-80 lg:w-96 bg-[#0f172a] text-white text-xs rounded-full py-2 pl-8 pr-4 placeholder-gray-400 outline-none focus:ring-1 focus:ring-blue-400 transition"
              />
              <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
            </div>

            {/* Profile Option with Avatar & Dropdown Chevron */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-gray-100 transition"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1c3f6e] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <FiUser className="w-4 h-4" />
                </div>
                <FiChevronDown className="w-3.5 h-3.5 text-gray-600" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 text-xs text-gray-700 z-50">
                  <div className="px-3.5 py-2 border-b border-gray-100">
                    <p className="font-bold text-gray-900">Admin User</p>
                    <p className="text-gray-400 text-[10px]">admin@booknest.com</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate("/admin/settings");
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FiSettings className="w-3.5 h-3.5" />
                    <span>Store Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                    <span>View Store</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3.5 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold border-t border-gray-100"
                  >
                    <FiLogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* =========================================================
            MAIN DASHBOARD CONTENT (3 ROWS)
        ========================================================== */}
        <main className="p-2.5 xs:p-3 sm:p-5 md:p-6 space-y-3 sm:space-y-5">
          
          {/* =======================================================
              ROW 1: 4 CHILD DIVS WITH EQUAL WIDTH & 4 CARDS PER ROW
              ON ALL SCREEN SIZES:
              Card 1: Current MRR
              Card 2: Current Customers
              Card 3: Active Customers
              Card 4: Churn Rate
          ======================================================== */}
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3.5 md:gap-4">
            
            {/* Card 1: Current MRR (Warm Mustard/Gold) */}
            <div className="bg-[#dca42b] text-white rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 md:p-5 flex flex-col justify-between shadow-xs min-w-0">
              <p className="text-[7px] xs:text-[9px] sm:text-xs font-semibold opacity-90 truncate uppercase tracking-tight">
                Current MRR
              </p>
              <p className="text-xs xs:text-sm sm:text-2xl md:text-3xl font-black mt-1 sm:mt-2 tracking-tight truncate">
                $12.4k
              </p>
            </div>

            {/* Card 2: Current Customers (Forest Deep Green) */}
            <div className="bg-[#15613e] text-white rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 md:p-5 flex flex-col justify-between shadow-xs min-w-0">
              <p className="text-[7px] xs:text-[9px] sm:text-xs font-semibold opacity-90 truncate uppercase tracking-tight">
                Current Customers
              </p>
              <p className="text-xs xs:text-sm sm:text-2xl md:text-3xl font-black mt-1 sm:mt-2 tracking-tight truncate">
                16,601
              </p>
            </div>

            {/* Card 3: Active Customers (Slate / Deep Navy Blue) */}
            <div className="bg-[#1c3f6e] text-white rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 md:p-5 flex flex-col justify-between shadow-xs min-w-0">
              <p className="text-[7px] xs:text-[9px] sm:text-xs font-semibold opacity-90 truncate uppercase tracking-tight">
                Active Customers
              </p>
              <p className="text-xs xs:text-sm sm:text-2xl md:text-3xl font-black mt-1 sm:mt-2 tracking-tight truncate">
                33%
              </p>
            </div>

            {/* Card 4: Churn Rate (Deep Royal Purple) */}
            <div className="bg-[#3b174a] text-white rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 md:p-5 flex flex-col justify-between shadow-xs min-w-0">
              <p className="text-[7px] xs:text-[9px] sm:text-xs font-semibold opacity-90 truncate uppercase tracking-tight">
                Churn Rate
              </p>
              <p className="text-xs xs:text-sm sm:text-2xl md:text-3xl font-black mt-1 sm:mt-2 tracking-tight truncate">
                2%
              </p>
            </div>

          </div>

          {/* =======================================================
              ROW 2: 3 CHILD DIVS
              - First Div: Width equal to Row 1 first two cards (spans 2 cols)
                Showing Monthly Trend with 3 vertical bars per month with 3 colors.
              - Second Div: Below 3rd card (spans 1 col)
                Showing Sales circular donut chart with 4 colors.
              - Third Div: Below 4th card (spans 1 col)
                Showing card transactions + "View all transactions" button.
          ======================================================== */}
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3.5 md:gap-4 items-stretch">
            
            {/* Div 1 of Row 2: Trend with 3 vertical bars per month (col-span-2) */}
            <div className="col-span-2 bg-white rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between min-w-0">
              
              {/* Header with Title & Legend */}
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <h3 className="text-[10px] xs:text-xs sm:text-base font-bold text-gray-900">
                  Trend
                </h3>

                {/* 3 Colored Dots Legend */}
                <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 text-[6px] xs:text-[7px] sm:text-[10px] text-gray-500 font-semibold">
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#102a45]" />
                    <span>NEW</span>
                  </span>
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e2b]" />
                    <span>RENEWALS</span>
                  </span>
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d436c]" />
                    <span>ORDERS</span>
                  </span>
                </div>
              </div>

              {/* 3-Bar Chart Visual Container */}
              <div className="flex items-end justify-between pt-2 pb-1 gap-1 sm:gap-2 h-36 xs:h-44 sm:h-52 border-b border-gray-100">
                
                {/* Y-Axis scale */}
                <div className="flex flex-col justify-between h-full text-[6px] xs:text-[8px] sm:text-[10px] text-gray-400 font-mono pr-1 select-none">
                  <span>$15k</span>
                  <span>$12k</span>
                  <span>$9k</span>
                  <span>$6k</span>
                  <span>$3k</span>
                  <span>$0</span>
                </div>

                {/* 7 Month Bars */}
                {trendData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                    
                    {/* The 3 Vertical Bars side by side */}
                    <div className="w-full flex items-end justify-center gap-0.5 xs:gap-1 h-full pb-1">
                      {/* Bar 1: Navy Blue */}
                      <div
                        style={{ height: `${item.newH}%` }}
                        className="w-1 xs:w-1.5 sm:w-2.5 bg-[#102a45] rounded-t-xs sm:rounded-t-sm transition-all duration-500"
                        title={`New: ${item.newH}%`}
                      />
                      {/* Bar 2: Burgundy Red */}
                      <div
                        style={{ height: `${item.renH}%` }}
                        className="w-1 xs:w-1.5 sm:w-2.5 bg-[#8b1e2b] rounded-t-xs sm:rounded-t-sm transition-all duration-500"
                        title={`Renewals: ${item.renH}%`}
                      />
                      {/* Bar 3: Slate Dark Teal */}
                      <div
                        style={{ height: `${item.ordH}%` }}
                        className="w-1 xs:w-1.5 sm:w-2.5 bg-[#1d436c] rounded-t-xs sm:rounded-t-sm transition-all duration-500"
                        title={`Orders: ${item.ordH}%`}
                      />
                    </div>

                    {/* Month Label */}
                    <span className="text-[6px] xs:text-[8px] sm:text-[10px] text-gray-400 font-semibold mt-1">
                      {item.month}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* Div 2 of Row 2: Sales Circular Donut Chart with 4 colors (col-span-1) */}
            <div className="col-span-1 bg-white rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 shadow-xs border border-gray-100 flex flex-col justify-between min-w-0">
              
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-gray-900 truncate">
                  Sales
                </h3>
                <span className="w-2 h-2 rounded-full bg-black/10" />
              </div>

              {/* Donut Chart SVG with 4 colors */}
              <div className="relative flex items-center justify-center my-1 sm:my-2">
                <svg className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Segment 1: Green (approx 45%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#15613e"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="107 131"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Red (approx 25%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#8c1d2f"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="60 178"
                    strokeDashoffset="-107"
                  />
                  {/* Segment 3: Yellow/Gold (approx 20%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#dca42b"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="48 190"
                    strokeDashoffset="-167"
                  />
                  {/* Segment 4: Navy Blue (approx 10%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#1c3f6e"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray="24 214"
                    strokeDashoffset="-215"
                  />
                </svg>

                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs xs:text-sm sm:text-lg font-black text-gray-900 leading-none">
                    342
                  </span>
                  <span className="text-[6px] xs:text-[7px] text-gray-400 font-bold uppercase mt-0.5">
                    Orders
                  </span>
                </div>
              </div>

              {/* 4 Colored Legends */}
              <div className="grid grid-cols-2 gap-1 text-[6px] xs:text-[7px] sm:text-[9px] font-semibold text-gray-600 pt-1 border-t border-gray-100">
                <div className="flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15613e] flex-shrink-0" />
                  <span className="truncate">School Books</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8c1d2f] flex-shrink-0" />
                  <span className="truncate">Urdu Novels</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dca42b] flex-shrink-0" />
                  <span className="truncate">Stationery</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1c3f6e] flex-shrink-0" />
                  <span className="truncate">Exam Prep</span>
                </div>
              </div>

            </div>

            {/* Div 3 of Row 2: Transactions by card payment (col-span-1) */}
            <div className="col-span-1 bg-white rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-4 shadow-xs border border-gray-100 flex flex-col justify-between min-w-0">
              
              <div>
                <h3 className="text-[9px] xs:text-[10px] sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2 truncate">
                  Transactions
                </h3>

                {/* List of user card payments */}
                <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                  {transactions.slice(0, 6).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between gap-1 text-[7px] xs:text-[8px] sm:text-[10px]"
                    >
                      <span className="font-semibold text-gray-800 truncate">
                        {tx.name}
                      </span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span
                          className={`text-[6px] xs:text-[7px] font-bold text-white px-1 py-0.2 rounded ${tx.cardBg}`}
                        >
                          {tx.card}
                        </span>
                        <span className="font-bold text-gray-900">
                          {tx.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View all transactions Mustard Button */}
              <button
                onClick={() => navigate("/admin/orders")}
                className="w-full mt-2 bg-[#dca42b] hover:bg-[#c69222] text-white text-[7px] xs:text-[8px] sm:text-xs font-bold py-1.5 rounded-lg transition text-center shadow-xs"
              >
                View all transactions
              </button>

            </div>

          </div>

          {/* =======================================================
              ROW 3: 2 CHILD DIVS (50% each)
              - Div 1 (Left, col-span-2): Support Tickets / Queries
              - Div 2 (Right, col-span-2): Customer Demographic World Map
          ======================================================== */}
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3.5 md:gap-4 items-stretch">
            
            {/* Div 1 of Row 3: Support Tickets & Queries (col-span-2) */}
            <div className="col-span-2 bg-white rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between min-w-0">
              
              <div>
                {/* Header & Filter Pills */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5 sm:mb-3">
                  <h3 className="text-[10px] xs:text-xs sm:text-sm font-bold text-gray-900 truncate">
                    Support Tickets
                  </h3>

                  {/* Pills: All, Open, Pending, Closed */}
                  <div className="flex items-center gap-1 text-[7px] xs:text-[8px] sm:text-[10px]">
                    <button
                      onClick={() => setTicketFilter("all")}
                      className={`px-2 py-0.5 rounded-full font-bold transition ${
                        ticketFilter === "all"
                          ? "bg-[#102a45] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setTicketFilter("open")}
                      className={`px-2 py-0.5 rounded-full font-bold border transition ${
                        ticketFilter === "open"
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Open
                    </button>
                    <button
                      onClick={() => setTicketFilter("pending")}
                      className={`px-2 py-0.5 rounded-full font-bold border transition ${
                        ticketFilter === "pending"
                          ? "bg-amber-500 text-white border-amber-500"
                          : "border-amber-200 text-amber-700 hover:bg-amber-50"
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => setTicketFilter("closed")}
                      className={`px-2 py-0.5 rounded-full font-bold border transition ${
                        ticketFilter === "closed"
                          ? "bg-red-600 text-white border-red-600"
                          : "border-red-200 text-red-700 hover:bg-red-50"
                      }`}
                    >
                      Closed
                    </button>
                  </div>
                </div>

                {/* Tickets List */}
                <div className="divide-y divide-gray-100">
                  {filteredTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="py-1.5 sm:py-2 flex items-center justify-between gap-1.5 text-[7px] xs:text-[8px] sm:text-xs"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${ticket.statusColor} flex-shrink-0`} />
                        <span className="font-semibold text-gray-800 truncate">
                          {ticket.email}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-gray-400 hidden sm:inline truncate max-w-[120px]">
                          {ticket.issue}
                        </span>
                        <span
                          className={`text-[6px] xs:text-[7px] sm:text-[9px] font-bold text-white px-1.5 py-0.5 rounded ${ticket.statusColor}`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Help Note */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[7px] xs:text-[8px] sm:text-[10px] text-gray-400">
                <span>Auto-refreshing live customer queries</span>
                <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                  Support Inbox →
                </span>
              </div>

            </div>

            {/* Div 2 of Row 3: Customer Demographic World Map (col-span-2) */}
            <div className="col-span-2 bg-white rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-5 shadow-xs border border-gray-100 flex flex-col justify-between min-w-0">
              
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] xs:text-xs sm:text-sm font-bold text-gray-900 truncate">
                  Customer Demographic
                </h3>

                {/* Legend: Active & Inactive */}
                <div className="flex items-center gap-2 text-[7px] xs:text-[8px] sm:text-[10px] text-gray-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1c3f6e]" />
                    <span>ACTIVE</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <span>INACTIVE</span>
                  </span>
                </div>
              </div>

              {/* Detailed Real World Vector Map matching image layout & colors */}
              <div className="w-full flex-1 flex items-center justify-center my-auto min-h-[160px] xs:min-h-[190px] sm:min-h-[220px]">
                <CustomerDemographicMap />
              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;
