'use client'

import {useQuery} from '@/sanity/loader/useQuery'
import {homePageQuery} from '@/sanity/queries'
import {HomePagePayload} from '@/sanity/types'
import {type QueryResponseInitial} from '@sanity/react-loader/rsc'
import {HomePage} from './HomePage'

type Props = {
  params: {slug: string}
  initial: QueryResponseInitial<HomePagePayload | null>
}

export default function HomePagePreview(props: Props) {
  const {params, initial} = props
  const {data, encodeDataAttribute} = useQuery<HomePagePayload | null>(homePageQuery, params, {
    initial,
  })

  return <HomePage data={data!} encodeDataAttribute={encodeDataAttribute} />
}
