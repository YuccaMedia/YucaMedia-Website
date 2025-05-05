/**
 * GSAP Configuration Module
 * 
 * This file imports and configures GSAP and all its plugins
 * to ensure they're properly registered before any components use them.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register all required plugins
gsap.registerPlugin(ScrollTrigger);

// Set GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
  overwrite: 'auto'
});

// Export configured GSAP instance
export { gsap, ScrollTrigger };

/**
 * Utility function to ensure ScrollTrigger is registered
 * @returns {boolean} true if successful, false otherwise
 */
export const ensureScrollTriggerRegistered = () => {
  try {
    if (!gsap.plugins || !gsap.plugins.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      console.log('📌 ScrollTrigger registered in gsap-config');
      return true;
    }
    return true;
  } catch (error) {
    console.error('Failed to register ScrollTrigger:', error);
    return false;
  }
};

export default {
  gsap,
  ScrollTrigger,
  ensureScrollTriggerRegistered
};
