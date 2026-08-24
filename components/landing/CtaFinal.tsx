import { DATES } from "@/lib/content";
import { PrimaryCta } from "./CtaButton";

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="card-surface-strong relative mx-auto max-w-3xl rounded-3xl px-6 py-14 text-center sm:px-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-azure-light">
          Últimos días de postulación
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          Las postulaciones cierran el {DATES.applyClose}
        </h2>
        <p className="mt-4 text-base leading-7 text-white/70">
          Completa el formulario oficial y da el primer paso hacia tu certificación en Microsoft
          Azure. Es gratuito y no necesitas experiencia previa en la nube.
        </p>
        <div className="mt-8 flex justify-center">
          <PrimaryCta>Postular ahora</PrimaryCta>
        </div>
      </div>
    </section>
  );
}
