import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Loader = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <img src="/Logo_CE.png" alt="Cleanease Logo" className="h-28 w-28 rounded-full" />

    </div>
  </div>
);


const services = [
  {
    title: "Anti-Bacterial Mist Treatment",
    desc: "Eliminate bacteria and allergens with our advanced disinfection service.",
    full: "Our Anti-Bacterial Mist Treatment is designed to provide complete sanitation for your home or office. Using hospital-grade disinfectants, this service targets bacteria, viruses, and allergens on all surfaces, including hard-to-reach corners, furniture, and electronic devices. The mist penetrates deep into fabrics and crevices, ensuring long-lasting protection. Perfect for households with children, pets, or anyone concerned about indoor air quality, this treatment creates a cleaner, healthier, and safer environment for everyone. After the process, your space will feel fresh, sanitized, and completely safe for everyday use.",
    img: "antibacterial.jpg",
    price: "Starts at ₱1,500",
    duration: "1 hour",
  },
  {
    title: "Deep Dry Cleaning",
    desc: "Detailed cleaning for every surface, nook, and cranny in your home.",
    full: "Deep Dry Cleaning goes far beyond routine cleaning, providing a thorough cleanse for your entire home. Our trained professionals tackle every surface, corner, and hidden space—scrubbing tiles, removing built-up grime, wiping down baseboards, and refreshing upholstery. This service restores your home’s freshness and helps eliminate allergens and bacteria that regular cleaning may miss. Ideal for seasonal cleaning, pre-event preparation, or just to maintain a sparkling living space, our deep cleaning ensures your home feels revitalized, hygienic, and welcoming.",
    img: "deepdrycleaning.jpg",
    price: "Starts at ₱2,500",
    duration: "2–4 hours",
  },
  {
    title: "Post Construction Cleaning",
    desc: "We remove dust, debris, and residue after construction or renovation work.",
    full: "Post Construction Cleaning is essential after any renovation, remodeling, or building project. Our team carefully removes fine dust, cement residue, paint splatters, and construction debris from every surface. We clean floors, walls, windows, and fixtures to leave your space spotless and ready to use. This service not only improves aesthetics but also eliminates hazards and allergens commonly left behind by construction work. Whether it’s a newly built home, office, or commercial site, we ensure the area is pristine, safe, and inviting for immediate occupancy.",
    img: "postcontruction.jpg",
    price: "Starts at ₱4,000",
    duration: "4–8 hours",
  },
  {
    title: "General Office Cleaning",
    desc: "Keep your workspace spotless and professional with our scheduled cleaning.",
    full: "Our General Office Cleaning service maintains a clean, organized, and professional environment for your employees and clients. We handle workstation cleaning, trash disposal, vacuuming, disinfecting high-touch surfaces, and tidying communal areas like pantries and restrooms. Regular office cleaning helps reduce the spread of germs, improves employee productivity, and ensures your workplace always makes a positive impression. Flexible schedules and attention to detail mean your office remains consistently neat, hygienic, and ready for daily operations.",
    img: "officecleaning.jpg",
    price: "Starts at ₱1,200 per visit",
    duration: "1–2 hours",
  },
  {
    title: "Disinfection Cleaning",
    desc: "Certified disinfection process to ensure a germ-free environment.",
    full: "Disinfection Cleaning provides a comprehensive approach to eliminate harmful pathogens in your home, office, or commercial space. We use certified disinfectants and advanced misting systems that reach even the smallest crevices. This service is ideal for high-traffic areas, during flu season, or whenever you need to ensure a hygienic environment. It helps reduce the risk of illness, provides peace of mind, and leaves surfaces visibly clean and safe. After completion, the treated areas are thoroughly sanitized, odor-free, and healthier for everyone occupying the space.",
    img: "disinfectioncleaning.jpg",
    price: "Starts at ₱1,800",
    duration: "45–60 minutes",
  },
  {
    title: "Home Maintenance Cleaning",
    desc: "Regular maintenance cleaning tailored to your preferred schedule.",
    full: "Our Home Maintenance Cleaning service is perfect for keeping your home consistently clean and comfortable without the stress of large-scale cleaning sessions. Designed for weekly or bi-weekly visits, we focus on floors, dusting, kitchen and bathroom sanitization, and general tidying. The service helps prevent buildup of dirt, allergens, and grime, ensuring a fresh and inviting environment. Our flexible schedule allows homeowners to maintain a clean home with minimal effort, leaving more time to relax, entertain, or focus on other priorities.",
    img: "homecleaning.jpg",
    price: "Starts at ₱1,000",
    duration: "1–2 hours",
  },
  {
    title: "Carpet & Upholstery Cleaning",
    desc: "Deep fiber cleaning that restores freshness and extends fabric life.",
    full: "Carpet & Upholstery Cleaning goes beyond surface cleaning to rejuvenate your fabrics and restore their original look and feel. Using specialized equipment and fabric-safe solutions, we remove embedded dirt, stains, odors, and allergens. This process not only improves hygiene but also extends the life of carpets, rugs, sofas, and other upholstered furniture. Perfect for homes, offices, or hospitality spaces, this service ensures that every fiber is deeply cleaned, fresh, and visually appealing.",
    img: "carpetcleaning.jpg",
    price: "Starts at ₱1,500",
    duration: "1–3 hours",
  },
  {
    title: "Pool Cleaning Service",
    desc: "Professional cleaning and maintenance to keep your pool crystal clear.",
    full: "Our Pool Cleaning Service ensures your swimming pool stays safe, clean, and inviting. We vacuum debris, scrub tiles, balance water chemicals including chlorine and pH, and clean filters thoroughly. Regular pool maintenance prevents algae buildup, maintains water clarity, and protects your pool equipment from damage. Suitable for residential or commercial pools, this service saves time and effort while giving you peace of mind that your pool is hygienic and ready for use at any time.",
    img: "poolcleaning.jpg",
    price: "Starts at ₱2,000",
    duration: "1–2 hours",
  },
  {
    title: "Air Conditioning Cleaning",
    desc: "Clean and disinfect your AC units for better air quality and efficiency.",
    full: "Air Conditioning Cleaning ensures your units deliver clean, cool air efficiently. Our service includes dismantling units, deep coil cleaning, filter washing, and mold and dust removal. Proper AC maintenance improves airflow, prevents unpleasant odors, reduces energy consumption, and prolongs the life of the unit. Ideal for homes and offices, this service ensures healthier indoor air quality, a comfortable environment, and cost-effective cooling all year round.",
    img: "airconditioning.png",
    price: "Starts at ₱800 per unit",
    duration: "45–90 minutes",
  },
];

