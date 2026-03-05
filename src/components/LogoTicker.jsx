import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Logos premium en SVG vectorial (transparentes y perfectos para Dark Mode)
const logos = [
    { name: "Alpha Fitness", d: "M2 22l10-20 10 20H2zm10-16.5L6.5 19h11L12 5.5z" }, // Montaña / Delta (Alpha)
    { name: "Alarcón Legal", d: "M12 2L2 7v2h20V7L12 2zm-5 7v9H5V9h2zm4 0v9h-2V9h2zm4 0v9h-2V9h2zm4 0v9h-2V9h2zM2 20v2h20v-2H2z" }, // Columnas clásicas (Derecho/Legal)
    { name: "Horizon Real Estate", d: "M3 21h18v-2H3v2zm12-11V4h-6v6H4v9h16v-9h-5zm-2 7h-2v-4h2v4z" }, // Edificios con horizonte
    { name: "NovaTech Solutions", d: "M12 2L2 12l10 10 10-10L12 2zm0 14.5L7.5 12 12 7.5 16.5 12 12 16.5z" }, // Rombo tecnológico puro
    { name: "Zenith Capital", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" } // Círculo/Moneda corporativa
];

const LogoTicker = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        // Animación infinita con GSAP para el banner de logos
        const marqueeElements = gsap.utils.toArray('.marquee-content');

        gsap.to(marqueeElements, {
            xPercent: -100,
            repeat: -1,
            duration: 50, // Velocidad más lenta y elegante
            ease: "linear"
        });
    }, []);

    // Duplicamos el array para crear la ilusión de scroll infinito sin saltos
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <section className="py-12 border-b border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden flex flex-col items-center">

            <p className="text-gray-500 font-medium text-xs tracking-widest uppercase mb-8 font-[var(--font-unbounded)] text-center">
                Empresas que escalaron con nuestros embudos
            </p>

            <div className="w-full relative flex items-center overflow-hidden">
                {/* Degradados laterales para fundir los logos al entrar/salir del viewport */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-surface)] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-surface)] to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-[200%] gap-16 md:gap-32 px-8" ref={marqueeRef}>
                    <div className="flex gap-16 md:gap-32 marquee-content whitespace-nowrap items-center">
                        {duplicatedLogos.map((logo, idx) => (
                            <div key={`logo-1-${idx}`} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                    <path d={logo.d} />
                                </svg>
                                <span className="font-[var(--font-unbounded)] font-bold text-lg md:text-xl text-[var(--color-text-main)]">{logo.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Clones explícitos para asegurar el loop perfecto en pantallas ultrawide */}
                    <div className="flex gap-16 md:gap-32 marquee-content whitespace-nowrap items-center">
                        {duplicatedLogos.map((logo, idx) => (
                            <div key={`logo-2-${idx}`} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                    <path d={logo.d} />
                                </svg>
                                <span className="font-[var(--font-unbounded)] font-bold text-lg md:text-xl text-[var(--color-text-main)]">{logo.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoTicker;
