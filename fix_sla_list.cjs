const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLAListView.tsx', 'utf8');

content = content.replace(/storeOverrides/g, 'locationOverrides');
content = content.replace(/Store Overrides/g, 'Location Overrides');
content = content.replace(/stores\n\s*<\/td>/g, 'locations\n                  </td>');

fs.writeFileSync('src/DeliverySLAListView.tsx', content);
console.log('list view updated');
