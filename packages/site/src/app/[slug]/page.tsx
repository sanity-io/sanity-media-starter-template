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
const ArticlePreview = dynamic(() => import('@/components/Article/ArticlePreview'))

type Props = {
  params: {slug: string}
}

export async function generateMetadata(
  {params}: Props,
  parentPromise: ResolvingMetadata,
): Promise<Metadata> {
  const {data} = await loadArticle(params.slug)
  const parent = await parentPromise

  const previousTitle = parent.title || ''

  const OGTitle = data?.og?.title || data?.headline || previousTitle
  const OGImage = data?.og?.image?.asset?._ref || data?.coverImage.asset?._ref

  return {
    title: data?.headline || previousTitle,
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
  const initial = await loadArticle(params.slug)

  const hasFullArticleAccess = initial.data
    ? await canReadArticle(initial.data?.accessLevel)
    : false

  const data: ArticlePayload | null = cache(getData)(hasFullArticleAccess, initial.data)

  if (draftMode().isEnabled) {
    return <ArticlePreview params={params} initial={initial} />
  }

  if (!data) {
    notFound()
  }

  return (
    <>
      <Article isTruncated={!hasFullArticleAccess} data={data} />
      <TrackArticleRead accessLevel={data.accessLevel} tags={data.tags} />
    </>
  )
}
