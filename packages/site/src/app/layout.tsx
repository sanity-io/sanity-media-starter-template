import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import type {Metadata} from 'next'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import './globals.css'

import {Agdasima} from 'next/font/google'
import {ReactNode} from 'react'

const VisualEditing = dynamic(() => import('@/sanity/VisualEditing'))

const title = Agdasima({
  variable: '--font-title',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const getSiteUrl = () => {
  /*
   * Vercel sets this automatically but does not include
   *  the protocol (`https://`), so we need to add it manually.
   */
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://localhost:3000'
}

export const metadata: Metadata = {
  title: 'Sanity Media Starter Template',
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
        <Header />
        {children}
        <Footer />
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
