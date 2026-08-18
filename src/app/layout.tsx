import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVERA — Dental & Oral Care",
  description: "Thoughtful dentistry, without the clinical feeling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="text-forest">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
