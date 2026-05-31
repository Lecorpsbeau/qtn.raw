"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PhotoCard from "./PhotoCard";
import { type Photo } from "@/data/projects";

interface PhotoStripProps {
  photos: Photo[];
}

const BASE_H   = 300;
const BASE_W   = 210;

export default function PhotoStrip({ photos }: PhotoStripProps) {
  const ref        = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ x: number; scroll: number } | null>(null);

  const onDown = (e: React.MouseEvent) => {
    setDrag({ x: e.pageX, scroll: ref.current?.scrollLeft ?? 0 });
  };
  const onMove = (e: React.MouseEvent) => {
    if (!drag || !ref.current) return;
    ref.current.scrollLeft = drag.scroll - (e.pageX - drag.x);
  };
  const onUp = () => setDrag(null);

  const scrollBy = (dir: "left" | "right") =>
    ref.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });

  return (
    <div className="relative w-full">
      {/* Arrows */}
      <div className="flex justify-between items-center px-8 mb-4 pointer-events-none">
        <ArrowBtn dir="left"  onClick={() => scrollBy("left")}  />
        <ArrowBtn dir="right" onClick={() => scrollBy("right")} />
      </div>

      {/* Strip */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto no-scrollbar px-8 pb-4"
        style={{ cursor: drag ? "grabbing" : "grab", userSelect: "none" }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
      >
        {photos.map((photo, i) => {
          const h = i % 2 === 0 ? BASE_H      : BASE_H - 40;
          const w = i % 2 === 0 ? BASE_W      : BASE_W - 20;
          const mt = i % 2 !== 0 ? 20         : 0;
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: mt }}
            >
              <PhotoCard src={photo.src} alt={photo.alt} width={w} height={h} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="pointer-events-auto glass rounded-full w-12 h-12 flex items-center justify-center text-white/80 hover:text-white hover:scale-105 active:scale-95 transition-transform"
      style={{ fontFamily: "var(--font-dm)" }}
      aria-label={dir === "left" ? "Précédent" : "Suivant"}
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}
