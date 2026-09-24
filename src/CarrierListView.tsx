import React, { useState } from 'react';
import { Carrier } from '../types';
import { MOCK_CARRIERS } from '../constants';

export function CarrierListView({ onRowClick }: { onRowClick: (id: string) => void }) {
  const [carriers] = useState<Carrier[]>(MOCK_CARRIERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCarriers = carriers.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      c.carrierCode.toLowerCase().includes(term) ||
      c.carrierName.toLowerCase().includes(term) ||
      c.carrierApiReference?.toLowerCase().includes(term) ||
      c.integrationType?.toLowerCase().includes(term) ||
      c.carrierType?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="bg-[#6db575] flex items-center justify-between px-4 py-2.5 text-white">
        <h2 className="font-bold text-sm tracking-wider flex items-center gap-2">
          <i className="fa-solid fa-truck"></i> Carrier List
        </h2>
        <span className="text-xs text-white/90">
          {filteredCarriers.length} Carriers
        </span>
      </div>
      
      <div className="p-4 flex items-center gap-3 border-b border-gray-100 bg-gray-50/50">
        <div className="relative w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code, name, integration..."
            className="w-full pl-9 pr-8 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500 bg-white"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-2 text-gray-400 text-xs"></i>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs"
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          )}
        </div>
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
                <th className="px-4 py-3 font-bold border-b border-[#b5ccb6] uppercase tracking-wider text-[10px]">Integration Type</th>
                <th className="px-4 py-3 font-bold border-b border-[#b5ccb6] uppercase tracking-wider text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCarriers.map(carrier => (
                <tr 
                  key={carrier.id} 
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                  onClick={() => onRowClick(carrier.id)}
                >
                  <td className="px-4 py-3 font-bold text-blue-600">{carrier.carrierCode}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{carrier.carrierName}</td>
                  <td className="px-4 py-3 text-gray-600">{carrier.carrierApiReference}</td>
                  <td className="px-4 py-3 text-gray-600">{carrier.carrierType}</td>
                  <td className="px-4 py-3">
                    {carrier.integrationType === 'Shipping Aggregator' ? (
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200 inline-flex items-center gap-1.5 shadow-xs">
                        <i className="fa-solid fa-network-wired text-[10px]"></i>
                        Shipping Aggregator
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-medium">
                        {carrier.integrationType || 'Direct API'}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      carrier.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {carrier.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredCarriers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No carriers found matching "{searchTerm}"
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
