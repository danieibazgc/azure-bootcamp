import {
  ClipboardCheck,
  Radio,
  Swords,
  Users,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { FORMAT_STEPS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  ClipboardCheck,
  Radio,
  Swords,
  Users,
  Trophy,
};

export function Format() {
  return (
    <section className="relative bg-black/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="De la postulación a la clausura, en cinco pasos"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FORMAT_STEPS.map((step, index) => {
            const Icon = ICONS[step.icon];
            return (
              <div key={step.title} className="card-surface relative flex flex-col gap-3 rounded-2xl p-6">
                <span className="font-display text-3xl font-bold text-white/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/20 text-violet">
                  {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
                </span>
                <h3 className="font-display text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-white/65">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
