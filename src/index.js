import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Initialize AOS
AOS.init({
  duration: 800,   // Animation duration (ms)
  once: true,      // Only animate once per element
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
