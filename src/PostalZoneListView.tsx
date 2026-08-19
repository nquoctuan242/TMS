import React, { useState } from 'react';
import { MOCK_POSTAL_ZONES } from '../constants';

export function PostalZoneListView() {
  const [originZip, setOriginZip] = useState('');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 animate-in fade-in duration-300">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100 bg-white shrink-0">
         <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-orange-600">Origin Zip</label>
            <div className="flex gap-3 items-center">
               <input 
                  type="text" 
                  placeholder="Enter origin zip" 
                  value={originZip}
                  onChange={e => setOriginZip(e.target.value)}
                  className="w-64 border border-gray-300 rounded px-3 py-1.5 text-sm outline-none focus:border-[#1b4d3e]"
               />
               <button 
                  onClick={() => setOriginZip('')}
                  className="px-4 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
               >
                  <i className="fa-solid fa-rotate-right"></i> Reset
               </button>
               <button className="bg-[#1b4d3e] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#13372c] flex items-center gap-2 shadow-sm">
                  <i className="fa-solid fa-magnifying-glass"></i> Search
               </button>
            </div>
         </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white">
         <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
            <thead className="bg-[#d5e0d8] text-[#1b4d3e] sticky top-0 z-10 shadow-sm font-bold">
               <tr>
                  <th className="px-4 py-3 border-r border-gray-300/30">Origin Zip</th>
                  <th className="px-4 py-3 border-r border-gray-300/30">Route</th>
                  <th className="px-4 py-3 border-r border-gray-300/30">Destination Ranges</th>
                  <th className="px-4 py-3 border-r border-gray-300/30">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
               {MOCK_POSTAL_ZONES.filter(z => !originZip || z.originZip.includes(originZip)).map(zone => (
                  <tr key={zone.id} className="hover:bg-gray-50 transition-colors">
                     <td className="px-4 py-2.5 border-r border-gray-100">
                        <span className="inline-block px-2 py-0.5 border border-blue-200 text-blue-500 rounded text-xs hover:underline cursor-pointer">
                           {zone.originZip}
                        </span>
                     </td>
                     <td className="px-4 py-2.5 border-r border-gray-100">
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                           <span>{zone.fromCountry}</span>
                           <i className="fa-solid fa-arrow-right-long text-blue-400 text-[10px]"></i>
                           <span>{zone.toCountry}</span>
                        </div>
                     </td>
                     <td className="px-4 py-2.5 border-r border-gray-100">
                        <div className="flex flex-wrap gap-1.5">
                           {zone.destinationRanges.map((range: string, idx: number) => (
                              <span key={idx} className="px-2 py-0.5 border border-orange-200 text-orange-500 text-[11px] rounded bg-orange-50/30">
                                 {range}
                              </span>
                           ))}
                        </div>
                     </td>
                     <td className="px-4 py-2.5 border-r border-gray-100">
                        <span className="px-2 py-0.5 border border-green-300 text-green-500 text-[11px] rounded bg-green-50/30 font-medium">
                           {zone.status}
                        </span>
                     </td>
                     <td className="px-4 py-2.5 text-center">
                        <button className="text-blue-500 hover:text-blue-700 transition-colors">
                           <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* Pagination */}
      <div className="p-3 border-t border-gray-100 flex justify-end items-center text-xs text-gray-600 gap-4 bg-white shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-20">
         <span className="font-medium text-gray-700">Total: {MOCK_POSTAL_ZONES.length}</span>
         <div className="flex items-center gap-1">
            <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded transition-colors"><i className="fa-solid fa-chevron-left"></i></button>
            <button className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 rounded font-medium text-gray-700 shadow-sm">1</button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded text-gray-600 transition-colors">2</button>
            <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors"><i className="fa-solid fa-chevron-right"></i></button>
         </div>
         <select className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#1b4d3e] shadow-sm bg-white cursor-pointer">
            <option>20 / page</option>
         </select>
      </div>
    </div>
  );
}
