"use client";
import React, { useRef, useState, useEffect } from "react"; // <-- Ajoute useEffect ici
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
    const lastMousePos = useRef({ x: 0, y: 0 });
    const imageIndex = useRef(0);

    // ─── NOUVEAU : PRÉCHARGEMENT DES IMAGES ───
    // Dès que le composant s'affiche, on met toutes les images en cache
    useEffect(() => {
        if (!images || images.length === 0) return;

        images.forEach((src) => {
            const img = new Image();
            img.src = src; // Ça force le navigateur à la télécharger immédiatement
        });
    }, [images]);
    // ──────────────────────────────────────────

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const distance = Math.hypot(
            currentX - lastMousePos.current.x,
            currentY - lastMousePos.current.y
        ) * 2;

        const spawnThreshold = 75;

        if (distance > spawnThreshold) {
            if (!images || images.length === 0) return;

            const nextImgSrc = images[imageIndex.current % images.length];
            imageIndex.current++;

            const randomRotation = Math.random() * 18 - 9;

            const newImage = {
                id: Date.now() + Math.random(),
                src: nextImgSrc,
                x: currentX,
                y: currentY,
                rotation: randomRotation,
            };

            setActiveImages((prev) => [...prev, newImage].slice(-5));
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
                        // Note : C'est le "bg-neutral-900" ici qui donne l'effet noir
                        className="absolute w-40 h-52 bg-neutral-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
                        style={{
                            left: img.x,
                            top: img.y,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
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