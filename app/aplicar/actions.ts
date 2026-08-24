"use server";

import {
  createSpeakerApplication,
  getSpeakerSlotBySlug,
  uploadSpeakerPhoto,
} from "@/lib/speakers";
import { ALLOWED_PHOTO_TYPES, MAX_PHOTO_SIZE_BYTES } from "@/lib/speaker-content";

export type SpeakerFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitSpeakerApplication(
  _prevState: SpeakerFormState,
  formData: FormData
): Promise<SpeakerFormState> {
  const slotSlug = readText(formData, "slotSlug");
  const fullName = readText(formData, "fullName");
  const whatsapp = readText(formData, "whatsapp");
  const role = readText(formData, "role");
  const company = readText(formData, "company");
  const email = readText(formData, "email").toLowerCase();
  const linkedin = readText(formData, "linkedin");
  const talkTitle = readText(formData, "talkTitle");
  const talkDescription = readText(formData, "talkDescription");
  const tools = formData.getAll("tools").filter((v): v is string => typeof v === "string");
  const photoEntry = formData.get("photo");
  const photo = photoEntry instanceof File && photoEntry.size > 0 ? photoEntry : null;

  if (
    !slotSlug ||
    !fullName ||
    !whatsapp ||
    !role ||
    !company ||
    !email ||
    !talkTitle ||
    !talkDescription ||
    tools.length === 0
  ) {
    return {
      status: "error",
      message: "Completa todos los campos obligatorios antes de enviar.",
    };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Ingresa un correo electrónico válido." };
  }

  if (photo) {
    if (photo.size > MAX_PHOTO_SIZE_BYTES) {
      return { status: "error", message: "La foto no debe superar los 5 MB." };
    }
    if (!ALLOWED_PHOTO_TYPES.includes(photo.type as (typeof ALLOWED_PHOTO_TYPES)[number])) {
      return {
        status: "error",
        message: "La foto debe ser JPG, PNG o WEBP.",
      };
    }
  }

  let slot;
  try {
    slot = await getSpeakerSlotBySlug(slotSlug);
  } catch {
    return {
      status: "error",
      message: "No pudimos verificar la fecha seleccionada. Intenta de nuevo.",
    };
  }

  if (!slot) {
    return { status: "error", message: "Esta fecha ya no existe." };
  }

  if (slot.status !== "open") {
    return {
      status: "error",
      message: "Esta fecha ya no acepta postulaciones. Elige otra en /aplicar.",
    };
  }

  const validTools = new Set(slot.tools);
  if (tools.some((tool) => !validTools.has(tool))) {
    return {
      status: "error",
      message: "Selecciona herramientas válidas para esta sesión.",
    };
  }

  let photoPath: string | null = null;
  if (photo) {
    try {
      photoPath = await uploadSpeakerPhoto(photo, slot.slug);
    } catch {
      return {
        status: "error",
        message: "No pudimos subir tu foto. Intenta de nuevo en unos segundos.",
      };
    }
  }

  const result = await createSpeakerApplication({
    slotId: slot.id,
    fullName,
    whatsapp,
    role,
    company,
    email,
    linkedin: linkedin || null,
    talkTitle,
    talkDescription,
    tools,
    photoPath,
  });

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  return {
    status: "success",
    message: "¡Listo! Recibimos tu postulación. Te contactaremos por correo o WhatsApp.",
  };
}
