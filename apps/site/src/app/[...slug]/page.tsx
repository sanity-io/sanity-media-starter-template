import {canReadArticle} from '@/libs/contentGate'
import {TrackArticleRead} from '@/components/ContentGate/IncrementArticleCount'
import {Article} from '@/components/Article/ArticlePage'
import {loadArticle} from '@/sanity/loader/loadQuery'
import {Metadata, ResolvingMetadata} from 'next'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
import {cache} from 'react'
import {ArticlePayload} from '@/sanity/types'
import {isSubscribed} from '@/libs/auth'
import {ArticleJsonLd} from 'next-seo'
import {urlForImage} from '@/sanity/lib/imageBuilder'
const ArticlePreview = dynamic(() => import('@/components/Article/ArticlePreview'))

const getArticleSlug = (slug: string | string[]) => {
  return Array.isArray(slug) ? slug.join('/') : slug
}

type Props = {
  params: {slug: string}
}

export async function generateMetadata(
  {params}: Props,
  parentPromise: ResolvingMetadata,
): Promise<Metadata> {
  const slug = getArticleSlug(params.slug)
  const {data} = await loadArticle(slug)
  const parent = await parentPromise

  const previousTitle = parent.title || ''

  const OGTitle = data?.og?.title || data?.headline || previousTitle
  const OGImage = data?.og?.image?.asset?._ref || data?.coverImage.asset?._ref

  return {
    title: data?.headline || previousTitle,
    alternates: {canonical: slug},
    openGraph: {
      title: OGTitle,
      description: data?.og?.description || data?.subHeadline || '',
      images: [`/api/og?title=${OGTitle}&image=${OGImage}`],
    },
  }
}

/**
 * Cache the data based on the user's access level
 */
const getData = (hasFullArticleAccess: boolean, data: ArticlePayload | null) => {
  if (!data) {
    return null
  }

  const content = hasFullArticleAccess ? data.content : data.content.slice(0, 2)
  return hasFullArticleAccess ? data : {...data, content}
}

export default async function PageSlugRoute({params}: Props) {
  const slug = getArticleSlug(params.slug)
  const initial = await loadArticle(slug)

  const isUserAuthenticated = await isSubscribed()
  const hasFullArticleAccess = initial.data
    ? await canReadArticle(initial.data?.accessLevel)
    : false

  const data: ArticlePayload | null = cache(getData)(hasFullArticleAccess, initial.data)

  if (draftMode().isEnabled) {
    return (
      <ArticlePreview params={{...params, slug}} initial={initial} isMember={isUserAuthenticated} />
    )
  }

  if (!data) {
    notFound()
  }

  return (
    <>
      <ArticleJsonLd
        useAppDir={true}
        url={slug}
        title={data.headline}
        images={[urlForImage(data.coverImage)?.height(2000).width(3500).fit('crop').url()]}
        datePublished={data.publishDate}
        dateModified={data._updatedAt}
        authorName={data.authors.map((author) => ({
          type: 'Person',
          name: author.name,
          url:
            author.twitter || author.linkedin || author.email
              ? `mailto:${author.email}`
              : undefined,
        }))}
        isAccessibleForFree={data.accessLevel === 'public'}
        publisherName="Sanity Media Starter"
        description={data.subHeadline}
      />
      <Article isTruncated={!hasFullArticleAccess} isMember={isUserAuthenticated} data={data} />
      <TrackArticleRead accessLevel={data.accessLevel} tags={data.tags} />
    </>
  )
}
