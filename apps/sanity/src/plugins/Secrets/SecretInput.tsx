import {useSecrets, SettingsView} from '@sanity/studio-secrets'

const secretConfigs = [
  {
    key: 'DATA_FOR_SEO_API_KEY',
    title: 'DataForSEO API Key',
    description:
      'Base64 encoded API key for DataForSEO. It should contain both the email and password separated by a colon. See https://docs.dataforseo.com/v3/auth/ for more information.',
  },
]
type SanitySecret = (typeof secretConfigs)[number]['key']

const secretsNamespace = 'SANITY_SECRETS'

export const useSanitySecrets = () =>
  useSecrets<Record<SanitySecret, string | undefined>>(secretsNamespace)

export const SecretInput = ({
  isSidebarOpen,
  closeSidebar,
}: {
  isSidebarOpen: boolean
  closeSidebar: () => void
}) => {
  if (!isSidebarOpen) {
    return null
  }

  return (
    <SettingsView
      title={'Secret Settings'}
      namespace={secretsNamespace}
      keys={secretConfigs}
      onClose={closeSidebar}
    />
  )
}
