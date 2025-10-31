import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AJ Enterprises | Premium Shopify & Web Development",
  description: "Transform your online presence with custom Shopify stores, high-performance web applications, and conversion-focused design. Calgary-based, globally available.",
  keywords: ["Shopify development", "web development", "e-commerce", "Next.js", "Calgary developer"],
  authors: [{ name: "AJ Enterprises" }],
  openGraph: {
    title: "AJ Enterprises | Premium Shopify & Web Development",
    description: "Transform your online presence with custom Shopify stores and high-performance web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative">
        <CustomCursor />
        <Navbar />
        <main className="relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}