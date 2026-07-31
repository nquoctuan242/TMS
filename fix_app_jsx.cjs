const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Find the block for delivery-sla-list and replace it
const startTag = `          ) : currentView === 'delivery-sla-list' ? (`;
const nextViewTag = `          ) : currentView === 'scan-time-list' ? (`;

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(nextViewTag);

if (startIndex !== -1 && endIndex !== -1) {
  const newBlock = `          ) : currentView === 'delivery-sla-list' ? (
             <DeliverySLAListView 
               onEdit={(id) => {
                 setSelectedDeliverySLAId(id);
                 setCurrentView('delivery-sla-detail');
               }}
             />
          ) : currentView === 'delivery-sla-detail' ? (
             <DeliverySLADetailView
               configId={selectedDeliverySLAId}
               onBack={() => setCurrentView('delivery-sla-list')}
             />
`;
  content = content.substring(0, startIndex) + newBlock + content.substring(endIndex);
  
  // also need to import the components
  const importBlock = `import { DeliverySLAListView } from './DeliverySLAListView';
import { DeliverySLADetailView } from './DeliverySLADetailView';\n`;
  content = importBlock + content;
  
  // and define selectedDeliverySLAId state
  const stateSearch = `const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);`;
  const stateReplacement = stateSearch + `\n  const [selectedDeliverySLAId, setSelectedDeliverySLAId] = useState<string | null>(null);`;
  content = content.replace(stateSearch, stateReplacement);

  fs.writeFileSync('App.tsx', content);
  console.log('App.tsx updated for SLA views');
} else {
  console.log('Could not find view boundaries');
}

