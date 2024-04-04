import {definePlugin} from 'sanity'
import {SecretsToolbar} from './SecretsToolbar'

export const secretsToolbar = definePlugin({
  name: 'secrets-toolbar',
  studio: {
    components: {
      toolMenu: SecretsToolbar,
    },
  },
})
