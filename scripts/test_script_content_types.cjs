const https = require('https');

const targetUrl = 'https://script.google.com/macros/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec';

function testPost(contentType, bodyStr) {
  return new Promise((resolve) => {
    console.log(`\nTesting POST with Content-Type: ${contentType}`);
    const parsed = new URL(targetUrl);
    const req = https.request({
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(bodyStr)
      }
    }, res => {
      console.log('Status:', res.statusCode);
      if (res.headers.location) {
        https.get(res.headers.location, redRes => {
          let data = '';
          redRes.on('data', d => data += d);
          redRes.on('end', () => {
            console.log('Response:', data);
            resolve(data);
          });
        });
      } else {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
          console.log('Response:', data);
          resolve(data);
        });
      }
    });
    req.write(bodyStr);
    req.end();
  });
}

function testGet(queryParams) {
  return new Promise((resolve) => {
    const fullUrl = targetUrl + '?' + queryParams;
    console.log(`\nTesting GET with params: ${queryParams}`);
    https.get(fullUrl, res => {
      if (res.headers.location) {
        https.get(res.headers.location, redRes => {
          let data = '';
          redRes.on('data', d => data += d);
          redRes.on('end', () => {
            console.log('Response:', data);
            resolve(data);
          });
        });
      } else {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
          console.log('Response:', data);
          resolve(data);
        });
      }
    });
  });
}

async function run() {
  const payload = JSON.stringify({
    id: 'RFQ-TEST-002',
    customerName: 'Test Buyer',
    companyName: 'Test Panels',
    phone: '9876543210',
    email: 'buyer@test.com',
    city: 'Ahmedabad',
    country: 'India',
    items: [{ productName: 'A10VSO Pump', quantity: 2 }],
    notes: 'Testing content type',
    submittedAt: new Date().toISOString()
  });

  await testPost('text/plain;charset=utf-8', payload);
  await testPost('application/json', payload);
  await testPost('application/x-www-form-urlencoded', 'data=' + encodeURIComponent(payload));
  await testGet('action=get_last_number');
  await testGet('action=getLastId');
  await testGet('action=get');
}

run();
