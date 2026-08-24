import { CheckCircle2 } from "lucide-react";
import { AUDIENCE } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Audience() {
  return (
    <section id="programa" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Para quién es"
          title="Estudiantes y egresados que quieren operar Azure, no solo leer sobre ella"
          description={AUDIENCE.intro}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-surface rounded-2xl p-8">
            <h3 className="font-display text-lg font-semibold text-white">
              Encajas si cumples esto
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {AUDIENCE.fits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-azure-light"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-white/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface rounded-2xl p-8">
            <h3 className="font-display text-lg font-semibold text-white">
              Suma si ya conoces
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              No son requisitos excluyentes, solo te ayudan a avanzar más rápido.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {AUDIENCE.nice_to_have.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
