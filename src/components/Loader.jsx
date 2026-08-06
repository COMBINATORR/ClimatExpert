import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Check if loader has already been shown in this session
    const isShown = sessionStorage.getItem('loaderShown');
    if (isShown) {
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('loaderShown', 'true');
          setIsVisible(false);
          if (onComplete) onComplete();
        }
      });

      const chars1 = text1Ref.current.children;
      const chars2 = text2Ref.current.children;
      
      // 3a. Logo letters appear one by one
      tl.from([...chars1, ...chars2], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out'
      })
      // 3b. Progress bar animates to 100%
      .to(progressRef.current, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
      })
      // 3c. Dismiss with clip-path animation
      // Animate to 0% to dismiss the overlay as a closing circle
      .to(containerRef.current, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (!isVisible) return null;

  const splitText = (text) => text.split('').map((char, i) => (
    <span key={i} style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0a0b0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        clipPath: 'circle(150% at 50% 50%)' // Start fully covering the screen
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          gap: '8px', 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          marginBottom: '20px' 
        }}
      >
        <div ref={text1Ref} style={{ display: 'flex' }}>
          {splitText('Климат')}
        </div>
        <div ref={text2Ref} style={{ display: 'flex', color: '#0ea5e9' }}>
          {splitText('Эксперт')}
        </div>
      </div>
      <div 
        style={{ 
          width: '200px', 
          height: '2px', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '2px', 
          overflow: 'hidden' 
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: '0%',
            height: '100%',
            background: 'linear-gradient(90deg, #0284c7, #06b6d4)' // sky-600 to cyan-500
          }}
        />
      </div>
    </div>
  );
}
