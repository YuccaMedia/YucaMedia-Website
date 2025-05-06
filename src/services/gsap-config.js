/**
 * GSAP Configuration Module
 * 
 * This file imports and configures GSAP and all its plugins
 * to ensure they're properly registered before any components use them.
 */

// Import GSAP core and plugins
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Forcefully register all required plugins immediately
try {
  gsap.registerPlugin(ScrollTrigger);
  console.log('📌 ScrollTrigger registered at the module level in gsap-config');
} catch (error) {
  console.error('🚨 Error registering ScrollTrigger at the module level:', error);
}

// Set GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
  overwrite: 'auto'
});

// Export configured GSAP instance and ScrollTrigger
export { gsap, ScrollTrigger };

/**
 * Utility function to ensure ScrollTrigger is registered
 * @returns {boolean} true if successful, false otherwise
 */
export const ensureScrollTriggerRegistered = () => {
  try {
    // Force registration again to be absolutely certain
    gsap.registerPlugin(ScrollTrigger);
    
    // Verify registration was successful by checking the plugins object
    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      console.warn('⚠️ ScrollTrigger not detected in gsap.plugins after registration attempt');
      
      // Try one more approach - direct property check
      if (typeof ScrollTrigger === 'undefined') {
        console.error('🚨 ScrollTrigger is undefined!');
        return false;
      }
      
      console.log('� Attempting alternative ScrollTrigger registration...');
      // Try explicit assignment
      if (!gsap.plugins) {
        gsap.plugins = {};
      }
      gsap.plugins.scrollTrigger = ScrollTrigger;
      
      return true;
    }
    
    console.log('✅ ScrollTrigger successfully verified in gsap.plugins');
    return true;
  } catch (error) {
    console.error('🚨 Failed to register ScrollTrigger:', error);
    return false;
  }
};

export default {
  gsap,
  ScrollTrigger,
  ensureScrollTriggerRegistered
};
