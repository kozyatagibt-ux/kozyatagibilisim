import React from 'react';
import Hero from './sections/Hero';
import TechTicker from './components/TechTicker';
import Services from './sections/Services';
import About from './sections/About'; // "Why Us"
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Process from './sections/Process';
import PainPoints from './sections/PainPoints';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import Comparison from './sections/Comparison';

import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-500/30">
        <SEO />
        <Navbar />
        <WhatsAppButton />

        <main>
          <Hero />
          <TechTicker />
          <PainPoints />
          <Services />
          <Process />
          <Comparison />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
