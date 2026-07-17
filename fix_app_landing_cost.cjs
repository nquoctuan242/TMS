const fs = require('fs');
let appContent = fs.readFileSync('App.tsx', 'utf8');

// Add import
if (!appContent.includes('import { LandingCostView }')) {
    appContent = appContent.replace(
        "import { ScanTimeListView } from './ScanTimeListView';",
        "import { ScanTimeListView } from './ScanTimeListView';\nimport { LandingCostView } from './LandingCostView';"
    );
}

// Add state for 'landing-cost' view if not already possible via currentView (it is string, so it should be fine)
// We need to add the sidebar menu item above "Configs".
const configSidebarItem = `<div className="mt-4 mb-1 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Configs</div>`;
const landingCostSidebarItem = `            <div 
              className={\`px-4 py-2 flex justify-between items-center cursor-pointer transition-colors \${
                currentView === 'landing-cost' ? 'bg-[#1b4d3e]/10 border-r-2 border-[#1b4d3e]' : 'hover:bg-gray-50'
              }\`}
              onClick={() => setCurrentView('landing-cost')}
            >
              <div className="flex items-center gap-3">
                <div className={\`w-5 text-center \${currentView === 'landing-cost' ? 'text-[#1b4d3e]' : 'text-gray-400'}\`}>
                  <i className="fa-solid fa-calculator text-sm"></i>
                </div>
                <span className={\`text-xs \${currentView === 'landing-cost' ? 'font-bold text-[#1b4d3e]' : 'font-medium text-gray-700'}\`}>Landing Cost</span>
              </div>
            </div>`;

if (!appContent.includes('Landing Cost')) {
    appContent = appContent.replace(configSidebarItem, landingCostSidebarItem + '\n            ' + configSidebarItem);
}

// Add view render block
const renderConfigStrategy = `currentView === 'config-strategy' ? (
             <ConfigStrategyView />
          ) :`;

const renderLandingCost = `currentView === 'landing-cost' ? (
             <LandingCostView />
          ) :`;

if (!appContent.includes('<LandingCostView />')) {
    appContent = appContent.replace(renderConfigStrategy, renderLandingCost + '\n          ' + renderConfigStrategy);
}

fs.writeFileSync('App.tsx', appContent);
console.log("Updated App.tsx!");
