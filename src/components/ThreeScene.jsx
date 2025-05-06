import React, { useEffect, useRef, useState } from 'react';
import AnimationManager from '../services/AnimationManager';

/**
 * ThreeScene Component
 * 
 * A React component that renders a Three.js scene with service models.
 * Uses the AnimationManager service for initialization and animation.
 */
const ThreeScene = ({ activeService = null }) => {
  const containerRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const cleanupRef = useRef(null);
  
  // Define event handlers at component level so they're available in cleanup
  const handleServiceCardHover = (e) => {
    const serviceCard = e.target.closest('.service-card-container');
    if (serviceCard) {
      const serviceType = serviceCard.dataset.service;
      setCurrentService(serviceType);
    }
  };
  
  const handleServiceCardLeave = () => {
    setCurrentService(null);
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if already initialized to prevent duplicate scenes
    if (isInitialized) return;
    
    console.log('🔄 Initializing ThreeScene component');
    
    // Add a slight delay to ensure DOM is fully ready
    setTimeout(() => {
      console.log('🎯 ThreeScene: Starting delayed initialization');
      
      // Initialize AnimationManager if not already initialized
      AnimationManager.init();
      
      // Initialize Three.js scene
      const threeJsInstance = AnimationManager.initThreeJs(containerRef.current, {
        cameraZ: 10,
        backgroundColor: 0x1a2b21,
        backgroundAlpha: 0.3,
      });
      
      if (threeJsInstance) {
        // Create service models
        AnimationManager.createServiceModels();
        
        // Store cleanup function
        cleanupRef.current = threeJsInstance.cleanup;
        
        // Set initialized state
        setIsInitialized(true);
        
        console.log('ThreeScene initialization complete');
      }
      
      // Add event listeners to service cards
      setTimeout(() => {
        const serviceCards = document.querySelectorAll('.service-card-container');
        serviceCards.forEach(card => {
          card.addEventListener('mouseenter', handleServiceCardHover);
          card.addEventListener('mouseleave', handleServiceCardLeave);
        });
      }, 500);
    }, 300); // 300ms delay for DOM to be ready
    
    // Cleanup function
    return () => {
      // Remove event listeners
      const serviceCards = document.querySelectorAll('.service-card-container');
      serviceCards.forEach(card => {
        card.removeEventListener('mouseenter', handleServiceCardHover);
        card.removeEventListener('mouseleave', handleServiceCardLeave);
      });
      
      // Run animation manager cleanup
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      
      setIsInitialized(false);
    };
  }, []);

  // Handle active service changes
  useEffect(() => {
    // Use prop value if provided, otherwise use internal state
    const serviceToHighlight = activeService || currentService;
    
    if (serviceToHighlight) {
      AnimationManager.setActiveService(serviceToHighlight);
    } else {
      AnimationManager.setActiveService(null);
    }
  }, [activeService, currentService]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[-1]"
      data-testid="three-scene-container"
      aria-hidden="true"
    />
  );
};

export default ThreeScene;
