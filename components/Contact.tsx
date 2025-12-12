import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { refinePrintIdea } from '../services/geminiService';
import { Sparkles, Loader2, MapPin, Phone, FileText } from 'lucide-react';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', details: '' });
  const [isConsulting, setIsConsulting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleConsultation = async () => {
    if (!form.details || form.details.length < 5) return;
    
    setIsConsulting(true);
    const refinement = await refinePrintIdea(form.details);
    setForm(prev => ({ ...prev, details: refinement }));
    setIsConsulting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center bg-cream">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
        >
            <h2 className="font-serif text-4xl text-charcoal mb-4">Το Αίτημα Ελήφθη</h2>
            <p className="font-sans text-terracotta tracking-widest uppercase">Η ομάδα της Albert A.E. θα επικοινωνήσει σύντομα μαζί σας.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center py-24 px-4">
      <div className="relative w-full max-w-2xl bg-cream shadow-2xl p-8 md:p-16 overflow-hidden mb-12">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-charcoal mb-2">Ζητήστε Προσφορά</h2>
            <p className="font-mono text-xs text-charcoal/50">ALBERT A.E. • ΕΚΤΥΠΩΣΕΙΣ & ΚΑΛΛΥΝΤΙΚΑ</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 font-mono text-sm text-charcoal">
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-charcoal/40 mb-2">Εταιρεία / Όνομα</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-charcoal/20 focus:border-terracotta outline-none py-2 transition-colors placeholder-charcoal/20"
                placeholder="Το όνομά σας ή η εταιρεία..."
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-charcoal/40 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-charcoal/20 focus:border-terracotta outline-none py-2 transition-colors placeholder-charcoal/20"
                placeholder="email@company.gr"
                required
              />
            </div>

            <div className="group relative">
              <label className="flex justify-between items-center text-xs uppercase tracking-widest text-charcoal/40 mb-2">
                <span>Προδιαγραφές Έργου</span>
                <button
                    type="button"
                    onClick={handleConsultation}
                    disabled={isConsulting || !form.details}
                    className="flex items-center gap-1 text-terracotta hover:text-terracotta/80 disabled:opacity-30 transition-colors"
                >
                    {isConsulting ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    <span className="text-[10px]">Βοηθός AI</span>
                </button>
              </label>
              <textarea
                value={form.details}
                onChange={e => setForm({ ...form, details: e.target.value })}
                rows={6}
                className="w-full bg-transparent border border-charcoal/10 focus:border-terracotta outline-none p-4 transition-colors placeholder-charcoal/20 resize-none leading-relaxed"
                placeholder="Περιγράψτε τις ανάγκες συσκευασίας ή εκτύπωσης (π.χ. 5000 κουτιά καλλυντικών, ετικέτες χρυσοτυπίας)..."
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                data-hoverable
                disabled={isSubmitting}
                className="font-serif text-xl italic hover:text-terracotta transition-colors flex items-center gap-2"
              >
                {isSubmitting ? 'Επεξεργασία...' : 'Αποστολή'}
                {!isSubmitting && <span>&rarr;</span>}
              </button>
            </div>
          </form>
        </div>
        
        {/* Decoration */}
        <div className="absolute top-4 right-4 w-12 h-12 border border-charcoal/10 rounded-full flex items-center justify-center opacity-20 rotate-12">
            <span className="font-mono text-[8px] text-center">A.E.<br/>1998</span>
        </div>
      </div>

      {/* Official Footer Information */}
      <div className="text-center text-cream/40 space-y-4 max-w-5xl px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center text-xs tracking-wider font-sans">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Χειμάρρας 22, Μοσχάτο, 18345, Αττική</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>+30 210 942 7830</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-[10px] font-mono opacity-60 flex-wrap">
           <div className="flex items-center gap-2">
             <FileText size={12} />
             <span>ALBERT ΕΜΠΟΡΙΚΗ ΕΚΤΥΠΩΤΙΚΗ ΒΙΟΤΕΧΝΙΚΗ ΚΑΛΛΥΝΤΙΚΩΝ Α.Ε.</span>
           </div>
           <span>|</span>
           <span>ΑΦΜ: 094535608</span>
           <span>|</span>
           <span>ΔΟΥ: ΦΑΕ ΠΕΙΡΑΙΑ</span>
           <span>|</span>
           <span>ΓΕΜΗ: 122041201000</span>
        </div>
      </div>
    </div>
  );
};