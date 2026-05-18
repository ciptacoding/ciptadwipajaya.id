import type { MetadataRoute } from 'next'

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
