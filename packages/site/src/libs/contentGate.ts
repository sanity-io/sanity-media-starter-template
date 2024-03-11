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
import { isSubscribed } from './auth'

/**
 * The maximum number of articles a user can read before being prompted to sign up
 */
const ARTICLE_READ_COUNT_LIMIT = 3

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

export const incrementArticleReadCount = async () => {
  const currentCount = cookies().get('articleReadCount')?.value ?? '0'

  cookies().set('articleReadCount', `${Number.parseInt(currentCount, 10) + 1}`)
}
