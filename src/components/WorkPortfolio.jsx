import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronRight, X } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
    {
        client: "GymForge",
        niche: "Fitness",
        countryCode: "AR",
        metric: "+312%",
        metricText: "Reservas Semanales",
        description: "Automatización de embudos para un centro de alto rendimiento. Resultados visibles en 3 meses.",
        image: "/portfolio-captures/gymforge.webp",
        url: "https://gymforge.app"
    },
    {
        client: "LexPartners",
        niche: "Abogados",
        countryCode: "ES",
        metric: "CPA $4.20",
        metricText: "Reducción de Costo por Lead",
        description: "Optimización de campañas de captación de leads cualificados en España.",
        image: "/portfolio-captures/lexpartners.webp",
        url: "https://juridico-delta.vercel.app/"
    },
    {
        client: "HwaRang TKD",
        niche: "Deportes",
        countryCode: "AR",
        metric: "+180%",
        metricText: "Inscripciones mensuales",
        description: "Rediseño completo de la experiencia web para una escuela de Taekwondo líder.",
        image: "/portfolio-captures/hwarang_tkd.webp",
        url: "https://tkd-orcin.vercel.app/"
    },
    {
        client: "Rustica Grill",
        niche: "Restaurante",
        status: "En Producción",
        countryCode: "AR",
        metric: "Sold Out",
        metricText: "Mesas fines de semana",
        description: "Sistema de reservas y presencia digital que llenó el local todos los fin de semana.",
        image: "https://images.unsplash.com/photo-1414235077428-338988a2e8c0?q=80&w=800&auto=format&fit=crop",
        url: "https://rustica-ashy.vercel.app/"
    },
    {
        client: "Aldea La Adelina",
        niche: "Emprendedores",
        countryCode: "AR",
        metric: "+95%",
        metricText: "Consultas recibidas",
        description: "Diseño de landing page inmersiva para potenciar el turismo y naturaleza.",
        image: "/portfolio-captures/aldea_la_adelina.webp",
        url: "https://aldea-la-adelina.vercel.app/"
    }
];

