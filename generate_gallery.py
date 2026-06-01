import os
from pathlib import Path

# Mapping des noms de dossiers vers les catégories définies dans ton interface
folder_map = {
    "cars": "cars",
    "marque": "brands",
    "gensraw": "portraits",
    "portraits": "portraits",
    "highlights": "highlights",
    "raw": "raw"
}

base_dir = Path("public/images/qtn.raw/stage3")
extensions = {".jpg", ".jpeg", ".png", ".webp"}

with open("data/galleryData.ts", "w", encoding="utf-8") as f:
    f.write("export interface GalleryImage {\n")
    f.write("    id: string;\n")
    f.write("    src: string;\n")
    f.write("    title: string;\n")
    f.write("    category: 'highlights' | 'cars' | 'brands' | 'portraits' | 'raw';\n")
    f.write("    tags: string[];\n")
    f.write("}\n\n")
    f.write("export const galleryImages: GalleryImage[] = [\n")

    for path in sorted(base_dir.rglob('*')):
        if path.is_file() and path.suffix.lower() in extensions:
            # Déterminer la catégorie
            category = "raw"
            for key, cat in folder_map.items():
                if key in str(path):
                    category = cat
                    break
            
            # Nettoyage pour le titre
            title = path.stem.replace("qtn.raw_", "").replace("_", " ").title()
            
            # Chemin web (Next.js ignore le dossier 'public')
            web_path = "/" + "/".join(path.parts[path.parts.index("images"):])
            
            f.write("    {\n")
            f.write(f'        id: "{path.stem}",\n')
            f.write(f'        src: "{web_path}",\n')
            f.write(f'        title: "{title}",\n')
            f.write(f'        category: "{category}",\n')
            f.write(f'        tags: ["{category.capitalize()}"]\n')
            f.write("    },\n")

    f.write("];\n")

print("✅ Fichier data/galleryData.ts généré avec succès !")