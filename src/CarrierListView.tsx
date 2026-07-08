import React, { useState } from 'react';
import { Carrier } from '../types';
import { MOCK_CARRIERS } from '../constants';

export function CarrierListView({ onRowClick }: { onRowClick: (id: string) => void }) {
  const [carriers, setCarriers] = useState<Carrier[]>(MOCK_CARRIERS);

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="bg-[#6db575] flex items-center justify-between px-4 py-2 text-white">
        <h2 className="font-bold text-sm tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-bars"></i> Carrier List
        </h2>
      </div>
      
      <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search code, name..."
            className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-2 text-gray-400"></i>
        </div>
        <button className="bg-[#2c6e3b] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#20512b] transition-colors ml-auto shadow-sm">
           <i className="fa-solid fa-plus mr-1"></i> Add Carrier
        </button>
      </div>

      <div className="p-4 flex-1">
         <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
             <table className="w-full text-left text-xs">
                 <thead className="bg-[#cbdccb] text-[#3e5f41]">
                     <tr>
                         <th className="px-4 py-3 font-bold border-b border-[#b5ccb6] uppercase tracking-wider text-[10px]">Carrier Code</th>
                         <th className="px-4 py-3 font-bold border-b border-[#b5ccb6] uppercase tracking-wider text-[10px]">Carrier Name</th>
                         <th className="px-4 py-3 font-bold border-b border-[#b5ccb6] uppercase tracking-wider text-[10px]">API Ref</th>
                         <th className="px-4 py-3 font-bold border-b border-[#b5ccb6] uppercase tracking-wider text-[10px]">Type</th>
                         <th className="px-4 py-3 font-bold border-b border-[#b5ccb6] uppercase tracking-wider text-[10px]">Status</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                     {carriers.map(carrier => (
                         <tr 
                             key={carrier.id} 
                             className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                             onClick={() => onRowClick(carrier.id)}
                         >
                             <td className="px-4 py-3 font-bold text-blue-600">{carrier.carrierCode}</td>
                             <td className="px-4 py-3 text-gray-800">{carrier.carrierName}</td>
                             <td className="px-4 py-3 text-gray-600">{carrier.carrierApiReference}</td>
                             <td className="px-4 py-3 text-gray-600">{carrier.carrierType}</td>
                             <td className="px-4 py-3">
                                 <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold">
                                     {carrier.status}
                                 </span>
                             </td>
                         </tr>
                     ))}
                     {carriers.length === 0 && (
                         <tr>
                             <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                 No carriers found
                             </td>
                         </tr>
                     )}
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
}
