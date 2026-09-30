const https = require('https');

const webhookUrl = 'https://script.google.com/macros/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec';

const payload = {
  id: 'RFQ-1001',
  rfqId: 'RFQ-1001',
  referenceId: 'RFQ-1001',
  rfqNumber: 'RFQ-1001',
  customerName: 'Mohit Test',
  name: 'Mohit Test',
  companyName: 'Ambica Engineers Live Test',
  company: 'Ambica Engineers Live Test',
  phone: '+91 7600025020',
  mobile: '+91 7600025020',
  email: 'info@ambicaengineers.in',
  city: 'Noida',
  country: 'India',
  currency: 'INR',
  items: [
    {
      productId: 'prod-rexroth-a10vso',
      productName: 'Bosch Rexroth A10VSO Variable Displacement Axial Piston Pump',
      series: 'A10VSO Series 31 / 32',
      quantity: 1,
      notes: 'Urgent requirement'
    },
    {
      productId: 'prod-cushion-pad-silicon-copper',
      productName: 'European Quality Silicon & Twilled Copper Cushion Pad',
      series: 'Ambica CP-Series (220°C)',
      quantity: 4,
      notes: '8x4 ft format'
    }
  ],
  products: 'Bosch Rexroth A10VSO (Qty: 1); European Silicon & Twilled Copper Cushion Pad (Qty: 4)',
  itemsList: '1. Bosch Rexroth A10VSO (Qty: 1)\n2. European Silicon & Twilled Copper Cushion Pad (Qty: 4)',
  totalQuantity: 5,
  notes: 'Testing live sync with sequential numbering RFQ-1001',
  message: 'Testing live sync with sequential numbering RFQ-1001',
  submittedAt: new Date().toISOString(),
  timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }),
  time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
};

const postData = JSON.stringify(payload);

const parsed = new URL(webhookUrl);
const req = https.request({
  hostname: parsed.hostname,
  path: parsed.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
}, res => {
  console.log('STATUS:', res.statusCode);
  if (res.headers.location) {
    https.get(res.headers.location, redRes => {
      let data = '';
      redRes.on('data', d => data += d);
      redRes.on('end', () => {
        console.log('GOOGLE APPS SCRIPT RESPONSE:', data);
      });
    });
  } else {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => console.log('RESPONSE:', data));
  }
});

req.on('error', err => console.error('ERROR:', err));
req.write(postData);
req.end();
