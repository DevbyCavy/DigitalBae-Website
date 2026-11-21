// Insights: ALL ARTICLES BELOW ARE SAMPLE CONTENT (`sample: true`) for layout purposes.
// Replace with real writing. The `body` is an array of blocks so content can later come from a CMS/API.
// Block types: { type: 'p', text } | { type: 'h2', text } | { type: 'quote', text } | { type: 'list', items: [] }

export const categories = [
  'Digital Transformation',
  'Leadership',
  'Innovation',
  'Personal Growth',
  'Entrepreneurship',
]

export const articles = [
  {
    slug: 'transformation-is-a-people-story',
    title: 'Transformation Is a People Story First',
    excerpt:
      'We talk about platforms, data and automation. But every successful digital shift I have seen began with a far more human question.',
    category: 'Digital Transformation',
    date: '2026-10-14',
    readingTime: 6,
    featured: true,
    sample: true,
    body: [
      { type: 'p', text: 'This is sample content to demonstrate the article layout. Replace it with original writing from the brand owner.' },
      { type: 'p', text: 'Every organisation wants to be digital. Far fewer are ready for what that asks of the people inside them: new habits, new confidence and, often, a new definition of what good work looks like.' },
      { type: 'h2', text: 'Start with the question behind the tool' },
      { type: 'p', text: 'Before choosing a platform, ask what you want people to be able to do that they cannot do today. The answer tends to reveal more about culture than about technology.' },
      { type: 'quote', text: 'Technology changes what is possible. People decide what actually changes.' },
      { type: 'h2', text: 'Three signals that change is landing' },
      { type: 'list', items: ['People describe the change in their own words', 'Decisions get faster, not just tools', 'Curiosity outlasts the launch announcement'] },
      { type: 'p', text: 'Transformation is not an event. It is a series of small, brave decisions made by people who trust where they are going.' },
    ],
  },
  {
    slug: 'quiet-authority',
    title: 'On Quiet Authority',
    excerpt: 'The most influential leaders I know rarely raise their voices. Here is what they do instead.',
    category: 'Leadership',
    date: '2026-09-28',
    readingTime: 4,
    sample: true,
    body: [
      { type: 'p', text: 'This is sample content to demonstrate the article layout. Replace it with original writing from the brand owner.' },
      { type: 'p', text: 'Authority is often mistaken for volume. In practice, it is built through preparation, consistency and the willingness to be clear when it would be easier to be vague.' },
      { type: 'quote', text: 'Confidence is not the absence of doubt. It is the decision to lead anyway.' },
      { type: 'p', text: 'Quiet authority listens first, speaks with intention and follows through, every time.' },
    ],
  },
  {
    slug: 'curiosity-as-a-strategy',
    title: 'Curiosity as a Strategy',
    excerpt: 'Innovation is less about genius and more about permission: the permission to ask better questions.',
    category: 'Innovation',
    date: '2026-09-09',
    readingTime: 5,
    sample: true,
    body: [
      { type: 'p', text: 'This is sample content to demonstrate the article layout. Replace it with original writing from the brand owner.' },
      { type: 'p', text: 'The organisations that innovate consistently have one thing in common: they treat curiosity as a discipline rather than a personality trait.' },
      { type: 'h2', text: 'Make room for the unfinished idea' },
      { type: 'p', text: 'New ideas arrive fragile. Cultures that protect them long enough to be tested are the ones that eventually lead.' },
    ],
  },
  {
    slug: 'your-brand-is-a-promise',
    title: 'Your Personal Brand Is a Promise',
    excerpt: 'Not a logo, not a feed aesthetic. A promise, and the evidence you keep it.',
    category: 'Personal Growth',
    date: '2026-08-21',
    readingTime: 5,
    sample: true,
    body: [
      { type: 'p', text: 'This is sample content to demonstrate the article layout. Replace it with original writing from the brand owner.' },
      { type: 'p', text: 'A personal brand is the expectation people carry about you into a room before you have said a word. You can shape it, but only through what you consistently do.' },
      { type: 'list', items: ['Know what you want to be known for', 'Say it simply', 'Prove it repeatedly'] },
    ],
  },
  {
    slug: 'building-with-intention',
    title: 'Building With Intention',
    excerpt: 'Notes for founders on growing a venture without outgrowing your values.',
    category: 'Entrepreneurship',
    date: '2026-08-02',
    readingTime: 7,
    sample: true,
    body: [
      { type: 'p', text: 'This is sample content to demonstrate the article layout. Replace it with original writing from the brand owner.' },
      { type: 'p', text: 'Growth tests everything: your systems, your stamina and, above all, your clarity about why you started.' },
      { type: 'quote', text: 'Build the company you would be proud to work for.' },
    ],
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
export const getFeaturedArticle = () => articles.find((a) => a.featured) ?? articles[0]
