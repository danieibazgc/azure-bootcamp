import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  );
}

// This app has no authentication, so a single anon-key client (RLS-protected)
// is reused across Server Components and Server Actions. No `@supabase/ssr`
// cookie plumbing is needed since there is no user session to persist.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SPEAKER_PHOTOS_BUCKET = "speaker-photos";
