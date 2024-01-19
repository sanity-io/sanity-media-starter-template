import {HomePagePayload} from '@/sanity/types'
import type {EncodeDataAttributeCallback} from '@sanity/react-loader/rsc'
import {ArticleCard} from '../Article/ArticleCard'

export interface PageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export const HomePage = ({data, encodeDataAttribute}: PageProps) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 grid-rows-2">
      {data?.map((article, idx) => (
        <ArticleCard
          key={article._id}
          article={article}
          encodeDataAttribute={encodeDataAttribute}
          isFeatured={idx === 0}
        />
      ))}
    </main>
  )
}
