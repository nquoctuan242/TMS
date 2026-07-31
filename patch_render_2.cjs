const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Title map
const titleSearch = "currentView === 'shift-control-detail' ? 'Shift Control Detail' :";
const titleReplace = "currentView === 'shift-control-detail' ? 'Shift Control Detail' :\n                 currentView === 'vehicle-documents' ? 'Vehicle Documents' :\n                 currentView === 'vehicle-maintenance' ? 'Maintenance' :";
content = content.replace(titleSearch, titleReplace);

// Render block
// We can find `currentView === 'vehicle-list' ? (` and insert before it
const renderSearch = /          \) : currentView === 'vehicle-list' \? \(/g;
const renderReplace = `          ) : currentView === 'vehicle-documents' ? (
             <VehicleDocumentsView />
          ) : currentView === 'vehicle-maintenance' ? (
             <div className="p-8"><h2 className="text-xl font-bold">Maintenance (Coming soon)</h2></div>
          ) : currentView === 'vehicle-list' ? (`

content = content.replace(renderSearch, renderReplace);

fs.writeFileSync('App.tsx', content);
