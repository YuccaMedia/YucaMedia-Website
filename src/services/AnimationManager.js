/**
 * Animation Manager Service
 * 
 * A singleton service that coordinates all animations across the application.
 * Handles synchronization between Three.js and GSAP/ScrollTrigger.
 * Lives outside React's lifecycle to prevent initialization/cleanup issues.
 */

import * as THREE from 'three';
import { gsap, ScrollTrigger, forceScrollTriggerRegistration } from '../lib/gsap';

// Particle colors for each service type
const PARTICLE_COLORS = {
  blockchain: 0x2a9d8f,
  webdev: 0x4361ee,
  creative: 0x7209b7,
  consulting: 0xe76f51
};

// Animation Manager State
const state = {
  // Resource loading states
  initialized: false,
  gsapReady: false,
  scrollTriggerReady: false,
  threeJsReady: false,
  modelsCreated: false,
  
  // Scene references
  threeScene: null,
  threeCamera: null,
  threeRenderer: null,
  
  // Animation references
  animations: {},
  
  // Service-specific state
  activeService: null,
  
  // Particle systems
  particles: [],
  
  // Debug mode
  debug: true
};

/**
 * Debug logging
 */
function logDebug(message, data) {
  if (state.debug) {
    console.log(`%c[AnimationManager] ${message}`, 'color: #4361ee; font-weight: bold;', data || '');
  }
}

/**
 * Initialize the Animation Manager
 * This should be called as early as possible in the application
 */
export function initAnimationManager() {
  if (state.initialized) {
    logDebug('Animation Manager already initialized');
    return state;
  }
  
  logDebug('Initializing Animation Manager');
  
  // Add debug information
  console.log('🔍 Current state before initialization:', JSON.stringify({
    gsapReady: state.gsapReady,
    scrollTriggerReady: state.scrollTriggerReady,
    threeJsReady: state.threeJsReady,
    modelsCreated: state.modelsCreated,
    initialized: state.initialized
  }));
  
  // Initialize GSAP first
  initGSAP();
  
  // Set initialized flag
  state.initialized = true;
  
  // Return state for reference
  console.log('✅ Animation Manager initialized successfully');
  return state;
}

/**
 * Initialize GSAP and ScrollTrigger
 */
function initGSAP() {
  try {
    logDebug('Initializing GSAP');
    
    // Force ScrollTrigger registration
    forceScrollTriggerRegistration();
    
    // Set GSAP flags
    state.gsapReady = true;
    state.scrollTriggerReady = typeof ScrollTrigger === 'object' && 
                               typeof ScrollTrigger.create === 'function';
    
    logDebug('GSAP Initialization complete', {
      gsapReady: state.gsapReady,
      scrollTriggerReady: state.scrollTriggerReady
    });
  } catch (error) {
    console.error('Failed to initialize GSAP:', error);
    state.gsapReady = false;
    state.scrollTriggerReady = false;
  }
}

/**
 * Initialize Three.js scene
 * @param {HTMLElement} container - The container element for the renderer
 * @param {Object} options - Configuration options
 */
