import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import structure, {defaultDocumentNodeResolver} from './src/structure'
import {presentationTool} from 'sanity/presentation'
import CopyHTMLToClipboard from './src/actions/copyHTMLToClipboard'
import {assist} from '@sanity/assist'
import {scheduledPublishing} from '@sanity/scheduled-publishing'
import {dashboardTool, sanityTutorialsWidget} from '@sanity/dashboard'
import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'
import {workflow} from 'sanity-plugin-workflow'

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

// Prevent listing these document types in the "Create" button dropdown in the Studio
const singletonTypes = new Set(['workflow.metadata'])

export default defineConfig({
  name: 'default',
  title: 'Media Starter',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode: defaultDocumentNodeResolver,
    }),
    assist(),
    dashboardTool({
      widgets: [
        documentListWidget({
          title: 'Newly added',
          order: '_createdAt desc',
          types: ['article', 'newsletter'],
          layout: {
            width: 'large',
          },
        }),
        documentListWidget({
          title: 'Latest edits',
          order: '_updatedAt desc',
          types: ['article', 'newsletter'],
          layout: {
            width: 'medium',
          },
        }),
        sanityTutorialsWidget(),
      ],
    }),
    workflow({
      schemaTypes: ['article', 'newsletter'],
      // @see https://github.com/sanity-io/sanity-plugin-workflow
      // states: [],
    }),
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
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: [CopyHTMLToClipboard],
  },
})
