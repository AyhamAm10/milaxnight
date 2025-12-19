'use client';

import { motion } from 'framer-motion';
import { LayoutGrid, Clock, Users } from 'lucide-react';
import { useMirror } from '../../store';

const icons = [LayoutGrid, Clock, Users];

// Features: Reads only what it needs from store (no props)
export function Features() {
  const t = useMirror('t');
  return (
    <section id="features" className="py-24 relative">
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
            {t.features.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.features.items.map((feature, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="surface-card p-8 h-full transition-all duration-300 hover:border-mk-purple/50 hover:shadow-lg hover:shadow-mk-purple/10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
