This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Quick Start

If you haven't already done so, please follow the quick start
section found in the README at the root of this project.

Then to run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

## Site highlights

- There is an API route for automatically generating Open Graph images using [Vercel OG](https://vercel.com/docs/functions/edge-functions/og-image-generation).
  - The template (`./src/app/api/og/route.tsx`) is written as a React component, meaning the media team does not need to generate supporting assets. Additionally if the template or branding is ever changed, all article OG images will automatically be updated—both for new and historic content.

## Automatic page re-indexing

To reduce delay in search engines indexing newly published articles, we automatically notify them when new articles are added, as well as existing ones updated.

When an article is updated, [Sanity’s GROQ powered webhook](https://www.sanity.io/docs/webhook) is used to trigger NextJS’s on-demand Incremental Static Regeneration (ISR) to (re)build the article, and then notify [IndexNow](https://www.indexnow.org/index)—and other supported search engines in the syndicate—to crawl the page.

> IndexNow is an easy way for websites owners to instantly inform search engines about latest content changes on their website. In its simplest form, IndexNow is a simple ping so that search engines know that a URL and its content has been added, updated, or deleted, allowing search engines to quickly reflect this change in their search results.

### Configuring the automatic site re-indexing

> The Sanity webhook will need to be added to each new Sanity project, and can be done so [using this template](https://www.sanity.io/manage/webhooks/share?name=Revalidate+Articles&description=When+publishing+articles%2C+automatically+notify+search+engines+to+crawl+the+changed+pages%2C+reducing+delay+in+articles+appearing+in+search+results.%0AThis+uses+the+IndexNow+%28https%3A%2F%2Fwww.indexnow.org%2Findex%29+search+syndication+protocol.&url=https%3A%2F%2FYOUR_SITE_URL%2Fapi%2Frevalidate&on=create&on=update&filter=_type+%3D%3D+%27article%27+%26%26+%21%28_id+match+%22drafts.%22%29&projection=%7B_id%2C+_type%2C+headline%2C+slug%7D&httpMethod=POST&apiVersion=v2021-03-25&includeDrafts=&headers=%7B%7D).

1. 🪝 [Add Sanity Webhook to your project](https://www.sanity.io/manage/webhooks/share?name=Revalidate+Articles&description=When+publishing+articles%2C+automatically+notify+search+engines+to+crawl+the+changed+pages%2C+reducing+delay+in+articles+appearing+in+search+results.%0AThis+uses+the+IndexNow+%28https%3A%2F%2Fwww.indexnow.org%2Findex%29+search+syndication+protocol.&url=https%3A%2F%2FYOUR_SITE_URL%2Fapi%2Frevalidate&on=create&on=update&filter=_type+%3D%3D+%27article%27+%26%26+%21%28_id+match+%22drafts.%22%29&projection=%7B_id%2C+_type%2C+headline%2C+slug%7D&httpMethod=POST&apiVersion=v2021-03-25&includeDrafts=&headers=%7B%7D)

2. Update the `SANITY_REVALIDATE_SECRET` environment variable to the webhook secret configured in the Sanity project admin

3. If the site is using real/production content, delete the `NEXT_PUBLIC_DISABLE_SITE_INDEXING` environment variable to let the site be discoverable to search engines.
