const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const src = 'C:/Users/pc/.gemini/antigravity/brain/0e92dddf-40c8-4a76-ae76-a040eea51692/.user_uploaded/media_1790753387835.jpg';

const destPaths = [
  'C:/Users/pc/Desktop/ambica-engineers/public/images/products/cushion-pad-silicon-copper.webp',
  'C:/Users/pc/Desktop/ambica-engineers/public/images/products/cushion-pad-detail.webp',
  'C:/Users/pc/.gemini/antigravity/scratch/ambica-engineers/public/images/products/cushion-pad-silicon-copper.webp',
  'C:/Users/pc/.gemini/antigravity/scratch/ambica-engineers/public/images/products/cushion-pad-detail.webp'
];

async function main() {
  if (!fs.existsSync(src)) {
    console.error('Source does not exist:', src);
    process.exit(1);
  }

  const meta = await sharp(src).metadata();
  console.log('Original image:', meta.width, 'x', meta.height, 'size:', fs.statSync(src).size, 'bytes');

  // Generate 1000px high quality webp
  const webpBuffer = await sharp(src)
    .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 90, effort: 4 })
    .toBuffer();

  for (const dest of destPaths) {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dest, webpBuffer);
    console.log('Saved:', dest, '(', Math.round(webpBuffer.length / 1024), 'KB)');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
