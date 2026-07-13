const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const targetMenuStr = `                  <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('payroll-period-list')}
                >
                  Payroll Period
                </div>
             </div>
          </SidebarItem>`;

const replaceMenuStr = `                  <div 
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

content = content.replace(targetMenuStr, replaceMenuStr);

const activeFleetTarget = `active={currentView === 'shipper-list' || currentView === 'shipper-detail' || currentView === 'scan-time-list' || currentView === 'scan-time-detail' || currentView === 'payroll-period-list' || currentView === 'payroll-period-detail'}`;
const activeFleetReplace = `active={currentView === 'shipper-list' || currentView === 'shipper-detail' || currentView === 'scan-time-list' || currentView === 'scan-time-detail' || currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' || currentView === 'shift-control-list' || currentView === 'shift-control-detail'}`;
content = content.replace(activeFleetTarget, activeFleetReplace);

const titleTarget = `                 currentView === 'payroll-period-detail' ? 'Payroll Period Detail' :`;
const titleReplace = `                 currentView === 'payroll-period-detail' ? 'Payroll Period Detail' :
                 currentView === 'shift-control-list' ? 'Shift Control' :
                 currentView === 'shift-control-detail' ? 'Shift Control Detail' :`;
content = content.replace(titleTarget, titleReplace);

fs.writeFileSync('App.tsx', content);
console.log("Updated sidebar menu and titles");
