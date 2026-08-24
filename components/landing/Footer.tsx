import Image from "next/image";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/content";
import type { ComponentType, SVGProps } from "react";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  linktree: Link2,
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/30 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex max-w-sm flex-col items-start gap-3">
          <Image
            src="/brand/lead-utp-logo.png"
            alt="LEAD UTP"
            width={120}
            height={72}
            className="h-8 w-auto shrink-0"
          />
          <p className="text-sm leading-6 text-white/60">
            {SITE.name} es una iniciativa del {SITE.pillar} de {SITE.organizer}, una comunidad
            estudiantil sin fines de lucro. No es un producto oficial de Microsoft.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Enlaces
            </span>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Síguenos
            </span>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <Link
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {SITE.organizer}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
