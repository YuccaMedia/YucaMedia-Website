import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import AnimationManager from '../services/AnimationManager';

/**
 * ParticleSystem Component
 * 
 * Creates a visual particle effect background that can change colors
 * based on the active service. Uses AnimationManager for state management.
 */
const ParticleSystem = ({ count = 50, activeService = null }) => {
  const containerRef = useRef(null);
  const [currentService, setCurrentService] = useState(null);
  const particlesRef = useRef([]);
  const styleTagRef = useRef(null);

  // Set up particles
  // Initialize animation styles
  useEffect(() => {
    console.log('🔄 ParticleSystem: Initializing styles');
    
    // Ensure AnimationManager is initialized
    AnimationManager.init();
    
    if (!containerRef.current) return;
    
    // Create particle styles if not already defined
    if (!styleTagRef.current) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.innerHTML = `
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(calc(var(--x-offset) * 1px)) rotate(360deg);
            opacity: 0;
          }
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        
        .particle.blockchain {
          background-color: rgba(42, 157, 143, 0.3) !important;
          box-shadow: 0 0 10px rgba(42, 157, 143, 0.5);
        }
        
        .particle.webdev {
          background-color: rgba(67, 97, 238, 0.3) !important;
          box-shadow: 0 0 10px rgba(67, 97, 238, 0.5);
        }
        
        .particle.creative {
          background-color: rgba(114, 9, 183, 0.3) !important;
          box-shadow: 0 0 10px rgba(114, 9, 183, 0.5);
        }
        
        .particle.consulting {
          background-color: rgba(231, 111, 81, 0.3) !important;
          box-shadow: 0 0 10px rgba(231, 111, 81, 0.5);
        }
      `;
      document.head.appendChild(style);
      styleTagRef.current = style;
    }
    
    // Clear existing particles
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    particlesRef.current = [];
    
    // Create new particles
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random styles
      const size = Math.random() * 5 + 1;
      const xOffset = Math.random() * 100 - 50;
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(194, 200, 196, ${Math.random() * 0.3 + 0.1})`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.setProperty('--x-offset', xOffset);
      particle.style.animation = `float ${duration}s linear infinite`;
      particle.style.animationDelay = `${delay}s`;
      
      containerRef.current.appendChild(particle);
      particlesRef.current.push(particle);
    }
    
    // Clean up
    return () => {
      // Remove particles
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      particlesRef.current = [];
      
      // Remove style
      if (styleTagRef.current && styleTagRef.current.parentNode) {
        styleTagRef.current.parentNode.removeChild(styleTagRef.current);
        styleTagRef.current = null;
      }
    };
  }, [count]);

  // Update particles when active service changes
  useEffect(() => {
    // Use prop value if provided, otherwise use internal state
    const serviceToHighlight = activeService || currentService;
    
    // Update particle classes
    particlesRef.current.forEach(particle => {
      // Remove all service type classes
      particle.classList.remove('blockchain', 'webdev', 'creative', 'consulting');
      
      // Add the new service type class if specified
      if (serviceToHighlight) {
        particle.classList.add(serviceToHighlight);
      }
    });
  }, [activeService, currentService]);

  return (
    <ErrorBoundary fallback={<div className="hidden">Particle system error</div>}>
      <div 
        ref={containerRef} 
        className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]"
        aria-hidden="true"
      />
    </ErrorBoundary>
  );
};

export default ParticleSystem;
