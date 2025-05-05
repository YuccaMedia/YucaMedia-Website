import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createParticleSystem } from '../services/three';
import { debugLog } from '../services/debugging';

const ParticleSystem = ({ count = 100, activeService = null }) => {
  const containerRef = useRef(null);
  const particleSystemRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const isInitializedRef = useRef(false);
  
  // Create particles initially with more variation
  useEffect(() => {
    if (!containerRef.current || isInitializedRef.current) return;
    
    // Initialize particle system with enhanced configuration
    const particleSystem = createParticleSystem();
    particleSystemRef.current = particleSystem;
    
    // Create multiple types of particles
    const createdParticles = [];
    
    // Standard round particles
    const standardParticles = particleSystem.createParticles(containerRef.current, Math.floor(count * 0.7));
    if (standardParticles && standardParticles.length) {
      createdParticles.push(...standardParticles);
    }
    
    // Hexagon shaped particles (for blockchain theme)
    const hexParticles = particleSystem.createParticles(containerRef.current, Math.floor(count * 0.3), {
      className: 'particle hexagon',
      sizeRange: [3, 7], // Slightly larger
      opacityRange: [0.05, 0.2]
    });
    
    if (hexParticles && hexParticles.length) {
      createdParticles.push(...hexParticles);
    }
    
    setParticles(createdParticles);
    isInitializedRef.current = true;
    
    // Add ambient glow to container
    addAmbientGlow(containerRef.current);
    
    // Setup service card hover interaction with improved behavior
    const handleServiceCardHover = (e) => {
      const serviceCard = e.target.closest('.service-card-container');
      if (serviceCard) {
        const serviceType = serviceCard.dataset.service;
        updateParticleColors(serviceType, true); // true = with animation
      }
    };
    
    const handleServiceCardLeave = () => {
      updateParticleColors(null); // Reset to default
    };
    
    // Add event listeners to service cards with a delay to ensure DOM is ready
    setTimeout(() => {
      const serviceCards = document.querySelectorAll('.service-card-container');
      serviceCards.forEach(card => {
        card.addEventListener('mouseenter', handleServiceCardHover);
        card.addEventListener('mouseleave', handleServiceCardLeave);
      });
    }, 500);
    
    // Add parallax effect to particles
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.cleanup();
        particleSystemRef.current = null;
      }
      
      // Remove ambient glow
      const glowElement = document.getElementById('ambient-glow');
      if (glowElement) {
        glowElement.remove();
      }
      
      // Remove event listeners
      const serviceCards = document.querySelectorAll('.service-card-container');
      serviceCards.forEach(card => {
        card.removeEventListener('mouseenter', handleServiceCardHover);
        card.removeEventListener('mouseleave', handleServiceCardLeave);
      });
      
      window.removeEventListener('mousemove', handleMouseMove);
      isInitializedRef.current = false;
    };
  }, [count]);
  
  // Add ambient glow to container
  const addAmbientGlow = (container) => {
    const glowElement = document.createElement('div');
    glowElement.id = 'ambient-glow';
    glowElement.style.position = 'absolute';
    glowElement.style.inset = '0';
    glowElement.style.background = 'radial-gradient(circle at 50% 50%, rgba(42, 157, 143, 0.05) 0%, transparent 70%)';
    glowElement.style.pointerEvents = 'none';
    glowElement.style.zIndex = '-2';
    
    container.appendChild(glowElement);
  };
  
  // Handle mouse parallax effect
  const handleMouseMove = (e) => {
    if (!particles.length) return;
    
    const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
    
    // Apply different parallax amounts to create depth
    particles.forEach((particle, index) => {
      const depth = parseFloat(particle.style.width) / 10; // Use size as depth indicator
      const parallaxAmount = 0.2 + (depth * 0.3); // Larger particles move more
      
      // Every 3rd particle moves in opposite direction for more natural feel
      const direction = index % 3 === 0 ? -1 : 1;
      
      particle.style.transform = `translate(${moveX * parallaxAmount * direction}px, ${moveY * parallaxAmount * direction}px)`;
    });
  };
  
  // Handle active service changes
  useEffect(() => {
    updateParticleColors(activeService);
  }, [activeService]);
  
  // Update particle colors based on service type with enhanced effects
  const updateParticleColors = (serviceType, withAnimation = false) => {
    if (!particles.length) return;
    
    // Update ambient glow color based on service
    const glowElement = document.getElementById('ambient-glow');
    if (glowElement) {
      let glowColor = 'rgba(42, 157, 143, 0.05)'; // Default/blockchain
      
      if (serviceType === 'webdev') {
        glowColor = 'rgba(67, 97, 238, 0.05)';
      } else if (serviceType === 'creative') {
        glowColor = 'rgba(114, 9, 183, 0.05)';
      } else if (serviceType === 'consulting') {
        glowColor = 'rgba(231, 111, 81, 0.05)';
      }
      
      glowElement.style.background = `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`;
    }
    
    // Process each particle with staggered animation
    particles.forEach((particle, index) => {
      // Remove all service type classes
      particle.classList.remove('blockchain', 'webdev', 'creative', 'consulting');
      
      // Add the new service type class if specified
      if (serviceType) {
        particle.classList.add(serviceType);
        
        // Add enhanced animation with staggering for smoother visual effect
        if (withAnimation) {
          const delay = index % 10 * 50; // Stagger by groups of 10 particles
          
          // Initial state
          particle.style.transition = 'none';
          particle.style.opacity = '0';
          
          // Animate in with delay
          setTimeout(() => {
            particle.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            particle.style.opacity = '1';
            particle.style.transform = 'scale(1.2)';
            
            // Return to normal scale
            setTimeout(() => {
              particle.style.transform = 'scale(1)';
            }, 300);
          }, delay);
        }
      }
    });
  };
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]"
      data-testid="particle-system-container"
    />
  );
};

export default ParticleSystem;
