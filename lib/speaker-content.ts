// Contenido público del formulario de speakers (sin acceso a datos, seguro
// para importar desde componentes cliente). El acceso a Supabase vive en
// lib/speakers.ts, marcado como server-only. Las herramientas a marcar ya
// no son una lista global: cada sesión trae las suyas en `speaker_slots.tools`.

export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
