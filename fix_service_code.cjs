const fs = require('fs');

// 1. types.ts
let typesContent = fs.readFileSync('types.ts', 'utf8');
typesContent = typesContent.replace(/serviceCode: string;\n\s*/, '');
fs.writeFileSync('types.ts', typesContent);

// 2. constants.tsx
let constantsContent = fs.readFileSync('constants.tsx', 'utf8');
constantsContent = constantsContent.replace(/serviceCode: '[^']*',\n\s*/g, '');
fs.writeFileSync('constants.tsx', constantsContent);

// 3. DeliverySLAListView.tsx
let listContent = fs.readFileSync('src/DeliverySLAListView.tsx', 'utf8');
listContent = listContent.replace(/<span className="bg-\[#111827\] text-white text-\[10px\] px-2 py-1 font-bold rounded">\n\s*\{config\.serviceCode\}\n\s*<\/span>\n\s*/g, '');
fs.writeFileSync('src/DeliverySLAListView.tsx', listContent);

// 4. DeliverySLADetailView.tsx
let detailContent = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

// Remove serviceCode from default form data
detailContent = detailContent.replace(/serviceCode: 'NEXTDAY',\n\s*/, '');

// Update Header
const oldHeader = `<div className="flex items-center gap-3">
             {configId ? (
               <>
                 <span className="bg-[#111827] text-white text-xs px-2.5 py-1 font-bold rounded">
                   {formData.serviceCode}
                 </span>
                 <h2 className="text-lg font-bold text-[#111827]">{formData.serviceName}</h2>
               </>
             ) : (
                 <h2 className="text-lg font-bold text-[#111827]">New Configuration</h2>
             )}
          </div>`;
const newHeader = `<div className="flex items-center gap-3">
             <h2 className="text-lg font-bold text-[#111827]">{configId ? (formData.serviceName || 'Edit Configuration') : 'New Configuration'}</h2>
          </div>`;
detailContent = detailContent.replace(oldHeader, newHeader);

// Update Service Details
const oldServiceDetails = `              {/* Service Details */}
              {!configId && (
                <div className="mb-8">
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Service Selection</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Service Code</label>
                         <select 
                           value={formData.serviceCode}
                           onChange={(e) => {
                             const code = e.target.value;
                             let name = code;
                             if (code === 'NEXTDAY') name = 'Next-day delivery';
                             if (code === 'ECONOMY') name = 'Economy delivery';
                             if (code === 'INTERNATIONAL') name = 'International delivery';
                             setFormData({...formData, serviceCode: code, serviceName: name});
                           }}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                         >
                           <option value="SAMEDAY">SAMEDAY</option>
                           <option value="EXPRESS">EXPRESS</option>
                           <option value="STANDARD">STANDARD</option>
                           <option value="NEXTDAY">NEXTDAY</option>
                           <option value="ECONOMY">ECONOMY</option>
                           <option value="INTERNATIONAL">INTERNATIONAL</option>
                         </select>
                      </div>
                      <div>
                         <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Service Name</label>
                         <input 
                           type="text" 
                           value={formData.serviceName}
                           onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                           className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                         />
                      </div>
                   </div>
                </div>
              )}`;

const newServiceDetails = `              {/* Service Details */}
              <div className="mb-8">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Service Details</h3>
                 <div className="max-w-md">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Service Name</label>
                    <input 
                      type="text" 
                      value={formData.serviceName}
                      onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                      placeholder="e.g. Same-day delivery"
                    />
                 </div>
              </div>`;

detailContent = detailContent.replace(oldServiceDetails, newServiceDetails);

fs.writeFileSync('src/DeliverySLADetailView.tsx', detailContent);
console.log('Done fixing serviceCode and update view');
