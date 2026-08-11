const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf-8');
content = content.replace(/carrierId:/g, 'partner:');
content = content.replace(/matchType: 'Exact'/g, "matchType: 'REGION_MATRIX'");
content = content.replace(/matchType: 'Prefix'/g, "matchType: 'SAME_PROVINCE'");
fs.writeFileSync('constants.tsx', content);
