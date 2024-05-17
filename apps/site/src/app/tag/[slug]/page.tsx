import {TagPage} from '@/components/Tag/TagPage'
import {notFound} from 'next/navigation'
import {TagPayload} from '@/sanity/types'
import {loadTagWithArticles} from '@/sanity/loader/loadQuery'

type Props = {
  params: {slug: string}
}

export default async function TagSlugRoute({params}: Props) {
  const { data }: {data: TagPayload | null} = await loadTagWithArticles(params.slug)

  if (!data) {
    notFound()
  }
  return (
    <>
      <TagPage data={data} />
    </>
  )
}
