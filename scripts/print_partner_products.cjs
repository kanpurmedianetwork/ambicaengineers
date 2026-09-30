const fs = require('fs');
const path = require('path');

const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'scraped_pages.json'), 'utf8'));

const targets = ['/blank-11', '/blank-12', '/blank-13', '/blank-14', '/blank-15'];

targets.forEach(t => {
  const p = pages.find(x => x.url.endsWith(t) || x.url.endsWith(t + '/'));
  if (p) {
    console.log(`\n========================================`);
    console.log(`PAGE: ${t} | TITLE: ${p.title}`);
    console.log(`CONTENT:\n${p.contentSnippet}`);
  }
});
