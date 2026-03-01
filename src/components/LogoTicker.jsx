import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Logos genéricos en SVG (Placeholders hiper limpios)
const logos = [
    { name: "Acme Corp", d: "M12 2L2 22h20L12 2zm0 6l5 10H7l5-10z" },
    { name: "Globex", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" },
    { name: "Soylent", d: "M21 3H3v18h18V3zM19 19H5V5h14v14zM11 7h2v2h-2zm0 4h2v6h-2z" },
    { name: "Initech", d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
    { name: "Umbrella", d: "M12 2L1 21h22L12 2zm0 3.83L18.4 19H5.6L12 5.83z" }
];

const LogoTicker = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        // Animación infinita con GSAP para el banner de logos
        const marqueeElements = gsap.utils.toArray('.marquee-content');

        gsap.to(marqueeElements, {
            xPercent: -100,
            repeat: -1,
            duration: 30, // Velocidad del ticker
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
                            <div key={`logo-1-${idx}`} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale grayscale-100">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text-main)]">
                                    <path d={logo.d} />
                                </svg>
                                <span className="font-[var(--font-unbounded)] font-bold text-lg md:text-xl text-[var(--color-text-main)]">{logo.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Clones explícitos para asegurar el loop perfecto en pantallas ultrawide */}
                    <div className="flex gap-16 md:gap-32 marquee-content whitespace-nowrap items-center">
                        {duplicatedLogos.map((logo, idx) => (
                            <div key={`logo-2-${idx}`} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale grayscale-100">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-text-main)]">
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
