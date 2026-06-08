import os
from pathlib import Path

# Le VRAI chemin de base d'après tes captures d'écran
base_dir = Path("public/stage3")
extensions_valides = {".jpg", ".jpeg", ".png", ".webp"}

print("const ALL_PHOTOS = [")

# rglob('*') permet de chercher récursivement dans tous les sous-dossiers
# On trie pour garder un ordre constant
for path in sorted(base_dir.rglob('*')):
    if path.is_file() and path.suffix.lower() in extensions_valides:
        # Conversion du chemin Windows/Mac en chemin web Next.js
        # On cherche l'index de "public" pour ne garder que la partie après
        parts = path.parts
        if "public" in parts:
            idx = parts.index("public") + 1
            web_path = "/" + "/".join(parts[idx:])
            web_path = web_path.replace("\\", "/") 
            
            # On ajoute le chemin au tableau
            print(f'  "{web_path}",')

print("];")