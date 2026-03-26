import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Carlos Mendoza",
        role: "Dueño de Crossfit Alpha",
        content: "Antes teníamos visitas pero nadie dejaba su contacto. Desde que lanzaron la nueva web, pasamos de 2 a 15 reservas de clases de prueba por día. El cambio es brutal.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=carlos"
    },
    {
        name: "Dra. Sofía Alarcón",
        role: "Socia de Alarcón Abogados",
        content: "Transmitir exclusividad y confianza era nuestra prioridad. El diseño no solo superó nuestras expectativas, sino que nuestros clientes ahora nos perciben como la firma top de la ciudad.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=sofia"
    },
    {
        name: "Martín Rivas",
        role: "Fundador de TechSolutions",
        content: "El tiempo de entrega fue récord y la tasa de conversión de nuestra landing page se disparó un 300%. Entienden perfectamente cómo fusionar diseño premium con psicología de ventas.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=martin"
    }
];

const Testimonials = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.testimonial-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.testimonial-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: '.testimonials-grid', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-[var(--color-primary-light)]">
            <div className="text-center testimonial-header mb-20 w-full flex flex-col items-center">
                <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4 text-center">Prueba Social</h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight flex flex-col items-center justify-center text-center">
                    <AnimatedText text="No lo decimos" delay={0.1} />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF4F00] mt-2 block">nosotros.</span>
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 testimonials-grid">
                {testimonials.map((test, idx) => (
                    <div
                        key={idx}
                        className="testimonial-card relative bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-3xl hover:border-[var(--color-accent)]/50 transition-colors duration-300 group flex flex-col justify-between"
                    >
                        {/* Icono de comillas de fondo */}
                        <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 group-hover:-translate-y-1 transition-all duration-300">
                            <Quote size={60} />
                        </div>

                        <div>
                            {/* Estrellas */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(test.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                                ))}
                            </div>

                            <p className="text-gray-300 font-light leading-relaxed mb-8 relative z-10">
                                "{test.content}"
                            </p>
                        </div>

                        {/* Info del Cliente */}
                        <div className="flex items-center gap-4 relative z-10 border-t border-[var(--color-border)] pt-6">
                            <img
                                src={test.image}
                                alt={test.name}
                                width={48}
                                height={48}
                                loading="lazy"
                                decoding="async"
                                className="w-12 h-12 rounded-full border border-gray-700 object-cover"
                            />
                            <div>
                                <h4 className="font-[var(--font-unbounded)] font-bold text-white text-sm">{test.name}</h4>
                                <p className="text-gray-500 text-xs">{test.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
