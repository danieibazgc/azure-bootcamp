import { Hero } from "@/components/landing/Hero";
import { Highlights } from "@/components/landing/Highlights";
import { Audience } from "@/components/landing/Audience";
import { Curriculum } from "@/components/landing/Curriculum";
import { Format } from "@/components/landing/Format";
import { Closing } from "@/components/landing/Closing";
import { Requirements } from "@/components/landing/Requirements";
import { Faq } from "@/components/landing/Faq";
import { CtaFinal } from "@/components/landing/CtaFinal";
import { JsonLd } from "@/components/JsonLd";
import { SITE, DATES, CLOSING, OG_IMAGE, SOCIAL_LINKS } from "@/lib/content";

const organizer = {
  "@type": "Organization",
  name: SITE.organizer,
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

// Describes the bootcamp itself: six weeks, fully online, free.
const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: `${SITE.name} by ${SITE.organizer}`,
  description: SITE.description,
  url: SITE.url,
  image: `${SITE.url}${OG_IMAGE.path}`,
  inLanguage: "es",
  isAccessibleForFree: true,
  provider: organizer,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    startDate: DATES.classesStartISO,
    endDate: DATES.classesEndISO,
    location: {
      "@type": "VirtualLocation",
      url: SITE.url,
    },
  },
};

// The one in-person moment of the program (see components/landing/Closing):
// venue TBD, so only the country is asserted, plus a livestream fallback.
const closingEventJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalEvent",
  name: `Clausura — ${SITE.name} by ${SITE.organizer}`,
  description: CLOSING.intro,
  startDate: DATES.closingDateISO,
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  isAccessibleForFree: true,
  location: [
    {
      "@type": "Place",
      name: "Sede por confirmar",
      address: { "@type": "PostalAddress", addressCountry: "PE" },
    },
    {
      "@type": "VirtualLocation",
      url: SITE.url,
    },
  ],
  organizer,
};

// Navbar/Footer live in the root layout (app/layout.tsx) so this page and
// /aplicar always share the exact same chrome — no more risk of them
// drifting apart, which is how NAV_LINKS's hash-only hrefs ended up dead on
// /aplicar in the first place.
export default function Home() {
  return (
    <>
      <JsonLd data={courseJsonLd} />
      <JsonLd data={closingEventJsonLd} />
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
