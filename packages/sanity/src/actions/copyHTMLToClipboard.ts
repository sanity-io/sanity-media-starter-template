import {
  DocumentActionComponent,
  DocumentActionProps,
} from 'sanity';

const CopyHTMLToClipboard: DocumentActionComponent = (
  props: DocumentActionProps
) => {
  const { type, draft, published } = props;
  if (!type.includes('newsletter')) return null;

  return {
    label: 'Copy HTML to Clipboard',
    onHandle: () => {
      // Here you can perform your actions
      window.alert('👋 Hello from custom action')
    }
  }
};

export default CopyHTMLToClipboard;
