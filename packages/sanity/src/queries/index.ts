export const getEmailContent = (id: string) =>
  `
    *[_id == '${id}'][0] {
      ...,
      "authors": authors[]-> {
        name,
        twitter
      },
      "content": content[] {
        ...,
        _type == "newsletterArticle" => {
          ...,
          "title": articleReference->headline,
          "content": articleReference->content,
          "image": articleReference->coverImage,
          "slug": articleReference->slug.current,
        },
      },
    }
 `
