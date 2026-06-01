"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import MouseImageTrail from "@/components/ui/MouseImageTrail";
// ─────────────────────────────────────────────
//  REAL PHOTOS — from /public/photos/
// ─────────────────────────────────────────────
const TOPPICS_PHOTOS = [
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456354746087_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456363112861_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456363126332_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456363134111_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456371500914_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456371533454_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456371557782_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379884036_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379885845_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379902394_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379909558_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379931537_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379943044_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456421851087_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456430251955_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456430265385_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456858097642_48773641125.jpg",
];
const ALL_PHOTOS = [
  // les_distingues (Brands / Marque)
  "/photos/les_distingues_1726479626_3458284215013028892_65780062195.jpg",
  "/photos/les_distingues_1726479626_3458284215013176224_65780062195.jpg",
  "/photos/les_distingues_1726479626_3458284215013210968_65780062195.jpg",
  "/photos/les_distingues_1726479626_3458284215214458543_65780062195.jpg",
  "/photos/les_distingues_1726479626_3458284215239632911_65780062195.jpg",
  // porschekultur (Cars)
  "/photos/porschekultur_1767543194_3802750393683816525_45136286864.jpg",
  "/photos/porschekultur_1767543194_380275039368344174_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393692202569_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393725762083_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393767698971_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393767718271_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393767719532_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393776093759_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393776142678_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393784526440_45136286864.jpg",
  "/photos/porschekultur_1767543194_3802750393784527308_45136286864.jpg",
  // qtn.raw — latest batch (Split into Highlights & Raw based on selection)
  "/photos/qtn.raw_1778371237_3893582603622214399_48773641125.jpg",
  "/photos/qtn.raw_1778371237_3893582603823545214_48773641125.jpg",
  "/photos/qtn.raw_1778371237_389358260340275720_48773641125.jpg",
  "/photos/qtn.raw_1778371237_3893582604016448783_48773641125.jpg",
  "/photos/qtn.raw_1778371237_3893582604016479641_48773641125.jpg",
  "/photos/qtn.raw_1778371237_3893582604033253855_48773641125.jpg",
  "/photos/qtn.raw_1778371237_3893582604511363085_48773641125.jpg",
  "/photos/qtn.raw_1778371237_3893582604603637195_48773641125.jpg",
  "/photos/qtn.raw_1778371237_3893582604746242412_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162917597008451_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162917781557284_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162917789901048_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162917974449777_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162917974475191_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162917974498078_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162918469415815_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162918595253875_48773641125.jpg",
  "/photos/qtn.raw_1778082788_3891162919241186702_48773641125.jpg",
  "/photos/qtn.raw_1777124703_3883125912842815840_48773641125.jpg",
  "/photos/qtn.raw_1777124703_3883125912842843424_48773641125.jpg",
  "/photos/qtn.raw_1777124703_3883125912842845894_48773641125.jpg",
  "/photos/qtn.raw_1777124703_3883125912851206746_48773641125.jpg",
  "/photos/qtn.raw_1777124703_3883125912851231025_48773641125.jpg",
  "/photos/qtn.raw_1776515624_3878012787570376067_48773641125.jpg",
  "/photos/qtn.raw_1776515624_3878012794868407749_48773641125.jpg",
  "/photos/qtn.raw_1776515624_3878012796571331159_48773641125.jpg",
  "/photos/qtn.raw_1776515624_3878012797905088977_48773641125.jpg",
  "/photos/qtn.raw_1775833379_3872289388684250489_48773641125.jpg",
  "/photos/qtn.raw_1775833379_3872289403498550376_48773641125.jpg",
  "/photos/qtn.raw_1775833379_3872289408514921515_48773641125.jpg",
  "/photos/qtn.raw_1775582524_3870186205006856694_48773641125.jpg",
  "/photos/qtn.raw_1775582524_3870186210702752796_48773641125.jpg",
  "/photos/qtn.raw_1774466869_3860830105484769802_48773641125.jpg",
  "/photos/qtn.raw_1774466869_3860830119888776025_48773641125.jpg",
  "/photos/qtn.raw_1774466869_3860830112883479468_48773641125.jpg",
  "/photos/qtn.raw_1774086285_3857635883109648137_48773641125.jpg",
  "/photos/qtn.raw_1774086285_3857635885575950038_48773641125.jpg",
  "/photos/qtn.raw_1774086285_3857635887547237538_48773641125.jpg",
  "/photos/qtn.raw_1773768789_3854966908089399511_48773641125.jpg",
  "/photos/qtn.raw_1773768789_3854966911771951024_48773641125.jpg",
  "/photos/qtn.raw_1772915984_3847818902860794958_48773641125.jpg",
  "/photos/qtn.raw_1772915984_3847818906576978453_48773641125.jpg",
  "/photos/qtn.raw_1772473519_3844106072470938929_48773641125.jpg",
  "/photos/qtn.raw_1772018469_3840290762752116566_48773641125.jpg",
  "/photos/qtn.raw_1772018469_3840290767500065525_48773641125.jpg",
  "/photos/qtn.raw_1771443007_3835458836438539601_48773641125.jpg",
  "/photos/qtn.raw_1771443007_3835458842461540900_48773641125.jpg",
  "/photos/qtn.raw_1770552000_3827943316764066713_48773641125.jpg",
  "/photos/qtn.raw_1769708987_3820917414872085361_48773641125.jpg",
  "/photos/qtn.raw_1769271969_3817252110341923490_48773641125.jpg",
  "/photos/qtn.raw_1768929501_3814376599521669966_48773641125.jpg",
  "/photos/qtn.raw_1767037277_3798506456354746087_48773641125.jpg",
  "/photos/qtn.raw_1767037277_3798506456354748232_48773641125.jpg",
  "/photos/qtn.raw_1766518394_3794153749724608172_48773641125.jpg",
  "/photos/qtn.raw_1766518394_3794153749724610985_48773641125.jpg",
  "/photos/qtn.raw_1765564635_3786146363508028979_48773641125.jpg",
  "/photos/qtn.raw_1764947635_3780977267925770682_48773641125.jpg",
  "/photos/qtn.raw_1763742586_3770863957146506475_48773641125.jpg",
  "/photos/qtn.raw_1763228625_3766550032234151229_48773641125.jpg",
  "/photos/qtn.raw_1762881101_3763641926118389051_48773641125.jpg",
  "/photos/qtn.raw_1761220089_3749708341275413002_48773641125.jpg",
];

