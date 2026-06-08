import '../styles/globals.css';
import MouseImageTrail from "@/components/ui/MouseImageTrail";
import Navbar from "@/components/layout/Navbar";
import { TOPPICS_PHOTOS } from "@/data/toppics";

export const metadata = {
  title: "The Portfolio of RAW ",
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
        <div className="film-grain" />

        <Navbar />

        <MouseImageTrail images={TOPPICS_PHOTOS} />

        {children}
      </body>
    </html>
  );
}