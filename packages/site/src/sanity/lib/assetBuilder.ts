/**
 * Convert a Sanity file reference to a downloadable URL
 */

import {SanityReference} from '@sanity/image-url/lib/types/types'

const AssetRegExp = /file-(.+)-(\w+)/

export const urlForAsset = (asset: SanityReference) => {
  if (!asset._ref.startsWith('file')) {
    throw new Error('Invalid asset type')
  }

  const [fileId, fileFormat] = asset._ref.match(AssetRegExp)?.slice(1) ?? []

  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.${fileFormat}`
}
