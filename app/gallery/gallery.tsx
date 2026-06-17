"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// Assure-toi que le chemin d'import correspond bien à l'endroit où tu as créé ton fichier
import { ALL_PHOTOS } from "@/data/photos";

export default function GaleriePage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white py-24 px-4 md:px-10 z-10 relative">
            <div className="max-w-7xl mx-auto">

                {/* --- EN-TÊTE DE LA GALERIE --- */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link
                            href="/"
                            className="inline-block text-white/50 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest mb-8 border border-white/10 hover:border-white/30 px-4 py-2 rounded-full bg-black/20"
                        >
                            &larr; Retour à l'accueil
                        </Link>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Archives & Portfolio
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[var(--c-gold)] font-mono text-sm uppercase tracking-widest"
                    >
                        {ALL_PHOTOS.length} clichés répertoriés
                    </motion.p>
                </div>

                {/* --- GRILLE MASONRY --- */}
                {/* Tailwind 'columns-X' crée la structure Masonry, 'gap-4' gère l'espacement horizontal */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {ALL_PHOTOS.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "100px" }}
                            // Un léger délai basé sur l'index pour un effet d'apparition en cascade
                            transition={{ duration: 0.6, delay: (index % 10) * 0.05, ease: "easeOut" }}
                            // 'break-inside-avoid' empêche l'image d'être coupée entre deux colonnes
                            className="break-inside-avoid relative group rounded-xl overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer"
                        >
                            {/* Utilisation de la balise img standard pour que la hauteur s'adapte automatiquement */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={src}
                                alt={`Archive qtn.raw ${index + 1}`}
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay élégant au survol */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-mono text-[10px] tracking-widest uppercase border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                                    Agrandir
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    );
}