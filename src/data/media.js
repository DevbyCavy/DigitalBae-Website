// Supplied photography and video. Captions describe only what is visible in each photo or video;
// anything not visible (dates, exact roles, award names) is marked "to confirm".
import manifest from './media-manifest.json'

/** Look up a processed photo by name (see scripts/optimize-images.mjs). */
export function photo(name, alt, label = '') {
  const m = manifest[name]
  if (!m) return { src: '', alt, label } // falls back to the branded placeholder frame
  return { ...m, alt, label }
}

// Stage and panel photography, used in the Speaking gallery and on the homepage.
export const eventPhotos = [
  {
    id: 'ad-day-zambia',
    image: photo('event-ad-day-zambia', 'Tafadzwa speaking at a podium on stage at AD-Day Zambia, presented by Africast'),
    event: 'AD-Day Zambia',
    detail: 'Presented by Africast',
    role: 'Speaker',
  },
  {
    id: 'imm-2024',
    image: photo('event-imm-2024', 'Tafadzwa addressing the audience with a microphone at the Institute of Marketing in Malawi 2024 conference'),
    event: 'Institute of Marketing in Malawi',
    detail: '2024 Marketers Conference & Excellence Awards',
    role: 'Speaker',
  },
  {
    id: 'zimtrade',
    image: photo('event-zimtrade-panel', 'Tafadzwa speaking on a panel at a ZimTrade exporting event'),
    event: 'ZimTrade',
    detail: 'Exporting panel discussion',
    role: 'Panellist',
  },
  {
    id: 'women-financial-markets',
    image: photo('event-women-financial-markets', 'Speaking on a panel at the Women in Financial Markets Conference'),
    event: 'Women in Financial Markets Conference',
    detail: 'Panel discussion',
    role: 'Panellist',
  },
  {
    id: 'imm-podium',
    image: photo('event-imm-podium', 'Tafadzwa at the podium at Sunbird Nkopola Lodge during the Institute of Marketing in Malawi conference'),
    event: 'IMM Conference, Sunbird Nkopola Lodge',
    detail: 'Innovate: leveraging technology',
    role: 'Speaker',
  },
  {
    id: 'ai-talk',
    image: photo('event-ai-talk', 'Presenting a talk titled "The AI Revolution Will Not Replace You" to a seated audience'),
    event: '“The AI Revolution Will Not Replace You”',
    detail: 'Talk on AI and human potential',
    role: 'Talk',
  },
]

export const recognition = {
  evening: photo('awards-evening', 'Tafadzwa holding an award at an awards evening, standing with two guests'),
  shelf: photo('awards-shelf', 'A shelf of framed certificates and award trophies'),
}

// Videos are served from /public/media. preload="none" keeps them from loading until played.
export const videos = [
  {
    id: 'ztn-interview',
    src: '/media/ztn-thriving-heels-interview.mp4',
    poster: '/media/ztn-thriving-heels-interview-poster.jpg',
    title: 'In conversation on “Thriving Heels”',
    source: 'ZTN Prime · DStv Channel 294',
    kind: 'Television interview',
    duration: '1:37',
  },
  {
    id: 'imm-awards-2025',
    src: '/media/imm-excellence-awards-2025.mp4',
    poster: '/media/imm-excellence-awards-2025-poster.jpg',
    title: '5th IMM Conference & Marketing Excellence Awards',
    source: 'Institute of Marketing in Malawi · 2025',
    kind: 'On stage',
    duration: '1:54',
  },
]

// Homepage background loop: a cropped, slowed, silent clip of the stage at the
// 5th IMM Conference & Marketing Excellence Awards (from the supplied video).
export const heroVideo = {
  src: '/media/hero-stage.webm',
  poster: '/media/hero-stage-poster.jpg',
}

// "As seen at" ticker on the homepage: events and media shown in the supplied material.
export const seenAt = [
  'AD-Day Zambia',
  'Institute of Marketing in Malawi',
  'IMM Marketing Excellence Awards 2025',
  'ZimTrade',
  'Women in Financial Markets Conference',
  'ZTN Prime · Thriving Heels',
]
