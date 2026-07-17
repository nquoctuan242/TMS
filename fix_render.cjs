const fs = require('fs');
let appContent = fs.readFileSync('App.tsx', 'utf8');

const oldRenderList = `<LandingCostListView \n               configs={landingCostConfigs}\n               onAddNew={() => { setEditingLandingCostConfig(null); setCurrentView('landing-cost-detail'); }}\n               onEdit={(c) => { setEditingLandingCostConfig(c); setCurrentView('landing-cost-detail'); }}\n             />`;

if (appContent.includes(oldRenderList)) {
  appContent = appContent.replace(oldRenderList, `<LandingCostListView \n               configs={landingCostConfigs}\n               onAddNew={() => { setEditingLandingCostConfig(null); setCurrentView('landing-cost-detail'); }}\n               onEdit={(c) => { setEditingLandingCostConfig(c); setCurrentView('landing-cost-detail'); }}\n               onOpenCalculator={() => setCurrentView('landing-cost-calculator')}\n             />`);
  
  appContent = appContent.replace(
    ") : currentView === 'landing-cost-detail' ? (",
    ") : currentView === 'landing-cost-calculator' ? (\n             <LandingCostCalculatorView onBack={() => setCurrentView('landing-cost-list')} />\n          ) : currentView === 'landing-cost-detail' ? ("
  );
  
  fs.writeFileSync('App.tsx', appContent);
  console.log("Updated App.tsx successfully");
} else {
  console.log("Could not find oldRenderList");
}
