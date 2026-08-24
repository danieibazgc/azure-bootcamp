import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarClock, Lock } from "lucide-react";
import { listSpeakerSlots } from "@/lib/speakers";
import { formatSlotDateParts, formatSlotTimeRange } from "@/lib/format-date";
import { SectionHeading } from "@/components/landing/SectionHeading";

// Slot status is toggled manually in Supabase (open/closed), so this page
// needs to pick up changes without a redeploy — revalidate periodically
// instead of freezing the build-time snapshot forever.
export const revalidate = 60;

export default async function AplicarPage() {
  const slots = await listSpeakerSlots();

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
            eyebrow="Convocatoria abierta"
            title="Call for speakers: Azure Bootcamp"
            description="Buscamos speakers con experiencia real usando Microsoft Azure: profesionales que operan recursos en la nube y pueden guiar un laboratorio en vivo. Un ponente distinto para cada una de las 12 sesiones. No importa si es tu primera vez en un escenario o si ya has compartido antes: postula a la fecha que más te acomode."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((slot) => {
            const { weekday, day, month, year } = formatSlotDateParts(
              slot.startsAt
            );
            const timeRange = formatSlotTimeRange(slot.startsAt, slot.endsAt);
            const isOpen = slot.status === "open";

            const cardContent = (
              <>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/60">
                    Semana {slot.week}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      isOpen
                        ? "bg-azure/15 text-azure-light"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {isOpen ? (
                      "Disponible"
                    ) : (
                      <>
                        <Lock className="h-3 w-3" aria-hidden="true" />
                        Cerrada
                      </>
                    )}
                  </span>
                </div>

                <p className="mt-5 font-display text-2xl font-bold text-white">
                  Sesión {slot.sessionNumber}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {weekday}, {day} de {month} · {year}
                </p>

                <p className="mt-4 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-white">
                  {slot.title}
                </p>

                <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-white/65">
                  {slot.brief}
                </p>

                <p className="mt-4 flex items-center gap-1.5 text-xs text-white/50">
                  <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                  {timeRange}
                </p>

                <div className="mt-5">
                  {isOpen ? (
                    <span className="gradient-cta inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-200 group-hover:scale-[1.02]">
                      Aplicar aquí
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/40">
                      Cerrada
                    </span>
                  )}
                </div>
              </>
            );

            if (!isOpen) {
              return (
                <div
                  key={slot.id}
                  className="card-surface flex flex-col rounded-2xl p-5 opacity-60 sm:p-6"
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={slot.id}
                href={`/aplicar/${slot.slug}`}
                className="card-surface group flex flex-col rounded-2xl p-5 transition-colors hover:border-white/25 sm:p-6"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
