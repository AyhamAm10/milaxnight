'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
  driftY: number; // Pre-computed Y drift amount
  driftX: number; // Pre-computed X drift amount
  minOpacity: number; // Pre-computed minimum opacity
}

export function TestimonialParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setParticles([]);
      return;
    }

    // Generate particles - lower density than Hero for subtlety
    const particleCount = 20; // Lower count for testimonial section
    const newParticles: Particle[] = [];

    // Theme colors (bluish/purple sparkle) - same as Hero
    const colors = [
      'hsl(200, 70%, 70%)', // Bluish
      'hsl(270, 80%, 75%)', // Purple
      'hsl(180, 60%, 65%)', // Cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      const baseOpacity = 0.15 + Math.random() * 0.25; // Lower opacity than Hero
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Random X position (0-100%)
        y: Math.random() * 100, // Random Y position (0-100%)
        size: 2 + Math.random() * 2.5, // Slightly smaller (2-4.5px)
        opacity: baseOpacity, // Lower opacity (0.15-0.4)
        duration: 18 + Math.random() * 12, // Slower drift (18-30s)
        delay: Math.random() * 5, // Random start delay
        color: colors[Math.floor(Math.random() * colors.length)],
        driftY: -30 - Math.random() * 20, // Pre-computed Y drift
        driftX: (Math.random() - 0.5) * 20, // Pre-computed X drift
        minOpacity: baseOpacity * 0.5, // Pre-computed minimum opacity
      });
    }

    setParticles(newParticles);
  }, [isMobile]);

  if (isMobile || particles.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }} // Above background, below card content
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, particle.driftY, 0],
            x: [0, particle.driftX, 0],
            opacity: [
              particle.opacity,
              particle.minOpacity,
              particle.opacity,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

