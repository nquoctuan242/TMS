const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const oldSidebarItem = `<SidebarItem 
            icon="fa-car-side" 
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
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'shipper-list' || currentView === 'shipper-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('shipper-list')}
                >
                  Shipper
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'scan-time-list' || currentView === 'scan-time-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('scan-time-list')}
                >
                  Scan Time
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('payroll-period-list')}
                >
                  Payroll Period
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'shift-control-list' || currentView === 'shift-control-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('shift-control-list')}
                >
                  Shift Control
                </div>
             </div>
          </SidebarItem>`;

const newSidebarItem = `<SidebarItem 
            icon="fa-car-side" 
            label="Fleet" 
            active={currentView === 'vehicle-list' || currentView === 'vehicle-detail' || currentView === 'vehicle-documents' || currentView === 'vehicle-maintenance' || currentView === 'operation' || currentView === 'cost-and-fuel' || currentView === 'shipper-list' || currentView === 'shipper-detail' || currentView === 'scan-time-list' || currentView === 'scan-time-detail' || currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' || currentView === 'shift-control-list' || currentView === 'shift-control-detail'} 
            hasSubItems
            onClick={() => {}}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'shipper-list' || currentView === 'shipper-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('shipper-list')}
                >
                  Shipper
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'scan-time-list' || currentView === 'scan-time-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('scan-time-list')}
                >
                  Scan Time
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('payroll-period-list')}
                >
                  Payroll Period
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'shift-control-list' || currentView === 'shift-control-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('shift-control-list')}
                >
                  Shift Control
                </div>
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
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'operation' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('operation')}
                >
                  Operation
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'cost-and-fuel' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('cost-and-fuel')}
                >
                  Cost and Fuel
                </div>
             </div>
          </SidebarItem>`;

const currentFleetMatch = content.match(/<SidebarItem[^>]*label="Fleet"[\s\S]*?<\/SidebarItem>/);
if (currentFleetMatch) {
  content = content.replace(currentFleetMatch[0], newSidebarItem);
  console.log('Replaced sidebar item');
} else {
  console.log('Sidebar item not found');
}

const titleMatch = content.match(/currentView === 'vehicle-maintenance' \? 'Maintenance' :/);
if (titleMatch) {
  content = content.replace(
    titleMatch[0],
    `currentView === 'vehicle-maintenance' ? 'Maintenance' :\n                 currentView === 'operation' ? 'Operation' :\n                 currentView === 'cost-and-fuel' ? 'Cost and Fuel' :`
  );
  console.log('Replaced titles');
}

const renderMatch = content.match(/\) : currentView === 'vehicle-list' \? \(/g);
if (renderMatch && renderMatch.length > 0) {
  content = content.replace(
    /\) : currentView === 'vehicle-list' \? \(/g,
    `) : currentView === 'operation' ? (
             <OperationView />
          ) : currentView === 'cost-and-fuel' ? (
             <CostAndFuelView />
          ) : currentView === 'vehicle-list' ? (`
  );
  console.log('Replaced renders');
}

const importRegex = /import \{ VehicleMaintenanceView \} from '\.\/src\/VehicleMaintenanceView';/;
content = content.replace(importRegex, `import { VehicleMaintenanceView } from './src/VehicleMaintenanceView';\nimport { OperationView } from './src/OperationView';\nimport { CostAndFuelView } from './src/CostAndFuelView';`);

fs.writeFileSync('App.tsx', content);
