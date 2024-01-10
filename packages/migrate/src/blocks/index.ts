import {schemaTypes} from 'studio/schemas'
import {type Schema} from 'zod'
import {Article} from './article'
import { OpenGraphProps } from './openGraphProperties'
import {Author} from './author'
export {schemaTypes} from 'studio/schemas'

/**
 * These are the names of all custom schema types defined in the Sanity config
 */
type AllSchemaTypes = (typeof schemaTypes)[number]['name']

/**
 * A subset of the CMS schema types that we support validation and migration for.
 * Namely we exclude the newsletter types.
 */
type ImportableSchema = Exclude<
  AllSchemaTypes,
  'newsletter' | 'newsletterIntro' | 'newsletterArticle' | 'newsletterContent'
>

export const validators = {
  article: Article,
  author: Author,
  openGraphProperties: OpenGraphProps,
  tag: Article.shape.tags,
} satisfies Record<ImportableSchema, Schema>
