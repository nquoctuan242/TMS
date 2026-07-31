const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

// 1. Change header
const oldHeader = `          {!configId ? (
             <div className="flex items-center gap-3">
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
                 className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-blue-500 font-bold bg-[#111827] text-white uppercase"
               >
                 <option value="NEXTDAY">NEXTDAY</option>
                 <option value="ECONOMY">ECONOMY</option>
                 <option value="INTERNATIONAL">INTERNATIONAL</option>
               </select>
               <input 
                 type="text" 
                 value={formData.serviceName}
                 onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                 className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500 font-bold text-gray-800"
               />
             </div>
          ) : (
             <div className="flex items-center gap-3">
               <span className="bg-[#111827] text-white text-xs px-2.5 py-1 font-bold rounded">
                 {formData.serviceCode}
               </span>
               <h2 className="text-lg font-bold text-[#111827]">{formData.serviceName}</h2>
             </div>
          )}`;

const newHeader = `          <div className="flex items-center gap-3">
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

content = content.replace(oldHeader, newHeader);

// 2. Add service fields in Delivery Rule section
const oldDeliveryRule = `              {/* Delivery Rule */}
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Delivery Rule</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">`;

const newDeliveryRule = `              {/* Service Details */}
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
              )}
              
              {/* Delivery Rule */}
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Delivery Rule</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">`;

content = content.replace(oldDeliveryRule, newDeliveryRule);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
