import React, { useEffect, useRef } from 'react';
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  BufferGeometry, 
  PointsMaterial, 
  Points, 
  AdditiveBlending,
  Float32BufferAttribute,
  Color
} from 'three';

/**
 * HeroBackground3D - A subtle 3D particle field background
 */
const HeroBackground3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get parent dimensions
    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2 & 3. Geometry and particles
    const particleCount = 400;
    const geometry = new BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // x(-15 to 15), y(-8 to 8), z(-5 to 5)
      const x = (Math.random() - 0.5) * 30; 
      const y = (Math.random() - 0.5) * 16; 
      const z = (Math.random() - 0.5) * 10; 

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

    // 4 & 9. Material setup with dark mode
    const isDark = document.documentElement.classList.contains('dark');
    const material = new PointsMaterial({
      size: 0.08,
      color: isDark ? new Color('#22d3ee') : new Color('#0ea5e9'),
      transparent: true,
      opacity: isDark ? 0.5 : 0.6,
      blending: AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const particles = new Points(geometry, material);
    scene.add(particles);

    // Watch for dark mode changes
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark');
      material.color.set(dark ? '#22d3ee' : '#0ea5e9');
      material.opacity = dark ? 0.5 : 0.6;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // 6. Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8. Responsive resize
    const handleResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 5. Animation loop
    let animationFrameId;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      const positionsAttr = geometry.attributes.position;
      
      for (let i = 0; i < particleCount; i++) {
        let x = positionsAttr.getX(i);
        let y = positionsAttr.getY(i);
        let z = initialPositions[i * 3 + 2];

        // Drift upward and right
        x += 0.01;
        y += 0.01;

        // Wrap around
        if (x > 15) x = -15;
        if (y > 8) y = -8;

        // Sine wave oscillation on z
        const phase = phases[i];
        const newZ = z + Math.sin(time + phase) * 0.5;

        positionsAttr.setXYZ(i, x, y, newZ);
      }
      positionsAttr.needsUpdate = true;

      // Mouse parallax - tilt camera max ±5 degrees (~0.087 radians)
      targetX = mouseX * 0.087;
      targetY = mouseY * 0.087;

      camera.rotation.y += (targetX - camera.rotation.y) * 0.05;
      camera.rotation.x += (targetY - camera.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 0, 
          opacity: 0.4,
          width: '100%',
          height: '100%',
          display: 'block'
        }} 
      />
    </div>
  );
};

export default HeroBackground3D;
