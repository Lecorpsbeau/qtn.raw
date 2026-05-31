"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { ARTWORK_CATEGORIES, type ArtworkCategory, type Series } from "@/data/projects";
import PhotoStrip from "@/components/ui/PhotoStrip";
import SeriesTitle from "@/components/ui/SeriesTitle";
import { fadeUpVariants, shutterVariants } from "@/lib/utils";

export default function ArtworkPage() {
  return (
    <Suspense>
      <ArtworkContent />
    </Suspense>
  );
}

function ArtworkContent() {
  const params   = useSearchParams();
  const router   = useRouter();
  const initSlug = params.get("cat") ?? ARTWORK_CATEGORIES[0].slug;

  const [activeCat,    setActiveCat]    = useState<ArtworkCategory>(
    () => ARTWORK_CATEGORIES.find((c) => c.slug === initSlug) ?? ARTWORK_CATEGORIES[0]
  );
  const [activeSeriesIdx, setActiveSeriesIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  /* Keep URL in sync */
  useEffect(() => {
    router.replace(`/artwork?cat=${activeCat.slug}`, { scroll: false });
  }, [activeCat.slug, router]);

  const activeSeries: Series = activeCat.series[activeSeriesIdx];

  const switchCat = (cat: ArtworkCategory) => {
    setDirection(ARTWORK_CATEGORIES.indexOf(cat) > ARTWORK_CATEGORIES.indexOf(activeCat) ? 1 : -1);
    setActiveCat(cat);
    setActiveSeriesIdx(0);
  };

  const prevSeries = () => {
    if (activeSeriesIdx > 0) {
      setDirection(-1);
      setActiveSeriesIdx((i) => i - 1);
    }
  };

  const nextSeries = () => {
    if (activeSeriesIdx < activeCat.series.length - 1) {
      setDirection(1);
      setActiveSeriesIdx((i) => i + 1);
    }
  };

  return (
    <div className="min-h-screen pb-32">

      {/* ── Category Tabs ── */}
      <div className="flex items-center justify-between px-8 md:px-12 pt-8 pb-6 gap-4 flex-wrap">
        {/* Left: active badge */}
        <div className="flex items-center gap-3">
          <span
            className="border-2 border-white rounded-full px-5 py-1.5 text-sm font-bold text-white italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {activeCat.label}
          </span>

          {/* Featuring tag */}
          {activeSeries.featuring && (
            <motion.span
              key={activeSeries.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white/60 text-sm"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              ft. {activeSeries.featuring}
            </motion.span>
          )}
        </div>

        {/* Right: category nav */}
        <nav className="flex items-center gap-6">
          {ARTWORK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => switchCat(cat)}
              className="relative text-sm transition-colors"
              style={{
                fontFamily: "var(--font-dm)",
                fontWeight: activeCat.id === cat.id ? 700 : 400,
                color: activeCat.id === cat.id ? "white" : "rgba(255,255,255,0.55)",
              }}
              data-cursor="nav"
            >
              {cat.label}
              {activeCat.id === cat.id && (
                <motion.span
                  layoutId="cat-underline"
                  style={{
                    position: "absolute",
                    bottom: -2, left: 0, right: 0,
                    height: 1.5,
                    background: "white",
                    borderRadius: 1,
                  }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Series Navigator (only if multiple series) ── */}
      {activeCat.series.length > 1 && (
        <div className="flex items-center justify-center gap-10 px-8 mb-8">
          <NavArrow dir="left"  onClick={prevSeries} disabled={activeSeriesIdx === 0} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSeries.id}
              custom={direction}
              variants={{
                enter:  (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } },
                exit:   (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.3 } }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center"
            >
              <SeriesTitle title={activeSeries.title} style={activeSeries.titleStyle} />
              {activeSeries.subtitle && (
                <p className="text-white/50 text-sm mt-1 italic" style={{ fontFamily: "var(--font-dm)" }}>
                  {activeSeries.subtitle}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <NavArrow dir="right" onClick={nextSeries} disabled={activeSeriesIdx === activeCat.series.length - 1} />
        </div>
      )}

      {/* ── Single series title ── */}
      {activeCat.series.length === 1 && (
        <motion.div
          key={activeSeries.id}
          variants={shutterVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center mb-8 px-8"
        >
          <SeriesTitle title={activeSeries.title} style={activeSeries.titleStyle} />
        </motion.div>
      )}

      {/* ── Photo Strip ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSeries.id}
          variants={shutterVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <PhotoStrip photos={activeSeries.photos} />
        </motion.div>
      </AnimatePresence>

      {/* ── Pagination dots ── */}
      {activeCat.series.length > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {activeCat.series.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setDirection(i > activeSeriesIdx ? 1 : -1); setActiveSeriesIdx(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width:   i === activeSeriesIdx ? 24 : 8,
                height:  8,
                background: i === activeSeriesIdx ? "white" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Serie ${s.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NavArrow({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="glass rounded-full w-12 h-12 flex items-center justify-center text-white transition-all
                 disabled:opacity-25 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
      data-cursor="nav"
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}
