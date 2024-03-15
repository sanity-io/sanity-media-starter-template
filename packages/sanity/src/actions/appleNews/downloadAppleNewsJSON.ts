import {
  DocumentActionComponent,
  DocumentActionProps,
  Image,
  PortableTextBlock,
  SanityDocument,
} from 'sanity'

import {BinaryDocumentIcon} from '@sanity/icons'
import {useToast} from '@sanity/ui'
import {toPlainText} from 'sanity-plugin-social-preview'
import {article} from '../../../schemas/documents'
import {imgBuilder} from '../../imageBuilder'
import {makeAppleNewsArticle} from './makeAppleNewsArticle'
import {getArticleContent} from '../../queries'
import {sanityClient} from '../../sanityClient'
import {portableTextToAppleHtml} from './portableTextToAppleHtml'

type ArticleDocument = {
  headline: string
  subHeadline?: string
  authors: Array<{
    name: string
    twitter: string
  }>
  coverImage: Image
  content: Array<{
    _type: string
    _key: string
    title?: string
    image?: Image
    imageLink?: string
    content?: PortableTextBlock[]
  }>
}

/**
 * A document action component that allows downloading an article as Apple News JSON.
 */
const DownloadAppleNewsJSON: DocumentActionComponent = (props: DocumentActionProps) => {
  const {type, draft, published} = props
  const toast = useToast()
  if (!type.includes(article.name)) return null

  /**
   * Handles the download of the article as Apple News JSON.
   */
  const handler = async () => {
    try {
      const document: SanityDocument | null = draft || published

      if (document) {
        const doc: ArticleDocument = await sanityClient.fetch(getArticleContent(document._id))

        const article = makeAppleNewsArticle({
          author: {name: doc.authors[0].name},
          byline:
            doc.authors.length > 1
              ? doc.authors.slice(1).map((author) => ({name: author.name}))
              : undefined,
          title: doc.headline,
          coverImage: imgBuilder.image(doc.coverImage).url(),
          subtitle: doc.subHeadline || '',
          body: portableTextToAppleHtml(doc.content || []),
        })

        try {
          const blob = new Blob([JSON.stringify(article)], {type: 'application/json'})
          const url = URL.createObjectURL(blob)
          const a = window.document.createElement('a')
          a.href = url
          a.download = 'article.json'
          a.click()
        } catch (error) {
          let errorMessage = 'An unknown error occurred'
          if (error instanceof Error) {
            errorMessage = error.message
          }

          toast.push({
            title: 'Something went wrong. See console for details.',
            description: errorMessage,
            status: 'error',
          })
        }
      }
    } catch (error) {
      console.error('Error fetching and converting article:', error)
    }
  }

  return {
    label: 'Download Apple News JSON',
    icon: BinaryDocumentIcon,
    onHandle: handler,
  }
}

export default DownloadAppleNewsJSON
