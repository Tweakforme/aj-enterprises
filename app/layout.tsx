import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Providers } from "./providers";
import { OrganizationSchema, LocalBusinessSchema, WebsiteSchema, ReviewSchema, ServiceSchema } from "@/components/structured-data";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ORCA Enterprises Inc. | Shopify Developer Calgary",
  description: "Calgary-based Shopify developer & web development agency. Custom Shopify stores, Next.js apps, and e-commerce solutions. Serving Canada & worldwide. Starting at $500.",
  keywords: [
    "Shopify developer Calgary",
    "Shopify developer Canada",
    "Shopify store developer",
    "Shopify expert Canada",
    "web developer Calgary",
    "web development Calgary",
    "e-commerce developer Calgary",
    "custom Shopify store",
    "Shopify development agency",
    "Calgary web design",
    "Next.js developer Calgary",
    "WooCommerce developer Calgary",
    "small business website Calgary",
    "e-commerce website Canada",
    "ORCA Enterprises",
  ],
  authors: [{ name: "ORCA Enterprises Inc." }],
  creator: "ORCA Enterprises Inc.",
  publisher: "ORCA Enterprises Inc.",
  metadataBase: new URL("https://orcaenterprises.ca"),
  alternates: { canonical: "https://orcaenterprises.ca" },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "ORCA Enterprises Inc. | Shopify Developer Calgary",
    description: "Calgary-based Shopify developer & web development agency. Custom Shopify stores, Next.js apps, and e-commerce solutions. Starting at $500.",
    type: "website",
    locale: "en_CA",
    url: "https://orcaenterprises.ca",
    siteName: "ORCA Enterprises Inc.",
    images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: "ORCA Enterprises Inc." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORCA Enterprises Inc. | Shopify Developer Calgary",
    description: "Calgary-based Shopify developer & web development agency. Starting at $500.",
    images: ['/logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme')||'light';if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}` }} />
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebsiteSchema />
        <ReviewSchema />
        <ServiceSchema />
      </head>
      <body className="relative">
        <Providers>
          <CustomCursor />
          <Navbar />
          <main className="relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}