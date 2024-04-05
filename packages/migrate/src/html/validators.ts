// These are validators specific to importing data from HTML content.

import {z} from 'zod'

export const AuthorJSONSchema = z
  // Handle both normalized and non-normalized JSON-LD, where `@` is optional
  .union([z.object({'@type': z.literal('Person')}), z.object({type: z.literal('Person')})])
  .and(
    z.object({
      description: z.string().nullable().catch(null),
      jobTitle: z.string().nullable().catch(null),
      name: z.string().min(1),
      url: z.string().url().nullable().catch(null),
      image: z.string().url().nullable().catch(null),
      email: z.string().email().nullable().catch(null),
      telephone: z.string().nullable().catch(null),
    }),
  )
