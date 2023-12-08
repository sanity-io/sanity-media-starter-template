/* eslint-disable @next/next/no-img-element -- next/image is not supported when rendering OG images */

/**
 * Vercel's dynamic OG image supports a subset of React & CSS features.
 * @see https://vercel.com/docs/functions/edge-functions/og-image-generation/og-image-examples#using-an-external-dynamic-image
 */

import {metadata} from '@/app/layout'
import {Logo} from '@/components/Logo'
import {urlForImage} from '@/sanity/lib/imageBuilder'
import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(req: Request) {
  const fontData = await fetch(
    new URL('../../../../public/assets/Agdasima-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const {searchParams} = new URL(req.url)

  const hasTitleParam = searchParams.has('title')
  const title = hasTitleParam ? searchParams.get('title') : metadata.title?.toString()
  const formattedTitle = title && title.length > 100 ? `${title.slice(0, 100)}…` : title?.toString()

  const image = searchParams.get('image')
  const imageUrl =
    image &&
    urlForImage({asset: {_type: '', _ref: image}})
      ?.height(630)
      .width(1200)
      .fit('crop')
      .url()

  return new ImageResponse(
    (
      <div tw="flex bg-brand h-full w-full flex-col items-start justify-between">
        {imageUrl && (
          <img
            alt=""
            width="1200"
            height="630"
            src={imageUrl}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
          />
        )}

        <div tw="flex self-end text-white p-[48px] relative">
          <Logo width={500} />
        </div>

        <div
          style={{
            backgroundImage: image
              ? 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.6) 50%, transparent)'
              : '',
            display: 'flex',
            padding: '64px 48px 48px 48px',
            width: '100%',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <h1 tw="leading-none text-7xl text-white font-sans text-left">{formattedTitle}</h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Agdasima',
          data: fontData,
          style: 'normal',
          weight: 800,
        },
      ],
    }
  )
}
