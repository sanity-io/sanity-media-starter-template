/**
 * This is an inlined and slightly modified version of the original
 * plugin [sanity-plugin-document-reference-by](https://github.com/Mr-Afonso/sanity-plugin-document-reference-by).
 *
 * The original plugin is causes the Studio to crash due to document IDs
 * including the `drafts.` prefix.
 * @see https://github.com/sanity-io/sanity/issues/1865
 *
 * This local version removes the prefix before rendering the links.
 *  */

import {WithReferringDocuments} from 'sanity'
import {IntentButton, Preview, useSchema} from 'sanity'

const ReferencedBy = (props: {documentId: string}) => {
  const schema = useSchema()

  return (
    <div>
      <WithReferringDocuments id={props.documentId.replace('drafts.', '')}>
        {({referringDocuments, isLoading}) => {
          if (isLoading) {
            return <div>Looking for referring documents...</div>
          }

          if (!referringDocuments.length) return <div>No documents found</div>

          return (
            <div
              style={{
                padding: '16px 32px',
              }}
            >
              {referringDocuments?.map((document) => {
                const schemaType = schema.get(document._type)

                return (
                  <div key={document._id} style={{padding: '4px 0px'}}>
                    {schemaType ? (
                      <IntentButton intent="edit" params={{id: document._id, type: document._type}}>
                        <Preview value={document} schemaType={schemaType} />
                      </IntentButton>
                    ) : (
                      <div>
                        A document of the unknown type <em>{document._type}</em>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        }}
      </WithReferringDocuments>
    </div>
  )
}

export default ReferencedBy
