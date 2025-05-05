import React from 'react';
import ReactDOM from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Router from './router';
import './styles/globals.css';
import './styles/services.css';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
