import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

import { NewsletterLogo } from './logo';

import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link, 
  Preview,
  Row,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface EmailProps {
  document: {
    previewText: string;
    content: Array<{
      _key: string;
      title?: string;
      content: any;
    }>;
  };
};

const Email = ({ document }: EmailProps) => {
  const { previewText, content } = document;
  console.log(previewText)
  return (
    <Html lang='en'>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Static header */}
          <Section style={logo}>
            <NewsletterLogo/>
          </Section>
          {/* Styled header bottom border */}
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          {/* Content sections */}
          {content && content.map(({_key, title, content}, index) => (
            <Section key={_key} style={section}>
              {title && <Text style={heading}>{title}</Text>}
              <Text style={paragraph}>
                <PortableText value={content} />
              </Text>
              {index !== content.length - 1 && <Hr style={hr} />}
            </Section>
          ))}
        </Container>
        {/* Static footer */}
        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <FaXTwitter />
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <FaLinkedin />
            </Column>
          </Row>
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            © 2023 Sanity Media Starter, All Rights Reserved <br />
            351 California St, San Francisco, CA 94104, USA
          </Text>
        </Section>
      </Body>
    </Html>
  );
};

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  color: 'black',
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  width: '580px',
  margin: '0 auto',
};

const section = {
  padding: '5px 50px 10px 60px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionsBorders = {
  width: '100%',
  display: 'flex',
};

const sectionBorder = {
  borderBottom: '1px solid #eeeeee',
  width: '249px',
};

const sectionCenter = {
  borderBottom: '1px solid #9147ff',
  width: '102px',
};

const link = {
  textDecoration: 'underline',
};

const heading = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#9147ff',
  margin: 0,
};

const hr = {
  borderColor: '#e8eaed',
  margin: '15px 0',
};

export default Email;
