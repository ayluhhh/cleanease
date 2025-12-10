import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Services from "./pages/Services";
import BookNow from "./pages/BookNow";
import BookingConfirmation from "./pages/BookingConfirmation";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/services" element={<Services />} />
        <Route path="/book-now" element={<BookNow />} /> 
        <Route path="/BookNow" element={<BookNow />} /> 
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;