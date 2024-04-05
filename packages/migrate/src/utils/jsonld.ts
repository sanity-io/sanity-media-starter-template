import {frame} from 'jsonld'

/**
 * List of valid article types.
 * This list is used to filter out non-article JSON-LD objects
 * from a normalized JSON-LD schema.
 */
const articleTypes = [
  'Article',
  'NewsArticle',
  'BlogPosting',
  'ScholarlyArticle',
  'TechArticle',
  'WebPage',
]

/**
 * Given a JSON-LD string, return the article JSON-LD object.
 * This function will attempt to normalize the schema by resolving
 * `@id` references in the JSON-LD.
 */
export const getArticleJsonLd = async (jsonLd: unknown) => {
  if (typeof jsonLd !== 'string') {
    throw new Error(`Invalid JSON Schema`)
  }

  let JSONSchema

  try {
    JSONSchema = JSON.parse(jsonLd)
  } catch (error) {
    throw new Error(`Invalid JSON Schema`)
  }

  if (!JSONSchema) {
    throw new Error(`No JSON Schema found`)
  }

  /**
   * Handle normalized JSON-LD, resolving `@id` references
   */
  if ('@graph' in JSONSchema && Array.isArray(JSONSchema['@graph'])) {
    const resolvedSchema = await frame(JSONSchema, {
      '@context': 'https://schema.org',
      '@embed': '@always',
    })

    const graph = resolvedSchema['@graph']

    if (Array.isArray(graph)) {
      const article = graph.find(
        (node) =>
          'type' in node && typeof node.type === 'string' && articleTypes.includes(node.type),
      )

      JSONSchema = article
    }
  }

  return JSONSchema
}
