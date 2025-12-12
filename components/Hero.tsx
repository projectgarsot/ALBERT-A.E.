import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
      {/* Background Ink Abstract - Restored to high-contrast ink bloom */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="images/hero.jpg" 
          alt="Abstract ink texture" 
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <h1 className="font-serif text-6xl md:text-9xl text-cream tracking-tight leading-none mix-blend-overlay">
            ALBERT A.E.
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="h-[1px] w-24 bg-terracotta mx-auto my-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="font-sans text-cream/70 text-sm md:text-lg tracking-[0.2em] uppercase"
        >
          ΕΜΠΟΡΙΚΗ ΕΚΤΥΠΩΤΙΚΗ & ΒΙΟΤΕΧΝΙΚΗ ΚΑΛΛΥΝΤΙΚΩΝ
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.0 }}
          className="font-mono text-cream/40 text-xs mt-4 tracking-widest"
        >
          ΙΔΡ. 1998 • ΜΟΣΧΑΤΟ, ΑΤΤΙΚΗ
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cream/30 text-xs font-sans tracking-widest uppercase"
      >
        ΚΥΛΗΣΤΕ ΓΙΑ ΝΑ ΑΝΑΚΑΛΥΨΕΤΕ
      </motion.div>
    </div>
  );
};