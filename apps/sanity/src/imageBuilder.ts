import imageUrlBuilder from '@sanity/image-url'

// https://www.sanity.io/docs/image-url#usage
export const imgBuilder = imageUrlBuilder({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',
});
