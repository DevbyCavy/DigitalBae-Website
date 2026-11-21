// Masterclasses. The Social Capital Method is the brand owner's flagship; the rest are PLACEHOLDER
// courses (placeholder: true) until real offerings are confirmed.
// No payments are processed on this site. Registration is by enquiry only.
export const masterclasses = [
  {
    id: 'social-capital-method',
    title: 'The Social Capital Method™',
    category: 'Flagship Masterclass',
    format: 'Keynote or corporate masterclass',
    duration: '', // add when confirmed; hidden while empty
    status: 'enquire',
    featured: true,
    summary: 'Building visibility, relationships and influence that move you forward. Taffy’s signature method for turning connections into opportunities and relationships into strategic advantage.',
    outcomes: [
      'Go beyond networking to strategic relationship building',
      'Turn connections into opportunities',
      'Understand the power of being in the right rooms',
      'Monetise your social capital',
      'Build networks that open doors and move decisions',
    ],
  },
  {
    id: 'digital-presence',
    placeholder: true,
    title: 'The Intentional Digital Presence',
    category: 'Personal Branding',
    format: '[Online, live]',
    duration: '[4 sessions]',
    status: 'coming-soon',
    summary:
      'Build a personal brand that feels unmistakably you, and works as hard as you do. A structured journey from clarity to visibility.',
    outcomes: [
      'Define a clear, credible personal positioning',
      'Craft a signature story and point of view',
      'Plan content that builds trust, not noise',
      'Present yourself with confidence across platforms',
    ],
  },
  {
    id: 'leading-change',
    placeholder: true,
    title: 'Leading Through Digital Change',
    category: 'Leadership',
    format: '[Online or in-person]',
    duration: '[Half-day intensive]',
    status: 'coming-soon',
    summary:
      'For managers and emerging leaders guiding teams through new tools, new ways of working and new expectations.',
    outcomes: [
      'Understand the human side of transformation',
      'Communicate change with clarity and empathy',
      'Build momentum and reduce resistance',
    ],
  },
  {
    id: 'future-ready',
    placeholder: true,
    title: 'Future-Ready: Skills for the New World of Work',
    category: 'Future of Work',
    format: '[Self-paced]',
    duration: '[6 modules]',
    status: 'coming-soon',
    summary:
      'A practical foundation in the mindsets and digital fluency that will define tomorrow’s most valued professionals.',
    outcomes: [
      'Identify the skills that will matter most',
      'Build a personal learning roadmap',
      'Use digital tools with confidence and judgement',
    ],
  },
  {
    id: 'founder-voice',
    placeholder: true,
    title: 'The Founder’s Voice',
    category: 'Entrepreneurship',
    format: '[Cohort-based]',
    duration: '[3 weeks]',
    status: 'coming-soon',
    summary:
      'For founders and entrepreneurs ready to become the most compelling advocate for the thing they are building.',
    outcomes: [
      'Articulate your vision in a sentence',
      'Pitch and speak with authority',
      'Turn thought leadership into opportunity',
    ],
  },
]

export const masterclassStatus = {
  'coming-soon': 'Coming soon',
  enquire: 'Booking by enquiry',
  open: 'Enrolment open',
  waitlist: 'Join the waitlist',
}
