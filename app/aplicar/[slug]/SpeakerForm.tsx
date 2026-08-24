"use client";

import { useActionState, useId, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ImagePlus } from "lucide-react";
import { submitSpeakerApplication, type SpeakerFormState } from "../actions";
import type { SpeakerSlot } from "@/lib/speakers";

const initialState: SpeakerFormState = { status: "idle" };

// `text-base` (16px) is required, not just stylistic: iOS Safari auto-zooms
// the viewport on focus for any input/textarea with a computed font-size
// below 16px, which yanks the user's view off the form.
const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-base text-white placeholder:text-white/30 outline-none transition-colors focus:border-azure-light/60 focus:ring-2 focus:ring-azure-light/20";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/80">
        {label} {required ? <span className="text-lead-red">*</span> : null}
      </label>
      {children}
    </div>
  );
}

export function SpeakerForm({ slot }: { slot: SpeakerSlot }) {
  const [state, formAction, isPending] = useActionState(
    submitSpeakerApplication,
    initialState
  );
  const [photoName, setPhotoName] = useState<string | null>(null);
  const photoInputId = useId();

  if (state.status === "success") {
    return (
      <div className="card-surface flex flex-col items-center gap-4 rounded-2xl p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-azure-light" aria-hidden="true" />
        <p className="max-w-md text-base leading-7 text-white/80">{state.message}</p>
        <Link
          href="/aplicar"
          className="mt-2 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
        >
          Ver otras fechas
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-surface flex flex-col gap-6 rounded-2xl p-6 sm:p-8">
      <input type="hidden" name="slotSlug" value={slot.slug} />

      {state.status === "error" ? (
        <div className="flex items-start gap-2 rounded-xl border border-lead-red/30 bg-lead-red/10 px-4 py-3 text-sm text-white/85">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-lead-red" aria-hidden="true" />
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre y Apellido" required>
          <input
            type="text"
            name="fullName"
            required
            placeholder="María García"
            className={inputClass}
          />
        </Field>
        <Field label="WhatsApp" required>
          <input
            type="tel"
            name="whatsapp"
            required
            placeholder="+51 999 888 777"
            className={inputClass}
          />
        </Field>
        <Field label="Rol" required>
          <input
            type="text"
            name="role"
            required
            placeholder="CEO, CTO, Arquitecto de nube..."
            className={inputClass}
          />
        </Field>
        <Field label="Empresa" required>
          <input
            type="text"
            name="company"
            required
            placeholder="Nombre de tu empresa o proyecto"
            className={inputClass}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            placeholder="maria@ejemplo.com"
            className={inputClass}
          />
        </Field>
        <Field label="LinkedIn">
          <input
            type="url"
            name="linkedin"
            placeholder="https://linkedin.com/in/tu-perfil"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Título de la charla" required>
        <input
          type="text"
          name="talkTitle"
          required
          placeholder="Cómo desplegué mi primera app en Azure"
          className={inputClass}
        />
      </Field>

      <Field label="Descripción breve" required>
        <textarea
          name="talkDescription"
          required
          rows={4}
          placeholder="Cuenta de qué va tu charla, qué aprendizajes compartirás y quién es el público ideal..."
          className={inputClass}
        />
      </Field>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/80">
          Herramientas de esta sesión que dominas <span className="text-lead-red">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {slot.tools.map((tool) => (
            <label key={tool} className="cursor-pointer">
              <input type="checkbox" name="tools" value={tool} className="peer sr-only" />
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/70 transition-colors peer-checked:border-azure-light/60 peer-checked:bg-azure/20 peer-checked:text-azure-light">
                {tool}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={photoInputId} className="text-sm font-medium text-white/80">
          Foto de perfil
        </label>
        <label
          htmlFor={photoInputId}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:border-white/35"
        >
          <ImagePlus className="h-4 w-4 shrink-0" aria-hidden="true" />
          {photoName ?? "Sube tu foto — JPG, PNG, WEBP · Máx. 5MB"}
        </label>
        <input
          id={photoInputId}
          type="file"
          name="photo"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? null)}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="gradient-cta glow-violet mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto"
      >
        {isPending ? "Enviando..." : "Confirmar postulación"}
      </button>
    </form>
  );
}
