// Organization JSON-LD, sitewide.
//
// Deliberately its own module, imported by app/layout.tsx and nothing else.
// Branch D also touches the root layout; keeping the block here means D's
// changes and this one cannot fight over the same lines — the layout gains a
// single import and a single <script> tag rather than forty lines of object
// literal that both branches want to edit.
//
// Company number 16603630 matches the footer on every page. If one changes,
// grep 16603630 and change both.

const SITE_URL = 'https://www.unbarrier.me';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Unbarrier Education Ltd',
  alternateName: 'unbarrier.me',
  url: SITE_URL,
  description:
    'unbarrier helps schools, trusts and edtech make sure the tools they have already bought actually reach the learners they were bought for.',
  legalName: 'Unbarrier Education Ltd',
  // Companies House number. schema.org has no dedicated company-number
  // property, so it goes on identifier with the register named.
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'Companies House company number',
    value: '16603630',
  },
  founder: {
    '@type': 'Person',
    name: 'Nici Foote',
    url: `${SITE_URL}/about`,
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  knowsAbout: [
    'special educational needs and disabilities',
    'assistive technology in schools',
    'accessibility in education',
    'digital inclusion',
  ],
};
