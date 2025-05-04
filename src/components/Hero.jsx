import React, { useEffect } from 'react';
import '../styles/globals.css';

const Hero = () => {
  useEffect(() => {
    // This is where we would initialize Three.js animations
    // Import animation code from scripts/logo-animation.js
    try {
      const initAnimation = require('../scripts/logo-animation.js').default;
      if (typeof initAnimation === 'function') {
        initAnimation();
      }
    } catch (err) {
      console.log('Animation loading deferred');
    }
  }, []);

  return (
    <section id="main-content" className="bg-gradient-to-b from-[#1a2b21] to-[#2a3b31] text-white py-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">
            Empowering Creators Through Blockchain
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 text-[#c2c8c4]">
            Yuca Media bridges the gap between traditional entertainment and Web3 technology, creating new opportunities for independent artists and filmmakers.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <button 
              className="bg-[#c2c8c4] text-[#1a2b21] px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all text-lg"
              aria-label="Explore CryptoLottery"
            >
              Explore CryptoLottery
            </button>
            <button 
              className="border-2 border-[#c2c8c4] text-[#c2c8c4] px-6 py-3 rounded-lg font-medium hover:bg-[#c2c8c4] hover:bg-opacity-10 transition-all text-lg"
              aria-label="Learn About Yuca Studios"
            >
              Discover Yuca Studios
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center" aria-hidden="true">
          {/* SVG Animation Container */}
          <div id="logo-animation-container" className="w-[400px] h-[400px]">
            {/* Fallback SVG for when JavaScript is disabled */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="200" cy="200" r="180" fill="#1a2b21" />
              <circle cx="200" cy="200" r="170" fill="none" stroke="#c2c8c4" strokeWidth="4" />
              <g id="hexagonDots">
                <circle cx="200" cy="45" r="3" fill="#c2c8c4" />
                <circle cx="310" cy="100" r="3" fill="#c2c8c4" />
                <circle cx="340" cy="150" r="3" fill="#c2c8c4" />
                <circle cx="310" cy="300" r="3" fill="#c2c8c4" />
                <circle cx="200" cy="355" r="3" fill="#c2c8c4" />
                <circle cx="90" cy="300" r="3" fill="#c2c8c4" />
                <circle cx="60" cy="150" r="3" fill="#c2c8c4" />
                <circle cx="90" cy="100" r="3" fill="#c2c8c4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
