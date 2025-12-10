import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";


const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/Services" element={<Services />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/" element={<Home />} />

      </Routes>

      <Footer />
    </Router>
  );
};

export default App;