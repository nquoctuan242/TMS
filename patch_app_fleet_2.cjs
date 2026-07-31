const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Find the label="Fleet" line and the div for Vehicle under it
const vehicleIndex = content.indexOf('onClick={() => setCurrentView(\'vehicle-list\')}');
if (vehicleIndex > -1) {
    const insertPoint = content.indexOf('</div>', vehicleIndex) + 6;
    const newItems = `
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'vehicle-documents' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('vehicle-documents')}
                >
                  Vehicle Documents
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'vehicle-maintenance' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('vehicle-maintenance')}
                >
                  Maintenance
                </div>`;
    content = content.slice(0, insertPoint) + newItems + content.slice(insertPoint);
}

// Modify the active condition for Fleet
content = content.replace(
  /active=\{currentView === 'vehicle-list' \|\| currentView === 'vehicle-detail' \|\| currentView === 'shipper-list'/,
  "active={currentView === 'vehicle-list' || currentView === 'vehicle-detail' || currentView === 'vehicle-documents' || currentView === 'vehicle-maintenance' || currentView === 'shipper-list'"
);


// Find ShiftControlDetailView render
content = content.replace(
  /\{currentView === 'shift-control-detail'[\s\S]*?\/>\}/,
  (match) => match + `\n      {currentView === 'vehicle-documents' && <VehicleDocumentsView />}\n      {currentView === 'vehicle-maintenance' && <div className="p-8"><h2 className="text-xl font-bold">Maintenance (Coming soon)</h2></div>}`
);

const importRegex = /import \{ VehicleDetailView \} from '\.\/src\/VehicleDetailView';/;
content = content.replace(importRegex, `import { VehicleDetailView } from './src/VehicleDetailView';\nimport { VehicleDocumentsView } from './src/VehicleDocumentsView';`);

fs.writeFileSync('App.tsx', content);
