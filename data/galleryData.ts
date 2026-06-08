export interface GalleryImage {
    id: string;
    src: string;
    title: string;
    category: 'highlights' | 'cars' | 'brands' | 'portraits' | 'raw';
    tags: string[];
}

export const galleryImages: GalleryImage[] = [
];
