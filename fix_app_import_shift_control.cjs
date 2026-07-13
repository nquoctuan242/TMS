const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const importTarget = `import { TicketContentListView } from './src/TicketContentListView';`;
const importReplace = `import { TicketContentListView } from './src/TicketContentListView';
import { ShiftControlListView } from './src/ShiftControlListView';
import { ShiftControlDetailView } from './src/ShiftControlDetailView';`;
content = content.replace(importTarget, importReplace);

// Also need to add state for `selectedShiftControlId`
const stateTarget = `const [selectedScanTimeId, setSelectedScanTimeId] = useState<string | null>(null);`;
const stateReplace = `const [selectedScanTimeId, setSelectedScanTimeId] = useState<string | null>(null);
  const [selectedShiftControlId, setSelectedShiftControlId] = useState<string | null>(null);`;
content = content.replace(stateTarget, stateReplace);

const renderTarget = `         ) : currentView === 'payroll-period-detail' ? (
             <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between border-b px-4 py-3">`;

const renderReplace = `         ) : currentView === 'shift-control-list' ? (
             <ShiftControlListView 
               onRowClick={(id) => {
                 setSelectedShiftControlId(id);
                 setCurrentView('shift-control-detail');
               }}
               onCreateClick={() => {
                 setSelectedShiftControlId(null);
                 setCurrentView('shift-control-detail');
               }}
             />
          ) : currentView === 'shift-control-detail' ? (
             <ShiftControlDetailView
               configId={selectedShiftControlId}
               onBack={() => setCurrentView('shift-control-list')}
             />
          ) : currentView === 'payroll-period-detail' ? (
             <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between border-b px-4 py-3">`;
content = content.replace(renderTarget, renderReplace);

fs.writeFileSync('App.tsx', content);
console.log("Updated App.tsx to include shift control views");
