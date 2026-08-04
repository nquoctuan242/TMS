const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf-8');

// Add import
content = content.replace(
  "import { Vehicle, VehicleDocument } from '../types';",
  "import { Vehicle, VehicleDocument } from '../types';\nimport { MOCK_STORES } from '../constants';"
);

// Add Store Default field in Edit modal
const storeDefaultInput = `              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Store Default</label>
                <select value={formData.storeDefault || ''} onChange={e => setFormData({...formData, storeDefault: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]">
                  <option value="">-- Select Store --</option>
                  {MOCK_STORES.map(store => (
                    <option key={store.id} value={store.name}>{store.name}</option>
                  ))}
                </select>
              </div>`;

content = content.replace(
  '<div className="space-y-1">\\n                <label className="text-xs font-bold text-gray-700">Ownership</label>',
  storeDefaultInput + '\\n              <div className="space-y-1">\\n                <label className="text-xs font-bold text-gray-700">Ownership</label>'
);

// Add Store Default in Profile Card
const storeDefaultProfile = `<div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Store Default</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.storeDefault || 'None'}</span>
                </div>`;

content = content.replace(
  '<div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">\\n                  <span className="text-[13px] text-gray-500">Ownership</span>',
  storeDefaultProfile + '\\n                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">\\n                  <span className="text-[13px] text-gray-500">Ownership</span>'
);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
