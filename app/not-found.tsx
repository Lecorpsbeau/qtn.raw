import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
      <p
        className="text-8xl font-black text-white/10"
        style={{ fontFamily: "var(--font-dela)" }}
      >
        404
      </p>
      <p
        className="text-white/50 text-sm tracking-widest uppercase"
        style={{ fontFamily: "var(--font-dm)" }}
      >
        Page introuvable
      </p>
      <Link
        href="/"
        className="glass rounded-full px-6 py-2.5 text-sm text-white hover:text-white/80 transition-colors"
        style={{ fontFamily: "var(--font-dm)" }}
      >
        ← Retour
      </Link>
    </div>
  );
}
