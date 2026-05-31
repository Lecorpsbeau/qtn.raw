// ============================================================
//  data/projects.ts
//  Single source of truth for all portfolio content.
//  Replace placeholder Unsplash URLs with real Cloudinary URLs.
// ============================================================

export type Category = "portrait" | "mannequin" | "automobile" | "else";

export interface Photo {
  id:  string;
  src: string;
  alt: string;
  width?:  number;
  height?: number;
}

export interface Series {
  id:          string;
  title:       string;           // "TURISMO" | "Ludivine" | "Snowy" …
  featuring?:  string;           // "@lu.d.vine"
  subtitle?:   string;           // "extra" | "Roughroads #176"
  titleStyle:  "script" | "bold-serif" | "plain";
  photos:      Photo[];
}

export interface ArtworkCategory {
  id:     string;
  slug:   string;
  label:  string;
  category: Category;
  series: Series[];
}

export interface TimelineEntry {
  id:     string;
  date:   string;           // display string "Août 2024"
  isoDate: string;          // for sorting "2024-08"
  title:  string;
  seriesRef?: string;       // series.id for deep-link
  cover:  string;           // photo URL
}

// ─────────────────────────────────────────────
//  ARTWORK CATEGORIES
// ─────────────────────────────────────────────

export const ARTWORK_CATEGORIES: ArtworkCategory[] = [
  // ── PORTRAITS ──────────────────────────────
  {
    id: "portraits",
    slug: "portraits",
    label: "Portraits",
    category: "portrait",
    series: [
      {
        id: "edouard",
        title: "Edouard",
        featuring: "@edouard_trt",
        titleStyle: "script",
        photos: [
          { id: "e1", src: "https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=600&q=80", alt: "Edouard — basketball court 1" },
          { id: "e2", src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&q=80", alt: "Edouard — portrait 2" },
          { id: "e3", src: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=600&q=80", alt: "Edouard — AND ONE 3" },
          { id: "e4", src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80", alt: "Edouard — fisheye 4" },
          { id: "e5", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80", alt: "Edouard — action 5" },
        ],
      },
      {
        id: "distingues",
        title: "Les Distingués",
        featuring: "@les_distingues",
        titleStyle: "script",
        photos: [
          { id: "d1", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80", alt: "Les Distingués — Paris 1" },
          { id: "d2", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", alt: "Les Distingués — costumes 2" },
          { id: "d3", src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80", alt: "Les Distingués — editorial 3" },
          { id: "d4", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80", alt: "Les Distingués — groupe 4" },
          { id: "d5", src: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=600&q=80", alt: "Les Distingués — duo 5" },
        ],
      },
      {
        id: "ludivine",
        title: "Ludivine",
        featuring: "@lu.d.vine",
        titleStyle: "script",
        photos: [
          { id: "l1", src: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=600&q=80", alt: "Ludivine — bonnet 1" },
          { id: "l2", src: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=600&q=80", alt: "Ludivine — extérieur 2" },
          { id: "l3", src: "https://images.unsplash.com/photo-1509460913899-515f1df34fea?w=600&q=80", alt: "Ludivine — Carhartt 3" },
          { id: "l4", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", alt: "Ludivine — hiver 4" },
          { id: "l5", src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80", alt: "Ludivine — street 5" },
        ],
      },
    ],
  },

  // ── MANNEQUINS ─────────────────────────────
  {
    id: "mannequins",
    slug: "mannequins",
    label: "Mannequins",
    category: "mannequin",
    series: [
      {
        id: "snowy",
        title: "Snowy",
        featuring: "@quirks_929 & @soln_912",
        titleStyle: "script",
        photos: [
          { id: "s1", src: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80", alt: "Snowy — neige 1" },
          { id: "s2", src: "https://images.unsplash.com/photo-1548745578-3e5a40c5a5f4?w=600&q=80", alt: "Snowy — masques 2" },
          { id: "s3", src: "https://images.unsplash.com/photo-1512551980832-13df02babc9e?w=600&q=80", alt: "Snowy — look hiver 3" },
          { id: "s4", src: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=600&q=80", alt: "Snowy — duo ski 4" },
          { id: "s5", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", alt: "Snowy — montagne 5" },
        ],
      },
    ],
  },

  // ── AUTOMOBILES ────────────────────────────
  {
    id: "automobiles",
    slug: "automobiles",
    label: "Automobiles",
    category: "automobile",
    series: [
      {
        id: "turismo",
        title: "TURISMO",
        titleStyle: "bold-serif",
        photos: [
          { id: "t1", src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", alt: "Turismo — Lamborghini violet 1" },
          { id: "t2", src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", alt: "Turismo — château 2" },
          { id: "t3", src: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&q=80", alt: "Turismo — jardin français 3" },
          { id: "t4", src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80", alt: "Turismo — détail 4" },
          { id: "t5", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Turismo — modèle 5" },
        ],
      },
      {
        id: "dakar",
        title: "911 Dakar",
        subtitle: "Roughroads #176",
        titleStyle: "bold-serif",
        photos: [
          { id: "dk1", src: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=600&q=80", alt: "911 Dakar — piscine 1" },
          { id: "dk2", src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80", alt: "911 Dakar — villa 2" },
          { id: "dk3", src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", alt: "911 Dakar — Roughroads 3" },
          { id: "dk4", src: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=600&q=80", alt: "911 Dakar — détail 4" },
          { id: "dk5", src: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80", alt: "911 Dakar — duo 5" },
        ],
      },
      {
        id: "eccentrica",
        title: "ECCENTRICA",
        titleStyle: "bold-serif",
        photos: [
          { id: "ec1", src: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", alt: "Eccentrica — jaune fluo 1" },
          { id: "ec2", src: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=600&q=80", alt: "Eccentrica — studio 2" },
          { id: "ec3", src: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&q=80", alt: "Eccentrica — render 3" },
        ],
      },
      {
        id: "bmw-art-car",
        title: "BMW Art Car",
        subtitle: "Andy Warhol",
        titleStyle: "bold-serif",
        photos: [
          { id: "ba1", src: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80", alt: "BMW Art Car — exposition 1" },
          { id: "ba2", src: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80", alt: "BMW Art Car — Warhol 2" },
          { id: "ba3", src: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=600&q=80", alt: "BMW Art Car — intérieur 3" },
          { id: "ba4", src: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80", alt: "BMW Art Car — détail 4" },
          { id: "ba5", src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", alt: "BMW Art Car — modèle 5" },
        ],
      },
      {
        id: "porsche-356",
        title: "Porsche 356",
        subtitle: "Tour Eiffel",
        titleStyle: "bold-serif",
        photos: [
          { id: "p1", src: "https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?w=600&q=80", alt: "Porsche 356 — Eiffel 1" },
          { id: "p2", src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80", alt: "Porsche 356 — Paris 2" },
          { id: "p3", src: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80", alt: "Porsche 356 — bleue 3" },
        ],
      },
      {
        id: "bmw-m3",
        title: "BMW M3",
        subtitle: "E46 Wedding",
        titleStyle: "bold-serif",
        photos: [
          { id: "bm1", src: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=600&q=80", alt: "BMW M3 — mariage 1" },
          { id: "bm2", src: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=80", alt: "BMW M3 — domaine 2" },
          { id: "bm3", src: "https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=600&q=80", alt: "BMW M3 — blanc 3" },
          { id: "bm4", src: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&q=80", alt: "BMW M3 — détail 4" },
          { id: "bm5", src: "https://images.unsplash.com/photo-1471479917193-f00955256257?w=600&q=80", alt: "BMW M3 — fleurs 5" },
        ],
      },
    ],
  },

  // ── NATURE-LIFE & ELSE ─────────────────────
  {
    id: "else",
    slug: "else",
    label: "Nature-Life & Else",
    category: "else",
    series: [
      {
        id: "nature-life",
        title: "Nature-Life",
        subtitle: "extra",
        titleStyle: "script",
        photos: [
          { id: "n1", src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80", alt: "Coucher de soleil" },
          { id: "n2", src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=80", alt: "Nature 2" },
          { id: "n3", src: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80", alt: "Papillon" },
          { id: "n4", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", alt: "Lune" },
          { id: "n5", src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80", alt: "Équitation" },
        ],
      },
      {
        id: "else-series",
        title: "Else",
        subtitle: "extra",
        titleStyle: "script",
        photos: [
          { id: "el1", src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80", alt: "ALLEYESONRAW hoodie 1" },
          { id: "el2", src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80", alt: "Skate silhouette 2" },
          { id: "el3", src: "https://images.unsplash.com/photo-1504901191-b79b8cd02af0?w=600&q=80", alt: "Urban 3" },
          { id: "el4", src: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&q=80", alt: "Else 4" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────
//  TIMELINE
// ─────────────────────────────────────────────

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: "tl-1",
    date: "Août 2024",
    isoDate: "2024-08",
    title: "Lamborghini × Modèle",
    seriesRef: "turismo",
    cover: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&q=80",
  },
  {
    id: "tl-2",
    date: "Févr. 2025",
    isoDate: "2025-02",
    title: "BMW Art Car — Andy Warhol",
    seriesRef: "bmw-art-car",
    cover: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&q=80",
  },
  {
    id: "tl-3",
    date: "Juin 2025",
    isoDate: "2025-06",
    title: "Porsche 911 Dakar",
    seriesRef: "dakar",
    cover: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=300&q=80",
  },
  {
    id: "tl-4",
    date: "Juin 2025",
    isoDate: "2025-06",
    title: "Les Distingués",
    seriesRef: "distingues",
    cover: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80",
  },
  {
    id: "tl-5",
    date: "Juil. 2025",
    isoDate: "2025-07",
    title: "Edouard — Basket",
    seriesRef: "edouard",
    cover: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=300&q=80",
  },
  {
    id: "tl-6",
    date: "Sept. 2025",
    isoDate: "2025-09",
    title: "Snowy — Shooting Ski",
    seriesRef: "snowy",
    cover: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=300&q=80",
  },
  {
    id: "tl-7",
    date: "Janv. 2026",
    isoDate: "2026-01",
    title: "ECCENTRICA Fluo",
    seriesRef: "eccentrica",
    cover: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=300&q=80",
  },
  {
    id: "tl-8",
    date: "Janv. 2026",
    isoDate: "2026-01",
    title: "Ludivine — Portrait hiver",
    seriesRef: "ludivine",
    cover: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=300&q=80",
  },
];

// ─────────────────────────────────────────────
//  CONTACT
// ─────────────────────────────────────────────

export const CONTACT = {
  name:      "Quentin Pacifici",
  alias:     "qtn.raw",
  email:     "quentinpa13@gmail.com",
  phone:     "07 86 32 61 46",
  instagram: "https://instagram.com/qtn.raw",
} as const;
