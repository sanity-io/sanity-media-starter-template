import {ArticleDocument} from '../../../schemas/documents/article'
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
    </div>
  )
}
