import {
  DocumentActionComponent,
  DocumentActionProps,
} from 'sanity';

import { useToast } from '@sanity/ui';
import { ClipboardIcon } from '@sanity/icons';
import Email from '../components/email';
import { render } from '@react-email/render';
import newsletterDocument from '../../schemas/documents/newsletter'

const CopyHTMLToClipboard: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  const { type, draft, published } = props;
  const toast = useToast();
  if (!type.includes(newsletterDocument.name)) return null;
  const document = draft || published

  const handler = async () => {
    const html = render(Email({ document }), {
      pretty: true,
    });
    await navigator.clipboard.writeText(html).then(() => {
      toast.push({
        title: 'Copied HTML to clipboard.',
        status: 'success',
      });
    }).catch((error) => {
      toast.push({
        title: 'Something went wrong, could not copy to clipboard.',
        description: error.message,
        status: 'error',
      });
    });
  }

  return {
    label: 'Copy HTML to Clipboard',
    icon: ClipboardIcon,
    onHandle: handler
  }
};

export default CopyHTMLToClipboard;
