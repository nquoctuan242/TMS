const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const startMarker = '<div className="space-y-4">\n                      {editingStore.carrierConfigs.map((config, index) => (';
const endMarker = `                        </div>
                      ))}
                    </div>`;

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex) + endMarker.length;

const replacement = `<div className="space-y-4">
                      {editingStore.carrierConfigs.map((config, index) => (
                        <div key={config.id} className="border border-gray-200 rounded-lg p-0 bg-white mb-4 shadow-sm overflow-hidden group transition-all">
                           <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-100">
                              <button 
                                  onClick={() => setExpandedStoreCarriers(prev => ({...prev, [index]: !prev[index]}))}
                                  className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#4d9e5f] hover:bg-[#e9f2ee] rounded transition-all"
                              >
                                  <i className={\`fa-solid fa-chevron-\${expandedStoreCarriers[index] ? 'down' : 'right'} text-[10px]\`}></i>
                              </button>
                              
                              <div className="flex-1 flex gap-4">
                                  <select 
                                      value={config.carrierId || ''} 
                                      onChange={(e) => {
                                        const carrier = MOCK_CARRIERS.find(c => c.id === e.target.value);
                                        const newConfigs = [...(editingStore.carrierConfigs || [])];
                                        if (carrier) {
                                           const isAggregator = carrier.integrationType === 'Shipping Aggregator';
                                           const defaultVendor = !isAggregator && carrier.shippingVendors?.[0] ? carrier.shippingVendors[0] : null;
                                           newConfigs[index] = { 
                                               ...newConfigs[index], 
                                               carrierId: carrier.id, 
                                               carrierCode: carrier.carrierCode, 
                                               carrierName: carrier.carrierName,
                                               vendorName: '',
                                               services: defaultVendor ? defaultVendor.services || [] : [],
                                               pickupFree: defaultVendor ? defaultVendor.pickupFree : false,
                                               pickupOnDemand: defaultVendor ? defaultVendor.pickupOnDemand : false,
                                               dropoff: defaultVendor ? defaultVendor.dropoff : false,
                                               dropOffPoints: []
                                           };
                                        } else {
                                           newConfigs[index] = { ...newConfigs[index], carrierId: '', carrierCode: '', carrierName: '', vendorName: '', services: [], dropOffPoints: [] };
                                        }
                                        setEditingStore({ ...editingStore, carrierConfigs: newConfigs });
                                      }}
                                      className="w-1/2 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-[#4d9e5f] bg-white font-medium"
                                  >
                                      <option value="">Select Carrier...</option>
                                      {MOCK_CARRIERS.map(c => <option key={c.id} value={c.id}>{c.carrierName} ({c.carrierCode})</option>)}
                                  </select>
                              </div>
                              <button onClick={() => {
                                const newConfigs = (editingStore.carrierConfigs || []).filter(c => c.id !== config.id);
                                setEditingStore({ ...editingStore, carrierConfigs: newConfigs });
                              }} className="text-gray-300 hover:text-red-500 w-8 h-8 flex justify-center items-center rounded hover:bg-red-50 transition-colors">
                                  <i className="fa-regular fa-trash-can text-sm"></i>
                              </button>
                           </div>
                           
                           {config.carrierId && expandedStoreCarriers[index] && (
                           <div className="p-4 bg-white">
                               {MOCK_CARRIERS.find(c => c.id === config.carrierId)?.integrationType === 'Shipping Aggregator' ? (
                                   <div className="space-y-4">
                                       <div className="flex justify-between items-center mb-2">
                                           <h4 className="text-xs font-bold text-[#1b4d3e] uppercase tracking-wider">Configured Vendors</h4>
                                           <select
                                               value=""
                                               onChange={(e) => {
                                                  if (!e.target.value) return;
                                                  const carrier = MOCK_CARRIERS.find(c => c.id === config.carrierId);
                                                  const vendor = carrier?.shippingVendors?.find(v => v.vendorName === e.target.value);
                                                  const newConfigs = [...(editingStore.carrierConfigs || [])];
                                                  if (vendor) {
                                                      const currentVendors = newConfigs[index].vendors || [];
                                                      if (!currentVendors.find(v => v.vendorName === vendor.vendorName)) {
                                                          newConfigs[index] = { 
                                                              ...newConfigs[index], 
                                                              vendors: [...currentVendors, {
                                                                  vendorName: vendor.vendorName,
                                                                  services: vendor.services || [],
                                                                  pickupFree: vendor.pickupFree,
                                                                  pickupOnDemand: vendor.pickupOnDemand,
                                                                  dropoff: vendor.dropoff,
                                                                  dropOffPoints: []
                                                              }]
                                                          };
                                                          setEditingStore({ ...editingStore, carrierConfigs: newConfigs });
                                                      }
                                                  }
                                               }}
                                               className="w-48 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-[#4d9e5f] bg-white font-medium"
                                           >
                                               <option value="">+ Add Vendor...</option>
                                               {MOCK_CARRIERS.find(c => c.id === config.carrierId)?.shippingVendors?.filter(v => !(config.vendors || []).find(cv => cv.vendorName === v.vendorName)).map(v => <option key={v.vendorName} value={v.vendorName}>{v.vendorName}</option>)}
                                           </select>
                                       </div>
                                       
                                       <div className="space-y-4">
                                           {(config.vendors || []).map((vendor, vIndex) => (
                                               <div key={vIndex} className="border border-[#e9f2ee] rounded-md overflow-hidden bg-white shadow-sm">
                                                   <div className="bg-[#f3f8f5] px-4 py-2 border-b border-[#e9f2ee] flex justify-between items-center">
                                                       <div className="font-bold text-[13px] text-[#1b4d3e] flex items-center">
                                                           <i className="fa-solid fa-truck-fast mr-2 opacity-50 text-[10px]"></i>
                                                           {vendor.vendorName}
                                                       </div>
                                                       <button onClick={() => {
                                                           const newConfigs = [...(editingStore.carrierConfigs || [])];
                                                           newConfigs[index] = { ...newConfigs[index], vendors: (newConfigs[index].vendors || []).filter((_, i) => i !== vIndex) };
                                                           setEditingStore({ ...editingStore, carrierConfigs: newConfigs });
                                                       }} className="text-gray-400 hover:text-red-500 transition-colors">
                                                           <i className="fa-solid fa-trash-can text-xs"></i>
                                                       </button>
                                                   </div>
                                                   <div className="p-4 bg-white">
                                                       {renderConfigDetails(vendor, (newVendorData) => {
                                                           const newConfigs = [...(editingStore.carrierConfigs || [])];
                                                           const newVendors = [...(newConfigs[index].vendors || [])];
                                                           newVendors[vIndex] = newVendorData;
                                                           newConfigs[index] = { ...newConfigs[index], vendors: newVendors };
                                                           setEditingStore({ ...editingStore, carrierConfigs: newConfigs });
                                                       })}
                                                   </div>
                                               </div>
                                           ))}
                                           {(!config.vendors || config.vendors.length === 0) && (
                                               <div className="text-xs text-gray-400 italic py-6 px-3 text-center border border-dashed rounded-md bg-gray-50/50">
                                                   <div className="text-gray-300 mb-1"><i className="fa-solid fa-box-open text-xl"></i></div>
                                                   No vendors added yet. Please select from the dropdown above.
                                               </div>
                                           )}
                                       </div>
                                   </div>
                               ) : (
                                   <div>
                                       <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Carrier Settings</h4>
                                       {renderConfigDetails(config, (newConfigData) => {
                                           const newConfigs = [...(editingStore.carrierConfigs || [])];
                                           newConfigs[index] = newConfigData;
                                           setEditingStore({ ...editingStore, carrierConfigs: newConfigs });
                                       })}
                                   </div>
                               )}
                           </div>
                           )}
                        </div>
                      ))}
                    </div>`;

if (startIndex !== -1 && endIndex > startIndex) {
    content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
    fs.writeFileSync('App.tsx', content);
    console.log("Replaced");
} else {
    console.log("Could not find markers.");
}
