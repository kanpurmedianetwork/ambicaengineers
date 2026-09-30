const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped_pages.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'images', 'live_images_manifest.json'), 'utf8'));

// Helper to find images associated with a page URL
function getPageImages(pageUrl) {
  return manifest.filter(m => (m.pages || []).includes(pageUrl));
}

console.log('=== DETAILED CONTENT PARSING ===');

// 1. Check About Us
const aboutPage = pages.find(p => p.url.includes('/about-us'));
if (aboutPage) {
  console.log('\n--- ABOUT US PAGE ---');
  console.log('Title:', aboutPage.title);
  console.log('H1:', aboutPage.h1s);
  console.log('H2s:', aboutPage.h2s);
  console.log('H3s:', aboutPage.h3s);
  console.log('Snippet:', aboutPage.contentSnippet);
  console.log('Images:', getPageImages(aboutPage.url).map(i => i.localPath));
}

// 2. Check Contact Us (/blank-16)
const contactPage = pages.find(p => p.url.includes('/blank-16'));
if (contactPage) {
  console.log('\n--- CONTACT US PAGE ---');
  console.log('Title:', contactPage.title);
  console.log('Snippet:', contactPage.contentSnippet);
}

// 3. Check Cushion Pad (/blank-24 and /product-page/ceramic-flower-vase)
const cushionPage = pages.find(p => p.url.includes('/blank-24'));
const cushionProdPage = pages.find(p => p.url.includes('ceramic-flower-vase'));
console.log('\n--- CUSHION PAD PAGES ---');
if (cushionPage) {
  console.log('Blank-24 Title:', cushionPage.title);
  console.log('Blank-24 Snippet:', cushionPage.contentSnippet);
  console.log('Blank-24 Images:', getPageImages(cushionPage.url).map(i => i.localPath));
}
if (cushionProdPage) {
  console.log('Cushion Product Snippet:', cushionProdPage.contentSnippet);
}

// 4. Check Events (/blank-38, /blank-18, /blank-19, /blank-17, /projects)
console.log('\n--- EVENTS & EXHIBITIONS ---');
const eventSlugs = ['blank-38', 'blank-18', 'blank-19', 'blank-17', 'projects'];
eventSlugs.forEach(slug => {
  const p = pages.find(x => x.url.includes(slug));
  if (p) {
    const imgs = getPageImages(p.url);
    console.log(`[${slug}] Title: ${p.title} | Imgs: ${imgs.length} | Snippet: ${p.contentSnippet.substring(0, 200)}...`);
  }
});

// 5. Check Products & Pumps
console.log('\n--- PRODUCT CATALOG SECTIONS ---');
const pumpPages = pages.filter(p => p.url.includes('pump') || p.url.includes('blank-9') || p.url.includes('blank-36') || p.url.includes('blank-37') || p.url.includes('/blank') && !p.url.includes('blank-'));
pumpPages.forEach(p => {
  console.log(`Pump Page: ${p.url} -> Title: "${p.title}" | Imgs: ${p.imagesCount} | Snippet: ${p.contentSnippet.substring(0, 150)}...`);
});

// 6. Check Valves
console.log('\n--- VALVE CATALOG SECTIONS ---');
const valvePages = pages.filter(p => p.url.includes('valve') || p.url.includes('blank-10') || p.url.includes('blank-12') || p.url.includes('blank-14'));
valvePages.forEach(p => {
  console.log(`Valve Page: ${p.url} -> Title: "${p.title}" | Imgs: ${p.imagesCount} | Snippet: ${p.contentSnippet.substring(0, 150)}...`);
});
