import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#1d3557] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-2 md:px-6 flex items-center justify-between">

        {/* LOGO + BRAND */}
        <Link to="/" className="flex items-center space-x-1 whitespace-nowrap flex-grow">
          <img 
            src="/logo.png" 
            alt="CleanEase Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-bold font-josefin">CleanEase</span>
        </Link>

        {/* NAVIGATION */}
        <ul className="flex font-outfit 
                      space-x-1 sm:space-x-4 md:space-x-6 
                      items-center">

          <li className="whitespace-nowrap">
            <Link to="/" className="hover:text-[#a8dadc] transition">Home</Link>
          </li>

          <li className="whitespace-nowrap">
            <Link to="/services" className="hover:text-[#a8dadc] transition">Services</Link>
          </li>

          <li className="">
            <Link 
              to="/booknow"
              className="inline-block text-center leading-tight hover:text-[#a8dadc] transition"
            >
              Book Now
            </Link>
          </li>

          <li className="">
            <Link 
              to="/aboutus"
              className="inline-block text-center leading-tight hover:text-[#a8dadc] transition"
            >
              About Us
            </Link>
          </li>

        </ul>
      </div>
    </header>




  );
};

export default Header;
