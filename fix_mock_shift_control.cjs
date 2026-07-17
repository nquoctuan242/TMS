const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

content = content.replace(/warnBeforeShiftEndMinutes: /g, 'warnBeforeShiftEndEnabled: true,\n    warnBeforeShiftEndMinutes: ');
fs.writeFileSync('constants.tsx', content);
console.log("Updated constants!");
