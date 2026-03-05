import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, TrendingUp, DollarSign, HandCoins } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const ROICalculator = () => {
    const sectionRef = useRef(null);
    const resultRef = useRef(null);

    // Estados para los simuladores
    const [traffic, setTraffic] = useState(3000);
    const [ticketSize, setTicketSize] = useState(500);

    // Constantes de mercado
    const currentConversionRate = 0.01; // 1%
    const optimizedConversionRate = 0.04; // 4%

    // Cálculos
    const currentClients = Math.round(traffic * currentConversionRate);
    const currentRevenue = currentClients * ticketSize;

    const optimizedClients = Math.round(traffic * optimizedConversionRate);
    const optimizedRevenue = optimizedClients * ticketSize;

    const extraRevenue = optimizedRevenue - currentRevenue;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.roi-header',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.roi-panel',
                { opacity: 0, scale: 0.95, y: 40 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animación del número de resultado cuando cambian los valores
    useEffect(() => {
        if (resultRef.current) {
            gsap.fromTo(resultRef.current,
                { opacity: 0.5, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
            );
        }
    }, [extraRevenue]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <section id="roi-calculator" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 bg-[var(--color-primary-light)]">

            <div className="text-center roi-header mb-16 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-6">
                    <Calculator className="w-4 h-4" /> Simulador de Crecimiento
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-main)] font-[var(--font-unbounded)] leading-tight flex flex-col items-center justify-center text-center">
                    <AnimatedText text="Descubre cuánto dinero" delay={0.1} />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FF9500] mt-2 block">estás perdiendo.</span>
                </h3>
                <p className="mt-6 text-gray-400 text-lg font-light">
                    Una landing page genérica convierte al 1%. Nuestro diseño optimizado apunta al 4%+. Mueve los controles y ve el dinero extra que generarías mensualmente.
                </p>
            </div>

            <div className="roi-panel grid grid-cols-1 lg:grid-cols-5 gap-8 bg-[#040405] border border-gray-800 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Glow Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[120px] pointer-events-none -z-0"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF4F00]/10 rounded-full blur-[100px] pointer-events-none -z-0"></div>

                {/* Controles de Input (Izquierda) */}
                <div className="lg:col-span-3 flex flex-col gap-10 relative z-10">
                    <div>
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h4 className="text-xl font-bold font-[var(--font-unbounded)] text-white flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
                                    Tráfico Mensual
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">Visitas estimadas a tu página web</p>
                            </div>
                            <span className="text-2xl font-bold text-[var(--color-accent)] font-[var(--font-unbounded)]">
                                {traffic.toLocaleString()}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="50000"
                            step="500"
                            value={traffic}
                            onChange={(e) => setTraffic(Number(e.target.value))}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                            <span>500</span>
                            <span>50,000+</span>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h4 className="text-xl font-bold font-[var(--font-unbounded)] text-white flex items-center gap-2">
                                    <HandCoins className="w-5 h-5 text-[var(--color-accent)]" />
                                    Ticket Promedio
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">Valor promedio de cada nuevo cliente</p>
                            </div>
                            <span className="text-2xl font-bold text-[var(--color-accent)] font-[var(--font-unbounded)]">
                                {formatCurrency(ticketSize)}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="5000"
                            step="50"
                            value={ticketSize}
                            onChange={(e) => setTicketSize(Number(e.target.value))}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                        />
                        <div className="flex justify-between text-xs text-gray-600 mt-2">
                            <span>$50</span>
                            <span>$5,000+</span>
                        </div>
                    </div>

                    {/* Fila de Comparación Actual vs Proyectado */}
                    <div className="grid grid-cols-2 gap-4 mt-4 p-5 bg-[#141517]/50 rounded-2xl border border-gray-800/50">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Web Aburrida (1%)</p>
                            <p className="text-xl font-bold text-gray-300 font-[var(--font-unbounded)]">{currentClients} clientes</p>
                            <p className="text-sm text-gray-500">{formatCurrency(currentRevenue)}/mes</p>
                        </div>
                        <div className="border-l border-gray-800 pl-4">
                            <p className="text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                Landing Agency (4%) <span className="animate-pulse">🚀</span>
                            </p>
                            <p className="text-xl font-bold text-white font-[var(--font-unbounded)]">{optimizedClients} clientes</p>
                            <p className="text-sm text-gray-300">{formatCurrency(optimizedRevenue)}/mes</p>
                        </div>
                    </div>
                </div>

                {/* Display Final (Derecha) */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[var(--color-accent)] to-[#CC3F00] rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-[0_0_40px_rgba(255,79,0,0.3)]">
                    <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10 w-full">
                        <DollarSign className="w-12 h-12 text-white/50 mx-auto mb-4" />
                        <h4 className="text-lg text-white/90 font-medium mb-2 uppercase tracking-wide">
                            Ingreso Extra Mensual
                        </h4>

                        <div ref={resultRef} className="text-5xl md:text-6xl font-bold font-[var(--font-unbounded)] text-white drop-shadow-md mb-2">
                            +{formatCurrency(extraRevenue)}
                        </div>

                        <p className="text-white/80 text-sm mt-6 bg-black/20 px-4 py-2 rounded-full inline-block backdrop-blur-sm border border-white/10">
                            Lo que dejas en la mesa cada mes.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ROICalculator;
