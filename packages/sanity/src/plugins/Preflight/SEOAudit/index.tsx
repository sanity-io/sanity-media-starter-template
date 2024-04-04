import {RefreshIcon} from '@sanity/icons'
import {Card, Text} from '@sanity/ui'
import {useCallback, useEffect, useState} from 'react'
import {ArticleDocument} from '../../../../schemas/documents/article'
import {useSanitySecrets} from '../../Secrets/SecretInput'
import {PreflightSectionHeading} from '../PreflightSectionHeading'
import {CheckResultCard} from './CheckResultCard'
import {seoChecks} from './checks'
import {getPageLiveResult} from './seoClient'
import {SEOChecks} from './seoTypes'

type Props = {
  document: ArticleDocument
}

export const SEOAudit = (props: Props) => {
  const {secrets} = useSanitySecrets()
  const apiKey = secrets?.DATA_FOR_SEO_API_KEY

  const baseUrl = process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL
  const isLocalhost = baseUrl?.includes('localhost') || baseUrl?.includes('127.0.0')
  const isDraft = props.document._id.startsWith('drafts.')

  const [results, setResults] = useState<SEOChecks>()
  const [isLoading, setIsLoading] = useState(false)

  const getPageAudit = useCallback(async () => {
    if (isLoading || !apiKey) {
      return
    }

    setIsLoading(true)

    try {
      const results = await getPageLiveResult(apiKey)(
        baseUrl + props.document.slug.current,
        isDraft,
      )
      const result = results?.tasks?.[0]?.result?.[0]?.items?.[0]?.checks

      if (result) {
        setResults(result)
      }
    } catch (error) {
      console.error('Failed to get page audit', error)
    }

    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.document.slug, apiKey])

  useEffect(() => {
    getPageAudit()
  }, [getPageAudit, baseUrl])

  const resultsArray = Object.entries(results ?? {})
  const totalCheckCount = resultsArray.length
  const successfulChecks = resultsArray.filter(
    ([check, result]) =>
      check in seoChecks && result === seoChecks[check as keyof SEOChecks].expected,
  ).length

  return (
    <>
      <PreflightSectionHeading
        title="SEO Audit"
        badge={`${successfulChecks}/${totalCheckCount} checks passed`}
        action={{
          onClick: getPageAudit,
          title: 'Run audit',
          icon: <RefreshIcon />,
        }}
      />

      {isLocalhost && (
        <Card padding={3} radius={2} shadow={1} tone="caution" marginTop={4} marginBottom={4}>
          <Text align="center" size={2}>
            SEO audit uses mock data on localhost. Run the audit on a deployed Sanity Studio site to
            see actual results.
          </Text>
        </Card>
      )}

      {!apiKey ? (
        <Card padding={3} radius={2} shadow={1} tone="critical" marginTop={4} marginBottom={4}>
          <Text align="center" size={2}>
            DataForSEO API key is missing. Please ask an administrator to add it in the Secrets tab.
          </Text>
        </Card>
      ) : !results || isLoading ? (
        <p>Running checks...</p>
      ) : (
        <>
          <div
            style={{
              margin: '24px 0',
              width: '100%',
              gap: '16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            }}
          >
            {resultsArray.map(([key, result]) => (
              <CheckResultCard key={key} checkName={key} result={result} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
