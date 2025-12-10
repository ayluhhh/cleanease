import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();
  const email = location.state?.email || "your email";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen bg-[#f7f9fc]">
        <div className="flex flex-col items-center animate-fadeIn">
          <img
            src="/Logo_CE.png"   
            alt="Loading"
            className="w-40 h-40 animate-spin-slow mb-4"
          />
          <p className="text-[#1d3557] text-lg font-semibold animate-pulse">
            Finalizing your booking...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center h-screen bg-[#f7f9fc] animate-fadeIn">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-4xl font-extrabold text-[#1d3557] mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          A confirmation email has been sent to <strong>{email}</strong>.
        </p>

        <Link
          to="/"
          className="inline-block bg-[#1d3557] text-white px-6 py-3 rounded-full hover:bg-[#457b9d] transition font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default BookingConfirmation;
