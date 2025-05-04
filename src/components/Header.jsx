import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/globals.css'; 

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-[#1a2b21] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img 
              src="/assets/images/yuca-media-logo.svg" 
              alt="Yuca Media Logo" 
              className="h-10 w-10" 
              aria-label="Yuca Media Home"
            />
          </Link>
          <span className="text-xl font-bold">Yuca Media</span>
        </div>
        
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        
        <nav aria-label="Main Navigation">
          <ul className="flex space-x-6">
            <li>
              {isHomePage ? (
                <a href="#about" className="hover:text-[#c2c8c4] transition-colors">About</a>
              ) : (
                <Link to="/#about" className="hover:text-[#c2c8c4] transition-colors">About</Link>
              )}
            </li>
            <li>
              <Link to="/services" className={`hover:text-[#c2c8c4] transition-colors ${location.pathname === '/services' ? 'font-bold' : ''}`}>
                Services
              </Link>
            </li>
            <li>
              {isHomePage ? (
                <a href="#cryptolottery" className="hover:text-[#c2c8c4] transition-colors">CryptoLottery</a>
              ) : (
                <Link to="/#cryptolottery" className="hover:text-[#c2c8c4] transition-colors">CryptoLottery</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#studios" className="hover:text-[#c2c8c4] transition-colors">Yuca Studios</a>
              ) : (
                <Link to="/#studios" className="hover:text-[#c2c8c4] transition-colors">Yuca Studios</Link>
              )}
            </li>
            <li>
              <Link to="/contact" className={`hover:text-[#c2c8c4] transition-colors ${location.pathname === '/contact' ? 'font-bold' : ''}`}>
                Contact
              </Link>
            </li>
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
