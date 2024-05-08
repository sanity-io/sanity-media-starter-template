import {groq} from 'next-sanity'

export const homePageQuery = groq`
  *[_type == 'article' && defined(slug.current)] | order(publishedAt desc, _createdAt desc)[0...30] {
    _id,
    "accessLevel": coalesce(accessLevel, 'auto'),
    "slug": slug.current,
    coverImage,
    headline,
    subHeadline
  }
`
/**
 * Fetch an article by its slug/URL.
 *
 * For `related` articles, we want to show articles that share at least one tag with the current article.
 * However if there aren't enough articles that share tags, we fill out the list with recent articles instead.
 */
export const articlesBySlugQuery = groq`
  *[_type == 'article' && slug.current == $slug][0] {
    _id,
    _updatedAt,
    publishDate,
    "accessLevel": coalesce(accessLevel, 'auto'),
    "slug": slug.current,
    content[] {
      ...,
      _type == 'barChart' => {
        "chart": *[_type == "chart.bar" && _id == ^._ref][0] {
          ...,
          "data": data {
            ...,
            "fileUrl": *[_id == ^.asset._ref][0].url
          }
        }
      }
    },
    coverImage,
    headline,
    quip,
    subHeadline,
    tags[]->{
      _id,
      name
    },
    "authors": authors[]-> {
      _id,
      name,
      email,
      jobTitle,
      bio,
      twitter,
      linkedin
    },
    "related": (
      (
        *[
        _type == "article" &&
        _id != ^._id &&
        count(tags[@._ref in ^.^.tags[]._ref]) > 0
        ] | order(publishedAt desc, _createdAt desc)[0...3]
      ) + *[_type == "article" && _id != ^._id][0...3]
    )[0...3] {
      _id,
      "accessLevel": coalesce(accessLevel, 'auto'),
      "slug": slug.current,
      coverImage,
      headline,
      subHeadline,
    }
  }
`

/**
 * Fetch the top 5 tags by article count
 */
export const topTagsQuery = groq`
  *[_type == "tag"]{
    _id,
    name,
    "referenceCount": count(*[_type == "article" && references(^._id)])
  } | order(referenceCount desc)[0...5]
`
