const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(
  `             <DeliverySLAListView \n               onEdit={(id) => {\n                 setSelectedDeliverySLAId(id);\n                 setCurrentView('delivery-sla-detail');\n               }}\n             />`,
  `             <DeliverySLAListView 
               onEdit={(id) => {
                 setSelectedDeliverySLAId(id);
                 setCurrentView('delivery-sla-detail');
               }}
               onCreate={() => {
                 setSelectedDeliverySLAId(null);
                 setCurrentView('delivery-sla-detail');
               }}
             />`
);

fs.writeFileSync('App.tsx', content);
