import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

// Updated with print-centric categories and images representing the print object itself
const projects: Project[] = [
  { id: '1', title: 'Κουτί Folding', category: 'Συσκευασία', technique: 'Foil & Emboss', imageUrl: 'images/foldingbox.jpg' },
  { id: '2', title: 'Ετικέτες Ρολού', category: 'Ετικέτες', technique: 'Χρυσοτυπία & UV', imageUrl: 'images/labelsrole.jpg' },
  { id: '3', title: 'Σκληρό Κουτί', category: 'Κυτιοποιία', technique: 'Χειροποίητο', imageUrl: 'images/hardbox.jpg' },
  { id: '4', title: 'Εταιρικό Έντυπο', category: 'Εμπορική Εκτύπωση', technique: 'Offset', imageUrl: 'images/offset.jpg' },
  { id: '5', title: 'Συσκευασία Πολυτελείας', category: 'Premium', technique: 'Soft Touch & Spot UV', imageUrl: 'images/spotuv.jpg' },
];

export const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream relative py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <h2 className="font-serif text-charcoal text-5xl md:text-6xl">Εκτυπωτικές Εργασίες</h2>
                <p className="font-sans text-terracotta text-sm tracking-widest mt-2 uppercase">Λυσεις Εκτυπωσης & Συσκευασιας</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-charcoal/10 ml-12 mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative w-full aspect-[3/4] group perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div 
                className="w-full h-full bg-white shadow-2xl transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-1"
                data-hoverable
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                
                {/* Information Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-cream p-4 shadow-lg border-l-4 border-terracotta">
                        <h3 className="font-serif text-xl text-charcoal">{project.title}</h3>
                        <p className="font-sans text-xs text-charcoal/60 uppercase tracking-wider mt-1">{project.category}</p>
                        <p className="font-mono text-[10px] text-terracotta mt-1">{project.technique}</p>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* View Archive Link as a Grid Item */}
          <motion.div 
            className="w-full aspect-[3/4] flex flex-col items-center justify-center border border-charcoal/10 hover:border-terracotta/50 transition-colors group cursor-pointer bg-white/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            data-hoverable
          >
            <div className="p-8 text-center">
                <p className="font-serif text-4xl text-charcoal/30 italic group-hover:text-terracotta transition-colors mb-4">Πλήρης Κατάλογος</p>
                <div className="w-12 h-px bg-charcoal/20 mx-auto group-hover:bg-terracotta transition-colors" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};