const buildImageLinkFromSlug = (slug: string) => {
  if (!slug) return;
  const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`
  return new URL(formattedSlug, process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL).toString();
}

export const documentResolver = (document: any) => {
  document.content.map(item => {
    if (item._type === 'newsletterArticle') {
      item['title'] = item?.titleOverride || item.title
      item['content'] = item?.contentOverride || item.content
      item['imageLink'] = buildImageLinkFromSlug(item?.slug)
    }
    return item;
  });

  return document;
}
