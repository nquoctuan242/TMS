const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// The first patch failed because of ShiftControlDetailView props might be different
// Let's find shift-control-detail using a broader regex
const renderRegex = /\{currentView === 'shift-control-detail'[^}]+\/>\}/;
const match = content.match(renderRegex);
if (match) {
    const replacement = match[0] + `\n      {currentView === 'vehicle-documents' && <VehicleDocumentsView />}\n      {currentView === 'vehicle-maintenance' && <div className="p-8"><h2 className="text-xl font-bold">Maintenance (Coming soon)</h2></div>}`;
    content = content.replace(match[0], replacement);
    console.log("Render logic patched");
}

fs.writeFileSync('App.tsx', content);
