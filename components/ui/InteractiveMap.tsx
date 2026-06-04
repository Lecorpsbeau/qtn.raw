"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { softSpring, fadeUpVariants } from "@/lib/utils";

export interface Spot {
  id: string;
  name: string;
  department: string;
  vibe: string;
  light: string;
  category: string;
  photos: string[];
  description: string;
  coords: { x: number; y: number };
}

export const PHOTO_SPOTS: Spot[] = [
  {
    id: "paris",
    name: "Paris Centre (Eiffel / Louvre)",
    department: "Paris (75)",
    vibe: "Urbain, Mode & Prestige",
    light: "Golden & Blue Hour",
    category: "Portraits & Mode",
    description: "Les pavés parisiens, les lignes classiques du Louvre et l'éclat de la Tour Eiffel pour des portraits intemporels au style brut.",
    coords: { x: 298, y: 245 },
    photos: [
      "/images/qtn.raw/stage3/portraits/distingues/les_distingues_1726479626_3458284215012982244_65780062195.jpg",
      "/images/qtn.raw/stage3/cars/Porsche 356/qtn.raw_1772018469_3840290762752116566_48773641125.jpg",
    ],
  },
  {
    id: "defense",
    name: "La Défense",
    department: "Hauts-de-Seine (92)",
    vibe: "Architecture & Géométrie",
    light: "Crépuscule / Nuit",
    category: "Urbain & Mode",
    description: "Skyscrapers, béton, verre et néons. Un spot ultra-moderne avec des perspectives géométriques saisissantes.",
    coords: { x: 260, y: 235 },
    photos: [
      "/images/qtn.raw/stage3/portraits/edouard/qtn.raw_1757865583_3721568709232955526_48773641125.jpg",
      "/images/qtn.raw/stage3/marque/trc/qtn.raw_1751475250_3667962713636877828_48773641125.jpg",
    ],
  },
  {
    id: "versailles",
    name: "Parc de Versailles & Saint-Cloud",
    department: "Yvelines / Hauts-de-Seine",
    vibe: "Classicisme & Reflets",
    light: "Lever du soleil / Fin d'après-midi",
    category: "Automobile & Prestige",
    description: "Des allées symétriques, de grands bassins d'eau et une verdure impériale pour des compositions luxueuses et épurées.",
    coords: { x: 220, y: 260 },
    photos: [
      "/images/qtn.raw/stage3/cars/Lamborghini Huracan/qtn.raw_1752511616_3676656376284737800_48773641125.jpg",
      "/images/qtn.raw/stage3/cars/BMW M3 E46/qtn.raw_1765564635_3786146363508028979_48773641125.jpg",
    ],
  },
  {
    id: "fontainebleau",
    name: "Forêt & Château de Fontainebleau",
    department: "Seine-et-Marne (77)",
    vibe: "Nature Sauvage & Ombres",
    light: "Journée nuageuse / Golden Hour",
    category: "Mode, Éditorial & Automobile",
    description: "Des routes forestières sinueuses, des blocs de grès légendaires et une lumière tamisée par la canopée.",
    coords: { x: 360, y: 390 },
    photos: [
      "/images/qtn.raw/stage3/marque/maisonbrodery /qtn.raw_1775582524_3870186205006856694_48773641125.jpg",
      "/images/qtn.raw/stage3/marque/maisonbrodery /qtn.raw_1775833379_3872289403498550376_48773641125.jpg",
    ],
  },
  {
    id: "boucle-seine",
    name: "Boucles de la Seine",
    department: "Yvelines / Val-d'Oise",
    vibe: "Automobile en Action",
    light: "Aube / Coucher de soleil",
    category: "Automobile & Paysage",
    description: "Routes panoramiques serpentant le long de la Seine. Idéal pour capturer des voitures de sport en mouvement (rolling shots).",
    coords: { x: 160, y: 190 },
    photos: [
      "/images/qtn.raw/stage3/cars/911 Dakar/porschekultur_1767543194_3802750393683816525_45136286864.jpg",
      "/images/qtn.raw/stage3/cars/911 Dakar/qtn.raw_1762881101_3763641926118389051_48773641125.jpg",
    ],
  },
  {
    id: "provins",
    name: "Cité Médiévale de Provins",
    department: "Seine-et-Marne (77)",
    vibe: "Pierre Brut & Historique",
    light: "Milieu d'après-midi",
    category: "Portraits & Inspirations",
    description: "Ramparts médiévaux et ruelles pavées préservées, offrant des textures de pierre et une patine d'époque authentique.",
    coords: { x: 450, y: 330 },
    photos: [
      "/images/qtn.raw/stage3/paysagesraw/qtn.raw_1753719266_3686786884180169570_48773641125.jpg",
      "/images/qtn.raw/stage3/animauxraw/qtn.raw_1753980520_3688978435759689734_48773641125.jpg",
    ],
  },
];

