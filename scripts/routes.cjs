const fs = require('fs');
const path = require('path');

const domain = 'https://www.ambicaengineers.in';

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper to sanitize title so its escaped form is <= 60 chars
function sanitizeTitle(title) {
  if (!title) return 'Ambica Engineers | Hydraulic Components & Spares';
  let t = title.trim();
  if (escapeHtml(t).length <= 60) return t;
  while (escapeHtml(t).length > 60) {
    t = t.slice(0, t.length - 1).trim();
  }
  return t;
}

// Helper to sanitize description so its escaped form is <= 155 chars
function sanitizeDescription(desc) {
  if (!desc) return 'Ambica Engineers: Supplier of hydraulic pumps, valves, motors, European cushion pads, and wood panel machinery since 1982.';
  let d = desc.trim();
  if (escapeHtml(d).length <= 155) return d;
  while (escapeHtml(d).length > 155) {
    const lastSpace = d.lastIndexOf(' ');
    d = (lastSpace > 100 ? d.slice(0, lastSpace) : d.slice(0, d.length - 1)).trim();
  }
  return d;
}

// 1. Static Pages
const staticRoutes = [
  {
    path: '/',
    title: 'Ambica Engineers | Hydraulic Components & Spares',
    description: 'Ambica Engineers & Lubricants: Supplier of hydraulic pumps, valves, motors, European cushion pads, and wood panel machinery since 1982. Fast dispatch.',
    image: `${domain}/images/og-image.jpg`,
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/about-us',
    title: 'About Us | Ambica Engineers & Lubricants',
    description: 'Ambica Engineers & Lubricants: Founded 1982. Trusted supplier of Rexroth, Polyhydron, Nachi hydraulics and European wood panel machinery across India.',
    image: `${domain}/images/about/team-facility.webp`,
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/products',
    title: 'Hydraulic Products & Spares | Ambica Engineers',
    description: 'Catalog of Rexroth, Polyhydron, Nachi, Huade hydraulic pumps, valves, cylinders, industrial lubricants, and European cushion pads. In-stock spares.',
    image: `${domain}/images/og-image.jpg`,
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/brands',
    title: 'Hydraulic Brand Partners & Stockist | Ambica',
    description: 'Genuine hydraulic brands stocked by Ambica Engineers: Bosch Rexroth, Polyhydron, Nachi, Huade, Voith, and Veljan with rapid nationwide dispatch in India.',
    image: `${domain}/images/og-image.jpg`,
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/solutions/wood-panel',
    title: 'Wood Panel & MDF Solutions | Ambica Engineers',
    description: 'European silicone cushion pads, hot press spare parts, and continuous production machinery for MDF, particle board, and laminate plants.',
    image: `${domain}/images/products/cushion-pad-silicon-copper.webp`,
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/events',
    title: 'Events & Industrial Expos | Ambica Engineers',
    description: 'Explore Ambica Engineers & Lubricants Ltd trade fairs, industry exhibitions, and summit participations across South Asia.',
    image: `${domain}/images/events/indiawood_2026_01.webp`,
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    title: 'Contact Us | Ambica Engineers & Lubricants',
    description: 'Get in touch with Ambica Engineers & Lubricants Ltd. Request quotation, technical assistance, or branch office directions.',
    image: `${domain}/images/og-image.jpg`,
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Ambica Engineers & Lubricants',
    description: 'Privacy policy, terms of service, and corporate governance for Ambica Engineers & Lubricants Ltd.',
    image: `${domain}/images/og-image.jpg`,
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/404',
    title: 'Page Not Found (404) | Ambica Engineers',
    description: 'The page you requested does not exist or has been moved. Explore our hydraulic components catalog or contact Ambica Engineers.',
    image: `${domain}/images/og-image.jpg`,
    priority: '0.1',
    changefreq: 'yearly',
    is404: true,
  },
];

