"use client";

import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, ImagePlus } from "lucide-react";
import { submitSpeakerApplication, type SpeakerFormState } from "../actions";
import { ALLOWED_PHOTO_TYPES, MIN_TALK_DESCRIPTION_LENGTH } from "@/lib/speaker-content";
import type { SpeakerSlot } from "@/lib/speakers";

const initialState: SpeakerFormState = { status: "idle" };

// `text-base` (16px) is required, not just stylistic: iOS Safari auto-zooms
// the viewport on focus for any input/textarea with a computed font-size
// below 16px, which yanks the user's view off the form.
const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-base text-white placeholder:text-white/30 outline-none transition-colors focus:border-azure-light/60 focus:ring-2 focus:ring-azure-light/20";

const HEIC_EXTENSION_PATTERN = /\.(heic|heif)$/i;

function isHeicFile(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    HEIC_EXTENSION_PATTERN.test(file.name)
  );
}

function validatePhotoFile(file: File): string | null {
  if (isHeicFile(file)) {
    return "Esta foto está en formato HEIC (típico de iPhone). Expórtala o compártela como JPG/PNG antes de subirla.";
  }
  if (!ALLOWED_PHOTO_TYPES.includes(file.type as (typeof ALLOWED_PHOTO_TYPES)[number])) {
    return "La foto debe ser JPG, PNG o WEBP.";
  }
  return null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Next.js corta el body de un Server Action en 4MB (ver next.config.ts) y el
// bucket de Supabase acepta hasta 5MB, pero una foto de celular sin comprimir
// puede pesar bastante más: el POST se perdía antes de llegar al servidor y
// el usuario veía un error genérico en vez del mensaje del formulario.
// Comprimir acá evita ese corte en el caso común, sin exigirle nada al
// usuario ni tocar la foto que ve en su galería.
const MAX_COMPRESSED_DIMENSION = 1600;
const TARGET_PHOTO_BYTES = 1_200_000;

async function compressPhoto(file: File): Promise<File> {
  if (file.size <= TARGET_PHOTO_BYTES) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(
      1,
      MAX_COMPRESSED_DIMENSION / Math.max(bitmap.width, bitmap.height)
    );
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    let quality = 0.85;
    let blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );
    while (blob && blob.size > TARGET_PHOTO_BYTES && quality > 0.4) {
      quality -= 0.15;
      blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality)
      );
    }

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const compressedName = file.name.replace(/\.[^./]+$/, "") + ".jpg";
    return new File([blob], compressedName, { type: "image/jpeg" });
  } catch {
    // Cualquier falla de compresión (navegador viejo, imagen corrupta, etc.)
    // cae de vuelta al archivo original: la validación de tamaño del server
    // sigue siendo la red de seguridad final.
    return file;
  }
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-white/80">
        {label} {required ? <span className="text-lead-red">*</span> : null}
      </label>
      {children}
      {hint ? <span className="text-xs text-white/40">{hint}</span> : null}
    </div>
  );
}

