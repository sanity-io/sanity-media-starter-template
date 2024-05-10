import {Button} from '@sanity/ui'
import {useCallback, useEffect, useState} from 'react'
import {ToolMenuProps, useCurrentUser} from 'sanity'
import {SecretInput} from './SecretInput'

/**
 * The Sanity user roles that have access to the secrets toolbar.
 */
const fullEditorRoles = new Set(['administrator'])

export const SecretsToolbar = (props: ToolMenuProps) => {
  const user = useCurrentUser()
  const [isAuthorized, setAuthorized] = useState(false)
  const [isSecretsOpen, setSecretsOpen] = useState(false)

  const closeSecrets = useCallback(() => {
    setSecretsOpen(false)
  }, [])

  const openSecrets = useCallback(() => {
    setSecretsOpen(true)
  }, [])

  useEffect(() => {
    if (user) {
      setAuthorized(user.roles.some((role) => fullEditorRoles.has(role.name)))
    }
  }, [user])

  return (
    <>
      {props.renderDefault(props)}
      {isAuthorized && (
        <>
          <Button
            name="Secrets"
            text="Secrets"
            selected={isSecretsOpen}
            fontSize={1}
            padding={2}
            onClick={openSecrets}
            type="button"
            style={{cursor: 'pointer'}}
            mode={isSecretsOpen ? 'ghost' : 'bleed'}
          />
        </>
      )}

      {isAuthorized && isSecretsOpen && (
        <SecretInput isSidebarOpen={isSecretsOpen} closeSidebar={closeSecrets} />
      )}
    </>
  )
}
