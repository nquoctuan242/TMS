const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const startTag = `          ) : currentView === 'delivery-sla-list' ? (
             <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300 relative">`;
const endTag = `          ) : currentView === 'user-list' ? (`;

const startIndex = content.lastIndexOf(startTag);
const endIndex = content.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + content.substring(endIndex);
  fs.writeFileSync('App.tsx', content);
  console.log('Removed duplicated block');
} else {
  console.log('Could not find dupe', startIndex, endIndex);
}
