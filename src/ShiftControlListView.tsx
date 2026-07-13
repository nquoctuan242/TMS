import React, { useState } from 'react';
import { ShiftControlConfig } from '../types';
import { MOCK_SHIFT_CONTROL_CONFIGS } from '../constants';

interface ShiftControlListViewProps {
  onRowClick: (id: string) => void;
  onCreateClick: () => void;
}

export function ShiftControlListView({ onRowClick, onCreateClick }: ShiftControlListViewProps) {
  const [configs] = useState<ShiftControlConfig[]>(MOCK_SHIFT_CONTROL_CONFIGS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConfigs = configs.filter(config => 
    config.country.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (config.stateProvince && config.stateProvince.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Shift Control Configurations</h2>
        <button 
          onClick={onCreateClick}
          className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Configuration
        </button>
      </div>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Search country or province..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-xs w-64 focus:outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f]"
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="border border-gray-100 rounded overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 border-r">Country</th>
                <th className="px-4 py-3 border-r">State/Province</th>
                <th className="px-4 py-3 border-r">Warn Before End (mins)</th>
                <th className="px-4 py-3 border-r">Block Delivery End Shift</th>
                <th className="px-4 py-3">Allow Return End Shift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredConfigs.map(config => (
                <tr 
                  key={config.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onRowClick(config.id)}
                >
                  <td className="px-4 py-3 border-r">{config.country}</td>
                  <td className="px-4 py-3 border-r font-medium text-gray-900">{config.stateProvince || 'All (Country Level)'}</td>
                  <td className="px-4 py-3 border-r">{config.warnBeforeShiftEndMinutes} mins</td>
                  <td className="px-4 py-3 border-r">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${config.blockDeliveryActionsAtEnd ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {config.blockDeliveryActionsAtEnd ? 'ON' : 'OFF'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${config.allowReturnAllAtEnd ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {config.allowReturnAllAtEnd ? 'ON' : 'OFF'}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredConfigs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400 italic">
                    No shift control configurations found matching your search.
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
