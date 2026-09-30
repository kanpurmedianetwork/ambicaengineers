const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped_pages.json'), 'utf8'));
const images = JSON.parse(fs.readFileSync(path.join(__dirname, 'all_scraped_images.json'), 'utf8'));

console.log('=== PAGE MAP ANALYSIS ===');
const mappedPages = pages.filter(p => p.status === 200).map(p => ({
  url: p.url,
  slug: p.url.replace('https://www.ambicaengineers.in', '') || '/',
  title: p.title,
  h1: p.h1s[0] || '',
  h2s: p.h2s.slice(0, 3),
  imgsCount: p.imagesCount
}));

mappedPages.forEach(p => {
  console.log(`${p.slug} | Title: "${p.title}" | H1: "${p.h1}" | Imgs: ${p.imgsCount}`);
});

console.log('\n=== TOTAL UNIQUE IMAGES ===', images.length);
const imagesWithAlts = images.filter(img => img.alt);
console.log('Images with alt text:', imagesWithAlts.length);
imagesWithAlts.slice(0, 20).forEach(img => {
  console.log(`- Alt: "${img.alt}" -> ${img.rawUrl.substring(img.rawUrl.lastIndexOf('/') + 1)} (used in ${img.pages.length} pages)`);
});
