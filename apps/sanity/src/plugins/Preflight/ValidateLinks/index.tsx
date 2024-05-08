import {useState} from 'react'
import {PreflightSectionHeading} from '../PreflightSectionHeading'

import {
  CheckmarkCircleIcon,
  CloseCircleIcon,
  EllipsisHorizontalIcon,
  RefreshIcon,
  TransferIcon,
} from '@sanity/icons'
import {ArticleDocument} from '../../../../schemas/documents/article'
import {getStyleByStatus} from '../../../utils/getStyleByStatus'
import {getDocumentLinks} from './getDocumentLinks'
import {validateLink} from './validateLink'

type Props = {
  document: ArticleDocument
}

type LinkStatus = 'initial' | 'checking' | 'success' | 'error'
export type LinkCheckResult = {
  status: LinkStatus
  message?: string
}
export type LinkResults = Record<string, LinkCheckResult>

const StatusIcon = ({status}: {status: LinkStatus}) => {
  switch (status) {
    case 'initial':
      return <EllipsisHorizontalIcon height={16} width={16} />
    case 'checking':
      return <TransferIcon height={16} width={16} />
    case 'success':
      return <CheckmarkCircleIcon height={16} width={16} />
    case 'error':
      return <CloseCircleIcon height={16} width={16} />
  }
}

export const LinkValidation = (props: Props) => {
  const [linkResults, setLinkResults] = useState<LinkResults>(getDocumentLinks(props.document))

  const resultsArray = Object.entries(linkResults)
  const isInitial = resultsArray.every(([, status]) => status.status === 'initial')
  const successCount = resultsArray.filter(([, status]) => status.status === 'success').length

  const checkAllLinks = async () => {
    const linkEntries = Object.entries(linkResults)

    for (const [link, check] of linkEntries) {
      if (check.status !== 'checking') {
        setLinkResults((prev) => ({...prev, [link]: {status: 'checking'}}))
        const result = await validateLink(link)
        setLinkResults((prev) => ({...prev, [link]: result}))
      }
    }
  }

  return (
    <div>
      <PreflightSectionHeading
        title="Links"
        badge={
          isInitial
            ? `Found ${resultsArray.length} link(s)`
            : `${successCount}/${resultsArray.length} links are valid`
        }
        action={{
          onClick: checkAllLinks,
          title: 'Check all links',
          icon: <RefreshIcon />,
        }}
      />

      <p
        style={{
          color: 'var(--card-default-fg-color)',
          fontSize: '14px',
        }}
      >
        Check the status of all links in the document, ensuring that they are reachable.
      </p>

      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {resultsArray.map(([link, {status, message}]) => (
          <li
            key={link}
            style={{
              fontFamily: 'monospace',
              marginBlock: 8,
            }}
          >
            <div
              style={{
                borderRadius: '4px',
                display: 'inline-flex',
                gap: 8,
                flexDirection: 'row',
                lineHeight: 1.15,
                padding: '4px 8px',
                borderBottom: '1px solid var(--card-border-color)',
                color: getStyleByStatus(status)({
                  default: 'var(--card-badge-default-fg-color)',
                  success: 'var(--card-badge-positive-fg-color)',
                  error: 'var(--card-badge-critical-fg-color)',
                  warning: 'var(--card-badge-warning-bg-color)',
                }),
                backgroundColor: getStyleByStatus(status)({
                  default: 'var(--card-badge-default-bg-color)',
                  success: 'var(--card-badge-positive-bg-color)',
                  error: 'var(--card-badge-critical-bg-color)',
                }),
              }}
            >
              <span>
                <StatusIcon status={status} />
              </span>

              <div
                style={{
                  display: 'inline-flex',
                  gap: 4,
                  flexDirection: 'column',
                }}
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {link}
                </a>

                {status !== 'success' && message && (
                  <p style={{display: 'inline-block', margin: 0}}>{message}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
