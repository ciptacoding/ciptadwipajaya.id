import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Stack from '@/components/Stack'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ClientEffects from '@/components/ClientEffects'

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
    url: 'https://ciptadwipajaya.id/photo.jpg',
    width: 800,
    height: 1000,
  },
  jobTitle: 'GovTech Engineer',
  description:
    "GovTech Engineer & Software Engineer at Otorita Ibu Kota Nusantara (OIKN), building the digital foundation of Indonesia's new capital city Nusantara.",
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
    'https://instagram.com/ciptadwipajayaa',
  ],
  knowsAbout: [
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
    skills: 'Full-stack Development, Laravel, React, Go, TypeScript, PostgreSQL, REST API',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://ciptadwipajaya.id/#website',
  url: 'https://ciptadwipajaya.id',
  name: 'Cipta Dwipajaya — GovTech Engineer',
  description:
    "Personal portfolio of I Gusti Ngurah Cipta Dwipajaya, GovTech Engineer building digital infrastructure for Indonesia's new capital.",
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

      {/* Global client-side effects: scroll reveal, nav spy, chip stagger, stat counters */}
      <ClientEffects />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
