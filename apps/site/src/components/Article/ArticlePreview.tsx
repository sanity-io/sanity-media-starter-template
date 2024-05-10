'use client'

import {useQuery} from '@/sanity/loader/useQuery'
import {articlesBySlugQuery} from '@/sanity/queries'
import {ArticlePayload} from '@/sanity/types'
import {type QueryResponseInitial} from '@sanity/react-loader/rsc'
import {Article} from './ArticlePage'

type Props = {
  params: {slug: string}
  initial: QueryResponseInitial<ArticlePayload | null>
  isMember: boolean
}

export default function ArticlePreview(props: Props) {
  const {params, initial} = props
  const {data, encodeDataAttribute} = useQuery<ArticlePayload | null>(articlesBySlugQuery, params, {
    initial,
  })

  return (
    <Article data={data!} encodeDataAttribute={encodeDataAttribute} isMember={props.isMember} />
  )
}
