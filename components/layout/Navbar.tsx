"use client";

const NAV_ITEMS = [
  { label: "Galerie", href: "#gallery" },
  { label: "Carte Spots", href: "#interactive-map" },
  { label: "Réservation", href: "#booking" },
  { label: "FAQ", href: "#social" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12"
      style={{ height: "var(--nav-h)" }}
    >
      {/* Logo */}
      <a href="#hero" className="flex-shrink-0" data-cursor="nav">
        <img
          src="/logow.png"
          alt="RAW Logo"
          className="w-16 sm:w-20 h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
        />
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