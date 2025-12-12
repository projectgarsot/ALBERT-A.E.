import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Image, PenTool, Mail, Feather, FileBarChart } from 'lucide-react';
import { Section } from '../types';

interface NavigationProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: Section.HERO, label: 'Αρχική', icon: Feather },
    { id: Section.PORTFOLIO, label: 'Εργασίες', icon: Image },
    { id: Section.CRAFT, label: 'Διαδικασία', icon: PenTool },
    { id: Section.FINANCIALS, label: 'Οικονομικά', icon: FileBarChart },
    { id: Section.CONTACT, label: 'Επικοινωνία', icon: Mail },
  ];

  return (
    <div className="fixed bottom-12 right-12 z-40 flex items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="absolute bg-cream/90 backdrop-blur-sm rounded-full w-72 h-72 flex items-center justify-center shadow-2xl border border-charcoal/10"
          >
            {menuItems.map((item, index) => {
              const angle = (index / menuItems.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 100; // Increased radius to accommodate more items
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsOpen(false);
                  }}
                  data-hoverable
                  className="absolute flex flex-col items-center justify-center text-charcoal hover:text-terracotta transition-colors group"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                  <span className="text-[10px] font-sans tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        data-hoverable
        className={`relative z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
          isOpen ? 'bg-terracotta text-cream' : 'bg-cream text-charcoal'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </button>
    </div>
  );
};