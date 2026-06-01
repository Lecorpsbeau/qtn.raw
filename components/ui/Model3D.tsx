"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function CameraModel() {
    const { scene } = useGLTF("/camera.glb");
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!modelRef.current) return;

        // On réduit l'amplitude de rotation (PI / 12 au lieu de PI / 6) pour stabiliser le GPU
        const targetX = (state.pointer.x * Math.PI) / 12;
        const targetY = (state.pointer.y * Math.PI) / 12;

        // On adoucit la vitesse (0.03 au lieu de 0.05 ou 0.1)
        modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetX, 0.03);
        modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, -targetY, 0.03);
    });

    return (
        /* <Center> force le modèle à se caler pile au milieu de la scène */
        <Center>
            {/* On baisse le scale à 0.2 (au lieu de 1.5) pour éviter qu'il n'avale la caméra */}
            <primitive ref={modelRef} object={scene} scale={0.2} />
        </Center>
    );
}

export default function Model3D() {
    return (
        <div className="w-full max-w-md mx-auto h-[400px] relative z-10">
            {/* Le Suspense empêche tout le site de bugger pendant le chargement du fichier */}
            <Suspense fallback={<div className="flex items-center justify-center h-full text-sm uppercase tracking-widest text-black/40">Chargement de l'objet 3D...</div>}>
                {/* On recule la caméra à [0, 0, 12] au lieu de 5 pour avoir du recul */}
                <Canvas
                    camera={{ position: [0, 0, 12], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{
                        antialias: true,
                        powerPreference: "high-performance",
                        alpha: true
                    }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} />
                    <CameraModel />
                    <Environment preset="city" />
                </Canvas>
            </Suspense>
        </div>
    );
}