import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
// Import from our central GSAP configuration
import { gsap, ScrollTrigger, ensureScrollTriggerRegistered } from '../services/gsap-config';
import { initializeGSAP, createScrollAnimation, fadeIn, staggerAnimation } from '../services/animation';
import EnvelopeModel from '../components/EnvelopeModel';

const Contact = () => {
  const sceneRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const formRef = useRef(null);
  const infoSectionsRef = useRef(null);
  const envelopeContainerRef = useRef(null);
  const formFieldsRef = useRef([]);
  const formButtonRef = useRef(null);

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
    
    // Add lights and create particles
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create hexagon particles with more interesting animations
    const hexGeometry = new THREE.CircleGeometry(0.05, 6);
    const material = new THREE.MeshStandardMaterial({
      color: 0x2a9d8f,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    
    const particlesCount = 150;
    const instancedMesh = new THREE.InstancedMesh(hexGeometry, material, particlesCount);
    
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    
    // Store particle properties for animation
    const particles = [];
    
    for (let i = 0; i < particlesCount; i++) {
      position.set(
        (Math.random() - 0.5) * 15, 
        (Math.random() - 0.5) * 15, 
        (Math.random() - 1) * 10
      );
      
      const scaleValue = Math.random() * 2 + 0.5;
      scale.set(scaleValue, scaleValue, scaleValue);
      
      quaternion.setFromEuler(new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ));
      
      matrix.compose(position, quaternion, scale);
      instancedMesh.setMatrixAt(i, matrix);
      
      // Store particle animation properties
      particles.push({
        position: position.clone(),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        speed: Math.random() * 0.01 + 0.002,
        rotationSpeed: Math.random() * 0.005 + 0.002,
        amplitude: Math.random() * 0.5 + 0.5
      });
    }
    
    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);
    camera.position.z = 5;
    
    // Animation function with micro animations
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Update each particle's position and rotation
      for (let i = 0; i < particlesCount; i++) {
        const particle = particles[i];
        
        // Position animation - gentle floating
        position.copy(particle.position);
        position.y += Math.sin(time * particle.speed) * particle.amplitude * 0.05;
        position.x += Math.cos(time * particle.speed * 0.7) * particle.amplitude * 0.03;
        
        // Rotation animation
        quaternion.setFromEuler(new THREE.Euler(
          particle.rotation.x + time * particle.rotationSpeed,
          particle.rotation.y + time * particle.rotationSpeed * 0.8,
          particle.rotation.z + time * particle.rotationSpeed * 1.2
        ));
        
        // Scale with subtle pulsing
        const pulseScale = 1 + Math.sin(time * particle.speed * 3) * 0.05;
        const baseScale = 0.5 + particle.amplitude;
        scale.set(baseScale * pulseScale, baseScale * pulseScale, baseScale * pulseScale);
        
        // Apply to matrix
        matrix.compose(position, quaternion, scale);
        instancedMesh.setMatrixAt(i, matrix);
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    }
    
    animate();

    // Clean up
    return () => {
      scene.remove(instancedMesh);
      hexGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    // Initialize GSAP animations
    initializeGSAP();
    
    // Add scroll animations here
    if (heroTitleRef.current && heroSubtitleRef.current) {
      // Animate hero text with letter-by-letter reveal
      const heroTitle = heroTitleRef.current;
      const heroText = heroTitle.textContent;
      heroTitle.textContent = '';
      
      // Create spans for each letter
      heroText.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(20px)';
        heroTitle.appendChild(span);
      });
      
      // Animate each letter
      gsap.to(heroTitle.children, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power2.out"
      });
      
      // Apply the same letter-by-letter animation to subtitle
      const heroSubtitle = heroSubtitleRef.current;
      const subtitleText = heroSubtitle.textContent;
      heroSubtitle.textContent = '';
      
      // Create spans for each letter in subtitle
      subtitleText.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(20px)';
        heroSubtitle.appendChild(span);
      });
      
      // Animate each letter in subtitle with a slight delay after the title
      gsap.to(heroSubtitle.children, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        delay: 0.8, // Start after title animation
        ease: "power2.out"
      });
    }
    
    // Animate form elements when scrolled into view
    if (formRef.current) {
      const formElements = formRef.current.querySelectorAll('input, textarea, button, label');
      formFieldsRef.current = formElements;
      
      // Use a simpler animation approach without ScrollTrigger
      gsap.fromTo(formElements, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.5
        }
      );
    }
    
    // Animate contact info cards
    if (infoSectionsRef.current) {
      // Use a class-based selector instead of tailwind's utility classes directly
      const infoCards = infoSectionsRef.current.querySelectorAll('.contact-card');
      
      // Use a simpler animation approach without ScrollTrigger
      gsap.fromTo(infoCards,
        { opacity: 0, scale: 0.9, y: 30 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          delay: 0.8
        }
      );
    }
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle form interactions and animations
  useEffect(() => {
    if (!formRef.current) return;
    
    // Add hover effects to form inputs
    const formInputs = formRef.current.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      // Scale up effect on focus
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          borderColor: 'rgba(42, 157, 143, 0.8)',
          boxShadow: '0 0 10px rgba(42, 157, 143, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      // Reset on blur
      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          borderColor: 'rgba(42, 157, 143, 0.3)',
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
    
    // Add pulse animation to submit button
    const submitButton = formRef.current.querySelector('button[type="submit"]');
    if (submitButton) {
      formButtonRef.current = submitButton;
      
      // Subtle pulse animation
      const pulseAnimation = gsap.timeline({ repeat: -1, yoyo: true });
      pulseAnimation.to(submitButton, {
        boxShadow: '0 0 15px rgba(42, 157, 143, 0.5)',
        scale: 1.03,
        duration: 1.5,
        ease: 'sine.inOut'
      });
      
      // Stronger pulse on hover
      submitButton.addEventListener('mouseenter', () => {
        pulseAnimation.pause();
        gsap.to(submitButton, {
          backgroundColor: '#34c1b2',
          scale: 1.05,
          boxShadow: '0 0 20px rgba(42, 157, 143, 0.7)',
          duration: 0.3
        });
      });
      
      submitButton.addEventListener('mouseleave', () => {
        gsap.to(submitButton, {
          backgroundColor: '#2a9d8f',
          scale: 1,
          boxShadow: 'none',
          duration: 0.3,
          onComplete: () => pulseAnimation.play()
        });
      });
    }
    
    // Add interactive animations to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
      const hexagon = card.querySelector('svg');
      const icon = card.querySelector('.w-8.h-8');
      
      card.addEventListener('mouseenter', () => {
        gsap.to(hexagon, {
          rotation: 30,
          scale: 1.2,
          opacity: 0.3,
          duration: 0.5
        });
        
        gsap.to(icon, {
          scale: 1.2,
          backgroundColor: '#34c1b2',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(hexagon, {
          rotation: 0,
          scale: 1,
          opacity: 0.2,
          duration: 0.5
        });
        
        gsap.to(icon, {
          scale: 1,
          backgroundColor: '#2a9d8f',
          duration: 0.3
        });
      });
    });
    
    return () => {
      // Clean up event listeners
      formInputs.forEach(input => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
      });
      
      if (submitButton) {
        submitButton.removeEventListener('mouseenter', () => {});
        submitButton.removeEventListener('mouseleave', () => {});
      }
      
      contactCards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a successful submit animation
    const submitButton = formButtonRef.current;
    const formContents = formRef.current;
    
    if (submitButton && formContents) {
      // First animate the button
      gsap.timeline()
        .to(submitButton, {
          scale: 0.95,
          duration: 0.1,
        })
        .to(submitButton, {
          scale: 1.1,
          duration: 0.2,
        })
        .to(submitButton, {
          scale: 1,
          duration: 0.2,
        });
      
      // Then animate the form with a success message
      gsap.timeline()
        .to(formContents, {
          opacity: 0.5,
          y: 10,
          duration: 0.3,
          delay: 0.5
        })
        .to(formContents, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          onComplete: () => {
            alert('Thank you for your message! We will respond shortly.');
          }
        });
    } else {
      alert('Thank you for your message! We will respond shortly.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-container bg-gradient-to-b from-[#1a2b21] to-[#2a3b31] relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0 bg-[#1a2b21]/60 z-10"></div>
        <canvas ref={sceneRef} id="contact-scene" className="absolute inset-0 w-full h-full"></canvas>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-4xl text-white backdrop-blur-sm bg-[#1a2b21]/50 p-8 rounded-lg shadow-lg border border-[#2a9d8f]/20">
            <h1 
              ref={heroTitleRef} 
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
              style={{ textShadow: '0 0 20px rgba(42, 157, 143, 0.7)' }}
            >
              Connect With Yuca Media
            </h1>
            <p 
              ref={heroSubtitleRef} 
              className="text-xl mb-8 text-white whitespace-normal max-w-2xl"
              style={{ textShadow: '0 0 20px rgba(42, 157, 143, 0.7)' }}
            >
              Get in touch with our team to explore how blockchain technology can empower your creative projects.
            </p>
          </div>
        </div>
      </div>
      
      {/* 3D Envelope Section */}
      <div className="relative z-20 -mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto h-64 relative">
            <div ref={envelopeContainerRef} className="w-full h-full">
              <EnvelopeModel />
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="bg-[#1a2b21]/90 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-[#c2c8c4] mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-[#273b2e] border border-[#2a9d8f]/30 rounded-md p-3 text-white"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-[#c2c8c4] mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-[#273b2e] border border-[#2a9d8f]/30 rounded-md p-3 text-white"
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-[#c2c8c4] mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="w-full bg-[#273b2e] border border-[#2a9d8f]/30 rounded-md p-3 text-white"
                    placeholder="Tell us about your project or idea"
                    required
                  ></textarea>
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="bg-[#2a9d8f] text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-all"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div ref={infoSectionsRef} className="space-y-8">
              <div className="bg-[#1a2b21]/80 p-6 rounded-lg shadow-md relative overflow-hidden contact-card">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#2a9d8f]">
                    <path fill="currentColor" d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">Our Location</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#2a9d8f] rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    </div>
                    <div className="location-info">
                      <h4 className="font-medium text-white">Virtual Office</h4>
                      <p className="text-[#c2c8c4]">We operate digitally from across the globe,<br />connecting talent without boundaries.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1a2b21]/80 p-6 rounded-lg shadow-md relative overflow-hidden contact-card">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#2a9d8f]">
                    <path fill="currentColor" d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#2a9d8f] rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="contact-info">
                      <h4 className="font-medium text-white">Email</h4>
                      <p className="text-[#c2c8c4]">principal@yuccamedia.io</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#2a9d8f] rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="contact-info">
                      <h4 className="font-medium text-white">Phone</h4>
                      <p className="text-[#c2c8c4]">+1 (323) 401-4248</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
