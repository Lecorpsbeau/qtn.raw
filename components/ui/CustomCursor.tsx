"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_COUNT = 5;

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    let rafId: number;

    // Mouse position
    let mouseX = 0, mouseY = 0;

    // Ring lags behind
    let ringX = 0, ringY = 0;

    // Trail positions — each trails the previous
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot snaps immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      // Detect hover target
      const el = document.elementFromPoint(mouseX, mouseY);
      const isPhoto = el?.closest("[data-cursor='photo']");
      const isDoor  = el?.closest("[data-cursor='door']");
      setLabel(isDoor ? "EXPLORE" : isPhoto ? "VIEW" : "");

      if (ringRef.current) {
        const isHover = Boolean(isPhoto || isDoor);
        ringRef.current.className = `cursor__ring${isHover ? " cursor__ring--hover" : ""}`;
      }
    };

    const animate = () => {
      // Ring lerps toward mouse
      ringX += (mouseX - ringX) * 0.10;
      ringY += (mouseY - ringY) * 0.10;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }

      // Trail: each point lerps toward the previous
      let prevX = mouseX, prevY = mouseY;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        trail[i].x += (prevX - trail[i].x) * (0.22 - i * 0.03);
        trail[i].y += (prevY - trail[i].y) * (0.22 - i * 0.03);
        prevX = trail[i].x;
        prevY = trail[i].y;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate(${trail[i].x}px, ${trail[i].y}px) translate(-50%, -50%)`;
          // Fade out later dots
          el.style.opacity = String(0.30 - i * 0.05);
          const size = 6 - i * 0.7;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor"
        style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
      >
        <div className="cursor__dot" />
      </div>

      {/* Trails */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          className="cursor__trail"
          style={{ transitionDelay: `${i * 16}ms` }}
        />
      ))}

      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor__ring"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {label && (
          <span style={{
            fontFamily: "var(--font-dm)",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "white",
            userSelect: "none",
          }}>
            {label}
          </span>
        )}
      </div>
    </>
  );
}
