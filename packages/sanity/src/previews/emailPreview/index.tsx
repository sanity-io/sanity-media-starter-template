import React, { useEffect, useState } from 'react';
import { Card } from '@sanity/ui';
import { SanityDocument } from 'sanity';
import Email from '../../components/email';
import { sanityClient } from '../../sanityClient'
import { getEmailContent } from '../../queries'
import { documentResolver } from '../../components/email/documentResolver'
import type { EmailDocument } from '../../types'

const fetchContent = async (document: SanityDocument): Promise<EmailDocument> => {
  return sanityClient
    .config({
      perspective: 'previewDrafts',
    })
    .fetch(getEmailContent(document._id.replace('drafts.', '')))
}

const EmailPreview = (
  { document }: { document: EmailDocument }
) => {
  const { displayed }: SanityDocument = document
  const [newsletterContent, setNewsletterContent] = useState<EmailDocument | null>()

  useEffect(() => {
    fetchContent(displayed).then((result) => {
      setNewsletterContent(documentResolver(result))
    })
  }, [document]);

  /** TODO: Style empty state **/
  if (!displayed._id) { return <Card></Card>; }
  /** TODO: Style loading state **/
  if (!newsletterContent) { return <Card></Card>; }

  return (
    <Card>
      <Email document={newsletterContent} />
    </Card>
  );
};

export default EmailPreview;
