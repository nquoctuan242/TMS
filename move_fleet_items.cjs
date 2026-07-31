const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const oldSidebarItem = `<SidebarItem 
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
            icon="fa-truck" 
            label="Fleet" 
            active={currentView === 'vehicle-list' || currentView === 'vehicle-detail' || currentView === 'vehicle-documents' || currentView === 'vehicle-maintenance' || currentView === 'shipper-list' || currentView === 'shipper-detail' || currentView === 'scan-time-list' || currentView === 'scan-time-detail' || currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' || currentView === 'shift-control-list' || currentView === 'shift-control-detail' || currentView === 'cost-and-fuel'} 
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
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'cost-and-fuel' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('cost-and-fuel')}
                >
                  Cost and Fuel
                </div>
             </div>
          </SidebarItem>`;

content = content.replace(oldSidebarItem, newSidebarItem);

const oldTitle = `                 currentView === 'vehicle-maintenance' ? 'Maintenance' :`;
const newTitle = `                 currentView === 'vehicle-maintenance' ? 'Maintenance' :\n                 currentView === 'cost-and-fuel' ? 'Cost and Fuel' :`;
content = content.replace(oldTitle, newTitle);

const oldRender = `          ) : currentView === 'vehicle-maintenance' ? (
             <VehicleMaintenanceView />
          ) : currentView === 'vehicle-list' ? (`
const newRender = `          ) : currentView === 'vehicle-maintenance' ? (
             <VehicleMaintenanceView />
          ) : currentView === 'cost-and-fuel' ? (
             <CostAndFuelView />
          ) : currentView === 'vehicle-list' ? (`
content = content.replace(oldRender, newRender);

const oldImport = `import { VehicleMaintenanceView } from './src/VehicleMaintenanceView';`;
const newImport = `import { VehicleMaintenanceView } from './src/VehicleMaintenanceView';\nimport { CostAndFuelView } from './src/CostAndFuelView';`;
content = content.replace(oldImport, newImport);

fs.writeFileSync('App.tsx', content);
console.log('App patched.');
