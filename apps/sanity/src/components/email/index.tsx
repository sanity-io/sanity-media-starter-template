import React, { useEffect, useState } from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';

import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

import type {EmailDocument} from '../../types'
import { imgBuilder } from '../../imageBuilder'
import type {Image} from 'sanity'

import {
  Body,
  Button,
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

interface ImageComponentProps {
  value: Image;
}

export const ImageComponent = ({ value }: ImageComponentProps) => {
  return (
    <Img
      src={imgBuilder.image(value).width(600).url()}
      alt={value.alt || ''}
      style={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  )
}

const emailComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => <Text style={paragraph}>{children}</Text>,
  },
  listItem: {
    bullet: ({children}) => <li style={paragraph}>{children}</li>,
  },
  types: {
    image: ImageComponent,
  },
}

/** TODO: Use site/newsletter settings **/
const Logo = "https://cdn.sanity.io/images/mqtqzjcc/production/df4107b3ffa7b75f10482a50c5874bb83415ca54-600x300.png?w=300"

interface EmailProps {
  document: EmailDocument;
}

const Email = ({ document }: EmailProps) => {
  const { previewText, authors, content } = document;

  return (
    <Html lang='en'>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container>
          {/* Static header */}
          <Section style={logo}>
            <Img style={{margin: '0 auto'}}src={Logo}/>
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
          {content &&
            content.map(({_key, title, image, imageLink, content, _type}, index) =>
              _key && content ? (
                <Section key={_key} style={section}>
                  {title && <Text style={heading}>{title}</Text>}
                  {image && (
                    <Link href={imageLink}>
                      <ImageComponent value={image} />
                    </Link>
                  )}
                  <Text style={paragraph}>
                    <PortableText
                      value={_type === 'newsletterArticle' ? content.slice(0, 1) : content}
                      components={emailComponents}
                    />
                  </Text>
                  {_type === 'newsletterArticle' && (
                    <Button href={imageLink} style={button}>
                      Read full article
                    </Button>
                  )}
                  {index < content.length - 1 && <Hr style={hr} />}
                </Section>
              ) : null,
            )}
        </Container>
        {/* Static footer */}
        <Section style={footer}>
          <Row style={{ textAlign: 'center' }}>
            <Text>Written by:
              {
                authors && authors.length > 0 
                  ? authors.map(({ name, twitter }, index) => (
                      <Link key={name} href={twitter}>
                        {name}{index < authors.length - 1 ? ',' : ''}
                      </Link>
                    ))
                  : <Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0"> Rick Astley</Link>
              }
            </Text>
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
  padding: '30px 0 10px',
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
  margin: '0 0 8px 0',
};

const hr = {
  borderColor: '#e8eaed',
  margin: '15px 0',
}

const button = {
  backgroundColor: '#9147ff',
  borderRadius: '4px',
  color: 'white',
  padding: '8px 16px',
}

export default Email;
