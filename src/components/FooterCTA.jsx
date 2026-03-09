import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';
import logo from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const FooterCTA = ({ openForm }) => {
    const sectionRef = useRef(null);
    const kineticTextRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animación de aparición estándar
            gsap.fromTo('.cta-content',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Tipografía Cinética vinculada al Scroll
            gsap.fromTo(kineticTextRef.current,
                { x: '10%' },
                {
                    x: '-40%',
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1, // Suaviza la animación de arrastre con el scroll
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-[var(--color-primary-dark)] text-[var(--color-primary-light)] relative overflow-hidden flex flex-col justify-center min-h-[80vh]">

            {/* Animación de Gradiente en Fondo */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[var(--color-accent)] rounded-full blur-[150px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite_alternate]" />
                <div className="absolute top-[40%] right-[10%] w-[50%] h-[50%] bg-[#CC3F00] rounded-full blur-[150px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_alternate_reverse]" />
                <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
            </div>

            {/* Texto Cinético Gigante (Fondo del CTA) */}
            <div className="absolute top-1/4 left-0 w-[200vw] pointer-events-none z-0 opacity-[0.04] flex">
                <h2 ref={kineticTextRef} className="text-[15vw] leading-none font-bold tracking-tighter whitespace-nowrap font-[var(--font-unbounded)] text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    LISTO PARA CRECER? — DEJAR DE PERDER CLIENTES —
                </h2>
            </div>

            <div className="max-w-4xl mx-auto text-center cta-content relative z-10 w-full mt-auto mb-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-8 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
                    </span>
                    Solo tomamos 4 proyectos / mes. (2 cupos restantes en {new Date().toLocaleString('es-ES', { month: 'long' })})
                </div>

                <h3 className="flex flex-wrap justify-center items-center gap-x-3 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 font-[var(--font-unbounded)] leading-tight w-full text-center relative z-10">
                    <AnimatedText Component="span" text="¿Listo para dejar" delay={0.1} className="text-white drop-shadow-md" />
                    <AnimatedText Component="span" text="de perder clientes" delay={0.3} className="text-[var(--color-accent)] drop-shadow-[0_0_20px_rgba(255,79,0,0.4)]" />
                    <AnimatedText Component="span" text="en tu embudo?" delay={0.5} className="text-white drop-shadow-md" />
                </h3>

                <p className="text-xl text-gray-400 mb-14 font-light max-w-2xl mx-auto leading-relaxed">
                    Agenda una sesión gratuita de 15 minutos. Analizamos tu landing actual y te decimos exactamente por qué no convierte. Sin compromiso.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    {/* Botón Principal (Liquid Fill Style refactorizado para Footer) */}
                    <MagneticButton distance={20}>
                        <button onClick={openForm} className="btn-liquid overflow-hidden relative group bg-[var(--color-accent)] text-white px-10 py-5 rounded-2xl font-[var(--font-unbounded)] font-semibold transition-all hover:shadow-[0_0_40px_rgba(255,79,0,0.6)] flex items-center justify-center gap-2 border-none">
                            <span className="relative z-10 flex items-center gap-2 text-lg">
                                Agendar Auditoría <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
                        </button>
                    </MagneticButton>

                    <MagneticButton distance={10}>
                        <a href="https://wa.me/5492657619592" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 px-10 py-5 font-[var(--font-unbounded)] font-medium text-white border border-gray-700 bg-transparent rounded-2xl transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[#141517] text-lg overflow-hidden z-10">
                            <span className="absolute inset-0 bg-[var(--color-accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-[-1]"></span>
                            <span className="group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                                <Mail className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
                                Escríbenos
                            </span>
                        </a>
                    </MagneticButton>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-auto pt-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto w-full text-gray-500 text-sm relative z-10 gap-6 md:gap-0">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <img src={logo} alt="LandingAgency Logo" className="h-[40px] w-auto opacity-50 hover:opacity-100 transition-opacity duration-300" />
                    <p className="font-[var(--font-unbounded)] uppercase tracking-wider text-xs text-center md:text-left">© {new Date().getFullYear()} High-Performance Design.</p>
                </div>
                <div className="flex gap-8 mt-6 md:mt-0">
                    <a href="#" className="hover:text-white hover:-translate-y-1 transition-all duration-300">Twitter</a>
                    <a href="#" className="hover:text-white hover:-translate-y-1 transition-all duration-300">LinkedIn</a>
                    <a href="#" className="hover:text-white hover:-translate-y-1 transition-all duration-300">Dribbble</a>
                </div>
            </div>
        </section>
    );
};

export default FooterCTA;
