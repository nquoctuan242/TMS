const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf-8');

// 1. Add MOCK_VEHICLE_PURPOSES import
content = content.replace(
  "import { MOCK_STORES } from '../constants';",
  "import { MOCK_STORES, MOCK_VEHICLE_PURPOSES } from '../constants';"
);

// 2. Add vehiclePurpose to form logic in 'isCreate ?' ternary.
content = content.replace(
  "storeDefault: isCreate ? '' : 'Store 123',",
  "storeDefault: isCreate ? '' : 'Store 123',\n    vehiclePurpose: isCreate ? '' : 'Delivery',"
);

// 3. Add to Edit profile modal
const purposeInput = `              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Vehicle Purpose</label>
                <select value={formData.vehiclePurpose || ''} onChange={e => setFormData({...formData, vehiclePurpose: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]">
                  <option value="">-- Select Purpose --</option>
                  {MOCK_VEHICLE_PURPOSES.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>`;
content = content.replace(
  '<div className="space-y-1">\\n                <label className="text-xs font-bold text-gray-700">Store Default</label>',
  purposeInput + '\\n              <div className="space-y-1">\\n                <label className="text-xs font-bold text-gray-700">Store Default</label>'
);

// 4. Add to Profile card
const purposeProfile = `<div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Vehicle Purpose</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.vehiclePurpose || 'None'}</span>
                </div>`;
content = content.replace(
  '<div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">\\n                  <span className="text-[13px] text-gray-500">Store Default</span>',
  purposeProfile + '\\n                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">\\n                  <span className="text-[13px] text-gray-500">Store Default</span>'
);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
