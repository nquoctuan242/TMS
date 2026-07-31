const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(/'service-delivery-config'/g, "'delivery-sla-list'");
content = content.replace(/\| 'delivery-sla-list' \|/, "| 'delivery-sla-list' | 'delivery-sla-detail' |");

// Sidebar
content = content.replace(
  `currentView === 'it-route-detail' || currentView === 'delivery-sla-list' || currentView === 'user-store-access-list'`,
  `currentView === 'it-route-detail' || currentView === 'delivery-sla-list' || currentView === 'delivery-sla-detail' || currentView === 'user-store-access-list'`
);

content = content.replace(
  /className=\{\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \$\{currentView === 'delivery-sla-list' \? 'text-white\/90 bg-white\/10' : 'text-white\/60 hover:text-white'\}\`\}\s*onClick=\{\(\) => setCurrentView\('delivery-sla-list'\)\}\s*>\s*Service Delivery\s*<\/div>/,
  `className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'delivery-sla-list' || currentView === 'delivery-sla-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('delivery-sla-list')}
                >
                  Delivery SLA
                </div>`
);

content = content.replace(
  /currentView === 'delivery-sla-list' \? 'Service Delivery Configuration' :/,
  `currentView === 'delivery-sla-list' ? 'Delivery SLA Management' :
                 currentView === 'delivery-sla-detail' ? 'Delivery SLA Detail' :`
);

fs.writeFileSync('App.tsx', content);
console.log('Done');
