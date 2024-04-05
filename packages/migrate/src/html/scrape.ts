import {sqliteClient} from '../adapters/sqlite'
import {getArticleLinks, getPageHTML} from '../utils/dom/crawl'
import {parseArticleContent} from './htmlToArticle'
import {ArticleDereferenced, Article} from '../blocks/article'

const adapter = await sqliteClient()

/**
 * Given a site URL, find article links and fetch the HTML for each article.
 * The HTML is cached locally to avoid making multiple requests to the same URL.
 */
const fetchSourceArticles = async () => {
  if (!process.env.SITE_URL) {
    throw new Error('SITE_URL environment variable is required')
  }

  const urls = await getArticleLinks(process.env.SITE_URL)

  console.log(`Found ${urls.length} articles on ${process.env.SITE_URL}`)

  // Limit the number of articles we fetch
  let limit = 100
  console.log(`⚠️ Limiting import to maximum of ${limit} articles`)

  const siteSegment = new URL(process.env.SITE_URL).pathname
  const regex = new RegExp(`^${siteSegment}`)

  for (const url of urls) {
    if (limit-- < 0) {
      break
    }

    // Get slug from URL, drop leading slash
    const resolvedHref = url.startsWith('http') ? new URL(url) : new URL(url, process.env.SITE_URL)
    const resolvedUrl = resolvedHref.origin + resolvedHref.pathname
    const slug = resolvedHref.pathname.replace(regex, '').replace(/^\//, '')

    // If we already have a local cache of the article, don't re-fetch it
    const maybeExistingArticle = await adapter.getSourceArticleById(slug)

    if (maybeExistingArticle && maybeExistingArticle.html) {
      console.log(`⏭️ Skipping existing article: ${resolvedUrl}`)
    } else {
      try {
        const article = await getPageHTML(resolvedUrl)
        await adapter.addSourceArticle({slug, url: resolvedUrl.toString(), html: article})
      } catch {
        await adapter.addSourceArticle({slug, url: resolvedUrl.toString(), html: null})
      }
    }
  }
}

/**
 * Give an article `slug`, parse the HTML and convert into a valid Sanity `article` document.
 * This includes dereferencing the authors, and storing them as separate documents.
 *
 * Note that function does not push changes to the CMS.
 * It saves the JSON representation of the article to the local storage adapter, usually sqlite.
 */
const prepareArticle = async (slug: string) => {
  console.log(`🔬 Validating: ${slug}`)
  const maybeExistingArticle = await adapter.getSourceArticleById(slug)

  if (!maybeExistingArticle?.html) {
    throw new Error(`Article not found: ${slug}`)
  }

  try {
    const content = await parseArticleContent({
      slug,
      htmlContent: maybeExistingArticle.html,
    })

    const article = Article.parse(content)
    await adapter.addArticle(article)
    console.log(`✅ Imported: ${slug}`)
  } catch (error) {
    console.log(`❌ Failed to import: ${slug}`)
    // TODO: add failed import to database
  }
}

const prepareAllArticles = async () => {
  const maybeExistingArticles = await adapter.getSourceArticles()

  if (!maybeExistingArticles) {
    throw new Error(`No articles found`)
  }

  for (const article of maybeExistingArticles) {
    await prepareArticle(article.slug)
  }
}

export const scrape = async () => {
  await fetchSourceArticles()
  await prepareAllArticles()
}

export const write = async () => {
  await adapter.exportData()
}
