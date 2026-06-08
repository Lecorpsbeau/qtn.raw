import { cn } from "@/lib/utils";

interface SeriesTitleProps {
  title: string;
  style: "script" | "bold-serif" | "plain" | "glass-gold";
  as?: "h1" | "h2" | "h3" | "span"; // Permet de gérer la sémantique HTML / SEO
  className?: string;
}

export default function SeriesTitle({ title, style, as: Component = "span", className }: SeriesTitleProps) {

  // Centralisation des configurations de styles
  const styleConfigs = {
    "glass-gold": {
      className: "inline-block glass rounded-full px-6 py-2 md:px-8 md:py-3 text-gold-gradient select-none",
      style: {
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)",
        fontStyle: "italic",
      },
    },
    script: {
      className: "text-gold-gradient inline-block",
      style: {
        fontFamily: "var(--font-dancing)",
        fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
        fontWeight: 700,
        filter: "drop-shadow(0 2px 8px rgba(245,200,66,0.35))",
      },
    },
    "bold-serif": {
      className: "text-white inline-block",
      style: {
        fontFamily: "var(--font-playfair)",
        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
        fontWeight: 900,
        fontStyle: "italic",
        letterSpacing: "0.04em",
      },
    },
    plain: {
      className: "text-white font-semibold",
      style: {
        fontFamily: "var(--font-dm)",
        fontSize: "1.2rem",
      },
    },
  };

  const currentConfig = styleConfigs[style];

  return (
    <Component
      className={cn(currentConfig.className, className)}
      style={currentConfig.style}
    >
      {title}
    </Component>
  );
}