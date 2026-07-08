import React, { useState } from 'react';

export function ConfigStrategyView() {
  const [carriers, setCarriers] = useState([{ carrier: 'EasyPost', vendor: 'UPPS', value: '2', priority: '1', note: '' }]);

  const handleAddCarrier = () => {
    setCarriers([...carriers, { carrier: '', vendor: '', value: '', priority: '', note: '' }]);
  };

  const handleRemoveCarrier = (index: number) => {
    setCarriers(carriers.filter((_, i) => i !== index));
  };

  const updateCarrier = (index: number, field: string, val: string) => {
    const updated = [...carriers];
    updated[index] = { ...updated[index], [field]: val };
    setCarriers(updated);
  };

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="bg-[#6db575] flex items-center justify-between px-4 py-2 text-white">
        <h2 className="font-bold text-sm tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-bars"></i> Config Strategy
        </h2>
      </div>
      
      <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Strategy Code</label>
                  <input type="text" defaultValue="EASYPOSTDELIVERY" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Strategy Name</label>
                  <input type="text" defaultValue="[DoNotEdit] EasyPost Delivery" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500" />
              </div>
              
              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Allocate Type</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500">
                      <option>Percentage</option>
                  </select>
              </div>
              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Application Period</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500">
                      <option>Daily</option>
                  </select>
              </div>

              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Apply Type</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500">
                      <option>Customer</option>
                  </select>
              </div>
              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700">Global Priority</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500" />
              </div>

              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Strategy Default</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500">
                      <option>No</option>
                      <option>Yes</option>
                  </select>
              </div>
              <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-700">Note</label>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500" />
              </div>
          </div>
          
          <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
             <button className="px-3 py-1 border border-gray-300 rounded text-xs bg-white text-gray-700 hover:bg-gray-50">Config Additional Balance Rule</button>
             <span className="text-gray-400">-</span>
             <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 outline-none bg-white min-w-[80px]">
                 <option>And</option>
                 <option>Or</option>
             </select>
             <span className="text-gray-400">-</span>
             <select className="border border-gray-300 rounded px-2 py-1 text-xs text-gray-400 outline-none bg-white min-w-[200px]">
                 <option>Available Balance Rules</option>
             </select>
          </div>

          <div className="border border-gray-200 rounded-sm mt-4 p-4 shadow-sm bg-white">
             <div className="mb-4">
                 <button 
                    onClick={handleAddCarrier}
                    className="px-4 py-1.5 border border-gray-300 rounded text-[11px] font-medium bg-white text-gray-700 hover:bg-gray-50"
                 >
                     Add Carrier
                 </button>
             </div>
             
             <table className="w-full text-left text-xs">
                 <thead className="bg-[#cbdccb] text-[#3e5f41]">
                     <tr>
                         <th className="px-3 py-2 font-bold w-[20%]">Carrier</th>
                         <th className="px-3 py-2 font-bold w-[20%]">Shipping Vendors</th>
                         <th className="px-3 py-2 font-bold w-[20%]">Value</th>
                         <th className="px-3 py-2 font-bold w-[15%]">Priority</th>
                         <th className="px-3 py-2 font-bold w-[20%]">Note</th>
                         <th className="px-3 py-2 font-bold text-center w-[5%]">Action</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                     {carriers.map((c, idx) => (
                         <tr key={idx} className="hover:bg-gray-50/50">
                             <td className="p-2">
                                 <select 
                                     value={c.carrier}
                                     onChange={(e) => updateCarrier(idx, 'carrier', e.target.value)}
                                     className="w-full border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-blue-500"
                                 >
                                     <option value="">Select Carrier</option>
                                     <option value="EasyPost">EasyPost</option>
                                     <option value="FedEx">FedEx</option>
                                     <option value="UPS">UPS</option>
                                 </select>
                             </td>
                             <td className="p-2">
                                 <select 
                                     value={c.vendor}
                                     onChange={(e) => updateCarrier(idx, 'vendor', e.target.value)}
                                     className="w-full border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-blue-500"
                                 >
                                     <option value="">Select Vendor</option>
                                     <option value="UPPS">UPPS</option>
                                     <option value="UPS">UPS</option>
                                 </select>
                             </td>
                             <td className="p-2">
                                 <input 
                                     type="text" 
                                     value={c.value}
                                     onChange={(e) => updateCarrier(idx, 'value', e.target.value)}
                                     className="w-full border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-blue-500" 
                                 />
                             </td>
                             <td className="p-2">
                                 <input 
                                     type="text" 
                                     value={c.priority}
                                     onChange={(e) => updateCarrier(idx, 'priority', e.target.value)}
                                     className="w-full border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-blue-500" 
                                 />
                             </td>
                             <td className="p-2">
                                 <input 
                                     type="text" 
                                     value={c.note}
                                     onChange={(e) => updateCarrier(idx, 'note', e.target.value)}
                                     placeholder="Note"
                                     className="w-full border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-blue-500 text-gray-500 placeholder-gray-400" 
                                 />
                             </td>
                             <td className="p-2 text-center">
                                 <button onClick={() => handleRemoveCarrier(idx)} className="text-red-500 hover:text-red-700">
                                     <i className="fa-regular fa-trash-can"></i>
                                 </button>
                             </td>
                         </tr>
                     ))}
                     {carriers.length === 0 && (
                         <tr><td colSpan={6} className="p-4 text-center text-gray-500">No carriers added.</td></tr>
                     )}
                 </tbody>
             </table>
             <div className="flex justify-end mt-2 text-[10px] text-gray-500 gap-1 items-center">
                 <button className="text-gray-300"><i className="fa-solid fa-chevron-left"></i></button>
                 <span className="border border-green-600 text-green-700 px-2 py-0.5 rounded-sm bg-white">1</span>
                 <button className="text-gray-300"><i className="fa-solid fa-chevron-right"></i></button>
             </div>
          </div>
          
          <div className="flex justify-end pt-4">
              <button className="bg-[#2c6e3b] text-white px-6 py-1.5 rounded font-bold text-xs hover:bg-[#20512b] shadow-sm">
                  Save
              </button>
          </div>
      </div>
    </div>
  );
}
