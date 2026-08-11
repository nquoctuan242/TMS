const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf-8');

const zoneMenu = `                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'zone-rule-list' || currentView === 'zone-rule-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('zone-rule-list')}
                >
                  Zone Rule
                </div>`;

content = content.replace(
  "                  Delivery SLA\n                </div>",
  "                  Delivery SLA\n                </div>\n" + zoneMenu
);

fs.writeFileSync('App.tsx', content);
