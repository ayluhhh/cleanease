import React from "react";

const Header = () => {
  return (
    <header className="bg-[#1d3557] text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">CleanEase</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-[#a8dadc] transition">Home</a>
          <a href="/services" className="hover:text-[#a8dadc] transition">Services</a>
          <a href="/contact" className="hover:text-[#a8dadc] transition">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
