import { defineCliConfig } from 'sanity/cli'

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID
const DATASET = process.env.SANITY_STUDIO_DATASET

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: DATASET,
  },
})
