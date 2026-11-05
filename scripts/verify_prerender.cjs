const fs = require('fs');
const path = require('path');
const { domain, allRoutes } = require('./routes.cjs');

const distDir = path.join(__dirname, '../dist');

console.log('========================================================================');
console.log('       SSG PRERENDER VERIFICATION AUDIT (PHASES 1, 2 & 3 AUDIT)        ');
console.log('========================================================================\n');

const results = [];
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const route of allRoutes) {
  let filePath;
  if (route.path === '/') {
    filePath = path.join(distDir, 'index.html');
  } else if (route.is404) {
    filePath = path.join(distDir, '404.html');
  } else {
    filePath = path.join(distDir, route.path, 'index.html');
  }

  const exists = fs.existsSync(filePath);
  if (!exists) {
    results.push({
      path: route.path,
      exists: false,
      titlePass: false,
      descPass: false,
      canonPass: false,
      h1Count: 0,
      h1Pass: false,
      bodyTextPass: false,
      overall: 'FAIL (File Missing)',
    });
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Title Check
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  const titleUnique = !seenTitles.has(title);
  if (title) seenTitles.set(title, route.path);
  const titlePass = Boolean(title && title.length <= 60 && titleUnique);

  // 2. Description Check
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const desc = descMatch ? descMatch[1] : '';
  const descUnique = !seenDescriptions.has(desc);
  if (desc) seenDescriptions.set(desc, route.path);
  const descPass = Boolean(desc && desc.length <= 155 && descUnique);

  // 3. Canonical Check
  const expectedCanonical = `${domain}${route.path === '/' ? '/' : route.path}`;
  const canonMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1] : '';
  const canonPass = route.is404 ? true : canonical === expectedCanonical;

  // 4. H1 Check
  const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const h1Pass = h1Matches.length === 1;

  // 5. Body Text Check
  const rStart = content.indexOf('<div id="root">');
  const bEnd = content.indexOf('</body>', rStart);
  const rootInner = rStart !== -1 && bEnd !== -1 ? content.slice(rStart + 15, bEnd) : '';
  const textContent = rootInner.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const bodyTextPass = textContent.length > 200;

  // 6. Keywords tag check (must NOT exist)
  const hasKeywords = /<meta\s+name=["']keywords["']/i.test(content);

  // 7. Charset First Tag Check in <head>
  const headMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const headContent = headMatch ? headMatch[1].trim() : '';
  const charsetFirst = /^<meta\s+charset=["']utf-8["']/i.test(headContent);

  // 8. Mojibake Check
  const hasMojibake = /(\u0393[\s\S]{1,4}|â€|â€˜|â€™|â€œ|Ã[\x80-\xbf])/i.test(content);

  // 9. Root cleanliness (no meta or title inside <div id="root">)
  const hasMetaInRoot = /<meta\s+|<title>/i.test(rootInner);

  // 10. OG image not SVG
  const ogImgMatch = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
  const ogImg = ogImgMatch ? ogImgMatch[1] : '';
  const noSvgOg = !ogImg.toLowerCase().endsWith('.svg');

  const passed = titlePass && descPass && canonPass && h1Pass && bodyTextPass && !hasKeywords && charsetFirst && !hasMojibake && !hasMetaInRoot && noSvgOg;

  results.push({
    path: route.path,
    titleLen: title.length,
    descLen: desc.length,
    h1Count: h1Matches.length,
    bodyLen: textContent.length,
    titlePass,
    descPass,
    canonPass,
    h1Pass,
    bodyTextPass,
    noKeywords: !hasKeywords,
    charsetFirst,
    noMojibake: !hasMojibake,
    rootClean: !hasMetaInRoot,
    noSvgOg,
    overall: passed ? 'PASS' : 'FAIL',
  });
}

// Format console output table
console.log(
  'Route'.padEnd(48) +
  'Title'.padEnd(8) +
  'Desc'.padEnd(8) +
  'Canon'.padEnd(8) +
  'H1'.padEnd(6) +
  'Charset'.padEnd(9) +
  'Root'.padEnd(8) +
  'Status'
);
console.log(''.padEnd(100, '-'));

let failCount = 0;
for (const r of results) {
  if (r.overall !== 'PASS') failCount++;
  console.log(
    r.path.padEnd(48) +
    `${r.titleLen}c ${r.titlePass ? '✓' : '✗'}`.padEnd(8) +
    `${r.descLen}c ${r.descPass ? '✓' : '✗'}`.padEnd(8) +
    `${r.canonPass ? '✓' : '✗'}`.padEnd(8) +
    `${r.h1Count} ${r.h1Pass ? '✓' : '✗'}`.padEnd(6) +
    `${r.charsetFirst ? '✓' : '✗'}`.padEnd(9) +
    `${r.rootClean ? 'Clean' : '✗'}`.padEnd(8) +
    `${r.overall === 'PASS' ? '✓ PASS' : '✗ FAIL'}`
  );
}

console.log(''.padEnd(100, '-'));
console.log(`Summary: ${results.length - failCount}/${results.length} routes passed all SEO & crawlability audits.`);

if (failCount > 0) {
  console.error(`Verification FAILED for ${failCount} route(s).`);
  process.exit(1);
}

console.log('\n========================================================================');
console.log('       DEEP BODY GREP VERIFICATION (PRODUCT SPECS & IMAGES)             ');
console.log('========================================================================\n');

const deepGrepChecks = [
  {
    path: '/products/huade-ycy-axial-piston-pump',
    file: 'dist/products/huade-ycy-axial-piston-pump/index.html',
    terms: ['Huade', 'YCY', 'Axial Piston', '315 bar', '400 bar', 'cc/rev'],
  },

  {
    path: '/products/bosch-rexroth-a10vso-axial-piston-pump',
    file: 'dist/products/bosch-rexroth-a10vso-axial-piston-pump/index.html',
    terms: ['A10VSO', 'Displacement', '350 bar', 'Axial Piston', 'cc/rev'],
  },
  {
    path: '/products/bosch-rexroth-a4vso-heavy-duty-pump',
    file: 'dist/products/bosch-rexroth-a4vso-heavy-duty-pump/index.html',
    terms: ['A4VSO', '400 bar', 'swashplate', 'Heavy-Duty', 'cc/rev'],
  },
  {
    path: '/products/polyhydron-1r-2r-radial-piston-pump',
    file: 'dist/products/polyhydron-1r-2r-radial-piston-pump/index.html',
    terms: ['1R', '2R', 'Radial Piston', 'Polyhydron', 'cc/rev'],
  },
  {
    path: '/',
    file: 'dist/index.html',
    terms: ['Frequently Asked Questions', 'FAQPage', 'Bosch Rexroth', 'Polyhydron'],
  },
  {
    path: '/brands/rexroth',
    file: 'dist/brands/rexroth/index.html',
    terms: ['Bosch Rexroth', 'Certified Sourcing Partner', 'A10VSO', 'Germany', 'FAQPage', 'Bosch Rexroth Frequently Asked Questions'],
  },
  {
    path: '/products/cushion-pad-silicon-copper',
    file: 'dist/products/cushion-pad-silicon-copper/index.html',
    terms: ['Cushion Pad', 'Silicone', 'Copper', 'Short Cycle Hot Press', 'FAQPage', 'European Cushion Pads Technical FAQ'],
  },
  {
    path: '/solutions/wood-panel',
    file: 'dist/solutions/wood-panel/index.html',
    terms: ['WOOD PANEL &amp; MDF MANUFACTURING SOLUTIONS', 'FAQPage', 'Wood Panel &amp; Cushion Pads Technical FAQ'],
  },
  {
    path: '/brands',
    file: 'dist/brands/index.html',
    terms: ['AUTHORIZED &amp; CERTIFIED BRAND PARTNERS', 'Bosch Rexroth', 'Polyhydron', 'Nachi Fujikoshi', 'Huade Hydraulic', 'Voith Turbo', 'Veljan'],
  },
  {
    path: '/products/proportional-servo-directional-valve',
    file: 'dist/products/proportional-servo-directional-valve/index.html',
    terms: ['proportional-valve.png', 'OBE Proportional Series'],
    forbidden: ['polyhydron-de06-directional.webp'],
  },
];

deepGrepChecks.forEach((check) => {
  const fullPath = path.join(__dirname, '..', check.file);
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`Checking route: ${check.path}`);
  check.terms.forEach((term) => {
    const present = content.includes(term);
    console.log(`  - Expected term [${term}]: ${present ? '✓ FOUND' : '✗ MISSING'}`);
    if (!present) {
      console.error(`Missing expected term "${term}" in ${check.file}`);
      process.exit(1);
    }
  });
  if (check.forbidden) {
    check.forbidden.forEach((term) => {
      const present = content.includes(term);
      console.log(`  - Forbidden term [${term}]: ${!present ? '✓ NOT FOUND' : '✗ PRESENT'}`);
      if (present) {
        console.error(`Forbidden term "${term}" found in ${check.file}`);
        process.exit(1);
      }
    });
  }
});

console.log('\n✓ All deep body grep verifications passed with 100% precision.');
