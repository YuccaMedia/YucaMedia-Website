import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';

const Home = () => {
  // This useEffect ensures proper scroll behavior when navigating to anchor links
  useEffect(() => {
    // Check if there's a hash in the URL (e.g., #about)
    if (window.location.hash) {
      // Get the element with that id
      const element = document.querySelector(window.location.hash);
      if (element) {
        // Allow time for any animations/transitions to complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <>
      <Hero />
      
      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-yuca-media-dark mb-6 md:mb-8 text-center">About Yuca Media</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg mb-4 sm:mb-6">
              Yuca Media was established in 2025 to address the severe shortage of work opportunities in the entertainment community, particularly for independent artists, filmmakers, and crew members.
            </p>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">
              Our mission is to bridge the gap between traditional entertainment and Web3 technology, creating new paths for creators to fund, produce, and distribute their work.
            </p>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">
              Through our blockchain-driven platforms, we empower artists to take control of their creative careers while building sustainable funding models that benefit the entire creative ecosystem.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-yuca-media-bg-light">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-yuca-media-dark mb-6 md:mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-yuca-media-dark mb-3 sm:mb-4">Web3 Development</h3>
              <p className="text-gray-700 mb-4">
                Custom blockchain solutions for creative industries, built on Solana for speed and efficiency.
              </p>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-yuca-media-dark mb-3 sm:mb-4">CryptoLottery Platform</h3>
              <p className="text-gray-700 mb-4">
                A transparent, blockchain-based lottery system that generates sustainable funding.
              </p>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-yuca-media-dark mb-3 sm:mb-4">Yuca Studios</h3>
              <p className="text-gray-700 mb-4">
                Community-driven production studio for film, music videos, and creative content.
              </p>
              <Link to="/yuca-studios" className="text-yuca-media-dark hover:underline font-medium inline-flex items-center">
                Visit Yuca Studios <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section id="contact-cta" className="py-12 sm:py-16 md:py-20 bg-yuca-media-dark text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center">Contact Us</h2>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-lg">
            <p className="text-center mb-6">
              Interested in learning more about Yuca Media or getting involved with our projects?
            </p>
            <div className="text-center">
              <Link 
                to="/contact" 
                className="bg-yuca-media-light text-yuca-media-dark px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all text-base sm:text-lg inline-block"
                aria-label="Contact Our Team"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Section */}
      <section id="wallet-section" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-yuca-media-dark mb-6 md:mb-8 text-center">Connect Your Wallet</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-base sm:text-lg mb-6 sm:mb-8">
              Connect your Solana wallet to access exclusive features, manage your assets, and participate in our ecosystem.
            </p>
            <div className="text-center">
              <WalletConnect 
                variant="primary" 
                size="lg" 
                theme="yuca-media" 
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
