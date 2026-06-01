"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageInstance {
    id: number;
    src: string;
    x: number;
    y: number;
    rotation: number;
}

interface MouseImageTrailProps {
    images: string[];
}

export default function MouseImageTrail({ images }: MouseImageTrailProps) {
    const [activeImages, setActiveImages] = useState<ImageInstance[]>([]);

    // Refs pour suivre la position et l'index sans déclencher de re-renders inutiles
    const lastMousePos = useRef({ x: 0, y: 0 });
    const imageIndex = useRef(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const currentX = e.clientX;
        const currentY = e.clientY;

        // Calcul de la distance de déplacement depuis la dernière image affichée
        const distance = Math.hypot(
            currentX - lastMousePos.current.x,
            currentY - lastMousePos.current.y
        );

        // Seuil en pixels avant d'afficher la prochaine image (Ajuste à ta guise !)
        const spawnThreshold = 60;

        if (distance > spawnThreshold) {
            if (images.length === 0) return;

            // Sélection de l'image suivante dans le tableau (boucle infinie avec le modulo)
            const nextImgSrc = images[imageIndex.current % images.length];
            imageIndex.current++;

            // Rotation aléatoire pour donner le style brute / raw
            const randomRotation = Math.random() * 20 - 10; // Entre -10deg et 10deg

            const newImage: ImageInstance = {
                id: Date.now(), // ID unique pour AnimatePresence
                src: nextImgSrc,
                x: currentX,
                y: currentY,
                rotation: randomRotation,
            };

            // On ajoute la nouvelle image et on ne garde que les 12 dernières à l'écran
            setActiveImages((prev) => [...prev, newImage].slice(-12));

            // On met à jour le point de repère
            lastMousePos.current = { x: currentX, y: currentY };
        }
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        >
            <AnimatePresence>
                {activeImages.map((img) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.7, rotate: img.rotation }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.4 } }}
                        className="absolute w-40 h-52 bg-neutral-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
                        style={{
                            left: img.x,
                            top: img.y,
                            transform: "translate(-50%, -50%)", // Centre l'image sur le curseur
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={img.src}
                            alt="Trail link"
                            className="w-full h-full object-cover pointer-events-none select-none"
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}