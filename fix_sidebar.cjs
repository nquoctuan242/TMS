const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const target = `                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'payroll-period-list' || currentView === 'payroll-period-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('payroll-period-list')}
                >
                  Payroll Period
                </div>
             </div>
          </SidebarItem>`;

const replacement = `                <div 
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

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('App.tsx', content);
    console.log("Replaced successfully!");
} else {
    console.log("Target not found!");
}
