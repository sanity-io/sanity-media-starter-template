import {z} from 'zod'

export const Tag = z.object({
  // This should be a stable and predictable ID that can be used to reference this tag
  _id: z.string(),
  _type: z.literal('tag'),
  name: z.string().min(1).trim(),
})

export type Tag = z.infer<typeof Tag>

export const TagRef = z.object({
  _type: z.literal('reference'),
  _ref: z
    .string()
    .min(1)
    .regex(/^tag_.+/),
})

export type TagRef = z.infer<typeof TagRef>

export const tagToRef = (tag: Tag): TagRef => ({
  _type: 'reference',
  _ref: tag._id,
})
