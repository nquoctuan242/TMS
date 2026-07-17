const fs = require('fs');
let appContent = fs.readFileSync('App.tsx', 'utf8');

if (!appContent.includes('LandingCostCalculatorView')) {
    appContent = appContent.replace(
        "import { LandingCostDetailView } from './src/LandingCostDetailView';",
        "import { LandingCostDetailView } from './src/LandingCostDetailView';\nimport { LandingCostCalculatorView } from './src/LandingCostCalculatorView';"
    );
    
    // Add render for calculator
    const newRender = `currentView === 'landing-cost-list' ? (
             <LandingCostListView 
               configs={landingCostConfigs}
               onAddNew={() => { setEditingLandingCostConfig(null); setCurrentView('landing-cost-detail'); }}
               onEdit={(c) => { setEditingLandingCostConfig(c); setCurrentView('landing-cost-detail'); }}
               onOpenCalculator={() => setCurrentView('landing-cost-calculator')}
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
          ) : currentView === 'landing-cost-calculator' ? (
             <LandingCostCalculatorView onBack={() => setCurrentView('landing-cost-list')} />
          ) :`;
          
    const oldRenderList = `<LandingCostListView \n               configs={landingCostConfigs}\n               onAddNew={() => { setEditingLandingCostConfig(null); setCurrentView('landing-cost-detail'); }}\n               onEdit={(c) => { setEditingLandingCostConfig(c); setCurrentView('landing-cost-detail'); }}\n             />`;
    
    appContent = appContent.replace(oldRenderList, `<LandingCostListView \n               configs={landingCostConfigs}\n               onAddNew={() => { setEditingLandingCostConfig(null); setCurrentView('landing-cost-detail'); }}\n               onEdit={(c) => { setEditingLandingCostConfig(c); setCurrentView('landing-cost-detail'); }}\n               onOpenCalculator={() => setCurrentView('landing-cost-calculator')}\n             />`);
    
    appContent = appContent.replace(
      ") : currentView === 'landing-cost-detail' ? (",
      ") : currentView === 'landing-cost-calculator' ? (\n             <LandingCostCalculatorView onBack={() => setCurrentView('landing-cost-list')} />\n          ) : currentView === 'landing-cost-detail' ? ("
    );
    
    appContent = appContent.replace(
      "| 'landing-cost-list' | 'landing-cost-detail'",
      "| 'landing-cost-list' | 'landing-cost-detail' | 'landing-cost-calculator'"
    );
    
    fs.writeFileSync('App.tsx', appContent);
    console.log("Updated App.tsx to support LandingCostCalculatorView");
} else {
    console.log("App.tsx already supports LandingCostCalculatorView");
}
