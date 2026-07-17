const fs = require('fs');

let typesContent = fs.readFileSync('types.ts', 'utf8');
if (!typesContent.includes('export interface LandingCostConfig')) {
    typesContent += `\nexport interface LandingCostConfig {
  id: string;
  name: string;
  type: string;
  formula: string;
  isActive: boolean;
  country: string;
  stateProvince?: string;
  storeId?: string;
  createdAt: string;
}\n`;
    fs.writeFileSync('types.ts', typesContent);
    console.log("Updated types.ts");
}

let constantsContent = fs.readFileSync('constants.tsx', 'utf8');
if (!constantsContent.includes('MOCK_LANDING_COST_CONFIGS')) {
    constantsContent += `\nexport const MOCK_LANDING_COST_CONFIGS: import('./types').LandingCostConfig[] = [
  {
    id: '1',
    name: 'Standard Import Duty',
    type: 'Duty',
    formula: 'FOB_PRICE * 0.15',
    isActive: true,
    country: 'Vietnam (VN)',
    createdAt: '2026-07-16T10:00:00Z'
  },
  {
    id: '2',
    name: 'Fragile Handling Fee',
    type: 'Handling',
    formula: 'QTY * 2.5',
    isActive: true,
    country: 'Vietnam (VN)',
    stateProvince: 'Ho Chi Minh',
    createdAt: '2026-07-16T11:00:00Z'
  }
];\n`;
    fs.writeFileSync('constants.tsx', constantsContent);
    console.log("Updated constants.tsx");
}

let appContent = fs.readFileSync('App.tsx', 'utf8');

// Replace imports
appContent = appContent.replace(
    "import { LandingCostView } from './LandingCostView';",
    "import { LandingCostListView } from './LandingCostListView';\nimport { LandingCostDetailView } from './LandingCostDetailView';"
);

// Add MOCK_LANDING_COST_CONFIGS to imports if needed
appContent = appContent.replace(
    "import { STORES_LIST_MOCK, MOCK_SHIFT_CONTROL_CONFIGS } from './constants';",
    "import { STORES_LIST_MOCK, MOCK_SHIFT_CONTROL_CONFIGS, MOCK_LANDING_COST_CONFIGS } from './constants';"
);
if(!appContent.includes('MOCK_LANDING_COST_CONFIGS')) {
    appContent = appContent.replace(
        "import { STORES_LIST_MOCK, MOCK_SHIFT_CONTROL_CONFIGS",
        "import { STORES_LIST_MOCK, MOCK_SHIFT_CONTROL_CONFIGS, MOCK_LANDING_COST_CONFIGS"
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

// Add Landing Cost List sidebar menu
const sidebarBlockOld = `            <div 
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
const sidebarBlockNew = `            <div 
              className={\`px-4 py-2 flex justify-between items-center cursor-pointer transition-colors \${
                currentView === 'landing-cost-list' || currentView === 'landing-cost-detail' ? 'bg-[#1b4d3e]/10 border-r-2 border-[#1b4d3e]' : 'hover:bg-gray-50'
              }\`}
              onClick={() => setCurrentView('landing-cost-list')}
            >
              <div className="flex items-center gap-3">
                <div className={\`w-5 text-center \${currentView === 'landing-cost-list' || currentView === 'landing-cost-detail' ? 'text-[#1b4d3e]' : 'text-gray-400'}\`}>
                  <i className="fa-solid fa-money-bill-transfer text-sm"></i>
                </div>
                <span className={\`text-xs \${currentView === 'landing-cost-list' || currentView === 'landing-cost-detail' ? 'font-bold text-[#1b4d3e]' : 'font-medium text-gray-700'}\`}>Landing Cost</span>
              </div>
            </div>`;
appContent = appContent.replace(sidebarBlockOld, sidebarBlockNew);

// Add view render blocks
const renderOld = `currentView === 'landing-cost' ? (
             <LandingCostView />
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

appContent = appContent.replace(renderOld, renderNew);

fs.writeFileSync('App.tsx', appContent);
console.log("Updated App.tsx with Landing Cost List/Detail!");
