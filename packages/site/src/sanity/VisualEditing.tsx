'use client'

import {enableVisualEditing} from '@sanity/visual-editing'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

import {client} from '@/sanity/lib/client'

import {useLiveMode} from './loader/useQuery'
import {studioUrl} from './lib/api'
import {FilterDefault} from 'next-sanity'
import type {HistoryAdapterNavigate} from '@sanity/visual-editing'

const encodeSourceMapAtPath: FilterDefault = (props) => {
  if (props.sourcePath.at(-1) === 'url') {
    return false
  }
  return props.filterDefault(props)
}

// Always enable stega in Live Mode
// See https://vercel.com/docs/workflow-collaboration/visual-editing/cms-guide#
const stegaClient = client.withConfig({
  stega: {
    studioUrl,
    enabled: true,
    filter: encodeSourceMapAtPath,
    logger: console,
  },
})

export default function VisualEditing() {
  const router = useRouter()
  const routerRef = useRef(router)
  const [navigate, setNavigate] = useState<HistoryAdapterNavigate | undefined>()

  useEffect(() => {
    routerRef.current = router
  }, [router])
  useEffect(() => {
    const disable = enableVisualEditing({
      history: {
        subscribe: (navigate) => {
          setNavigate(() => navigate)
          return () => setNavigate(undefined)
        },
        update: (update) => {
          switch (update.type) {
            case 'push':
              return routerRef.current.push(update.url)
            case 'pop':
              return routerRef.current.back()
            case 'replace':
              return routerRef.current.replace(update.url)
            default:
              throw new Error(`Unknown update type: ${update.type}`)
          }
        },
      },
    })

    return () => disable()
  }, [])

  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (navigate) {
      navigate({
        type: 'push',
        url: `${pathname}${searchParams?.size ? `?${searchParams}` : ''}`,
      })
    }
  }, [navigate, pathname, searchParams])

  useLiveMode({
    allowStudioOrigin: studioUrl,
    client: stegaClient,
  })
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (
      (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview' ||
        process.env.NODE_ENV !== 'development') &&
      window === parent
    ) {
      location.href = '/api/disable-draft'
    }
  }, [])

  return null
}
