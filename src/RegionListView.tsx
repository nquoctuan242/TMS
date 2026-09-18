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

  const filteredRegions = regions.filter(r => {
    const term = searchTerm.toLowerCase();
    const matchesName = r.name.toLowerCase().includes(term);
    const matchesCode = r.code.toLowerCase().includes(term);
    const matchesCountry = r.country?.toLowerCase().includes(term);
    const matchesPartnerName = r.partnerName?.toLowerCase().includes(term);
    const matchesPartnerNames = r.partnerNames?.some(p => p.toLowerCase().includes(term));
    const matchesStates = r.states?.some(s => s.toLowerCase().includes(term));
    return matchesName || matchesCode || matchesCountry || matchesPartnerName || matchesPartnerNames || matchesStates;
  });

  return (
    <div className="bg-white rounded shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-white">
        <div className="flex items-center gap-2">
          <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Region Management</h2>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold">
            {regions.length}
          </span>
        </div>
        <button 
          onClick={onCreate}
          className="bg-[#4d9e5f] text-white px-3.5 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2 shadow-xs"
        >
          <i className="fa-solid fa-plus"></i>
          Add Region
        </button>
      </div>

      <div className="p-4 border-b bg-gray-50/50">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search by name, code, partner or state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#4d9e5f] bg-white"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-xs"></i>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Code</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Name</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Country</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Apply To</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">States Mapped</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-600 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegions.map(region => {
              const partnerList = region.partnerNames && region.partnerNames.length > 0
                ? region.partnerNames
                : region.partnerName
                  ? region.partnerName.split(',').map(s => s.trim()).filter(Boolean)
                  : [];

              return (
                <tr key={region.id} className="border-b border-gray-100 hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold text-gray-800 font-mono">{region.code}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-800">
                    <div>{region.name}</div>
                    {region.description && (
                      <div className="text-[11px] text-gray-400 truncate max-w-xs">{region.description}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{region.country}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {region.partnerType === 'All' || !region.partnerType ? (
                      <span className="inline-block bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px] font-medium">
                        All
                      </span>
                    ) : (
                      <div className="space-y-1">
                        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          region.partnerType === 'Customer' 
                            ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                            : 'bg-purple-50 text-purple-700 border border-purple-100'
                        }`}>
                          {region.partnerType}
                        </span>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {partnerList.length > 0 ? (
                            partnerList.map(p => (
                              <span key={p} className="inline-block bg-gray-50 border border-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[11px]">
                                {p}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 italic text-[11px]">None specified</span>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs border border-emerald-200">
                        {region.states?.length || 0} States
                      </span>
                      {region.states && region.states.length > 0 && (
                        <span className="text-[11px] text-gray-400 truncate max-w-[150px]">
                          {region.states.slice(0, 3).join(', ')}{region.states.length > 3 ? '...' : ''}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      region.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {region.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => onEdit(region.id)} 
                      className="text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-blue-50 transition-colors mx-1" 
                      title="Edit Region"
                    >
                      <i className="fa-solid fa-pen text-xs"></i>
                    </button>
                    <button 
                      onClick={() => onDelete(region.id)} 
                      className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors mx-1" 
                      title="Delete Region"
                    >
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
            {filteredRegions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-xs">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <i className="fa-solid fa-earth-americas text-gray-300 text-3xl"></i>
                    <p className="text-gray-500 font-medium">No regions found</p>
                    <p className="text-gray-400 text-[11px]">Try adjusting your search criteria or add a new region.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
