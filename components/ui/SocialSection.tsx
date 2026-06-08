"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { softSpring, fadeUpVariants } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Quels sont les délais de livraison des photos ?",
    answer: "Les photos éditées sont livrées sous 7 jours ouvrés par défaut sous forme de galerie privée en ligne. L'option 'Retouche Express' permet de garantir une livraison complète et soignée en moins de 48 heures.",
  },
  {
    question: "Comment se déroule la sélection du lieu du shooting ?",
    answer: "Vous pouvez explorer notre carte interactive des spots en Île-de-France pour vous inspirer et sélectionner un lieu favori. Si vous préférez un autre lieu spécifique (domaine privé, hangar, rue précise), nous validons ensemble la faisabilité logistique lors de notre échange préparatoire.",
  },
  {
    question: "Quels types de véhicules photographies-tu ?",
    answer: "Je photographie tout type de véhicule d'exception : voitures de sport modernes, supercars, véhicules historiques, motos de caractère ou projets customisés. Les séances intègrent des prises statiques détaillées et des prises dynamiques en roulant.",
  },
  {
    question: "Est-il possible de réaliser le shooting en studio ?",
    answer: "Oui, tout à fait. Si vous sélectionnez l'option 'Studio Indoor', je m'occupe de la réservation et de la logistique d'un studio professionnel adapté (fonds neutres, éclairages flash ou ambiance cinéma) à Paris ou proche banlieue.",
  },
  {
    question: "Que se passe-t-il en cas de mauvaise météo ?",
    answer: "Pour les shootings en extérieur, nous suivons de près la météo. En cas de forte pluie ou de luminosité rendant le shooting impossible, nous décalons la séance d'un commun accord à la date disponible la plus proche, sans frais supplémentaires.",
  },
];

interface Testimonial {
  author: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    author: "@les_distingues",
    role: "Marque & Éditorial",
    avatar: "LD",
    rating: 5,
    text: "Des clichés d'une authenticité incroyable. Quentin sait capter le mouvement brut et les matières sans aucune fioriture. Notre campagne de vêtements a eu un impact visuel marquant.",
  },
  {
    author: "@porschekultur",
    role: "Automobile Prestige",
    avatar: "PK",
    rating: 5,
    text: "Le shooting de la 911 Dakar aux aurores était exceptionnel. Quentin a un œil unique pour composer avec le paysage et faire ressortir le caractère agressif et aventurier de la voiture.",
  },
  {
    author: "@lu.d.vine",
    role: "Mannequin & Book",
    avatar: "LV",
    rating: 5,
    text: "Une séance de portrait très agréable et professionnelle. Quentin met immédiatement à l'aise, et le résultat final reflète parfaitement une esthétique naturelle, sans filtre inutile.",
  },
];

export default function SocialSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <section id="social" className="px-4 md:px-10 py-24 max-w-7xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: Testimonials / Témoignages */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <h2
              className="mb-4 inline-block glass rounded-full px-6 py-2 text-gold-gradient select-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                fontStyle: "italic",
              }}
            >
              Avis Clients
            </h2>
            <p
              className="text-white/50 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              Ce que disent les marques, collectionneurs et modèles qui m'ont fait confiance pour capturer leurs projets.
            </p>
          </motion.div>

          {/* Testimonial Cards structured like macOS Toast notifications */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariants}
                custom={idx}
                className="glass p-5 rounded-2xl border border-white/10 shadow-lg flex items-start gap-4"
              >
                {/* macOS styled notification icon/avatar */}
                <div className="w-10 h-10 rounded-xl bg-[var(--c-gold)] text-neutral-900 font-bold font-mono text-xs flex items-center justify-center flex-shrink-0 select-none">
                  {t.avatar}
                </div>

                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-dm)" }}>
                      {t.author}
                    </span>
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                      {t.role}
                    </span>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex gap-0.5 text-xs text-[var(--c-gold)] mb-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-white/70 text-xs leading-relaxed italic" style={{ fontFamily: "var(--font-dm)" }}>
                    "{t.text}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: FAQ Accordion */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariants}
          >
            <h2
              className="mb-4 inline-block glass rounded-full px-6 py-2 text-gold-gradient select-none"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                fontStyle: "italic",
              }}
            >
              FAQ Dynamique
            </h2>
            <p
              className="text-white/50 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm)" }}
            >
              Des questions sur le déroulement d'une séance photo ? Retrouvez les réponses rapides pour préparer votre projet.
            </p>
          </motion.div>

          {/* Accordion container resembling macOS list view */}
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="glass rounded-xl overflow-hidden border border-white/10"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    type="button"
                    className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors hover:bg-white/5"
                  >
                    <span className="font-semibold text-white text-xs md:text-sm" style={{ fontFamily: "var(--font-dm)" }}>
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={softSpring}
                      className="text-[var(--c-gold)] text-xs font-mono ml-4"
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-5 pt-1 text-white/60 text-xs leading-relaxed border-t border-white/5 font-light" style={{ fontFamily: "var(--font-dm)" }}>
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
