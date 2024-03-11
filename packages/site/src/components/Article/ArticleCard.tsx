import {HomePagePayload} from '@/sanity/types'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader/rsc'
import Link from 'next/link'
import {SanityImage} from '../SanityImage'

export const ArticleCard = ({
  className,
  article,
  encodeDataAttribute,
  isFeatured,
}: {
  article: Pick<
    HomePagePayload[number],
    '_id' | 'accessLevel' | 'slug' | 'headline' | 'subHeadline' | 'coverImage'
  >
  className?: string
  encodeDataAttribute?: EncodeDataAttributeCallback
  isFeatured: boolean
}) => (
  <section className={`${className} ${isFeatured ? 'col-span-2 row-span-2' : ''}`}>
    <Link
      href={`/${article.slug}`}
      className="flex flex-col gap-2"
      data-sanity={encodeDataAttribute?.([0, 'slug'])}
    >
      <div className="relative">
        {article.accessLevel === 'premium' && (
          <div className="absolute text-xs font-semibold bottom-0 right-0 px-1 py-0.5 bg-brand text-white uppercase font-title tracking-widest">
            {article.accessLevel}
          </div>
        )}
        {article.accessLevel === 'public' && (
          <div className="absolute text-xs font-semibold bottom-0 right-0 px-1 py-0.5 bg-blue-400 text-white uppercase font-title tracking-widest">
            Free to read
          </div>
        )}

        <SanityImage image={article.coverImage} data-sanity={encodeDataAttribute?.('coverImage')} />
      </div>

      <h2
        className={`font-title tracking-wide text-center leading-tight ${
          isFeatured ? 'col-span-2 row-span-2 text-3xl' : 'text-2xl'
        }`}
        data-sanity={encodeDataAttribute?.('headline')}
      >
        {article.headline}
      </h2>
      <p
        className="font-serif font-normal text-center"
        data-sanity={encodeDataAttribute?.('subHeadline')}
      >
        {article.subHeadline}
      </p>
    </Link>
  </section>
)
