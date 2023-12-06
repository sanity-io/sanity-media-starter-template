import {HomePagePayload} from '@/sanity/types'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader/rsc'
import Link from 'next/link'
import {SanityImage} from '../SanityImage'

const ArticleCard = ({
  className,
  article,
  encodeDataAttribute,
}: {
  article: HomePagePayload[number]
  className?: string
  encodeDataAttribute?: EncodeDataAttributeCallback
}) => (
  <section className={className}>
    <Link
      href={`/${article.slug}`}
      className="flex flex-col gap-2"
      data-sanity={encodeDataAttribute?.([0, 'slug'])}
    >
      <SanityImage image={article.coverImage} data-sanity={encodeDataAttribute?.('coverImage')} />
      <h2
        className="font-sans text-2xl tracking-wide"
        data-sanity={encodeDataAttribute?.('headline')}
      >
        {article.headline}
      </h2>
      <p className="font-serif font-normal" data-sanity={encodeDataAttribute?.('subHeadline')}>
        {article.subHeadline}
      </p>
    </Link>
  </section>
)

export interface PageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export const HomePage = ({data, encodeDataAttribute}: PageProps) => {
  return (
    <main>
      {data?.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          encodeDataAttribute={encodeDataAttribute}
        />
      ))}
    </main>
  )
}
