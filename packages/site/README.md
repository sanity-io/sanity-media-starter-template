This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Quick Start

If you haven't already done so, please follow the quick start
section found in the README at the root of this project.

Then to run the development server:

```bash
npm run dev -w site
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

## Site highlights

- There is an API route for automatically generating Open Graph images using [Vercel OG](https://vercel.com/docs/functions/edge-functions/og-image-generation).
  - The template (`./src/app/api/og/route.tsx`) is written as a React component, meaning the media team does not need to generate supporting assets. Additionally if the template or branding is ever changed, all article OG images will automatically be updated—both for new and historic content.
