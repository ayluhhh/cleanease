import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 900, offset: 120, once: true });
  }, []);

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606813902916-9aa8b993b25d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[#1d3557]/70"></div>
        <h1
          className="relative text-white text-4xl md:text-5xl font-bold z-10 drop-shadow-lg"
          data-aos="fade-up"
        >
          Our Services
        </h1>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div data-aos="fade-up" className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#1d3557] mb-4">
            Professional Cleaning Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From homes to offices, we deliver spotless results every time. Choose from our range of specialized cleaning services.
          </p>
        </div>


        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Anti-Bacterial & Full Treatment",
              desc: "Eliminate bacteria and allergens with our advanced disinfection service.",
            },
           
          ].map((service, index) => (
            <div
              key={index}
              className="bg-[#f1faee] rounded-xl shadow-md hover:-translate-y-2 transition transform duration-300 p-6"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#1d3557]">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-4">{service.desc}</p>
              <button className="bg-[#457b9d] hover:bg-[#1d3557] text-white px-5 py-2 rounded-full transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
};

export default Services;
