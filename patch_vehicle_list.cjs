const fs = require('fs');
let content = fs.readFileSync('src/VehicleListView.tsx', 'utf-8');

// Replace TH
content = content.replace(
  '<th className="px-4 py-3 border-r border-gray-200">Department</th>',
  '<th className="px-4 py-3 border-r border-gray-200">Store Default</th>'
);

// Replace TD
content = content.replace(
  '<td className="px-4 py-3 border-r border-gray-100">{v.department}</td>',
  '<td className="px-4 py-3 border-r border-gray-100">{v.storeDefault || "None"}</td>'
);

// Replace Mock data
content = content.replace(
  "department: 'Logistics miền Nam',",
  "storeDefault: 'Store 123',"
);

fs.writeFileSync('src/VehicleListView.tsx', content);
