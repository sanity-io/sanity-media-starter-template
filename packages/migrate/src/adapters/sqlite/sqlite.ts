import Database from 'bun:sqlite'
import {NdJson} from 'json-nd'
import {Author} from '../../blocks/author'
import {join} from 'node:path'
import {Article, ArticleDereferenced, SourceArticle} from '../../blocks/article'
import {DataAdapter} from '..'
import {article, author} from 'studio/schemas/documents'

export const actions = (db: Database): DataAdapter => {
  const addSourceArticle = db.prepare<void, [string, string, string | null]>(`
    INSERT INTO source_articles (slug, url, html)
    VALUES (?, ?, ?)
    ON CONFLICT (slug) DO UPDATE SET
      url = excluded.url,
      html = excluded.html
  `)

  const getSourceArticles = db.prepare<SourceArticle, []>(`
    SELECT * FROM source_articles WHERE html IS NOT NULL
  `)

  const getSourceArticleById = db.prepare<SourceArticle, SourceArticle['slug']>(`
    SELECT * FROM source_articles WHERE slug = ? AND html IS NOT NULL
  `)

  const addAuthor = db.prepare(`
    INSERT INTO authors (id, name, email, jobTitle, bio, headshot, twitter, linkedin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (id) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      jobTitle = excluded.jobTitle,
      bio = excluded.bio,
      headshot = excluded.headshot,
      twitter = excluded.twitter,
      linkedin = excluded.linkedin
  `)

  const addAuthors = (authors: Author[]) => {
    authors.map((author) => {
      addAuthor.run(
        author._id,
        author.name,
        author.email,
        author.jobTitle,
        author.bio,
        author.headshot,
        author.twitter,
        author.linkedin,
      )
    })
  }

  const addArticleQuery = db.prepare<void, [string, string, string]>(`
    INSERT INTO articles (slug, date, content)
    VALUES (?, ?, ?)
    ON CONFLICT (slug) DO UPDATE SET
      date = excluded.date,
      content = excluded.content
  `)

  const getAuthors = db.prepare<Author & {id: string}, []>(`SELECT * FROM authors`)

  const addArticle = (data: Article) => {
    const {article, authors} = ArticleDereferenced.parse(data)

    addAuthors(authors)

    addArticleQuery.run(article.slug.current, article.publishDate, JSON.stringify(article))
  }

  const getArticles = db.prepare<{content: string}, []>(`SELECT content FROM articles`)

  const exportData = async () => {
    const articles = await getArticles.all().map(({content}) => JSON.parse(content))
    const authors = await getAuthors.all().map(({id, ...author}) => {
      const a = {
        ...author,
        _type: 'author',
        _id: id,
      }

      // Delete null values
      // @ts-expect-error
      Object.keys(a).forEach((key) => a[key] == null && delete a[key])

      return a
    })

    if (!articles) {
      throw new Error(`No articles found`)
    }

    const destination = join(
      import.meta.dir,
      '..',
      '..',
      '..',
      'data',
      `${process.env.PROJECT_NAME}.ndjson`,
    )
    const data = NdJson.stringify([...articles, ...authors])
    Bun.write(destination, data)
    console.log(`💾 Exported content to ${destination}`)
  }

  return {
    addSourceArticle: ({slug, url, html}: SourceArticle) => addSourceArticle.run(slug, url, html),
    getSourceArticles: () => getSourceArticles.all(),
    getSourceArticleById: (slug: string) => getSourceArticleById.get(slug),
    addAuthors,
    getAuthors: () => getAuthors.all(),
    addArticle: (article: Article) => addArticle(article),
    exportData,
  }
}
