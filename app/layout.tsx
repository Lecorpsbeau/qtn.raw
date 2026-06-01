import '../styles/globals.css';
import MouseImageTrail from "@/components/ui/MouseImageTrail";

export const metadata = {
  title: "The Portfolio of RAW ",
  description: "The Portfolio of RAW",
};

const TRAIL_IMAGES = [
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456363112861_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456363126332_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456363134111_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456371500914_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456371533454_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456371557782_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379884036_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379885845_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379902394_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379909558_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379931537_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456379943044_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456421851087_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456430251955_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456430265385_48773641125.jpg",
  "/images/qtn.raw/toppics/qtn.raw_1767037277_3798506456858097642_48773641125.jpg",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="film-grain" />

        {/* 2. Donne-lui à manger ici avec la prop images */}
        <MouseImageTrail images={TRAIL_IMAGES} />

        {children}
      </body>
    </html>
  );
}