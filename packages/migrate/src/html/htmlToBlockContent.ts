const {JSDOM} = require('jsdom')
const {Schema} = require('@sanity/schema')
import {DeserializerRule, htmlToBlocks} from '@sanity/block-tools'
import config from 'studio/sanity.config'
import {customBlockRules} from './customBlockRules'

// Start with compiling a schema we can work against
const defaultSchema = Schema.compile(config.schema)

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
