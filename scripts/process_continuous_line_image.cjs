const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const src = 'C:/Users/pc/.gemini/antigravity/brain/0e92dddf-40c8-4a76-ae76-a040eea51692/.user_uploaded/media_1790765148762.png';

const destinations = [
  'C:/Users/pc/Desktop/ambica-engineers/public/images/products/continuous-line-machinery.webp',
  'C:/Users/pc/Desktop/ambica-engineers/public/images/products/continuous-line-machinery.jpg',
  'C:/Users/pc/.gemini/antigravity/scratch/ambica-engineers/public/images/products/continuous-line-machinery.webp',
  'C:/Users/pc/.gemini/antigravity/scratch/ambica-engineers/public/images/products/continuous-line-machinery.jpg',
  'C:/Users/pc/Desktop/ambica-engineers/dist/images/products/continuous-line-machinery.webp',
  'C:/Users/pc/Desktop/ambica-engineers/dist/images/products/continuous-line-machinery.jpg'
];

async function main() {
  if (!fs.existsSync(src)) {
    console.error('Source does not exist:', src);
    process.exit(1);
  }

  const meta = await sharp(src).metadata();
  console.log(`Input image: ${meta.width}x${meta.height}, format: ${meta.format}, size: ${fs.statSync(src).size} bytes`);

  const webpBuffer = await sharp(src)
    .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, effort: 4 })
    .toBuffer();

  const jpgBuffer = await sharp(src)
    .resize(1200, 900, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();

  for (const dest of destinations) {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (dest.endsWith('.webp')) {
      fs.writeFileSync(dest, webpBuffer);
      console.log(`Saved: ${dest} (${Math.round(webpBuffer.length / 1024)} KB)`);
    } else {
      fs.writeFileSync(dest, jpgBuffer);
      console.log(`Saved: ${dest} (${Math.round(jpgBuffer.length / 1024)} KB)`);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
