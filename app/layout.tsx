import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = 'https://ciptadwipajaya.id'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      'Cipta Dwipajaya · Content Creator & Software Engineer | I Gusti Ngurah Cipta Dwipajaya',
    template: '%s | Cipta Dwipajaya',
  },
  description:
    'I Gusti Ngurah Cipta Dwipajaya, Content Creator and Software Engineer with 5+ years of experience building full-stack products and automation. Currently Software Engineer at Otorita Ibu Kota Nusantara (OIKN). Stack: Laravel, React, Next.js, Go, TypeScript.',
  keywords: [
    'Cipta Dwipajaya',
    'I Gusti Ngurah Cipta Dwipajaya',
    'ciptadwipajaya.id',
    'cipta dwipajaya',
    'I Gusti Ngurah Cipta',
    'Content Creator',
    'Content Creator Indonesia',
    'Software Engineer',
    'GovTech Engineer',
    'Software Engineer Indonesia',
    'Otorita IKN',
    'Otorita Ibu Kota Nusantara',
    'OIKN developer',
    'Ibu Kota Nusantara',
    'Nusantara software engineer',
    'Laravel developer Indonesia',
    'React developer Indonesia',
    'Go developer',
    'full-stack developer Nusantara',
    'software engineer Kalimantan Timur',
    'developer Bali',
    'ciptacoding',
    'cipta dev',
  ],
  authors: [
    { name: 'I Gusti Ngurah Cipta Dwipajaya', url: BASE_URL },
  ],
  creator: 'I Gusti Ngurah Cipta Dwipajaya',
  publisher: 'I Gusti Ngurah Cipta Dwipajaya',
  category: 'technology',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'profile',
    firstName: 'Cipta',
    lastName: 'Dwipajaya',
    username: 'ciptacoding',
    gender: 'male',
    url: BASE_URL,
    siteName: 'Cipta Dwipajaya',
    title: 'Cipta Dwipajaya · Content Creator & Software Engineer',
    description:
      'Content Creator and Software Engineer with 5+ years of experience. Full-stack products and automation, now at Otorita Ibu Kota Nusantara (OIKN). Stack: Laravel · React · Go · Next.js.',
    locale: 'id_ID',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cipta Dwipajaya, Content Creator and Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ciptadev',
    creator: '@ciptadev',
    title: 'Cipta Dwipajaya · Content Creator & Software Engineer',
    description:
      'Content Creator and Software Engineer, 5+ years of experience. Full-stack products and automation at OIKN. Stack: Laravel · React · Go.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    // Social profile links for rel=me verification
    'profile:first_name': 'Cipta',
    'profile:last_name': 'Dwipajaya',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        {/* rel=me links for author/identity verification */}
        <link rel="me" href="https://github.com/ciptacoding" />
        <link rel="me" href="https://linkedin.com/in/cipta-dwipajaya-9019bb231" />
        <link rel="me" href="https://twitter.com/ciptadev" />
        <link rel="me" href="https://www.tiktok.com/@ciptadwipajayaa" />
        <link rel="me" href="https://www.youtube.com/@CiptaDev" />
        {/* Runtime analytics config: regenerated from env by the container on
            start. Loaded synchronously so window.__ANALYTICS__ is set before the
            app hydrates. A safe default ships in public/ for local/dev. */}
        <script src="/analytics-config.js" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
