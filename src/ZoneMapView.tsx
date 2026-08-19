import React, { useState } from 'react';
import { ZoneMatrixListView } from './ZoneMatrixListView';
import { PostalZoneListView } from './PostalZoneListView';

interface ZoneMapViewProps {
  onEditRegional: (id: string) => void;
  onCreateRegional: () => void;
}

export function ZoneMapView({ onEditRegional, onCreateRegional }: ZoneMapViewProps) {
  const [activeTab, setActiveTab] = useState<'Postal Zone' | 'Regional Zone'>('Postal Zone');

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] animate-in fade-in duration-300">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Zone Map</h2>
        {activeTab === 'Regional Zone' && (
          <button 
            onClick={onCreateRegional}
            className="bg-[#1b4d3e] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#13372c] transition-colors flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-plus"></i>
            Create Zone Map
          </button>
        )}
      </div>
      
      <div className="bg-white border-b border-gray-200 px-6 pt-2 shrink-0">
         <div className="flex gap-6">
            <button 
               onClick={() => setActiveTab('Postal Zone')} 
               className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeTab === 'Postal Zone' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
            >
               Postal Zone
            </button>
            <button 
               onClick={() => setActiveTab('Regional Zone')} 
               className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeTab === 'Regional Zone' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
            >
               Regional Zone
            </button>
         </div>
      </div>

      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        {activeTab === 'Postal Zone' ? (
           <PostalZoneListView />
        ) : (
           <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <ZoneMatrixListView onEdit={onEditRegional} onCreate={onCreateRegional} isEmbedded={true} />
           </div>
        )}
      </div>
    </div>
  );
}
