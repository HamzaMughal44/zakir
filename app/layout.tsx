import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "ZK DRY FRUITS",
  description: "Experience the luxury of handpicked, premium dry fruits from the heart of Pakistan. Organic, natural, and pure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-forest-deep text-cream font-outfit antialiased selection:bg-gold/30">
        {children}
      </body>
    </html>
  );
}
