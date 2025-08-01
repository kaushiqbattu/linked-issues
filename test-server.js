const http = require('http');

// Test the server endpoints
function testEndpoint(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

async function runTests() {
  console.log('Testing server endpoints...\n');

  try {
    // Test health endpoint
    console.log('1. Testing /health...');
    const healthResult = await testEndpoint('/health');
    console.log(`   Status: ${healthResult.statusCode}`);
    console.log(`   Response: ${healthResult.data}\n`);

    // Test create.html
    console.log('2. Testing /create.html...');
    const createResult = await testEndpoint('/create.html');
    console.log(`   Status: ${createResult.statusCode}`);
    console.log(`   Content-Type: ${createResult.headers['content-type']}\n`);

    // Test view.html
    console.log('3. Testing /view.html...');
    const viewResult = await testEndpoint('/view.html');
    console.log(`   Status: ${viewResult.statusCode}`);
    console.log(`   Content-Type: ${viewResult.headers['content-type']}\n`);

    // Test validation endpoint
    console.log('4. Testing /validate...');
    const validateResult = await testEndpoint('/validate', 'POST');
    console.log(`   Status: ${validateResult.statusCode}`);
    console.log(`   Response: ${validateResult.data}\n`);

    console.log('All tests completed!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { testEndpoint }; 