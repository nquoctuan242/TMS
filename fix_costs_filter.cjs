const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

const oldHeader = `<h4 className="font-bold text-gray-900">Costs (Tháng {formData.costs?.month || 7})</h4>`;
const newHeader = `<div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">Costs</h4>
                        <select 
                          className="border border-gray-200 bg-gray-50 text-gray-700 rounded-md px-2 py-1 text-sm font-medium outline-none focus:border-[#2563eb] cursor-pointer"
                          value={formData.costs?.month || 7}
                          onChange={(e) => setFormData({...formData, costs: {...(formData.costs as any), month: parseInt(e.target.value)}})}
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                            <option key={m} value={m}>Month {m}</option>
                          ))}
                        </select>
                     </div>`;

content = content.replace(oldHeader, newHeader);

// We should also replace the translation for month in the body
content = content.replace(
  /<span className="text-\[13px\] text-gray-500">Fuel Cost \(Month \{formData\.costs\?\.month \|\| 7\}\)<\/span>/g,
  '<span className="text-[13px] text-gray-500">Fuel Cost</span>'
);

content = content.replace(
  /<span className="text-\[13px\] text-gray-500">Maintenance Cost \(Month \{formData\.costs\?\.month \|\| 7\}\)<\/span>/g,
  '<span className="text-[13px] text-gray-500">Maintenance Cost</span>'
);


fs.writeFileSync('src/VehicleDetailView.tsx', content);
console.log('Fixed Costs filter');
