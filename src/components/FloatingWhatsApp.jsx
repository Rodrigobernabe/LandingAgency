import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
    const buttonRef = useRef(null);

    useEffect(() => {
        // Subtle floating and glowing animation
        gsap.to(buttonRef.current, {
            y: -10,
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    }, []);

    return (
        <a
            href="https://wa.me/numerodetelefono" // Add phone number here e.g. https://wa.me/5491112345678
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 group"
            aria-label="Contactar por WhatsApp"
        >
            <div
                ref={buttonRef}
                className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full text-white shadow-lg hover:bg-[#20BE5A] transition-colors duration-300"
            >
                {/* Glow behind the button */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 -z-10"></div>

                <MessageCircle className="w-8 h-8 fill-current" />

                {/* Custom tooltip on hover */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-main)] text-sm font-medium rounded-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap hidden sm:block">
                    Hablemos por WhatsApp
                </div>
            </div>
        </a>
    );
};

export default FloatingWhatsApp;
