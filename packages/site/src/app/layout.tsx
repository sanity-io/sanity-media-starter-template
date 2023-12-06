import {Footer} from '@/components/Footer'
import {Header} from '@/components/Header'
import type {Metadata} from 'next'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'

const VisualEditing = dynamic(() => import('@/sanity/VisualEditing'))

import './globals.css'

import {Inter, PT_Serif} from 'next/font/google'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '500', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Sanity Media Starter Template',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
