"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import InteractiveMap from "@/components/ui/InteractiveMap";
import BookingSection from "@/components/ui/BookingSection";
import SocialSection from "@/components/ui/SocialSection";
import { ALL_PHOTOS } from "@/data/photos";
import { TOPPICS_PHOTOS } from "@/data/toppics";
import { fadeUpVariants } from "@/lib/utils";

// ─────────────────────────────────────────────
//  LIGHTBOX
// ─────────────────────────────────────────────
function Lightbox({
  src,
  onClose,
  onPrev,
  onNext,
}: {
  src: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-img-wrap"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Photo plein écran" className="lightbox-img" />
      </motion.div>
      <button className="lightbox-close" onClick={onClose} aria-label="Fermer">
        ✕
      </button>
      <button
        className="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Précédent"
      >
        ‹
      </button>
      <button
        className="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Suivant"
      >
        ›
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  HERO TEXT / COMPOSITION LOGO
// ─────────────────────────────────────────────
function HeroTextSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="flex flex-col items-center justify-center gap-y-4 w-full"
    >
      {/* ─── BLOC TEXTE : THE PORTFOLIO OF ─── */}
      <div className="flex items-center text-white select-none pointer-events-none">
        <span
          className="-rotate-90 inline-block origin-center text-[12px] sm:text-base md:text-lg font-bold uppercase tracking-[0.2em] text-white [text-shadow:0_0_15px_rgba(255,255,255,0.4)] -mr-3 sm:-mr-4 select-none"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          The
        </span>

        <span
          className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-none text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.7)]"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          Portfolio
        </span>

        <span
          className="text-2xl sm:text-4xl md:text-5xl font-medium text-white/80 [text-shadow:0_4px_12px_rgba(0,0,0,0.6)] ml-2 sm:ml-4 self-end mb-2 sm:mb-4"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          of
        </span>
      </div>

      {/* Grand logo RAW central */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-32 sm:w-56 md:w-72 flex items-center justify-center pt-2 md:pt-1 sm:-ml-2"
      >
        <Image
          src="/logow.png"
          alt="RAW Logo"
          width={300}
          height={110}
          priority
          className="w-full h-auto object-contain select-none pointer-events-none filter drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </motion.div>
  );
}

function BeforeAfterSection() {
  return (
    <section
      id="retouch"
      className="px-4 md:px-10 py-24 max-w-7xl mx-auto z-10 relative flex flex-col items-center"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="text-center mb-12"
      >
        <h2
          className="mb-3 text-gold-gradient [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontStyle: "italic",
          }}
        >
          Le Rendu Brut vs Édité
        </h2>
        <p
          className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed drop-shadow-md"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Faites glisser le curseur pour apprécier le travail de retouche colorimétrique, de
          contraste et d'atmosphère apporté à chaque cliché.
        </p>
      </motion.div>

      <BeforeAfter before="/avant.jpg" after="/apres.png" />
    </section>
  );
}
import { useRef } from "react";

