import type {ArticlePayload} from '@/sanity/types'
import {PortableText} from '@portabletext/react'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader/rsc'
import {SanityImage} from '../SanityImage'

export interface PageProps {
  data: ArticlePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export const Article = ({data, encodeDataAttribute}: PageProps) => {
  // Default to an empty object to allow previews on non-existent documents
  const {content, headline, subHeadline, coverImage} = data ?? {}

  return (
    <article className="prose dark:prose-invert font-serif mx-auto">
      <h2 className="font-sans text-xl" data-sanity={encodeDataAttribute?.('headline') ?? 'test'}>
        {headline}
      </h2>
      <p className="font-sans text-lg" data-sanity={encodeDataAttribute?.('subHeadline')}>
        {subHeadline}
      </p>
      <SanityImage
        image={coverImage}
        className="w-full"
        data-sanity={encodeDataAttribute?.('coverImage')}
      />
      <main>
        <PortableText value={content ?? []} />
      </main>
    </article>
  )
}
