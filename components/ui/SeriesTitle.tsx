import { cn } from "@/lib/utils";

interface SeriesTitleProps {
  title:      string;
  style:      "script" | "bold-serif" | "plain";
  className?: string;
}

export default function SeriesTitle({ title, style, className }: SeriesTitleProps) {
  if (style === "script") {
    return (
      <span
        className={cn("text-gold-gradient", className)}
        style={{
          fontFamily: "var(--font-dancing)",
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          fontWeight: 700,
          filter: "drop-shadow(0 2px 8px rgba(245,200,66,0.35))",
          display: "inline-block",
        }}
      >
        {title}
      </span>
    );
  }

  if (style === "bold-serif") {
    return (
      <span
        className={cn("text-white", className)}
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
          fontWeight: 900,
          fontStyle: "italic",
          letterSpacing: "0.04em",
          display: "inline-block",
        }}
      >
        {title}
      </span>
    );
  }

  return (
    <span
      className={cn("text-white font-semibold", className)}
      style={{ fontFamily: "var(--font-dm)", fontSize: "1.2rem" }}
    >
      {title}
    </span>
  );
}
