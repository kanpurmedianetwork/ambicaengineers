const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const desktopPublic = path.join(__dirname, '..', 'public');
const scratchPublic = 'C:\\Users\\pc\\.gemini\\antigravity\\scratch\\ambica-engineers\\public';

const productsMap = [
  // Wood Panel & Cushion Pads
  {
    src: 'images/live/cushion_pads/cushion_pad_181.jpg',
    dest: 'images/products/cushion-pad-silicon-copper.webp',
    width: 800,
    fit: 'cover'
  },
  {
    src: 'images/live/cushion_pads/cushion_pads_55d98a_3287270d8_89.jpg',
    dest: 'images/products/cushion-pad-detail.webp',
    width: 1000,
    fit: 'cover'
  },
  // Rexroth Pumps
  {
    src: 'images/live/pumps/pumps_410b29_a44a06a68_169.png',
    dest: 'images/products/rexroth-a10vso.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_0ce6ae10b_168.png',
    dest: 'images/products/rexroth-a4vso.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_bc1b2f623_170.png',
    dest: 'images/products/rexroth-a7vo.webp',
    width: 800,
    fit: 'contain'
  },
  // Huade Pumps
  {
    src: 'images/live/pumps/pumps_410b29_9df082973_11.png',
    dest: 'images/products/huade-a8v.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_1510b4245_12.png',
    dest: 'images/products/huade-a10vso.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_7b288169e_13.png',
    dest: 'images/products/huade-a2f.webp',
    width: 800,
    fit: 'contain'
  },
  // Nachi Pumps
  {
    src: 'images/live/pumps/pumps_410b29_6578efe22_155.png',
    dest: 'images/products/nachi-pvs.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_048e7de24_156.png',
    dest: 'images/products/nachi-pzs.webp',
    width: 800,
    fit: 'contain'
  },
  // Polyhydron Pumps
  {
    src: 'images/live/pumps/pumps_410b29_a45f9e480_154.png',
    dest: 'images/products/polyhydron-1r-2r.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_856d00b9a_164.png',
    dest: 'images/products/polyhydron-11rc.webp',
    width: 800,
    fit: 'contain'
  },
  // Voith Pumps
  {
    src: 'images/live/pumps/pumps_410b29_ca66dee9a_18.png',
    dest: 'images/products/voith-ipv.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_4933b3569_19.png',
    dest: 'images/products/voith-iph.webp',
    width: 800,
    fit: 'contain'
  },
  // Veljan Pumps
  {
    src: 'images/live/pumps/pumps_410b29_3231e7021_171.png',
    dest: 'images/products/veljan-t6.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/pumps/pumps_410b29_b69876117_173.png',
    dest: 'images/products/veljan-t7.webp',
    width: 800,
    fit: 'contain'
  },
  // Polyhydron Valves
  {
    src: 'images/live/valves/valves_410b29_5dba4f6c9_90.png',
    dest: 'images/products/polyhydron-de06-directional.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/valves/valves_410b29_44881b301_91.png',
    dest: 'images/products/polyhydron-check-valve.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/valves/valves_410b29_97ae07af2_92.png',
    dest: 'images/products/polyhydron-cartridge-valve.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/valves/valves_410b29_0fb0b07ba_93.png',
    dest: 'images/products/polyhydron-pressure-valve.webp',
    width: 800,
    fit: 'contain'
  },
  // Nachi Valves
  {
    src: 'images/live/valves/valves_410b29_057530ada_133.png',
    dest: 'images/products/nachi-ss-g01-solenoid.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/valves/valves_410b29_9a807d443_134.png',
    dest: 'images/products/nachi-modular-valve.webp',
    width: 800,
    fit: 'contain'
  },
  // Huade Valves
  {
    src: 'images/live/valves/valves_410b29_81cb08db3_98.png',
    dest: 'images/products/huade-directional-valve.webp',
    width: 800,
    fit: 'contain'
  },
  // Motors
  {
    src: 'images/live/motors/motors_410b29_ec11b8a4f_129.png',
    dest: 'images/products/hydraulic-radial-motor.webp',
    width: 800,
    fit: 'contain'
  },
  {
    src: 'images/live/motors/motors_410b29_4a7e7705a_130.png',
    dest: 'images/products/hydraulic-vane-motor.webp',
    width: 800,
    fit: 'contain'
  }
];

// IndiaWood 2026 Event Photos (19 actual exhibition shots)
const eventRawFiles = [
  'images/live/events/events_410b29_622e7df60_70.jpeg',
  'images/live/events/events_410b29_cd62e3db8_71.jpg',
  'images/live/events/events_410b29_95b5419d9_72.jpg',
  'images/live/events/events_410b29_cbfff7e06_73.jpg',
  'images/live/events/events_410b29_35b312255_74.jpg',
  'images/live/events/events_410b29_2cb2369d0_75.jpg',
  'images/live/events/events_410b29_856c11a6e_76.jpg',
  'images/live/events/events_410b29_2c2b392af_77.jpg',
  'images/live/events/events_410b29_fba723aea_78.jpg',
  'images/live/events/events_410b29_bcb3f3de2_79.jpg',
  'images/live/events/events_410b29_2a97c3455_80.jpg',
  'images/live/events/events_410b29_6545f8521_81.jpg',
  'images/live/events/events_410b29_2ac6122f0_82.jpg',
  'images/live/events/events_410b29_7ffa8f084_83.jpg',
  'images/live/events/events_410b29_696ba98fd_84.jpeg',
  'images/live/events/events_410b29_3c09734e4_85.jpeg',
  'images/live/events/events_410b29_07d16cb18_86.jpeg',
  'images/live/events/events_410b29_0d80f8a48_87.jpeg',
  'images/live/events/events_410b29_95d6f210e_88.jpeg'
];

async function processImage(item) {
  const fullSrc = path.join(desktopPublic, item.src);
  if (!fs.existsSync(fullSrc)) {
    console.warn(`Source not found: ${fullSrc}`);
    return;
  }

  const destDesktop = path.join(desktopPublic, item.dest);
  const destScratch = path.join(scratchPublic, item.dest);

  [path.dirname(destDesktop), path.dirname(destScratch)].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  try {
    let pipeline = sharp(fullSrc);
    if (item.width) {
      pipeline = pipeline.resize(item.width, null, { fit: item.fit || 'inside', withoutEnlargement: true });
    }
    const webpBuffer = await pipeline.webp({ quality: 85, effort: 4 }).toBuffer();

    fs.writeFileSync(destDesktop, webpBuffer);
    fs.writeFileSync(destScratch, webpBuffer);

    const origKb = Math.round(fs.statSync(fullSrc).size / 1024);
    const newKb = Math.round(webpBuffer.length / 1024);
    console.log(`OPTIMIZED: ${item.dest} (${origKb}KB -> ${newKb}KB)`);
  } catch (err) {
    console.error(`Error optimizing ${item.src}: ${err.message}`);
  }
}

async function main() {
  console.log('Optimizing product images...');
  for (const item of productsMap) {
    await processImage(item);
  }

  console.log('\nOptimizing IndiaWood 2026 event gallery images...');
  for (let i = 0; i < eventRawFiles.length; i++) {
    const src = eventRawFiles[i];
    const pad = String(i + 1).padStart(2, '0');
    const dest = `images/events/indiawood_2026_${pad}.webp`;
    await processImage({
      src,
      dest,
      width: 1200,
      fit: 'inside'
    });
  }

  console.log('\nAsset optimization complete!');
}

main();
