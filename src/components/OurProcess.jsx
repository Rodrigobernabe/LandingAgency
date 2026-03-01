import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Rocket } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: "01",
        title: "Auditoría Forense",
        desc: "Mapeamos por qué tu web actual sangra clientes. Analizamos a tu competencia y encontramos el ángulo de venta exacto que te hará ganar.",
        icon: Search,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        num: "02",
        title: "Copy & Arquitectura",
        desc: "Redactamos textos persuasivos basados en psicología del consumidor y diseñamos la experiencia visual en alta definición.",
        icon: PenTool,
        color: "text-[var(--color-accent)]",
        bg: "bg-[var(--color-accent)]/10"
    },
    {
        num: "03",
        title: "Lanzamiento y CRO",
        desc: "Tecnología Vite ultra-rápida. Publicamos tu web y dejamos paneles instalados para medir qué botón genera más dinero.",
        icon: Rocket,
        color: "text-green-500",
        bg: "bg-green-500/10"
    }
];

const OurProcess = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.process-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            // Animación progresiva de los pasos
            gsap.fromTo('.step-card',
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: '.process-steps', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );

            // Animación de la línea conectora (dibujándose hacia abajo)
            gsap.fromTo(lineRef.current,
                { height: '0%' },
                {
                    height: '100%',
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.process-steps',
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10 bg-[var(--color-primary-light)]">
            <div className="text-center process-header mb-20 w-full flex flex-col items-center">
                <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4 text-center">Metodología Clara</h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight flex flex-col items-center justify-center text-center">
                    <AnimatedText text="Tu nueva web lista" delay={0.1} />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF4F00] mt-2 block">en solo 3 pasos.</span>
                </h3>
            </div>

            <div className="relative process-steps max-w-3xl mx-auto">
                {/* Línea conectora central (Desktop) / lateral (Mobile) */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] md:-translate-x-1/2 overflow-hidden">
                    <div ref={lineRef} className="w-full bg-gradient-to-b from-[var(--color-accent)] via-[#FF4F00] to-[var(--color-accent)]"></div>
                </div>

                <div className="flex flex-col gap-16 md:gap-24 relative">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isEven = idx % 2 !== 0; // Para alternar lados en Desktop

                        return (
                            <div key={idx} className={`step-card relative flex flex-col md:flex-row items-start md:items-center w-full`}>

                                {/* Número y Nodo central */}
                                <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                                    <div className={`w-12 h-12 rounded-full border-4 border-[var(--color-primary-light)] bg-[var(--color-surface)] flex items-center justify-center shadow-lg shadow-black/5`}>
                                        <div className="w-4 h-4 rounded-full bg-current" style={{ color: "var(--color-accent)" }}></div>
                                    </div>
                                </div>

                                {/* Contenedor de Textos (Alternado) */}
                                <div className={`w-full md:w-1/2 pt-16 md:pt-0 ${isEven ? 'md:pl-16 pl-16 text-left' : 'pl-16 md:pl-0 md:pr-16 text-left md:text-right'}`}>
                                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-3xl hover:border-[var(--color-accent)] transition-colors duration-300 group inline-block w-full">
                                        <div className={`flex items-center gap-4 mb-4 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                                            <span className="font-[var(--font-unbounded)] font-bold text-4xl text-gray-200">{step.num}</span>
                                            <div className={`p-3 rounded-2xl ${step.bg} ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <h4 className="text-2xl font-bold font-[var(--font-unbounded)] mb-3 text-[var(--color-text-main)]">
                                            {step.title}
                                        </h4>
                                        <p className="text-gray-500 font-light leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Spacer para el lado opuesto en Desktop */}
                                <div className={`hidden md:block w-1/2 ${isEven ? 'order-first' : ''}`}></div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurProcess;
