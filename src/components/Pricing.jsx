import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Star } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
        title: 'Landing / One-Page',
        desc: 'Ideal para campañas publicitarias, lanzamientos de servicios o captación rápida de leads.',
        time: '1 a 2 semanas',
        cta: 'Empezar mi Landing Page',
        features: [
            'Diseño de 1 sola página enfocado en conversión',
            'Formularios estratégicos (leads)',
            'Optimización total para móviles',
            'Integración directa con WhatsApp',
            'Carga ultrarrápida estructurada para Ads'
        ],
        isPopular: false,
    },
    {
        title: 'Sitio Institucional',
        desc: 'La solución completa para pymes y profesionales que buscan consolidar su autoridad digital.',
        time: '3 a 4 semanas',
        cta: 'Crear mi Sitio Web',
        features: [
            'Múltiples secciones (Inicio, Nosotros, etc)',
            'Diseño UI/UX a medida y profesional',
            'Estructura preparada para SEO en Google',
            'Conexión con Analytics para medir visitas',
            'Asesoría integral (dominio y hosting)'
        ],
        isPopular: true,
    },
    {
        title: 'Rediseño y Modernización',
        desc: 'El salvavidas para negocios con páginas antiguas, lentas o que dan una mala imagen móvil.',
        time: '2 a 3 semanas',
        cta: 'Renovar mi página web',
        features: [
            'Auditoría técnica y visual actual',
            'Renovación completa hacia diseño moderno',
            'Mejora de UX para retener clientes',
            'Reescritura del código actual',
            'Adaptación perfecta (Mobile-First)'
        ],
        isPopular: false,
    }
];

const Pricing = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.pricing-header',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.pricing-card',
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: '.pricing-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-[var(--color-primary-light)]">
            <div className="text-center pricing-header mb-20 max-w-3xl mx-auto">
                <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4">Inversión Transparente</h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight mb-6 flex flex-col items-center">
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        <AnimatedText text="Diseñamos el" delay={0.1} Component="span" className="inline-flex" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF9500] pb-1 translate-y-1">motor</span>
                    </div>
                    <AnimatedText text="de tu negocio." delay={0.3} Component="span" className="inline-flex mt-2 justify-center" />
                </h3>
                <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto mt-4">Selecciona el ecosistema que necesitas para empezar a escalar de inmediato con tecnología moderna y diseño enfocado 100% en conversión.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pricing-grid items-center lg:items-stretch">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`pricing-card group relative rounded-3xl p-8 xl:p-10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2
                            ${plan.isPopular
                                ? 'bg-[#040405] border border-gray-800 hover:border-[var(--color-accent)] shadow-[0_0_40px_rgba(255,79,0,0.05)] lg:-mt-8 lg:mb-8 text-white z-20'
                                : 'bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-xl text-[var(--color-text-main)] z-10 mt-0 lg:mt-8 md:min-h-[600px]'}
                        `}
                    >
                        {/* Efecto Glow de fondo para tarjeta premium */}
                        {plan.isPopular && (
                            <>
                                <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay rounded-3xl pointer-events-none"></div>
                                <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[var(--color-accent)]/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-white px-4 py-1 rounded-full text-xs font-bold font-[var(--font-unbounded)] tracking-wider uppercase flex items-center gap-1 shadow-lg shadow-[var(--color-accent)]/30 animate-pulse">
                                    <Star className="w-3 h-3 fill-current" /> Más Popular
                                </div>
                            </>
                        )}

                        <div className="relative z-10">
                            <h4 className={`text-2xl font-bold mb-3 font-[var(--font-unbounded)] ${plan.isPopular ? 'text-white' : 'text-[var(--color-text-main)]'}`}>{plan.title}</h4>
                            <p className={`font-light mb-8 pb-8 border-b ${plan.isPopular ? 'text-gray-400 border-gray-800' : 'text-gray-400 border-[var(--color-border)]'}`}>
                                {plan.desc}
                            </p>

                            <ul className="flex flex-col gap-4 mb-8">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-3">
                                        <div className={`mt-0.5 rounded-full p-1 shrink-0 ${plan.isPopular ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]' : 'bg-[#1F2128] text-[var(--color-accent)]'}`}>
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className={`text-sm md:text-base leading-snug ${plan.isPopular ? 'text-gray-300' : 'text-gray-300'}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-8 pt-8 border-t border-dashed relative z-10 flex flex-col gap-6 w-full ${plan.isPopular ? 'border-gray-800' : 'border-[var(--color-border)]'}">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className={plan.isPopular ? 'text-gray-400' : 'text-gray-400'}>Entrega est.:</span>
                                <span className={`px-2 py-1 rounded bg-opacity-20 ${plan.isPopular ? 'text-[var(--color-accent)] bg-[var(--color-accent)]' : 'text-gray-300 bg-[#1F2128]'}`}>{plan.time}</span>
                            </div>

                            <button className={`w-full py-4 rounded-xl font-[var(--font-unbounded)] font-bold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group/btn
                                ${plan.isPopular
                                    ? 'btn-liquid bg-[var(--color-accent)] text-white hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] border-none'
                                    : 'bg-transparent border border-[var(--color-text-main)] text-[var(--color-text-main)] hover:text-white'
                                }`}
                            >
                                {/* Efecto de llenado invertido para las estándar */}
                                {!plan.isPopular && (
                                    <span className="absolute inset-0 bg-[var(--color-text-main)] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></span>
                                )}
                                <span className="relative z-10 flex items-center gap-2">{plan.cta} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></span>

                                {/* Div extra para LiquidBtn en Premium */}
                                {plan.isPopular && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Pricing;
