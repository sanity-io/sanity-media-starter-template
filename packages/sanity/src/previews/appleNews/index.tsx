/* eslint-disable react/prop-types */
import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { DownloadIcon } from '@sanity/icons'
import { Button, Card } from '@sanity/ui'
import { useEffect, useState } from 'react'
import type { Image } from 'sanity'
import { SanityDocument } from 'sanity'
import { UserViewComponent } from 'sanity/structure'
import { imgBuilder } from '../../imageBuilder'
import { getEmailContent } from '../../queries'
import { sanityClient } from '../../sanityClient'
import { makeArticle } from './makeAppleNewsArticle'

export type ArticleDocument = {
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

const fetchContent = async (document: SanityDocument & {_id: string}): Promise<ArticleDocument> => {
  return sanityClient
    .config({
      perspective: 'previewDrafts',
    })
    .fetch(getEmailContent(document._id.replace('drafts.', '')))
}

const documentIdGuard = (
  document: Partial<SanityDocument>,
): document is SanityDocument & {_id: string} => {
  return '_id' in document
}

const AppleNewsPreview: UserViewComponent = ({document}) => {
  const {displayed} = document
  const [articleContent, setNewsletterContent] = useState<ArticleDocument | null>()

  useEffect(() => {
    if (documentIdGuard(displayed)) {
      fetchContent(displayed).then((result) => {
        setNewsletterContent(result)
      })
    }
  }, [displayed, document])

  // TODO: Based on Newsletter preview. Update both to show loading/empty states.
  if (!displayed._id || !articleContent) {
    return <Card></Card>
  }

  const article = makeArticle({
    author: {name: articleContent.authors[0].name},
    byline:
      articleContent.authors.length > 1
        ? articleContent.authors.slice(1).map((author) => ({name: author.name}))
        : undefined,
    title: articleContent.headline,
    coverImage: imgBuilder.image(articleContent.coverImage).url(),
    subtitle: articleContent.subHeadline || '',
    body: toPlainText(articleContent.content || []),
  })

  return (
    <Card>
      <pre
        style={{
          overflow: 'auto',
          padding: '1rem',
        }}
      >
        <code>{JSON.stringify(article, null, 2)}</code>
      </pre>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'sticky',
          bottom: '0',
          padding: '.5rem',
          borderTop: '1px solid #ccc',
          backgroundColor: '#fff',
          zIndex: 10,
          cursor: 'pointer',
        }}
      >
        <Button
          icon={DownloadIcon}
          tone="primary"
          onClick={(e) => {
            e.preventDefault()
            const blob = new Blob([JSON.stringify(article)], {type: 'application/json'})
            const url = URL.createObjectURL(blob)
            const a = window.document.createElement('a')
            a.href = url
            a.download = 'article.json'
            a.click()
          }}
          text="Download JSON"
        />
      </div>
    </Card>
  )
}

export default AppleNewsPreview
