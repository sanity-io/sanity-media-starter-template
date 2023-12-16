import {Article, ArticleDereferenced, SourceArticle} from '../blocks/article'
import {Author} from '../blocks/author'

export type DataAdapter = {
  addSourceArticle: (payload: {slug: string; url: string; html: string | null}) => void
  getSourceArticles: () => SourceArticle[]
  getSourceArticleById: (slug: string) => SourceArticle | null
  addAuthors: (authors: Author[]) => void
  getAuthors: () => Author[]
  addArticle: (article: Article) => void
  exportData: () => Promise<void>
}
