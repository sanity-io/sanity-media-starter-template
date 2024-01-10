import {z} from 'zod'
import {ImageRef} from './imageRef'

export const Author = z.object({
  // This should be a stable and predictable ID that can be used to reference this author
  _id: z.string(),
  _type: z.literal('author'),
  name: z.string().min(1).trim(),
  jobTitle: z.string().nullable(),
  email: z.string().nullable(),
  bio: z.string().nullable(),
  headshot: ImageRef.nullable(),
  twitter: z.string().nullable(),
  linkedin: z.string().nullable(),
})

export type Author = z.infer<typeof Author>

export const AuthorRef = z.object({
  _type: z.literal('reference'),
  _ref: z
    .string()
    .min(1)
    .regex(/^author_.+/),
})

export type AuthorRef = z.infer<typeof AuthorRef>

export const authorToRef = (author: Author): AuthorRef => ({
  _type: 'reference',
  _ref: author._id,
})
