import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import structure, {defaultDocumentNodeResolver} from './src/structure'
import {presentationTool} from 'sanity/presentation'
import CopyHTMLToClipboard from './src/actions/copyHTMLToClipboard'
import {assist} from '@sanity/assist'
import {scheduledPublishing} from '@sanity/scheduled-publishing'
import {dashboardTool, sanityTutorialsWidget} from '@sanity/dashboard'
import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'
import {workflow} from 'sanity-plugin-workflow'
import DownloadAppleNewsJSON from './src/actions/appleNews/downloadAppleNewsJSON'
import {secretsToolbar} from './src/plugins/Secrets/SecretsPlugin'

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
      title: 'Content',
      structure,
      defaultDocumentNode: defaultDocumentNodeResolver,
    }),
    presentationTool({
      title: 'Preview',
      previewUrl: {
        origin: SITE_ORIGIN,
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    workflow({
      schemaTypes: ['article', 'newsletter'],
      // @see https://github.com/sanity-io/sanity-plugin-workflow
      // states: [],
    }),
    scheduledPublishing(),
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
    visionTool(),
    media(),
    secretsToolbar(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: [CopyHTMLToClipboard, DownloadAppleNewsJSON],
  },
  form: {
    // Don't use Media plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: (previousAssetSources) =>
        previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource),
    },
    image: {
      assetSources: (previousAssetSources) =>
        previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource),
    },
  },
})
