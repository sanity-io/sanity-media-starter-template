import 'server-only'

import {draftMode} from 'next/headers'

import {client} from '@/sanity/lib/client'
import {
  articlesBySlugQuery, 
  homePageQuery,
  topTagsQuery,
  privacyPolicyQuery,
  termsAndConditionsQuery
} from '@/sanity/queries'
import {token} from '@/sanity/lib/token'
import {
  ArticlePayload, 
  HomePagePayload, 
  TopTagsPayload,
  PrivacyPolicyPayload,
  TermsAndConditionsPayload
} from '@/sanity/types'

import {queryStore} from './createQueryStore'

const serverClient = client.withConfig({
  token,
  stega: {
    // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
    // See https://vercel.com/docs/workflow-collaboration/visual-editing/cms-guide
    enabled: process.env.VERCEL_ENV === 'preview',
  },
})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn

// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {perspective = draftMode().isEnabled ? 'previewDrafts' : 'published'} = options
  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false
  } else if (usingCdn) {
    revalidate = 60
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadHomePage() {
  return loadQuery<HomePagePayload | null>(homePageQuery, {}, {next: {tags: ['home', 'article']}})
}

export function loadArticle(slug: string) {
  return loadQuery<ArticlePayload | null>(
    articlesBySlugQuery,
    {slug},
    {next: {tags: [`article:${slug}`]}},
  )
}

export function loadTopTags() {
  return loadQuery<TopTagsPayload | null>(topTagsQuery, {}, {next: {tags: ['home', 'tags']}})
}

export function loadPrivacyPolicy() {
  return loadQuery<PrivacyPolicyPayload | null>(privacyPolicyQuery, {}, {next: {tags: ['web.privacyPolicy']}})
}

export function loadTermsAndConditions() {
  return loadQuery<TermsAndConditionsPayload | null>(termsAndConditionsQuery, {}, {next: {tags: ['web.termsAndConditions']}})
}
