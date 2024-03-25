/**
 * For demonstration purposes, we disable indexing of the site by search engines.
 *
 * This is because content will most often be scraped from third-party websites,
 * and we want to avoid competing with the original sources.
 */
export const SITE_IS_INDEXABLE = process.env.NEXT_PUBLIC_DISABLE_SITE_INDEXING !== 'true'

export const getSiteUrl = () => {
  /*
   * Vercel sets this automatically but does not include
   *  the protocol (`https://`), so we need to add it manually.
   */
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return process.env.NEXT_PUBLIC_SITE_BASE_URL || 'http://localhost:3000'
}
