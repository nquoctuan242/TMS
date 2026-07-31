const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(/ServiceDeliveryConfig,\s*/g, '');
content = content.replace(/ServiceDeliveryConfig/g, '');

fs.writeFileSync('App.tsx', content);
console.log('Fixed App.tsx imports');
