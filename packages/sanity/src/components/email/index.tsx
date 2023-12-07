import React, { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { NewsletterLogo } from './logo';

import type {EmailDocument} from '../../types'
import { imgBuilder } from '../../imageBuilder'
import type {Image} from 'sanity'

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

export const ImageComponent = ({ value }: Image) => {
  return (
    <Img
      src={imgBuilder.image(value).fit('max').url()}
      alt={value.alt || ''}
      style={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  )
}

const emailComponents = {
  types: {
    image: ImageComponent,
  },
}

const Email = ({ document } : EmailDocument) => {
  const { previewText, authors, content } = document;

  return (
    <Html lang='en'>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container>
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
          {content && content.map(({_key, title, image, imageLink, content}, index) => (
            _key && content ? (
              <Section key={_key} style={section}>
                {title && <Text style={heading}>{title}</Text>}
                {image && <Link href={imageLink}><ImageComponent value={image}/></Link>}
                <Text style={paragraph}>
                  <PortableText value={content} components={emailComponents} />
                </Text>
                {index < content.length - 1 && <Hr style={hr} />}
              </Section>
            ) : null
          ))}
        </Container>
        {/* Static footer */}
        <Section style={footer}>
          <Row style={{ textAlign: 'center' }}>
            <Text>Written by:
              {
                authors && authors.length > 0 
                  ? authors.map(({ name, twitter }, index) => (
                      <Link href={twitter}> {name}{index < authors.length - 1 ? ',' : ''}</Link>
                    ))
                  : <Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0"> Rick Astley</Link>
              }
            </Text>
          </Row>
          <Row>
            <Column align="right" style={{ width: '50%', paddingRight: '8px' }}>
              <FaXTwitter />
            </Column>
            <Column align="left" style={{ width: '50%', paddingLeft: '8px' }}>
              <FaLinkedin />
            </Column>
          </Row>
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            © {new Date().getFullYear()} Sanity Media Starter, All Rights Reserved <br />
            351 California St, San Francisco, CA 94104, USA
          </Text>
        </Section>
      </Body>
    </Html>
  );
};

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: 'white',
  color: 'black',
  fontFamily,
  maxWidth: 670,
  margin: '0 auto',
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 16,
};

const footer = {
  backgroundColor: '#efeef1',
  margin: '0 auto',
  padding: '15px 0 0',
};

const section = {
  padding: '5px 0 10px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionsBorders = {
  width: '100%',
};

const sectionBorder = {
  borderBottom: '1px solid #eeeeee',
};

const sectionCenter = {
  borderBottom: '1px solid #9147ff',
};

const link = {
  textDecoration: 'underline',
};

const heading = {
  fontSize: 20,
  fontWeight: '700',
  color: '#9147ff',
  margin: 0,
};

const hr = {
  borderColor: '#e8eaed',
  margin: '15px 0',
};

export default Email;
