const fs = require('fs');
const path = require('path');
const { domain, allRoutes } = require('./routes.cjs');

const distDir = path.join(__dirname, '../dist');

console.log('========================================================================');
console.log('       SSG PRERENDER VERIFICATION AUDIT (PHASE 1 & 2 VERIFICATION)      ');
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

  const passed = titlePass && descPass && canonPass && h1Pass && bodyTextPass && !hasKeywords;

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
  'Body'.padEnd(8) +
  'Status'
);
console.log('-'.repeat(94));

let failCount = 0;
results.forEach((r) => {
  if (r.overall !== 'PASS') failCount++;
  const titleCol = (r.titlePass ? `${r.titleLen}c ✓` : `${r.titleLen}c ✗`).padEnd(8);
  const descCol = (r.descPass ? `${r.descLen}c ✓` : `${r.descLen}c ✗`).padEnd(8);
  const canonCol = (r.canonPass ? '✓' : '✗').padEnd(8);
  const h1Col = (r.h1Pass ? `1 ✓` : `${r.h1Count} ✗`).padEnd(6);
  const bodyCol = (r.bodyTextPass ? '✓' : '✗').padEnd(8);
  const statusCol = r.overall === 'PASS' ? '✓ PASS' : '✗ FAIL';
  console.log(r.path.padEnd(48) + titleCol + descCol + canonCol + h1Col + bodyCol + statusCol);
});

console.log('-'.repeat(94));
console.log(`Summary: ${results.length - failCount}/${results.length} routes passed all SEO audits.`);

if (failCount > 0) {
  console.error(`Verification FAILED for ${failCount} route(s).`);
  process.exit(1);
}

console.log('\n========================================================================');
console.log('       DEEP BODY GREP VERIFICATION (5 SAMPLE PRODUCT / BRAND ROUTES)    ');
console.log('========================================================================\n');

const deepGrepChecks = [
  {
    path: '/products/bosch-rexroth-a10vso-axial-piston-pump',
    file: 'dist/products/bosch-rexroth-a10vso-axial-piston-pump/index.html',
    terms: ['A10VSO', 'Displacement', '350 bar', 'Axial Piston'],
  },
  {
    path: '/products/bosch-rexroth-a4vso-heavy-duty-pump',
    file: 'dist/products/bosch-rexroth-a4vso-heavy-duty-pump/index.html',
    terms: ['A4VSO', '400 bar', 'swashplate', 'Heavy-Duty'],
  },
  {
    path: '/products/polyhydron-1r-2r-radial-piston-pump',
    file: 'dist/products/polyhydron-1r-2r-radial-piston-pump/index.html',
    terms: ['1R', '2R', 'Radial Piston', 'Polyhydron'],
  },
  {
    path: '/products/cushion-pad-silicon-copper',
    file: 'dist/products/cushion-pad-silicon-copper/index.html',
    terms: ['Cushion Pad', 'Silicone', 'Copper', 'Short Cycle Hot Press'],
  },
  {
    path: '/brands/rexroth',
    file: 'dist/brands/rexroth/index.html',
    terms: ['Bosch Rexroth', 'Certified Sourcing Partner', 'A10VSO', 'Germany'],
  },
];

deepGrepChecks.forEach((check) => {
  const fullPath = path.join(__dirname, '..', check.file);
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`Checking route: ${check.path}`);
  check.terms.forEach((term) => {
    const present = content.includes(term);
    console.log(`  - Spec term [${term}]: ${present ? '✓ FOUND IN HTML BODY' : '✗ MISSING'}`);
    if (!present) {
      console.error(`Missing spec term "${term}" in ${check.file}`);
      process.exit(1);
    }
  });
});

console.log('\n✓ All 5 deep body grep verifications passed with 100% precision.');
