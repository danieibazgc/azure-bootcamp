import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FORM_URL } from "@/lib/content";
import type { ReactNode } from "react";

export function PrimaryCta({
  className = "",
  children = "Postular ahora",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`gradient-cta glow-violet inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export function SecondaryCta({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors duration-200 hover:border-white/40 hover:bg-white/10 ${className}`}
    >
      {children}
    </Link>
  );
}
