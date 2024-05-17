import React, {ReactNode} from 'react'
import {Header} from '@/components/Header'
import { SubNav } from '@/components/SubNav'

export default function TagLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header compact />
      <SubNav />
      
      {children}
    </>
  )
}
