import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ciptadwipajaya.id/sitemap.xml',
    host: 'https://ciptadwipajaya.id',
  }
}
