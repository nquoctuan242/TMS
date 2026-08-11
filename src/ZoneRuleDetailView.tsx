import React, { useState, useEffect } from 'react';
import { ZoneRuleConfig } from '../types';
import { MOCK_ZONE_RULES } from '../constants';

interface ZoneRuleDetailViewProps {
  configId: string | null;
  onBack: () => void;
  onSave?: (config: ZoneRuleConfig) => void;
}

export function ZoneRuleDetailView({ configId, onBack, onSave }: ZoneRuleDetailViewProps) {
  const [formData, setFormData] = useState<ZoneRuleConfig | null>(null);

  useEffect(() => {
    if (configId) {
      const config = MOCK_ZONE_RULES.find(c => c.id === configId);
      if (config) {
        setFormData(config);
      }
    } else {
      setFormData({
        id: `ZR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        partner: '',
        matchType: '',
        isRemote: false,
        destScopeId: '',
        zoneId: '',
        priority: 1,
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
             <h2 className="text-lg font-bold text-[#111827]">{configId ? 'Edit Zone Rule' : 'New Zone Rule'}</h2>
             <span className="text-xs text-gray-500 font-medium">ID: {formData.id}</span>
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
              <h3 className="font-bold text-[#111827] text-sm">Zone Rule Configuration</h3>
              <p className="text-xs text-gray-500 mt-1">Set up carrier mapping and destination scopes</p>
           </div>
           <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Zone Rule ID</label>
                  <input 
                    type="text" 
                    value={formData.id}
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 rounded px-3 py-2 text-sm text-gray-500 outline-none cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Partner</label>
                  <input 
                    type="text" 
                    value={formData.partner}
                    onChange={e => setFormData({...formData, partner: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. C-001"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Match Type</label>
                  <select 
                    value={formData.matchType}
                    onChange={e => setFormData({...formData, matchType: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="">Select Match Type</option>
                    <option value="SPECIAL">SPECIAL</option>
                    <option value="SAME_PROVINCE">SAME_PROVINCE</option>
                    <option value="REGION_MATRIX">REGION_MATRIX</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Is Remote</label>
                  <select 
                    value={formData.isRemote ? 'TRUE' : 'FALSE'}
                    onChange={e => setFormData({...formData, isRemote: e.target.value === 'TRUE'})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="TRUE">TRUE</option>
                    <option value="FALSE">FALSE</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Dest Scope ID</label>
                  <input 
                    type="text" 
                    value={formData.destScopeId}
                    onChange={e => setFormData({...formData, destScopeId: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. DS-001"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Zone ID</label>
                  <input 
                    type="text" 
                    value={formData.zoneId}
                    onChange={e => setFormData({...formData, zoneId: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. Z-001"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Priority</label>
                  <input 
                    type="number" 
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. 1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Note</label>
                  <textarea 
                    value={formData.note}
                    onChange={e => setFormData({...formData, note: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e] min-h-[80px] resize-y"
                    placeholder="Enter any additional notes..."
                  />
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
