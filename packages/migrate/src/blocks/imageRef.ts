import {z} from 'zod'

export const ImageRef = z.object({
  _type: z.literal('image'),
  _sanityAsset: z.string().regex(/^image@https:\/\/.+/),
})
