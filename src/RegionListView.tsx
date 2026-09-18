import React, { useState } from 'react';
import { Region } from '../types';

interface RegionListViewProps {
  regions: Region[];
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RegionListView: React.FC<RegionListViewProps> = ({ regions, onCreate, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegions = regions.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.partnerName && r.partnerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Region Management</h2>
        <button 
          onClick={onCreate}
          className="bg-[#4d9e5f] text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          Add Region
        </button>
      </div>
      <div className="p-4 border-b">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search by name, code or partner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#4d9e5f]"
          />
          <i className="fa-solid fa-search absolute left-3 top-2.5 text-gray-400"></i>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Code</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Country</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Partner Scope</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">States Mapped</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegions.map(region => (
              <tr key={region.id} className="border-b hover:bg-gray-50/50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{region.code}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{region.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{region.country}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {region.partnerType === 'All' || !region.partnerType ? (
                    <span className="text-gray-400 italic">Global</span>
                  ) : (
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{region.partnerType}</span>
                      <div className="font-medium text-gray-800">{region.partnerName || '-'}</div>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-xs border border-blue-100">
                      {region.states?.length || 0}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${region.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {region.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onEdit(region.id)} className="text-gray-400 hover:text-blue-600 mx-2" title="Edit">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button onClick={() => onDelete(region.id)} className="text-gray-400 hover:text-red-600 mx-2" title="Delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {filteredRegions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500 text-sm">
                  No regions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
