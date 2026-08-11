const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf-8');

const zoneRender = `          ) : currentView === 'zone-rule-list' ? (
             <ZoneRuleListView
               onEdit={(id) => {
                 setSelectedZoneRuleId(id);
                 setCurrentView('zone-rule-detail');
               }}
               onCreate={() => {
                 setSelectedZoneRuleId(null);
                 setCurrentView('zone-rule-detail');
               }}
             />
          ) : currentView === 'zone-rule-detail' ? (
             <ZoneRuleDetailView
               configId={selectedZoneRuleId}
               onBack={() => setCurrentView('zone-rule-list')}
             />
`;

content = content.replace(
  "          ) : currentView === 'delivery-sla-list' ? (",
  zoneRender + "          ) : currentView === 'delivery-sla-list' ? ("
);

fs.writeFileSync('App.tsx', content);
