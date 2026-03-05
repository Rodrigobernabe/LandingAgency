import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

// Secciones de navegación con sus IDs de destino
const NAV_LINKS = [
    { label: 'Proceso', href: '#proceso' },
    { label: 'Portafolio', href: '#portafolio' },
    { label: 'Precios', href: '#precios' },
    { label: 'FAQ', href: '#faq' },
];

const Navbar = ({ openForm }) => {
    const navRef = useRef(null);
    const pillRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Detectar scroll para expandir la pill con el logo
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animación de entrada de la navbar al montar
    useEffect(() => {
        gsap.fromTo(pillRef.current,
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
        );
    }, []);

    // Scroll suave al destino
    const handleNav = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            {/* Navbar flotante tipo pill */}
            <nav ref={navRef} className="fixed top-5 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
                <div
                    ref={pillRef}
                    className={`
                        pointer-events-auto flex items-center gap-6 px-5 py-3 rounded-full
                        border border-white/10 backdrop-blur-xl
                        shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)]
                        transition-all duration-500 ease-out
                        ${scrolled
                            ? 'bg-[#0a0a0c]/90 pl-3'
                            : 'bg-[#0a0a0c]/70'
                        }
                    `}
                >
                    {/* Logo — aparece al scrollear */}
                    <div className={`overflow-hidden transition-all duration-500 ease-out ${scrolled ? 'w-[36px] opacity-100 mr-1' : 'w-0 opacity-0'}`}>
                        <img src={logo} alt="Logo" className="h-[36px] w-[36px] object-contain" />
                    </div>

                    {/* Links de escritorio */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={(e) => handleNav(e, href)}
                                className="relative px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white rounded-full transition-colors duration-200 group"
                            >
                                {/* Hover background */}
                                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors duration-200"></span>
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* Separador */}
                    <div className="hidden md:block w-px h-5 bg-white/10"></div>

                    {/* CTA */}
                    <button
                        onClick={openForm}
                        className="hidden md:flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#E04500] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(255,79,0,0.3)] hover:shadow-[0_0_30px_rgba(255,79,0,0.5)] font-[var(--font-unbounded)]"
                    >
                        Contactar
                    </button>

                    {/* Botón hamburguesa (mobile) */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                        aria-label="Menú"
                    >
                        {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                </div>
            </nav>

            {/* Mobile dropdown */}
            <div className={`
                fixed top-[72px] left-4 right-4 z-[99]
                bg-[#0d0d0f]/95 backdrop-blur-xl border border-white/10 rounded-2xl
                shadow-[0_16px_48px_rgba(0,0,0,0.6)]
                transition-all duration-300 ease-out origin-top
                ${mobileOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
            `}>
                <div className="flex flex-col p-4 gap-1">
                    {NAV_LINKS.map(({ label, href }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={(e) => handleNav(e, href)}
                            className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-3">
                        <button
                            onClick={() => { setMobileOpen(false); openForm(); }}
                            className="w-full bg-[var(--color-accent)] text-white text-sm font-semibold px-5 py-3 rounded-xl font-[var(--font-unbounded)]"
                        >
                            Quiero mi Landing
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
