const fs = require('fs');
let content = fs.readFileSync('src/ShiftControlDetailView.tsx', 'utf-8');
content = content.replace(/<\/div>\s*<\/div>\s*\{renderBreakList/g, '</div>\n        {renderBreakList');
fs.writeFileSync('src/ShiftControlDetailView.tsx', content);
