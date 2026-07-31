const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Replace state references
content = content.replace(/'service-delivery-config'/g, "'delivery-sla-list' | 'delivery-sla-detail'");
content = content.replace(
  `| 'ticket-content-detail' | 'ticket-type-list' | 'ticket-type-detail' | 'delivery-sla-list' | 'delivery-sla-detail' | 'scan-time-list'`,
  `| 'ticket-content-detail' | 'ticket-type-list' | 'ticket-type-detail' | 'delivery-sla-list' | 'delivery-sla-detail' | 'scan-time-list'`
);

// Sidebar icon active state
content = content.replace(
  `currentView === 'it-route-detail' || currentView === 'delivery-sla-list' | 'delivery-sla-detail' || currentView === 'user-store-access-list'`,
  `currentView === 'it-route-detail' || currentView === 'delivery-sla-list' || currentView === 'delivery-sla-detail' || currentView === 'user-store-access-list'`
);

// Sidebar item text
content = content.replace(
  `                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'delivery-sla-list' | 'delivery-sla-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('delivery-sla-list' | 'delivery-sla-detail')}
                >
                  Service Delivery`,
  `                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'delivery-sla-list' || currentView === 'delivery-sla-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('delivery-sla-list')}
                >
                  Delivery SLA`
);

// Breadcrumbs
content = content.replace(
  `currentView === 'delivery-sla-list' | 'delivery-sla-detail' ? 'Service Delivery Configuration' :`,
  `currentView === 'delivery-sla-list' ? 'Delivery SLA Management' :
                 currentView === 'delivery-sla-detail' ? 'Delivery SLA Detail' :`
);

// We need to write the file, but first I have to be careful with the exact strings.
// Let's do it using regex.
