import React from 'react';
import '../styles/globals.css'; 

const Header = () => {
  return (
    <header className="bg-[#1a2b21] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img 
            src="/assets/images/yuca-media-logo.svg" 
            alt="Yuca Media Logo" 
            className="h-10 w-10" 
            aria-label="Yuca Media Home"
          />
          <span className="text-xl font-bold">Yuca Media</span>
        </div>
        
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        
        <nav aria-label="Main Navigation">
          <ul className="flex space-x-6">
            <li><a href="#about" className="hover:text-[#c2c8c4] transition-colors">About</a></li>
            <li><a href="#services" className="hover:text-[#c2c8c4] transition-colors">Services</a></li>
            <li><a href="#cryptolottery" className="hover:text-[#c2c8c4] transition-colors">CryptoLottery</a></li>
            <li><a href="#studios" className="hover:text-[#c2c8c4] transition-colors">Yuca Studios</a></li>
            <li><a href="#contact" className="hover:text-[#c2c8c4] transition-colors">Contact</a></li>
          </ul>
        </nav>
        
        <button 
          className="bg-[#c2c8c4] text-[#1a2b21] px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all"
          aria-label="Connect Wallet"
        >
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
