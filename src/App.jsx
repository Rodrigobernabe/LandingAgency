import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import LogoTicker from './components/LogoTicker';
import OurProcess from './components/OurProcess';
import TargetAudience from './components/TargetAudience';
import WorkPortfolio from './components/WorkPortfolio';
import Testimonials from './components/Testimonials';
import ComparisonSection from './components/ComparisonSection';
import BentoFeatures from './components/BentoFeatures';
import FAQ from './components/FAQ';
import ROICalculator from './components/ROICalculator';
import Pricing from './components/Pricing';
import FooterCTA from './components/FooterCTA';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import InteractiveFormModal from './components/InteractiveFormModal';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    // Configurar Lenis (Smooth Scrolling)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-primary-light)] text-[var(--color-text-main)] font-[var(--font-inter)] selection:bg-[var(--color-accent)] selection:text-white relative">
      <CustomCursor />
      <Navbar openForm={() => setIsFormOpen(true)} />
      <Hero openForm={() => setIsFormOpen(true)} />
      <LogoTicker />
      <div id="proceso"><OurProcess /></div>
      <TargetAudience />
      <div id="portafolio"><WorkPortfolio openForm={() => setIsFormOpen(true)} /></div>
      <Testimonials />
      <ComparisonSection />
      <BentoFeatures />
      <div id="faq"><FAQ /></div>
      <ROICalculator />
      <div id="precios"><Pricing openForm={() => setIsFormOpen(true)} /></div>
      <FooterCTA openForm={() => setIsFormOpen(true)} />
      <FloatingWhatsApp />

      {/* Modal Interactivo Superpuesto (Typeform Style) */}
      <InteractiveFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  )
}

export default App;