const ServiceCard = ({ service, onClick, aosDelay }) => (
  <div
    className="
      relative bg-white rounded-2xl shadow-lg overflow-hidden 
      transform transition-all duration-500 
      hover:-translate-y-3 hover:shadow-2xl
    "
    data-aos="zoom-in-up"
    data-aos-delay={aosDelay}
    data-aos-duration="800"
  >
    <div className="h-40 w-full bg-gray-200">
      <img
        src={service.img}
        alt={service.title}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="relative p-6 bg-[#1d3557] text-white overflow-hidden">
      <span className="absolute -top-6 -left-6 w-24 h-24 bg-[#457b9d]/40 rounded-full animate-ping-slow"></span>
      <span className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#a8dadc]/30 rounded-full animate-ping-slower"></span>

      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-200 mb-4">{service.desc}</p>

      <div className="mb-5 space-y-1">
        <p className="font-semibold text-[#a8dadc]">💲 {service.price}</p>
        <p className="text-[#FFFFAB] text-sm">⏳ Estimated Duration: {service.duration}</p>
      </div>

      <button
        onClick={onClick}
        className="
          relative bg-[#457b9d] hover:bg-[#1a5276] 
          text-white px-5 py-2 rounded-full 
          transition-all duration-300 shadow-md 
          hover:shadow-xl
        "
      >
        Learn More
      </button>
    </div>
  </div>
);

const Modal = ({ service, onClose, onBook }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-6">
    <div
      className="
        bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden 
        flex flex-col md:flex-row animate-popIn
      "
    >
      {service.img && (
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="md:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold text-[#1d3557] mb-4">
            {service.title}
          </h3>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {service.full}
          </p>

          <div className="space-y-1 mb-6">
            <p className="text-[#1d3557] font-semibold text-lg">
              💲 Price: {service.price}
            </p>
            <p className="text-gray-600">
              ⏳ Estimated Duration: {service.duration}
            </p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onClose}
            className="bg-[#457b9d] hover:bg-[#1d3557] text-white px-6 py-2 rounded-full transition shadow-md hover:shadow-lg"
          >
            Close
          </button>

          <button
            onClick={onBook}
            className="bg-[#1d3557] hover:bg-[#457b9d] text-white px-6 py-2 rounded-full transition shadow-md hover:shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, offset: 120, once: true });
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-white text-gray-800">
      <section
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center animate-fadeIn"
        style={{ backgroundImage: "url('services_background.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#1d3557]/50"></div>
        <h1
          className="relative text-white text-4xl md:text-5xl font-bold z-10 tracking-wide drop-shadow-2xl"
          data-aos="fade-up"
        >
          Our Services
        </h1>
      </section>

      <section id="services" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div data-aos="fade-up" className="text-right mb-16 ml-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-[#1d3557] mb-4">
            Professional Cleaning Solutions
          </h2>
          <p className="text-gray-600 leading-relaxed">
            From homes to offices, we deliver spotless results every time.
            Choose from our range of specialized cleaning services.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service, i) => {
            const delay = (i % 3) * 120;
            return (
              <ServiceCard
                key={i}
                service={service}
                aosDelay={delay}
                onClick={() => setSelected(service)}
              />
            );
          })}
        </div>
      </section>

      {selected && (
        <Modal
          service={selected}
          onClose={() => setSelected(null)}
          onBook={() =>
            navigate("/book-now", {
              state: { selectedService: selected.title },
            })
          }
        />
      )}
    </div>
  );
};


export default Services;
