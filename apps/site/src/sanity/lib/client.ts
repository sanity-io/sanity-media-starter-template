import {createClient} from '@sanity/client/stega'

import {apiVersion, dataset, projectId, revalidateSecret, studioUrl} from '@/sanity/lib/api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: revalidateSecret || process.env.NODE_ENV === 'development' ? false : true,
  perspective: 'published',
  stega: {
    studioUrl,
    // Uncomment to enable debugging
    // logger: console,
  },
})