// ─────────────────────────────────────────────
//  COMPOSANT SLIDER : OPTIMISÉ ZERO-LAG (INP < 16ms)
// ─────────────────────────────────────────────
function BeforeAfter({ before, after }: { before: string; after: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Modifie directement la variable CSS dans le DOM sans re-rendre React
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--slider-pos", `${e.target.value}%`);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 group select-none"
      style={{ "--slider-pos": "50%" } as React.CSSProperties}
    >
      {/* Image Avant */}
      <img
        src={before}
        alt="Rendu Avant"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Image Après */}
      <img
        src={after}
        alt="Rendu Après"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          clipPath: "polygon(0 0, var(--slider-pos) 0, var(--slider-pos) 100%, 0 100%)",
        }}
      />

      {/* Ligne de séparation */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: "var(--slider-pos)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-neutral-900 shadow-xl flex items-center justify-center text-xs font-bold backdrop-blur-sm bg-white/90">
          ↔
        </div>
      </div>

      {/* Input invisible natif et ultra-réactif */}
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />

      {/* Badges */}
      <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded border border-white/10 z-10">
        Brut
      </span>
      <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-[#c5a880] text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded border border-white/10 z-10">
        Édité
      </span>
    </div>
  );
}
// ─────────────────────────────────────────────
//  GALLERY SECTION
// ─────────────────────────────────────────────
function GallerySection({ onOpen }: { onOpen: (i: number) => void }) {
  const [filter, setFilter] = useState<"all" | "stage3" | "cars" | "portraits" | "marques">(
    "all"
  );

  // Correction des filtres pour cibler les dossiers exacts de ton dossier public/photos
  const filteredPhotos = ALL_PHOTOS.filter((src) => {
    if (filter === "all") return true;
    if (filter === "stage3") return src.includes("/stage3/");
    if (filter === "cars") return src.includes("/photos/cars/");
    if (filter === "portraits") return src.includes("/photos/portraits/") || src.includes("/photos/gensraw/");
    if (filter === "marques") return src.includes("/photos/marque/");
    return true;
  });

  const globalIndex = (filteredIdx: number) =>
    ALL_PHOTOS.indexOf(filteredPhotos[filteredIdx]);

  return (
    <section id="gallery" className="px-4 md:px-10 pb-28 pt-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        Artwork
      </motion.h2>

      {/* Filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center gap-2 flex-wrap mb-12"
      >
        {(["all", "stage3", "cars", "portraits", "marques"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-pill ${filter === f ? "filter-pill--active" : ""}`}
            style={{ fontFamily: "var(--font-dm)" }}
          >
            {f === "all"
              ? "Tout"
              : f === "stage3"
                ? "Stage 3"
                : f === "cars"
                  ? "Automotive"
                  : f === "portraits"
                    ? "Portraits"
                    : "Brands"}
          </button>
        ))}
      </motion.div>

      {/* Masonry grid */}
      <div className="masonry-grid max-w-7xl mx-auto">
        {filteredPhotos.map((src, i) => (
          <motion.div
            key={src}
            className="masonry-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onOpen(globalIndex(i))}
            data-cursor="photo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Photo ${i + 1}`}
              loading="lazy"
              className="masonry-img"
            />
            <div className="masonry-overlay">
              <span className="masonry-view-label">VIEW</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  CONTACT SECTION
// ─────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 pb-28 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9 }}
        className="contact-card max-w-2xl mx-auto glass rounded-3xl p-10 text-center"
      >
        <h2
          className="mb-2 [text-shadow:0_4px_12px_rgba(0,0,0,0.5)]"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontStyle: "italic",
          }}
        >
          Travaillons ensemble
        </h2>
        <p
          className="text-white/50 mb-8 text-sm tracking-wide"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Mode · Automobile · Portrait — Paris
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:quentinpa13@gmail.com"
            className="contact-btn glass rounded-full px-7 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
            style={{ fontFamily: "var(--font-dm)" }}
          >
            ✉ quentinpa13@gmail.com
          </a>
          <a
            href="https://instagram.com/qtn.raw"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn glass rounded-full px-7 py-3 text-sm font-medium text-white hover:bg-white/20 transition-all"
            style={{ fontFamily: "var(--font-dm)" }}
          >
            ◯ @qtn.raw
          </a>
        </div>

        <p
          className="mt-8 text-white/25 text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          © 2026 Quentin Pacifici — ALLEYESONRAW
        </p>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  HERO SECTION
// ─────────────────────────────────────────────
interface TrailImage {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
}

function HeroSection() {
  const [activeImages, setActiveImages] = useState<TrailImage[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const distance = Math.hypot(currentX - lastMousePos.current.x, currentY - lastMousePos.current.y);
    const spawnThreshold = 75;

    if (distance > spawnThreshold) {
      if (TOPPICS_PHOTOS.length === 0) return;

      const nextImgSrc = TOPPICS_PHOTOS[imageIndex.current % TOPPICS_PHOTOS.length];
      imageIndex.current++;
      const randomRotation = Math.random() * 18 - 9;

      const newImage: TrailImage = {
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
    <section
      ref={ref}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "calc(100vh - var(--nav-h))" }}
    >
      {/* Trail images */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block overflow-hidden">
        <AnimatePresence>
          {activeImages.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.6, rotate: img.rotation }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.3 } }}
              className="absolute w-52 h-72 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-950"
              style={{
                left: img.x,
                top: img.y,
                x: "-50%",
                y: "-50%",
              }}
            >
              <Image
                src={img.src}
                alt="Trail image preview"
                fill
                className="object-cover pointer-events-none select-none"
                unoptimized
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hero content */}
      <motion.div style={{ y, opacity }} className="flex flex-col items-center gap-10 px-4 z-20">
        <HeroTextSVG />

        {/* CTA pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          <a href="#gallery">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="glass rounded-full px-6 py-2.5 text-sm font-medium text-white cursor-none select-none block"
              style={{ fontFamily: "var(--font-dm)" }}
              data-cursor="door"
            >
              Voir le portfolio →
            </motion.span>
          </a>
          <a href="#contact">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full px-6 py-2.5 text-sm font-medium text-white/60 border border-white/20 hover:border-white/50 transition-colors cursor-none select-none block"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              Contact
            </motion.span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-white animate-scroll-line origin-top" />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
//  HOME PAGE
// ─────────────────────────────────────────────
export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedSpot, setSelectedSpot] = useState("");

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length : null
    );
  const nextPhoto = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % ALL_PHOTOS.length : null));

  return (
    <>
      <div className="mesh-bg" />

      <HeroSection />

      <InteractiveMap onSelectSpot={setSelectedSpot} />

      <BeforeAfterSection />

      <GallerySection onOpen={openLightbox} />

      <BookingSection selectedSpot={selectedSpot} />

      <SocialSection />

      <ContactSection />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            src={ALL_PHOTOS[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  );
}