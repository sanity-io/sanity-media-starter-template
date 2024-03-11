'use client'

import {useEffect} from 'react'
import {incrementArticleReadCount} from '../../libs/contentGate'
import {ArticlePayload} from '@/sanity/types'

type Props = {
  articleAccessLevel: ArticlePayload['accessLevel']
}

export const IncrementArticleCount = ({articleAccessLevel}: Props) => {
  useEffect(() => {
    if (articleAccessLevel !== 'public') {
      incrementArticleReadCount()
    }
  }, [articleAccessLevel])

  return null
}
