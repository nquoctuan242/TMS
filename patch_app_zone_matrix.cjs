const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf-8');

// 1. Add imports
content = content.replace(
  "import { ZoneRuleDetailView } from \"./src/ZoneRuleDetailView\";",
  "import { ZoneRuleDetailView } from \"./src/ZoneRuleDetailView\";\nimport { ZoneMatrixListView } from \"./src/ZoneMatrixListView\";\nimport { ZoneMatrixDetailView } from \"./src/ZoneMatrixDetailView\";"
);

// 2. Add currentView types
content = content.replace(
  /\| 'zone-rule-list' \| 'zone-rule-detail' \|/g,
  "| 'zone-rule-list' | 'zone-rule-detail' | 'zone-matrix-list' | 'zone-matrix-detail' |"
);

// 3. Add selected state
content = content.replace(
  "const [selectedZoneRuleId, setSelectedZoneRuleId] = useState<string | null>(null);",
  "const [selectedZoneRuleId, setSelectedZoneRuleId] = useState<string | null>(null);\n  const [selectedZoneMatrixId, setSelectedZoneMatrixId] = useState<string | null>(null);"
);

// 4. Update header title
content = content.replace(
  "currentView === 'zone-rule-detail' ? 'Zone Rule Detail' :",
  "currentView === 'zone-rule-detail' ? 'Zone Rule Detail' :\n                 currentView === 'zone-matrix-list' ? 'Zone Matrix Management' :\n                 currentView === 'zone-matrix-detail' ? 'Zone Matrix Detail' :"
);

// 5. Update Sidebar active condition
content = content.replace(
  /\|\| currentView === 'zone-rule-detail'/g,
  "|| currentView === 'zone-rule-detail' || currentView === 'zone-matrix-list' || currentView === 'zone-matrix-detail'"
);

// 6. Update Sidebar menu item
const matrixMenu = `                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'zone-matrix-list' || currentView === 'zone-matrix-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('zone-matrix-list')}
                >
                  Zone Matrix
                </div>`;

content = content.replace(
  "                  Zone Rule\n                </div>",
  "                  Zone Rule\n                </div>\n" + matrixMenu
);

// 7. Render components
const matrixRender = `          ) : currentView === 'zone-matrix-list' ? (
             <ZoneMatrixListView
               onEdit={(id) => {
                 setSelectedZoneMatrixId(id);
                 setCurrentView('zone-matrix-detail');
               }}
               onCreate={() => {
                 setSelectedZoneMatrixId(null);
                 setCurrentView('zone-matrix-detail');
               }}
             />
          ) : currentView === 'zone-matrix-detail' ? (
             <ZoneMatrixDetailView
               configId={selectedZoneMatrixId}
               onBack={() => setCurrentView('zone-matrix-list')}
             />
`;

content = content.replace(
  "          ) : currentView === 'zone-rule-list' ? (",
  matrixRender + "          ) : currentView === 'zone-rule-list' ? ("
);

fs.writeFileSync('App.tsx', content);