export function initThreeJs(container, options = {}) {
  if (!container) {
    logDebug('Cannot initialize Three.js: No container provided');
    return null;
  }
  
  try {
    logDebug('Initializing Three.js scene');
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.z = options.cameraZ || 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(options.backgroundColor || 0x1a2b21, options.backgroundAlpha || 0.3);
    
    // Clear container before adding renderer
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xc2c8c4, 0.7); // Increased ambient light
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Increased directional light
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Setup animation loop
    function animate() {
      if (!state.threeRenderer) return;
      
      requestAnimationFrame(animate);
      
      // Animate service models
      if (scene.children) {
        scene.children.forEach(child => {
          if (child.type === 'Group' && child.userData && child.userData.serviceType) {
            // Basic rotation
            child.rotation.y += 0.003;
            
            // Additional animations for active service
            if (child.userData.serviceType === state.activeService) {
              child.rotation.x += 0.001;
            }
          }
        });
      }
      
      // Render scene
      renderer.render(scene, camera);
    }
    
    // Start animation loop
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!state.threeCamera || !state.threeRenderer) return;
      
      state.threeCamera.aspect = window.innerWidth / window.innerHeight;
      state.threeCamera.updateProjectionMatrix();
      state.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Store references
    state.threeScene = scene;
    state.threeCamera = camera;
    state.threeRenderer = renderer;
    state.threeJsReady = true;
    
    // Add the resize handler to cleanup list
    const cleanup = () => {
      window.removeEventListener('resize', handleResize);
      
      // Dispose of scene resources
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      // Dispose of renderer
      if (renderer) {
        renderer.dispose();
      }
      
      // Remove renderer from DOM
      if (container && renderer && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Reset state
      state.threeScene = null;
      state.threeCamera = null;
      state.threeRenderer = null;
      state.threeJsReady = false;
      state.modelsCreated = false;
    };
    
    logDebug('Three.js initialization complete');
    
    return {
      scene,
      camera,
      renderer,
      cleanup
    };
  } catch (error) {
    console.error('Failed to initialize Three.js:', error);
    state.threeJsReady = false;
    return null;
  }
}

/**
 * Create service models and add them to the scene
 * @returns {boolean} Success status
 */
export function createServiceModels() {
  if (!state.threeScene || !state.threeJsReady) {
    logDebug('Cannot create service models: Three.js scene not ready');
    return false;
  }
  
  try {
    logDebug('Creating service models');
    
    // Create service models based on the code from services/three.js
    createBlockchainModel(state.threeScene);
    createWebDevModel(state.threeScene);
    createCreativeModel(state.threeScene);
    createConsultingModel(state.threeScene);
    
    // Set state flag
    state.modelsCreated = true;
    
    logDebug('Service models created successfully');
    return true;
  } catch (error) {
    console.error('Failed to create service models:', error);
    state.modelsCreated = false;
    return false;
  }
}

/**
 * Set the active service for highlighting
 * @param {string} serviceType - The service type to highlight
 */
export function setActiveService(serviceType) {
  state.activeService = serviceType;
  
  if (state.threeScene && state.modelsCreated) {
    highlightServiceModel(state.threeScene, serviceType);
  }
}

/**
 * Create a blockchain-themed 3D model
 */
function createBlockchainModel(scene) {
  const group = new THREE.Group();
  group.name = 'blockchain-model';
  group.userData = { serviceType: 'blockchain' };
  
  // Create a series of connected cubes representing blockchain
  const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const cubeMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x2a9d8f,
    transparent: true,
    opacity: 1.0,
    emissive: 0x2a9d8f,
    emissiveIntensity: 2.0, // Increased glow
    shininess: 80
  });
  
  // Create a chain of cubes
  for (let i = 0; i < 5; i++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = (i - 2) * 0.7;
    cube.position.y = Math.sin(i * 0.5) * 0.3;
    group.add(cube);
    
    // Add connecting lines
    if (i > 0) {
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2a9d8f });
      const points = [
        new THREE.Vector3((i - 3) * 0.7, Math.sin((i - 1) * 0.5) * 0.3, 0),
        new THREE.Vector3((i - 2) * 0.7, Math.sin(i * 0.5) * 0.3, 0)
      ];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      group.add(line);
    }
  }
  
  // Position the group - moved closer to camera
  group.position.set(-4, 4, -3);
  group.scale.set(1.5, 1.5, 1.5);
  
  scene.add(group);
}

/**
 * Create a web development themed 3D model
 */
