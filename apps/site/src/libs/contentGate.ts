'use server'

/**
 * !!! DO NOT USE THIS IN PRODUCTION !!!
 * This is purely for demonstration purposes.
 *
 * For ease of deployment, we are using in-browser local storage and simple cookies
 * to manage the user's session and other data.
 */

import {ArticlePayload} from '@/sanity/types'
import {cookies} from 'next/headers'
import {isSubscribed} from './auth'

/**
 * The maximum number of articles a user can read before being prompted to sign up
 * We double this in development as React Hooks run twice in development mode.
 */
const ARTICLE_READ_COUNT_LIMIT = process.env.NODE_ENV === 'development' ? 6 : 3

/**
 * Get the number of articles the user has read
 */
export const getArticleReadCount = async () => {
  return parseInt(cookies().get('articleReadCount')?.value ?? '0', 10)
}

/**
 * Check if the user can read the full article.
 * An article can be read if one of the following is true:
 * - The article access is set to public
 * - The user is subscribed
 * - The user has not read more than the limit of free articles, and the article is not premium
 */
export const canReadArticle = async (articleAccessLevel: ArticlePayload['accessLevel']) => {
  return (
    articleAccessLevel === 'public' ||
    (await isSubscribed()) ||
    (articleAccessLevel !== 'premium' && (await getArticleReadCount()) < ARTICLE_READ_COUNT_LIMIT)
  )
}

export const resetArticleReadCount = async () => {
  cookies().set('articleReadCount', '0')
}

export const trackArticleRead = async ({
  accessLevel,
  tags,
}: {
  accessLevel: ArticlePayload['accessLevel']
  tags: ArticlePayload['tags']
}) => {
  const c = cookies()

  // Increment the article read count
  if (accessLevel === 'auto') {
    const currentCount = c.get('articleReadCount')?.value ?? '0'
    c.set('articleReadCount', `${Number.parseInt(currentCount, 10) + 1}`)
  }

  // Track the tags of the articles the user has read
  const readTags = JSON.parse(c.get('readTags')?.value ?? '{}')

  tags?.map(({_id, name}) => {
    if (readTags[name]) {
      readTags[name]++
    } else {
      readTags[name] = 1
    }
  })
  c.set('readTags', JSON.stringify(readTags))
}

export const getReadingStats = async (): Promise<Record<string, number>> => {
  const c = cookies()
  return JSON.parse(c.get('readTags')?.value ?? '{}')
}

export const clearStats = async () => {
  const c = cookies()
  c.set('articleReadCount', '0')
  c.set('readTags', '{}')
}
