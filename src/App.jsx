import { useState, useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';

gsap.registerPlugin(ScrollTrigger);

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

    // Animación de la barra de progreso de scroll
    // gsap.to('#scroll-progress', {
    //   width: '100%',
    //   ease: 'none',
    //   scrollTrigger: {
    //     trigger: 'body',
    //     start: 'top top',
    //     end: 'bottom bottom',
    //     scrub: 0.3,
    //   },
    // });

    return () => {
      lenis.destroy();
      // ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-primary-light)] text-[var(--color-text-main)] font-[var(--font-inter)] selection:bg-[var(--color-accent)] selection:text-white relative">
      {/* Barra de progreso de lectura */}
      <div id="scroll-progress" className="fixed top-0 left-0 h-1 bg-[var(--color-accent)] z-[10001] w-0 transition-all duration-100 ease-out"></div>
      
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
