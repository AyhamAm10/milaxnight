'use client';

import { motion } from 'framer-motion';
import { useMirror } from '../../store';

// HowItWorks: Reads only what it needs from store (no props)
export function HowItWorks() {
  const t = useMirror('t');
  const isRTL = useMirror('isRTL');
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {t.howItWorks.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex items-start gap-6 md:gap-10 pb-12 last:pb-0"
            >
              {/* Step Number */}
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-xl glow-effect">
                  {step.step}
                </div>
                {/* Connector Line */}
                {index < t.howItWorks.steps.length - 1 && (
                  <div className="absolute top-16 start-1/2 w-0.5 h-12 bg-gradient-to-b from-mk-purple/50 to-transparent -translate-x-1/2" />
                )}
              </div>

              {/* Content */}
              <div className="pt-3">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
