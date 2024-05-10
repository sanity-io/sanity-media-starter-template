import type {EmailDocument} from '../../types'

export const buildImageLinkFromSlug = (slug: string): string | undefined => {
  if (!slug) return;
  const formattedSlug = slug.startsWith('/') ? slug : `/${slug}`
  return new URL(formattedSlug, process.env.SANITY_STUDIO_SITE_PUBLIC_BASE_URL).toString();
}

export const documentResolver = (document: EmailDocument): EmailDocument => {
  const resolvedContent = document.content.map((item: ContentItem) => {
    if (item._type === 'newsletterArticle') {
      return {
        ...item,
        title: item.titleOverride || item.title,
        content: item.contentOverride || item.content,
        imageLink: buildImageLinkFromSlug(item.slug)
      };
    }
    return item;
  });

  return { ...document, content: resolvedContent };
}
