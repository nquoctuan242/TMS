const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// 1. Rename Vendor to Shipping Carrier Group in Configured Vendors
content = content.replace(
  `h4 className="text-xs font-bold text-[#1b4d3e] uppercase tracking-wider">Configured Vendors</h4>`,
  `h4 className="text-xs font-bold text-[#1b4d3e] uppercase tracking-wider">Shipping Carrier Group</h4>`
);

content = content.replace(
  `<option value="">+ Add Vendor...</option>`,
  `<option value="">+ Add Shipping Carrier Group...</option>`
);

content = content.replace(
  `No vendors added yet. Please select from the dropdown above.`,
  `No shipping carrier group added yet. Please select from the dropdown above.`
);

// 2. Add the cog icon back for the dropoff points and change Vendor to Shipping Carrier Group
const dropoffSectionTarget = `                               <div className="flex-1 min-w-[200px] space-y-1">
                                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Vendor</label>
                                  <select 
                                    value={point.vendor || ''}
                                    onChange={(e) => {
                                        const newPoints = [...editingStore.dropOffPoints];
                                        newPoints[pIndex] = { ...newPoints[pIndex], vendor: e.target.value };
                                        setEditingStore({ ...editingStore, dropOffPoints: newPoints });
                                    }}
                                    className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-1.5 text-[12px] text-gray-600 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white h-[34px]"
                                  >
                                    <option value="">Select Vendor</option>
                                    {carrier.shippingVendors?.map(v => <option key={v.vendorName} value={v.vendorName}>{v.vendorName}</option>)}
                                  </select>
                               </div>
                             )}
                             <div className="flex-[2] min-w-[300px] space-y-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Drop-off Address</label>
                                <input 
                                  type="text" 
                                  value={point.address}
                                  onChange={(e) => {
                                      const newPoints = [...editingStore.dropOffPoints];
                                      newPoints[pIndex] = { ...newPoints[pIndex], address: e.target.value };
                                      setEditingStore({ ...editingStore, dropOffPoints: newPoints });
                                  }}
                                  placeholder="Enter full address for drop-off"
                                  className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-1.5 text-[12px] text-gray-800 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white h-[34px]"
                                />
                             </div>
                             <button 
                               onClick={() => {
                                   const newPoints = editingStore.dropOffPoints.filter((_, i) => i !== pIndex);
                                   setEditingStore({ ...editingStore, dropOffPoints: newPoints });
                               }} 
                               className="h-[34px] w-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                             >
                                <i className="fa-solid fa-trash-can"></i>
                             </button>
                           </div>`;

const dropoffSectionReplacement = `                               <div className="flex-1 min-w-[200px] space-y-1">
                                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Shipping Carrier Group</label>
                                  <select 
                                    value={point.vendor || ''}
                                    onChange={(e) => {
                                        const newPoints = [...editingStore.dropOffPoints];
                                        newPoints[pIndex] = { ...newPoints[pIndex], vendor: e.target.value };
                                        setEditingStore({ ...editingStore, dropOffPoints: newPoints });
                                    }}
                                    className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-1.5 text-[12px] text-gray-600 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white h-[34px]"
                                  >
                                    <option value="">Select Shipping Carrier Group</option>
                                    {carrier.shippingVendors?.map(v => <option key={v.vendorName} value={v.vendorName}>{v.vendorName}</option>)}
                                  </select>
                               </div>
                             )}
                             <div className="flex-[2] min-w-[300px] space-y-1">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Drop-off Address</label>
                                <input 
                                  type="text" 
                                  value={point.address}
                                  onChange={(e) => {
                                      const newPoints = [...editingStore.dropOffPoints];
                                      newPoints[pIndex] = { ...newPoints[pIndex], address: e.target.value };
                                      setEditingStore({ ...editingStore, dropOffPoints: newPoints });
                                  }}
                                  placeholder="Enter full address for drop-off"
                                  className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-1.5 text-[12px] text-gray-800 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white h-[34px]"
                                />
                             </div>
                             <div className="flex items-center gap-1">
                               <button 
                                 onClick={() => setConfiguringDropOffPoint({ index: pIndex, point })}
                                 className="h-[34px] w-10 flex items-center justify-center text-gray-400 hover:text-[#4d9e5f] hover:bg-green-50 rounded transition-colors"
                               >
                                  <i className="fa-solid fa-gear"></i>
                               </button>
                               <button 
                                 onClick={() => {
                                     const newPoints = editingStore.dropOffPoints.filter((_, i) => i !== pIndex);
                                     setEditingStore({ ...editingStore, dropOffPoints: newPoints });
                                 }} 
                                 className="h-[34px] w-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                               >
                                  <i className="fa-solid fa-trash-can"></i>
                               </button>
                             </div>
                           </div>`;

content = content.replace(dropoffSectionTarget, dropoffSectionReplacement);

fs.writeFileSync('App.tsx', content);
console.log('Fixed Dropoff Points Settings and Renamed Vendor');
