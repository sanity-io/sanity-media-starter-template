import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import structure from './src/structure'
import {presentationTool} from 'sanity/presentation'
import CopyHTMLToClipboard from './src/actions/copyHTMLToClipboard'
import { assist } from '@sanity/assist'
import {scheduledPublishing} from '@sanity/scheduled-publishing'


const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID
const DATASET = process.env.SANITY_STUDIO_DATASET
const SITE_ORIGIN = process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL

if (!PROJECT_ID) {
  throw new Error('Missing env SANITY_STUDIO_PROJECT_ID')
}

if (!DATASET) {
  throw new Error('Missing env SANITY_STUDIO_DATASET')
}

if (!SITE_ORIGIN) {
  throw new Error('Missing env SANITY_STUDIO_SITE_PUBLIC_BASE_URL')
}

export default defineConfig({
  name: 'default',
  title: 'Media Starter',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    deskTool({
      structure,
    }),
    assist(),
    scheduledPublishing(),
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
  document: {
    actions: [CopyHTMLToClipboard],
  },
})
