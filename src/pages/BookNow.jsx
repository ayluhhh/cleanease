import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Loader = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      <img src="/Logo_CE.png" alt="Cleanease Logo" className="h-28 w-28 rounded-full" />

    </div>
  </div>
);

const SERVICE_DATA = {
  "Anti-Bacterial Mist Treatment": { hrs: 1, pricePer100sqm: 1500 },
  "Deep Dry Cleaning": { hrs: 4, pricePer100sqm: 2500 },
  "Post Construction Cleaning": { hrs: 8, pricePer100sqm: 4000 },
  "General Office Cleaning": { hrs: 2, pricePer100sqm: 1200 },
  "Disinfection Cleaning": { hrs: 1, pricePer100sqm: 1800 },
  "Home Maintenance Cleaning": { hrs: 2, pricePer100sqm: 1000 },
  "Carpet & Upholstery Cleaning": { hrs: 3, pricePer100sqm: 1500 },
  "Pool Cleaning Service": { hrs: 2, pricePer100sqm: 2000 },
  "Air Conditioning Cleaning": { hrs: 1.3, pricePer100sqm: 800 },
};

const BookNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preselected = location.state?.selectedService || "";

  const [loading, setLoading] = useState(true); // ← Added loading state
  const [currentService, setCurrentService] = useState(preselected);
  const [selectedServices, setSelectedServices] = useState([]);

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");

  const [regionName, setRegionName] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [cityName, setCityName] = useState("");
  const [barangayName, setBarangayName] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });

    if (preselected && SERVICE_DATA[preselected]) {
      setSelectedServices([{ name: preselected, qty: 1, sqm: "" }]);
    }

    fetch("https://psgc.gitlab.io/api/regions/")
      .then((res) => res.json())
      .then((data) => setRegions(data));
  }, [preselected]);

  useEffect(() => {
    if (!selectedRegion) return;
    fetch(
      `https://psgc.gitlab.io/api/regions/${selectedRegion}/provinces/`
    )
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, [selectedRegion]);

  useEffect(() => {
    if (!selectedProvince) return;
    fetch(
      `https://psgc.gitlab.io/api/provinces/${selectedProvince}/cities-municipalities/`
    )
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedCity) return;
    fetch(
      `https://psgc.gitlab.io/api/cities-municipalities/${selectedCity}/barangays/`
    )
      .then((res) => res.json())
      .then((data) => setBarangays(data));
  }, [selectedCity]);

  const handleSqmChange = (serviceName, value) => {
    setSelectedServices((prev) =>
      prev.map((s) =>
        s.name === serviceName ? { ...s, sqm: value } : s
      )
    );
  };

  const handleConfirmBooking = async () => {
    if (!name || !email || !phone) {
      setErrorMessage("Please enter your name, email, and phone number.");
      return;
    }

    if (selectedServices.length === 0) {
      setErrorMessage("Please select at least one service.");
      return;
    }

    setErrorMessage("");

    const bookingData = {
      name,
      email,
      phone,
      region: regionName,
      province: provinceName,
      city: cityName,
      barangay: barangayName,
      services: selectedServices,
      totalHours,
      totalPrice,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/send-booking-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        navigate("/booking-confirmation", { state: { email } });
      } else {
        setErrorMessage("Something went wrong sending the email.");
      }
    } catch (error) {
      setErrorMessage("Error sending booking email.");
      console.error(error);
    }
  };

  const handleAddService = () => {
    if (!currentService) return;

    const serviceHrs = SERVICE_DATA[currentService].hrs;
    const currentTotalHours = selectedServices.reduce(
      (sum, s) => sum + SERVICE_DATA[s.name].hrs * s.qty,
      0
    );

    const exists = selectedServices.find(
      (s) => s.name === currentService
    );
    const addedHours = exists ? serviceHrs : serviceHrs * 1;

    if (currentTotalHours + addedHours > 6) {
      setErrorMessage("You cannot exceed 6 total hours of services.");
      return;
    }

    setErrorMessage("");

    setSelectedServices((prev) => {
      if (exists) {
        return prev.map((s) =>
          s.name === currentService
            ? { ...s, qty: s.qty + 1 }
            : s
        );
      }
      return [
        ...prev,
        { name: currentService, qty: 1, sqm: "" },
      ];
    });

    setCurrentService("");
  };

  const handleRemoveService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.filter((s) => s.name !== serviceName)
    );
  };

  const totalHours = selectedServices.reduce(
    (sum, s) => sum + SERVICE_DATA[s.name].hrs * s.qty,
    0
  );

  const totalPrice = selectedServices.reduce((sum, s) => {
    const pricePer100 = SERVICE_DATA[s.name].pricePer100sqm;
    const sqmFactor = s.sqm
      ? Math.ceil(Number(s.sqm) / 100)
      : 1;
    return sum + pricePer100 * sqmFactor * s.qty;
  }, 0);

  if (loading) return <Loader />;

  return (
    
    <section className="relative py-20 font-[Josefin_Sans]">
      <div className="absolute inset-0 bg-gradCient-to-br from-[#bde0fe] via-[#a2d2ff] to-[#ffc8dd] animate-gradientMove opacity-30"></div>

<div className="w-full flex justify-center mb-12" data-aos="zoom-in">
  <div className="relative">
   

    <div className="absolute inset-0 bg-gradient-to-br from-[#caf0f8]/40 via-[#90e0ef]/30 to-[#ade8f4]/40 
                    blur-3xl opacity-60 rounded-3xl pointer-events-none">
    </div>
  </div>
</div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-14" data-aos="fade-down">
          <h2 className="text-5xl font-extrabold text-[#1d3557] drop-shadow-lg tracking-wide">
            Book a Cleaning Service
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg mt-3">
            Select your services, fill out your details, and we’ll take care of the rest.
          </p>
        </div>

        <div
          className="bg-white rounded-3xl p-10 shadow-2xl border backdrop-blur-sm"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold text-[#1d3557] mb-8">Select Services</h3>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              value={currentService}
              onChange={(e) => setCurrentService(e.target.value)}
              className="w-full md:w-1/2 px-4 py-3 border rounded-xl shadow-md focus:ring-2 focus:ring-[#457b9d] transition"
            >
              <option value="">Select a service</option>
              {Object.keys(SERVICE_DATA).map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddService}
              className="bg-[#1d3557] hover:bg-[#264a7e] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md"
            >
              Add
            </button>
          </div>

          {selectedServices.length > 0 && (
            <div className="space-y-4">
              {selectedServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-100 px-4 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-[#1d3557] text-lg">{service.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {service.qty} • ₱{SERVICE_DATA[service.name].pricePer100sqm}/100 sqm
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveService(service.name)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <label className="text-sm font-medium">Square Meters:</label>
                    <input
                      type="number"
                      value={service.sqm}
                      onChange={(e) => handleSqmChange(service.name, e.target.value)}
                      className="w-32 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#1d3557]"
                      placeholder="150"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="bg-white rounded-3xl p-10 shadow-2xl border backdrop-blur-sm mt-12"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold text-[#1d3557] mb-8">Your Details</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl shadow-md"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => {
                  const code = e.target.value;
                  setSelectedRegion(code);
                  const found = regions.find((r) => r.code === code);
                  setRegionName(found?.name || "");
                }}
                className="w-full px-4 py-3 border rounded-xl shadow-md"
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Province</label>
              <select
                value={selectedProvince}
                onChange={(e) => {
                  const code = e.target.value;
                  setSelectedProvince(code);
                  const found = provinces.find((p) => p.code === code);
                  setProvinceName(found?.name || "");
                }}
                className="w-full px-4 py-3 border rounded-xl shadow-md"
              >
                <option value="">Select Province</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">City</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  const code = e.target.value;
                  setSelectedCity(code);
                  const found = cities.find((c) => c.code === code);
                  setCityName(found?.name || "");
                }}
                className="w-full px-4 py-3 border rounded-xl shadow-md"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Barangay</label>
              <select
                value={selectedBarangay}
                onChange={(e) => {
                  const code = e.target.value;
                  setSelectedBarangay(code);
                  const found = barangays.find((b) => b.code === code);
                  setBarangayName(found?.name || "");
                }}
                className="w-full px-4 py-3 border rounded-xl shadow-md"
              >
                <option value="">Select Barangay</option>
                {barangays.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Preferred Date</label>
              <input type="date" className="w-full px-4 py-3 border rounded-xl shadow-md" />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-semibold">Preferred Time</label>
              <input type="time" className="w-full px-4 py-3 border rounded-xl shadow-md" />
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-2xl border shadow-md">
            <h4 className="text-lg font-bold text-[#1d3557]">Summary</h4>

            <p className="mt-2">
              <strong>Name:</strong> {name || "—"}
            </p>
            <p>
              <strong>Phone:</strong> {phone || "—"}
            </p>

            <ul className="mt-2 space-y-1">
              {selectedServices.map((s) => {
                const sqmFactor = s.sqm ? Math.ceil(Number(s.sqm) / 100) : 1;
                const price = SERVICE_DATA[s.name].pricePer100sqm * sqmFactor * s.qty;

                return (
                  <li key={s.name} className="text-gray-700">
                    {s.qty} × {s.name} — {s.sqm || "No sqm"} sqm — ₱
                    {price.toLocaleString()}
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 font-bold text-[#1d3557]">Total Hours: {totalHours} hr(s)</p>
            <p className="font-extrabold text-xl text-[#1d3557]">
              Total Price: ₱{totalPrice.toLocaleString()}
            </p>
          </div>

          {errorMessage && (
            <div
              className="mt-6 text-red-700 bg-red-100 border border-red-300 p-4 rounded-xl text-center font-semibold"
              data-aos="fade-in"
            >
              {errorMessage}
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={handleConfirmBooking}
              className="bg-[#1d3557] text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-[#264a7e]"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradientMove {
            background-size: 250% 250%;
            animation: gradientMove 15s ease infinite;
          }
        `}
      </style>
    </section>
  );
};

export default BookNow;
