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
        "import { Carrier",
        "import { Carrier, LandingCostConfig"
    );
}

// Add state
const stateBlock = `  const [landingCostConfigs, setLandingCostConfigs] = useState<LandingCostConfig[]>(MOCK_LANDING_COST_CONFIGS);
  const [editingLandingCostConfig, setEditingLandingCostConfig] = useState<LandingCostConfig | null>(null);`;
if (!appContent.includes('const [landingCostConfigs')) {
    appContent = appContent.replace(
        "const [scanTimeConfigs, setScanTimeConfigs]",
        stateBlock + "\n  const [scanTimeConfigs, setScanTimeConfigs]"
    );
}

// Ensure MOCK_LANDING_COST_CONFIGS in constants
if (!appContent.includes('MOCK_LANDING_COST_CONFIGS')) {
    appContent = appContent.replace(
        "import { MOCK_SHIPMENT,",
        "import { MOCK_SHIPMENT, MOCK_LANDING_COST_CONFIGS,"
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

// Update currentView type
if (!appContent.includes("'landing-cost-list' | 'landing-cost-detail'")) {
    appContent = appContent.replace(
       "| 'scan-time-detail'",
       "| 'scan-time-detail' | 'landing-cost-list' | 'landing-cost-detail'"
    );
}

fs.writeFileSync('App.tsx', appContent);
console.log("Updated App.tsx imports, state, and Render logic!");
