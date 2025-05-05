import React, { useEffect, useRef, useState } from 'react';
import { initThreeJSScene, createServiceModels, highlightServiceModel } from '../services/three';
import { debugThreeJS } from '../services/debugging';

const ThreeScene = ({ activeService = null }) => {
  // Debug mode defaults to false
  const debug = false;
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [currentService, setCurrentService] = useState(null);

  // Initialize the scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const sceneContainer = containerRef.current;
    const threeJSScene = initThreeJSScene(sceneContainer, {
      debug: debug,
      backgroundColor: 0x1a2b21,
      backgroundAlpha: 0.3,
      cameraPosition: { x: 0, y: 0, z: 5 }
    });

    // Create service-specific 3D models
    createServiceModels(threeJSScene.scene);

    // Set scene reference for animations
    sceneRef.current = threeJSScene;

    // Setup debug tools if needed
    if (debug && sceneRef.current) {
      debugThreeJS(sceneRef.current.scene, sceneRef.current.camera, {
        showAxes: true,
        showGrid: true
      });
    }

    // Setup service card hover interaction
    const handleServiceCardHover = (e) => {
      const serviceCard = e.target.closest('.service-card-container');
      if (serviceCard) {
        const serviceType = serviceCard.dataset.service;
        setCurrentService(serviceType);
      }
    };
    
    const handleServiceCardLeave = () => {
      setCurrentService(null); // Reset to default
    };
    
    // Add event listeners to service cards
    const serviceCards = document.querySelectorAll('.service-card-container');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', handleServiceCardHover);
      card.addEventListener('mouseleave', handleServiceCardLeave);
    });

    // Clean up
    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup();
        sceneRef.current = null;
      }
      
      // Remove event listeners
      serviceCards.forEach(card => {
        card.removeEventListener('mouseenter', handleServiceCardHover);
        card.removeEventListener('mouseleave', handleServiceCardLeave);
      });
    };
  }, [debug]);

  // Handle active service changes from props or internal state
  useEffect(() => {
    const serviceToHighlight = activeService || currentService;
    
    if (sceneRef.current && sceneRef.current.scene) {
      highlightServiceModel(sceneRef.current.scene, serviceToHighlight);
    }
  }, [activeService, currentService]);

  // Animation loop
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Add animation - rotate all group objects
    const animate = () => {
      if (!sceneRef.current) return;
      
      // Rotate all group objects with different speeds based on service type
      sceneRef.current.scene.children.forEach(child => {
        if (child.type === 'Group') {
          // Base rotation
          child.rotation.y += 0.003;
          child.rotation.x += 0.001;
          
          // If this model corresponds to the active service, rotate faster
          if (child.userData && child.userData.serviceType === (activeService || currentService)) {
            child.rotation.y += 0.002;
          }
        }
      });
    };

    // Add animate function to animation loop
    const animationId = setInterval(animate, 16); // ~60fps

    // Clean up
    return () => {
      clearInterval(animationId);
    };
  }, [activeService, currentService]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[-1]"
      data-testid="three-scene-container"
    />
  );
};

export default ThreeScene;
