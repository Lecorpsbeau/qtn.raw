"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { softSpring, fadeUpVariants } from "@/lib/utils";
import { PHOTO_SPOTS } from "./InteractiveMap";

interface BookingSectionProps {
  selectedSpot: string;
}

type PackageType = "portrait" | "automobile" | "editorial";

export default function BookingSection({ selectedSpot }: BookingSectionProps) {
  // Booking Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [spot, setSpot] = useState("");
  const [msg, setMsg] = useState("");

  // Pricing & Calculator State
  const [pkg, setPkg] = useState<PackageType>("portrait");
  const [extraHours, setExtraHours] = useState(0);
  const [express, setExpress] = useState(false);
  const [studio, setStudio] = useState(false);
  const [prints, setPrints] = useState(false);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync spot state when it changes from the map click
  useEffect(() => {
    if (selectedSpot) {
      setSpot(selectedSpot);
    }
  }, [selectedSpot]);

  // Packages configurations
  const PACKAGES = {
    portrait: {
      title: "Mode & Portrait",
      price: 150,
      duration: "1 Heure",
      deliverables: "15 Photos éditées HD",
      desc: "Lifestyle, book mannequin et portraits créatifs dans Paris.",
    },
    automobile: {
      title: "Automobile Prestige",
      price: 250,
      duration: "1h30",
      deliverables: "20 Photos éditées HD",
      desc: "Clichés statiques & dynamiques (rolling shots) pour sublimer votre sportive.",
    },
    editorial: {
      title: "Éditorial / Marque",
      price: 400,
      duration: "Demi-journée",
      deliverables: "30+ Photos & droits commerciaux",
      desc: "Création de contenu d'image haut de gamme pour les marques et campagnes.",
    },
  };

  // Pricing logic
  const calculateTotal = () => {
    let base = PACKAGES[pkg].price;
    let addOns = 0;
    addOns += extraHours * 80;
    if (express) addOns += 80;
    if (studio) addOns += 150;
    if (prints) addOns += 50;
    return base + addOns;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !spot) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset fields
      setName("");
      setEmail("");
      setDate("");
      setMsg("");
    }, 1500);
  };

  return (
    <section id="booking" className="px-4 md:px-10 py-24 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="text-center mb-16"
      >
        <h2
          className="mb-3 text-gold-gradient"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontStyle: "italic",
          }}
        >
          Espace Réservation
        </h2>
        <p
          className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          Configurez votre formule sur mesure avec notre calculateur en temps réel et envoyez votre demande de shooting.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Columns (8/12) - Packages & Form */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Packages Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["portrait", "automobile", "editorial"] as const).map((type) => {
              const isSelected = pkg === type;
              const p = PACKAGES[type];
              return (
                <motion.div
                  key={type}
                  onClick={() => setPkg(type)}
                  whileHover={{ y: -4 }}
                  className={`glass p-6 rounded-2xl border cursor-pointer flex flex-col justify-between min-h-[220px] transition-all duration-300 ${
                    isSelected ? "border-[var(--c-gold)] shadow-xl" : "border-white/10"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-base" style={{ fontFamily: "var(--font-playfair)" }}>
                        {p.title}
                      </h3>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--c-gold)] shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
                      )}
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed mb-4" style={{ fontFamily: "var(--font-dm)" }}>
                      {p.desc}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline font-mono text-xs text-white/50 mb-1">
                      <span>{p.duration}</span>
                      <span>{p.deliverables}</span>
                    </div>
                    <div className="text-2xl font-bold text-[var(--c-gold)] font-mono">
                      {p.price}€<span className="text-xs text-white/40 font-normal"> base</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Booking Form Card */}
          <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
            
            {/* macOS title bar */}
            <div className="flex items-center gap-1.5 mb-8">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="text-white/30 text-xs font-mono ml-4 select-none">request_form.conf</span>
            </div>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-mono text-white/30">Nom complet</label>
                <input
                  type="text"
                  required
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ fontFamily: "var(--font-dm)" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-mono text-white/30">Adresse Email</label>
                <input
                  type="email"
                  required
                  placeholder="jean.dupont@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ fontFamily: "var(--font-dm)" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-mono text-white/30">Date souhaitée</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ fontFamily: "var(--font-dm)" }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-mono text-white/30">Spot de shooting</label>
                <select
                  required
                  value={spot}
                  onChange={(e) => setSpot(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--c-gold)] transition-colors"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  <option value="" disabled className="bg-neutral-900 text-white/50">Sélectionnez un spot</option>
                  {PHOTO_SPOTS.map((s) => (
                    <option key={s.id} value={s.name} className="bg-neutral-900 text-white">
                      {s.name}
                    </option>
                  ))}
                  <option value="Autre spot personnalisé" className="bg-neutral-900 text-white">Autre spot (à définir)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-mono text-white/30">Description / Idées créatives</label>
                <textarea
                  placeholder="Dites-m'en plus sur votre projet, la voiture à shooter, le style vestimentaire ou la direction artistique souhaitée..."
                  rows={4}
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--c-gold)] transition-colors resize-none"
                  style={{ fontFamily: "var(--font-dm)" }}
                />
              </div>

              <div className="md:col-span-2 mt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[var(--c-gold)] text-neutral-900 font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ fontFamily: "var(--font-dm)" }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-900" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Envoi de la demande en cours...
                    </>
                  ) : "Envoyer ma demande de réservation"}
                </motion.button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column (4/12) - macOS System Config styled Quote Calculator */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="glass rounded-3xl p-6 border border-white/10 shadow-xl">
            
            {/* macOS header controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono text-[9px] tracking-wider text-white/30 uppercase">Tarif Estimatif</span>
            </div>

            {/* Config list resembling macOS settings menu */}
            <div className="flex flex-col gap-5 mb-8">
              <h3 className="font-bold text-white text-sm tracking-wide font-mono uppercase text-white/30">Formule & Options</h3>
              
              {/* Formula summary */}
              <div className="flex justify-between items-baseline py-1">
                <span className="text-white/60 text-xs font-medium">Formule : {PACKAGES[pkg].title}</span>
                <span className="font-mono text-xs text-white font-bold">{PACKAGES[pkg].price} €</span>
              </div>

              <div className="w-full h-px bg-white/5" />

              {/* Extra Hours Selector */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white text-xs font-semibold">Heures sup. (+80€/h)</span>
                  <span className="text-[10px] text-white/30 font-mono">Prolongez la session</span>
                </div>
                <div className="flex items-center gap-2 bg-black/30 rounded-lg p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setExtraHours(h => Math.max(0, h - 1))}
                    className="w-6 h-6 flex items-center justify-center text-xs text-white/50 hover:text-white rounded hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs text-white font-bold px-1 w-4 text-center">{extraHours}</span>
                  <button
                    type="button"
                    onClick={() => setExtraHours(h => Math.min(4, h + 1))}
                    className="w-6 h-6 flex items-center justify-center text-xs text-white/50 hover:text-white rounded hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Toggle option 1: Studio */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white text-xs font-semibold">Studio Indoor (+150€)</span>
                  <span className="text-[10px] text-white/30 font-mono">Location de studio photo</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStudio(!studio)}
                  className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    studio ? "bg-[var(--c-gold)]" : "bg-neutral-800"
                  }`}
                >
                  <motion.span
                    layout
                    transition={softSpring}
                    className="w-5 h-5 rounded-full bg-white shadow"
                    style={{ marginLeft: studio ? "14px" : "0px" }}
                  />
                </button>
              </div>

              {/* Toggle option 2: Express */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white text-xs font-semibold">Retouche Express (+80€)</span>
                  <span className="text-[10px] text-white/30 font-mono">Livraison garantie sous 48h</span>
                </div>
                <button
                  type="button"
                  onClick={() => setExpress(!express)}
                  className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    express ? "bg-[var(--c-gold)]" : "bg-neutral-800"
                  }`}
                >
                  <motion.span
                    layout
                    transition={softSpring}
                    className="w-5 h-5 rounded-full bg-white shadow"
                    style={{ marginLeft: express ? "14px" : "0px" }}
                  />
                </button>
              </div>

              {/* Toggle option 3: Prints */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-white text-xs font-semibold">Tirages Fine Art x5 (+50€)</span>
                  <span className="text-[10px] text-white/30 font-mono">Impressions physiques haute fidélité</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPrints(!prints)}
                  className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                    prints ? "bg-[var(--c-gold)]" : "bg-neutral-800"
                  }`}
                >
                  <motion.span
                    layout
                    transition={softSpring}
                    className="w-5 h-5 rounded-full bg-white shadow"
                    style={{ marginLeft: prints ? "14px" : "0px" }}
                  />
                </button>
              </div>

            </div>

            {/* Total Breakdown */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-white/40 text-xs font-mono uppercase tracking-wider">Total estimé</span>
                <span className="text-3xl font-bold text-[var(--c-gold)] font-mono">
                  {calculateTotal()} €
                </span>
              </div>
              <p className="text-[10px] text-white/30 leading-normal italic text-center font-mono">
                * Le tarif final sera validé d'un commun accord selon le spot final et les exigences créatives.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* macOS Dialog Success Popup */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={softSpring}
              className="glass max-w-sm w-full rounded-2xl border border-white/10 p-6 shadow-2xl flex flex-col items-center text-center"
            >
              {/* macOS window warning dots decoration */}
              <div className="w-full flex justify-start gap-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
              </div>

              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-lg mb-4">
                ✓
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Demande Reçue !
              </h3>
              
              <p className="text-white/60 text-xs leading-relaxed mb-6" style={{ fontFamily: "var(--font-dm)" }}>
                Merci pour votre intérêt. Votre configuration de shooting a bien été enregistrée. Quentin prendra contact avec vous par e-mail dans les plus brefs délais pour convenir de la direction artistique.
              </p>

              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="w-full py-2.5 rounded-lg bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-200 transition-colors"
                style={{ fontFamily: "var(--font-dm)" }}
              >
                Fermer la fenêtre
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
