import { StructureBuilder } from 'sanity/desk';
import Email from '../previews/NewsletterPreview';
import { IoNewspaperOutline } from 'react-icons/io5'
import { EditIcon, EyeOpenIcon } from '@sanity/icons'

const excludedSchemaTypes = ['media.tag', 'newsletter'];

const structure = (S: StructureBuilder) =>
  S.list()
    .title('Home')
    .items([
      ...S.documentTypeListItems().filter(listItem => !excludedSchemaTypes.includes(listItem.getId())),
      S.listItem()
        .title('Newsletters')
        .icon(IoNewspaperOutline)
        .child(
          S.documentTypeList('newsletter')
            .title('All Newsletters')
            .defaultOrdering([{ field: 'publishDate', direction: 'desc' }])
            .menuItems([
              // @ts-ignore
              ...S.documentTypeList('newsletter').getMenuItems(),
              S.orderingMenuItem({
                name: 'publishDate',
                title: 'Publish Date',
                by: [{ field: 'publishDate', direction: 'desc' }],
              }),
            ])
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('newsletter')
                .views([
                  S.view.form()
                    .icon(EditIcon),
                  S.view.component(Email)
                    .title('Preview')
                    .icon(EyeOpenIcon)
                ])
            )
        ),
    ]);

export default structure;