// ─────────────────────────────────────────────
//  LIGHTBOX
// ─────────────────────────────────────────────
function Lightbox({ src, onClose, onPrev, onNext }: {
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
        onClick={e => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="Photo plein écran" className="lightbox-img" />
      </motion.div>
      <button className="lightbox-close" onClick={onClose} aria-label="Fermer">✕</button>
      <button className="lightbox-prev" onClick={e => { e.stopPropagation(); onPrev(); }} aria-label="Précédent">‹</button>
      <button className="lightbox-next" onClick={e => { e.stopPropagation(); onNext(); }} aria-label="Suivant">›</button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  HOME PAGE
// ─────────────────────────────────────────────
export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prevPhoto = () => setLightboxIndex(i => i !== null ? (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length : null);
  const nextPhoto = () => setLightboxIndex(i => i !== null ? (i + 1) % ALL_PHOTOS.length : null);

  return (
    <>
      <HeroSection />
      <GallerySection onOpen={openLightbox} />
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

  // Parallaxe au scroll (conservé à l'identique)
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Calcul de la distance parcourue depuis la dernière image générée
    const distance = Math.hypot(
      currentX - lastMousePos.current.x,
      currentY - lastMousePos.current.y
    );

    // Seuil d'apparition en pixels (ajuste si tu veux resserrer la traînée)
    const spawnThreshold = 75;

    if (distance > spawnThreshold) {
      if (TOPPICS_PHOTOS.length === 0) return;

      // Pioche séquentiellement dans tes TOPPICS_PHOTOS globales
      const nextImgSrc = TOPPICS_PHOTOS[imageIndex.current % TOPPICS_PHOTOS.length];
      imageIndex.current++;

      // Rotation aléatoire organique pour le côté "raw / brut"
      const randomRotation = Math.random() * 18 - 9; // Entre -9deg et 9deg

      const newImage: TrailImage = {
        id: Date.now() + Math.random(),
        src: nextImgSrc,
        x: currentX,
        y: currentY,
        rotation: randomRotation,
      };

      // On ajoute la nouvelle image et on limite à 10 max pour garder un max de fluidité
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
      {/* ─── TRAÎNÉE D'IMAGES EN CASCADE (Remplace l'ancienne image unique) ─── */}
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
                alt="Trail link preview"
                fill
                className="object-cover pointer-events-none select-none"
                unoptimized
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ─── CONTENU (Texte & Boutons) ─── */}
      <motion.div style={{ y, opacity }} className="flex flex-col items-center gap-10 px-4 z-20">

        {/* Si tu veux afficher ton titre SVG, tu as juste à décommenter la ligne suivante : */}
        {/* <HeroTextSVG /> */}
        {/* Tu peux remettre ton <HeroTextSVG /> ou tes titres ici si tu veux les afficher */}

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
//  HERO TEXT SVG
// ─────────────────────────────────────────────
function HeroTextSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="border border-white/15 bg-black/40 backdrop-blur-md rounded-[22px] sm:rounded-[32px] px-6 py-4 sm:px-12 sm:py-7 flex items-center justify-center gap-x-4 sm:gap-x-7 max-w-[92vw] flex-wrap md:flex-nowrap shadow-2xl"
    >
      {/* ─── BLOC TEXTE : THE PORTFOLIO OF ─── */}
      <div className="flex items-center text-white select-none">
        {/* Le "The" retourné verticalement sur le côté */}
        <span
          className="-rotate-90 inline-block origin-center text-[10px] sm:text-xs uppercase tracking-widest opacity-50 -mr-2 sm:-mr-3 select-none pointer-events-none"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          The
        </span>

        {/* Le mot "Portfolio" en grande écriture Serif */}
        <span
          className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-none"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          Portfolio
        </span>

        {/* Le petit "of" de transition */}
        <span
          className="text-sm sm:text-lg md:text-xl opacity-60 ml-2.5 self-end mb-0.5 sm:mb-1.5"
          style={{ fontFamily: "var(--font-font-dm)" }} // Vibe épurée pour le "of"
        >
          of
        </span>
      </div>

      {/* ─── BLOC IMAGE : LOGO RAW BRUTALISTE ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-28 sm:w-40 md:w-48 flex items-center justify-center pt-2 md:pt-0"
      >
        <Image
          src="/raw.png"
          alt="RAW Logo"
          width={240}
          height={90}
          priority
          className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(255,255,255,0.08)]"
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  GALLERY SECTION (With your exact new structure)
// ─────────────────────────────────────────────
function GallerySection({ onOpen }: { onOpen: (i: number) => void }) {
  // Changement ici : Tes nouveaux onglets issus de ton tri parfait !
  const [filter, setFilter] = useState<"all" | "highlights" | "cars" | "brands" | "raw">("all");

  // Filtrage dynamique selon l'anatomie de tes fichiers
  const filteredPhotos = ALL_PHOTOS.filter((src, idx) => {
    if (filter === "all") return true;
    if (filter === "cars") return src.includes("porschekultur");
    if (filter === "brands") return src.includes("les_distingues");

    // Pour qtn.raw, on sépare astucieusement tes Toppics/Highlights du reste du flux brut (Raw)
    if (filter === "highlights") return src.includes("qtn.raw") && idx < 25;
    if (filter === "raw") return src.includes("qtn.raw") && idx >= 25;

    return true;
  });

  const globalIndex = (filteredIdx: number) => ALL_PHOTOS.indexOf(filteredPhotos[filteredIdx]);

  return (
    <section id="gallery" className="px-4 md:px-10 pb-28 pt-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4"
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

      {/* Barre de filtres mise à jour avec ton style */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center gap-2 flex-wrap mb-12"
      >
        {(["all", "highlights", "cars", "brands", "raw"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-pill ${filter === f ? "filter-pill--active" : ""}`}
            style={{ fontFamily: "var(--font-dm)" }}
          >
            {f === "all" ? "Tout" : f === "highlights" ? "Highlights" : f === "cars" ? "Automotive" : f === "brands" ? "Brands (Marque)" : "Raw"}
          </button>
        ))}
      </motion.div>

      {/* Grille de type Masonry */}
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
            data-cursor="photo" // Active ton tout nouveau système de brush !
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
          className="mb-2"
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