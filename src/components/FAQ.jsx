import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        question: "¿Por qué valen más sus landings que las de Fiverr?",
        answer: "Porque no te vendemos código. Te vendemos un sistema diseñado con arquitectura psicológica para que, con la misma inversión en pauta, cierres el triple de clientes. Fiverr te entrega un folleto digital; nosotros te entregamos un vendedor online 24/7."
    },
    {
        question: "¿Cuánto tardan en entregar la web lista?",
        answer: "Trabajamos rápido porque no perdemos tiempo en burocracia. Desde la llamada de onboarding inicial, tendrás tu landing construida, con el copywriting instalado y lista para recibir tráfico en exactamente 48 a 72 horas hábiles."
    },
    {
        question: "¿El desarrollo incluye el texto persuasivo (Copy)?",
        answer: "Absolutamente sí. El 80% de por qué una landing convierte es el texto. Nuestro Copywriter investigará tu industria, tus competidores y los miedos de tu cliente ideal para redactar textos que ataquen sus objeciones de inmediato."
    },
    {
        question: "¿Hay mantenimientos o pagos recurrentes obligatorios?",
        answer: "No. Puedes elegir el pago único por el desarrollo o, si quieres despreocuparte por completo, ofrecemos un plan de suscripción que incluye hosting ultra-rápido, gestión de dominios y cambios ilimitados mensuales."
    }
];

const FAQ = () => {
    const sectionRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(0); // El primero abierto por defecto

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.faq-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.faq-item',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.faq-list', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 bg-[var(--color-primary-light)]">
            <div className="text-center faq-header mb-16 flex flex-col items-center w-full">
                <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4 text-center">Transparencia Radical</h2>
                <h3 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight mb-6 flex flex-col items-center justify-center text-center">
                    <AnimatedText text="Todas tus dudas," delay={0.1} />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF4F00] mt-2 block">resueltas.</span>
                </h3>
            </div>

            <div className="faq-list flex flex-col gap-4">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <div
                            key={idx}
                            onClick={() => toggleFAQ(idx)}
                            className={`faq-item group cursor-pointer border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                                ? 'bg-[var(--color-surface)] border-[var(--color-accent)] shadow-[0_4px_30px_rgba(255,79,0,0.1)]'
                                : 'bg-[var(--color-primary-light)] border-[var(--color-border)] hover:border-gray-600'
                                }`}
                        >
                            <div className="p-6 md:p-8 flex justify-between items-center gap-4">
                                <h4 className={`text-lg md:text-xl font-[var(--font-unbounded)] font-medium transition-colors ${isOpen ? 'text-[var(--color-accent)]' : 'text-gray-300 group-hover:text-white'}`}>
                                    {faq.question}
                                </h4>
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[var(--color-accent)] text-white rotate-45' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'}`}>
                                    <Plus className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Contenedor animado para la respuesta (Acordeón) */}
                            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="p-6 md:p-8 pt-0 text-gray-400 leading-relaxed font-light border-t border-white/5 mt-2">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQ;
