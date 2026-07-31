const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const fleetItem = `          <SidebarItem 
            icon="fa-truck" 
            label="Fleet" 
            active={currentView === 'vehicle-list' || currentView === 'vehicle-detail' || currentView === 'shipper-list' || currentView === 'shipper-detail' || currentView === 'scan-time-list' || currentView === 'scan-time-detail' || currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' || currentView === 'shift-control-list' || currentView === 'shift-control-detail'} 
            hasSubItems
            onClick={() => {}}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'vehicle-list' || currentView === 'vehicle-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('vehicle-list')}
                >
                  Vehicle
                </div>`;

const newFleetItem = `          <SidebarItem 
            icon="fa-truck" 
            label="Fleet" 
            active={currentView === 'vehicle-list' || currentView === 'vehicle-detail' || currentView === 'vehicle-documents' || currentView === 'vehicle-maintenance' || currentView === 'shipper-list' || currentView === 'shipper-detail' || currentView === 'scan-time-list' || currentView === 'scan-time-detail' || currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' || currentView === 'shift-control-list' || currentView === 'shift-control-detail'} 
            hasSubItems
            onClick={() => {}}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'vehicle-list' || currentView === 'vehicle-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('vehicle-list')}
                >
                  Vehicle
                </div>
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

content = content.replace(fleetItem, newFleetItem);

// Update render switch
const renderPoint = `{currentView === 'shift-control-detail' && <ShiftControlDetailView shiftControlId={selectedShiftControlId} onBack={() => setCurrentView('shift-control-list')} />}`;

const renderNew = `{currentView === 'shift-control-detail' && <ShiftControlDetailView shiftControlId={selectedShiftControlId} onBack={() => setCurrentView('shift-control-list')} />}
      {currentView === 'vehicle-documents' && <VehicleDocumentsView />}
      {currentView === 'vehicle-maintenance' && <div className="p-8"><h2 className="text-xl font-bold">Maintenance (Coming soon)</h2></div>}`;

content = content.replace(renderPoint, renderNew);

const importRegex = /import \{ VehicleDetailView \} from '\.\/src\/VehicleDetailView';/;
content = content.replace(importRegex, `import { VehicleDetailView } from './src/VehicleDetailView';\nimport { VehicleDocumentsView } from './src/VehicleDocumentsView';`);

fs.writeFileSync('App.tsx', content);
