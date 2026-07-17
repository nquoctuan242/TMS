const fs = require('fs');
let content = fs.readFileSync('src/ShiftControlDetailView.tsx', 'utf8');

const targetUI = `<div className="text-[11px] text-gray-500 mb-4 bg-blue-50 text-blue-700 p-3 rounded border border-blue-100 flex items-start gap-2">
              <i className="fa-solid fa-circle-info mt-0.5"></i>
              <span>If you select a specific State/Province, this configuration will apply only to that area. If left empty, it will apply as the default rule for the entire country.</span>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Country</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  <option value="Vietnam (VN)">Vietnam (VN)</option>
                  <option value="Thailand (TH)">Thailand (TH)</option>
                  <option value="Malaysia (MY)">Malaysia (MY)</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">State / Province</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({...formData, stateProvince: e.target.value})}
                >
                  <option value="">All (Apply to Country)</option>
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Ha Noi">Ha Noi</option>
                  <option value="Da Nang">Da Nang</option>
                  <option value="Binh Duong">Binh Duong</option>
                </select>
              </div>
            </div>`;

const replaceUI = `<div className="text-[11px] text-gray-500 mb-4 bg-blue-50 text-blue-700 p-3 rounded border border-blue-100 flex items-start gap-2">
              <i className="fa-solid fa-circle-info mt-0.5"></i>
              <span>If you select a specific Store, this configuration applies only to that store. Otherwise, it falls back to State/Province, then Country.</span>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Country</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  <option value="Vietnam (VN)">Vietnam (VN)</option>
                  <option value="Thailand (TH)">Thailand (TH)</option>
                  <option value="Malaysia (MY)">Malaysia (MY)</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">State / Province</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({...formData, stateProvince: e.target.value, storeId: ''})}
                >
                  <option value="">All (Apply to Country)</option>
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Ha Noi">Ha Noi</option>
                  <option value="Da Nang">Da Nang</option>
                  <option value="Binh Duong">Binh Duong</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Store</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.storeId || ''}
                  onChange={(e) => setFormData({...formData, storeId: e.target.value})}
                >
                  <option value="">All (Apply to State/Country)</option>
                  {stores.map(store => (
                    <option key={store.id} value={store.id}>{store.name}</option>
                  ))}
                </select>
              </div>
            </div>`;

if (content.includes(targetUI)) {
    content = content.replace(targetUI, replaceUI);
    fs.writeFileSync('src/ShiftControlDetailView.tsx', content);
    console.log("Updated UI!");
} else {
    console.log("Target UI not found!");
}
