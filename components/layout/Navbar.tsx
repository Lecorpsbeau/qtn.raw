"use client";

const NAV_ITEMS = [
  { label: "Galerie",     href: "#gallery" },
  { label: "Carte Spots", href: "#interactive-map" },
  { label: "Réservation", href: "#booking" },
  { label: "FAQ",         href: "#social" },
  { label: "Contact",     href: "#contact" },
] as const;

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12"
      style={{ height: "var(--nav-h)" }}
    >
      {/* Logo */}
      <a href="#hero" className="flex-shrink-0" data-cursor="nav">
        <RawLogo />
      </a>

      {/* Nav pill */}
      <nav
        className="glass rounded-full flex items-center gap-1 px-4 py-2"
        data-cursor="nav"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="relative px-4 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 select-none"
            style={{ fontFamily: "var(--font-dm)" }}
            data-cursor="nav"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ── SVG Logo ── */
function RawLogo() {
  return (
    <svg
      width="88"
      height="40"
      viewBox="0 0 88 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="RAW"
    >
      {/* Spikes */}
      <line x1="4"  y1="6"  x2="13" y2="20" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="4"  y1="6"  x2="18" y2="15" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="84" y1="4"  x2="76" y2="18" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="84" y1="4"  x2="70" y2="13" stroke="white" strokeWidth="1.6" strokeLinecap="round" />

      {/* Text */}
      <text
        x="8"
        y="33"
        fontFamily="'Dela Gothic One', sans-serif"
        fontSize="26"
        fill="white"
        letterSpacing="-0.5"
      >
        raw
      </text>
    </svg>
  );
}
