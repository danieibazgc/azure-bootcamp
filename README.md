# Azure Bootcamp by LEAD UTP — Landing informativa

Landing de una sola página construida con **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, con la identidad visual de LEAD UTP y un fondo animado en WebGL, para comunicar el Azure Bootcamp mientras la plataforma educativa aún no existe.

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Crea un `.env.local` (ya está en `.gitignore`) con las credenciales del proyecto de Supabase que respalda el Call for Speakers:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

Sin estas variables, `/aplicar` no puede leer las fechas ni recibir postulaciones.

## Estructura

- `app/page.tsx` — compone las secciones de la landing
- `app/layout.tsx` — fuentes (Poppins/Outfit), metadata SEO/OG, monta el fondo animado
- `app/globals.css` — tokens de color de marca (`--navy`, `--lead-red`, `--violet`, `--azure`, `--azure-light`) y utilidades visuales (`card-surface`, `gradient-cta`, `text-gradient-azure`)
- `lib/content.ts` — copy, fechas, malla académica y el link del formulario de postulación (**única fuente de verdad**; edítalo ahí para actualizar fechas, sesiones o preguntas frecuentes)
- `components/landing/` — un componente por sección:
  - `ColorBends.tsx` / `SiteBackground.tsx` — fondo WebGL animado (Three.js) fijo a pantalla completa
  - `Navbar.tsx`, `Hero.tsx`, `Highlights.tsx`, `Audience.tsx`, `Curriculum.tsx`, `Format.tsx`, `Closing.tsx`, `Requirements.tsx`, `Faq.tsx`, `CtaFinal.tsx`, `Footer.tsx`
- `app/aplicar/` — Call for speakers (ver sección dedicada más abajo)
- `lib/supabase.ts`, `lib/speakers.ts`, `lib/speaker-content.ts` — cliente y datos del Call for speakers
- `public/brand/lead-utp-logo.png` — logo
- `public/og.jpg` — imagen para previsualizaciones al compartir el link (usa el afiche original; si más adelante quieres una imagen 1200×630 recortada específicamente para OG, reemplaza este archivo)

## Editar contenido

Todo el copy público (fechas, malla, requisitos, FAQ) y el link del formulario de postulación (`FORM_URL`) viven en [`lib/content.ts`](lib/content.ts). No hace falta tocar los componentes para actualizar textos o fechas.

## Fondo animado

`components/landing/ColorBends.tsx` es un shader de Three.js que pinta un gradiente animado a pantalla completa. Se monta una sola vez desde `SiteBackground.tsx` (con `next/dynamic(..., { ssr: false })`) y respeta `prefers-reduced-motion` y la visibilidad de la pestaña para no gastar batería de más. Los colores están definidos en `SiteBackground.tsx`.

## Call for speakers (`/aplicar`)

Convocatoria pública para conseguir un ponente por cada una de las 12 sesiones de la malla, respaldada por Supabase (Postgres + Storage, sin autenticación: todo es lectura pública + inserción anónima protegida por RLS).

- `/aplicar` — grilla con las 12 fechas (`app/aplicar/page.tsx`), leídas de la tabla `speaker_slots`.
- `/aplicar/[slug]` — formulario de postulación por fecha (`app/aplicar/[slug]/page.tsx` + `SpeakerForm.tsx`), con Server Action en `app/aplicar/actions.ts`.
- `lib/supabase.ts` — cliente único (`@supabase/supabase-js`, sin `@supabase/ssr`: no hay sesiones de usuario que sincronizar por cookies).
- `lib/speakers.ts` — helpers de lectura/escritura contra Supabase (marcado `server-only`).
- `lib/speaker-content.ts` — lista de herramientas de Azure para el formulario (seguro para importar desde un componente cliente).

**Administración (vía [Supabase Studio](https://supabase.com/dashboard)):**

- **Cerrar una fecha:** en la tabla `speaker_slots`, cambia su `status` a `closed`. Deja de aceptar postulaciones y la card en `/aplicar` se muestra como "Cerrada" (ya no es un link).
- **Revisar postulaciones:** tabla `speaker_applications` (nadie más puede leerla; ni siquiera con la clave pública se puede hacer `select`, solo `insert`). Las fotos quedan en el bucket público `speaker-photos`, referenciadas por `photo_path`.
- **Reabrir/editar fechas:** actualiza `title`, `starts_at`, `ends_at` o `status` directamente en `speaker_slots`. Si cambias el `slug`, recuerda actualizar el enlace del footer si lo compartiste.

## Scripts

- `npm run dev` — servidor de desarrollo (Turbopack)
- `npm run build` — build de producción
- `npm run start` — sirve el build de producción
- `npm run lint` — ESLint
