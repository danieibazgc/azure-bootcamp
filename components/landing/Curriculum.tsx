"use client";

import { useState } from "react";
import { ChevronDown, FlaskConical } from "lucide-react";
import { CURRICULUM } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

export function Curriculum() {
  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set([1]));

  const toggleWeek = (week: number) => {
    setOpenWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  return (
    <section id="malla" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Malla académica"
          title="6 semanas, 12 sesiones, un proyecto acumulativo"
          description="Cada laboratorio construye sobre el despliegue de la sesión anterior: al llegar a la sesión 12, el proyecto final ya está en producción."
        />

        <div className="mt-12 flex flex-col gap-4">
          {CURRICULUM.map((week) => {
            const isOpen = openWeeks.has(week.week);
            return (
              <div key={week.week} className="card-surface overflow-hidden rounded-2xl">
                <button
                  type="button"
                  onClick={() => toggleWeek(week.week)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet/20 font-display text-sm font-bold text-white">
                      S{week.week}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-base font-semibold text-white">
                        Semana {week.week}
                      </span>
                      <span className="text-sm text-white/60">{week.label}</span>
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-white/60 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen ? (
                  <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5">
                    {week.sessions.map((session) => (
                      <div key={session.session} className="flex gap-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-azure/20 text-xs font-bold text-azure-light">
                          {session.session}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">{session.title}</p>
                          <p className="mt-1 flex items-start gap-1.5 text-sm leading-6 text-white/65">
                            <FlaskConical
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40"
                              aria-hidden="true"
                            />
                            {session.lab}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
