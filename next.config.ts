import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // El bucket "speaker-photos" y el formulario de /aplicar aceptan fotos
      // de hasta 5MB, pero Next.js limita el body de un Server Action a 1MB
      // por defecto. Una foto de celular sin comprimir (2-5MB) hacía que el
      // POST de "Confirmar postulación" se cortara antes de llegar a
      // submitSpeakerApplication: Supabase nunca recibía el intento y el
      // usuario veía un error genérico del framework en vez del mensaje del
      // formulario. SpeakerForm.tsx ahora comprime la foto en el cliente
      // (apunta a ~1.2MB), así que 4mb deja margen de sobra sin acercarse al
      // tope de ~4.5MB que Vercel aplica a nivel de plataforma.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
