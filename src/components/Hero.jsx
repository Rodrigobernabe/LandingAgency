import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, BarChart } from 'lucide-react';
import AnimatedText from './AnimatedText';
import ThreeScene from './ThreeScene';
import MagneticButton from './MagneticButton';

const Hero = ({ openForm }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-fade',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 1 }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#040405]">
            {/* Header / Nav Minimal */}
            <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
                <div className="font-bold text-xl tracking-tight font-[var(--font-unbounded)]">LandingAgency.</div>
                <button className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors">
                    Agendar Sesión
                </button>
            </header>

            {/* Espacio 3D Inmersivo (Fondo en toda la pantalla) */}
            <div className="absolute inset-0 z-0 opacity-0 animate-[fadeIn_2s_ease-out_1s_forwards]">
                <ThreeScene />
            </div>

            {/* Overlay sutil para garantizar lectura de texto sobre el 3D */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#040405]/50 to-[#040405] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 w-full mt-12 md:mt-20">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Luces Ember Brillantes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[200px] opacity-[0.15] pointer-events-none -z-10 mix-blend-screen animate-[pulse_6s_ease-in-out_infinite_alternate]"></div>

                    <div className="hero-fade inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[#141517]/80 backdrop-blur-md text-sm font-medium mb-8 text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_10px_var(--color-accent)]"></span>
                        Agencia de Crecimiento Digital
                    </div>

                    <div className="text-5xl md:text-6xl xl:text-[5rem] font-bold tracking-tighter mb-6 font-[var(--font-unbounded)] text-[var(--color-text-main)] leading-[1.1] flex flex-col items-center">
                        <div className="flex flex-wrap justify-center mb-1">
                            <AnimatedText text="Landing" delay={0.1} Component="span" className="inline-flex mr-4" />
                            <AnimatedText text="Pages" delay={0.2} Component="span" className="inline-flex text-[var(--color-accent)] drop-shadow-[0_0_15px_rgba(255,79,0,0.3)]" />
                        </div>
                        <AnimatedText text="que transforman" delay={0.4} Component="span" className="inline-flex mb-1" />
                        <AnimatedText text="clics en clientes." delay={0.6} Component="span" className="inline-flex" />
                    </div>

                    <p className="hero-fade text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light tracking-tight leading-relaxed">
                        Diseño nivel Silicon Valley. Cero fricción. Máxima conversión para negocios que están listos para escalar. Ni plantillas, ni excusas. Solo resultados medibles.
                    </p>

                    <div className="hero-fade flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                        <MagneticButton distance={25}>
                            <button onClick={openForm} className="btn-liquid bg-[var(--color-accent)] text-white px-8 py-4 rounded-xl font-[var(--font-unbounded)] font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_30px_rgba(255,79,0,0.4)] border-none">
                                <span className="relative z-10 flex items-center gap-2">Ver el Portafolio <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></span>
                            </button>
                        </MagneticButton>

                        <MagneticButton distance={15}>
                            <button className="group relative border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden px-8 py-4 rounded-xl font-[var(--font-unbounded)] font-semibold transition-colors duration-300 flex items-center justify-center gap-2 z-10">
                                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-[-1]"></span>
                                <span className="group-hover:text-black text-white transition-colors duration-300">Calcula tu ROI</span>
                                <BarChart className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                            </button>
                        </MagneticButton>
                    </div>
                </div>
            </div>
            {/* Animacion CSS para entrada del canvas 3D retrasada para no bloquear GSAP */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
