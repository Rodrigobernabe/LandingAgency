import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const criteria = [
    {
        label: "Foco Principal",
        traditional: "Diseño que se vea 'bonito'",
        us: "Psicología para agendar llamadas",
    },
    {
        label: "Tiempo de Entrega",
        traditional: "Burocracia de 2 a 3 meses",
        us: "Lanzamiento récord de 2 a 3 semanas",
    },
    {
        label: "Tecnología Base",
        traditional: "Plantillas pesadas (WP)",
        us: "Código React ultra-rápido (Vite)",
    },
    {
        label: "Textos (Copywriting)",
        traditional: "Palabras de relleno (Lorem ipsum)",
        us: "Estrategia para atacar dolores",
    },
    {
        label: "Garantía",
        traditional: "Pagas igual si no funciona",
        us: "Revisión hasta que convierta",
    }
];

const ComparisonSection = () => {
    const sectionRef = useRef(null);
    const tableRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.comp-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.comp-row',
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: tableRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10 bg-[var(--color-primary-light)]">
            <div className="text-center comp-header mb-16 w-full flex flex-col items-center">
                <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4 text-center">La Diferencia</h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight flex flex-col items-center justify-center text-center">
                    <AnimatedText text="Agencias Tradicionales" delay={0.1} />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 mt-2 block">VS</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF4F00] mt-2 block">Nuestra Agencia.</span>
                </h3>
            </div>

            <div ref={tableRef} className="max-w-4xl mx-auto relative">
                {/* Cabeceras de Tabla */}
                <div className="grid grid-cols-1 md:grid-cols-3 mb-6 px-4 md:px-8">
                    <div className="hidden md:block col-span-1"></div>
                    <div className="col-span-1 text-center pb-4 md:pb-0">
                        <span className="text-gray-500 font-bold font-[var(--font-unbounded)] uppercase tracking-wider text-sm">
                            La Competencia
                        </span>
                    </div>
                    <div className="col-span-1 text-center">
                        <span className="text-[var(--color-accent)] font-bold font-[var(--font-unbounded)] uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                            Landing Agency <span className="animate-pulse">🚀</span>
                        </span>
                    </div>
                </div>

                {/* Filas */}
                <div className="flex flex-col gap-4 relative">
                    {criteria.map((item, idx) => (
                        <div key={idx} className="comp-row grid grid-cols-1 md:grid-cols-3 bg-[#040405] rounded-3xl border border-gray-800 overflow-hidden relative group">

                            {/* Criterio (Izquierda) */}
                            <div className="col-span-1 p-6 md:p-8 flex items-center border-b md:border-b-0 md:border-r border-gray-800/50 bg-[#0a0a0c]">
                                <h4 className="font-[var(--font-unbounded)] text-white font-medium">{item.label}</h4>
                            </div>

                            {/* Tradicional (Centro) */}
                            <div className="col-span-1 p-6 md:p-8 flex items-center gap-4 bg-[#040405] border-b md:border-b-0 md:border-r border-gray-800/50 opacity-70 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-red-900/20 text-red-500 flex items-center justify-center shrink-0">
                                    <X className="w-4 h-4" />
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.traditional}</p>
                            </div>

                            {/* Nosotros (Derecha) */}
                            <div className="col-span-1 p-6 md:p-8 flex items-center gap-4 relative overflow-hidden">
                                {/* Glow sutil de fondo en nuestra columna */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/5 to-[var(--color-accent)]/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center shrink-0 relative z-10">
                                    <Check className="w-4 h-4" />
                                </div>
                                <p className="text-white text-sm font-medium leading-relaxed relative z-10">{item.us}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
