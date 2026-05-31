"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { TIMELINE_ENTRIES } from "@/data/projects";
import { fadeUpVariants } from "@/lib/utils";

export default function TimelinePage() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const topItems    = TIMELINE_ENTRIES.filter((_, i) => i % 2 === 0);
  const bottomItems = TIMELINE_ENTRIES.filter((_, i) => i % 2 !== 0);

  /* Each column is 200px + 32px gap */
  const COL_W = 200;
  const GAP   = 32;
  const totalW = `${TIMELINE_ENTRIES.length * (COL_W + GAP)}px`;

  return (
    <div className="min-h-screen pb-32 overflow-hidden">

      {/* Header */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="flex items-center justify-between px-8 md:px-12 pt-8 pb-10"
      >
        <h1
          className="text-white/40 text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Timeline
        </h1>
        <p
          className="text-white/30 text-xs"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Août 2024 — Janv. 2026
        </p>
      </motion.div>

      {/* Horizontal scroll progress bar */}
      <div className="mx-8 md:mx-12 mb-8 h-px bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white/60 rounded-full origin-left"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Scrollable timeline */}
      <div
        ref={containerRef}
        className="overflow-x-auto no-scrollbar px-8 md:px-12"
      >
        <div style={{ width: totalW, minWidth: "max-content" }}>

          {/* Top row */}
          <div className="flex gap-8 mb-4">
            {topItems.map((entry, i) => (
              <TimelineCard key={entry.id} entry={entry} position="top" index={i * 2} />
            ))}
          </div>

          {/* Center timeline bar */}
          <TimelineBar entries={TIMELINE_ENTRIES} colW={COL_W} gap={GAP} />

          {/* Bottom row */}
          <div className="flex gap-8 mt-4">
            {bottomItems.map((entry, i) => (
              <TimelineCard key={entry.id} entry={entry} position="bottom" index={i * 2 + 1} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  TIMELINE BAR
// ─────────────────────────────────────────────
function TimelineBar({
  entries,
  colW,
  gap,
}: {
  entries: typeof TIMELINE_ENTRIES;
  colW: number;
  gap: number;
}) {
  return (
    <div className="relative flex items-center" style={{ height: 24 }}>
      {/* Line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-white/30"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Dots */}
      {entries.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full bg-white border border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ left: i * (colW + gap) + colW / 2 - 5 }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4, type: "spring", stiffness: 400 }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  TIMELINE CARD
// ─────────────────────────────────────────────
function TimelineCard({
  entry,
  position,
  index,
}: {
  entry: typeof TIMELINE_ENTRIES[0];
  position: "top" | "bottom";
  index: number;
}) {
  const href = entry.seriesRef
    ? `/artwork?cat=${entry.seriesRef}`
    : "/artwork";

  return (
    <motion.div
      className="flex flex-col items-center gap-3 flex-shrink-0"
      style={{ width: 200 }}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index * 0.5}
    >
      {position === "bottom" && (
        <span
          className="text-white/80 text-sm font-bold italic text-center"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {entry.date}
        </span>
      )}

      <Link href={href}>
        <motion.div
          className="photo-card"
          style={{ width: 180, height: 220 }}
          whileHover={{ y: -6, scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          data-cursor="photo"
        >
          <Image
            src={entry.cover}
            alt={entry.title}
            width={180}
            height={220}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            draggable={false}
          />
        </motion.div>
      </Link>

      {position === "top" && (
        <span
          className="text-white/80 text-sm font-bold italic text-center"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {entry.date}
        </span>
      )}

      <p
        className="text-white/55 text-xs text-center leading-tight"
        style={{ fontFamily: "var(--font-dm)" }}
      >
        {entry.title}
      </p>
    </motion.div>
  );
}
