import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let slotUrls: MetadataRoute.Sitemap = [];
  try {
    const { listSpeakerSlots } = await import("@/lib/speakers");
    const slots = await listSpeakerSlots();
    slotUrls = slots.map((slot) => ({
      url: `${SITE.url}/aplicar/${slot.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6,
    }));
  } catch {
    slotUrls = [];
  }

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
    {
      url: `${SITE.url}/badge`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/podio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...slotUrls,
  ];
}
