import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Faq() {
  return (
    <section id="faq" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Todo lo que debes saber antes de postular" />

        <div className="mt-10 flex flex-col gap-3">
          {FAQ.map((item) => (
            <details key={item.question} className="card-surface group rounded-2xl px-4 py-2 sm:px-6">
              {/* `list-none` alone doesn't remove Safari/iOS's native disclosure
                  triangle — it renders its own ::-webkit-details-marker
                  pseudo-element on top of the ChevronDown icon below. */}
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-sm font-semibold text-white sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-white/50 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-4">
                <p className="text-sm leading-6 text-white/65">{item.answer}</p>
                {item.cta ? (
                  <Link
                    href={item.cta.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-light transition-colors hover:text-white"
                  >
                    {item.cta.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
