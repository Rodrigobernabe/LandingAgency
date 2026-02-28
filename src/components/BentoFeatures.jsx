import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Smartphone, MessageCircle, PenTool } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const BentoFeatures = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.bento-header',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.bento-item',
                { opacity: 0, scale: 0.95, y: 40 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: '.bento-grid-container', start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );

            // Floating animation for UI mockups
            gsap.to('.float-ui', {
                y: -10,
                duration: 2,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1,
                stagger: 0.2
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-[var(--color-primary-light)]">
            <div className="flex flex-col md:flex-row justify-between items-end bento-header mb-16 gap-8">
                <div className="text-left">
                    <h2 className="text-sm font-[var(--font-unbounded)] font-semibold text-[var(--color-accent)] tracking-widest uppercase mb-4">La Máquina de Ventas</h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight">
                        <AnimatedText text="Más que un" delay={0.1} Component="span" className="inline-flex mr-3" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF9500]">folleto digital.</span>
                        <br />
                        <AnimatedText text="Diseñadas para captar." delay={0.3} className="text-3xl md:text-4xl lg:text-5xl mt-2 text-gray-400" />
                    </h3>
                </div>
            </div>

            <div className="bento-grid-container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[minmax(280px,auto)]">

                {/* Velocidad - Large Item */}
                <div className="bento-item col-span-1 md:col-span-4 lg:col-span-4 lg:row-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12 rounded-3xl flex flex-col justify-between transition-all duration-500 hover:border-[var(--color-accent)] hover:shadow-[0_20px_60px_-15px_rgba(255,79,0,0.15)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>

                    {/* Status Badge */}
                    <div className="relative z-10 flex items-center gap-3 mb-10 bg-green-500/10 w-fit px-4 py-2 rounded-full border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-green-500 text-sm font-semibold tracking-wide uppercase">Sistemas Operativos</span>
                    </div>

                    <div className="absolute -right-12 -top-12 opacity-[0.03] group-hover:opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                        <Zap className="w-64 h-64 text-[var(--color-accent)]" />
                    </div>

                    <div className="relative z-10 max-w-lg mt-auto">
                        <h4 className="text-3xl md:text-5xl font-bold mb-6 font-[var(--font-unbounded)] leading-tight">Lanzamiento <br /><span className="text-[var(--color-accent)]">en 48hs</span></h4>
                        <p className="text-gray-500 font-light text-lg">No más esperas infinitas. Metodología ágil que transforma tu idea en una landing transaccional en tiempo récord, para que empieces a facturar hoy.</p>
                    </div>
                </div>

                {/* Mobile First */}
                <div className="bento-item col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-3xl flex flex-col transition-all duration-500 hover:border-[var(--color-text-main)] hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.05)] group overflow-hidden relative">
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#1F2128] rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Mock UI: Mobile Notification */}
                    <div className="float-ui relative z-10 w-full bg-[#1A1A24] border border-white/10 rounded-xl p-4 mb-auto shadow-lg flex items-center gap-4 transition-transform group-hover:scale-[1.03]">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <Smartphone className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <div className="h-2 w-20 bg-gray-600 rounded-full mb-2"></div>
                            <div className="h-2 w-12 bg-gray-700 rounded-full"></div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-8">
                        <h4 className="text-xl font-bold mb-3 font-[var(--font-unbounded)]">Pensado para el Celular</h4>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">El 80% de tus clientes te verán desde su móvil. Aseguramos una experiencia que fluye perfecto donde más importa.</p>
                    </div>
                </div>

                {/* Frictionless / WhatsApp */}
                <div className="bento-item col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 bg-[#1A1A24] border border-gray-800 p-8 rounded-3xl flex flex-col transition-all duration-500 hover:border-[#25D366] hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.15)] group overflow-hidden relative">
                    <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#25D366] rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none z-0"></div>

                    {/* Mock UI: WhatsApp Message */}
                    <div className="float-ui relative z-10 w-fit bg-[#25D366] rounded-t-2xl rounded-br-2xl rounded-bl-sm p-4 mb-auto shadow-lg text-white ml-auto">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">¡Nueva Reserva!</span>
                        </div>
                    </div>

                    <div className="relative z-10 mt-8">
                        <h4 className="text-xl font-bold mb-3 font-[var(--font-unbounded)] text-white">Fricción Cero</h4>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">Integración directa a un toque hacia WhatsApp, Calendly o tu CRM favorito. Que hablen contigo sin pensarlo.</p>
                    </div>
                </div>

                {/* Copywriting / Textos que Venden */}
                <div className="bento-item col-span-1 md:col-span-4 lg:col-span-6 lg:row-span-1 bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between transition-all duration-500 hover:border-[var(--color-border)] hover:shadow-sm group overflow-hidden relative">
                    <div className="max-w-3xl relative z-10">
                        <h4 className="text-2xl md:text-3xl font-bold mb-4 font-[var(--font-unbounded)]">Textos que Venden</h4>
                        <p className="text-gray-400 font-light leading-relaxed text-lg">Un diseño premium no sirve si el mensaje no convence. Aplicamos principios de <span className="text-[var(--color-text-main)] font-semibold">Copywriting Científico</span> para derribar objeciones y guiar instintivamente al usuario hacia el clic final.</p>
                    </div>

                    <div className="relative z-10 hidden mt-6 md:mt-0 flex-shrink-0 md:flex items-center justify-center p-6 bg-[#1F2128] border border-gray-800 rounded-full transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110">
                        <PenTool className="w-10 h-10 text-[var(--color-accent)]" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BentoFeatures;
