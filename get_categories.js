const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'schemesList.js');
const content = fs.readFileSync(filePath, 'utf8');

// Match all categories using a more robust approach
const regex = /"category":\s*"([^"]+)"/g;
const categories = new Set();
let match;

while ((match = regex.exec(content)) !== null) {
    categories.add(match[1]);
}

console.log('Unique Categories:', Array.from(categories).join(', '));
