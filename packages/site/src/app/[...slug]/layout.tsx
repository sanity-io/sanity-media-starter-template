import React, {ReactNode} from 'react'
import {Header} from '@/components/Header'
import { SubNav } from '@/components/SubNav'

export default function ArticleLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header compact />
      <SubNav />
      
      {children}
    </>
  )
}
