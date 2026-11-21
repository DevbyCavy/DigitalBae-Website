// Global site configuration. Edit freely: no layout code needs to change.
// Anything flagged `placeholder: true` (or wrapped in [brackets]) is awaiting real information from the brand owner.

import { photo } from './media'

// Name and credential line as shown on the supplied ZTN Prime "Thriving Heels" interview. Confirm before launch.
export const owner = {
  name: 'Tafadzwa L. Gotora',
  credentials: 'Author, multi-award-winning digital marketer and speaker',
}

export const site = {
  name: 'Digital Bae',
  tagline: 'Bold Ideas. Digital Influence. Meaningful Impact.',
  description:
    'Digital Bae is a voice at the intersection of digital transformation, leadership, innovation and personal growth: speaker, educator, entrepreneur and professional voice.',
  url: import.meta.env.VITE_SITE_URL || 'https://www.example.com',
  defaultOgImage: '/images/og-image.jpg',
}

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Speaking', to: '/speaking' },
  { label: 'Masterclasses', to: '/masterclasses' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

// Supplied brand photography lives in source-media/images and is processed by `npm run optimize-images`,
// which writes web-sized copies to public/images and their sizes to media-manifest.json.
export const portraits = {
  seated: photo('portrait-seated', 'Tafadzwa L. Gotora, Digital Bae, seated in a tailored pink suit', 'Seated portrait'),
  full: photo('portrait-full', 'Full-length portrait of Tafadzwa L. Gotora in a tailored pink suit', 'Full-length portrait'),
  black: photo('portrait-black', 'Tafadzwa L. Gotora seated in a black suit on a leather lounge chair', 'Portrait in black'),
}

export const contact = {
  placeholder: true,
  email: 'hello@[yourdomain].com',
  bookingsEmail: 'bookings@[yourdomain].com',
  mediaEmail: 'press@[yourdomain].com',
  location: '[City, Country]',
  responseTime: '[Typical response time, e.g. within 3 working days]',
  representation: '[Agent / management contact, if applicable]',
}

export const enquiryCategories = [
  { value: 'speaking', label: 'Speaking' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'masterclasses', label: 'Masterclasses' },
  { value: 'media', label: 'Media' },
  { value: 'general', label: 'General Enquiries' },
]
