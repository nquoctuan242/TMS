import React, { useState, useEffect } from 'react';
import { ZoneMatrixConfig } from '../types';
import { MOCK_ZONE_MATRIX } from '../constants';

interface ZoneMatrixDetailViewProps {
  configId: string | null;
  onBack: () => void;
  onSave?: (config: ZoneMatrixConfig) => void;
}

export function ZoneMatrixDetailView({ configId, onBack, onSave }: ZoneMatrixDetailViewProps) {
  const [formData, setFormData] = useState<ZoneMatrixConfig | null>(null);

  useEffect(() => {
    if (configId) {
      const config = MOCK_ZONE_MATRIX.find(c => c.id === configId);
      if (config) {
        setFormData(config);
      }
    } else {
      setFormData({
        id: `${Math.floor(Math.random() * 1000).toString()}`,
        carrierId: '',
        fromRegion: '',
        toRegion: '',
        zoneName: '',
        note: ''
      });
    }
  }, [configId]);

  if (!formData) return null;

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fa] animate-in fade-in duration-300">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="flex flex-col">
             <h2 className="text-lg font-bold text-[#111827]">{configId ? 'Edit Zone Matrix' : 'New Zone Matrix'}</h2>
             <span className="text-xs text-gray-500 font-medium">Matrix ID: {formData.id}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (onSave) onSave(formData);
              onBack();
            }}
            className="bg-[#1b4d3e] text-white px-6 py-2 rounded text-sm font-bold hover:bg-[#13372c] transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-[#111827] text-sm">Zone Matrix Configuration</h3>
              <p className="text-xs text-gray-500 mt-1">Set up region-to-region mapping for carriers</p>
           </div>
           <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Matrix ID</label>
                  <input 
                    type="text" 
                    value={formData.id}
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2 text-sm text-gray-500 outline-none cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Carrier ID</label>
                  <input 
                    type="text" 
                    value={formData.carrierId}
                    onChange={e => setFormData({...formData, carrierId: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. 1, 2"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">From Region</label>
                  <select 
                    value={formData.fromRegion}
                    onChange={e => setFormData({...formData, fromRegion: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="">Select Region</option>
                    <option value="BAC">BAC</option>
                    <option value="TRUNG">TRUNG</option>
                    <option value="NAM">NAM</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">To Region</label>
                  <select 
                    value={formData.toRegion}
                    onChange={e => setFormData({...formData, toRegion: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="">Select Region</option>
                    <option value="BAC">BAC</option>
                    <option value="TRUNG">TRUNG</option>
                    <option value="NAM">NAM</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Zone Name</label>
                  <select 
                    value={formData.zoneName}
                    onChange={e => setFormData({...formData, zoneName: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="">Select Zone</option>
                    <option value="Nội miền">Nội miền</option>
                    <option value="Cận miền">Cận miền</option>
                    <option value="Liên miền (cách vùng)">Liên miền (cách vùng)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Note</label>
                  <textarea 
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e] min-h-[80px] resize-y"
                    placeholder="Enter any additional notes (e.g. Nội miền, Cận miền)..."
                  />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
