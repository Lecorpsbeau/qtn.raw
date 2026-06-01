import '../styles/globals.css';
import MouseImageTrail from "@/components/ui/MouseImageTrail"; // <-- Importe-le ici

export const metadata = {
  title: "RAW — Portfolio",
  description: "The Portfolio of RAW",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {/* 1. On place l'effet ici pour qu'il plane au-dessus de tout le site */}
        <MouseImageTrail />

        {/* 2. Tout ton code actuel (tes pages, ton texte, etc.) s'affiche ici */}
        {children}
      </body>
    </html>
  );
}