// 2. Brand Pages
const brandSeoMap = {
  rexroth: {
    title: 'Bosch Rexroth Hydraulics | Ambica Engineers',
    description: 'Genuine Bosch Rexroth axial piston pumps, bent-axis motors, and proportional valves. Certified sourcing partner in India with immediate dispatch.',
  },
  polyhydron: {
    title: 'Polyhydron Pumps & Valves | Ambica Engineers',
    description: 'Direct stockist for Polyhydron radial piston pumps, check valves, and cartridge logic systems. High-pressure hydraulic spares in India.',
  },
  nachi: {
    title: 'Nachi Hydraulic Pumps & Valves | Ambica Engineers',
    description: 'Nachi Fujikoshi precision variable displacement piston pumps, wet-type solenoid valves, and modular valves in India with complete technical support.',
  },
  huade: {
    title: 'Huade Hydraulic Pumps & Valves | Ambica Engineers',
    description: 'Authorized importer and stockist for Huade hydraulic pumps and directional control valves manufactured under licensed German precision technology.',
  },
  voith: {
    title: 'Voith High-Pressure Pumps | Ambica Engineers',
    description: 'Voith Turbo internal gear high-pressure hydraulic pumps with ultra-low noise emissions and superior volumetric efficiency for industrial presses.',
  },
  veljan: {
    title: 'Veljan Vane Pumps & Spares | Ambica Engineers',
    description: 'Direct stockist for Veljan and Sarva high-performance industrial vane pumps and replacement cartridges with rapid factory dispatch across India.',
  },
};

const brandsDataFile = path.join(__dirname, '../src/infrastructure/data/brands.data.ts');
const brandsContent = fs.readFileSync(brandsDataFile, 'utf8');
const brandIdRegex = /id:\s*['"]([^'"]+)['"]/g;
const brandIds = [];
let bMatch;
while ((bMatch = brandIdRegex.exec(brandsContent)) !== null) {
  if (!brandIds.includes(bMatch[1])) {
    brandIds.push(bMatch[1]);
  }
}

const brandRoutes = brandIds.map((id) => {
  const meta = brandSeoMap[id] || {
    title: `${id.toUpperCase()} Hydraulics | Ambica Engineers`,
    description: `Genuine ${id} components, hydraulic systems, and spare parts in India.`,
  };
  return {
    path: `/brands/${id}`,
    title: sanitizeTitle(meta.title),
    description: sanitizeDescription(meta.description),
    image: `${domain}/images/og-image.jpg`,
    priority: '0.8',
    changefreq: 'monthly',
  };
});

// 3. Product Pages
const productsDataFile = path.join(__dirname, '../src/infrastructure/data/products.data.ts');
const productsContent = fs.readFileSync(productsDataFile, 'utf8');

// Parse products accurately
const productBlocks = productsContent.split(/id:\s*['"]prod-/);
const productRoutes = [];

productBlocks.slice(1).forEach((block) => {
  const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
  const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
  const brandMatch = block.match(/brand:\s*['"]([^'"]+)['"]/);
  const seriesMatch = block.match(/series:\s*['"]([^'"]+)['"]/);
  const shortDescMatch = block.match(/shortDescription:\s*['"]([^'"]+)['"]/);
  const imageMatch = block.match(/imageUrl:\s*['"]([^'"]+)['"]/);

  if (slugMatch) {
    const slug = slugMatch[1];
    const name = nameMatch ? nameMatch[1] : slug;
    const brand = brandMatch ? brandMatch[1].toUpperCase() : 'HYDRAULIC';
    const series = seriesMatch ? seriesMatch[1] : '';
    const shortDesc = shortDescMatch ? shortDescMatch[1] : '';
    const rawImg = imageMatch ? (imageMatch[1].startsWith('http') ? imageMatch[1] : `${domain}${imageMatch[1]}`) : `${domain}/images/og-image.jpg`;
    const img = rawImg.toLowerCase().endsWith('.svg') ? `${domain}/images/og-image.jpg` : rawImg;

    // Title <= 60 chars (checking escaped length)
    let title = `${name} | Ambica Engineers`;
    if (escapeHtml(title).length > 60) {
      const compactTitle = `${brand} ${series || name} | Ambica Engineers`;
      title = escapeHtml(compactTitle).length <= 60 ? compactTitle : title;
    }
    title = sanitizeTitle(title);

    // Description <= 155 chars
    let desc = shortDesc
      ? `${shortDesc} In stock at Ambica Engineers with immediate dispatch.`
      : `${name} (${series}) from ${brand}. Genuine industrial supply with technical support across India.`;
    desc = sanitizeDescription(desc);

    productRoutes.push({
      path: `/products/${slug}`,
      title: title,
      description: desc,
      image: img,
      priority: '0.8',
      changefreq: 'weekly',
    });
  }
});

const allRoutes = [...staticRoutes, ...brandRoutes, ...productRoutes];

function getCanonicalRoutes() {
  return allRoutes.filter((r) => !r.is404);
}

module.exports = {
  domain,
  allRoutes,
  getCanonicalRoutes,
  staticRoutes,
  brandRoutes,
  productRoutes,
  sanitizeTitle,
  sanitizeDescription,
  escapeHtml,
};
