import Database from 'bun:sqlite'
import {NdJson} from 'json-nd'
import {Author} from '../../blocks/author'
import {join} from 'node:path'
import {Article, ArticleDereferenced, SourceArticle} from '../../blocks/article'
import {DataAdapter} from '..'
import {compact} from '@thalesrc/js-utils/object'
import {Tag} from '../../blocks/tag'

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
        author.headshot ? JSON.stringify(author.headshot) : null,
        author.twitter,
        author.linkedin,
      )
    })
  }

  const addTag = db.prepare(`
    INSERT INTO tags (id, name)
    VALUES (?, ?)
    ON CONFLICT (id) DO UPDATE SET
      name = excluded.name
  `)

  const addTags = (tags: Tag[]) => {
    tags.map((tag) => {
      addTag.run(tag._id, tag.name)
    })
  }

  const getTags = db.prepare<Tag & {id: string}, []>(`SELECT * FROM tags`)

  const addArticleQuery = db.prepare<void, [string, string, string]>(`
    INSERT INTO articles (slug, date, content)
    VALUES (?, ?, ?)
    ON CONFLICT (slug) DO UPDATE SET
      date = excluded.date,
      content = excluded.content
  `)

  const getAuthors = db.prepare<Author & {id: string; headshot: string}, []>(
    `SELECT * FROM authors`
  )

  const addArticle = (data: Article) => {
    const {article, authors, tags} = ArticleDereferenced.parse(data)

    addAuthors(authors)
    addTags(tags)

    addArticleQuery.run(article.slug.current, article.publishDate, JSON.stringify(article))
  }

  const getArticles = db.prepare<{content: string}, []>(`SELECT content FROM articles`)

  const exportData = async () => {
    const articles = await getArticles.all().map(({content}) => JSON.parse(content))
    const tags = await getTags.all().map((tag) => ({
      _type: 'tag',
      _id: tag.id,
      name: tag.name,
    }))
    const authors = await getAuthors.all().map(({id, ...author}) => {
      // Delete null-ish values
      return compact({
        ...author,
        headshot: author.headshot ? JSON.parse(author.headshot) : null,
        _type: 'author',
        _id: id,
      })
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
    const data = NdJson.stringify([...articles, ...tags, ...authors])
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
