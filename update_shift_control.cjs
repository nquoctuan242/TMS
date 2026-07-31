const fs = require('fs');
let content = fs.readFileSync('src/ShiftControlDetailView.tsx', 'utf8');

// Update imports
if (!content.includes('ShiftBreakConfig')) {
    content = content.replace('ShiftControlConfig', 'ShiftControlConfig, ShiftBreakConfig');
}

// Update initial state
const initialStateTarget = `    allowReturnAllAtEnd: true,
    createdAt: new Date().toISOString()
  });`;
const initialStateReplacement = `    allowReturnAllAtEnd: true,
    restBreaks: [],
    mealBreaks: [],
    createdAt: new Date().toISOString()
  });`;
content = content.replace(initialStateTarget, initialStateReplacement);

// Render Break List function
const renderBreakList = `
  const renderBreakList = (title, type, icon) => {
    const breaks = formData[type] || [];
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className={\`fa-solid \${icon} text-[#4d9e5f]\`}></i>
              <h3 className="font-bold text-[#1b4d3e] text-sm uppercase tracking-wider">{title}</h3>
            </div>
            <button 
              onClick={() => {
                 const newBreak = { id: Math.random().toString(36).substr(2, 9), startTime: '12:00', endTime: '13:00', warnBeforeMinutes: 15, isActive: true, turnOffApp: false };
                 setFormData({ ...formData, [type]: [...breaks, newBreak] });
              }}
              className="text-[#4d9e5f] hover:text-[#1b4d3e] text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <i className="fa-solid fa-plus-circle"></i> Add {title}
            </button>
          </div>
          <div className="p-4">
            {breaks.length === 0 ? (
              <div className="text-center py-6 text-gray-400 italic text-xs border border-dashed rounded-md bg-gray-50/50">
                No {title} configurations.
              </div>
            ) : (
              <div className="space-y-4">
                {breaks.map((b, index) => (
                  <div key={b.id} className="border border-gray-200 rounded-lg overflow-hidden relative group bg-white">
                     <div className="absolute top-2 right-2 flex gap-2">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500">ACTIVE</span>
                            <button 
                              onClick={() => {
                                const newBreaks = [...breaks];
                                newBreaks[index] = { ...b, isActive: !b.isActive };
                                setFormData({ ...formData, [type]: newBreaks });
                              }}
                              className={\`relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${b.isActive ? 'bg-[#4d9e5f]' : 'bg-gray-300'}\`}
                            >
                              <span className={\`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${b.isActive ? 'translate-x-3' : 'translate-x-0'}\`} />
                            </button>
                         </div>
                         <button 
                           onClick={() => {
                              const newBreaks = breaks.filter((_, i) => i !== index);
                              setFormData({ ...formData, [type]: newBreaks });
                           }} 
                           className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                         >
                           <i className="fa-solid fa-trash-can text-[10px]"></i>
                         </button>
                     </div>
                     <div className="p-4 pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Start Time</label>
                          <input 
                            type="time" 
                            value={b.startTime} 
                            onChange={(e) => {
                               const newBreaks = [...breaks];
                               newBreaks[index] = { ...b, startTime: e.target.value };
                               setFormData({ ...formData, [type]: newBreaks });
                            }}
                            className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">End Time</label>
                          <input 
                            type="time" 
                            value={b.endTime} 
                            onChange={(e) => {
                               const newBreaks = [...breaks];
                               newBreaks[index] = { ...b, endTime: e.target.value };
                               setFormData({ ...formData, [type]: newBreaks });
                            }}
                            className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Warning (Mins Before)</label>
                          <input 
                            type="number" 
                            value={b.warnBeforeMinutes} 
                            onChange={(e) => {
                               const newBreaks = [...breaks];
                               newBreaks[index] = { ...b, warnBeforeMinutes: parseInt(e.target.value) || 0 };
                               setFormData({ ...formData, [type]: newBreaks });
                            }}
                            className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Turn off App during break</label>
                          <div className="h-[30px] flex items-center">
                            <button 
                              onClick={() => {
                                const newBreaks = [...breaks];
                                newBreaks[index] = { ...b, turnOffApp: !b.turnOffApp };
                                setFormData({ ...formData, [type]: newBreaks });
                              }}
                              className={\`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${b.turnOffApp ? 'bg-red-500' : 'bg-gray-300'}\`}
                            >
                              <span className={\`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${b.turnOffApp ? 'translate-x-4' : 'translate-x-0'}\`} />
                            </button>
                            <span className="ml-2 text-[10px] font-medium text-gray-600">{b.turnOffApp ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    );
  };
`;

const insertPoint = `        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center gap-2">`;

content = content.replace(insertPoint, renderBreakList + '\n' + insertPoint);

// Insert break sections after the Shift End Rules
const endPoint = `        </div>
        
      </div>
    </div>
  );
}`;

const finalSections = `        </div>
        
        {renderBreakList('Rest Break', 'restBreaks', 'fa-mug-hot')}
        {renderBreakList('Meal Break', 'mealBreaks', 'fa-utensils')}
        
      </div>
    </div>
  );
}`;

content = content.replace(endPoint, finalSections);

fs.writeFileSync('src/ShiftControlDetailView.tsx', content);
console.log('ShiftControlDetailView updated');
