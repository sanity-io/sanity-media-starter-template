import Database from 'bun:sqlite'

export const initDb = (db: Database) => {
  // Create source articles table (raw HTML), to avoid re-fetching over the network
  db.run(
    `
    CREATE TABLE IF NOT EXISTS source_articles (
      slug TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      html TEXT
    )
  `,
  )

  // Create articles table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS articles (
      slug TEXT PRIMARY KEY,
      content TEXT NOT NULL,
      date TEXT NOT NULL
    )
  `,
  )

  // Create article authors table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS article_authors (
      articleId TEXT NOT NULL,
      authorId TEXT NOT NULL  
    )
  `,
  )

  // Create authors table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS authors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      jobTitle TEXT,
      bio TEXT,
      headshot TEXT,
      twitter TEXT,
      linkedin TEXT
    )
  `,
  )

  db.run(
    `
    CREATE UNIQUE INDEX IF NOT EXISTS article_authors_articleId_authorId ON article_authors (articleId, authorId)
  `,
  )
}
