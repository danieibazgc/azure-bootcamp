import { CalendarRange, Laptop2, Sparkles, Rocket, type LucideIcon } from "lucide-react";
import { HIGHLIGHTS } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  CalendarRange,
  Laptop2,
  Sparkles,
  Rocket,
};

export function Highlights() {
  return (
    <section className="relative border-y border-white/10 bg-black/20 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={item.title} className="card-surface flex flex-col gap-3 rounded-2xl p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-azure/15 text-azure-light">
                {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
              </span>
              <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-white/65">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
