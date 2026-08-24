import { Radio, Trophy, Users } from "lucide-react";
import { CLOSING, DATES } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Closing() {
  return (
    <section id="clausura" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Clausura presencial"
          title={<>El {DATES.closingDate}, presenta tu proyecto ante la industria</>}
          description={CLOSING.intro}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface rounded-2xl p-8">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-lead-red" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-white">
                Tablero de puntos público
              </h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/65">
              Actualizado cada semana. Así sabes en todo momento en qué posición estás y qué te
              falta para asegurar tu lugar.
            </p>

            <div className="mt-6 flex flex-col divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
              {CLOSING.board.map((row) => (
                <div
                  key={row.criterion}
                  className="flex flex-col items-start gap-2 bg-white/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="text-sm text-white/75">{row.criterion}</span>
                  <span className="whitespace-nowrap rounded-full bg-azure/15 px-3 py-1 text-xs font-semibold text-azure-light">
                    {row.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="card-surface rounded-2xl p-8">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-violet" aria-hidden="true" />
                <h3 className="font-display text-base font-semibold text-white">
                  Cupo limitado por méritos
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65">{CLOSING.seatsNote}</p>
            </div>

            <div className="card-surface rounded-2xl p-8">
              <div className="flex items-center gap-3">
                <Radio className="h-5 w-5 text-azure-light" aria-hidden="true" />
                <h3 className="font-display text-base font-semibold text-white">
                  Transmisión en vivo
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65">{CLOSING.streamNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