interface InteractiveMapProps {
  onSelectSpot: (spotName: string) => void;
}

export default function InteractiveMap({ onSelectSpot }: InteractiveMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [hoveredDep, setHoveredDep] = useState<string | null>(null);

  const handleSelectSpot = (spot: Spot) => {
    setSelectedSpot(spot);
  };

  const handleBookSpot = (spot: Spot) => {
    onSelectSpot(spot.name);
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="interactive-map" className="px-4 md:px-10 py-24 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="text-center mb-16"
      >
        <h2
          className="mb-3 text-gold-gradient"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontStyle: "italic",
          }}
        >
          Les Spots Île-de-France
        </h2>
        <p
          className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Explorez ma carte interactive pour découvrir mes spots photo favoris en région parisienne et projetez-vous dans votre futur shooting.
        </p>
      </motion.div>

      {/* macOS Window Panel */}
      <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row min-h-[500px]">

        {/* Left: SVG Map inside macOS Window Container */}
        <div className="flex-1 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/10">

          {/* macOS window controls decoration */}
          <div className="flex items-center gap-1.5 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-white/30 text-xs font-mono ml-4 select-none">idf_spots_map.sh</span>
          </div>

          <div className="relative flex-1 flex items-center justify-center bg-black/10 rounded-2xl p-4 overflow-hidden min-h-[300px]">
            <svg
              viewBox="0 0 600 500"
              className="w-full max-w-[500px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* 95 Val-d'Oise */}
              <motion.path
                d="M 170 140 L 270 140 L 280 210 L 220 190 Z"
                fill={hoveredDep === "95" ? "rgba(179, 146, 102, 0.15)" : "rgba(28, 24, 21, 0.4)"}
                stroke={hoveredDep === "95" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.25)"}
                strokeWidth={hoveredDep === "95" ? 2 : 1}
                onMouseEnter={() => setHoveredDep("95")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* 78 Yvelines */}
              <motion.path
                d="M 110 190 L 220 190 L 250 260 L 210 330 L 100 290 Z"
                fill={hoveredDep === "78" ? "rgba(179, 146, 102, 0.15)" : "rgba(28, 24, 21, 0.4)"}
                stroke={hoveredDep === "78" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.25)"}
                strokeWidth={hoveredDep === "78" ? 2 : 1}
                onMouseEnter={() => setHoveredDep("78")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* 92 Hauts-de-Seine */}
              <motion.path
                d="M 250 220 L 285 220 L 280 270 L 250 260 Z"
                fill={hoveredDep === "92" ? "rgba(179, 146, 102, 0.15)" : "rgba(28, 24, 21, 0.4)"}
                stroke={hoveredDep === "92" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.25)"}
                strokeWidth={hoveredDep === "92" ? 2 : 1}
                onMouseEnter={() => setHoveredDep("92")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* 75 Paris */}
              <motion.circle
                cx="298"
                cy="245"
                r="12"
                fill={hoveredDep === "75" ? "rgba(179, 146, 102, 0.3)" : "rgba(28, 24, 21, 0.6)"}
                stroke={hoveredDep === "75" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.35)"}
                strokeWidth={hoveredDep === "75" ? 2.5 : 1.5}
                onMouseEnter={() => setHoveredDep("75")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* 93 Seine-Saint-Denis */}
              <motion.path
                d="M 285 220 L 330 200 L 340 235 L 310 245 Z"
                fill={hoveredDep === "93" ? "rgba(179, 146, 102, 0.15)" : "rgba(28, 24, 21, 0.4)"}
                stroke={hoveredDep === "93" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.25)"}
                strokeWidth={hoveredDep === "93" ? 2 : 1}
                onMouseEnter={() => setHoveredDep("93")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* 94 Val-de-Marne */}
              <motion.path
                d="M 310 245 L 340 235 L 350 280 L 280 270 Z"
                fill={hoveredDep === "94" ? "rgba(179, 146, 102, 0.15)" : "rgba(28, 24, 21, 0.4)"}
                stroke={hoveredDep === "94" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.25)"}
                strokeWidth={hoveredDep === "94" ? 2 : 1}
                onMouseEnter={() => setHoveredDep("94")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* 91 Essonne */}
              <motion.path
                d="M 210 330 L 250 260 L 280 270 L 290 310 L 320 370 L 210 370 Z"
                fill={hoveredDep === "91" ? "rgba(179, 146, 102, 0.15)" : "rgba(28, 24, 21, 0.4)"}
                stroke={hoveredDep === "91" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.25)"}
                strokeWidth={hoveredDep === "91" ? 2 : 1}
                onMouseEnter={() => setHoveredDep("91")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* 77 Seine-et-Marne */}
              <motion.path
                d="M 330 200 L 460 140 L 490 360 L 350 400 L 320 370 L 290 310 L 350 280 L 340 235 Z"
                fill={hoveredDep === "77" ? "rgba(179, 146, 102, 0.15)" : "rgba(28, 24, 21, 0.4)"}
                stroke={hoveredDep === "77" ? "var(--c-gold)" : "rgba(197, 168, 128, 0.25)"}
                strokeWidth={hoveredDep === "77" ? 2 : 1}
                onMouseEnter={() => setHoveredDep("77")}
                onMouseLeave={() => setHoveredDep(null)}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              />

              {/* Pins (Pulsing Circles) */}
              {PHOTO_SPOTS.map((spot) => {
                const isSelected = selectedSpot?.id === spot.id;
                return (
                  <g
                    key={spot.id}
                    onClick={() => handleSelectSpot(spot)}
                    className="cursor-pointer group"
                    data-cursor="door"
                  >
                    {/* Ring animation */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 14 : 9}
                      className="fill-transparent stroke-[var(--c-gold)] opacity-40 animate-ping"
                      style={{ transformOrigin: `${spot.coords.x}px ${spot.coords.y}px` }}
                    />
                    {/* Outer glow ring */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 10 : 6}
                      fill="transparent"
                      stroke="var(--c-gold)"
                      strokeWidth={2}
                      className="transition-all duration-300 group-hover:r-8"
                    />
                    {/* Core pin */}
                    <circle
                      cx={spot.coords.x}
                      cy={spot.coords.y}
                      r={isSelected ? 6 : 4}
                      fill="var(--c-gold)"
                      className="transition-all duration-300 group-hover:scale-125"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover indicator for department names */}
            <AnimatePresence>
              {hoveredDep && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider uppercase text-white/50 bg-black/40 px-3 py-1.5 rounded-md border border-white/5 pointer-events-none"
                >
                  Département : {
                    hoveredDep === "75" ? "Paris (75)" :
                      hoveredDep === "92" ? "Hauts-de-Seine (92)" :
                        hoveredDep === "93" ? "Seine-Saint-Denis (93)" :
                          hoveredDep === "94" ? "Val-de-Marne (94)" :
                            hoveredDep === "78" ? "Yvelines (78)" :
                              hoveredDep === "91" ? "Essonne (91)" :
                                hoveredDep === "95" ? "Val-d'Oise (95)" : "Seine-et-Marne (77)"
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Info Drawer panel in macOS glassmorphism style */}
        <div className="w-full md:w-[380px] p-6 md:p-8 flex flex-col justify-between bg-black/10">
          <AnimatePresence mode="wait">
            {selectedSpot ? (
              <motion.div
                key={selectedSpot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={softSpring}
                className="flex flex-col gap-6 h-full justify-between"
              >
                <div>
                  {/* Badge */}
                  <span className="inline-block text-[10px] tracking-widest uppercase font-mono px-2 py-1 rounded bg-[var(--c-gold)] text-neutral-900 font-bold mb-4">
                    {selectedSpot.department}
                  </span>

                  <h3
                    className="text-2xl font-bold mb-2 text-white"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {selectedSpot.name}
                  </h3>

                  <p
                    className="text-white/70 text-sm leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-dm)" }}
                  >
                    {selectedSpot.description}
                  </p>

                  {/* Spot metadata grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4 mb-6">
                    <div>
                      <span className="block font-mono text-[9px] tracking-widest text-white/30 uppercase mb-1">
                        Ambiance
                      </span>
                      <span className="text-white/80 text-xs font-medium">
                        {selectedSpot.vibe}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] tracking-widest text-white/30 uppercase mb-1">
                        Lumière
                      </span>
                      <span className="text-white/80 text-xs font-medium text-[var(--c-gold)]">
                        {selectedSpot.light}
                      </span>
                    </div>
                  </div>

                  {/* Inspirations thumbnail grid */}
                  <div>
                    <h4 className="font-mono text-[10px] tracking-wider uppercase text-white/40 mb-3">
                      Inspirations du spot
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedSpot.photos.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative h-28 rounded-lg overflow-hidden border border-white/15 bg-neutral-950 group"
                        >
                          <Image
                            src={src}
                            alt={`${selectedSpot.name} inspiration ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking call to action */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookSpot(selectedSpot)}
                  className="w-full mt-6 py-3 rounded-xl bg-white text-neutral-900 font-medium text-sm transition-colors hover:bg-neutral-200"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  Choisir ce spot pour mon shooting
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center py-10"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 text-white/30 text-lg">
                  📍
                </div>
                <h3
                  className="text-lg font-medium text-white mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Aucun spot sélectionné
                </h3>
                <p
                  className="text-white/40 text-xs max-w-[200px]"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  Cliquez sur un point doré sur la carte d'Île-de-France pour explorer les photos et caractéristiques du spot.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
