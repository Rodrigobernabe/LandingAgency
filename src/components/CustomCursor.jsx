import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;

        // Configurar GSAP quickSetter para mejor performance
        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");

        const onMouseMove = (e) => {
            // Centrar el cursor (ancho y alto aprox 40px -> offset de 20px)
            xSet(e.clientX - 20);
            ySet(e.clientY - 20);
        };

        const onMouseOver = (e) => {
            const target = e.target;
            // Comprobar si estamos sobre un elemento interactivo
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    useEffect(() => {
        // Animar la escala y el color usando GSAP cuando cambie isHovering
        if (isHovering) {
            gsap.to(cursorRef.current, {
                scale: 0.5,
                backgroundColor: 'var(--color-accent)',
                borderColor: 'transparent',
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'var(--color-accent)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }, [isHovering]);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[9999] mix-blend-difference xl:block hidden"
            style={{
                borderColor: 'var(--color-accent)',
                transform: 'translate(-100px, -100px)' // Fuera de la pantalla inicialmente
            }}
        />
    );
}
