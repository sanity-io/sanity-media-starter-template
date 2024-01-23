# Sanity Media Template

This template allows you to quickly clone an existing media site as a Sanity
and NextJS project by importing articles from an existing website.

Please see the various sub-package READMEs for more detailed information.

- [Sanity](./packages/sanity/README.md): Sanity Studio and schema
- [Site](./packages/site/README.md): NextJS site
- [Migrate](./packages/migrate/README.md): import articles from an existing website

## Quick Start

Once you've cloned this repository, you'll need to:

- install dependencies
- link to your Sanity project
- create a Sanity API token

### Install dependencies

```sh
npm install
```

### Link to Sanity project

You will need to link this project to your Sanity project. To either link to an existing project, or create a new one, run the following command from the project root:

```sh
npm run setup
```

### Create a Sanity API token

Next, you will also need to create a Sanity API token. To do so, run the following command:

```sh
npm run setup:token -w studio
```

Navigate to the `API` tab in your project settings, and create a new token.

Copy the token and paste it into your `.env` files, both in the `site` and `studio` packages.

### Run the project

The NextJS site and the Studio run on different servers, so you will need to run them in separate terminal windows.

- Run Sanity Studio: `npm run dev -w studio`
- Run NextJS site: `npm run dev -w site`

## TODO

- [] Add utility commands for generating Sanity Project API tokens using [the HTTP API](https://www.sanity.io/docs/projects-api#1056ae7a9bc8)