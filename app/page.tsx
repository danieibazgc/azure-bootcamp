import { Hero } from "@/components/landing/Hero";
import { Highlights } from "@/components/landing/Highlights";
import { Audience } from "@/components/landing/Audience";
import { Curriculum } from "@/components/landing/Curriculum";
import { Format } from "@/components/landing/Format";
import { Closing } from "@/components/landing/Closing";
import { Requirements } from "@/components/landing/Requirements";
import { Faq } from "@/components/landing/Faq";
import { CtaFinal } from "@/components/landing/CtaFinal";

// Navbar/Footer live in the root layout (app/layout.tsx) so this page and
// /aplicar always share the exact same chrome — no more risk of them
// drifting apart, which is how NAV_LINKS's hash-only hrefs ended up dead on
// /aplicar in the first place.
export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Audience />
      <Curriculum />
      <Format />
      <Closing />
      <Requirements />
      <Faq />
      <CtaFinal />
    </>
  );
}
