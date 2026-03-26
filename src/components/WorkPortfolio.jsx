import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import CaseStudyModal from './CaseStudyModal';


gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
    {
        client: "GymForge",
        niche: "Fitness",
        metric: "+312%",
        metricText: "Reservas Semanales",
        image: "/portfolio-captures/gymforge.png",
        colSpan: "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2",
        bgColor: "bg-zinc-900",
        url: null,
        hasCaseStudy: true,
        caseData: {
            title: "De 0 a +50 consultas semanales por WhatsApp.",
            client: "GymForge",
            image: "/portfolio-captures/gymforge.png",
            metrics: [
                { value: "+312%", label: "Reservas" },
                { value: "48hs", label: "Tiempo de Entrega" },
                { value: "+50", label: "Leads Semanales" }
            ],
            challenge: "GymForge es un gimnasio de primer nivel en Villa Mercedes, San Luis. Su problema no era la falta de calidad en su servicio, sino la invisibilidad digital. Necesitaban presencia web urgente para captar a las decenas de personas que buscan dónde entrenar en la ciudad cada semana, pero no querían una página lenta, genérica ni aburrida que nadie iba a leer.",
            solution: "Detectamos que su cliente ideal toma decisiones rápidas desde el celular. Por eso, en lugar de un sitio web informativo tradicional, construimos una Landing Page de Alta Conversión en tiempo récord (48 horas). Eliminamos todas las distracciones y centramos el diseño en un solo llamado a la acción con estética minimalista y oscura.",
            result: "Al tener una presencia web profesional y orientada directamente a la venta, GymForge pasó de no tener presencia a recibir más de 50 consultas semanales automatizadas directamente a su WhatsApp, llenando sus cupos y consolidándose como líderes en la zona."
        }
    },
    {
        client: "LexPartners",
        niche: "Abogados",
        metric: "CPA $4.20",
        metricText: "Reducción de Costo por Lead",
        image: "/portfolio-captures/lexpartners.png",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-2 lg:row-span-1",
        bgColor: "bg-[#0A0F1A]",
        url: "https://juridico-delta.vercel.app/"
    },
    {
        client: "HwaRang TKD",
        niche: "Deportes",
        metric: "+180%",
        metricText: "Inscripciones mensuales",
        image: "/portfolio-captures/hwarang_tkd.png",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-2 lg:row-span-1",
        bgColor: "bg-[#0D1A0A]",
        url: "https://hwarang-tkd.vercel.app/"
    },
    {
        client: "Rustica Grill",
        niche: "Restaurante",
        metric: "Sold Out",
        metricText: "Mesas fines de semana",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-2 lg:row-span-1",
        bgColor: "bg-[#1A110D]",
        url: null
    },
    {
        client: "Aldea La Adelina",
        niche: "Emprendedores",
        metric: "+95%",
        metricText: "Consultas recibidas",
        image: "/portfolio-captures/aldea_la_adelina.png",
        colSpan: "col-span-1 md:col-span-1 lg:col-span-3 lg:row-span-1",
        bgColor: "bg-[#0A0A1A]",
        url: "https://aldea-la-adelina.vercel.app/"
    }
];


const WorkPortfolio = ({ openForm }) => {
    const sectionRef = useRef(null);
    const [selectedCase, setSelectedCase] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.portfolio-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.portfolio-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.portfolio-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );

            // Efecto Parallax en imágenes
            gsap.utils.toArray('.portfolio-image').forEach((img) => {
                gsap.to(img, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 bg-[var(--color-primary-light)]">
            <div className="flex flex-col md:flex-row justify-between items-end portfolio-header mb-16 gap-8">
                <div className="text-left max-w-2xl">
                    <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4">No Confiamos en Teorías</h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight">
                        <AnimatedText text="Diseños que" delay={0.1} />
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF4F00]">multiplican ingresos.</span>
                    </h3>
                </div>
                <div className="pb-2 hidden md:block">
                    <button className="group flex items-center gap-2 font-[var(--font-unbounded)] font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors">
                        Ver todos los casos <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Asymmetric Bento Grid for Portfolio */}
            <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-[400px]">
                {portfolioItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={`portfolio-card ${item.colSpan} ${item.bgColor} rounded-3xl overflow-hidden relative group cursor-none`}
                    >
                        {/* Overlay gradient para asegurar legibilidad */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

                        {/* Imagen con Parallax */}
                        <div className="absolute inset-0 -top-[20%] h-[140%] w-full">
                            <img
                                src={item.image}
                                alt={item.client}
                                className="portfolio-image w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Contenido (Textos Flotantes) */}
                        <div className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-[var(--font-unbounded)] uppercase tracking-wider rounded-full border border-white/20">
                                    {item.niche}
                                </span>
                                {/* Ícono de enlace superior derecho */}
                                {item.url ? (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/20 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]"
                                    >
                                        <ArrowUpRight className="w-6 h-6 text-white" />
                                    </a>
                                ) : item.hasCaseStudy ? (
                                    <button
                                        onClick={() => setSelectedCase(item.caseData)}
                                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-[var(--color-accent)] hover:bg-[var(--color-accent)]"
                                    >
                                        <ArrowUpRight className="w-6 h-6 text-white" />
                                    </button>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/20">
                                        <ArrowUpRight className="w-6 h-6 text-white" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="text-3xl md:text-4xl font-bold text-white font-[var(--font-unbounded)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                                    {item.client}
                                </h4>
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-3xl font-bold text-[#FF4F00]">{item.metric}</span>
                                    <span className="text-gray-300 text-sm font-light">{item.metricText}</span>
                                </div>
                                {/* Botón "Ver ejemplo" */}
                                {item.url ? (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-2 text-xs font-semibold font-[var(--font-unbounded)] px-4 py-2 rounded-full bg-white/10 hover:bg-[var(--color-accent)] backdrop-blur-md border border-white/20 hover:border-[var(--color-accent)] text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,79,0,0.4)]"
                                    >
                                        Ver ejemplo <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                ) : item.hasCaseStudy ? (
                                    <button
                                        onClick={() => setSelectedCase(item.caseData)}
                                        className="inline-flex items-center gap-2 text-xs font-semibold font-[var(--font-unbounded)] px-4 py-2 rounded-full bg-[var(--color-accent)]/80 hover:bg-[var(--color-accent)] backdrop-blur-md border border-[var(--color-accent)] text-white transition-all duration-200 shadow-[0_0_15px_rgba(255,79,0,0.2)] hover:shadow-[0_0_25px_rgba(255,79,0,0.5)]"
                                    >
                                        Ver Caso de Estudio <ArrowUpRight className="w-3.5 h-3.5" />
                                    </button>
                                ) : (
                                    <div className="inline-flex items-center gap-2 text-xs font-semibold font-[var(--font-unbounded)] px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400">
                                        En construcción
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 md:hidden flex justify-center">
                <button className="group flex items-center gap-2 font-[var(--font-unbounded)] font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors border border-[var(--color-border)] px-6 py-3 rounded-full">
                    Ver todos los casos <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
            <CaseStudyModal 
                isOpen={!!selectedCase} 
                onClose={() => setSelectedCase(null)} 
                data={selectedCase} 
                openForm={openForm}
            />
        </section>
    );
};

export default WorkPortfolio;
