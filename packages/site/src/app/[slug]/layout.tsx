import React, {ReactNode} from 'react'
import {Header} from '@/components/Header'

export default function ArticleLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header compact />
      {children}
    </>
  )
}
