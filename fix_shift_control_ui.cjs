const fs = require('fs');
let content = fs.readFileSync('src/ShiftControlDetailView.tsx', 'utf8');

const targetState = `    stateProvince: '',
    warnBeforeShiftEndMinutes: 30,`;
const replaceState = `    stateProvince: '',
    warnBeforeShiftEndEnabled: true,
    warnBeforeShiftEndMinutes: 30,`;

content = content.replace(targetState, replaceState);

const targetUI = `            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-800 mb-1">Warning Before Shift Ends</h4>
                <p className="text-[11px] text-gray-500">Alert the shipper when their shift is about to end.</p>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number"
                  min="0"
                  className="w-20 border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f] text-center font-bold"
                  value={formData.warnBeforeShiftEndMinutes}
                  onChange={(e) => setFormData({...formData, warnBeforeShiftEndMinutes: parseInt(e.target.value) || 0})}
                />
                <span className="text-xs font-medium text-gray-600">minutes</span>
              </div>
            </div>`;
const replaceUI = `            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-800 mb-1">Warning Before Shift Ends</h4>
                <p className="text-[11px] text-gray-500">Alert the shipper when their shift is about to end.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    min="0"
                    disabled={!formData.warnBeforeShiftEndEnabled}
                    className={\`w-20 border rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f] text-center font-bold \${formData.warnBeforeShiftEndEnabled !== false ? 'border-gray-300' : 'border-gray-200 bg-gray-50 text-gray-400'}\`}
                    value={formData.warnBeforeShiftEndMinutes}
                    onChange={(e) => setFormData({...formData, warnBeforeShiftEndMinutes: parseInt(e.target.value) || 0})}
                  />
                  <span className={\`text-xs font-medium \${formData.warnBeforeShiftEndEnabled !== false ? 'text-gray-600' : 'text-gray-400'}\`}>minutes</span>
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <button 
                  onClick={() => setFormData({...formData, warnBeforeShiftEndEnabled: formData.warnBeforeShiftEndEnabled === false ? true : false})}
                  className={\`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${formData.warnBeforeShiftEndEnabled !== false ? 'bg-[#4d9e5f]' : 'bg-gray-300'}\`}
                >
                  <span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${formData.warnBeforeShiftEndEnabled !== false ? 'translate-x-5' : 'translate-x-0'}\`} />
                </button>
              </div>
            </div>`;

if (content.includes(targetUI)) {
    content = content.replace(targetUI, replaceUI);
    fs.writeFileSync('src/ShiftControlDetailView.tsx', content);
    console.log("Updated ShiftControlDetailView.tsx!");
} else {
    console.log("Target UI string not found!");
}
