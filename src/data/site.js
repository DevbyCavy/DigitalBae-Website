// Global site configuration. Edit freely: no layout code needs to change.
// Anything flagged `placeholder: true` (or wrapped in [brackets]) is awaiting real information from the brand owner.

import { photo } from './media'

// Name as confirmed by the brand owner. Positioning: strategic digital marketing executive, speaker and strategist.
export const owner = {
  name: 'Taffy L. Gotora',
  credentials: 'Strategic digital marketing executive, author, speaker and multi-award-winning strategist',
}

export const site = {
  name: 'Digital Bae',
  tagline: 'Where Digital Intelligence Meets Strategic Influence.',
  description:
    'Digital Bae is the platform of Taffy L. Gotora: helping people and organisations build relevance, command visibility, cultivate influence and turn intelligence and relationships into opportunity.',
  url: import.meta.env.VITE_SITE_URL || 'https://www.example.com',
  defaultOgImage: '/images/og-image.jpg',
}

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Influence', to: '/influence' },
  { label: 'Speaking', to: '/speaking' },
  { label: 'Masterclasses', to: '/masterclasses' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

// Supplied brand photography lives in source-media/images and is processed by `npm run optimize-images`,
// which writes web-sized copies to public/images and their sizes to media-manifest.json.
export const portraits = {
  seated: photo('portrait-seated', 'Taffy L. Gotora, Digital Bae, seated in a tailored pink suit', 'Seated portrait'),
  full: photo('portrait-full', 'Full-length portrait of Taffy L. Gotora in a tailored pink suit', 'Full-length portrait'),
  black: photo('portrait-black', 'Taffy L. Gotora seated in a black suit on a leather lounge chair', 'Portrait in black'),
}

// One inbox for every kind of enquiry. Optional fields are hidden on the site while empty.
export const contact = {
  email: 'hello@digitalbae.online',
  location: '', // e.g. 'Harare, Zimbabwe'. Leave empty to hide it.
  responseTime: '', // e.g. 'We reply within 3 working days'
  representation: '', // agent / management contact, if any
}

export const enquiryCategories = [
  { value: 'speaking', label: 'Speaking' },
  { value: 'advisory', label: 'Executive Advisory' },
  { value: 'training', label: 'Corporate Training' },
  { value: 'masterclasses', label: 'Masterclasses' },
  { value: 'partnerships', label: 'Partnerships & Collaborations' },
  { value: 'media', label: 'Media' },
  { value: 'general', label: 'General Enquiries' },
]
