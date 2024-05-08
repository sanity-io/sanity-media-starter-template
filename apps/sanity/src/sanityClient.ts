import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: '2023-06-21',
  token: process.env.SANITY_STUDIO_DESK_TOKEN,
  useCdn: false,
});
