const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

content = content.replace(
  `import { MOCK_DELIVERY_SLA_CONFIGS, MOCK_STORES } from '../constants';`,
  `import { MOCK_DELIVERY_SLA_CONFIGS } from '../constants';`
);

content = content.replace(
  `interface DeliverySLADetailViewProps {\n  configId: string | null;\n  onBack: () => void;\n}`,
  `interface DeliverySLADetailViewProps {
  configId: string | null;
  stores: any[];
  onBack: () => void;
}`
);

content = content.replace(
  `export function DeliverySLADetailView({ configId, onBack }: DeliverySLADetailViewProps) {`,
  `export function DeliverySLADetailView({ configId, stores, onBack }: DeliverySLADetailViewProps) {`
);

content = content.replace(
  `{MOCK_STORES.find(s => s.id === override.storeId)?.name || override.storeId}`,
  `{stores.find(s => s.id === override.storeId)?.name || override.storeId}`
);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);

let appContent = fs.readFileSync('App.tsx', 'utf8');
appContent = appContent.replace(
  `<DeliverySLADetailView\n               configId={selectedDeliverySLAId}\n               onBack={() => setCurrentView('delivery-sla-list')}\n             />`,
  `<DeliverySLADetailView
               configId={selectedDeliverySLAId}
               stores={stores}
               onBack={() => setCurrentView('delivery-sla-list')}
             />`
);
fs.writeFileSync('App.tsx', appContent);
console.log('Fixed stores prop');
