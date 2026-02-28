import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const targetGroups = [
    {
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
        title: 'Gimnasios & Fitness',
        desc: 'Atletas y entrenadores que necesitan vender membresías o programas con máxima credibilidad.',
        color: 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-[0_10px_40px_rgba(255,79,0,0.1)]',
        marginTop: 'mt-0 md:mt-12'
    },
    {
        image: '/law_firm_gavel.png',
        title: 'Firmas de Abogados',
        desc: 'Estudios jurídicos que buscan agendar consultas premium sin fricción para el usuario.',
        color: 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-[0_10px_40px_rgba(255,79,0,0.1)]',
        marginTop: 'mt-0'
    },
    {
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
        title: 'Emprendedores',
        desc: 'Dueños de negocios locales y restaurantes familiares que necesitan atraer más reservas cada día.',
        color: 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-[0_10px_40px_rgba(255,79,0,0.1)]',
        marginTop: 'mt-0 md:mt-24'
    }
];

const TargetAudience = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.target-header',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.target-card',
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.target-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-[var(--color-primary-light)]">
            {/* Elemento de fondo decorativo asimétrico */}
            <div className="absolute top-1/4 left-0 w-full h-[50%] bg-[#141517] -z-10 -skew-y-3 origin-top-left hidden md:block"></div>

            <div className="flex flex-col md:flex-row justify-between items-end target-header mb-20 gap-8">
                <div className="text-left max-w-2xl">
                    <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4">Audiencia</h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight">
                        <AnimatedText text="Diseñamos para" delay={0.1} />
                        <br />
                        <span className="text-gray-400">quienes necesitan</span>
                        <br />
                        <AnimatedText text="resultados hoy." delay={0.3} />
                    </h3>
                </div>
                <div className="w-full md:w-1/3 text-left md:text-right hidden md:block">
                    <p className="text-lg text-gray-500 font-light max-w-xs ml-auto">Soluciones digitales precisas esculpidas para nichos de alta competencia.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 target-grid">
                {targetGroups.map((group, idx) => (
                    <div key={idx} className={`target-card group relative ${group.marginTop} transition-all duration-500 hover:-translate-y-2`}>
                        {/* Fuerte brillo de fondo detrás de toda la tarjeta en hover */}
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--color-accent)] to-[#FF4F00] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                        <div className={`relative h-[450px] bg-[var(--color-surface)] border ${group.color} rounded-2xl flex flex-col cursor-none overflow-hidden`}>
                            {/* Brillo sutil de fondo interior en hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                            {/* Imagen reemplazando icono */}
                            <div className="w-full h-48 overflow-hidden relative z-10 m-0 p-0 border-b border-[var(--color-border)]">
                                <img
                                    src={group.image}
                                    alt={group.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sepia-[40%] group-hover:sepia-0 grayscale-[30%] group-hover:grayscale-0"
                                />
                                {/* Overlay para darle ese tono oscuro/branding si la imagen es muy brillante */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent opacity-80 z-20 pointer-events-none"></div>
                            </div>

                            {/* Textos de la celda */}
                            <div className="relative z-10 p-8 flex flex-col flex-1">
                                <h4 className="text-xl md:text-2xl font-bold mb-3 font-[var(--font-unbounded)] text-[var(--color-text-main)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">{group.title}</h4>
                                <p className="text-gray-400 font-light leading-relaxed line-clamp-3">{group.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TargetAudience;
