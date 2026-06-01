"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// 1. AJOUTE ICI LES VRAIS NOMS DE TES PHOTOS situées dans public/images/qtn.raw/toppics/
const IMAGE_POOL = [
    "/images/qtn.raw/toppics/photo1.jpg",
    "/images/qtn.raw/toppics/photo2.jpg",
    "/images/qtn.raw/toppics/photo3.jpg",
    "/images/qtn.raw/toppics/photo4.jpg",
    "/images/qtn.raw/toppics/photo5.jpg",
];

interface TrailItem {
    id: number;
    x: number;
    y: number;
    src: string;
    rotation: number;
}

export default function MouseImageTrail() {
    const [trail, setTrail] = useState<TrailItem[]>([]);
    const lastSpawnTime = useRef<number>(0);
    const imageIndex = useRef<number>(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();

            // Vérifie si 0.2 seconde (200ms) se sont écoulées depuis la dernière image
            if (now - lastSpawnTime.current >= 200) {
                lastSpawnTime.current = now;

                // Sélectionne l'image suivante dans la liste (boucle continue)
                const currentSrc = IMAGE_POOL[imageIndex.current];
                imageIndex.current = (imageIndex.current + 1) % IMAGE_POOL.length;

                // Génère une rotation aléatoire légère pour donner un effet organique "papier"
                const randomRotation = Math.random() * 20 - 10; // Entre -10deg et 10deg

                const newItem: TrailItem = {
                    id: now + Math.random(), // ID unique
                    x: e.clientX,
                    y: e.clientY,
                    src: currentSrc,
                    rotation: randomRotation,
                };

                // Ajoute la nouvelle image au tableau
                setTrail((prev) => [...prev, newItem]);

                // Supprime l'image automatiquement après exactement 2 secondes (2000ms)
                setTimeout(() => {
                    setTrail((prev) => prev.filter((item) => item.id !== newItem.id));
                }, 2000);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
            <AnimatePresence>
                {trail.map((img) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.5, rotate: img.rotation - 10 }}
                        animate={{ opacity: 1, scale: 1, rotate: img.rotation }}
                        exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.4 } }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        style={{
                            position: "fixed",
                            left: img.x,
                            top: img.y,
                            x: "-50%",
                            y: "-50%",
                            width: "160px",  // Ajuste la taille de la miniature ici
                            height: "220px", // Ajuste la taille de la miniature ici
                        }}
                        className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#14110f]"
                    >
                        <Image
                            src={img.src}
                            alt="Trail preview"
                            fill
                            sizes="160px"
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}