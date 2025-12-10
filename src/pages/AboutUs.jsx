import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 900, offset: 120, once: true });
  }, []);

  return (
    <div className="text-gray-800 font-outfit">

      {/* HERO SECTION */}
      <section 
        className="relative bg-cover bg-center h-[100vh] flex items-center justify-center"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <img 
          src="/try1).jpg" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
      </section>
      
      {/* MAIN ABOUT SECTION */}
      <section className="w-full py-16 px-6 md:px-16 font-outfit">
        
        {/* Heading */}
        <div 
          className="max-w-6xl mx-auto mb-10"
          data-aos="fade-up"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d3557]">
            A Completely Clean Home
          </h1>
          <span className="text-lg text-[#1d3557] font-semibold">
            — Just the way you want to live in it.
          </span>
        </div>

        {/* Image + Text Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <img
            src="/aboutus2.jpg"
            alt="Banner"
            className="w-full h-auto rounded-lg object-cover shadow"
            data-aos="fade-right"
          />

          <div 
            className="text-[#1d3557] leading-relaxed space-y-4"
            data-aos="fade-left"
          >
            <p>
              CleanEase Co. is one of the most trusted cleaning services in North Luzon
              with the most ratings and reviews averaging 4.8 stars. We strongly advocate
              in making each individual’s home cleaner for a healthier life.
            </p>
            <p>
              Our company specialized in deep dry cleaning methods experience and
              commended by thousands of clients.
            </p>
            <p>
              Trust in the cleaning service that can give you the BEST results for the BEST rates!
            </p>
            <p className="font-semibold">
              All for healthier and cleaner homes.
            </p>
          </div>
        </div>
      </section>

      {/* BANNER TEXT OVERLAY */}
      <section className="relative h-[40vh] w-full flex items-start">
        
        {/* Background */}
        <img
          src="/banner.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div 
          className="relative z-10 px-6 md:px-16 pt-20 text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            The best cleaners are ready<br />for your homes!
          </h2>

          <p className="text-gray-700">
            Experience CleanEase Co. most rated deep cleaning process
          </p>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
