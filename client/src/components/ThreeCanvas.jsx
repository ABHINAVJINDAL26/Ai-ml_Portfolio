import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = ({ theme }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer = null;
    let geometry = null;
    let lineGeometry = null;
    let pointMaterial = null;
    let lineMaterial = null;
    let texture = null;
    let animationFrameId = null;
    let mouseMoveHandler = null;
    let resizeHandler = null;

    try {
      // 1. Scene & Setup
      const scene = new THREE.Scene();
      
      // Create soft fog in the scene to fade out distant nodes
      const isDark = theme === 'dark';
      const fogColor = isDark ? 0x030712 : 0xf8fafc;
      scene.fog = new THREE.FogExp2(fogColor, 0.015);

      // 2. Camera Setup
      const camera = new THREE.PerspectiveCamera(
        60,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 220;

      // 3. Renderer Setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);

      // 4. Create Particle Nodes & Connections
      const particleCount = 120;
      const maxConnectionDistance = 50;

      const positions = new Float32Array(particleCount * 3);
      const velocities = [];

      // Random distribution in a 3D box
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;
        const z = (Math.random() - 0.5) * 300;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        velocities.push({
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
          z: (Math.random() - 0.5) * 0.2,
        });
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Particle Texture / Style
      // Draw a neat circles canvas texture so particles aren't blocky squares
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      texture = new THREE.CanvasTexture(canvas);

      // Node Material Color based on theme
      const nodeColor = isDark ? 0x00ff88 : 0x0f766e;
      pointMaterial = new THREE.PointsMaterial({
        color: nodeColor,
        size: 4,
        transparent: true,
        opacity: 0.8,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const pointCloud = new THREE.Points(geometry, pointMaterial);
      scene.add(pointCloud);

      // Line Network Connections
      lineMaterial = new THREE.LineBasicMaterial({
        color: isDark ? 0x00e5ff : 0x2563eb,
        transparent: true,
        opacity: isDark ? 0.08 : 0.06,
        blending: THREE.AdditiveBlending,
      });

      lineGeometry = new THREE.BufferGeometry();
      const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineMesh);

      // 5. Interaction variables
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      mouseMoveHandler = (e) => {
        // Calculate normalized mouse positions from center
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
      };

      window.addEventListener('mousemove', mouseMoveHandler);

      // 6. Animation Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Interpolate for smooth parallax camera lag
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Rotate cloud slowly
        pointCloud.rotation.y += 0.0008;
        pointCloud.rotation.x += 0.0002;
        lineMesh.rotation.y = pointCloud.rotation.y;
        lineMesh.rotation.x = pointCloud.rotation.x;

        // Update particle positions
        const positionsArray = geometry.attributes.position.array;
        const connectedPairs = [];

        for (let i = 0; i < particleCount; i++) {
          // Move particles
          positionsArray[i * 3] += velocities[i].x;
          positionsArray[i * 3 + 1] += velocities[i].y;
          positionsArray[i * 3 + 2] += velocities[i].z;

          // Boundary bounce check
          if (Math.abs(positionsArray[i * 3]) > 150) velocities[i].x *= -1;
          if (Math.abs(positionsArray[i * 3 + 1]) > 150) velocities[i].y *= -1;
          if (Math.abs(positionsArray[i * 3 + 2]) > 150) velocities[i].z *= -1;
        }
        geometry.attributes.position.needsUpdate = true;

        // Calculate connections
        for (let i = 0; i < particleCount; i++) {
          const x1 = positionsArray[i * 3];
          const y1 = positionsArray[i * 3 + 1];
          const z1 = positionsArray[i * 3 + 2];

          for (let j = i + 1; j < particleCount; j++) {
            const x2 = positionsArray[j * 3];
            const y2 = positionsArray[j * 3 + 1];
            const z2 = positionsArray[j * 3 + 2];

            const dx = x1 - x2;
            const dy = y1 - y2;
            const dz = z1 - z2;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxConnectionDistance) {
              connectedPairs.push(x1, y1, z1);
              connectedPairs.push(x2, y2, z2);
            }
          }
        }

        lineGeometry.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(connectedPairs), 3)
        );

        renderer.render(scene, camera);
      };

      animate();

      // 7. Window Resize Handler
      resizeHandler = () => {
        if (!containerRef.current || !renderer) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', resizeHandler);

    } catch (error) {
      console.warn('[WebGL Warning] WebGLRenderer could not be initialized. Falling back to CSS static layouts.', error);
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div class="webgl-fallback-mesh" style="position:absolute; width:100%; height:100%; opacity:0.1; background-image: radial-gradient(var(--accent) 1px, transparent 0); background-size: 20px 20px;"></div>';
      }
    }

    // 8. Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler);
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      
      try {
        if (containerRef.current && renderer && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (geometry) geometry.dispose();
        if (lineGeometry) lineGeometry.dispose();
        if (pointMaterial) pointMaterial.dispose();
        if (lineMaterial) lineMaterial.dispose();
        if (texture) texture.dispose();
        if (renderer) renderer.dispose();
      } catch (cleanupErr) {
        console.warn('Error during WebGL resource cleanup:', cleanupErr);
      }
    };
  }, [theme]); // Re-run when theme updates to change colors dynamically

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: theme === 'dark' ? 0.65 : 0.4,
        transition: 'opacity 0.3s ease'
      }}
    />
  );
};

export default ThreeCanvas;
