import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initializeGSAP, createScrollAnimation, fadeIn } from '../services/animation';

// Register ScrollTrigger at the component level to ensure it's available
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sceneRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const formRef = useRef(null);
  const infoSectionsRef = useRef(null);
  const faqItemsRef = useRef(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!sceneRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const canvas = sceneRef.current;
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create hexagon particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    
    const positionArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 15; // x
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      positionArray[i * 3 + 2] = (Math.random() - 1) * 10; // z (mostly behind camera)
      
      // Scale
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create hexagon shape for particles
    const hexShape = new THREE.Shape();
    const size = 0.05;
    
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = size * Math.cos(angle);
      const y = size * Math.sin(angle);
      
      if (i === 0) {
        hexShape.moveTo(x, y);
      } else {
        hexShape.lineTo(x, y);
      }
    }
    
    hexShape.closePath();
    
    const hexGeometry = new THREE.ShapeGeometry(hexShape);
    
    // Create instanced mesh for better performance
    const material = new THREE.MeshStandardMaterial({
      color: 0x2a9d8f,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    
    const instancedMesh = new THREE.InstancedMesh(hexGeometry, material, particlesCount);
    
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    
    for (let i = 0; i < particlesCount; i++) {
      position.set(
        positionArray[i * 3],
        positionArray[i * 3 + 1],
        positionArray[i * 3 + 2]
      );
      
      const scaleValue = scaleArray[i] * 2 + 0.5;
      scale.set(scaleValue, scaleValue, scaleValue);
      
      // Random rotation
      quaternion.setFromEuler(new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ));
      
      matrix.compose(position, quaternion, scale);
      instancedMesh.setMatrixAt(i, matrix);
    }
    
    scene.add(instancedMesh);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation variables
    const speeds = [];
    for (let i = 0; i < particlesCount; i++) {
      speeds.push((Math.random() + 0.5) * 0.005);
    }
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      
      for (let i = 0; i < particlesCount; i++) {
        instancedMesh.getMatrixAt(i, matrix);
        matrix.decompose(position, quaternion, scale);
        
        // Slow rotation
        quaternion.multiply(new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0.001, 0.001, speeds[i])
        ));
        
        // Slight movement
        position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
        
        matrix.compose(position, quaternion, scale);
        instancedMesh.setMatrixAt(i, matrix);
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
      
      renderer.render(scene, camera);
    }
    
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(instancedMesh);
      particlesGeometry.dispose();
      hexGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Hero animations
  useEffect(() => {
    if (heroTitleRef.current && heroSubtitleRef.current) {
      gsap.from(heroTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      
      gsap.from(heroSubtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
      });
    }
  }, []);

  // Initialize GSAP and scroll animations
  useEffect(() => {
    // Make sure ScrollTrigger is registered both globally and in this component
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize GSAP with ScrollTrigger
    initializeGSAP();
    
    // Form animations
    if (formRef.current) {
      const formItems = formRef.current.querySelectorAll('div');
      createScrollAnimation(formItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, {
        trigger: formRef.current,
        start: 'top 80%'
      });
    }
    
    // Info section animations
    if (infoSectionsRef.current) {
      const infoSections = infoSectionsRef.current.querySelectorAll(':scope > div');
      createScrollAnimation(infoSections, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, {
        trigger: infoSectionsRef.current,
        start: 'top 70%'
      });
    }
    
    // FAQ animations
    if (faqItemsRef.current) {
      const faqItems = faqItemsRef.current.querySelectorAll(':scope > div');
      createScrollAnimation(faqItems, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)"
      }, {
        trigger: faqItemsRef.current,
        start: 'top 75%'
      });
    }

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will respond shortly.');
  };

  return (
    <>
      {/* Hero Section with Three.js canvas */}
      <div className="hero-container bg-gradient-to-b from-[#1a2b21] to-[#2a3b31] relative h-[60vh] min-h-[500px] overflow-hidden">
        <canvas ref={sceneRef} id="contact-scene" className="absolute inset-0 w-full h-full"></canvas>
        
        {/* Floating hexagons decoration */}
        <div className="absolute top-[10%] left-[10%] w-[100px] h-[115px] opacity-80 z-10 animate-[float_8s_ease-in-out_infinite]">
          <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#2a9d8f" fillOpacity="0.2" stroke="#c2c8c4" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute top-[15%] right-[15%] w-[100px] h-[115px] opacity-80 z-10 animate-[float_9s_ease-in-out_infinite_reverse]">
          <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#c2c8c4" fillOpacity="0.2" stroke="#c2c8c4" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute bottom-[20%] left-[20%] w-[100px] h-[115px] opacity-80 z-10 animate-[float_10s_ease-in-out_infinite]">
          <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#1a2b21" fillOpacity="0.2" stroke="#c2c8c4" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute bottom-[10%] right-[10%] w-[100px] h-[115px] opacity-80 z-10 animate-[float_7s_ease-in-out_infinite_reverse]">
          <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#2a9d8f" fillOpacity="0.2" stroke="#c2c8c4" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center hero-content relative z-20">
          <div className="max-w-3xl text-white">
            <h1 ref={heroTitleRef} className="text-4xl md:text-5xl font-bold mb-4 hero-title">Connect With Yuca Media</h1>
            <p ref={heroSubtitleRef} className="text-xl mb-8 text-[#c2c8c4] hero-subtitle">
              Get in touch with our team to explore how blockchain technology can empower your creative projects.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-[#1a2b21]">Send us a Message</h2>
              
              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-[#1a2b21]">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Your name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-[#1a2b21]">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="your.email@example.com"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block mb-2 font-medium text-[#1a2b21]">I'm interested in</label>
                  <select 
                    id="interest" 
                    name="interest" 
                    defaultValue=""
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent"
                  >
                    <option value="" disabled>Select your interest</option>
                    <option value="blockchain">Blockchain Solutions</option>
                    <option value="cryptolottery">CryptoLottery</option>
                    <option value="studios">Yuca Studios</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-[#1a2b21]">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required 
                    placeholder="Share details about your project or inquiry..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a9d8f] focus:border-transparent"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#2a9d8f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#238f83] transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div ref={infoSectionsRef} className="lg:pl-8">
              <h2 className="text-3xl font-bold mb-8 text-[#1a2b21]">Get in Touch</h2>
              
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4 text-[#2a9d8f]">Our Locations</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-2">San Francisco</h4>
                    <p className="text-gray-600">
                      123 Tech Boulevard<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="font-bold text-lg mb-2">Virtual Office</h4>
                    <p className="text-gray-600">
                      Available for meetings 24/7<br />
                      in the Metaverse<br />
                      <a href="#" className="text-[#2a9d8f] hover:underline">Request Virtual Meeting</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4 text-[#2a9d8f]">Contact Details</h3>
                
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h4 className="font-bold text-lg mb-2">General Inquiries</h4>
                  <p className="text-gray-600 mb-2">
                    <span className="font-bold">Email:</span> info@yucamedia.com
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Phone:</span> +1 (555) 123-4567
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-bold text-lg mb-2">Partnership Opportunities</h4>
                  <p className="text-gray-600 mb-2">
                    <span className="font-bold">Email:</span> partnerships@yucamedia.com
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Phone:</span> +1 (555) 987-6543
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#2a9d8f]">Connect With Us</h3>
                
                <div className="flex space-x-4">
                  <a href="#" className="bg-[#1a2b21] text-white p-3 rounded-full hover:bg-opacity-90 transition-all">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  
                  <a href="#" className="bg-[#1a2b21] text-white p-3 rounded-full hover:bg-opacity-90 transition-all">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914a.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                    </svg>
                  </a>
                  
                  <a href="#" className="bg-[#1a2b21] text-white p-3 rounded-full hover:bg-opacity-90 transition-all">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                    </svg>
                  </a>
                  
                  <a href="#" className="bg-[#1a2b21] text-white p-3 rounded-full hover:bg-opacity-90 transition-all">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-[#f5f8f6]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#1a2b21]">Frequently Asked Questions</h2>
          
          <div ref={faqItemsRef} className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-[#2a9d8f]">What is Yuca Media's mission?</h3>
              <p>
                Yuca Media bridges the gap between traditional entertainment and Web3 technology, creating new opportunities for independent artists and filmmakers through blockchain. Our mission is to democratize media production and distribution while ensuring creators are fairly compensated for their work.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-[#2a9d8f]">How does the CryptoLottery work?</h3>
              <p>
                Our CryptoLottery uses blockchain technology to create transparent, verifiably fair lottery systems where all participants can audit the selection process. A percentage of proceeds goes directly to funding independent film and media projects, creating a sustainable funding model for creators.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-[#2a9d8f]">What services does Yuca Studios offer?</h3>
              <p>
                Yuca Studios provides end-to-end production services for independent filmmakers, including funding, production resources, post-production facilities, and blockchain-based distribution platforms. We specialize in helping creators maintain ownership of their intellectual property while reaching global audiences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-[#2a9d8f]">How can I partner with Yuca Media?</h3>
              <p>
                We're always looking for innovative partners who share our vision for the future of media. Whether you're a creator, investor, technology provider, or distribution platform, reach out through our contact form to start a conversation about potential collaboration opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
