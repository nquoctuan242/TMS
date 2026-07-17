import React, { useState } from 'react';
import { LandingCostConfig } from '../types';

interface LandingCostDetailViewProps {
  config: LandingCostConfig | null;
  stores: any[];
  onBack: () => void;
  onSave: (config: LandingCostConfig) => void;
}

export function LandingCostDetailView({ config, stores, onBack, onSave }: LandingCostDetailViewProps) {
  const isCreate = !config;
  const [formData, setFormData] = useState<LandingCostConfig>(config || {
    id: '',
    name: '',
    type: 'Duty',
    formula: '',
    isActive: true,
    country: 'Vietnam (VN)',
    stateProvince: '',
    storeId: '',
    createdAt: new Date().toISOString()
  });

  return (
    <div className="bg-[#f8fafc] min-h-full py-6 px-4 pb-24 font-sans animate-in fade-in duration-300 relative">
      <div className="max-w-[800px] mx-auto mb-4">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-bold flex items-center gap-2">
          <i className="fa-solid fa-arrow-left"></i> Back to Configs
        </button>
      </div>

      <div className="max-w-[800px] mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{isCreate ? 'Create Landing Cost Config' : 'Edit Landing Cost Config'}</h2>
            <p className="text-sm text-gray-500 mt-1">Configure formulas and target locations for landing costs.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600">Active</span>
            <button 
              onClick={() => setFormData({...formData, isActive: !formData.isActive})}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.isActive ? 'bg-[#4d9e5f]' : 'bg-gray-300'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]"
                placeholder="e.g. Import Duty"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Type</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f] bg-white"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Duty">Duty</option>
                <option value="Tax">Tax</option>
                <option value="Shipping">Shipping</option>
                <option value="Handling">Handling</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Formula <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono outline-none focus:border-[#4d9e5f]"
              placeholder="e.g. FOB_PRICE * 0.1"
              value={formData.formula}
              onChange={(e) => setFormData({...formData, formula: e.target.value})}
            />
            <p className="text-xs text-gray-400 mt-1">Available variables: FOB_PRICE, QTY, CBM, GW, NW</p>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-[#1b4d3e]"></i> Application Scope
            </h3>
            
            <div className="text-[11px] text-gray-500 mb-4 bg-blue-50 text-blue-700 p-3 rounded border border-blue-100 flex items-start gap-2">
              <i className="fa-solid fa-circle-info mt-0.5"></i>
              <span>If you select a specific Store, this configuration applies only to that store. Otherwise, it falls back to State/Province, then Country.</span>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Country</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  <option value="Vietnam (VN)">Vietnam (VN)</option>
                  <option value="Thailand (TH)">Thailand (TH)</option>
                  <option value="Malaysia (MY)">Malaysia (MY)</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">State / Province</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({...formData, stateProvince: e.target.value, storeId: ''})}
                >
                  <option value="">All (Apply to Country)</option>
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Ha Noi">Ha Noi</option>
                  <option value="Da Nang">Da Nang</option>
                  <option value="Binh Duong">Binh Duong</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Store</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                  value={formData.storeId || ''}
                  onChange={(e) => setFormData({...formData, storeId: e.target.value})}
                >
                  <option value="">All (Apply to State/Country)</option>
                  {stores.map((store: any) => (
                    <option key={store.id} value={store.id}>{store.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 font-bold rounded-lg text-sm text-gray-700 hover:bg-white shadow-sm transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              if (!formData.name || !formData.formula) {
                alert("Please fill in all required fields.");
                return;
              }
              onSave(formData);
            }}
            className="bg-[#1b4d3e] text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-[#153a2f] shadow-md transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-check"></i> Save Config
          </button>
        </div>
      </div>
    </div>
  );
}
