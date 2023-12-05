import {Article} from '@/components/Article/ArticlePage'
import {loadArticle} from '@/sanity/loader/loadQuery'
import dynamic from 'next/dynamic'
import {draftMode} from 'next/headers'
import {notFound} from 'next/navigation'
const ArticlePreview = dynamic(() => import('@/components/Article/ArticlePreview'))

type Props = {
  params: {slug: string}
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
