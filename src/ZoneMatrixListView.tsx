import React, { useState } from 'react';
import { MOCK_ZONE_MATRIX } from '../constants';
import { ZoneMatrixConfig } from '../types';

interface ZoneMatrixListViewProps {
  onEdit: (id: string) => void;
  onCreate: () => void;
}

export function ZoneMatrixListView({ onEdit, onCreate }: ZoneMatrixListViewProps) {
  const [configs, setConfigs] = useState<ZoneMatrixConfig[]>(MOCK_ZONE_MATRIX);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConfigs = configs.filter(config => 
    config.carrierId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.fromRegion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.toRegion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] animate-in fade-in duration-300">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Zone Matrix Management</h2>
        <button 
          onClick={onCreate}
          className="bg-[#1b4d3e] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#13372c] transition-colors flex items-center gap-2 shadow-sm"
        >
          <i className="fa-solid fa-plus"></i>
          New Matrix
        </button>
      </div>

      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative max-w-md">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search by Carrier ID or Region..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1b4d3e] focus:ring-1 focus:ring-[#1b4d3e] transition-shadow bg-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8fafc] text-[11px] text-gray-500 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-4 py-3 uppercase tracking-wider font-bold">Matrix ID</th>
                  <th className="px-4 py-3 uppercase tracking-wider font-bold">Carrier ID</th>
                  <th className="px-4 py-3 uppercase tracking-wider font-bold">From Region</th>
                  <th className="px-4 py-3 uppercase tracking-wider font-bold">To Region</th>
                  <th className="px-4 py-3 uppercase tracking-wider font-bold">Zone Name</th>
                  <th className="px-4 py-3 uppercase tracking-wider font-bold">Note</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {filteredConfigs.map(config => (
                  <tr 
                    key={config.id} 
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                    onClick={() => onEdit(config.id)}
                  >
                    <td className="px-4 py-3 text-[#3b5998] font-medium group-hover:underline">
                      {config.id}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{config.carrierId}</td>
                    <td className="px-4 py-3 text-gray-700">{config.fromRegion}</td>
                    <td className="px-4 py-3 text-gray-700">{config.toRegion}</td>
                    <td className="px-4 py-3 text-gray-700">{config.zoneName}</td>
                    <td className="px-4 py-3 text-gray-700">{config.note}</td>
                  </tr>
                ))}
                {filteredConfigs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <i className="fa-solid fa-inbox text-3xl text-gray-300"></i>
                        <p>No configs found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
