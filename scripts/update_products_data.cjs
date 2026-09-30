const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'infrastructure', 'data', 'products.data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace image URLs with authentic live WebP images
const replacements = [
  {
    from: "imageUrl: '/images/products/cushion-pad-mesh.jpg'",
    to: "imageUrl: '/images/products/cushion-pad-silicon-copper.webp'"
  },
  {
    from: "imageUrl: '/images/products/wood-panel-press.webp'",
    to: "imageUrl: '/images/products/cushion-pad-detail.webp'"
  },
  {
    from: "imageUrl: '/images/products/a10vso-pump.png'",
    to: "imageUrl: '/images/products/rexroth-a10vso.webp'"
  },
  {
    from: "imageUrl: '/images/products/a4vso-pump.png'",
    to: "imageUrl: '/images/products/rexroth-a4vso.webp'"
  },
  {
    from: "imageUrl: '/images/products/a7vo-pump.png'",
    to: "imageUrl: '/images/products/rexroth-a7vo.webp'"
  },
  {
    from: "imageUrl: '/images/products/a8v-pump.png'",
    to: "imageUrl: '/images/products/huade-a8v.webp'"
  },
  {
    from: "imageUrl: '/images/products/a2f-pump.png'",
    to: "imageUrl: '/images/products/huade-a2f.webp'"
  },
  {
    from: "imageUrl: '/images/products/radial-piston-pump.png'",
    to: "imageUrl: '/images/products/polyhydron-1r-2r.webp'"
  },
  {
    from: "imageUrl: '/images/products/nachi-piston-pump.png'",
    to: "imageUrl: '/images/products/nachi-pvs.webp'"
  },
  {
    from: "imageUrl: '/images/products/a2fo-pump.png'",
    to: "imageUrl: '/images/products/voith-ipv.webp'"
  },
  {
    from: "imageUrl: '/images/products/hydraulic-motor-fixed.png'",
    to: "imageUrl: '/images/products/hydraulic-radial-motor.webp'"
  },
  {
    from: "imageUrl: '/images/products/hydraulic-motor-variable.png'",
    to: "imageUrl: '/images/products/hydraulic-vane-motor.webp'"
  },
  {
    from: "imageUrl: '/images/products/nachi-solenoid-valve.png'",
    to: "imageUrl: '/images/products/nachi-ss-g01-solenoid.webp'"
  },
  {
    from: "imageUrl: '/images/products/modular-valve.png'",
    to: "imageUrl: '/images/products/nachi-modular-valve.webp'"
  },
  {
    from: "imageUrl: '/images/products/proportional-valve.png'",
    to: "imageUrl: '/images/products/polyhydron-de06-directional.webp'"
  }
];

replacements.forEach(r => {
  if (content.includes(r.from)) {
    content = content.replace(r.from, r.to);
    console.log(`Replaced: ${r.from} -> ${r.to}`);
  } else {
    console.warn(`Not found: ${r.from}`);
  }
});

fs.writeFileSync(filePath, content);
console.log('Updated products.data.ts successfully!');
