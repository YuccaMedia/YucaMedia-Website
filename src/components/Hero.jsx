import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/globals.css';
import WalletConnect from './WalletConnect';

const Hero = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const animationContainerRef = useRef(null);

  useEffect(() => {
    // Use dynamic import instead of require for better error handling
    import('../scripts/logo-animation.js')
      .then(module => {
        if (typeof module.default === 'function') {
          module.default();
          setAnimationLoaded(true);
        }
      })
      .catch(() => {
        // Animation failed to load, but we'll handle it gracefully
        setAnimationLoaded(false);
        // Don't log the error to console - just silently handle it
      });
  }, []);

  // Handle animation responsive sizing on window resize
  useEffect(() => {
    const handleResize = () => {
      const container = animationContainerRef.current;
      if (container) {
        // Adjust animation size based on screen width
        if (window.innerWidth < 640) {
          container.style.width = '300px';
          container.style.height = '375px';
        } else {
          container.style.width = '400px';
          container.style.height = '500px';
        }
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="main-content" className="bg-gradient-to-b from-yuca-media-dark to-[#2a3b31] text-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Empowering Creators Through Blockchain
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-yuca-media-light">
            Yuca Media bridges the gap between traditional entertainment and Web3 technology, creating new opportunities for independent artists and filmmakers.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              className="touch-target bg-yuca-media-light text-yuca-media-dark px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all text-base sm:text-lg"
              aria-label="Explore CryptoLottery"
            >
              Explore CryptoLottery
            </button>
            <Link 
              to="/studios-landing" 
              className="touch-target border-2 border-yuca-media-light text-yuca-media-light px-4 sm:px-6 py-[10px] sm:py-3 rounded-lg font-medium hover:bg-yuca-media-light hover:bg-opacity-10 transition-all text-base sm:text-lg inline-flex items-center justify-center"
              aria-label="Learn About Yuca Studios"
            >
              Discover Yuca Studios
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0" aria-hidden="true">
          {/* SVG Animation Container */}
          <div 
            id="logo-animation-container" 
            ref={animationContainerRef}
            className="w-[300px] h-[375px] sm:w-[400px] sm:h-[500px]"
          >
            {/* Fallback SVG for when JavaScript is disabled */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" className="w-full h-full">
              {/* Dark green background circle */}
              <circle cx="200" cy="200" r="180" fill="#1a2b21" />
              
              {/* Light gray/silver outer circle */}
              <circle cx="200" cy="200" r="170" fill="none" stroke="#c2c8c4" strokeWidth="4" />
              
              {/* Animated hexagon dots - FURTHER ENLARGED HEXAGON SHAPE */}
              <g id="hexagonDots">
                {/* Top row */}
                <circle cx="200" cy="45" r="3" fill="#c2c8c4" />
                {/* Top-right dots */}
                <circle cx="310" cy="100" r="3" fill="#c2c8c4" />
                {/* Bottom-right dots */}
                <circle cx="310" cy="300" r="3" fill="#c2c8c4" />
                {/* Bottom dots */}
                <circle cx="200" cy="355" r="3" fill="#c2c8c4" />
                {/* Bottom-left dots */}
                <circle cx="90" cy="300" r="3" fill="#c2c8c4" />
                {/* Top-left dots */}
                <circle cx="90" cy="100" r="3" fill="#c2c8c4" />
                
                {/* Additional dots to fill in the hexagon pattern */}
                <circle cx="255" cy="70" r="2.5" fill="#c2c8c4" />
                <circle cx="145" cy="70" r="2.5" fill="#c2c8c4" />
                <circle cx="340" cy="150" r="2.5" fill="#c2c8c4" />
                <circle cx="340" cy="250" r="2.5" fill="#c2c8c4" />
                <circle cx="255" cy="330" r="2.5" fill="#c2c8c4" />
                <circle cx="145" cy="330" r="2.5" fill="#c2c8c4" />
                <circle cx="60" cy="250" r="2.5" fill="#c2c8c4" />
                <circle cx="60" cy="150" r="2.5" fill="#c2c8c4" />
                
                {/* Extra dots for a fuller hexagon effect */}
                <circle cx="290" cy="200" r="2" fill="#c2c8c4" />
                <circle cx="110" cy="200" r="2" fill="#c2c8c4" />
                <circle cx="325" cy="165" r="2" fill="#c2c8c4" />
                <circle cx="325" cy="235" r="2" fill="#c2c8c4" />
                <circle cx="75" cy="165" r="2" fill="#c2c8c4" />
                <circle cx="75" cy="235" r="2" fill="#c2c8c4" />
                
                {/* Additional corner dots for enhanced hexagon definition */}
                <circle cx="280" cy="95" r="2" fill="#c2c8c4" />
                <circle cx="280" cy="305" r="2" fill="#c2c8c4" />
                <circle cx="120" cy="305" r="2" fill="#c2c8c4" />
                <circle cx="120" cy="95" r="2" fill="#c2c8c4" />
                
                {/* Additional points to fill gaps in larger hexagon */}
                <circle cx="230" cy="55" r="2" fill="#c2c8c4" />
                <circle cx="170" cy="55" r="2" fill="#c2c8c4" />
                <circle cx="230" cy="345" r="2" fill="#c2c8c4" />
                <circle cx="170" cy="345" r="2" fill="#c2c8c4" />
              </g>
              
              {/* Properly oriented Y with connected roots */}
              {/* Y upper part */}
              <path d="M160 100 L200 160 L240 100" fill="none" stroke="#c2c8c4" strokeWidth="8" strokeLinecap="round" />
              {/* Y stem */}
              <path d="M200 160 L200 220" fill="none" stroke="#c2c8c4" strokeWidth="8" strokeLinecap="round" />
              
              {/* Root system connected to Y */}
              <path d="M200 220 L200 260" fill="none" stroke="#c2c8c4" strokeWidth="6" strokeLinecap="round" />
              <path d="M200 260 L170 290" fill="none" stroke="#c2c8c4" strokeWidth="4" strokeLinecap="round" />
              <path d="M200 260 L230 290" fill="none" stroke="#c2c8c4" strokeWidth="4" strokeLinecap="round" />
              <path d="M170 290 L150 315" fill="none" stroke="#c2c8c4" strokeWidth="3" strokeLinecap="round" />
              <path d="M170 290 L175 320" fill="none" stroke="#c2c8c4" strokeWidth="3" strokeLinecap="round" />
              <path d="M230 290 L225 320" fill="none" stroke="#c2c8c4" strokeWidth="3" strokeLinecap="round" />
              <path d="M230 290 L250 315" fill="none" stroke="#c2c8c4" strokeWidth="3" strokeLinecap="round" />
              <path d="M150 315 L140 330" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              <path d="M150 315 L155 335" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              <path d="M175 320 L165 340" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              <path d="M175 320 L190 340" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              <path d="M225 320 L210 340" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              <path d="M225 320 L235 340" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              <path d="M250 315 L245 335" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              <path d="M250 315 L260 330" fill="none" stroke="#c2c8c4" strokeWidth="2" strokeLinecap="round" />
              
              {/* Text - YUCA MEDIA (positioned below the circle) */}
              <text x="200" y="430" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#c2c8c4" textAnchor="middle">YUCA MEDIA</text>
              
              {/* Tagline (positioned below the name) */}
              <text x="200" y="460" fontFamily="Arial, sans-serif" fontSize="14" fill="#c2c8c4" textAnchor="middle">Rooted in Innovation. Built for the Future.</text>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Wallet connection banner */}
      <div className="bg-[#1a2b21] bg-opacity-90 py-4 mt-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-yuca-media-light mb-4 md:mb-0">Connect your Solana wallet to access exclusive features</p>
          <WalletConnect variant="secondary" size="sm" theme="yuca-media" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
