import {Article} from '@/components/Article/ArticlePage'
import {loadArticle} from '@/sanity/loader/loadQuery'
import {Metadata, ResolvingMetadata} from 'next'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
const ArticlePreview = dynamic(() => import('@/components/Article/ArticlePreview'))

type Props = {
  params: {slug: string}
}

export async function generateMetadata(
  {params}: Props,
  parentPromise: ResolvingMetadata
): Promise<Metadata> {
  const {data} = await loadArticle(params.slug)
  const parent = await parentPromise

  const previousTitle = parent.title || ''
  const previousImages = parent.openGraph?.images || []

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

export default async function PageSlugRoute({params}: Props) {
  const initial = await loadArticle(params.slug)

  if (draftMode().isEnabled) {
    return <ArticlePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Article data={initial.data} />
}
