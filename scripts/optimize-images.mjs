// Builds web-ready copies of every photo in source-media/images into public/images:
//   <name>.jpg (max 1600px) + <name>-800.webp + <name>-1600.webp
// and writes src/data/media-manifest.json (real widths/heights for srcset + layout).
// Resize + re-encode only: photographs are never cropped, filtered or retouched here.
// Usage: drop originals (clean kebab-case names) into source-media/images, then `npm run optimize-images`.
import sharp from 'sharp'
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, parse } from 'node:path'

const root = process.cwd()
const srcDir = join(root, 'source-media', 'images')
const outDir = join(root, 'public', 'images')
mkdirSync(outDir, { recursive: true })

const manifest = {}
for (const file of readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
  const name = parse(file).name
  const input = sharp(join(srcDir, file)).rotate()
  const meta = await input.clone().metadata()
  const variants = []
  for (const w of [800, 1600]) {
    const info = await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(outDir, `${name}-${w}.webp`))
    variants.push(`/images/${name}-${w}.webp ${info.width}w`)
  }
  const jpg = await input
    .clone()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(outDir, `${name}.jpg`))
  manifest[name] = { src: `/images/${name}.jpg`, srcSet: variants.join(', '), width: jpg.width, height: jpg.height }
  console.log(`${name}: ${meta.width}x${meta.height} -> ${jpg.width}x${jpg.height}`)
}

// Note: public/images/og-image.jpg (social preview) is a designed asset; this script does not touch it.

writeFileSync(join(root, 'src', 'data', 'media-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log('\nWrote src/data/media-manifest.json')