function createWebDevModel(scene) {
  const group = new THREE.Group();
  group.name = 'webdev-model';
  group.userData = { serviceType: 'webdev' };
  
  // Create a stylized code bracket
  const bracketMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x4361ee,
    transparent: true,
    opacity: 1.0,
    emissive: 0x4361ee,
    emissiveIntensity: 2.0, // Increased glow
    shininess: 80
  });
  
  // Left bracket
  const leftBracketGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI);
  const leftBracket = new THREE.Mesh(leftBracketGeometry, bracketMaterial);
  leftBracket.rotation.z = Math.PI / 2;
  leftBracket.position.x = -0.5;
  group.add(leftBracket);
  
  // Right bracket
  const rightBracketGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI);
  const rightBracket = new THREE.Mesh(rightBracketGeometry, bracketMaterial);
  rightBracket.rotation.z = -Math.PI / 2;
  rightBracket.position.x = 0.5;
  group.add(rightBracket);
  
  // Add some "code lines"
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4361ee });
  
  for (let i = 0; i < 3; i++) {
    const points = [
      new THREE.Vector3(-0.3, 0.2 - (i * 0.2), 0),
      new THREE.Vector3(0.3, 0.2 - (i * 0.2), 0)
    ];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    group.add(line);
  }
  
  // Position the group - moved closer to camera
  group.position.set(4, 2, -3);
  group.scale.set(1.5, 1.5, 1.5);
  
  scene.add(group);
}

/**
 * Create a creative services themed 3D model
 */
function createCreativeModel(scene) {
  const group = new THREE.Group();
  group.name = 'creative-model';
  group.userData = { serviceType: 'creative' };
  
  // Create a stylized camera or paintbrush
  const baseMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x7209b7,
    transparent: true,
    opacity: 1.0,
    emissive: 0x7209b7,
    emissiveIntensity: 2.0, // Increased glow
    shininess: 80
  });
  
  // Camera body
  const cameraGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.4);
  const camera = new THREE.Mesh(cameraGeometry, baseMaterial);
  group.add(camera);
  
  // Camera lens
  const lensGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 32);
  const lens = new THREE.Mesh(lensGeometry, baseMaterial);
  lens.rotation.x = Math.PI / 2;
  lens.position.z = 0.35;
  group.add(lens);
  
  // Position the group - moved closer to camera
  group.position.set(-4, -3, -3);
  group.scale.set(1.5, 1.5, 1.5);
  
  scene.add(group);
}

/**
 * Create a consulting themed 3D model
 */
function createConsultingModel(scene) {
  const group = new THREE.Group();
  group.name = 'consulting-model';
  group.userData = { serviceType: 'consulting' };
  
  // Create a stylized chart or graph
  const chartMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xe76f51,
    transparent: true,
    opacity: 1.0,
    emissive: 0xe76f51,
    emissiveIntensity: 2.0, // Increased glow
    shininess: 80
  });
  
  // Base
  const baseGeometry = new THREE.BoxGeometry(1, 0.1, 0.5);
  const base = new THREE.Mesh(baseGeometry, chartMaterial);
  base.position.y = -0.45;
  group.add(base);
  
  // Bars for chart
  const heights = [0.3, 0.7, 0.5, 0.9];
  for (let i = 0; i < 4; i++) {
    const barGeometry = new THREE.BoxGeometry(0.15, heights[i], 0.15);
    const bar = new THREE.Mesh(barGeometry, chartMaterial);
    bar.position.x = -0.4 + (i * 0.25);
    bar.position.y = -0.45 + (heights[i] / 2);
    group.add(bar);
  }
  
  // Position the group - moved closer to camera
  group.position.set(4, -3, -3);
  group.scale.set(1.5, 1.5, 1.5);
  
  scene.add(group);
}

/**
 * Highlight a specific service model
 */
