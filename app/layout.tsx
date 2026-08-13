import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  title: "Villa Toscana | Restaurant italien gastronomique à Casablanca",
  description: "Villa Toscana propose une cuisine italienne gastronomique, des pâtes fraîches maison, des produits d'exception et une cave italienne sélectionnée à Casablanca.",
  keywords: ["Villa Toscana", "restaurant italien Casablanca", "restaurant gastronomique", "cuisine italienne", "réservation restaurant Casablanca"],
  openGraph: {
    title: "Villa Toscana | Restaurant italien gastronomique",
    description: "Une expérience italienne raffinée, romantique et gastronomique à Casablanca.",
    type: "website",
    locale: "fr_MA"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body className={inter.variable + " " + cormorant.variable}>{children}</body></html>;
}
