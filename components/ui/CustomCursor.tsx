"use client";

import { useEffect, useRef } from "react";

const MAX_AGE = 24; // Durée de vie de la traînée du pinceau (plus grand = traînée plus longue)

interface Point {
  x: number;
  y: number;
  age: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, ringX: 0, ringY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let currentLabel = "";

    // 1. Ajuster la taille du canvas à l'écran
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 2. Capture des mouvements de la souris
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Le point central suit immédiatement la souris
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // On injecte un nouveau point dans l'historique du pinceau
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    // 3. Gestion du texte au survol (VIEW / EXPLORE)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isPhoto = target.closest("[data-cursor='photo']");
      const isDoor = target.closest("[data-cursor='door']");
      const nextLabel = isDoor ? "EXPLORE" : isPhoto ? "VIEW" : "";

      if (nextLabel !== currentLabel) {
        currentLabel = nextLabel;
        if (labelRef.current) labelRef.current.innerText = nextLabel;
        if (ringRef.current) {
          ringRef.current.className = `cursor__ring${nextLabel ? " cursor__ring--hover" : ""}`;
        }
      }
    };

    // 4. Boucle d'animation (Rendu du Brush sur le Canvas)
    const animate = () => {
      const { x, y } = mouseRef.current;

      // Amortissement de la bague texturée extérieure
      mouseRef.current.ringX += (x - mouseRef.current.ringX) * 0.12;
      mouseRef.current.ringY += (y - mouseRef.current.ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouseRef.current.ringX}px, ${mouseRef.current.ringY}px, 0) translate(-50%, -50%)`;
      }

      // Nettoyage de l'écran précédent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Vieillissement et filtrage des points morts
      pointsRef.current.forEach((p) => p.age++);
      pointsRef.current = pointsRef.current.filter((p) => p.age < MAX_AGE);

      const points = pointsRef.current;

      if (points.length > 1) {
        // Dessin du tracé du pinceau
        for (let i = 1; i < points.length; i++) {
          const pStart = points[i - 1];
          const pEnd = points[i];

          const life = 1 - pStart.age / MAX_AGE; // 1 au début, tend vers 0 à la fin

          ctx.beginPath();
          ctx.moveTo(pStart.x, pStart.y);
          ctx.lineTo(pEnd.x, pEnd.y);

          // Rendu du pinceau : couleur blanche en "mix-blend-difference" 
          // sur ton fond crème, ça va dessiner une encre sombre magnifique et magique.
          ctx.strokeStyle = `rgba(255, 255, 255, ${life * 0.45})`;
          ctx.lineWidth = life * 14; // Épaisseur maximale du brush à la pointe (14px)
          ctx.lineCap = "round";     // Extrémités arrondies pour l'effet fluide
          ctx.lineJoin = "round";    // Angles adoucis
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Le Canvas magique pour la traînée de peinture/brush */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997] mix-blend-difference"
      />

      {/* Le point d'impact précis au centre */}
      <div
        ref={dotRef}
        className="cursor"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}
      >
        <div className="cursor__dot" />
      </div>

      {/* La bague interactive avec le texte dedans */}
      <div
        ref={ringRef}
        className="cursor__ring"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: 0, left: 0 }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-dm)",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "white",
            userSelect: "none",
          }}
        />
      </div>
    </>
  );
}