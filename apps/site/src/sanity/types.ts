import type {PortableTextBlock} from '@portabletext/types'
import type {Image} from 'sanity'

export type HomePagePayload = Omit<ArticlePayload, 'content' | 'quip' | 'tags'>[]

type AccessLevel = 'auto' | 'premium' | 'public'
type Author = {
  _id: string
  name: string
  email: string
  jobTitle: string
  bio: string
  twitter: string
  linkedin: string
}

export type ArticlePayload = {
  _updatedAt: string
  publishDate: string
  authors: Author[]
  _id: string
  accessLevel: AccessLevel
  content: PortableTextBlock[]
  coverImage: Image
  headline: string
  overview: PortableTextBlock[]
  quip?: string
  slug: string
  subHeadline: string
  tags: {
    _id: string
    name: string
  }[]
  og?: {
    title?: string
    description?: string
    image?: Image
  }
  related: Pick<
    ArticlePayload,
    '_id' | 'slug' | 'accessLevel' | 'coverImage' | 'headline' | 'subHeadline'
  >[]
}

export type TagPayload = {
  _id: string
  name: string
  slug: string
  articles: {
    _id: string
    slug: string
    coverImage: Image
    headline: string
    subHeadline: string
    accessLevel: AccessLevel
  }[]
}

export type TopTagsPayload = {
  _id: string
  name: string
  slug: string
  referenceCount: number
}[]

type PolicyPayload = {
  _id: string
  effectiveDate: string
  content: PortableTextBlock[]
}

export type PrivacyPolicyPayload = PolicyPayload
export type TermsAndConditionsPayload = PolicyPayload

export type GlobalNavigationPayload = {
  _id: string
  items: {
    _type: 'singleItem' | 'dropdownItem'
    label: string
    url?: string
    list?: {
      _ref: string
      _type: 'Tag' | 'Article'
      slug: string
      label: string
    }[]
  }[]
}
