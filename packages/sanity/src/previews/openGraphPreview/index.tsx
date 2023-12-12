/**
 * When attempting to preview OG images locally you will encounter CORS errors
 * due to mismatch between the Next.js dev server and Sanity Studio's dev server.
 * 
 * To work around this, you can temporarily disable CORS in Chrome by running:
 * open -n -a Chromium --args --user-data-dir="/tmp/chrome_dev_session" --disable-web-security
 */

import {Card, Flex, Spinner} from '@sanity/ui'
import {useCallback, useEffect, useState} from 'react'
import {SanityDocument} from 'sanity'

type PreviewDocument = {
  headline?: string
  og?: {
    title?: string
    image?: {
      asset: {
        _ref: string
      }
    }
  }
  coverImage?: {
    asset: {
      _ref: string
    }
  }
}

type Props = {
  document: {
    displayed: SanityDocument & PreviewDocument
  }
}

const OpenGraphPreview = ({document}: Props) => {
  const [ogImage, setOGImage] = useState<string>('')
  const [loadState, setLoadState] = useState<'INITIAL' | 'LOADING' | 'RESOLVED' | 'ERROR'>(
    'INITIAL',
  )

  const doc = document.displayed

  const title = doc?.og?.title ?? doc?.headline
  const image = doc?.og?.image?.asset?._ref ?? doc?.coverImage?.asset?._ref

  const url = new URL('/api/og', process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL)

  if (title) {
    url.searchParams.append('title', title)
  }

  if (image) {
    url.searchParams.append('image', image)
  }

  const ogImgSrc = url.toString()

  const getOGImage = useCallback(
    async (url: string) => {
      setLoadState('LOADING')

      try {
        const image = await fetch(ogImgSrc, {
          method: 'GET',
          referrerPolicy: 'no-referrer',
        })

        if (image) {
          setOGImage(image.url)
          return setLoadState('RESOLVED')
        }
      } catch (err) {
        console.error(err)
        return setLoadState('ERROR')
      }
    },
    [ogImgSrc, setLoadState, setOGImage],
  )

  useEffect(() => {
    getOGImage(ogImage)
  }, [getOGImage, ogImage])

  if (!document.displayed || loadState === 'ERROR') {
    return (
      <Card padding={4}>
        <Flex justify="center">A preview couldn’t be generated</Flex>
      </Card>
    )
  }

  if (loadState === 'INITIAL' || loadState === 'LOADING') {
    return (
      <Card padding={4}>
        <Flex justify="center">
          <Spinner muted /> Loading...
        </Flex>
      </Card>
    )
  }

  return (
    <div
      style={{
        boxSizing: 'border-box',
        height: '630px',
        maxWidth: '100%',
        padding: '32px',
        width: '1200px',
      }}
    >
      <img
        src={ogImage}
        alt=""
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}

export default OpenGraphPreview
