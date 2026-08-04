const fs = require('fs');

let content = fs.readFileSync('src/ShiftControlDetailView.tsx', 'utf-8');

// Remove Break Global Settings
content = content.replace(/\{\/\* Break Global Settings \*\/\}[\s\S]*?<\/div>\s*<\/div>/, '');

// Modify renderBreakList layout and add Min Deviation field
content = content.replace(
  '<div className="p-4 pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">',
  '<div className="p-4 pt-6 grid grid-cols-2 md:grid-cols-5 gap-4">'
);

const newField = `                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Turn off App during break</label>`;

const replacementField = `                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight" title="Minimum Deviation Time to Skip Break">Min Deviation (Mins)</label>
                          <input 
                            type="number" 
                            min="0"
                            value={b.minDeviationMinutes || 0} 
                            onChange={(e) => {
                               const newBreaks = [...breaks];
                               newBreaks[index] = { ...b, minDeviationMinutes: parseInt(e.target.value) || 0 };
                               setFormData({ ...formData, [type]: newBreaks });
                            }}
                            className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Turn off App during break</label>`;

content = content.replace(newField, replacementField);

fs.writeFileSync('src/ShiftControlDetailView.tsx', content);
