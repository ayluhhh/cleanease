import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Services from "./pages/Services";
import BookNow from "./pages/BookNow";
import BookingConfirmation from "./pages/BookingConfirmation";
=======

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";

>>>>>>> 6bbdd38434ca922f814de588296af95bbcfbf7ef

const App = () => {
  return (
    <Router>
      <Header />
<<<<<<< HEAD

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
=======
>>>>>>> 6bbdd38434ca922f814de588296af95bbcfbf7ef

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