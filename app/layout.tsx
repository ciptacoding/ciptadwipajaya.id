import type { Metadata } from 'next'
import { Syne, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Loader from '@/components/Loader'
import CustomCursor from '@/components/CustomCursor'
import ParticleCanvas from '@/components/ParticleCanvas'

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const BASE_URL = 'https://ciptadwipajaya.id'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Cipta Dwipajaya — GovTech Engineer | I Gusti Ngurah Cipta Dwipajaya',
    template: '%s | Cipta Dwipajaya',
  },
  description:
    'I Gusti Ngurah Cipta Dwipajaya — GovTech Engineer & Software Engineer at Otorita Ibu Kota Nusantara (OIKN). Building the digital foundation of Indonesia\'s future capital city, Nusantara. Full-stack developer: Laravel, React, Next.js, Go, TypeScript.',
  keywords: [
    'Cipta Dwipajaya',
    'I Gusti Ngurah Cipta Dwipajaya',
    'ciptadwipajaya.id',
    'cipta dwipajaya',
    'I Gusti Ngurah Cipta',
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
    title: 'Cipta Dwipajaya — GovTech Engineer | I Gusti Ngurah Cipta Dwipajaya',
    description:
      'GovTech Engineer at Otorita Ibu Kota Nusantara (OIKN), building digital infrastructure for Indonesia\'s new capital city. Full-stack developer: Laravel · React · Go · Next.js.',
    locale: 'id_ID',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cipta Dwipajaya — GovTech Engineer at Otorita IKN',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ciptadev',
    creator: '@ciptadev',
    title: 'Cipta Dwipajaya — GovTech Engineer | ciptadwipajaya.id',
    description:
      'GovTech Engineer at OIKN — building digital infrastructure for Indonesia\'s new capital. Full-stack: Laravel · React · Go.',
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
    <html
      lang="id"
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* rel=me links for author/identity verification */}
        <link rel="me" href="https://github.com/ciptacoding" />
        <link rel="me" href="https://linkedin.com/in/cipta-dwipajaya-9019bb231" />
        <link rel="me" href="https://twitter.com/ciptadev" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Loader />
        <CustomCursor />
        <ParticleCanvas />
        {children}
      </body>
    </html>
  )
}
