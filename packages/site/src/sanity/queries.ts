import {groq} from 'next-sanity'

export const homePageQuery = groq`
  *[_type == 'article' && defined(slug.current)][0...20] {
    _id,
    "slug": slug.current,
    coverImage,
    headline,
    subHeadline
  }
`

export const articlesBySlugQuery = groq`
  *[_type == 'article' && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    content,
    coverImage,
    headline,
    quip,
    subHeadline,
    tags
  }
`
