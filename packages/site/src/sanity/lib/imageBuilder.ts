import createImageUrlBuilder from '@sanity/image-url'
import type {Image} from 'sanity'

import {dataset, projectId} from '@/sanity/lib/api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    throw new Error('Image is missing a valid reference')
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}
