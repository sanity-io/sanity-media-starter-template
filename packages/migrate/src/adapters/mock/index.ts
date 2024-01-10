import {faker} from '@faker-js/faker'
import {Author} from '../../blocks/author'
import {Article, ArticleDereferenced} from '../../blocks/article'
import {htmlToBlockContent} from '../../html/htmlToBlockContent'
import {join} from 'node:path'
import {NdJson} from 'json-nd'
import {uniquifyByKey} from '@thalesrc/js-utils/array'

const makeAuthor = (): Author => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    _id: faker.string.uuid(),
    _type: 'author',
    name: faker.person.fullName({firstName, lastName}),
    email: faker.internet.email({
      firstName,
      lastName,
    }),
    headshot:
      faker.helpers.maybe(() => ({
        _sanityAsset: `image@${faker.image.avatar()}`,
        _type: 'image',
      })) ?? null,
    bio: faker.lorem.paragraph(),
    jobTitle: faker.person.jobTitle(),
    linkedin: null,
    twitter: null,
  }
}

const authors = faker.helpers.multiple<Author>(makeAuthor, {
  count: 100,
})

const oneYearAgo = new Date()
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

const makeArticle = (): Article => ({
  _id: faker.string.uuid(),
  _type: 'article',
  headline: faker.lorem.sentence(),
  // generate a date between 10 years ago and a year ago
  publishDate: faker.date.past({years: 10, refDate: oneYearAgo.toISOString()}).toISOString(),
  slug: {
    current: faker.lorem.slug(),
  },
  authors: faker.helpers.arrayElements<Author>(authors, {
    min: 1,
    max: 5,
  }),
  coverImage: {
    _sanityAsset: `image@${faker.image.urlPicsumPhotos()}`,
    _type: 'image',
  },
  subHeadline: faker.helpers.maybe(faker.lorem.sentence),
  content: htmlToBlockContent(faker.lorem.paragraphs(10)),
})

export const fakeArticles = async (count: number) => {
  console.log(`✨ Generating ${count} articles`)
  const allArticles: ArticleDereferenced[] = []
  const allAuthors: Author[] = []

  const mockArticles = faker.helpers.multiple<Article>(makeArticle, {count})
  mockArticles.map((fakeArticle) => {
    const {article, authors} = ArticleDereferenced.parse(fakeArticle)
    allArticles.push(article as any)
    allAuthors.push(...authors)
  })

  // Filter out duplicate authors
  const uniqueAuthors = uniquifyByKey(allAuthors, '_id')

  const destination = join(
    import.meta.dir,
    '..',
    '..',
    '..',
    'data',
    `${process.env.PROJECT_NAME}.ndjson`,
  )
  const data = NdJson.stringify([...allArticles, ...uniqueAuthors])
  Bun.write(destination, data)
  console.log(`💾 Exported content to ${destination}`)
}
