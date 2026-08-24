import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-azure-light">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-7 text-white/70 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
