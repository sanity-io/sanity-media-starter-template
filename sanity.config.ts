import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'
import structure from './src/structure';

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID
const DATASET = process.env.SANITY_STUDIO_DATASET

export default defineConfig({
  name: 'default',
  title: 'Media Template',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    deskTool({
      structure,
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})
