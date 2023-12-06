import React, { useEffect, useState } from 'react';
import { Card } from '@sanity/ui';
import { SanityDocument } from 'sanity';
import Email from '../../components/email';

const NewsletterPreview = ({ document }: { document: SanityDocument }) => {
  if (!document.displayed) { return null; }

  return (
    <Card>
      <Email document={document.displayed} />
    </Card>
  );
};

export default NewsletterPreview;
