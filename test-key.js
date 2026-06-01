const crypto = require('crypto');
const fs = require('fs');
const secret = JSON.parse(fs.readFileSync('./secret.json'));
let key = secret.private_key;

// Simulate user's error:
key = key.replace('-----BEGIN PRIVATE KEY-----\nMII', '-----BEGIN PRIVATE KEY-----\nnMII');

try {
  crypto.createPrivateKey(key);
  console.log("Success");
} catch (e) {
  console.log("Error:", e.message);
}
