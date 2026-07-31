const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

// Add state for modal
content = content.replace(
  `  const [formData, setFormData] = useState<DeliverySLAConfig | null>(null);`,
  `  const [formData, setFormData] = useState<DeliverySLAConfig | null>(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [editingOverride, setEditingOverride] = useState<any>(null);`
);

// Add Add Override button click
content = content.replace(
  `<button className="bg-[#3b5998] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#2d4373] transition-colors flex items-center gap-2">`,
  `<button 
                onClick={() => {
                  setEditingOverride({
                    id: Math.random().toString(36).substr(2, 9),
                    country: 'Vietnam (VN)',
                    stateProvince: '',
                    storeId: '',
                    cutoffTime: '12:00',
                    beforeCutoffDeliverTime: '23:59',
                    beforeCutoffDaysAdd: 0,
                    afterCutoffDeliverTime: '18:00',
                    afterCutoffDaysAdd: 1,
                    effectiveFrom: new Date().toISOString().split('T')[0]
                  });
                  setShowOverrideModal(true);
                }}
                className="bg-[#3b5998] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#2d4373] transition-colors flex items-center gap-2">`
);

// Edit and Delete buttons
content = content.replace(
  `<button className="text-[#3b5998] font-medium hover:underline mr-3">Edit</button>
                       <button className="text-[#d32f2f] font-medium hover:underline">Delete</button>`,
  `<button 
                          onClick={() => {
                            setEditingOverride(override);
                            setShowOverrideModal(true);
                          }}
                          className="text-[#3b5998] font-medium hover:underline mr-3"
                       >
                          Edit
                       </button>
                       <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this override?')) {
                              setFormData({
                                ...formData,
                                locationOverrides: formData.locationOverrides.filter(o => o.id !== override.id)
                              });
                            }
                          }}
                          className="text-[#d32f2f] font-medium hover:underline"
                       >
                          Delete
                       </button>`
);

// Add the modal component at the end
const modalComponent = `
      {showOverrideModal && editingOverride && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-[#111827]">Location Scope Override</h3>
              <button onClick={() => setShowOverrideModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Country</label>
                  <select 
                    value={editingOverride.country}
                    onChange={(e) => setEditingOverride({...editingOverride, country: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800 bg-white"
                  >
                    <option value="Vietnam (VN)">Vietnam (VN)</option>
                    <option value="Thailand (TH)">Thailand (TH)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">State / Province</label>
                  <select 
                    value={editingOverride.stateProvince || ''}
                    onChange={(e) => setEditingOverride({...editingOverride, stateProvince: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800 bg-white"
                  >
                    <option value="">All States/Provinces</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Ha Noi">Ha Noi</option>
                    <option value="Da Nang">Da Nang</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Store</label>
                  <select 
                    value={editingOverride.storeId || ''}
                    onChange={(e) => setEditingOverride({...editingOverride, storeId: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800 bg-white"
                  >
                    <option value="">All Stores in Scope</option>
                    {stores.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <hr className="border-gray-100" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                   <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Cutoff Time</label>
                   <input 
                     type="time" 
                     value={editingOverride.cutoffTime}
                     onChange={(e) => setEditingOverride({...editingOverride, cutoffTime: e.target.value})}
                     className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                   />
                </div>
                <div>
                   <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Effective From</label>
                   <input 
                     type="date" 
                     value={editingOverride.effectiveFrom}
                     onChange={(e) => setEditingOverride({...editingOverride, effectiveFrom: e.target.value})}
                     className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                   />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded p-4 bg-gray-50">
                  <label className="text-[11px] font-bold text-[#059669] tracking-tight block mb-3">Before Cutoff Delivery Rule</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 block mb-1">Deliver By Time</label>
                      <input 
                        type="time" 
                        value={editingOverride.beforeCutoffDeliverTime}
                        onChange={(e) => setEditingOverride({...editingOverride, beforeCutoffDeliverTime: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-[10px] text-gray-500 block mb-1">Days to Add</label>
                      <input 
                        type="number" 
                        value={editingOverride.beforeCutoffDaysAdd}
                        onChange={(e) => setEditingOverride({...editingOverride, beforeCutoffDaysAdd: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded p-4 bg-gray-50">
                  <label className="text-[11px] font-bold text-[#d97706] tracking-tight block mb-3">After Cutoff Delivery Rule</label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] text-gray-500 block mb-1">Deliver By Time</label>
                      <input 
                        type="time" 
                        value={editingOverride.afterCutoffDeliverTime}
                        onChange={(e) => setEditingOverride({...editingOverride, afterCutoffDeliverTime: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-[10px] text-gray-500 block mb-1">Days to Add</label>
                      <input 
                        type="number" 
                        value={editingOverride.afterCutoffDaysAdd}
                        onChange={(e) => setEditingOverride({...editingOverride, afterCutoffDaysAdd: parseInt(e.target.value) || 0})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-1.5 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const exists = formData.locationOverrides.some(o => o.id === editingOverride.id);
                  setFormData({
                    ...formData,
                    locationOverrides: exists 
                      ? formData.locationOverrides.map(o => o.id === editingOverride.id ? editingOverride : o)
                      : [...formData.locationOverrides, editingOverride]
                  });
                  setShowOverrideModal(false);
                }}
                className="bg-[#3b5998] text-white px-6 py-1.5 rounded text-xs font-bold hover:bg-[#2d4373] transition-colors shadow-sm"
              >
                Save Override
              </button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(`    </div>\n  );\n}`, `${modalComponent}    </div>\n  );\n}`);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
