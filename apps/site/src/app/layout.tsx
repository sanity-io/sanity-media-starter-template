import {Footer} from '@/components/Footer'
import type {Metadata} from 'next'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import './globals.css'

import {SITE_IS_INDEXABLE, getSiteUrl} from '@/libs/siteConfig'
import {Agdasima} from 'next/font/google'
import {ReactNode} from 'react'

const VisualEditing = dynamic(() => import('@/sanity/VisualEditing'))

const title = Agdasima({
  variable: '--font-title',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Sanity Media Starter Template',
  robots: {
    index: SITE_IS_INDEXABLE,
    follow: SITE_IS_INDEXABLE,
  },
  alternates: {
    canonical: '/',
  },
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: 'Sanity Media Starter Template',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" className={`${title.variable}`}>
      <body className="font-serif">
        {children}
        <Footer />
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
