"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// Optimized Geometry for reuse
const BOX_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
const MATERIAL = new THREE.MeshStandardMaterial({
    color: "#2a2a2a",
    roughness: 0.4,
    metalness: 0.8,
});

function FloatingBox(props: ThreeElements["mesh"]) {
    const meshRef = useRef<THREE.Mesh>(null!);

    // Random rotation speed
    const rotationSpeed = useMemo(() => {
        return {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
        };
    }, []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += rotationSpeed.x;
        meshRef.current.rotation.y += rotationSpeed.y;
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            geometry={BOX_GEOMETRY}
            material={MATERIAL}
        />
    );
}

const SceneComponent: React.FC = () => {
    // Generate random positions for boxes
    const boxes = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10 - 5, // Behind the content
            ] as [number, number, number],
            scale: Math.random() * 0.5 + 0.5,
        }));
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                dpr={[1, 2]} // Support high-DPI
                gl={{ antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {boxes.map((box, i) => (
                    <FloatingBox key={i} position={box.position} scale={box.scale} />
                ))}
            </Canvas>
        </div>
    );
};

export const Scene = React.memo(SceneComponent);
