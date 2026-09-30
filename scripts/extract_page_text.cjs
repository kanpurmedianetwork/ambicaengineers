const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped_pages.json'), 'utf8'));

pages.forEach(p => {
  if (p.status !== 200) return;
  const slug = p.url.replace('https://www.ambicaengineers.in', '') || '/';
  
  // Cut off common header: "top of page HOME ABOUT US..."
  let content = p.contentSnippet;
  const navIdx = content.indexOf('PRODUCTS');
  if (navIdx !== -1) {
    const brandsIdx = content.indexOf('VOITH', navIdx);
    if (brandsIdx !== -1) {
      content = content.substring(brandsIdx + 5);
    }
  }

  // Remove common footer if present
  const footerIdx = content.indexOf('Ambica Engineers Pvt. Ltd.');
  if (footerIdx !== -1) {
    content = content.substring(0, footerIdx);
  }

  content = content.trim();
  if (content.length > 20) {
    console.log(`\n========================================`);
    console.log(`PAGE: ${slug} | TITLE: ${p.title}`);
    console.log(`HEADINGS: H1: ${p.h1s.join(' | ')} | H2: ${p.h2s.join(' | ')} | H3: ${p.h3s.join(' | ')}`);
    console.log(`CONTENT: ${content.substring(0, 400)}...`);
  }
});
