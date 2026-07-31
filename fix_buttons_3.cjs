const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

const targetStr = `              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">In-service Date</label>
                <input value={formData.inServiceDate} onChange={e => setFormData({...formData, inServiceDate: e.target.value})} placeholder="DD/MM/YYYY" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>`;

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

content = content.replace(targetStr, newFields);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
console.log('Fixed buttons and modals string replace');
