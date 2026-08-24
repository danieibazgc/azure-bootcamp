import { CalendarDays, Laptop2 } from "lucide-react";
import { DATES, SITE } from "@/lib/content";
import { PrimaryCta, SecondaryCta } from "./CtaButton";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_35%,rgba(2,12,62,0.65),transparent_75%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="text-base font-medium text-white/70 sm:text-lg">
          De principiante a <span className="text-white">experto</span>
        </p>

        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-8xl">
          <span className="text-gradient-azure">Azure</span>
          <br />
          <span className="text-white">Bootcamp</span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
          {SITE.description}
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <PrimaryCta className="w-full sm:w-auto">Postular ahora</PrimaryCta>
          <SecondaryCta href="/#malla" className="w-full sm:w-auto">
            Ver malla académica
          </SecondaryCta>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="card-surface flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-azure/20 text-azure-light">
              <Laptop2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-white/60">Modalidad</span>
              <span className="text-sm font-semibold text-white">Virtual</span>
            </span>
          </div>

          <div className="card-surface flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lead-red/20 text-lead-red">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-white/60">Postulaciones</span>
              <span className="text-sm font-semibold text-white">
                Hasta el {DATES.applyClose}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
