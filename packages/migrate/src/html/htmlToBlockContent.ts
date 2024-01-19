const {JSDOM} = require('jsdom')
const {Schema} = require('@sanity/schema')
import {DeserializerRule, htmlToBlocks} from '@sanity/block-tools'
import {customBlockRules} from './customBlockRules'
import { schemaTypes } from 'studio/schemas'

/**
 * Start with compiling a schema we can work against
 * 
 * Note:
 * Originally we used to import the entire Sanity config and access the `schemaTypes` from there,
 * ensuring that we were using the same schema as the Sanity Studio.
 * @see https://github.com/pinecreeklabs/sanity-media-starter/blob/6f87c83829180cb4cdc8935cd82fe41026575d00/packages/migrate/src/html/htmlToBlockContent.ts#L8
 * 
 * However there is a bug with Bun which causes a segmentation fault error when
 * the file calls `scheduledPublishing()` from `@sanity/scheduled-publishing`.
 * Therefore we side-step the issue by importing the `schemaTypes` directly.
 */
const defaultSchema = Schema.compile({
  types: schemaTypes
})

// The compiled schema type for the content type that holds the block array
const blockContentType = defaultSchema
  .get('article')
  .fields.find((field: {name: string; type: string}) => field.name === 'content').type

// Convert HTML to block array
export const htmlToBlockContent = (articleContentHTML: string, rules?: DeserializerRule[]) => {
  return htmlToBlocks(`<html><body>${articleContentHTML}<body></html>`, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
    rules: customBlockRules,
  })
}
