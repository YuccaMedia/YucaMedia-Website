/**
 * GSAP Helper Utility
 * 
 * This file provides utility functions to properly initialize GSAP and ScrollTrigger
 * to work around issues with registration in different environments.
 */

// First, import GSAP and ScrollTrigger directly
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Force registration at the module level
let isRegistered = false;
try {
  gsap.registerPlugin(ScrollTrigger);
  isRegistered = true;
  console.log('✅ ScrollTrigger registered in gsap-helper module');
} catch (error) {
  console.error('❌ Failed to register ScrollTrigger in gsap-helper module:', error);
}

/**
 * Ensures ScrollTrigger is properly registered and available with GSAP
 * Uses multiple fallback mechanisms to try to ensure it works
 * @returns {boolean} Whether ScrollTrigger is now available
 */
export function ensureScrollTriggerIsRegistered() {
  // First try direct registration
  try {
    gsap.registerPlugin(ScrollTrigger);
    console.log('✅ ScrollTrigger registered via direct call');
  } catch (error) {
    console.warn('⚠️ Error during direct ScrollTrigger registration:', error);
  }
  
  // Check if it worked by examining the plugins object
  const available = Boolean(gsap.plugins && (gsap.plugins.scrollTrigger || gsap.plugins.ScrollTrigger));
  
  // If not available, try more aggressive measures
  if (!available) {
    console.warn('⚠️ ScrollTrigger not found in gsap.plugins after registration attempt');
    
    // Create plugins object if it doesn't exist
    if (!gsap.plugins) {
      gsap.plugins = {};
    }
    
    // Force plugin assignment
    gsap.plugins.scrollTrigger = ScrollTrigger;
    
    // Also ensure core registration was called
    if (typeof ScrollTrigger.register === 'function') {
      try {
        ScrollTrigger.register(gsap);
        console.log('✅ ScrollTrigger registered via ScrollTrigger.register');
      } catch (error) {
        console.error('❌ Failed ScrollTrigger.register call:', error);
      }
    }
  }
  
  // Final verification
  const finalCheck = Boolean(gsap.plugins && (gsap.plugins.scrollTrigger || gsap.plugins.ScrollTrigger));
  if (finalCheck) {
    console.log('✅ Final verification confirms ScrollTrigger is available');
  } else {
    console.error('❌ ScrollTrigger still not available after all registration attempts');
  }
  
  return finalCheck;
}

/**
 * Create a simple animation that doesn't rely on ScrollTrigger
 * Use this as a fallback when ScrollTrigger isn't working
 * 
 * @param {Element|String} target Element to animate
 * @param {Object} options Animation options
 * @returns {gsap.core.Tween} GSAP animation
 */
export function createBasicAnimation(target, options = {}) {
  const defaults = {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out"
  };
  
  return gsap.from(target, { ...defaults, ...options });
}

/**
 * Create staggered animations that don't rely on ScrollTrigger
 * 
 * @param {Element|String} targets Elements to animate
 * @param {Object} options Animation options
 * @returns {gsap.core.Tween} GSAP animation
 */
export function createStaggeredAnimation(targets, options = {}) {
  const defaults = {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  };
  
  return gsap.from(targets, { ...defaults, ...options });
}

export default {
  gsap,
  ScrollTrigger,
  ensureScrollTriggerIsRegistered,
  createBasicAnimation,
  createStaggeredAnimation
};
