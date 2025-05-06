import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { initThreeJSScene, createServiceModels, highlightServiceModel } from '../services/three';
import { debugThreeJS } from '../services/debugging';

const ThreeScene = ({ activeService = null }) => {
  // Debug mode defaults to false
  const debug = false;
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [currentService, setCurrentService] = useState(null);
  const isInitializedRef = useRef(false);

  // Initialize the scene
  useEffect(() => {
    if (!containerRef.current || isInitializedRef.current) return;

    // Initialize Three.js scene with enhanced settings
    const sceneContainer = containerRef.current;
    const threeJSScene = initThreeJSScene(sceneContainer, {
      debug: debug,
      backgroundColor: 0x1a2b21,
      backgroundAlpha: 0.3,
      cameraPosition: { x: 0, y: 0, z: 10 }, // Moved further back to see more of the scene
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    });

    // Add fog to create depth
    threeJSScene.scene.fog = new THREE.FogExp2(0x1a2b21, 0.035);

    // Create service-specific 3D models with proper positioning
    createServiceModels(threeJSScene.scene);
    
    // Store original positions and scales for service models for animation
    threeJSScene.scene.children.forEach(child => {
      if (child.type === 'Group' && child.name.includes('model')) {
        const serviceType = child.name.split('-')[0];
        child.userData = {
          ...child.userData,
          originalY: child.position.y,
          originalScale: child.scale.x,
          serviceType: serviceType
        };
        
        console.log(`Service model created: ${child.name} at position ${JSON.stringify(child.position)}`);
      }
    });

    // Add some ambient particles to scene
    addAmbientParticles(threeJSScene.scene);

    // Set scene reference for animations
    sceneRef.current = threeJSScene;
    isInitializedRef.current = true;

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
    
    // Add event listeners to service cards with a slight delay to ensure DOM is ready
    setTimeout(() => {
      const serviceCards = document.querySelectorAll('.service-card-container');
      serviceCards.forEach(card => {
        card.addEventListener('mouseenter', handleServiceCardHover);
        card.addEventListener('mouseleave', handleServiceCardLeave);
      });
    }, 500);

    // Clean up
    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup();
        sceneRef.current = null;
        isInitializedRef.current = false;
      }
      
      // Remove event listeners
      const serviceCards = document.querySelectorAll('.service-card-container');
      serviceCards.forEach(card => {
        card.removeEventListener('mouseenter', handleServiceCardHover);
        card.removeEventListener('mouseleave', handleServiceCardLeave);
      });
    };
  }, [debug]);

  // Add ambient particles to scene
  const addAmbientParticles = (scene) => {
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      // Distribute particles in a sphere
      const radius = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Store reference in scene for animation
    scene.userData.ambientParticles = particles;
  };

  // Handle active service changes from props or internal state
  useEffect(() => {
    const serviceToHighlight = activeService || currentService;
    
    if (sceneRef.current && sceneRef.current.scene) {
      highlightServiceModel(sceneRef.current.scene, serviceToHighlight);
    }
  }, [activeService, currentService]);

  // Enhanced animation loop with more sophisticated effects
  useEffect(() => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current.scene;
    const clock = new THREE.Clock();
    
    // Add animation - rotate all group objects with more dynamic movement
    const animate = () => {
      if (!sceneRef.current) return;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate all group objects with different speeds and oscillations
      scene.children.forEach(child => {
        if (child.type === 'Group' && child.name.includes('model')) {
          // Extract service type from name
          const serviceType = child.name.split('-')[0];
          
          // Base rotation with oscillation
          child.rotation.y += 0.003;
          child.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
          
          // Add subtle floating motion
          child.position.y = child.userData.originalY + Math.sin(elapsedTime * 0.5) * 0.3;
          
          // If this model corresponds to the active service, enhance animation
          if (serviceType === (activeService || currentService)) {
            child.rotation.y += 0.002;
            // Pulse scale for highlighted service
            const scalePulse = 1 + Math.sin(elapsedTime * 2) * 0.05;
            child.scale.set(
              child.userData.originalScale * scalePulse,
              child.userData.originalScale * scalePulse,
              child.userData.originalScale * scalePulse
            );
          } else {
            // Reset scale for non-highlighted services
            child.scale.set(
              child.userData.originalScale,
              child.userData.originalScale,
              child.userData.originalScale
            );
          }
        }
      });
      
      // Animate ambient particles
      if (scene.userData.ambientParticles) {
        const particles = scene.userData.ambientParticles;
        // Rotate particles slowly
        particles.rotation.y = elapsedTime * 0.05;
        // Subtle pulsing
        const sizes = particles.geometry.attributes.size;
        for (let i = 0; i < sizes.count; i++) {
          sizes.array[i] = (Math.sin(elapsedTime + i) * 0.2 + 1) * (Math.random() * 0.5 + 0.5);
        }
        sizes.needsUpdate = true;
      }
    };

    // Add animate function to animation loop
    const animationId = setInterval(animate, 16); // ~60fps

    // Store original positions and scales for service models
    scene.children.forEach(child => {
      if (child.type === 'Group' && child.name.includes('model')) {
        child.userData.originalY = child.position.y;
        child.userData.originalScale = child.scale.x; // Assuming uniform scale
      }
    });

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
