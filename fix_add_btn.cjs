const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

content = content.replace(
  '<button className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">',
  '<button className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">'
);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
