import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Instances, Instance, Grid } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSystem = ({ count = 500 }) => {
    const ref = useRef();
    const materialRef = useRef(); // Referencia al material para animarlo globalmente

    // Posiciones pseudoaleatorias estables
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            const factor = Math.random() * 0.5 + 0.5;
            const speed = Math.random() * 0.01 + 0.005;
            temp.push({ position, factor, speed, id: i });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();
        const mouseX = state.pointer.x * 2;
        const mouseY = state.pointer.y * 2;

        ref.current.children.forEach((instance, i) => {
            const data = particles[i];
            // Movimiento natural
            instance.position.y = data.position.y + Math.sin(time * data.speed * 10) * data.factor;
            // Reacción al mouse (parallax sutil)
            instance.position.x = data.position.x + (mouseX * data.factor * 0.5);
            instance.position.z = data.position.z + (mouseY * data.factor * 0.5);
        });

        // Loop de oscurecimiento (pulsación)
        if (materialRef.current) {
            // Animación de onda senoidal suave entre 0.1 y 0.8 de intensidad
            // Math.sin(time * velocidad_pulso) * amplitud + offset_base
            const pulse = (Math.sin(time * 1.5) + 1) / 2; // Rango de 0 a 1
            materialRef.current.emissiveIntensity = pulse * 0.7 + 0.1; // Rango de 0.1 a 0.8
            materialRef.current.opacity = pulse * 0.5 + 0.3; // También jugar con opacidad (0.3 a 0.8)
        }
    });

    return (
        <Instances ref={ref} limit={count} renderOrder={1}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial
                ref={materialRef}
                color="#FF4F00"
                emissive="#FF4F00"
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.8}
            />
            {particles.map((data) => (
                <Instance key={data.id} position={data.position} />
            ))}
        </Instances>
    );
};

export default function ThreeScene() {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 150 : 400;

    return (
        <div className="w-full h-[500px] xl:h-[700px] relative pointer-events-auto cursor-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF4F00" />
                <directionalLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Grilla técnica estilo "Tech-Brutalism" Dark Mode */}
                <Grid
                    position={[0, -5, 0]}
                    args={[20, 20]}
                    cellSize={1}
                    cellThickness={1}
                    cellColor="#141517"
                    sectionSize={5}
                    sectionThickness={1.5}
                    sectionColor="#FF4F00"
                    fadeDistance={30}
                />

                <ParticleSystem count={particleCount} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
