const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf-8');

content = content.replace(
  "currentView === 'delivery-sla-detail' ? 'Delivery SLA Detail' : ",
  "currentView === 'delivery-sla-detail' ? 'Delivery SLA Detail' : \n                 currentView === 'zone-rule-list' ? 'Zone Rule Management' :\n                 currentView === 'zone-rule-detail' ? 'Zone Rule Detail' :"
);

fs.writeFileSync('App.tsx', content);
