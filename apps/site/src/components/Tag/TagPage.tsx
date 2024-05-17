import type {TagPayload} from '@/sanity/types'
import {ArticleCard} from '../Article/ArticleCard'

export interface PageProps {
  data: TagPayload | null
}

export const TagPage = ({data}: PageProps) => {

  return (
    <div className="mx-auto container">
      <div className="flex flex-col items-left my-10">
        <h1 className="text-3xl md:text-5xl font-bold">{data?.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {data?.articles.map((article) => (
          <ArticleCard key={article._id} article={article} isFeatured={false} />
        ))}
      </div>
    </div>
  )
}
