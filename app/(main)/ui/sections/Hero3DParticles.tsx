'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  enabled?: boolean;
}

// Subtle particle system for 3D area
export function Hero3DParticles({ count = 50, enabled = true }: ParticleSystemProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!particlesRef.current || !enabled || isMobile) return;

    const particles = particlesRef.current;
    const geometry = particles.geometry;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // Set material properties via ref
    if (materialRef.current) {
      materialRef.current.size = 0.08;
      materialRef.current.sizeAttenuation = true;
      materialRef.current.vertexColors = true;
      materialRef.current.transparent = true;
      materialRef.current.opacity = 0.6;
      materialRef.current.blending = THREE.AdditiveBlending;
      materialRef.current.depthWrite = false;
    }

    // Bluish/purple sparkle colors for dark background visibility
    const sparkleBlue = new THREE.Color().setHSL(200 / 360, 0.7, 0.7); // Bluish
    const sparklePurple = new THREE.Color().setHSL(270 / 360, 0.8, 0.75); // Purple
    const sparkleCyan = new THREE.Color().setHSL(180 / 360, 0.6, 0.65); // Cyan

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere around the model
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random color - prefer bluish/purple for visibility on dark background
      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.4) {
        color = sparklePurple; // More purple
      } else if (colorChoice < 0.7) {
        color = sparkleBlue; // More blue
      } else {
        color = sparkleCyan; // Some cyan
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random sizes (small but visible)
      sizes[i] = 0.03 + Math.random() * 0.04;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  }, [count, enabled, isMobile]);

  // Slow, subtle animation
  useFrame((state) => {
    if (!particlesRef.current || !enabled || isMobile) return;

    const particles = particlesRef.current;
    const time = state.clock.getElapsedTime() * 0.1; // Slow motion

    particles.rotation.y = time * 0.1;
    particles.rotation.x = Math.sin(time) * 0.05;

    // Gentle floating motion - check if geometry and attributes exist
    const geometry = particles.geometry;
    if (geometry && geometry.attributes && geometry.attributes.position) {
      const positions = geometry.attributes.position.array as Float32Array;
      if (positions && positions.length > 0) {
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          if (i3 + 1 < positions.length) {
            positions[i3 + 1] += Math.sin(time + i) * 0.0005; // Very slow vertical drift
          }
        }
        geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  if (!enabled || isMobile) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial ref={materialRef} />
    </points>
  );
}

