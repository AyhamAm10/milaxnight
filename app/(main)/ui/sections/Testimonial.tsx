'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useMirror } from '../../store';
import { TestimonialParticles } from './TestimonialParticles';

// Testimonial: Reads only what it needs from store (no props)
export function Testimonial() {
  const t = useMirror('t');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse position tracking for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animations for tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Normalize to -0.5 to 0.5 range
    x.set(mouseX / (rect.width / 2));
    y.set(mouseY / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <section id="testimonial" className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-mk-purple/5 via-transparent to-mk-cyan/5" />
      
      {/* Crystal dust particles - scoped to this section */}
      <TestimonialParticles />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t.testimonial.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: isMobile ? 0 : rotateX,
              rotateY: isMobile ? 0 : rotateY,
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
            className="gradient-border p-1"
          >
            <div className="bg-card rounded-xl p-8 md:p-12">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-foreground text-center mb-8 leading-relaxed">
                "{t.testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <p className="font-semibold text-foreground text-lg">
                  {t.testimonial.author}
                </p>
                <p className="text-muted-foreground">
                  {t.testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
