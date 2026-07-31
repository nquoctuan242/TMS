const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Add import
const importRegex = /import \{ VehicleDocumentsView \} from '\.\/src\/VehicleDocumentsView';/;
content = content.replace(importRegex, `import { VehicleDocumentsView } from './src/VehicleDocumentsView';\nimport { VehicleMaintenanceView } from './src/VehicleMaintenanceView';`);

// Update render block
content = content.replace(
  '<div className="p-8"><h2 className="text-xl font-bold">Maintenance (Coming soon)</h2></div>',
  '<VehicleMaintenanceView />'
);

fs.writeFileSync('App.tsx', content);
