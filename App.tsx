import React, { useState, useEffect } from 'react';
import { Cursor } from './components/Cursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { Financials } from './components/Financials';
import { Contact } from './components/Contact';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection Observer to update active section state on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as Section);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(Section).forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-charcoal text-cream selection:bg-terracotta selection:text-white">
      <Cursor />
      
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-noise opacity-[0.03]" />

      <main>
        <section id={Section.HERO}>
          <Hero />
        </section>

        <section id={Section.PORTFOLIO}>
          <Portfolio />
        </section>

        <section id={Section.CRAFT}>
          <Process />
        </section>

        <section id={Section.FINANCIALS}>
          <Financials />
        </section>

        <section id={Section.CONTACT}>
          <Contact />
        </section>
      </main>

      <Navigation currentSection={activeSection} onNavigate={scrollToSection} />
      
      {/* Fixed Branding Footer/Tagline */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block mix-blend-difference">
         <span className="font-serif italic text-cream/50 text-lg">Ιδρ. MCMXCVIII</span>
      </div>
    </div>
  );
};

export default App;