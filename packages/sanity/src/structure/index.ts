import {StructureBuilder} from 'sanity/desk'
import EmailPreview from '../previews/emailPreview'
import {IoNewspaperOutline} from 'react-icons/io5'
import {EditIcon, EyeOpenIcon} from '@sanity/icons'
import OpenGraphPreview from '../previews/openGraphPreview'

const excludedSchemaTypes = ['media.tag', 'newsletter', 'article']

/* An invalid document ID guaranteed to not exist in the dataset
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
                  S.view.component(OpenGraphPreview).title('Open Graph Preview').icon(EyeOpenIcon),
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
