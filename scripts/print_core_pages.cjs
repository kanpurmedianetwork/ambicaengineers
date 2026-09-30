const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped_pages.json'), 'utf8'));

const targets = ['/about-us', '/blank-38', '/blank-9', '/blank-10', '/blank'];

targets.forEach(t => {
  const p = pages.find(x => x.url.endsWith(t) || x.url.endsWith(t + '/'));
  if (p) {
    console.log(`\n========================================`);
    console.log(`FULL TEXT FOR: ${t}`);
    console.log(`TITLE: ${p.title}`);
    console.log(`CONTENT:\n${p.contentSnippet}`);
  }
});
