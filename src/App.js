import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Services from "./pages/Services";
import BookNow from "./pages/BookNow";
import BookingConfirmation from "./pages/BookingConfirmation";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/services" element={<Services />} />
        <Route path="/book-now" element={<BookNow />} /> 
        <Route path="/BookNow" element={<BookNow />} /> 
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
