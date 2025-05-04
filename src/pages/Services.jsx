import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  // References for animation elements
  const mainTitleRef = useRef(null);
  const subTitleRef = useRef(null);
  const serviceCardsRef = useRef(null);
  const blockchainSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Initialize animations
  useEffect(() => {
    // Hero section animations
    if (mainTitleRef.current && subTitleRef.current) {
      gsap.from(mainTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      
      gsap.from(subTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
      });
    }

    // Service cards animations
    if (serviceCardsRef.current) {
      const cards = serviceCardsRef.current.querySelectorAll('.service-card');
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: serviceCardsRef.current,
          start: 'top 75%'
        }
      });
    }

    // Blockchain section animations
    if (blockchainSectionRef.current) {
      const items = blockchainSectionRef.current.querySelectorAll('.animate-item');
      gsap.from(items, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: blockchainSectionRef.current,
          start: 'top 75%'
        }
      });
    }

    // CTA section animations
    if (ctaSectionRef.current) {
      gsap.from(ctaSectionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: 'top 80%'
        }
      });
    }

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1a2b21] to-[#2a3b31] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 ref={mainTitleRef} className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p ref={subTitleRef} className="text-xl text-[#c2c8c4]">
              Empowering creators and artists with cutting-edge blockchain technology and production resources
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a2b21] mb-12 text-center">What We Offer</h2>
          
          <div ref={serviceCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web3 Development Card */}
            <div className="service-card bg-[#f5f8f6] rounded-lg shadow-md overflow-hidden">
              <div className="h-3 bg-[#2a9d8f]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1a2b21] mb-4">Web3 Development</h3>
                <p className="text-gray-700 mb-4">
                  Our team specializes in building decentralized applications and smart contracts for creative industries. We leverage blockchain technology to create transparent, secure platforms for content creators.
                </p>
                <ul className="space-y-2 mb-6 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Smart contract development
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    NFT marketplaces
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Decentralized funding platforms
                  </li>
                </ul>
              </div>
            </div>
            
            {/* CryptoLottery Card */}
            <div className="service-card bg-[#f5f8f6] rounded-lg shadow-md overflow-hidden">
              <div className="h-3 bg-[#2a9d8f]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1a2b21] mb-4">CryptoLottery Platform</h3>
                <p className="text-gray-700 mb-4">
                  Our innovative CryptoLottery platform creates a sustainable funding model for independent filmmakers and artists while providing participants with transparent, verifiably fair opportunities.
                </p>
                <ul className="space-y-2 mb-6 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Blockchain-verified randomness
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Transparent fund allocation
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Direct creator support
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Yuca Studios Card */}
            <div className="service-card bg-[#f5f8f6] rounded-lg shadow-md overflow-hidden">
              <div className="h-3 bg-[#2a9d8f]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1a2b21] mb-4">Yuca Studios</h3>
                <p className="text-gray-700 mb-4">
                  Our production studio provides resources, expertise, and distribution channels for independent filmmakers and content creators, helping bring creative visions to life.
                </p>
                <ul className="space-y-2 mb-6 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Production resources
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Post-production facilities
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#2a9d8f] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Web3 distribution platforms
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blockchain Technology Section */}
      <section ref={blockchainSectionRef} className="py-16 bg-[#f5f8f6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b21] mb-6 animate-item">Blockchain Technology</h2>
              <p className="text-lg mb-6 animate-item">
                At Yuca Media, we harness the power of blockchain technology to create new opportunities and revenue streams for creators in the entertainment industry.
              </p>
              <div className="space-y-4 animate-item">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-[#2a9d8f] mb-2">Transparency</h3>
                  <p>All transactions and revenue sharing are recorded on the blockchain, providing complete transparency and auditability.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-[#2a9d8f] mb-2">Creator Ownership</h3>
                  <p>Our platform ensures creators maintain ownership of their intellectual property while expanding distribution.</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold text-[#2a9d8f] mb-2">Smart Contracts</h3>
                  <p>Automated contracts handle rights management, royalty payments, and revenue sharing with no intermediaries.</p>
                </div>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="aspect-square bg-[#1a2b21] rounded-lg relative overflow-hidden shadow-xl">
                {/* Hexagon pattern background */}
                <div className="absolute inset-0 opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`absolute w-32 h-36 ${i % 2 === 0 ? 'bg-[#2a9d8f]' : 'bg-[#c2c8c4]'}`} style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      top: `${Math.floor(i / 3) * 33 + Math.random() * 10}%`,
                      left: `${(i % 3) * 33 + Math.random() * 10}%`,
                      transform: `rotate(${Math.random() * 30}deg) scale(${0.8 + Math.random() * 0.4})`,
                    }}></div>
                  ))}
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Solana Blockchain</h3>
                  <p className="mb-6">
                    We build on Solana for its high throughput, low transaction costs, and energy efficiency.
                  </p>
                  <div className="inline-block bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                    <div className="font-mono text-sm">
                      <div className="mb-2">Smart Contract Address:</div>
                      <div className="text-[#2a9d8f]">yuca.sol.12rF9z7qM8...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section ref={ctaSectionRef} className="py-16 bg-[#1a2b21] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Partner With Us?</h2>
            <p className="text-[#c2c8c4] text-lg mb-8">
              Whether you're a creator looking for funding, a filmmaker seeking production resources, or an investor interested in blockchain opportunities, we'd love to connect.
            </p>
            <Link to="/contact" className="inline-block bg-[#2a9d8f] text-white px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 transition-all text-lg">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
