import {EditIcon, EyeOpenIcon, LinkIcon} from '@sanity/icons'
import {IoNewspaperOutline} from 'react-icons/io5'
import {StructureBuilder} from 'sanity/structure'
import EmailPreview from '../previews/emailPreview'

import {SocialPreview, toPlainText} from 'sanity-plugin-social-preview'
import ReferencedBy from '../plugins/backlings'

/**
 * A default document node resolver that adds a "Referenced by" tab to all documents.
 * This tab shows all documents that reference the current document, e.g.
 * when viewing an author, it will show all articles written by that author.
 */
export const defaultDocumentNodeResolver = (S: StructureBuilder) =>
  S.document().views([
    S.view.form(),
    S.view.component(ReferencedBy).title('Referenced by').icon(LinkIcon),
  ])

const excludedSchemaTypes = ['media.tag', 'newsletter', 'article', 'workflow.metadata']

/**
 * An invalid document ID guaranteed to not exist in the dataset
 * Used as fallback when filtering document types in list items, in case
 * `listItem.getId()` returns `undefined` for some reason.
 */
const AbsurdDocument = Symbol('NEVER_MATCHED').toString()

const structure = (S: StructureBuilder) => {
  const allDocuments = S.documentTypeListItems().filter(
    (listItem) => !excludedSchemaTypes.includes(listItem.getId() ?? AbsurdDocument),
  )

  return S.list()
    .title('Home')
    .items([
      S.listItem()
        .title('Articles')
        .icon(IoNewspaperOutline)
        .child(
          S.documentTypeList('article')
            .title('All Artlcles')
            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
            .menuItems([
              // @ts-ignore
              ...S.documentTypeList('article').getMenuItems(),
              S.orderingMenuItem({
                name: 'publishDate',
                title: 'Publish Date',
                by: [{field: 'publishDate', direction: 'desc'}],
              }),
            ])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('article')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view
                    .component(
                      SocialPreview({
                        prepareData: ({headline, content, coverImage, seo, slug, og}) => {
                          const title = og?.title ?? headline
                          const image = og?.image?.asset?._ref ?? coverImage?.asset?._ref
                          const description = og?.description ?? toPlainText(content || [])

                          const url = new URL(
                            '/api/og',
                            process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL,
                          )

                          if (title) {
                            url.searchParams.append('title', title)
                          }

                          if (image) {
                            url.searchParams.append('image', image)
                          }

                          const ogImgSrc = url.toString()

                          return {
                            title,
                            description: description.slice(0, 200),
                            url: `${process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL}/${slug.current}`,
                            image: ogImgSrc,
                          }
                        },
                      }),
                    )
                    .title('Social Preview')
                    .icon(EyeOpenIcon),
                  S.view.component(ReferencedBy).title('Referenced by').icon(LinkIcon),
                ]),
            ),
        ),
      ...allDocuments,
      S.listItem()
        .title('Newsletters')
        .icon(IoNewspaperOutline)
        .child(
          S.documentTypeList('newsletter')
            .title('All Newsletters')
            .defaultOrdering([{field: 'publishDate', direction: 'desc'}])
            .menuItems([
              // @ts-ignore
              ...S.documentTypeList('newsletter').getMenuItems(),
              S.orderingMenuItem({
                name: 'publishDate',
                title: 'Publish Date',
                by: [{field: 'publishDate', direction: 'desc'}],
              }),
            ])
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('newsletter')
                .views([
                  S.view.form().icon(EditIcon),
                  S.view.component(EmailPreview).title('Preview').icon(EyeOpenIcon),
                ]),
            ),
        ),
    ])
}

export default structure
