import {createDocument} from '.'

export const getPageHTML = async (url: string) => {
  console.log('🌐 Fetching: ', url)
  return await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
    },
  }).then((res) => res.text())
}

export const getArticleLinks = async (url: string) => {
  const html = await getPageHTML(url)

  const links: string[] = []

  createDocument(html)
    .querySelectorAll(process.env.SELECTOR_ARTICLE_LINKS)
    .forEach((link: {href: string}) => {
      links.push(link.href)
    })

  return links
}
