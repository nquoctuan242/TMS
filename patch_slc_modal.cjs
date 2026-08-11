const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');

const slcModal = `
        {/* SLC Override Modal */}
        {showSlcModal && editingSlc && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-[#111827]">Service Level Config</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-600 uppercase">Is Active</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={editingSlc.isActive}
                        onChange={(e) => setEditingSlc({...editingSlc, isActive: e.target.checked})}
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#059669]"></div>
                    </label>
                  </div>
                  <button onClick={() => setShowSlcModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <i className="fa-solid fa-xmark text-lg"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Partner</label>
                    <select 
                      value={editingSlc.partner} 
                      onChange={e => setEditingSlc({...editingSlc, partner: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    >
                      <option value="Carrier">Carrier</option>
                      <option value="Customer">Customer</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Volumetric Divisor</label>
                    <input 
                      type="number"
                      value={editingSlc.volumetricDivisor} 
                      onChange={e => setEditingSlc({...editingSlc, volumetricDivisor: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Weight Round Step</label>
                    <input 
                      type="number"
                      step="0.1"
                      value={editingSlc.weightRoundStep} 
                      onChange={e => setEditingSlc({...editingSlc, weightRoundStep: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Weight Round Method</label>
                    <select 
                      value={editingSlc.weightRoundMethod} 
                      onChange={e => setEditingSlc({...editingSlc, weightRoundMethod: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    >
                      <option value="up">Round Up</option>
                      <option value="down">Round Down</option>
                      <option value="nearest">Round Nearest</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Min Chargeable Wt.</label>
                    <input 
                      type="number"
                      value={editingSlc.minChargeableWeight} 
                      onChange={e => setEditingSlc({...editingSlc, minChargeableWeight: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Max Weight</label>
                    <input 
                      type="number"
                      value={editingSlc.maxWeight} 
                      onChange={e => setEditingSlc({...editingSlc, maxWeight: Number(e.target.value)})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3b5998]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
                <button 
                  onClick={() => setShowSlcModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded text-[13px] font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const currentConfigs = formData.serviceLevelConfigs || [];
                    const existingIndex = currentConfigs.findIndex((c) => c.id === editingSlc.id);
                    let newConfigs = [...currentConfigs];
                    if (existingIndex >= 0) {
                      newConfigs[existingIndex] = editingSlc;
                    } else {
                      newConfigs.push(editingSlc);
                    }
                    setFormData({ ...formData, serviceLevelConfigs: newConfigs });
                    setShowSlcModal(false);
                  }}
                  className="px-4 py-2 bg-[#3b5998] text-white rounded text-[13px] font-bold hover:bg-blue-800 transition-colors"
                >
                  Save Config
                </button>
              </div>
            </div>
          </div>
        )}
`;

content = content.replace(
  '      )}\n    </div>\n  );\n}',
  '      )}\n' + slcModal + '\n    </div>\n  );\n}'
);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
