import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * @typedef {Object} MagneticOptions
 * @property {number} [strength=0.3] - The magnetic strength (multiplier for offset)
 * @property {number} [ease=0.15] - The duration of the movement animation
 */

/**
 * Custom hook to apply a magnetic interaction effect on a DOM element.
 * 
 * @param {React.RefObject<HTMLElement>} ref - Ref pointing to the target DOM element
 * @param {MagneticOptions} options - Configuration for the magnetic effect
 */
const useMagnetic = (ref, options = {}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Only activate on devices that support hover (non-touch devices)
    const isHoverable = window.matchMedia('(hover: hover)').matches;
    if (!isHoverable) return;

    const { strength = 0.3, ease = 0.15 } = options;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // Calculate distance from center of element
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      // Move element towards cursor
      gsap.to(element, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: ease,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      // Snap back to original position with elastic ease
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup event listeners and animations on unmount
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [ref, options.strength, options.ease]);
};

export default useMagnetic;
