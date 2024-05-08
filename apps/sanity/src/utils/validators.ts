
/**
 * An example validator to enforce a headline authoring style.
 * This is used in the Sanity Studio to validate the headline before publishing.
 * Here headlines should be title case, with the exception of a few words that are allowed to be lowercase.
 */
export const validateHeadlineStyle = (headline: string) => {
  // These words are allowed to be lowercase
  const ignoreWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'but',
    'or',
    'for',
    'nor',
    'on',
    'at',
    'to',
    'from',
    'by',
    'as',
    'in',
    'of',
  ])

  return headline.split(' ').every((word, index) => {
    // Always capitalize the first word
    if (index === 0) {
      return /^["'“‘]?[A-Z]/.test(word)
    }

    // Check if word should be capitalized or is allowed to be lowercase
    if (ignoreWords.has(word.toLowerCase())) {
      return /^[a-z]/.test(word)
    } else {
      return /^["'“‘]?[A-Z]/.test(word)
    }
  })
}
