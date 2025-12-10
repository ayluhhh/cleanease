import React, { useState, useEffect, useRef } from "react";

const reviews = [
  {
    img: "/ryan.png",
    name: "Ryan Higa",
    text: `"Despite having a fully booked week, they were able to squeeze me in their schedule. They even arrived earlier than expected! Since I was their last client for the day kahit pagod na sila, nalinis pa din nila nang maigi yung unit ko. Amoy-malinis!"`
  },
  {
    img: "/martzia.png",
    name: "Martzia Kjellberg",
    text: `"Super professional and fast! My condo felt like a hotel afterwards. Highly recommended!"`
  },
  {
    img: "/CoryxKenshin.png",
    name: "CoryxKenshin",
    text: `"Their deep cleaning is worth every peso. Nangintab literal yung tiles ko after. Solid!"`
  }
];

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(true); // NEW: auto-slide enabled at start
  const intervalRef = useRef(null);

  // Go to a specific index & stop auto-slide
  const goTo = (i) => {
    setIndex(i);
    setIsAuto(false); // STOP auto sliding forever
  };

  // Auto-slide effect
  useEffect(() => {
    if (!isAuto) return; // Do nothing if user interacted

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // 5 seconds

    return () => clearInterval(intervalRef.current);
  }, [isAuto]);

  return (
    <div className="w-full overflow-hidden">

      <div className="flex flex-col md:flex-row items-center gap-10 bg-[#003F5F] text-white py-4 max-w-6xl mx-auto rounded-xl px-6">

        {/* LEFT (STATIC) */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-lg font-semibold text-center md:text-left">
            Averaging on <br /> Ratings and Reviews
          </p>

          <div className="mt-3 bg-teal-600 px-4 py-1 rounded-full flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-lg">4.8</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block h-32 w-px bg-white/40"></div>

        {/* RIGHT (AUTO SLIDE) */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                className="min-w-full flex flex-col md:flex-row items-center md:items-start gap-8"
              >
                {/* IMAGE */}
                <img
                  src={r.img}
                  alt="Reviewer"
                  className="w-32 h-32 rounded-full object-cover border-4 border-teal-400 mx-auto md:mx-0"
                />

                {/* TEXT */}
                <div className="flex-1">
                  <div className="text-yellow-400 text-xl mb-2">⭐ ⭐ ⭐ ⭐ ⭐</div>
                  <p className="italic">{r.text}</p>
                  <p className="font-bold mt-3">- {r.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-4 gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`
              w-3 h-3 rounded-full transition 
              ${index === i ? "bg-gray-700" : "bg-gray-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