function highlightServiceModel(scene, serviceType) {
  if (!scene) return;
  
    // Default material properties
  const defaultProps = {
    opacity: 0.8,
    emissiveIntensity: 1.0, // Higher base emissive intensity
    scale: 1.5
  };
  
  // Highlighted material properties
  const highlightProps = {
    opacity: 1.0,
    emissiveIntensity: 2.5, // Increased glow for highlighted objects
    scale: 2.0
  };
  
  // Go through all models and reset or highlight as appropriate
  scene.children.forEach(child => {
    if (child.type === 'Group' && child.userData && child.userData.serviceType) {
      const isTargetModel = serviceType && child.userData.serviceType === serviceType;
      
      // Set opacity and emissive intensity for all meshes in the group
      child.traverse(object => {
        if (object.isMesh && object.material) {
          // Handle both single materials and arrays of materials
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          
          materials.forEach(material => {
            // Apply appropriate properties based on whether this is the highlighted model
            if (isTargetModel) {
              material.opacity = highlightProps.opacity;
              material.emissiveIntensity = highlightProps.emissiveIntensity;
            } else {
              material.opacity = defaultProps.opacity;
              material.emissiveIntensity = defaultProps.emissiveIntensity;
            }
          });
        }
      });
      
      // Animate scale for target model
      if (isTargetModel) {
        // If this is the target model, animate to highlighted scale
        const targetScale = highlightProps.scale;
        child.userData.isHighlighted = true;
        
        // Apply scale using GSAP if available
        if (state.gsapReady) {
          gsap.to(child.scale, {
            x: targetScale,
            y: targetScale,
            z: targetScale,
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          // Fallback to direct setting
          child.scale.set(targetScale, targetScale, targetScale);
        }
      } else {
        // If this is not the target model, animate back to default scale
        const targetScale = defaultProps.scale;
        child.userData.isHighlighted = false;
        
        // Apply scale using GSAP if available
        if (state.gsapReady) {
          gsap.to(child.scale, {
            x: targetScale,
            y: targetScale,
            z: targetScale,
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          // Fallback to direct setting
          child.scale.set(targetScale, targetScale, targetScale);
        }
      }
    }
  });
}

/**
 * Create scroll animations
 * @param {Element|NodeList} elements - The elements to animate
 * @param {Object} animationProps - The animation properties
 * @param {Object} triggerOptions - The ScrollTrigger options
 * @returns {Object|null} The animation and trigger or null if ScrollTrigger isn't available
 */
export function createScrollAnimation(elements, animationProps = {}, triggerOptions = {}) {
  if (!state.scrollTriggerReady) {
    logDebug('ScrollTrigger not available, applying fallback animation');
    
    // Apply fallback animation without ScrollTrigger
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: animationProps.stagger || 0.2,
      delay: 0.3,
      ...animationProps,
      scrollTrigger: undefined // Ensure no scrollTrigger
    });
    
    return null;
  }
  
  try {
    logDebug('Creating scroll animation with ScrollTrigger');
    
    // Create animation with explicit paused state
    const animation = gsap.from(elements, {
      ...animationProps,
      paused: true // Start in paused state
    });
    
    // Create ScrollTrigger separately
    const trigger = ScrollTrigger.create({
      trigger: triggerOptions.trigger || elements,
      start: triggerOptions.start || 'top 80%',
      end: triggerOptions.end || 'bottom 20%',
      toggleActions: triggerOptions.toggleActions || 'play none none reverse',
      markers: state.debug && triggerOptions.markers,
      animation: animation // Link to the animation
    });
    
    logDebug('Scroll animation created successfully');
    
    return { animation, trigger };
  } catch (error) {
    console.error('Failed to create scroll animation:', error);
    
    // Apply fallback animation without ScrollTrigger
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: animationProps.stagger || 0.2,
      delay: 0.3,
      ...animationProps,
      scrollTrigger: undefined // Ensure no scrollTrigger
    });
    
    return null;
  }
}

/**
 * Clean up all animations and resources
 */
export function cleanupAnimations() {
  logDebug('Cleaning up animations and resources');
  
  // Clean up ScrollTrigger instances
  if (state.scrollTriggerReady && typeof ScrollTrigger.getAll === 'function') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
  
  // Reset state
  state.animations = {};
}

/**
 * Get the current state of the Animation Manager
 */
export function getAnimationState() {
  return { ...state };
}

/**
 * Export the AnimationManager singleton
 */
export default {
  init: initAnimationManager,
  initThreeJs,
  createServiceModels,
  createScrollAnimation,
  setActiveService,
  cleanupAnimations,
  getState: getAnimationState
};
