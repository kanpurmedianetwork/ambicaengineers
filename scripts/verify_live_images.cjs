const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const testPaths = [
  '/images/live/cushion_pads/cushion_pad_181.jpg',
  '/images/live/pumps/pumps_410b29_a44a06a68_169.png',
  '/images/live/pumps/pumps_410b29_0ce6ae10b_168.png',
  '/images/live/pumps/pumps_410b29_bc1b2f623_170.png',
  '/images/live/pumps/pumps_410b29_9df082973_11.png',
  '/images/live/pumps/pumps_410b29_1510b4245_12.png',
  '/images/live/pumps/pumps_410b29_7b288169e_13.png',
  '/images/live/pumps/pumps_410b29_6578efe22_155.png',
  '/images/live/pumps/pumps_410b29_048e7de24_156.png',
  '/images/live/pumps/pumps_410b29_a45f9e480_154.png',
  '/images/live/pumps/pumps_410b29_856d00b9a_164.png',
  '/images/live/valves/valves_410b29_5dba4f6c9_90.png',
  '/images/live/valves/valves_410b29_057530ada_133.png',
  '/images/live/valves/valves_410b29_44881b301_91.png',
  '/images/live/valves/valves_410b29_97ae07af2_92.png',
  '/images/live/valves/valves_410b29_9a807d443_134.png',
  '/images/live/motors/motors_410b29_ec11b8a4f_129.png'
];

testPaths.forEach(p => {
  const full = path.join(publicDir, p.replace(/^\//, ''));
  if (fs.existsSync(full)) {
    const s = fs.statSync(full);
    console.log(`EXISTS: ${p} (${Math.round(s.size/1024)} KB)`);
  } else {
    console.error(`MISSING: ${p}`);
  }
});
