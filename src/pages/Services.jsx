import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Import components
import ThreeScene from '../components/ThreeScene';
import ParticleSystem from '../components/ParticleSystem';
import ServiceCard from '../components/ServiceCard';

// Import our new Animation Manager
import AnimationManager from '../services/AnimationManager'; 

// Fallback animation helper
const createBasicAnimation = (target, options = {}) => {
  const gsap = window.gsap || {};
  if (!gsap.from) return null;
  
  const defaults = {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  };
  
  return gsap.from(target, { ...defaults, ...options });
};

const Services = () => {
  // Track animation readiness
  const [animationsReady, setAnimationsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // References for animation elements
  const mainTitleRef = useRef(null);
  const subTitleRef = useRef(null);
  const serviceCardsRef = useRef(null);
  const blockchainSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);
  
  // Keep track of created scroll triggers for cleanup
  const scrollTriggersRef = useRef([]);

  // Initialize Animation Manager
  useEffect(() => {
    console.log('🔄 Services: Initializing Animation Manager');
    
    // Initialize the Animation Manager
    const state = AnimationManager.init();
    
    // Set up a loading indicator
    setIsLoading(true);
    
    // Check if animations can be initialized
    const checkAnimationsReady = () => {
      const state = AnimationManager.getState();
      return state.gsapReady && state.scrollTriggerReady;
    };
    
    // Check immediately
    if (checkAnimationsReady()) {
      setAnimationsReady(true);
      setIsLoading(false);
    } else {
      // Check again after a delay
      const checkInterval = setInterval(() => {
        if (checkAnimationsReady()) {
          clearInterval(checkInterval);
          setAnimationsReady(true);
          setIsLoading(false);
          console.log('🎯 Animations ready after delay check');
        }
      }, 300);
      
      // Clean up interval
      setTimeout(() => {
        clearInterval(checkInterval);
        
        // If still not ready after timeout, show without animations
        if (!animationsReady) {
          console.log('⚠️ Animations not ready after timeout, proceeding without');
          setIsLoading(false);
        }
      }, 5000); // Extended timeout for animation resources to load
    }
    
    // Clean up on unmount
    return () => {
      // Clean up any scroll triggers we created
      if (scrollTriggersRef.current.length > 0) {
        console.log(`🧹 Cleaning up ${scrollTriggersRef.current.length} scroll triggers`);
        scrollTriggersRef.current.forEach(trigger => {
          if (trigger && typeof trigger.kill === 'function') {
            trigger.kill();
          }
        });
        scrollTriggersRef.current = [];
      }
      
      // Clean up animations through Animation Manager
      AnimationManager.cleanupAnimations();
    };
  }, []);
  
  // Set up animations after content is ready
  useEffect(() => {
    if (!animationsReady) return;
    
    console.log('🎯 Setting up animations with Animation Manager');
    
    // Hero section animations
    if (mainTitleRef.current && subTitleRef.current) {
      try {
        // Create hero animations with direct GSAP
        createBasicAnimation(mainTitleRef.current, {
          y: 50,
          duration: 1,
          ease: "power3.out",
          delay: 0.2
        });
        
        createBasicAnimation(subTitleRef.current, {
          y: 30,
          duration: 1,
          ease: "power3.out",
          delay: 0.4
        });
      } catch (error) {
        console.error('❌ Error animating hero section:', error);
      }
    }
    
    // Service cards animations with ScrollTrigger
    if (serviceCardsRef.current) {
      try {
        const cards = serviceCardsRef.current.querySelectorAll('.service-card');
        
        const result = AnimationManager.createScrollAnimation(cards, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          ease: "power2.out"
        }, {
          trigger: serviceCardsRef.current,
          start: 'top 75%',
          markers: false
        });
        
        // Store the ScrollTrigger for cleanup if it was created
        if (result && result.trigger) {
          scrollTriggersRef.current.push(result.trigger);
        }
      } catch (error) {
        console.error('❌ Error animating service cards:', error);
        
        // Fallback to basic animation
        const cards = serviceCardsRef.current.querySelectorAll('.service-card');
        createBasicAnimation(cards, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          delay: 0.6
        });
      }
    }
    
    // Blockchain section animations
    if (blockchainSectionRef.current) {
      try {
        const items = blockchainSectionRef.current.querySelectorAll('.animate-item');
        
        const result = AnimationManager.createScrollAnimation(items, {
          opacity: 0,
          x: -50,
          stagger: 0.2,
          ease: "power2.out"
        }, {
          trigger: blockchainSectionRef.current,
          start: 'top 75%',
          markers: false
        });
        
        // Store the ScrollTrigger for cleanup if it was created
        if (result && result.trigger) {
          scrollTriggersRef.current.push(result.trigger);
        }
      } catch (error) {
        console.error('❌ Error animating blockchain section:', error);
        
        // Fallback to basic animation
        const items = blockchainSectionRef.current.querySelectorAll('.animate-item');
        createBasicAnimation(items, {
          opacity: 0,
          x: -50,
          stagger: 0.2,
          delay: 1
        });
      }
    }
    
    // CTA section animations
    if (ctaSectionRef.current) {
      try {
        const result = AnimationManager.createScrollAnimation(ctaSectionRef.current, {
          opacity: 0,
          y: 30,
          ease: "power2.out"
        }, {
          trigger: ctaSectionRef.current,
          start: 'top 80%',
          markers: false
        });
        
        // Store the ScrollTrigger for cleanup if it was created
        if (result && result.trigger) {
          scrollTriggersRef.current.push(result.trigger);
        }
      } catch (error) {
        console.error('❌ Error animating CTA section:', error);
        
        // Fallback to basic animation
        createBasicAnimation(ctaSectionRef.current, {
          opacity: 0,
          y: 30,
          delay: 1.2
        });
      }
    }
  }, [animationsReady]);

  // Define services data
  const services = [
    {
      title: "Blockchain Development",
      description: "We leverage the transformative power of blockchain to build decentralized applications, smart contracts, and innovative solutions that redefine how businesses and communities interact in the digital space.",
      serviceType: "blockchain",
      features: [
        {
          title: "Smart Contract Development",
          description: "Secure, audited smart contracts built on Ethereum, Solana, and other leading blockchain networks."
        },
        {
          title: "dApp Creation",
          description: "Full-stack decentralized applications with seamless user experiences and robust backend functionality."
        },
        {
          title: "Token Development",
          description: "Custom cryptocurrency tokens and NFT systems designed to your specific business requirements."
        },
        {
          title: "Blockchain Integration",
          description: "Integrate blockchain technology into your existing systems and workflows without disruption."
        }
      ],
      ctaText: "Explore Blockchain Services",
      ctaLink: "/contact"
    },
    {
      title: "Web Development",
      description: "We design and build innovative websites and web applications that captivate audiences, drive engagement, and deliver exceptional user experiences across all devices.",
      serviceType: "webdev",
      features: [
        {
          title: "Interactive Web Experiences",
          description: "Immersive, responsive websites that engage users with cutting-edge animations and intuitive interfaces."
        },
        {
          title: "Web3 Integration",
          description: "Future-ready websites with cryptocurrency wallet connections and blockchain functionality."
        },
        {
          title: "Progressive Web Apps",
          description: "Fast, reliable, and engaging apps that work for all users, regardless of browser choice or network connection."
        },
        {
          title: "E-commerce Solutions",
          description: "Custom online stores with secure payment processing, inventory management, and crypto payment options."
        }
      ],
      ctaText: "Explore Web Development",
      ctaLink: "/contact"
    },
    {
      title: "Creative Services",
      description: "Our creative team transforms ideas into compelling visual narratives through cutting-edge design, animation, and video production that elevates your brand and captivates your audience.",
      serviceType: "creative",
      features: [
        {
          title: "3D Animation & Modeling",
          description: "Immersive 3D experiences, character models, and environments for web, games, and promotional content."
        },
        {
          title: "Video Production",
          description: "High-quality video content creation, from concept to editing, ready for web and social media distribution."
        },
        {
          title: "NFT Creation & Design",
          description: "Original, collectible digital assets designed for blockchain platforms and metaverse integration."
        },
        {
          title: "Brand Identity Development",
          description: "Comprehensive branding solutions including logos, style guides, and visual identity systems."
        }
      ],
      ctaText: "Explore Creative Services",
      ctaLink: "/contact"
    },
    {
      title: "Web3 Consulting",
      description: "Navigate the complexities of blockchain technology and Web3 ecosystems with our expert consulting services. We help businesses understand, implement, and benefit from emerging digital technologies.",
      serviceType: "consulting",
      features: [
        {
          title: "Blockchain Strategy",
          description: "Custom roadmaps for integrating blockchain technology into your business model and operations."
        },
        {
          title: "Token Economics",
          description: "Comprehensive design and analysis of tokenomics systems for sustainable blockchain projects."
        },
        {
          title: "Technical Audits",
          description: "Security and efficiency evaluations of blockchain implementations and smart contracts."
        },
        {
          title: "Web3 Transformation",
          description: "Guidance on transitioning from Web2 to Web3 business models and technologies."
        }
      ],
      ctaText: "Explore Consulting Services",
      ctaLink: "/contact"
    }
  ];

  return (
    <>
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#1a2b21] z-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin h-12 w-12 border-4 border-t-transparent border-white rounded-full mx-auto mb-4"></div>
            <p className="text-xl">Loading services...</p>
          </div>
        </div>
      )}
      
      {/* 3D Background with service models */}
      <ThreeScene activeService={serviceCardsRef.current?.querySelector(':hover')?.dataset?.service} />
      
      {/* Particle System with service-specific colors */}
      <ParticleSystem count={50} activeService={serviceCardsRef.current?.querySelector(':hover')?.dataset?.service} />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#1a2b21]/90 to-[#2a3b31]/90 text-white py-20">
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
          <h2 className="text-3xl font-bold text-[#1a2b21] mb-12 text-center section-title">What We Offer</h2>
          
          <div ref={serviceCardsRef} className="flex flex-col gap-12 max-w-4xl mx-auto services-container">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                features={service.features}
                ctaText={service.ctaText}
                ctaLink={service.ctaLink}
                serviceType={service.serviceType}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Blockchain Technology Section */}
      <section ref={blockchainSectionRef} className="py-16 bg-[#1a2b21]/80 border-t border-[#c2c8c4]/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 animate-item">Blockchain Technology</h2>
              <p className="text-lg text-[#c2c8c4] mb-6 animate-item">
                At Yuca Media, we harness the power of blockchain technology to create new opportunities and revenue streams for creators in the entertainment industry.
              </p>
              <div className="space-y-4 animate-item">
                <div className="bg-[#1a2b21]/70 p-4 rounded-lg shadow-md border border-[#2a9d8f]/20">
                  <h3 className="font-bold text-[#2a9d8f] mb-2">Transparency</h3>
                  <p className="text-[#c2c8c4]">All transactions and revenue sharing are recorded on the blockchain, providing complete transparency and auditability.</p>
                </div>
                <div className="bg-[#1a2b21]/70 p-4 rounded-lg shadow-md border border-[#2a9d8f]/20">
                  <h3 className="font-bold text-[#2a9d8f] mb-2">Creator Ownership</h3>
                  <p className="text-[#c2c8c4]">Our platform ensures creators maintain ownership of their intellectual property while expanding distribution.</p>
                </div>
                <div className="bg-[#1a2b21]/70 p-4 rounded-lg shadow-md border border-[#2a9d8f]/20">
                  <h3 className="font-bold text-[#2a9d8f] mb-2">Smart Contracts</h3>
                  <p className="text-[#c2c8c4]">Automated contracts handle rights management, royalty payments, and revenue sharing with no intermediaries.</p>
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
