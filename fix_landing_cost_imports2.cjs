const fs = require('fs');

let appContent = fs.readFileSync('App.tsx', 'utf8');

// Add imports
if (!appContent.includes('LandingCostListView')) {
    appContent = appContent.replace(
        "import React, { useState } from 'react';",
        "import React, { useState } from 'react';\nimport { LandingCostListView } from './src/LandingCostListView';\nimport { LandingCostDetailView } from './src/LandingCostDetailView';"
    );
}
if (!appContent.includes('LandingCostConfig')) {
    appContent = appContent.replace(
        "import { Carrier } from './types';",
        "import { Carrier, LandingCostConfig } from './types';"
    );
}

// Add state
const stateBlock = `  const [landingCostConfigs, setLandingCostConfigs] = useState<LandingCostConfig[]>(MOCK_LANDING_COST_CONFIGS);
  const [editingLandingCostConfig, setEditingLandingCostConfig] = useState<LandingCostConfig | null>(null);`;
if (!appContent.includes('const [landingCostConfigs')) {
    appContent = appContent.replace(
        "const [shiftControlConfigs, setShiftControlConfigs]",
        stateBlock + "\n  const [shiftControlConfigs, setShiftControlConfigs]"
    );
}

// Add Render logic
const renderConfigStrategy = `currentView === 'config-strategy' ? (
             <ConfigStrategyView />
          ) :`;

const renderNew = `currentView === 'landing-cost-list' ? (
             <LandingCostListView 
               configs={landingCostConfigs}
               onAddNew={() => { setEditingLandingCostConfig(null); setCurrentView('landing-cost-detail'); }}
               onEdit={(c) => { setEditingLandingCostConfig(c); setCurrentView('landing-cost-detail'); }}
             />
          ) : currentView === 'landing-cost-detail' ? (
             <LandingCostDetailView 
               config={editingLandingCostConfig}
               stores={stores}
               onBack={() => setCurrentView('landing-cost-list')}
               onSave={(newConfig) => {
                 if (editingLandingCostConfig) {
                   setLandingCostConfigs(prev => prev.map(c => c.id === newConfig.id ? newConfig : c));
                 } else {
                   setLandingCostConfigs(prev => [{...newConfig, id: Date.now().toString()}, ...prev]);
                 }
                 setCurrentView('landing-cost-list');
               }}
             />
          ) :`;

if (!appContent.includes('<LandingCostListView')) {
    appContent = appContent.replace(renderConfigStrategy, renderNew + '\n          ' + renderConfigStrategy);
}

fs.writeFileSync('App.tsx', appContent);
console.log("Updated App.tsx Render logic!");
