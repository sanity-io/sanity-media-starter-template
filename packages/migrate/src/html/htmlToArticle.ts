import {type Article} from '../blocks/article'
import {Author} from '../blocks/author'
import {createDocument} from '../utils/dom'
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

  const JSONSchema =
    JSON.parse(doc.querySelector('script[type="application/ld\\+json"]').innerHTML) ?? {}

  if (!JSONSchema) {
    throw new Error(`No JSON Schema found`)
  }

  const coverImage = JSONSchema.image?.url
  const title = JSONSchema.headline
  const subHeadline = doc.querySelector(process.env.SELECTOR_SUBTITLE)?.textContent ?? ''
  const publishDate = JSONSchema?.datePublished

  const authors: Author[] = []

  JSONSchema.author.map((author: unknown) => {
    const data = AuthorJSONSchema.parse(author)
    // Remove leading slash, and make author id kebab case
    const authorID = (data.url ? new URL(data.url).pathname : data.name)
      .replace(/[^a-zA-Z-_0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-/, '')
      .replace('author', '')

    authors.push({
      _id: `author_${authorID}`,
      _type: 'author',
      name: data.name,
      jobTitle: data.jobTitle,
      bio: data.description,
      email: data.email,
      // TODO: Handle extracting these using CSS selectors
      headshot: null,
      twitter: null,
      linkedin: null,
    })
  })

  const contentHTML = doc.querySelector(process.env.SELECTOR_ARTICLE_CONTENT)?.innerHTML
  const content = htmlToBlockContent(contentHTML)

  return {
    ...{
      _id: `article_${slug.replace(/[^a-zA-Z-_0-9]/g, '-')}`,
      slug: {current: slug},
      _type: 'article',
      headline: title,
      subHeadline,
      publishDate,
      content,
      authors,
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
