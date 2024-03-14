type Props = {
  title: string
  subtitle: string
  coverImage: string
  body: string
  author: {name: string}
  byline?: {name: string}[]
}

/**
 * The article theme and typography can be customized by changing these values
 * @see https://developer.apple.com/documentation/apple_news/apple_news_format/text_styles
 */
const componentTextStyles = {
  'default-title': {
    fontName: 'DINCondensed-Bold',
    fontSize: 36,
    textColor: '#2F2F2F',
    textAlignment: 'center',
    lineHeight: 44,
  },
  'default-subtitle': {
    fontName: 'Georgia-Bold',
    fontSize: 20,
    textColor: '#2F2F2F',
    textAlignment: 'center',
    lineHeight: 24,
  },
  titleStyle: {
    textAlignment: 'left',
    fontName: 'DINCondensed-Bold',
    fontSize: 64,
    lineHeight: 74,
    textColor: '#ec5c52',
  },
  introStyle: {
    textAlignment: 'left',
    fontName: 'Georgia-Bold',
    fontSize: 24,
    textColor: '#000',
  },
  authorStyle: {
    textAlignment: 'left',
    fontName: 'Georgia-Italic',
    fontSize: 16,
    textColor: '#000',
  },
  bodyStyle: {
    textAlignment: 'left',
    fontName: 'Georgia',
    fontSize: 18,
    lineHeight: 26,
    textColor: '#000',
  },
}

export const makeArticle = ({author, byline, title, subtitle, coverImage, body}: Props) => ({
  version: '1.0',
  identifier: 'SMS_preview_article',
  title,
  language: 'en',
  layout: {
    columns: 7,
    width: 1024,
    margin: 70,
    gutter: 40,
  },
  subtitle,
  metadata: {
    thumbnailURL: coverImage,
  },
  documentStyle: {
    backgroundColor: '#f6f6f6',
  },
  components: [
    {
      role: 'title',
      layout: 'titleLayout',
      text: title,
      textStyle: 'titleStyle',
    },
    {
      role: 'header',
      layout: 'headerImageLayout',
      style: {
        fill: {
          type: 'image',
          URL: coverImage,
          fillMode: 'cover',
          verticalAlignment: 'center',
        },
      },
    },
    {
      role: 'author',
      layout: 'authorLayout',
      text: author.name,
      textStyle: 'authorStyle',
    },
    ...(byline
      ? byline.map((bylineAuthor) => ({
          role: 'byline',
          layout: 'authorLayout',
          text: bylineAuthor.name,
          textStyle: 'authorStyle',
        }))
      : []),
    {
      role: 'body',
      text: body,
      layout: 'bodyLayout',
      textStyle: 'bodyStyle',
    },
  ],
  componentTextStyles,
  componentLayouts: {
    headerImageLayout: {
      columnStart: 0,
      columnSpan: 7,
      ignoreDocumentMargin: true,
      minimumHeight: '40vh',
      margin: {
        top: 15,
        bottom: 15,
      },
    },
    titleLayout: {
      columnStart: 0,
      columnSpan: 7,
      margin: {
        top: 50,
        bottom: 10,
      },
    },
    introLayout: {
      columnStart: 0,
      columnSpan: 7,
      margin: {
        top: 15,
        bottom: 15,
      },
    },
    authorLayout: {
      columnStart: 1,
      columnSpan: 5,
      margin: {
        top: 15,
        bottom: 15,
      },
    },
    bodyLayout: {
      columnStart: 1,
      columnSpan: 5,
      margin: {
        top: 15,
        bottom: 15,
      },
    },
  },
})
