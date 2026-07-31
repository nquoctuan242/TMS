const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

content = content.replace(
  '<div className="bg-[#f0f2f5] min-h-full p-4 animate-in fade-in duration-300">',
  '<div className="bg-gray-50/50 min-h-full p-6 animate-in fade-in duration-300"><div className="max-w-7xl mx-auto">'
);

content = content.replace(
  '    </div>\n  );\n}',
  '    </div></div>\n  );\n}'
);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
