import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/globals.css'; 
import WalletConnect from './WalletConnect';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home' || location.pathname === '/home/';

  return (
    <header className="bg-yuca-media-dark text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/home">
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
                <a href="#about" className="hover:text-yuca-media-light transition-colors">About</a>
              ) : (
                <Link to="/home#about" className="hover:text-yuca-media-light transition-colors">About</Link>
              )}
            </li>
            <li>
              <Link to="/landing" className="hover:text-yuca-media-light transition-colors">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/services" className={`hover:text-yuca-media-light transition-colors ${location.pathname === '/services' ? 'font-bold' : ''}`}>
                Services
              </Link>
            </li>
            <li>
              {isHomePage ? (
                <a href="#cryptolottery" className="hover:text-yuca-media-light transition-colors">CryptoLottery</a>
              ) : (
                <Link to="/home#cryptolottery" className="hover:text-yuca-media-light transition-colors">CryptoLottery</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#studios" className="hover:text-yuca-media-light transition-colors">Yuca Studios</a>
              ) : (
                <Link to="/home#studios" className="hover:text-yuca-media-light transition-colors">Yuca Studios</Link>
              )}
            </li>
            <li>
              <Link to="/contact" className={`hover:text-yuca-media-light transition-colors ${location.pathname === '/contact' ? 'font-bold' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <WalletConnect variant="secondary" size="md" theme="yuca-media" />
      </div>
    </header>
  );
};

export default Header;
