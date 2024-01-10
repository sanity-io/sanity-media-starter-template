import {z} from 'zod'

export const BlockEditorContent = z.unknown()
export type BlockEditorContent = z.infer<typeof BlockEditorContent>
