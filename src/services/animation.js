/**
 * Animation services for the Yuca Media website
 * This module handles GSAP setup, ScrollTrigger registration, and animation utilities
 */

// Import from our central GSAP configuration to ensure plugins are registered
import { gsap, ScrollTrigger, ensureScrollTriggerRegistered } from './gsap-config';
import { debugGSAP } from './debugging';

// Initialize and register GSAP plugins
let gsapInitialized = false;

/**
 * Initialize GSAP and register plugins
 * This should be called once at application startup
 */
export const initializeGSAP = () => {
  if (gsapInitialized) return true;
  
  try {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.error('❌ GSAP not found. Make sure it is imported correctly.');
      return false;
    }
    
    // Ensure ScrollTrigger is registered using our utility function
    const scrollTriggerRegistered = ensureScrollTriggerRegistered();
    
    if (scrollTriggerRegistered) {
      // Verify registration was successful
      if (gsap.plugins && gsap.plugins.scrollTrigger) {
        console.log('✅ ScrollTrigger successfully registered with GSAP');
      } else {
        // This should not happen since ensureScrollTriggerRegistered should have caught it
        console.warn('⚠️ ScrollTrigger registration verification failed');
        
        // Try one more time with a direct registration
        try {
          gsap.registerPlugin(ScrollTrigger);
          console.log('🔄 ScrollTrigger re-registered directly');
        } catch (innerError) {
          console.error('❌ Direct ScrollTrigger registration failed:', innerError);
        }
      }
    }
    
    gsapInitialized = true;
    return true;
  } catch (error) {
    console.error('❌ Error initializing GSAP:', error);
    return false;
  }
};

/**
 * Create a fade-in animation
 * 
 * @param {Element|String} target Element or selector to animate
 * @param {Object} options Animation options
 * @returns {gsap.core.Tween} GSAP animation instance
 */
export const fadeIn = (target, options = {}) => {
  if (!gsapInitialized) initializeGSAP();
  
  const defaults = {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0,
    stagger: 0.1,
    ease: 'power2.out'
  };
  
  // Extract debug option and remove it from GSAP animation config
  const { debug, ...animationOptions } = { ...defaults, ...options };
  const animation = gsap.from(target, animationOptions);
  
  if (debug) {
    debugGSAP('fadeIn', animation);
  }
  
  return animation;
};

/**
 * Create a scroll-triggered animation
 * 
 * @param {Element|String} target Element or selector to animate
 * @param {Object} animationOptions Animation options
 * @param {Object} triggerOptions ScrollTrigger options
 * @returns {gsap.core.Tween} GSAP animation instance
 */
export const createScrollAnimation = (target, animationOptions = {}, triggerOptions = {}) => {
  // Ensure GSAP is initialized first
  initializeGSAP();
  
  try {
    // Force register ScrollTrigger to ensure it's available (redundant safety check)
    ensureScrollTriggerRegistered();
    
    // Check if ScrollTrigger is now properly registered
    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      console.warn('⚠️ ScrollTrigger plugin not detected despite registration attempts! Using fallback animation');
      return fadeIn(target, animationOptions);
    }
    
    const defaults = {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    };
    
    const triggerDefaults = {
      trigger: target,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    };
    
    // Extract debug option and remove it from GSAP animation config
    const { debug, ...cleanAnimationOptions } = { ...defaults, ...animationOptions };
    const triggerConfig = { ...triggerDefaults, ...triggerOptions };
    
    // Verify the target exists in the DOM before creating the animation
    if (typeof target === 'string' && !document.querySelector(target) && !document.querySelectorAll(target).length) {
      console.warn(`⚠️ Target "${target}" not found in DOM for scroll animation`);
    }
    
    // Create the animation with ScrollTrigger
    const config = { ...cleanAnimationOptions, scrollTrigger: triggerConfig };
    
    // Debug the configuration before creating the animation
    if (debug) {
      console.log('🔍 ScrollTrigger animation config:', config);
    }
    
    // Create the animation
    const animation = gsap.from(target, config);
    
    if (debug) {
      debugGSAP('scrollAnimation', animation);
    }
    
    return animation;
  } catch (error) {
    console.error('❌ Error creating scroll animation:', error);
    console.error('Error details:', error.message);
    // Fallback to a non-scroll animation
    console.log('🔄 Using fallback animation without ScrollTrigger');
    return fadeIn(target, animationOptions);
  }
};

/**
 * Clear all ScrollTrigger instances
 * Call this when unmounting components or navigating away
 */
export const clearScrollTriggers = () => {
  if (typeof ScrollTrigger !== 'undefined' && typeof ScrollTrigger.getAll === 'function') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
};

/**
 * Create a staggered animation for a list of elements
 * 
 * @param {NodeList|Array|String} elements Elements to animate
 * @param {Object} options Animation options
 * @returns {gsap.core.Timeline} GSAP timeline instance
 */
export const staggerAnimation = (elements, options = {}) => {
  if (!gsapInitialized) initializeGSAP();
  
  const defaults = {
    from: {
      opacity: 0,
      y: 20
    },
    stagger: 0.1,
    duration: 0.5,
    delay: 0,
    scrollTrigger: null
  };
  
  // Extract debug option
  const { debug, ...cleanOptions } = { ...defaults, ...options };
  const config = cleanOptions;
  const tl = gsap.timeline({ 
    delay: config.delay,
    scrollTrigger: config.scrollTrigger
  });
  
  tl.from(elements, { 
    ...config.from, 
    duration: config.duration, 
    stagger: config.stagger 
  });
  
  if (debug) {
    debugGSAP('staggerAnimation', tl);
  }
  
  return tl;
};

export default {
  initializeGSAP,
  fadeIn,
  createScrollAnimation,
  clearScrollTriggers,
  staggerAnimation
};
