import type {PortableTextBlock} from '@portabletext/types'
import type {Image} from 'sanity'

export type HomePagePayload = Omit<ArticlePayload, 'content' | 'quip' | 'tags'>[]

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
  accessLevel: 'auto' | 'premium' | 'public'
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

export type TopTagsPayload = {
  _id: string
  name: string
  referenceCount: number
}[]