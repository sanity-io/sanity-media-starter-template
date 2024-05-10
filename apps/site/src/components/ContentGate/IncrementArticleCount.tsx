'use client'

import {useEffect} from 'react'
import {trackArticleRead} from '../../libs/contentGate'
import {ArticlePayload} from '@/sanity/types'

type Props = {
  accessLevel: ArticlePayload['accessLevel']
  tags: ArticlePayload['tags']
}

export const TrackArticleRead = ({accessLevel, tags = []}: Props) => {
  useEffect(() => {
    trackArticleRead({
      accessLevel,
      tags,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
