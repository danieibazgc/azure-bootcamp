import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { BadgeGenerator } from "@/components/badge/BadgeGenerator";
import { OG_IMAGE, SITE } from "@/lib/content";

const title = "Genera tu badge";
const description =
  "Sube tu foto y descarga tu badge del Azure Bootcamp by LEAD UTP para compartirlo en LinkedIn.";
const ogTitle = `${title} — ${SITE.name} by ${SITE.organizer}`;
const ogImages = [
  { url: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/badge",
  },
  openGraph: {
    title: ogTitle,
    description,
    url: "/badge",
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
    images: ogImages,
  },
};

export default function BadgePage() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-20 lg:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </Link>

        <div className="mt-8">
          <SectionHeading
            align="left"
            eyebrow="Comparte que eres parte"
            title="Genera tu badge del Azure Bootcamp"
            description={
              <p>
                Sube una foto, descarga tu badge y compártelo en LinkedIn. No pedimos tu nombre
                ni guardamos la imagen: todo se genera en tu navegador.
              </p>
            }
          />
        </div>

        <BadgeGenerator />
      </div>
    </section>
  );
}
