import {z} from 'zod'
import {Author, AuthorRef, authorToRef} from './author'
import {ImageRef} from './imageRef'
import {OpenGraphProps} from './openGraphProperties'
import {BlockEditorContent} from './blockEditor'

/**
 * Full validation schema for a Sanity `article` document.
 */
export const Article = z.object({
  // This should be a stable and predictable ID that can be used to reference this author
  _id: z.string(),
  _type: z.literal('article'),
  headline: z.string().min(1),
  subHeadline: z.string().min(1).optional(),
  quip: z.string().min(1).optional(),
  coverImage: ImageRef.optional(),
  slug: z.object({
    current: z.string().min(1).trim(),
  }),
  publishDate: z.string().datetime(),
  content: z.array(BlockEditorContent),
  tags: z.array(z.string()).optional(),
  authors: z.array(Author).min(1),
  og: OpenGraphProps.optional(),
})

export type Article = z.infer<typeof Article>

/**
 * This validator takes an Article and dereferences the authors.
 * This allows us to store the authors as separate documents in Sanity, and reference them by ID
 * from the article.
 */
export const ArticleDereferenced = Article.transform((article) => {
  const authorRefs: AuthorRef[] = article.authors.map(authorToRef)

  return {
    article: {
      ...article,
      authors: authorRefs,
    },
    authors: article.authors,
  }
})

export type ArticleDereferenced = z.infer<typeof ArticleDereferenced>

/**
 * A source article is the raw HTML scraped from the target website.
 * This is stored in the local database, and used to avoid re-scraping the same article.
 */
export const SourceArticle = z.object({
  slug: z.string().min(1).trim(),
  url: z.string().url(),
  html: z.string().nullable(),
})
export type SourceArticle = z.infer<typeof SourceArticle>
