const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');
content = content.replace('\\\\nexport interface VehicleTypeConfig', '\\nexport interface VehicleTypeConfig');
fs.writeFileSync('types.ts', content);