export function SpeakerForm({ slot }: { slot: SpeakerSlot }) {
  const [state, setState] = useState<SpeakerFormState>(initialState);
  const [isPending, startTransition] = useTransition();
  const [photoInfo, setPhotoInfo] = useState<{ name: string; size: number } | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [talkDescriptionLength, setTalkDescriptionLength] = useState(0);
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

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setPhotoInfo(null);
      setPhotoError(null);
      return;
    }
    setPhotoInfo({ name: file.name, size: file.size });
    setPhotoError(validatePhotoFile(file));
  }

  function handleLinkedinBlur(event: React.FocusEvent<HTMLInputElement>) {
    const value = event.target.value.trim();
    if (value && !/^https?:\/\//i.test(value)) {
      event.target.value = `https://${value}`;
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (formData.getAll("tools").length === 0) {
      setState({
        status: "error",
        message: "Selecciona al menos una herramienta que domines para esta sesión.",
      });
      return;
    }

    const photoEntry = formData.get("photo");
    const photo = photoEntry instanceof File && photoEntry.size > 0 ? photoEntry : null;

    if (photo) {
      const validationError = validatePhotoFile(photo);
      if (validationError) {
        setPhotoError(validationError);
        return;
      }
    }

    startTransition(async () => {
      try {
        if (photo) {
          formData.set("photo", await compressPhoto(photo));
        }
        setState(await submitSpeakerApplication(state, formData));
      } catch {
        // Fallo a nivel de red/framework (p. ej. una foto que igual llegó
        // demasiado pesada): mostramos el mismo banner de error del
        // formulario en vez de dejar que el navegador termine en una página
        // rota sin explicación.
        setState({
          status: "error",
          message:
            "No pudimos enviar tu postulación. Puede ser tu conexión o una foto muy pesada: revisa que pese menos de 5 MB e inténtalo de nuevo.",
        });
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-surface flex flex-col gap-6 rounded-2xl p-6 sm:p-8"
    >
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
        <Field
          label="WhatsApp"
          required
          hint="Incluye tu código de país, por ejemplo +51 (Perú), +54 (Argentina) o +57 (Colombia)."
        >
          <input
            type="tel"
            name="whatsapp"
            required
            placeholder="+51 999 888 777"
            className={inputClass}
          />
        </Field>
        <Field label="Rol / Cargo actual" required>
          <input
            type="text"
            name="role"
            required
            placeholder="Cloud Engineer, DevOps Lead, Arquitecto de soluciones..."
            className={inputClass}
          />
        </Field>
        <Field label="Empresa" required>
          <input
            type="text"
            name="company"
            required
            placeholder="Nombre de tu empresa, consultora o 'Freelance / independiente'"
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
        <Field
          label="LinkedIn"
          required
          hint='Puedes pegarlo con o sin "https://": lo completamos automáticamente.'
        >
          <input
            type="text"
            name="linkedin"
            required
            placeholder="https://www.linkedin.com/in/tu-perfil"
            onBlur={handleLinkedinBlur}
            className={inputClass}
          />
        </Field>
      </div>

      <Field
        label="Título de la charla"
        required
        hint="Es el título de tu propuesta, no el nombre de la sesión del bootcamp."
      >
        <input
          type="text"
          name="talkTitle"
          required
          placeholder="Cómo desplegué mi primera app en Azure"
          className={inputClass}
        />
      </Field>

      <Field label="Descripción de la charla" required>
        <textarea
          name="talkDescription"
          required
          minLength={MIN_TALK_DESCRIPTION_LENGTH}
          rows={5}
          placeholder="Detalla la hora de conceptos, la hora de laboratorio guiado, a quién va dirigida la charla y qué nivel de experiencia previa necesita el público..."
          className={inputClass}
          onChange={(event) => setTalkDescriptionLength(event.target.value.length)}
        />
        <span
          className={`text-xs ${
            talkDescriptionLength >= MIN_TALK_DESCRIPTION_LENGTH
              ? "text-azure-light"
              : "text-white/40"
          }`}
        >
          {talkDescriptionLength} / {MIN_TALK_DESCRIPTION_LENGTH} caracteres mínimo
        </span>
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
        <span className="text-xs text-white/40">
          Marca al menos una. Si usas otra distinta a las listadas, elige &quot;Otros&quot; y
          detállala en la descripción.
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={photoInputId} className="text-sm font-medium text-white/80">
          Foto de perfil <span className="text-lead-red">*</span>
        </label>
        <label
          htmlFor={photoInputId}
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:border-white/35"
        >
          <ImagePlus className="h-4 w-4 shrink-0" aria-hidden="true" />
          {photoInfo
            ? `${photoInfo.name} · ${formatFileSize(photoInfo.size)}`
            : "Sube tu foto — Rostro visible · JPG, PNG o WEBP (no HEIC) · Máx. 5MB"}
        </label>
        <input
          id={photoInputId}
          type="file"
          name="photo"
          required
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handlePhotoChange}
        />
        {photoError ? (
          <span className="flex items-start gap-1.5 text-xs text-lead-red">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {photoError}
          </span>
        ) : null}
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
