import {ArticleDocument} from '../../../schemas/documents/article'
import {SEOAudit} from './SEOAudit'
import {LinkValidation} from './ValidateLinks'

export type PreflightProps = {
  documentId: string
  document: {
    displayed: ArticleDocument
  }
}

export const Preflight = (props: PreflightProps) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '24px',
      }}
    >
      <LinkValidation document={props.document.displayed} />

      <hr
        style={{
          margin: '32px 0',
          border: 'none',
          borderBottom: '1px solid var(--card-border-color)',
        }}
      />

      <SEOAudit document={props.document.displayed} />
    </div>
  )
}
