import {z} from 'zod'
import {ImageRef} from './imageRef'

export const OpenGraphProps = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: ImageRef.optional(),
})
export type OpenGraphProps = z.infer<typeof OpenGraphProps>
