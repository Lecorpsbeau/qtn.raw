const fs = require('fs');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────────────────
const BASE_INPUT_DIR  = path.join(__dirname, '../images');
const BASE_OUTPUT_DIR = path.join(__dirname, '../public/images/portfolio');

// Extensions acceptées (images uniquement – les vidéos sont ignorées)
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

// ─── Utilitaires ──────────────────────────────────────────────────────────────

/**
 * Extrait le timestamp Unix depuis le nom de fichier Instagram.
 * Format attendu : qtn.raw_<timestamp>_<...>.jpg
 * Retourne 0 si introuvable (pour trier en fin de liste).
 */
function extractTimestamp(filename) {
  const match = filename.match(/_(\d{10})_/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Lit tous les fichiers images d'un dossier (non récursif),
 * filtre par extension et trie par timestamp croissant.
 */
function getSortedImages(dir) {
  return fs
    .readdirSync(dir)
    .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => extractTimestamp(a) - extractTimestamp(b));
}

// ─── Script principal ─────────────────────────────────────────────────────────
function renameAndMoveImages() {
  if (!fs.existsSync(BASE_INPUT_DIR)) {
    console.error(`❌ Le dossier source "${BASE_INPUT_DIR}" n'existe pas.`);
    return;
  }

  // Lire les sous-dossiers du dossier images/ (ex: qtn.raw, highlights)
  const subfolders = fs
    .readdirSync(BASE_INPUT_DIR)
    .filter(name => {
      const fullPath = path.join(BASE_INPUT_DIR, name);
      return fs.statSync(fullPath).isDirectory() && !name.startsWith('.');
    });

  if (subfolders.length === 0) {
    console.error('❌ Aucun sous-dossier trouvé dans images/.');
    return;
  }

  let grandTotal = 0;

  subfolders.forEach(subfolder => {
    const inputPath  = path.join(BASE_INPUT_DIR, subfolder);

    // Nom de catégorie propre : on garde le nom du sous-dossier, nettoyé
    // "qtn.raw"  → "portfolio"   (nom de dossier de sortie générique)
    // "highlights" → "highlights"
    const categoryName = subfolder.replace(/\./g, '-').toLowerCase();
    const outputPath   = path.join(BASE_OUTPUT_DIR, categoryName);

    const images = getSortedImages(inputPath);

    console.log(`\n📂 [${subfolder}] → ${images.length} image(s) trouvée(s)`);

    if (images.length === 0) {
      console.log('   ℹ️  Aucune image (les vidéos .mp4 sont ignorées).');
      return;
    }

    // Créer le dossier de destination
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    images.forEach((file, index) => {
      const ext         = path.extname(file).toLowerCase();
      const fileNumber  = String(index + 1).padStart(3, '0');
      const newName     = `${categoryName}-${fileNumber}${ext}`;

      const src  = path.join(inputPath, file);
      const dest = path.join(outputPath, newName);

      fs.copyFileSync(src, dest);
      console.log(`   ✅ ${file}`);
      console.log(`      → public/images/portfolio/${categoryName}/${newName}`);
    });

    grandTotal += images.length;
  });

  console.log(`\n${'─'.repeat(60)}`);
  if (grandTotal > 0) {
    console.log(`🚀 Terminé ! ${grandTotal} image(s) renommée(s) vers public/images/portfolio/`);
  } else {
    console.log('⚠️  Aucun fichier traité. Seules les images sont copiées (pas les .mp4).');
  }
}

renameAndMoveImages();
