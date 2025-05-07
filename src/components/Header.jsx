import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/globals.css'; 
import WalletConnect from './WalletConnect';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home' || location.pathname === '/home/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`bg-yuca-media-dark text-white py-3 px-4 md:py-4 md:px-6 shadow-md sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/home" className="flex items-center">
            <img 
              src="/assets/images/yuca-media-logo.svg" 
              alt="Yuca Media Logo" 
              className="h-8 w-8 md:h-10 md:w-10" 
              aria-label="Yuca Media Home"
            />
            <span className="text-lg md:text-xl font-bold ml-2">Yuca Media</span>
          </Link>
        </div>
        
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        
        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:block">
          <ul className="flex space-x-4 lg:space-x-6">
            <li>
              {isHomePage ? (
                <a href="#about" className="px-2 py-1 hover:text-yuca-media-light transition-colors">About</a>
              ) : (
                <Link to="/home#about" className="px-2 py-1 hover:text-yuca-media-light transition-colors">About</Link>
              )}
            </li>
            <li>
              <Link to="/landing" className="px-2 py-1 hover:text-yuca-media-light transition-colors">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/services" className={`px-2 py-1 hover:text-yuca-media-light transition-colors ${location.pathname === '/services' ? 'font-bold' : ''}`}>
                Services
              </Link>
            </li>
            <li>
              {isHomePage ? (
                <a href="#cryptolottery" className="px-2 py-1 hover:text-yuca-media-light transition-colors">CryptoLottery</a>
              ) : (
                <Link to="/home#cryptolottery" className="px-2 py-1 hover:text-yuca-media-light transition-colors">CryptoLottery</Link>
              )}
            </li>
            <li>
              <Link to="/yuca-studios" className="px-2 py-1 hover:text-yuca-media-light transition-colors">
                Yuca Studios
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`px-2 py-1 hover:text-yuca-media-light transition-colors ${location.pathname === '/contact' ? 'font-bold' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Desktop Wallet Connect */}
        <div className="hidden md:block">
          <WalletConnect variant="secondary" size="md" theme="yuca-media" />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
            className="p-2 text-white focus:outline-none focus:ring-2 focus:ring-yuca-media-light rounded-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container mx-auto px-4">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col space-y-4">
              <li>
                {isHomePage ? (
                  <a href="#about" className="block py-2 hover:text-yuca-media-light transition-colors">About</a>
                ) : (
                  <Link to="/home#about" className="block py-2 hover:text-yuca-media-light transition-colors">About</Link>
                )}
              </li>
              <li>
                <Link to="/landing" className="block py-2 hover:text-yuca-media-light transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/services" className={`block py-2 hover:text-yuca-media-light transition-colors ${location.pathname === '/services' ? 'font-bold' : ''}`}>
                  Services
                </Link>
              </li>
              <li>
                {isHomePage ? (
                  <a href="#cryptolottery" className="block py-2 hover:text-yuca-media-light transition-colors">CryptoLottery</a>
                ) : (
                  <Link to="/home#cryptolottery" className="block py-2 hover:text-yuca-media-light transition-colors">CryptoLottery</Link>
                )}
              </li>
              <li>
                <Link to="/yuca-studios" className="block py-2 hover:text-yuca-media-light transition-colors">
                  Yuca Studios
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`block py-2 hover:text-yuca-media-light transition-colors ${location.pathname === '/contact' ? 'font-bold' : ''}`}>
                  Contact
                </Link>
              </li>
              <li className="pt-4">
                <WalletConnect variant="secondary" size="sm" theme="yuca-media" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
