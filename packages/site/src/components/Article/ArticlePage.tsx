import type {ArticlePayload} from '@/sanity/types'
import {PortableText} from '@portabletext/react'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader/rsc'
import {SanityImage} from '../SanityImage'
import {ArticleCard} from './ArticleCard'
import {SignUpForm} from '../ContentGate/SignUpForm'

export interface PageProps {
  data: ArticlePayload | null
  isTruncated?: boolean
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export const Article = ({data, encodeDataAttribute, isTruncated}: PageProps) => {
  // Default to an empty object to allow previews on non-existent documents
  const {accessLevel, content, headline, subHeadline, coverImage} = data ?? {}

  return (
    <>
      <article className="prose dark:prose-invert font-serif mx-auto px-4 md:0">
        <h1
          className="font-title font-bold text-5xl"
          data-sanity={encodeDataAttribute?.('headline') ?? 'test'}
        >
          {headline}
        </h1>
        <p className="text-lg" data-sanity={encodeDataAttribute?.('subHeadline')}>
          {subHeadline}
        </p>
        <SanityImage
          image={coverImage}
          className="w-full"
          data-sanity={encodeDataAttribute?.('coverImage')}
        />
        <main>
          <PortableText value={content ?? []} />

          {isTruncated && <p className="text-center italic">Sign up to read the full article…</p>}
        </main>

        {isTruncated && <SignUpForm />}
      </article>

      {!isTruncated && (
        <aside className="px-4 md:px-16 lg:px-32 py-7">
          <ul className="list-none flex p-0 m-0 gap-5 flex-wrap md:flex-nowrap">
            {data?.related?.map((article) => (
              <li key={article._id}>
                <ArticleCard article={{...article, _id: article._id}} isFeatured={false} />
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  )
}
