import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// Import from our central GSAP configuration to ensure plugins are registered
import { gsap, ScrollTrigger, ensureScrollTriggerRegistered } from '../services/gsap-config';
import { 
  initializeGSAP, 
  createScrollAnimation, 
  fadeIn,
  clearScrollTriggers 
} from '../services/animation';

// Ensure ScrollTrigger is properly registered
try {
  gsap.registerPlugin(ScrollTrigger);
  console.log('ScrollTrigger registered in Services component');
} catch (error) {
  console.error('Failed to register ScrollTrigger in Services component:', error);
}

// Import components after GSAP setup to ensure proper plugin registration
import ThreeScene from '../components/ThreeScene';
import ParticleSystem from '../components/ParticleSystem';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  // References for animation elements
  const mainTitleRef = useRef(null);
  const subTitleRef = useRef(null);
  const serviceCardsRef = useRef(null);
  const blockchainSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Initialize animations
  useEffect(() => {
    // Make sure ScrollTrigger is properly registered and GSAP is initialized
    try {
      ensureScrollTriggerRegistered();
      gsap.registerPlugin(ScrollTrigger);
      
      // Initialize GSAP with ScrollTrigger
      const initSuccess = initializeGSAP();
      if (!initSuccess) {
        console.error('Failed to initialize GSAP in Services component');
      } else {
        console.log('GSAP successfully initialized in Services component');
      }
    } catch (error) {
      console.error('Error setting up ScrollTrigger in Services component:', error);
    }
    
    // Hero section animations
    if (mainTitleRef.current && subTitleRef.current) {
      fadeIn(mainTitleRef.current, {
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      
      fadeIn(subTitleRef.current, {
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
      });
    }

    // Service cards animations
    if (serviceCardsRef.current) {
      const cards = serviceCardsRef.current.querySelectorAll('.service-card');
      createScrollAnimation(cards, {
        y: 50,
        stagger: 0.2,
        ease: "power2.out"
      }, {
        trigger: serviceCardsRef.current,
        start: 'top 75%'
      });
    }

    // Blockchain section animations
    if (blockchainSectionRef.current) {
      const items = blockchainSectionRef.current.querySelectorAll('.animate-item');
      createScrollAnimation(items, {
        x: -50,
        stagger: 0.2,
        ease: "power2.out"
      }, {
        trigger: blockchainSectionRef.current,
        start: 'top 75%'
      });
    }

    // CTA section animations
    if (ctaSectionRef.current) {
      createScrollAnimation(ctaSectionRef.current, {
        y: 30,
        ease: "power2.out"
      }, {
        trigger: ctaSectionRef.current,
        start: 'top 80%'
      });
    }

    // Clean up
    return () => {
      clearScrollTriggers();
    };
  }, []);

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
      {/* 3D Background */}
      <ThreeScene />
      
      {/* Particle System */}
      <ParticleSystem count={50} />
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
      <section className="py-16 bg-[#1a2b21]/95">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center section-title">What We Offer</h2>
          
          <div ref={serviceCardsRef} className="services-container">
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
