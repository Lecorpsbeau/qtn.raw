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
    const lastMousePos = useRef({ x: 0, y: 0 });
    const imageIndex = useRef(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const distance = Math.hypot(
            currentX - lastMousePos.current.x,
            currentY - lastMousePos.current.y
        ) * 2;

        const spawnThreshold = 75; // Tu peux baisser ce chiffre si tu veux encore plus d'images

        // 2. La condition se déclenchera beaucoup plus souvent
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

            setActiveImages((prev) => [...prev, newImage].slice(-10));
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
