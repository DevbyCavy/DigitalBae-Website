// Privacy Policy and Terms of Use. These are TEMPLATES written for this site as built
// (contact form, optional newsletter, optional consent-based analytics, no payments).
// They are not legal advice: have them reviewed for the jurisdiction(s) the business operates in,
// and replace every [bracketed] placeholder before launch.

export const legalMeta = {
  lastUpdated: '[Date of last review]',
  entity: '[Legal name of the business or individual operating Digital Bae]',
  address: '[Registered business address]',
  email: 'privacy@[yourdomain].com',
  jurisdiction: '[Country / jurisdiction whose law governs these terms]',
}

export const privacyPolicy = [
  {
    heading: 'Who we are',
    body: [
      `This website is operated by ${legalMeta.entity} ("Digital Bae", "we", "us"). This policy explains what personal information we collect through this website, why we collect it and the choices you have.`,
    ],
  },
  {
    heading: 'Information you give us',
    body: [
      'When you use the contact form we receive your name, email address, enquiry type, subject and message. We use this only to respond to your enquiry and to manage any resulting engagement.',
      'If you subscribe to the newsletter we receive your email address (and name, if provided) and use it only to send you the newsletter. Every newsletter includes a link to unsubscribe.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    body: [
      'We use a small amount of storage in your browser to remember your cookie choice. This is necessary for the site to respect your preference.',
      'With your consent only, we use [analytics provider, e.g. Google Analytics 4 / Plausible] to understand how visitors use the site, such as which pages are viewed. No analytics code is loaded until you choose "Accept". You can change your choice at any time through "Cookie settings" in the footer.',
    ],
  },
  {
    heading: 'Services we use',
    body: [
      'Form submissions and newsletter sign-ups may be processed by third-party providers acting on our behalf: [form provider, e.g. Formspree] and [newsletter provider, e.g. Mailchimp]. Fonts are served by Google Fonts. These providers process data under their own privacy terms.',
    ],
  },
  {
    heading: 'How long we keep information',
    body: ['We keep enquiry correspondence for [retention period, e.g. up to 24 months] unless a longer period is required for an ongoing engagement or by law. Newsletter subscriptions are kept until you unsubscribe.'],
  },
  {
    heading: 'Your rights',
    body: [
      `Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal information, and to object to processing or withdraw consent. To make a request, email ${legalMeta.email}. You may also have the right to complain to your local data protection authority.`,
    ],
  },
  {
    heading: 'Security',
    body: ['This site is served over HTTPS. We take reasonable measures to protect information, but no method of transmission over the internet is completely secure.'],
  },
  {
    heading: 'Changes to this policy',
    body: ['We may update this policy from time to time. The date at the top of this page shows when it was last revised.'],
  },
  {
    heading: 'Contact',
    body: [`${legalMeta.entity}, ${legalMeta.address}. Email: ${legalMeta.email}.`],
  },
]

export const termsOfUse = [
  {
    heading: 'About these terms',
    body: [`These terms govern your use of this website, operated by ${legalMeta.entity}. By using the site you agree to them. If you do not agree, please do not use the site.`],
  },
  {
    heading: 'Content and intellectual property',
    body: [
      'All content on this site, including text, photographs, video, logos and design, belongs to Digital Bae or its licensors and is protected by copyright and other laws. You may share links to pages and quote short excerpts with attribution. Any other reproduction requires our written permission.',
      'Photographs and video of events remain the property of their respective owners and are used with permission.',
    ],
  },
  {
    heading: 'Information on this site',
    body: [
      'Articles and insights are general commentary and do not constitute professional, financial or legal advice. While we aim to keep content accurate and current, we make no guarantees about its completeness or suitability for your circumstances.',
    ],
  },
  {
    heading: 'Speaking engagements and masterclasses',
    body: [
      'Submitting an enquiry does not create a booking or contract. Engagements, masterclass places and any fees are confirmed separately in writing. No payments are taken through this website.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: ['You agree not to misuse the site, including by attempting to gain unauthorised access, submitting spam or malicious content through forms, or interfering with its operation.'],
  },
  {
    heading: 'Links to other websites',
    body: ['The site links to third-party websites and social platforms. We are not responsible for their content or practices.'],
  },
  {
    heading: 'Liability',
    body: ['To the fullest extent permitted by law, we are not liable for any loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited by law.'],
  },
  {
    heading: 'Governing law',
    body: [`These terms are governed by the laws of ${legalMeta.jurisdiction}.`],
  },
  {
    heading: 'Contact',
    body: [`Questions about these terms can be sent to ${legalMeta.email}.`],
  },
]
