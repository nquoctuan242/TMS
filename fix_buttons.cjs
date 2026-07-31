const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

// 1. Remove state
content = content.replace(/const \[showStatusModal, setShowStatusModal\] = useState\(false\);\n\s*/g, '');

// 2. Remove Status Edit Modal
const modalRegex = /\{\/\* Status Edit Modal \*\/\}.*?\{\/\* Document Modal \*\/\}/s;
content = content.replace(modalRegex, '{/* Document Modal */}');

// 3. Remove Edit Profile button from Vehicle Status section
const buttonRegex = /<button \n\s*onClick=\{\(\) => setShowStatusModal\(true\)\}\n\s*className="text-xs font-bold text-\[#2563eb\] hover:text-blue-700 flex items-center gap-1"\n\s*>\n\s*<i className="fa-solid fa-pen-to-square"><\/i> Edit Profile\n\s*<\/button>/s;
content = content.replace(buttonRegex, '');

// 4. Add Fuel Quota, Current Mileage, and Remaining Value to Edit Profile modal
const newFields = `              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">In-service Date</label>
                <input value={formData.inServiceDate} onChange={e => setFormData({...formData, inServiceDate: e.target.value})} placeholder="DD/MM/YYYY" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Fuel Quota</label>
                <input value={formData.fuelQuota || ''} onChange={e => setFormData({...formData, fuelQuota: e.target.value})} placeholder="e.g. 15L / 100km" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Current Mileage (km)</label>
                <input type="number" value={formData.currentMileage} onChange={e => setFormData({...formData, currentMileage: parseInt(e.target.value) || 0})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Remaining Value (VND)</label>
                <input type="number" value={formData.remainingValue} onChange={e => setFormData({...formData, remainingValue: parseInt(e.target.value) || 0})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>`;

content = content.replace(
  /<div className="space-y-1">\s*<label className="text-xs font-bold text-gray-700">In-service Date<\/label>\s*<input value=\{formData\.inServiceDate\}[^>]+>\s*<\/div>/,
  newFields
);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
console.log('Fixed buttons and modals');
