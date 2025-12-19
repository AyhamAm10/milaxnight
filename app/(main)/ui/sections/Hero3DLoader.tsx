'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface Hero3DLoaderProps {
  isLoading: boolean;
  progress?: number;
}

export function Hero3DLoader({ isLoading, progress = 0 }: Hero3DLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-lg z-10"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="h-8 w-8 text-mk-purple" />
            </motion.div>
            {progress > 0 && (
              <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-mk-magenta to-mk-cyan"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

