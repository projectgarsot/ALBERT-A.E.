import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  { id: '1', title: 'Συσκευασία Καλλυντικών', description: 'Σχεδιασμός δομής και κουτιά υψηλής ποιότητας για προϊόντα ομορφιάς. Εξειδικευμένες υφές και φινιρίσματα.', texture: 'bg-stone-100' },
  { id: '2', title: 'Πολυτελείς Ετικέτες', description: 'Αυτοκόλλητες ετικέτες με χρυσοτυπία, τοπικό UV και περίτεχνα κοπτικά για φιάλες και βάζα.', texture: 'bg-zinc-100' },
  { id: '3', title: 'Εμπορική Εκτύπωση', description: 'Εκτυπώσεις offset μεγάλου όγκου για εταιρικά έντυπα, φυλλάδια και προωθητικό υλικό.', texture: 'bg-slate-50' },
  { id: '4', title: 'Παραγωγή', description: 'Ολοκληρωμένες λύσεις παραγωγής καλλυντικών, από τη φόρμουλα έως την τελική συσκευασία ραφιού.', texture: 'bg-orange-50' },
];

export const Services: React.FC = () => {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <div className="min-h-screen bg-charcoal py-24 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-charcoal z-10" />
        
        <div className="mb-12 text-center relative z-20">
            <h2 className="font-serif text-cream text-5xl mb-4">Η Εξειδίκευσή μας</h2>
            <p className="text-cream/60 font-sans tracking-widest text-sm uppercase">ΕΠΙΛΕΞΤΕ ΚΑΤΗΓΟΡΙΑ</p>
        </div>

        <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center perspective-1000">
            <AnimatePresence mode='popLayout'>
                {services.map((service, index) => {
                    const isActive = service.id === activeId;
                    const offset = index * 4; // visual stack offset
                    
                    return (
                        <motion.div
                            key={service.id}
                            layoutId={service.id}
                            onClick={() => setActiveId(service.id)}
                            className={`absolute w-[300px] md:w-[400px] h-[500px] ${service.texture} shadow-2xl cursor-pointer border border-white/10 flex flex-col p-8`}
                            initial={{ rotate: offset, x: offset * 2, scale: 0.9 }}
                            animate={{ 
                                rotate: isActive ? 0 : offset, 
                                x: isActive ? 0 : offset * 20, 
                                zIndex: isActive ? 50 : 10 - index,
                                scale: isActive ? 1.05 : 0.9 + (index * 0.02)
                            }}
                            whileHover={{ 
                                y: -20,
                                transition: { duration: 0.3 }
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            data-hoverable
                        >
                            {/* Paper Grain Overlay */}
                            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
                            
                            <div className="flex justify-between items-start border-b border-black/10 pb-4 mb-4">
                                <span className="font-sans text-xs text-black/40 font-bold tracking-widest uppercase">ΤΜΗΜΑ 0{index + 1}</span>
                                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-terracotta' : 'bg-black/10'}`} />
                            </div>

                            <h3 className="font-serif text-4xl text-charcoal mb-6 leading-tight">{service.title}</h3>
                            
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <p className="font-serif text-lg text-charcoal/80 leading-relaxed">
                                        {service.description}
                                    </p>
                                    
                                    <div className="mt-12 p-4 border border-black/5 bg-white/50">
                                        <div className="h-px w-full bg-black/10 mb-2" />
                                        <div className="h-px w-full bg-black/10 mb-2" />
                                        <div className="h-px w-2/3 bg-black/10" />
                                        <p className="text-[10px] text-black/30 font-sans mt-2 text-right uppercase">ΠΡΟΤΥΠΟ ALBERT A.E.</p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    </div>
  );
};