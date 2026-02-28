import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({ text, className = "", Component = "h1", delay = 0 }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Seleccionamos las palabras generadas
        const words = containerRef.current.querySelectorAll('.word-wrapper > span');

        gsap.fromTo(words,
            {
                y: '100%',
                opacity: 0,
            },
            {
                y: '0%',
                opacity: 1,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out",
                delay: delay,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", // Cuando el elemento entra al 85% del viewport
                    toggleActions: "play none none reverse", // Se reproduce al bajar, retrocede al subir
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [text, delay]);

    // Dividir el texto por palabras para envolverlas de forma segura sin romper emojis o espacios HTML
    const words = text.split(' ');

    return (
        <Component ref={containerRef} className={`${className} flex flex-wrap gap-x-3`}>
            {words.map((word, i) => (
                <span key={i} className="word-wrapper overflow-hidden inline-flex">
                    <span className="inline-block translate-y-full opacity-0">{word}</span>
                </span>
            ))}
        </Component>
    );
}
