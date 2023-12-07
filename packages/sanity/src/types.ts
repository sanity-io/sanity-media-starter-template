import type {PortableTextBlock} from '@portabletext/types'
import type {Image} from 'sanity'

export type  EmailDocument = {
  document: {
    previewText: string;
    authors: Array<{
      name: string;
      twitter: string;
    }>;
    content: Array<{
      _key: string;
      title?: string;
      image?: Image;
      imageLink?: string;
      content?: PortableTextBlock[];
    }>;
  };
};
