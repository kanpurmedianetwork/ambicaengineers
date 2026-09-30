const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped_pages.json'), 'utf8'));

function analyzePageImagesAndCaptions(urlSuffix) {
  const p = pages.find(x => x.url.endsWith(urlSuffix) || x.url.endsWith(urlSuffix + '/'));
  if (!p) {
    console.log(`Page not found: ${urlSuffix}`);
    return;
  }
  console.log(`\n========================================`);
  console.log(`PAGE: ${urlSuffix} (Title: ${p.title})`);
  console.log(`Images found: ${p.images.length}`);
  p.images.forEach((img, i) => {
    console.log(`[${i + 1}] ${img}`);
  });
}

analyzePageImagesAndCaptions('/blank-9'); // Polyhydron pumps
analyzePageImagesAndCaptions('/blank-10'); // Polyhydron valves
analyzePageImagesAndCaptions('/blank-11'); // Nachi products
analyzePageImagesAndCaptions('/blank-12'); // Nachi valves
analyzePageImagesAndCaptions('/blank-13'); // Huade pumps
analyzePageImagesAndCaptions('/blank-15'); // Voith pumps
analyzePageImagesAndCaptions('/blank-24'); // Cushion pads
analyzePageImagesAndCaptions('/blank-38'); // IndiaWood 2026
