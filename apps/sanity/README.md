# Sanity Studio

## Quick Start

If you haven't already done so, please follow the quick start
section found in the README at the root of this project.

Then to run the development server:

```bash
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the Sanity Studio.

## Article highlights

This example Sanity Studio is tailored for media/newspaper content.

- `Social Preview` tab shows how the article will look on various services.
- Open Graph image is automatically generated using [Vercel OG](https://vercel.com/docs/functions/edge-functions/og-image-generation).
  - The template is written as a React component, meaning the media team does not need to generate supporting assets. Additionally if the template or branding is ever changed, all article OG images will automatically be updated—both for new and historic content.
  - Note that for this to work locally, you will need to have the NextJS dev server running alongside the Sanity Studio dev server.
- Example: Headline editorial style guide enforcement
  - There is a simple field validator which checks whether a Headline is Title Case or not. This is to demonstrate capability for editorial teams to define and automatically
    enforce writing style guides. See `./src/utils/validators.ts` for details.
- AI Assist plugin is included, however the rules will need to be added for each project deployment.
  - E.g. for `Social Title`: "Write a click-bait-y title for the following article. It will be shared on social media, and should be optimized for intriguing readers and engagement. The title should be no longer than 164 characters in length."

## Newsletter highlights

There is a dedicated Newsletter document type allowing users to build email newsletters directly
in the Sanity Studio.

Newsletter content can either be a reference to an existing article, with the text and thumbnail being automatically pulled in, or content written exclusively for the newsletter.

### Sending newsletters

Authoring HTML emails is notoriously hard, which is why we've included the ability to preview the newsletter
as well as generate the HTML markup ready to be sent.

This is done using the [React Email](https://react.email) library.

For demo purposes we only support copying the generated HTML to the clipboard (found under the dropdown menu by the Publish button). However the Studio could easily be extended to send the emails using an email sending service such as [Amazon SES](https://aws.amazon.com/ses/).

## Preflight Checks

Before publishing articles, you can run several automated checks to ensure that the article does not contain
critical errors.

These can be run using the `Preflight` tab in the `Article` editor panel of the Studio.

### Configuration

These checks are run using [DataForSEO](https://dataforseo.com) APIs, specifically the [Instant Pages (Live)](https://docs.dataforseo.com/v3/on_page/instant_pages) endpoint.

Usage of this service requires registration and creation of an API key, however usage with placeholder/sandbox data doesn't require payment.

To create and set an API key, [follow the instructions here](https://docs.dataforseo.com/v3/auth/).
Then set the value in the `Secrets` tab inside the Sanity studio.

Secrets are managed using the [`studio-secrets` plugin](https://github.com/sanity-io/sanity-studio-secrets), so it only needs to be set once by the project administrator, and can be used by all content editors.

## Studio highlights

- [Presentation Mode](https://github.com/sanity-io/visual-editing) supports live previews and edits of the site
  - Note that for this to work locally, you will need to have the NextJS dev server running alongside the Sanity Studio dev server.
- [Media plugin](https://github.com/sanity-io/sanity-plugin-media) enables managing and tagging assets
- Dashboard with overview of latest content, recently edited content, and links to Sanity tutorials to ease onboarding of new users.
- Editorial publishing workflows for both Articles and Newsletters using the [`sanity-plugin-workflow`](https://github.com/sanity-io/sanity-plugin-workflow). Highlights include:
  - This workflow demonstrates a waterfall process of content progressing from `In Review`, to `Changes Requested`, and finally `Approved`. However the labels and workflow can be customized.
  - Role-based permissions can be defined to control who is allowed to change content statuses. E.g. only Editors or Admins should be able to mark an article as `Approved`.
  - Content can be assigned to Users to provide team visibility and manage workloads.
- Scheduled Publishing is configured and compliments the Workflows nicely
  - Note that Scheduled Publishing requires a paid plan
- All documents have a “Referenced By” tag. Allows seeing relationships between content, things such as:
  - what articles has an author written
  - which newsletters have included this Article
  - what articles are tagged with this tag
