/**
 * Automatically re-index a page in search engines
 * when the content is updated in Sanity.
 *
 * When publishing articles, automatically notify search engines to crawl the
 * changed pages, reducing delay in articles appearing in search results. This
 * uses the IndexNow (https://www.indexnow.org/index) search syndication
 * protocol.
 * 
 */
import {parseBody} from 'next-sanity/webhook'
import {SITE_IS_INDEXABLE, getSiteUrl} from '@/libs/siteConfig'
import {NextRequest, NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'

const INDEX_NOW_KEY = '5f3355c87da341eeb9be68ac5db80190'

type WebhookPayload = {
  _type: string
  slug?: {
    current?: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const {isValidSignature, body} = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({message, isValidSignature, body}), {status: 401})
    }

    if (!body?._type || !body?.slug?.current) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({message, body}), {status: 400})
    }

    const staleRoute = `/${body.slug.current}`

    // Rebuild Next.js page
    revalidatePath(staleRoute)

    // Notify IndexNow of the updated page
    if (SITE_IS_INDEXABLE) {
      fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host: getSiteUrl(),
          key: INDEX_NOW_KEY,
          keyLocation: `${getSiteUrl()}/${INDEX_NOW_KEY}.txt`,
          urlList: [staleRoute],
        }),
      })
    }

    const message = `Requesting re-index of: ${staleRoute}`

    return NextResponse.json({body, message})
  } catch (err: unknown) {
    console.error(err)
    return new Response(err instanceof Error ? err.message : 'Something went wrong', {status: 500})
  }
}
