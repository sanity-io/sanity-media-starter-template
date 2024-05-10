import {nestLists} from '@portabletext/toolkit'
import {isPortableTextTextBlock} from 'sanity'
import {ArticleDocument} from '../../../../schemas/documents/article'
import {isPortableTextLink} from '../../../utils/guards'
import {LinkResults} from '.'

/**
 * Retrieves all the links from a given Sanity Article document.
 */
export const getDocumentLinks = (doc: ArticleDocument): LinkResults => {
  const documentLinks = nestLists(doc.content, 'direct')

  return documentLinks.reduce((links: LinkResults, block) => {
    const markDefs = isPortableTextTextBlock(block) && block.markDefs ? block.markDefs : undefined

    if (markDefs) {
      const markLinks = markDefs?.reduce((marks, mark) => {
        const isMarkLink = isPortableTextLink(mark)
        const isDuplicate = isMarkLink && links[mark.href]

        if (isMarkLink && !isDuplicate) {
          return {...marks, [mark.href]: {status: 'initial'}}
        }

        return marks
      }, {})

      return {
        ...links,
        ...markLinks,
      }
    }
    return links
  }, {})
}
