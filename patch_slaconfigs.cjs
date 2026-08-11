const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');

const serviceLevelConfigs = `
        {/* Service Level Configs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <div>
                <h3 className="font-bold text-[#111827] text-sm">Service Level Configs</h3>
                <p className="text-xs text-gray-500 mt-1">Configure partner and weight attributes</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-gray-600 uppercase">Is Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.isActive ?? true}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#059669]"></div>
                </label>
              </div>
           </div>
           
           <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Partner</label>
                  <select 
                    value={formData.partner || ''} 
                    onChange={e => setFormData({...formData, partner: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                  >
                    <option value="">Select partner type</option>
                    <option value="Carrier">Carrier</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Volumetric Divisor</label>
                  <input 
                    type="number"
                    value={formData.volumetricDivisor || ''} 
                    onChange={e => setFormData({...formData, volumetricDivisor: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    placeholder="e.g. 5000"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Weight Round Step</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={formData.weightRoundStep || ''} 
                    onChange={e => setFormData({...formData, weightRoundStep: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    placeholder="e.g. 0.5"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Weight Round Method</label>
                  <select 
                    value={formData.weightRoundMethod || ''} 
                    onChange={e => setFormData({...formData, weightRoundMethod: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                  >
                    <option value="">Select method</option>
                    <option value="up">Round Up</option>
                    <option value="down">Round Down</option>
                    <option value="nearest">Round Nearest</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Min Chargeable Wt.</label>
                  <input 
                    type="number"
                    value={formData.minChargeableWeight || ''} 
                    onChange={e => setFormData({...formData, minChargeableWeight: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    placeholder="e.g. 1"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Max Weight</label>
                  <input 
                    type="number"
                    value={formData.maxWeight || ''} 
                    onChange={e => setFormData({...formData, maxWeight: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    placeholder="e.g. 30"
                  />
                </div>
              </div>
           </div>
        </div>
`;

content = content.replace(
  '        {/* Cutoff Time & Location Overrides */}',
  serviceLevelConfigs + '\n        {/* Cutoff Time & Location Overrides */}'
);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
