import { ListChecks } from "lucide-react";
import { REQUIREMENTS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Requirements() {
  return (
    <section className="relative bg-black/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Requisitos" title="Lo único que necesitas para empezar" />

        <div className="card-surface mt-10 rounded-2xl p-8">
          <ul className="flex flex-col gap-4">
            {REQUIREMENTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ListChecks
                  className="mt-0.5 h-5 w-5 shrink-0 text-lead-red"
                  aria-hidden="true"
                />
                <span className="text-sm leading-6 text-white/75">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
