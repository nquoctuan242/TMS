const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

const oldTabsContainer = `<div className="flex bg-gray-100/50 p-1 rounded-lg border border-gray-200">`;
const newTabsContainer = `<div className="flex bg-white rounded-lg border border-gray-200 p-0.5 shadow-sm">`;
content = content.replace(oldTabsContainer, newTabsContainer);

const oldTabs = `              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={\`px-4 py-1.5 text-sm font-medium rounded-md transition-colors \${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}\`}
              >
                {tab}
              </button>`;
const newTabs = `              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={\`px-4 py-1.5 text-sm font-medium transition-colors border-r last:border-r-0 border-gray-200 \${activeTab === tab ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-600 hover:text-gray-900'}\`}
              >
                {tab}
              </button>`;
content = content.replace(oldTabs, newTabs);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
