import {toHTML} from '@portabletext/to-html'

const toCustomHtml = (block: any) =>
  toHTML(block, {
    onMissingComponent: false,
    components: {
      /* optional object of custom components to use */
    },
  })

export const portableTextToAppleHtml = (content: Parameters<typeof toHTML>[0]) => {
  return (Array.isArray(content) ? content : [content]).map(
    (block) =>
      ({
        role: 'body',
        text: toCustomHtml(block),
        format: 'html',
        layout: 'bodyLayout',
        textStyle: 'bodyStyle',
      }) as const,
  )
}
