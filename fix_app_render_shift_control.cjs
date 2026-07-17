const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const targetStr = `           ) : currentView === 'payroll-period-detail' ? (
             <div className="bg-[#f8fafc] min-h-full flex flex-col items-center py-6 px-4 pb-24 animate-in fade-in duration-300 relative">`;

const replaceStr = `           ) : currentView === 'shift-control-list' ? (
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
             <div className="bg-[#f8fafc] min-h-full flex flex-col items-center py-6 px-4 pb-24 animate-in fade-in duration-300 relative">`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync('App.tsx', content);
    console.log("Successfully inserted shift control views");
} else {
    console.log("Failed to find target rendering string");
}
