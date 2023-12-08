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

export const metadata: Metadata = {
  title: 'Sanity Media Starter Template',
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
