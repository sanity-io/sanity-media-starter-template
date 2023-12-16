# Migrate

This package allows you to quickly:

- scrape articles from an existing website,
- validate the data,
- transform into appropriate Sanity CMS documents
  - this includes using document references for authors
- import into your Sanity project

## Quick Start

> The `migrate` project [depends on Bun](https://bun.sh), so please install it if you haven’t already.

This is intended to be run after you've already created a new Sanity project
with some documents. If you haven't done so already, follow instruction in `/packages/sanity/README.md`.

First duplicate the `.env.example` file and rename to `.env`.

Update the values inside using your Sanity project values.
These should already be defined in your `/packages/sanity/.env` file.

There are some special environment variables, which are documented in the [Selectors][#selectors] section.

Once set you can run the following command to scrape the desired website:
`npm run import`

Then to write the data as an ND-JSON file ready for import using Sanity's CLI tool:
`npm run export`

And finally to upload to Sanity:
- navigate to the folder containing your Sanity configuration
- run `npx sanity dataset ../packages/migrate/data/db.ndjson production`

Note that the `db.ndjson` file is named after the `PROJECT_NAME` defined in `.env`,
and the path should be updated to match the location of the exported data.

## Selectors

For scraping content we use two approaches:

- using Schema.org values if available, found in most website `head` content.
- using CSS selectors for values that don’t exist in the JSON-LD schema

- `SELECTOR_ARTICLE_LINKS`: CSS selector used to find article link to be scraped on the homepage
- `SELECTOR_SUBTITLE`: article subtitle text
- `SELECTOR_ARTICLE_CONTENT`: element containing article content. The inner HTML
  will be parsed and imported as PortableText block

## Architecture

The migration package is built with the concept of data "adapters", and is designed
to be modular with three primary components:
- Input: source of content to be imported. This could be a public website, a
  legacy CMS database, etc.
- Data storage: used to store transformed data before ingesting into a Sanity dataset
- Output: a way of getting articles from the temporary `Data storage` into a
  Sanity dataset. This could be writing all items to an ND-JSON file, or running
  job queues to make direct API calls to Sanity.

The core of the transformations are powered by [Zod validators](https://zod.dev) to ensure
that the data being imported matches the expected Sanity document schema.

Currently there are only two adapters defined:
- Input: HTML from public websites
- Data storage: SQLite
- Output: ND-JSON