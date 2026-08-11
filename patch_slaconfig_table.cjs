const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');

// 1. Add states for Service Level Configs
content = content.replace(
  'const [editingOverride, setEditingOverride] = useState<any>(null);',
  'const [editingOverride, setEditingOverride] = useState<any>(null);\n  const [showSlcModal, setShowSlcModal] = useState(false);\n  const [editingSlc, setEditingSlc] = useState<any>(null);'
);

// 2. Init locationOverrides & serviceLevelConfigs array if empty
content = content.replace(
  'locationOverrides: []',
  'locationOverrides: [],\n        serviceLevelConfigs: []'
);

// 3. The new Service Level Configs section
const slcTableSection = `
        {/* Service Level Configs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <div>
                <h3 className="font-bold text-[#111827] text-sm">Service Level Configs</h3>
                <p className="text-xs text-gray-500 mt-1">Configure partner and weight attributes for multiple carriers/customers</p>
              </div>
              <button 
                onClick={() => {
                  setEditingSlc({
                    id: Date.now().toString(),
                    partner: 'Carrier',
                    volumetricDivisor: 5000,
                    weightRoundStep: 0.5,
                    weightRoundMethod: 'up',
                    minChargeableWeight: 1,
                    maxWeight: 30,
                    isActive: true
                  });
                  setShowSlcModal(true);
                }}
                className="bg-white border border-[#3b5998] text-[#3b5998] px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-plus"></i> Add config
              </button>
           </div>
           
           <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f8fafc] text-gray-600 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Partner</th>
                    <th className="px-4 py-3 text-right">Vol. Divisor</th>
                    <th className="px-4 py-3 text-right">Weight Step</th>
                    <th className="px-4 py-3 text-center">Round Method</th>
                    <th className="px-4 py-3 text-right">Min Wt.</th>
                    <th className="px-4 py-3 text-right">Max Wt.</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {formData.serviceLevelConfigs && formData.serviceLevelConfigs.map((config, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{config.partner}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.volumetricDivisor}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.weightRoundStep}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{config.weightRoundMethod}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.minChargeableWeight}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.maxWeight}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={\`px-2 py-1 rounded-full text-[10px] font-bold \${config.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}\`}>
                          {config.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => {
                            setEditingSlc(config);
                            setShowSlcModal(true);
                          }}
                          className="text-[#3b5998] hover:text-blue-800 transition-colors"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!formData.serviceLevelConfigs || formData.serviceLevelConfigs.length === 0) && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500 text-[13px]">
                        No service level configs defined.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
           </div>
        </div>
`;

// Regex to replace the old Service Level Configs block.
// It starts from "{/* Service Level Configs */}" until the end of that main div.
// Note: It's the last section before the main closing div.
const serviceLevelConfigsRegex = /\{\/\* Service Level Configs \*\/\}[\s\S]*?(?=<\/div>\s*<\/div>\s*$)/;
content = content.replace(serviceLevelConfigsRegex, slcTableSection + '\n\n      ');

// 4. The SLC Modal
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

content = content.replace('      </div>\n    </div>\n  );\n}', slcModal + '\n      </div>\n    </div>\n  );\n}');

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
