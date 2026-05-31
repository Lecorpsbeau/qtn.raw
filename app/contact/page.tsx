"use client";

import { motion } from "framer-motion";
import { CONTACT } from "@/data/projects";
import { fadeUpVariants, softSpring } from "@/lib/utils";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 px-6 py-20">

      {/* Main card */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="glass rounded-3xl p-10 sm:p-14 flex flex-col items-center gap-8 w-full max-w-sm"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }}
      >
        {/* Instagram heading */}
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "2.6rem",
            fontWeight: 700,
            color: "white",
          }}
        >
          Instagram
        </motion.h2>

        {/* QR Code */}
        <motion.a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          whileHover={{ scale: 1.04 }}
          transition={softSpring}
          className="block rounded-2xl overflow-hidden bg-white p-4 shadow-lg"
          data-cursor="door"
        >
          <QRCode />
        </motion.a>

        {/* Handle */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "white",
          }}
        >
          {CONTACT.alias}
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-2/3 h-px bg-white/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />

        {/* Contact rows */}
        <div className="flex flex-col gap-4 w-full">
          <ContactRow
            icon="✉️"
            label={CONTACT.email}
            href={`mailto:${CONTACT.email}`}
            delay={4}
          />
          <ContactRow
            icon="📱"
            label={CONTACT.phone}
            href={`tel:+33${CONTACT.phone.replace(/\s/g, "").slice(1)}`}
            delay={5}
          />
        </div>
      </motion.div>

      {/* Social pills */}
      <motion.div
        className="flex gap-3 flex-wrap justify-center"
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={6}
      >
        {[
          { label: "Instagram", href: CONTACT.instagram },
          { label: "Behance",   href: "#" },
          { label: "VSCO",      href: "#" },
        ].map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={softSpring}
            className="rounded-full border border-white/20 hover:border-white/50 px-5 py-2 text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-dm)" }}
          >
            {s.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Name line */}
      <motion.p
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={7}
        className="text-white/25 text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: "var(--font-dm)" }}
      >
        {CONTACT.name} — ALLEYESONRAW
      </motion.p>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Contact row
// ─────────────────────────────────────────────
function ContactRow({
  icon, label, href, delay,
}: {
  icon: string; label: string; href: string; delay: number;
}) {
  return (
    <motion.a
      href={href}
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      whileHover={{ x: 4 }}
      transition={softSpring}
      className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
      style={{ fontFamily: "var(--font-dm)", fontSize: "0.9rem", fontWeight: 500 }}
    >
      <span>{icon}</span>
      <span className="group-hover:underline underline-offset-2">{label}</span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────
//  QR Placeholder (replace with real QR image)
// ─────────────────────────────────────────────
function QRCode() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
      {/* Corner markers */}
      <rect x="8"  y="8"  width="36" height="36" rx="5" fill="none" stroke="#c026d3" strokeWidth="3.5"/>
      <rect x="15" y="15" width="22" height="22" rx="3" fill="#c026d3"/>
      <rect x="96" y="8"  width="36" height="36" rx="5" fill="none" stroke="#c026d3" strokeWidth="3.5"/>
      <rect x="103" y="15" width="22" height="22" rx="3" fill="#c026d3"/>
      <rect x="8"  y="96" width="36" height="36" rx="5" fill="none" stroke="#c026d3" strokeWidth="3.5"/>
      <rect x="15" y="103" width="22" height="22" rx="3" fill="#c026d3"/>
      {/* Data dots */}
      {Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 6 }, (_, col) => {
          const x = 52 + col * 10;
          const y = 52 + row * 10;
          const show = (row + col) % 2 === 0 || (row * col) % 3 === 0;
          return show ? (
            <rect key={`${row}-${col}`} x={x} y={y} width="7" height="7" rx="1.5" fill="#c026d3" opacity="0.7"/>
          ) : null;
        })
      )}
      {/* raw text center */}
      <text x="70" y="76" textAnchor="middle" fontFamily="'Dela Gothic One',sans-serif" fontSize="11" fill="#1a1a2e">
        raw
      </text>
    </svg>
  );
}
