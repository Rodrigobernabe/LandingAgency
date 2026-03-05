import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BarChart } from 'lucide-react';
import AnimatedText from './AnimatedText';
import heroVideo from '../assets/hero.mp4';
import MagneticButton from './MagneticButton';

const Hero = ({ openForm }) => {
    const containerRef = useRef(null);
    // Refs para los contadores animados
    const counter1Ref = useRef(null);
    const counter2Ref = useRef(null);
    const counter3Ref = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animación inicial del hero
            gsap.fromTo('.hero-fade',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 1 }
            );

            // Animación Count-Up de los contadores
            const animateCounter = (ref, target, suffix = '', prefix = '') => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    delay: 1.5,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 90%',
                        once: true,
                    },
                    onUpdate: () => {
                        if (ref.current) {
                            ref.current.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
                        }
                    },
                });
            };

            animateCounter(counter1Ref, 47, '', '+');
            animateCounter(counter2Ref, 312, '%', '+');
            animateCounter(counter3Ref, 48, 'hs', '');

            // Efecto Parallax en el video
            gsap.to('.hero-video-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-12 overflow-hidden bg-[#040405]">

            {/* Video de Fondo a Pantalla Completa con contenedor para parallax */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                <div className="hero-video-bg absolute inset-0 w-full h-[130%] -top-[15%]">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Overlay Extra Dark para garantizar lectura y estilo Onyx & Ember */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#040405]/80 via-[#040405]/60 to-[#040405] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 w-full mt-12 md:mt-20">
                <div className="flex flex-col items-center text-center w-full max-w-[95vw] md:max-w-7xl mx-auto">
                    {/* Luces Ember Brillantes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] rounded-full blur-[200px] opacity-[0.15] pointer-events-none -z-10 mix-blend-screen animate-[pulse_6s_ease-in-out_infinite_alternate]"></div>

                    <div className="hero-fade inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[#141517]/80 backdrop-blur-md text-sm font-medium mb-8 text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_10px_var(--color-accent)]"></span>
                        Agencia de Crecimiento Digital
                    </div>

                    <h1 className="hero-fade font-bold tracking-tight mb-8 font-[var(--font-unbounded)] text-[var(--color-text-main)] leading-tight text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-center">
                        <span className="block">Landing Pages que transforman</span>
                        <span className="block">clics en <span className="text-[var(--color-accent)] drop-shadow-[0_0_30px_rgba(255,79,0,0.4)]">clientes.</span></span>
                    </h1>

                    <p className="hero-fade text-base md:text-lg text-gray-400 mb-10 max-w-xl font-light leading-relaxed">
                        Diseño que convierte. Entrega en 48hs. Sin plantillas, sin excusas.
                    </p>

                    <div className="hero-fade flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                        <MagneticButton distance={25}>
                            <button onClick={openForm} className="btn-liquid bg-[var(--color-accent)] text-white px-8 py-4 rounded-xl font-[var(--font-unbounded)] font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_30px_rgba(255,79,0,0.4)] border-none">
                                <span className="relative z-10 flex items-center gap-2">Quiero mi Landing <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></span>
                            </button>
                        </MagneticButton>

                        <MagneticButton distance={15}>
                            <button
                                onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                className="group relative border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden px-8 py-4 rounded-xl font-[var(--font-unbounded)] font-semibold transition-colors duration-300 flex items-center justify-center gap-2 z-10"
                            >
                                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-[-1]"></span>
                                <span className="group-hover:text-black text-white transition-colors duration-300">Calcula tu ROI</span>
                                <BarChart className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors duration-300" />
                            </button>
                        </MagneticButton>
                    </div>

                    {/* Contadores de Prueba Social */}
                    <div className="hero-fade flex flex-wrap justify-center gap-x-10 gap-y-4 mt-10">
                        <div className="text-center">
                            <div ref={counter1Ref} className="text-3xl font-bold font-[var(--font-unbounded)] text-white">+0</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Proyectos lanzados</div>
                        </div>
                        <div className="w-px bg-[var(--color-border)] hidden sm:block"></div>
                        <div className="text-center">
                            <div ref={counter2Ref} className="text-3xl font-bold font-[var(--font-unbounded)] text-[var(--color-accent)]">+0%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Conversión promedio</div>
                        </div>
                        <div className="w-px bg-[var(--color-border)] hidden sm:block"></div>
                        <div className="text-center">
                            <div ref={counter3Ref} className="text-3xl font-bold font-[var(--font-unbounded)] text-white">0hs</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Tiempo de entrega</div>
                        </div>
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
