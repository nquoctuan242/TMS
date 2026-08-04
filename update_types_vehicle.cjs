const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');
content = content.replace(/department: string;/, 'storeDefault?: string;');
fs.writeFileSync('types.ts', content);
