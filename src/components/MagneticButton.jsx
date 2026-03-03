import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({ children, className = "", scale = 1.1, distance = 20 }) {
    const magneticRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Media query para deshabilitar en touch/móviles
        const mql = window.matchMedia('(pointer: fine)');
        if (!mql.matches) return; // Solo actuar en dispositivos con ratón exacto

        const magneticElement = magneticRef.current;
        if (!magneticElement) return;

        // Elemento interno (children) para darle más offset (efecto paralaje)
        const contentElement = magneticElement.querySelector('.magnetic-content');

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magneticElement.getBoundingClientRect();

            // Calcular posición relativa al centro
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Usar GSAP para mover suavemente hacia el cursor
            // offset límite: 'distance' prop
            gsap.to(magneticElement, {
                x: (x / width) * distance,
                y: (y / height) * distance,
                duration: 1,
                ease: 'power3.out',
            });

            if (contentElement) {
                gsap.to(contentElement, {
                    x: (x / width) * (distance / 2),
                    y: (y / height) * (distance / 2),
                    duration: 1,
                    ease: 'power3.out',
                });
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            // Volver a la posición 0 como un elástico
            gsap.to(magneticElement, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)',
            });

            if (contentElement) {
                gsap.to(contentElement, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.3)',
                });
            }
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
        };

        magneticElement.addEventListener('mousemove', handleMouseMove);
        magneticElement.addEventListener('mouseleave', handleMouseLeave);
        magneticElement.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            magneticElement.removeEventListener('mousemove', handleMouseMove);
            magneticElement.removeEventListener('mouseleave', handleMouseLeave);
            magneticElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [distance]);

    return (
        <div
            ref={magneticRef}
            className={`inline-block relative z-10 ${className}`}
        >
            <div className="magnetic-content w-full h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
