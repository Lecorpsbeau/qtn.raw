export interface GalleryImage {
    id: string;
    src: string;
    title: string;
    category: "highlights" | "cars" | "brands" | "raw";
    tags: string[];
}

export const galleryImages: GalleryImage[] = [
    // ==========================================
    // 1. HIGHLIGHTS (qtn.raw)
    // ==========================================
    {
        id: "hl-top-1",
        src: "/images/highlights/qtn.raw/toppics/qtn.raw_176.jpg", // Adapte le nom exact ici
        title: "Editorial Selection",
        category: "highlights",
        tags: ["Toppics", "Featured"]
    },
    {
        id: "hl-s1-pise",
        src: "/images/highlights/qtn.raw/stage1/pise/photo.jpg",
        title: "Leçon d'Architecture — Pise",
        category: "highlights",
        tags: ["Stage 1", "Pise", "Architecture"]
    },
    {
        id: "hl-s2-animals",
        src: "/images/highlights/qtn.raw/stage2/animaux/photo.jpg",
        title: "Faune Sauvage",
        category: "highlights",
        tags: ["Stage 2", "Animaux"]
    },

    // ==========================================
    // 2. CARS (Automotive)
    // ==========================================
    {
        id: "car-bmw-art",
        src: "/images/cars/BMWArtCar/photo.jpg",
        title: "BMW Art Car",
        category: "cars",
        tags: ["BMW", "Racing"]
    },
    {
        id: "car-911-dakar",
        src: "/images/cars/911 Dakar/photo.jpg",
        title: "Porsche 911 Dakar",
        category: "cars",
        tags: ["Porsche", "Offroad"]
    },
    {
        id: "car-ferrari-j",
        src: "/images/cars/qtn.raw_ferrari_jaune.jpg",
        title: "Ferrari Giallo Modena",
        category: "cars",
        tags: ["Ferrari", "Supercar"]
    },

    // ==========================================
    // 3. MARQUE (Commercial / Client Work)
    // ==========================================
    {
        id: "brand-generale",
        src: "/images/marque/lagenerale.paris/photo.jpg",
        title: "La Générale Paris",
        category: "brands",
        tags: ["Paris", "Lifestyle"]
    },
    {
        id: "brand-orangina",
        src: "/images/marque/orangina/photo.jpg",
        title: "Orangina Campaign",
        category: "brands",
        tags: ["Commercial", "Studio"]
    }
];