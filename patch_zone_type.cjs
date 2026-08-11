const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');
content = content.replace(/carrierId: string;/g, 'partner: string;');
fs.writeFileSync('types.ts', content);
