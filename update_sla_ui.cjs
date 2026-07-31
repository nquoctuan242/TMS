const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

const oldDeliveryRule = `              {/* Delivery Rule */}
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Delivery Rule</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                       <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Cutoff Time</label>
                       <div className="relative">
                         <input 
                           type="time" 
                           value={formData.cutoffTime}
                           onChange={(e) => setFormData({...formData, cutoffTime: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                         />
                       </div>
                       <p className="text-[10px] text-gray-500 mt-1.5">Packed before this = before-cutoff branch</p>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-2">
                         <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Before Cutoff · Deliver At</label>
                         <span className="text-[10px] font-bold text-[#059669] bg-[#d1fae5] px-1.5 py-0.5 rounded">SAME DAY</span>
                       </div>
                       <div className="relative">
                         <input 
                           type="time" 
                           value={formData.beforeCutoffDeliverTime}
                           onChange={(e) => setFormData({...formData, beforeCutoffDeliverTime: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                         />
                       </div>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-2">
                         <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">After Cutoff · Deliver At</label>
                         <span className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-1.5 py-0.5 rounded">+1 DAY</span>
                       </div>
                       <div className="flex gap-2">
                         <div className="relative flex-1">
                           <input 
                             type="time" 
                             value={formData.afterCutoffDeliverTime}
                             onChange={(e) => setFormData({...formData, afterCutoffDeliverTime: e.target.value})}
                             className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                           />
                         </div>
                         <input 
                            type="number"
                            value={formData.afterCutoffDaysAdd}
                            onChange={(e) => setFormData({...formData, afterCutoffDaysAdd: parseInt(e.target.value) || 0})}
                            className="w-16 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-center"
                         />
                       </div>
                       <p className="text-[10px] text-gray-500 mt-1.5">Right box: days to add</p>
                    </div>
                 </div>
              </div>`;

const newDeliveryRule = `              {/* Delivery Rule */}
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Delivery Rule</h3>
                 
                 <div className="mb-6">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Cutoff Time</label>
                    <input 
                      type="time" 
                      value={formData.cutoffTime}
                      onChange={(e) => setFormData({...formData, cutoffTime: e.target.value})}
                      className="w-48 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                    />
                    <p className="text-[10px] text-gray-500 mt-1.5">Orders packed before this time will be processed using the Before Cutoff rule.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded p-4 bg-gray-50">
                      <label className="text-[11px] font-bold text-[#059669] tracking-tight block mb-3">Before Cutoff Delivery Rule</label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-gray-500 block mb-1">Deliver By Time</label>
                          <input 
                            type="time" 
                            value={formData.beforeCutoffDeliverTime}
                            onChange={(e) => setFormData({...formData, beforeCutoffDeliverTime: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] text-gray-500 block mb-1">Days to Add</label>
                          <input 
                            type="number" 
                            value={formData.beforeCutoffDaysAdd}
                            onChange={(e) => setFormData({...formData, beforeCutoffDaysAdd: parseInt(e.target.value) || 0})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
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
                            value={formData.afterCutoffDeliverTime}
                            onChange={(e) => setFormData({...formData, afterCutoffDeliverTime: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] text-gray-500 block mb-1">Days to Add</label>
                          <input 
                            type="number" 
                            value={formData.afterCutoffDaysAdd}
                            onChange={(e) => setFormData({...formData, afterCutoffDaysAdd: parseInt(e.target.value) || 0})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                 </div>
              </div>`;

content = content.replace(oldDeliveryRule, newDeliveryRule);


const oldModalContent = `              <hr className="border-gray-100" />
              
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
              </div>`;

const newModalContent = `              <hr className="border-gray-100" />
              
              <div className="w-1/3">
                 <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Effective From</label>
                 <input 
                   type="date" 
                   value={editingOverride.effectiveFrom}
                   onChange={(e) => setEditingOverride({...editingOverride, effectiveFrom: e.target.value})}
                   className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                 />
              </div>`;

content = content.replace(oldModalContent, newModalContent);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
