import { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero'
import TargetAudience from './components/TargetAudience'
import BentoFeatures from './components/BentoFeatures'
import Pricing from './components/Pricing'
import FooterCTA from './components/FooterCTA'

function App() {
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
    <div className="min-h-screen bg-[var(--color-primary-light)] text-[var(--color-text-main)] font-[var(--font-inter)] selection:bg-[var(--color-accent)] selection:text-white">
      <CustomCursor />
      <Hero />
      <TargetAudience />
      <BentoFeatures />
      <Pricing />
      <FooterCTA />
    </div>
  )
}

export default App
