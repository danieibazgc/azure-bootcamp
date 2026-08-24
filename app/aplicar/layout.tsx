import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE, OG_IMAGE } from "@/lib/content";

const ogTitle = `Call for speakers — ${SITE.name} by ${SITE.organizer}`;
const description =
  "Postula como speaker para una de las 12 sesiones del Azure Bootcamp by LEAD UTP. Comparte tu experiencia con la próxima generación de builders.";

// Next.js resolves app/opengraph-image.jpg into the root layout's own
// openGraph object; defining a new openGraph object here (title/description
// need to change per route) replaces that whole object instead of merging
// into it, so the image has to be repeated explicitly via OG_IMAGE or this
// route would share the generic /aplicar preview with no picture at all.
const ogImages = [
  { url: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt },
];

export const metadata: Metadata = {
  // Título corto + template repetido: una vez que este layout define su
  // propio "title", deja de heredar el title.template del layout raíz para
  // sus hijos (las páginas de sesión), así que hay que repetirlo acá para
  // que /aplicar/sesion-NN también termine en "· Azure Bootcamp".
  // openGraph/twitter sí necesitan el texto completo: al definir su propio
  // objeto acá, reemplazan el del layout raíz por completo (Next.js no
  // fusiona campos anidados entre segmentos).
  title: {
    default: "Call for speakers",
    template: `%s · ${SITE.name}`,
  },
  description,
  alternates: {
    canonical: "/aplicar",
  },
  openGraph: {
    title: ogTitle,
    description,
    url: "/aplicar",
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
    images: ogImages,
  },
};

// Navbar/Footer/<main> now come from the root layout (app/layout.tsx); this
// layout only exists to scope the /aplicar-specific metadata above.
export default function AplicarLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
