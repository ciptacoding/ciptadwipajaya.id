import type { MetadataRoute } from 'next'

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ciptadwipajaya.id',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          id: 'https://ciptadwipajaya.id',
          en: 'https://ciptadwipajaya.id',
        },
      },
    },
  ]
}
