import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, Outfit } from "next/font/google";
import { SiteBackground } from "@/components/landing/SiteBackground";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SITE } from "@/lib/content";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const title = `${SITE.name} by ${SITE.organizer} — ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  // La imagen para "/" no se declara aquí: app/opengraph-image.jpg y
  // app/twitter-image.jpg (convención de archivos de Next.js) generan esas
  // etiquetas automáticamente. Ojo: eso solo cubre este layout — en cuanto
  // un segmento hijo (p. ej. app/aplicar/layout.tsx) define su propio
  // "openGraph", Next.js reemplaza el objeto completo y esa imagen se
  // pierde, así que esos segmentos repiten "images" a mano con OG_IMAGE.
  openGraph: {
    title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.organizer,
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      // Next.js 16 no fuerza `scroll-behavior: auto` durante las transiciones
      // de ruta a menos que se declare este atributo explícitamente; sin él,
      // el `scroll-behavior: smooth` global (app/globals.css) también
      // animaría los saltos "al tope de página" entre rutas distintas.
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy font-sans text-white">
        <SiteBackground />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
