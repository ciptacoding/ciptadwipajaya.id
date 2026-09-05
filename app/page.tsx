import Portfolio from '@/components/Portfolio'

// JSON-LD Person schema — maximises entity recognition for "Cipta Dwipajaya" searches
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://ciptadwipajaya.id/#person',
  name: 'I Gusti Ngurah Cipta Dwipajaya',
  alternateName: ['Cipta Dwipajaya', 'Cipta', 'ciptadwipajaya', 'ciptacoding'],
  url: 'https://ciptadwipajaya.id',
  image: {
    '@type': 'ImageObject',
    url: 'https://ciptadwipajaya.id/cipta.png',
    width: 800,
    height: 1000,
  },
  jobTitle: ['Software Engineer', 'Content Creator'],
  description:
    'Content Creator and Software Engineer with 5+ years of experience building full-stack products and automation. Currently a Software Engineer at Otorita Ibu Kota Nusantara (OIKN).',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://ikn.go.id/#org',
    name: 'Otorita Ibu Kota Nusantara',
    alternateName: 'OIKN',
    url: 'https://ikn.go.id',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nusantara',
    addressRegion: 'Kalimantan Timur',
    addressCountry: 'ID',
  },
  birthPlace: {
    '@type': 'Place',
    name: 'Bali, Indonesia',
  },
  sameAs: [
    'https://ciptadwipajaya.id',
    'https://github.com/ciptacoding',
    'https://linkedin.com/in/cipta-dwipajaya-9019bb231',
    'https://twitter.com/ciptadev',
    'https://www.instagram.com/ciptadwipajayaa/',
    'https://www.tiktok.com/@ciptadwipajayaa',
    'https://www.youtube.com/@CiptaDev',
    'https://www.threads.com/@ciptadwipajayaa',
    'https://www.youtube.com/@BolaAjaOfficial',
  ],
  knowsAbout: [
    'Content Creation',
    'Laravel',
    'React.js',
    'Vue.js',
    'Nuxt.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Go',
    'Tailwind CSS',
    'Redux',
    'PostgreSQL',
    'MySQL',
    'Prisma ORM',
    'REST API',
    'n8n Automation',
    'Docker',
    'Supabase',
    'SSO Integration',
    'AI Automation',
    'Full-stack Web Development',
    'GovTech',
    'Software Engineering',
    'System Architecture',
  ],
  nationality: 'Indonesian',
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineer',
    occupationLocation: {
      '@type': 'City',
      name: 'Nusantara',
    },
    skills: 'Full-stack Development, Laravel, React, Go, TypeScript, PostgreSQL, REST API, Content Creation',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://ciptadwipajaya.id/#website',
  url: 'https://ciptadwipajaya.id',
  name: 'Cipta Dwipajaya · Content Creator & Software Engineer',
  description:
    'Personal site of I Gusti Ngurah Cipta Dwipajaya, Content Creator and Software Engineer with 5+ years of experience.',
  author: { '@id': 'https://ciptadwipajaya.id/#person' },
  inLanguage: ['id', 'en'],
}

export default function Home() {
  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Portfolio />
    </>
  )
}
