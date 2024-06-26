import {type Article} from '../blocks/article'
import {Author} from '../blocks/author'
import {Tag} from '../blocks/tag'
import {sanitizeId} from '../utils'
import {createDocument} from '../utils/dom'
import {getArticleJsonLd} from '../utils/jsonld'
import {htmlToBlockContent} from './htmlToBlockContent'
import {AuthorJSONSchema} from './validators'

export const parseArticleContent = async ({
  slug,
  htmlContent,
}: {
  htmlContent: string
  slug: string
}): Promise<Article> => {
  const doc = createDocument(htmlContent)

  const JSONSchema = await getArticleJsonLd(
    doc.querySelector('script[type="application/ld\\+json"]').innerHTML,
  )

  if (!JSONSchema) {
    throw new Error(`No JSON Schema found`)
  }

  const coverImage =
    JSONSchema.image?.url ||
    JSONSchema.primaryImageOfPage?.url ||
    doc.querySelector(process.env.SELECTOR_COVER_IMAGE)?.getAttribute('src')
  const title = JSONSchema.headline ?? doc.querySelector(process.env.SELECTOR_TITLE)?.textContent
  const subHeadline = doc.querySelector(process.env.SELECTOR_SUBTITLE)?.textContent
  const publishDate = JSONSchema?.datePublished

  const rawTags = JSONSchema?.keywords ?? doc.querySelector(process.env.SELECTOR_TAGS)?.content
  const tags: Tag[] =
    typeof rawTags === 'string'
      ? rawTags.split(',').map((tag) => {
        const slugifiedTag = tag.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return {
          _type: 'tag',
          _id: `tag_${sanitizeId(slugifiedTag)}`,
          name: tag.trim(),
          slug: {current: slugifiedTag},
        }
      })
      : []

  const authors: Author[] = []

  const unprocessedAuthors = Array.isArray(JSONSchema.author)
    ? JSONSchema.author
    : JSONSchema.author
      ? [JSONSchema.author]
      : []

  unprocessedAuthors.map((author: unknown) => {
    const data = AuthorJSONSchema.parse(author)
    // Remove leading slash, and make author id kebab case
    const authorID = (data.url ? new URL(data.url).pathname : data.name)
      .replace(/[^a-zA-Z-_0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-/, '')
      .replace('author', '')

    const headshot: string | null =
      data.image ?? doc.querySelector(`${process.env.SELECTOR_AUTHOR} img`)?.getAttribute('src')

    authors.push({
      _id: `author_${authorID}`,
      _type: 'author',
      name: data.name,
      jobTitle: data.jobTitle,
      bio: data.description,
      email: data.email,
      headshot: headshot
        ? {
            _type: 'image',
            _sanityAsset: `image@${headshot}`,
          }
        : null,
      // TODO: Handle extracting these using CSS selectors
      twitter: null,
      linkedin: null,
    })
  })

  const contentHTML = doc.querySelector(process.env.SELECTOR_ARTICLE_CONTENT)?.innerHTML
  const content = htmlToBlockContent(contentHTML)

  return {
    ...{
      _id: `article_${sanitizeId(slug)}`,
      slug: {current: slug},
      _type: 'article',
      headline: title,
      subHeadline,
      publishDate,
      content,
      authors,
      tags,
    },
    ...(coverImage
      ? {
          coverImage: {
            _type: 'image',
            _sanityAsset: `image@${coverImage}`,
          },
        }
      : {}),
  }
}
