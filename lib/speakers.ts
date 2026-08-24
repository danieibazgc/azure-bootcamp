import "server-only";
import { supabase, SPEAKER_PHOTOS_BUCKET } from "@/lib/supabase";

export type SpeakerSlotStatus = "open" | "closed";

export type SpeakerSlot = {
  id: string;
  slug: string;
  sessionNumber: number;
  week: number;
  title: string;
  brief: string;
  tools: string[];
  startsAt: string;
  endsAt: string;
  status: SpeakerSlotStatus;
};

type SpeakerSlotRow = {
  id: string;
  slug: string;
  session_number: number;
  week: number;
  title: string;
  brief: string;
  tools: string[];
  starts_at: string;
  ends_at: string;
  status: SpeakerSlotStatus;
};

function mapSlot(row: SpeakerSlotRow): SpeakerSlot {
  return {
    id: row.id,
    slug: row.slug,
    sessionNumber: row.session_number,
    week: row.week,
    title: row.title,
    brief: row.brief,
    tools: row.tools,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    status: row.status,
  };
}

const SLOT_COLUMNS =
  "id, slug, session_number, week, title, brief, tools, starts_at, ends_at, status";

export async function listSpeakerSlots(): Promise<SpeakerSlot[]> {
  const { data, error } = await supabase
    .from("speaker_slots")
    .select(SLOT_COLUMNS)
    .order("session_number", { ascending: true });

  if (error) {
    throw new Error(`No se pudo cargar la lista de fechas: ${error.message}`);
  }

  return (data ?? []).map(mapSlot);
}

export async function getSpeakerSlotBySlug(
  slug: string
): Promise<SpeakerSlot | null> {
  const { data, error } = await supabase
    .from("speaker_slots")
    .select(SLOT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar la fecha: ${error.message}`);
  }

  return data ? mapSlot(data) : null;
}

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function uploadSpeakerPhoto(
  photo: File,
  slotSlug: string
): Promise<string> {
  const extension =
    EXTENSION_BY_MIME[photo.type] ??
    photo.name.split(".").pop()?.toLowerCase() ??
    "jpg";
  const path = `${slotSlug}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(SPEAKER_PHOTOS_BUCKET)
    .upload(path, photo, { contentType: photo.type });

  if (error) {
    throw new Error(`No se pudo subir la foto: ${error.message}`);
  }

  return path;
}

export type NewSpeakerApplication = {
  slotId: string;
  fullName: string;
  whatsapp: string;
  role: string;
  company: string;
  email: string;
  linkedin: string | null;
  talkTitle: string;
  talkDescription: string;
  tools: string[];
  photoPath: string | null;
};

export type CreateApplicationResult =
  | { ok: true }
  | { ok: false; reason: "duplicate" | "unknown"; message: string };

export async function createSpeakerApplication(
  input: NewSpeakerApplication
): Promise<CreateApplicationResult> {
  const { error } = await supabase.from("speaker_applications").insert({
    slot_id: input.slotId,
    full_name: input.fullName,
    whatsapp: input.whatsapp,
    role: input.role,
    company: input.company,
    email: input.email,
    linkedin: input.linkedin,
    talk_title: input.talkTitle,
    talk_description: input.talkDescription,
    tools: input.tools,
    photo_path: input.photoPath,
  });

  if (error) {
    // Postgres unique_violation on (slot_id, email).
    if (error.code === "23505") {
      return {
        ok: false,
        reason: "duplicate",
        message: "Ya registramos una postulación con este correo para esta fecha.",
      };
    }
    return { ok: false, reason: "unknown", message: error.message };
  }

  return { ok: true };
}
