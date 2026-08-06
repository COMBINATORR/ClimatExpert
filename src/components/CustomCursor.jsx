import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor Component
 * Renders a custom cursor with a dot and ring using GSAP for smooth animations.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Check for touch devices
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouchDevice || !dotRef.current || !ringRef.current) return;

    // Initial setup to center transform origin and hide off-screen
    gsap.set([dotRef.current, ringRef.current], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
    });

    // Create quickTo instances for performance
    const xDot = gsap.quickTo(dotRef.current, 'x', { duration: 0, ease: 'none' });
    const yDot = gsap.quickTo(dotRef.current, 'y', { duration: 0, ease: 'none' });
    const xRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.15, ease: 'power3.out' });
    const yRing = gsap.quickTo(ringRef.current, 'y', { duration: 0.15, ease: 'power3.out' });

    let isVisible = false;

    const handleMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    // Event delegation for hover states
    const handleMouseOver = (e) => {
      const target = e.target;
      const isPointer = target.closest('button, a, input, select, textarea, [data-cursor="pointer"]');
      const isText = target.closest('[data-cursor="text"]');

      if (isPointer) {
        gsap.to(ringRef.current, {
          scale: 1.5,
          borderColor: '#06b6d4', // brand cyan
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dotRef.current, {
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else if (isText) {
        gsap.to(ringRef.current, {
          scaleX: 0.1,
          scaleY: 2,
          borderRadius: '4px',
          borderColor: '#06b6d4',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dotRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(ringRef.current, {
          scaleX: 1,
          scaleY: 1,
          scale: 1,
          borderRadius: '50%',
          borderColor: 'rgba(14, 165, 233, 0.5)',
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(dotRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeaveWindow = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [isTouchDevice]);

  // Completely hide on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1.5px solid rgba(14, 165, 233, 0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          boxSizing: 'border-box',
          opacity: 0,
          transformOrigin: 'center',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#0ea5e9', // sky-500
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          mixBlendMode: 'difference',
          opacity: 0,
          transformOrigin: 'center',
        }}
      />
    </>
  );
};

export default CustomCursor;
