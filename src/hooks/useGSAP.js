import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {Object} LenisOptions
 * @property {number} [duration]
 * @property {Function} [easing]
 * @property {string} [orientation]
 * @property {string} [gestureOrientation]
 * @property {boolean} [smoothWheel]
 * @property {number} [wheelMultiplier]
 * @property {number} [touchMultiplier]
 */

/**
 * Custom hook to initialize and manage Lenis smooth scrolling with GSAP ScrollTrigger sync.
 * 
 * @param {LenisOptions} options - Configuration options for Lenis
 * @returns {React.MutableRefObject<Lenis | null>} A ref containing the Lenis instance
 */
const useGSAP = (options = {}) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Default Lenis configuration
    const defaultOptions = {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    };

    // Initialize Lenis
    const lenis = new Lenis({ ...defaultOptions, ...options });
    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, []); // Run only on mount and unmount

  return lenisRef;
};

export default useGSAP;
