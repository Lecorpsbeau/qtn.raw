"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { softSpring, fadeUpVariants } from "@/lib/utils";
import SeriesTitle from "./SeriesTitle";

export interface Spot {
  id: string;
  name: string;
  department: string;
  vibe: string;
  light: string;
  category: string;
  photos: string[];
  description: string;
  /**
   * Coordonnées exprimées en pourcentage (0–100) relatif au viewBox du SVG.
   * Le SVG carte.svg a un viewBox de 0 0 1241.2 1755.1
   */
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
    description:
      "Les pavés parisiens, les lignes classiques du Louvre et l'éclat de la Tour Eiffel pour des portraits intemporels au style brut.",
    coords: { x: 47, y: 40 },
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
    description:
      "Skyscrapers, béton, verre et néons. Un spot ultra-moderne avec des perspectives géométriques saisissantes.",
    coords: { x: 42, y: 37 },
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
    description:
      "Des allées symétriques, de grands bassins d'eau et une verdure impériale pour des compositions luxueuses et épurées.",
    coords: { x: 35, y: 44 },
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
    description:
      "Des routes forestières sinueuses, des blocs de grès légendaires et une lumière tamisée par la canopée.",
    coords: { x: 62, y: 62 },
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
    description:
      "Routes panoramiques serpentant le long de la Seine. Idéal pour capturer des voitures de sport en mouvement (rolling shots).",
    coords: { x: 25, y: 28 },
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
    description:
      "Ramparts médiévaux et ruelles pavées préservées, offrant des textures de pierre et une patine d'époque authentique.",
    coords: { x: 76, y: 52 },
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

  const handleSelectSpot = (spot: Spot) => setSelectedSpot(spot);

  const handleBookSpot = (spot: Spot) => {
    onSelectSpot(spot.name);
    const element = document.getElementById("booking");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="interactive-map" className="px-4 md:px-10 py-24 max-w-7xl mx-auto z-10 relative">
      {/* Section title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="text-center mb-16"
      >
        <SeriesTitle title="Les Spots Île-de-France" style="glass-gold" as="h2" />
      </motion.div>
      {/* macOS Window Panel */}
      <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row min-h-[500px]">
        {/* Left: SVG carte.svg */}
        <div className="flex-1 p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/10">
          {/* macOS window controls */}
          <div className="flex items-center gap-1.5 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="text-white/30 text-xs font-mono ml-4 select-none">
              idf_spots_map.sh
            </span>
          </div>

          {/* Map container */}
          <div className="relative flex-1 flex items-center justify-center bg-black/10 rounded-2xl overflow-hidden min-h-[320px]">
            {/*
              Le vrai SVG carte.svg — colorié via CSS filter pour
              transformer le blanc en teinte dorée-sombre du thème
            */}
            <div className="relative w-full max-w-[380px]">
              {/* SVG carte — on utilise <img> pour l'afficher */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/carte.svg"
                alt="Carte Île-de-France"
                // AJOUT DE L'ASPECT RATIO ICI POUR RÉSERVER L'ESPACE SQUELETTE
                className="w-full h-auto aspect-[1241/1755]"
                style={{
                  filter: "invert(1) sepia(0.6) saturate(1.2) hue-rotate(5deg) brightness(0.45) contrast(1.1)",
                  opacity: 0.9,
                }}
              />

              {/* Overlay SVG des pins — coordonnées en % du conteneur */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                {PHOTO_SPOTS.map((spot) => {
                  const isSelected = selectedSpot?.id === spot.id;
                  return (
                    <g
                      key={spot.id}
                      onClick={() => handleSelectSpot(spot)}
                      className="cursor-pointer"
                    >
                      {/* Ping ring */}
                      <circle
                        cx={spot.coords.x}
                        cy={spot.coords.y}
                        r={isSelected ? 4.5 : 3}
                        fill="none"
                        stroke="#c5a880"
                        strokeWidth="0.5"
                        opacity="0.5"
                        style={{
                          animation: "svgPing 1.5s ease-out infinite",
                          transformOrigin: `${spot.coords.x}% ${spot.coords.y}%`,
                        }}
                      />
                      {/* Outer ring */}
                      <circle
                        cx={spot.coords.x}
                        cy={spot.coords.y}
                        r={isSelected ? 3 : 2}
                        fill="none"
                        stroke="#c5a880"
                        strokeWidth={isSelected ? 0.8 : 0.5}
                        opacity="0.9"
                      />
                      {/* Core dot */}
                      <circle
                        cx={spot.coords.x}
                        cy={spot.coords.y}
                        r={isSelected ? 1.8 : 1.2}
                        fill="#c5a880"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip labels on hover (rendered as HTML overlays) */}
              {PHOTO_SPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => handleSelectSpot(spot)}
                  className="absolute"
                  style={{
                    left: `${spot.coords.x}%`,
                    top: `${spot.coords.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "28px",
                    height: "28px",
                  }}
                  title={spot.name}
                  aria-label={spot.name}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 text-[9px] font-mono tracking-wider uppercase text-white/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] opacity-80 inline-block" />
              Spots photo
            </div>
          </div>
        </div>

        {/* Right: Info panel */}
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
                  {/* Badge département */}
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

                  {/* Metadata grid */}
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
                      <span className="text-xs font-medium text-[var(--c-gold)]">
                        {selectedSpot.light}
                      </span>
                    </div>
                  </div>

                  {/* Inspiration thumbnails */}
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

                {/* CTA */}
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
                  Cliquez sur un point doré sur la carte pour explorer les photos et
                  caractéristiques du spot.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Keyframes for SVG ping animation */}
      <style>{`
        @keyframes svgPing {
          0% { r: 2; opacity: 0.7; }
          70% { r: 6; opacity: 0; }
          100% { r: 6; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
