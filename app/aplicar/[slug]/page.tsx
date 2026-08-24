import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { getSpeakerSlotBySlug, listSpeakerSlots } from "@/lib/speakers";
import { formatSlotFullDate, formatSlotTimeRange } from "@/lib/format-date";
import { SpeakerForm } from "./SpeakerForm";

// Same reasoning as app/aplicar/page.tsx: slot status/title/time can change
// in Supabase after this page is built, so revalidate instead of staying
// frozen at build-time content.
export const revalidate = 60;

export async function generateStaticParams() {
  const slots = await listSpeakerSlots();
  return slots.map((slot) => ({ slug: slot.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slot = await getSpeakerSlotBySlug(slug);

  if (!slot) {
    return { title: "Fecha no encontrada — Call for speakers" };
  }

  return {
    title: `Aplica como speaker: ${slot.title} — Azure Bootcamp`,
    description: `Postula para dictar la sesión "${slot.title}" del Azure Bootcamp by LEAD UTP.`,
  };
}

export default async function AplicarSlotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slot = await getSpeakerSlotBySlug(slug);

  if (!slot) {
    notFound();
  }

  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-20 lg:pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/aplicar"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver a las fechas
        </Link>

        <h1 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
          Aplica como <span className="text-gradient-azure">speaker</span>
        </h1>
        <p className="mt-3 text-base leading-7 text-white/65">
          Tu experiencia con Azure puede inspirar a la próxima generación de estudiantes.
          Completa este formulario para confirmar tu disponibilidad como speaker; toma menos de
          2 minutos.
        </p>

        <div className="card-surface mt-6 flex items-start gap-3 rounded-2xl px-5 py-4">
          <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-azure-light" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-white">
              Sesión {slot.sessionNumber}: {slot.title}
            </p>
            <p className="mt-1 text-sm text-white/60">{slot.brief}</p>
            <p className="mt-1 text-sm text-white/60">
              {formatSlotFullDate(slot.startsAt)} · {formatSlotTimeRange(slot.startsAt, slot.endsAt)}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <SpeakerForm slot={slot} />
        </div>
      </div>
    </section>
  );
}
