import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useStore } from "../Context/StoreContext";

const Footer = () => {
  const navigate = useNavigate();
  const { store } = useStore();

  const siteName = store?.settings?.siteName || "BookNest";
  const contactWhatsApp = store?.settings?.contactWhatsApp || "+92 316 0612173";

  return (
    <footer className="bg-[#0b1329] text-gray-300 rounded-t-[32px] sm:rounded-t-[44px] pt-14 sm:pt-16 pb-8 px-6 sm:px-10 mt-12 border-t border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= 5 COLUMNS MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Socials (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                📚
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                {siteName}<span className="text-blue-500">.</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Buy books, stationery, and learning essentials at one place. Simple,
              fast, and affordable.
            </p>

            {/* Social Icons matching reference image */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-blue-600 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-sky-500 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
              >
                <FaTwitter />
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-red-600 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
              >
                <FaPinterestP />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-pink-600 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
              >
                <FaInstagram />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-800/90 hover:bg-red-600 text-white flex items-center justify-center text-xs transition duration-200 hover:scale-110"
              >
                <FaYoutube />
              </a>
            </div>

          </div>

          {/* Column 2: Company (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li
                onClick={() => navigate("/#hero")}
                className="hover:text-blue-400 cursor-pointer transition"
              >
                About Us
              </li>
              <li
                onClick={() => navigate("/#offers")}
                className="hover:text-blue-400 cursor-pointer transition"
              >
                Blog & Offers
              </li>
              <li
                onClick={() => {
                  window.open(`https://wa.me/${contactWhatsApp.replace(/[^0-9]/g, "")}`, "_blank");
                }}
                className="hover:text-blue-400 cursor-pointer transition"
              >
                Contact Us
              </li>
              <li
                onClick={() => navigate("/#categories")}
                className="hover:text-blue-400 cursor-pointer transition"
              >
                Categories
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li
                onClick={() => navigate("/admin")}
                className="hover:text-blue-400 cursor-pointer transition"
              >
                My Account
              </li>
              <li
                onClick={() => navigate("/track-order")}
                className="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5 text-blue-300 font-medium"
              >
                Track Your Order
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              </li>
              <li
                onClick={() => navigate("/#choose-us")}
                className="hover:text-blue-400 cursor-pointer transition"
              >
                Return Policy
              </li>
              <li
                onClick={() => navigate("/#reviews")}
                className="hover:text-blue-400 cursor-pointer transition"
              >
                FAQ & Reviews
              </li>
            </ul>
          </div>

          {/* Column 4: Our Information (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Our Information
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li className="hover:text-blue-400 cursor-pointer transition">
                Privacy Policy
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                User Terms & Condition
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Shipping & Delivery
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Payment Security
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Contact Info
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-400">
              <p className="font-semibold text-gray-300">
                {contactWhatsApp}
              </p>
              <p className="hover:text-blue-400 cursor-pointer transition truncate">
                support@booknest.com
              </p>
              <p className="text-[11px] leading-relaxed text-gray-500">
                BookNest HQ, Preston Road, Main Commercial Area, Pakistan
              </p>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM COPYRIGHT BAR ================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            Copyright © {new Date().getFullYear()} {siteName} Website. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition">
              English <FiChevronDown className="w-3 h-3" />
            </span>
            <span className="text-gray-700">|</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition">
              PKR <FiChevronDown className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
