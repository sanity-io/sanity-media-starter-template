import React, { useEffect, useState } from 'react';
import { Card } from '@sanity/ui';
import { SanityDocument } from 'sanity';
import Email from '../../components/email';
import { sanityClient } from '../../sanityClient'
import { getEmailContent } from '../../queries'
import { documentResolver } from '../../components/email/documentResolver'

const fetchContent = async (document: SanityDocument) => {
  return await sanityClient.fetch(getEmailContent(document._id));
};

const EmailPreview = (
  { document }: { document: SanityDocument }
) => {
  const { displayed } = document
  const [newsletterContent, setNewsletterContent] = useState('');

  useEffect(() => {
    fetchContent(displayed).then((result) => {
      console.log(documentResolver(result))
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
