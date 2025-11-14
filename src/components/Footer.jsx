import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1d3557] text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">CleanEase</h3>
          <p className="text-sm mt-2">
            Professional Cleaning Services for Homes & Businesses
          </p>
        </div>
        <div className="text-center text-sm">
          <p>+63 912 123 4567</p>
          <p>info@cleanease.com</p>
          <p className="mt-2">&copy; 2025 CleanEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
