import {
  DocumentActionComponent,
  DocumentActionProps,
  SanityDocument,
} from 'sanity';

import { useToast } from '@sanity/ui';
import { ClipboardIcon } from '@sanity/icons';
import Email from '../components/email';
import { render } from '@react-email/render';
import newsletterDocument from '../../schemas/documents/newsletter'
import { sanityClient } from '../sanityClient'
import { getEmailContent } from '../queries'
import { documentResolver } from '../components/email/documentResolver'

const CopyHTMLToClipboard: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  const { type, draft, published } = props;
  const toast = useToast();
  if (!type.includes(newsletterDocument.name)) return null;

  const handler = async () => {
    try {
      const document: SanityDocument | null = draft || published
      if (document) {
        const result = await sanityClient.fetch(getEmailContent(document._id));
        const html = render(Email({ document: documentResolver(result) }), { pretty: true });

        try {
          await navigator.clipboard.writeText(html);
          toast.push({
            title: 'Copied HTML to clipboard.',
            status: 'success',
          });
        } catch (error) {
          let errorMessage = 'An unknown error occurred';
          if (error instanceof Error) {
            errorMessage = error.message;
          }

          toast.push({
            title: 'Something went wrong, could not copy to clipboard.',
            description: errorMessage,
            status: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching and rendering email content:', error);
    }
  }

  return {
    label: 'Copy HTML to Clipboard',
    icon: ClipboardIcon,
    onHandle: handler
  }
};

export default CopyHTMLToClipboard;
