import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import structure from './src/structure'
import {presentationTool} from 'sanity/presentation'

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID
const DATASET = process.env.SANITY_STUDIO_DATASET
const SITE_ORIGIN = process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL

export default defineConfig({
  name: 'default',
  title: 'Media Starter',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
    media(),
    presentationTool({
      previewUrl: {
        origin: SITE_ORIGIN,
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
