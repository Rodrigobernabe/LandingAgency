import { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';

const LogoTicker = lazy(() => import('./components/LogoTicker'));
const OurProcess = lazy(() => import('./components/OurProcess'));
const TargetAudience = lazy(() => import('./components/TargetAudience'));
const WorkPortfolio = lazy(() => import('./components/WorkPortfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const ComparisonSection = lazy(() => import('./components/ComparisonSection'));
const BentoFeatures = lazy(() => import('./components/BentoFeatures'));
const FAQ = lazy(() => import('./components/FAQ'));
const ROICalculator = lazy(() => import('./components/ROICalculator'));
const Pricing = lazy(() => import('./components/Pricing'));
const FooterCTA = lazy(() => import('./components/FooterCTA'));
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp'));
const InteractiveFormModal = lazy(() => import('./components/InteractiveFormModal'));

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
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  )
}

export default App;
