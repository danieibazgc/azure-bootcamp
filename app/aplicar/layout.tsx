import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/content";

const title = `Call for speakers — ${SITE.name} by ${SITE.organizer}`;
const description =
  "Postula como speaker para una de las 12 sesiones del Azure Bootcamp by LEAD UTP. Comparte tu experiencia con la próxima generación de builders.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { card: "summary", title, description },
};

// Navbar/Footer/<main> now come from the root layout (app/layout.tsx); this
// layout only exists to scope the /aplicar-specific metadata above.
export default function AplicarLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
