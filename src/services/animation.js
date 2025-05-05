/**
 * Animation services for the Yuca Media website
 * This module handles GSAP setup, ScrollTrigger registration, and animation utilities
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    
    // Register ScrollTrigger plugin if it's not already registered
    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      if (typeof ScrollTrigger === 'undefined') {
        console.error('❌ ScrollTrigger plugin not found. Make sure it is imported correctly.');
      } else {
        gsap.registerPlugin(ScrollTrigger);
        console.log('✅ ScrollTrigger successfully registered with GSAP');
      }
    } else {
      console.log('✅ ScrollTrigger already registered with GSAP');
    }
    
    // Set GSAP defaults
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.8,
      overwrite: 'auto'
    });
    
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
  
  // Double-check ScrollTrigger is available
  // Import ScrollTrigger if it's not already registered
  try {
    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        console.log('📌 Late registration of ScrollTrigger successful');
      } else {
        console.error('ScrollTrigger is not registered! Using fallback animation without scroll trigger');
        return fadeIn(target, animationOptions);
      }
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
    
    // Create the animation with ScrollTrigger
    const config = { ...cleanAnimationOptions, scrollTrigger: triggerConfig };
    const animation = gsap.from(target, config);
    
    if (debug) {
      debugGSAP('scrollAnimation', animation);
    }
    
    return animation;
  } catch (error) {
    console.error('Error creating scroll animation:', error);
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
