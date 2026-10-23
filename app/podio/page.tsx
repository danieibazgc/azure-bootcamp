import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { OG_IMAGE, SITE } from "@/lib/content";
import { PODIO_SESSIONS, TOP_20, type PodioEntry } from "@/lib/podio";

const title = "Top 20";
const description =
  "Reconocimiento a los 20 mejores alumnos del Azure Bootcamp by LEAD UTP, ordenados por los temas de su proyecto final y su asistencia en vivo.";
const ogTitle = `${title} — ${SITE.name} by ${SITE.organizer}`;
const ogImages = [
  { url: OG_IMAGE.path, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt },
];

const MEDALS: Record<number, { place: string; border: string; badge: string }> = {
  1: { place: "1.er lugar", border: "#fcd34d", badge: "bg-amber-300 text-navy" },
  2: { place: "2.º lugar", border: "#e2e8f0", badge: "bg-slate-200 text-navy" },
  3: { place: "3.er lugar", border: "#fdba74", badge: "bg-orange-300 text-navy" },
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/podio",
  },
  openGraph: {
    title: ogTitle,
    description,
    url: "/podio",
    images: ogImages,
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description,
    images: ogImages,
  },
};

function formatAttendance(entry: PodioEntry) {
  return `${entry.attended}/${PODIO_SESSIONS} · ${entry.attendancePercent}%`;
}

function topicsLabel(topics: number) {
  return topics === 1 ? "1 tema" : `${topics} temas`;
}

export default function PodioPage() {
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
            align="center"
            eyebrow="Reconocimiento"
            title="Top 20 del Azure Bootcamp"
            description={
              <p>
                El puesto lo marcan los temas cubiertos en el proyecto final. Si hay empate, queda
                más arriba quien asistió a más sesiones en vivo por Microsoft Teams ({PODIO_SESSIONS}{" "}
                en total).
              </p>
            }
          />
        </div>

        <ol className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          {TOP_20.map((entry) => {
            const medal = MEDALS[entry.rank];

            return (
              <li
                key={entry.rank}
                className={`rounded-2xl border px-4 py-4 sm:px-5 ${
                  medal ? "bg-white/[0.08] backdrop-blur-xl" : "card-surface"
                }`}
                style={medal ? { borderColor: medal.border } : undefined}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
                        medal ? medal.badge : "bg-white/10 text-white"
                      }`}
                      aria-hidden="true"
                    >
                      {entry.rank}
                    </span>
                    <div className="min-w-0">
                      {medal ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                          {medal.place}
                        </p>
                      ) : null}
                      <p className="font-display text-base font-semibold leading-snug text-white sm:text-lg">
                        <span className="sr-only">Puesto {entry.rank}. </span>
                        {entry.name}
                      </p>
                      <p className="mt-0.5 text-sm text-white/60">{entry.country}</p>
                    </div>
                  </div>

                  <div className="flex gap-6 border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0 sm:text-right">
                    <div className="min-w-24 flex-1 sm:flex-none">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">
                        Temas
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{topicsLabel(entry.topics)}</p>
                    </div>
                    <div className="min-w-28 flex-1 sm:flex-none">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">
                        Asistencia
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{formatAttendance(entry)}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
