import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';

const Home = () => {
  return (
    <>
      <Hero />
      
      {/* Creator Dashboard CTA */}
      <section className="py-16 bg-yuca-media-bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yuca-media-dark mb-4 text-center">Creator Dashboard</h2>
          <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
            Our Creator Dashboard has moved to Yuca Studios. Access all your projects, CryptoLottery, 
            and earnings information in one place, with a new enhanced creator-focused experience.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/studios/dashboard" 
              className="bg-yuca-media-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all text-lg inline-block"
              aria-label="Go to Creator Dashboard"
            >
              Access Creator Dashboard
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yuca-media-dark mb-8 text-center">About Yuca Media</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              Yuca Media was established in 2025 to address the severe shortage of work opportunities in the entertainment community, particularly for independent artists, filmmakers, and crew members.
            </p>
            <p className="text-lg mb-6">
              Our mission is to bridge the gap between traditional entertainment and Web3 technology, creating new paths for creators to fund, produce, and distribute their work.
            </p>
            <p className="text-lg mb-6">
              Through our blockchain-driven platforms, we empower artists to take control of their creative careers while building sustainable funding models that benefit the entire creative ecosystem.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-yuca-media-bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yuca-media-dark mb-8 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-yuca-media-dark mb-4">Web3 Development</h3>
              <p className="text-gray-700 mb-4">
                Custom blockchain solutions for creative industries, built on Solana for speed and efficiency.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-yuca-media-dark mb-4">CryptoLottery Platform</h3>
              <p className="text-gray-700 mb-4">
                A transparent, blockchain-based lottery system that generates sustainable funding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-yuca-media-dark mb-4">Yuca Studios</h3>
              <p className="text-gray-700 mb-4">
                Community-driven production studio for film, music videos, and creative content.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section id="contact-cta" className="py-20 bg-yuca-media-dark text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <p className="text-center mb-6">
              Interested in learning more about Yuca Media or getting involved with our projects?
            </p>
            <div className="text-center">
              <a 
                href="/contact" 
                className="bg-yuca-media-light text-yuca-media-dark px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all text-lg inline-block"
                aria-label="Contact Our Team"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wallet Section */}
      <section id="wallet-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-yuca-media-dark mb-8 text-center">Connect Your Wallet</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-lg mb-8">
              Connect your Solana wallet to access exclusive features, manage your assets, and participate in our ecosystem.
            </p>
            <div className="text-center">
              <WalletConnect variant="primary" size="lg" theme="yuca-media" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
