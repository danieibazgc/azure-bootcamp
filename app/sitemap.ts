import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { listSpeakerSlots } from "@/lib/speakers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slots = await listSpeakerSlots();
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/aplicar`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...slots.map((slot) => ({
      url: `${SITE.url}/aplicar/${slot.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ];
}