const WorkPortfolio = ({ openForm }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.portfolio-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            const cards = gsap.utils.toArray('.sticky-card');

            cards.forEach((card, index) => {
                if (index === cards.length - 1) return;

                gsap.to(card, {
                    scale: 0.95,
                    filter: "brightness(0.5)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top top",
                        end: () => `+=${window.innerHeight * 0.8}`,
                        scrub: true,
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 bg-black text-white px-4 md:px-8 relative z-10">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 portfolio-header">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-sm md:text-base font-medium text-zinc-400 mb-6 font-mono">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Casos de Estudio
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-[var(--font-unbounded)]">
                            Resultados <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#FF4F00]">
                                predecibles.
                            </span>
                        </h2>
                    </div>
                    <p className="text-zinc-400 max-w-md text-lg">
                        No nos contratas para hacer dibujitos bonitos. Nos contratas para facturar más.
                    </p>
                </div>

                {/* Contenedor de las tarjetas apilables */}
                <div ref={containerRef} className="portfolio-container relative flex flex-col pb-[10vh]">
                    {portfolioItems.map((item, index) => {
                        const topOffset = `calc(10vh + ${index * 24}px)`;

                        return (
                            <div
                                key={index}
                                style={{ top: topOffset, zIndex: 10 + index }}
                                className={`sticky-card sticky w-full min-h-[500px] lg:h-[75vh] mb-[15vh] overflow-hidden flex flex-col lg:flex-row rounded-[2rem] lg:rounded-3xl border border-white/5 bg-zinc-950 shadow-[0_-15px_50px_rgba(0,0,0,0.6)] border-t`}
                            >
                                {/* Panel Izquierdo: Contenido */}
                                <div className="relative w-full lg:w-5/12 z-20 flex flex-col justify-center p-8 pb-4 lg:pb-8 lg:p-12">
                                    {/* Header de la tarjeta */}
                                    <div className="flex items-center gap-3 mb-8 lg:mb-12">
                                        <span className="px-3 py-1 rounded-full border border-zinc-700 text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                                            {item.niche}
                                        </span>
                                        {item.status && (
                                            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold tracking-widest text-green-400 uppercase">
                                                {item.status}
                                            </span>
                                        )}
                                        <div
                                            className="w-6 h-6 rounded-full overflow-hidden border border-white/20 shadow-lg flex-shrink-0 bg-white/5"
                                            title={item.countryCode === 'AR' ? 'Argentina' : 'España'}
                                        >
                                            <img
                                                src={item.countryCode === 'AR' ? 'https://flagcdn.com/w80/ar.png' : 'https://flagcdn.com/w80/es.png'}
                                                alt={item.countryCode === 'AR' ? 'Bandera de Argentina' : 'Bandera de España'}
                                                className="w-full h-full object-cover scale-125"
                                            />
                                        </div>
                                    </div>

                                    {/* Título del Cliente */}
                                    <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8 lg:mb-auto tracking-tight font-[var(--font-unbounded)]">
                                        {item.client}
                                    </h3>

                                    {/* Métrica de Éxito Principal */}
                                    <div className="mt-4 lg:mt-0 mb-4 lg:mb-8">
                                        <div className="text-6xl md:text-7xl lg:text-[7rem] font-black text-[#FF4F00] tracking-tighter leading-none flex items-baseline font-[var(--font-unbounded)]">
                                            {item.metric}
                                        </div>
                                        <div className="text-xl lg:text-2xl font-medium text-zinc-400 mt-2">
                                            {item.metricText}
                                        </div>
                                    </div>

                                    {/* Descripción breve en móvil & desktop */}
                                    <p className="text-zinc-300 text-sm lg:text-base mb-8 max-w-sm hidden lg:block">
                                        {item.description}
                                    </p>
                                    <p className="text-zinc-300 text-sm lg:hidden mb-6 max-w-sm">
                                        {item.description}
                                    </p>

                                    {/* Botón / Call To Action */}
                                    {item.url ? (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-auto group inline-flex items-center justify-between w-full sm:w-fit bg-black hover:bg-orange-600 border border-zinc-800 hover:border-orange-500 rounded-full px-6 lg:px-8 py-4 lg:py-5 transition-all duration-300 ease-out overflow-hidden shadow-lg shadow-black/20">
                                            <span className="text-sm lg:text-base font-bold text-white tracking-widest uppercase transition-colors group-hover:text-white mr-6">
                                                Ver Proyecto en Vivo
                                            </span>
                                            <div className="bg-white group-hover:bg-black rounded-full w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center transition-colors">
                                                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-black group-hover:text-white transform group-hover:rotate-45 transition-transform duration-300" />
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="mt-auto text-gray-600 font-medium flex items-center gap-2 text-sm uppercase tracking-widest">
                                            En rediseño interno <ChevronRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                {/* Panel Derecho: Imagen / Mockup apilado en móvil, al lado en desktop */}
                                <div className="relative z-10 w-full lg:w-7/12 flex items-center justify-center p-6 pt-0 lg:p-12 overflow-hidden">
                                    {/* Degradado para unir visualmente el fondo oscuro con la imagen en desktop si está de fondo puro */}
                                    <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-zinc-950 to-transparent hidden lg:block z-10 pointer-events-none"></div>

                                    {/* Contenedor tipo "Browser Mockup" */}
                                    <div className="group/mockup relative w-full aspect-[4/3] lg:aspect-[16/10] xl:aspect-video rounded-xl lg:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-700 ease-out z-0 overflow-hidden bg-zinc-900 border-zinc-800 hover:scale-[1.02]">

                                        {/* Cabecera del navegador sintético */}
                                        <div className="flex h-6 lg:h-8 bg-zinc-900 border-b border-zinc-800 items-center px-3 lg:px-4 gap-1.5 lg:gap-2 z-20 relative w-full">
                                            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-red-500/80"></div>
                                            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-yellow-500/80"></div>
                                            <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-500/80"></div>
                                            <div className="ml-2 lg:ml-4 px-2 lg:px-3 py-0.5 rounded flex-1 lg:flex-none lg:rounded-md bg-black/40 text-[10px] lg:text-xs text-zinc-500 font-mono tracking-wider truncate lg:max-w-[200px] text-center lg:text-left">
                                                {item.url ? new URL(item.url).hostname : `${item.client.toLowerCase()}.com`}
                                            </div>
                                        </div>

                                        {/* Imagen de la web */}
                                        <div className="relative w-full h-[calc(100%-1.5rem)] lg:h-[calc(100%-2rem)] overflow-hidden bg-black">
                                            <img
                                                src={item.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"}
                                                alt={`Software / Pantalla web de ${item.client}`}
                                                className="w-full h-full object-cover object-top opacity-90 lg:opacity-100 lg:grayscale-[20%] transition-all duration-[4s] ease-in-out lg:group-hover/mockup:grayscale-0 lg:hover:object-bottom lg:scale-[1.01]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WorkPortfolio;
