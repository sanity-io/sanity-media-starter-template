/// <reference lib="dom" />

const {JSDOM} = require('jsdom')

export const createDocument = (htmlContent: string) => {
  const doc = new JSDOM(htmlContent).window.document
  return doc
}
