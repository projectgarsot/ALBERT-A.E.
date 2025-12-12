import React from 'react';
import { motion } from 'framer-motion';
import { CraftStep } from '../types';
import { Droplet, Layers, Printer, Scissors, Package } from 'lucide-react';

const steps: CraftStep[] = [
  { id: 1, title: 'Συμβουλευτική', description: 'Ορίζουμε τις φυσικές παραμέτρους της ιδέας σας.', icon: 'Layers' },
  { id: 2, title: 'Προεκτύπωση', description: 'Δημιουργία τσίγκων. Τα χρώματα αναμιγνύονται στο χέρι.', icon: 'Droplet' },
  { id: 3, title: 'Εκτύπωση', description: 'Το χαρτί συναντά το μελάνι υπό υψηλή πίεση.', icon: 'Printer' },
  { id: 4, title: 'Περάτωση', description: 'Κοπτικά, βιβλιοδεσία και ποιοτικός έλεγχος.', icon: 'Scissors' },
  { id: 5, title: 'Παράδοση', description: 'Συσκευασμένα προσεκτικά, έτοιμα για την αγορά.', icon: 'Package' },
];

export const Process: React.FC = () => {
  return (
    <div className="bg-paper py-32 px-4 md:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-charcoal text-5xl mb-24 text-center">Η Διαδικασία</h2>
        
        <div className="relative border-l-2 border-charcoal/10 ml-6 md:ml-0 space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative pl-12 md:pl-24"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-charcoal border-4 border-paper" />
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="text-terracotta opacity-50">
                  {/* Dynamic Icon Rendering */}
                  {step.id === 1 && <Layers size={48} strokeWidth={1} />}
                  {step.id === 2 && <Droplet size={48} strokeWidth={1} />}
                  {step.id === 3 && <Printer size={48} strokeWidth={1} />}
                  {step.id === 4 && <Scissors size={48} strokeWidth={1} />}
                  {step.id === 5 && <Package size={48} strokeWidth={1} />}
                </div>
                <div>
                  <span className="font-sans text-xs tracking-widest text-charcoal/40 mb-2 block uppercase">ΣΤΑΔΙΟ 0{step.id}</span>
                  <h3 className="font-serif text-3xl text-charcoal mb-4">{step.title}</h3>
                  <p className="font-sans text-charcoal/70 leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};