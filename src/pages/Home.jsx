import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import ReviewCarousel from "../components/Reviews";


const services=[
  {
    title: "Anti-Bacterial Mist Treatment",
    description: "Eliminate bacteria and allergens with our advanced disinfection service.",
    full: "This treatment includes hospital-grade disinfectants, surface sanitization, and allergen removal to ensure a healthy environment.",
    img: "/antibacterial.jpg",
  },
  {
    title: "Deep Dry Cleaning",
    description: "Detailed cleaning for every surface, nook, and cranny in your home.",
    full: "Our deep cleaning goes beyond surface cleaning—scrubbing tiles, removing built-up dirt, and restoring your home's freshness.",
    img: "/drycleaning.jpg",
  },
  {
    title: "Post Construction Cleaning",
    description: "We remove dust, debris, and residue after construction or renovation work.",
    full: "We handle fine dust, cement residue, paint marks, and debris to turn your construction site into a livable space.",
    img: "/clean.jpg",
  },
];

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 900, offset: 120, once: true });
  }, []);

  return (
    <div className="w-full overflow-hidden">

      {/* HERO SECTION */}
      <section
        data-aos="fade-in"
        data-aos-duration="1000"
        className="relative w-full min-h-[calc(100vh-64px)] bg-cover bg-top flex items-center"
        style={{ backgroundImage: `url('/placeholder1.jpg')` }}
      >

        {/* White text box */}
        <div className="bg-white/90 max-w-sm p-8 rounded-xl shadow-xl ml-12">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight font-outfit">
            Cleaning<br />
            Made Simple.<br />
            Results That<br />
            Shine.
          </h1>

          <p className="text-gray-600 mt-4 text-sm">
            Professional cleaning services for homes, offices, and commercial spaces.
          </p>

        <div className="mx-auto mt-6 flex gap-4 justify-center w-full">
          <div className="text-center px-8 py-3 bg-[#1d3557] text-white rounded-lg font-semibold shadow-md hover:bg-[#0f223a] transition">
            <Link to="/booknow">Book Now</Link>
          </div>

          <div className="text-center px-8 py-3 bg-[#1d3557] text-white rounded-lg font-semibold shadow-md hover:bg-[#0f223a] transition">
            <Link to="/aboutus">About Us</Link>
          </div>
        </div>

        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="py-16 bg-white">
      <div 
        className="max-w-6xl mx-auto text-center mb-12"
        data-aos="fade-up"
      >

        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-outfit">
          Our Services
        </h2>
        <p className="text-gray-600 m-6">
          From homes to offices, we deliver spotless results every time.  
          Choose the service that fits your needs.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
        {services.map((service, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 150}
            className="
              rounded-2xl shadow-lg overflow-hidden border border-gray-200 
              transform transition duration-300
              hover:shadow-2xl hover:-translate-y-2 cursor-pointer
            "
          >
            {/* Image Section */}
            <div className="h-48 bg-gray-300 overflow-hidden">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Text Section */}
            <div className="bg-[#0c8993] text-white p-6 min-h-[100px]">
              <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
              <p className="text-sm leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-6 flex justify-end">
        <Link
          to="/services"
          className="text-sm text-blue-600 font-semibold hover:underline"
        >
        More services here →
        </Link>
      </div>
    </section>

    {/* TESTIMONIALS WITH CAROUSEL */}
    <section className="py-12 px-6 bg-[#003F5F]">
      <ReviewCarousel />
    </section>
    </div>
    );
};

export default Home;