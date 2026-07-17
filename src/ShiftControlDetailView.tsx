import React, { useState, useEffect } from 'react';
import { ShiftControlConfig } from '../types';
import { MOCK_SHIFT_CONTROL_CONFIGS } from '../constants';

interface ShiftControlDetailViewProps {
  configId: string | null;
  stores: any[];
  onBack: () => void;
}

export function ShiftControlDetailView({ configId, onBack, stores }: ShiftControlDetailViewProps) {
  const isCreate = !configId;
  const [formData, setFormData] = useState<ShiftControlConfig>({
    id: '',
    country: 'Vietnam (VN)',
    stateProvince: '',
    warnBeforeShiftEndEnabled: true,
    warnBeforeShiftEndMinutes: 30,
    blockDeliveryActionsAtEnd: true,
    allowReturnAllAtEnd: true,
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    if (configId) {
      const existing = MOCK_SHIFT_CONTROL_CONFIGS.find(c => c.id === configId);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [configId]);

  return (
    <div className="bg-[#f8fafc] min-h-full flex flex-col animate-in slide-in-from-right duration-300">
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">
              {isCreate ? 'Create Shift Control Config' : 'Edit Shift Control Config'}
            </h2>
            <div className="text-[10px] text-gray-500 font-medium">Fleet / Shift Control</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onBack}
            className="px-4 py-1.5 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-1.5 bg-[#4d9e5f] text-white rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors shadow-sm"
          >
            Save Configuration
          </button>
        </div>
      </div>
      
      <div className="p-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <i className="fa-solid fa-earth-asia text-[#4d9e5f]"></i>
            <h3 className="font-bold text-[#1b4d3e] text-sm uppercase tracking-wider">Location Scope</h3>
          </div>
          <div className="p-5">
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
                  {stores.map(store => (
                    <option key={store.id} value={store.id}>{store.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
            <i className="fa-solid fa-clock-rotate-left text-[#4d9e5f]"></i>
            <h3 className="font-bold text-[#1b4d3e] text-sm uppercase tracking-wider">Shift End Rules & Controls</h3>
          </div>
          
          <div className="p-0">
            {/* Warning Setting */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-800 mb-1">Warning Before Shift Ends</h4>
                <p className="text-[11px] text-gray-500">Alert the shipper when their shift is about to end.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    min="0"
                    disabled={!formData.warnBeforeShiftEndEnabled}
                    className={`w-20 border rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f] text-center font-bold ${formData.warnBeforeShiftEndEnabled !== false ? 'border-gray-300' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
                    value={formData.warnBeforeShiftEndMinutes}
                    onChange={(e) => setFormData({...formData, warnBeforeShiftEndMinutes: parseInt(e.target.value) || 0})}
                  />
                  <span className={`text-xs font-medium ${formData.warnBeforeShiftEndEnabled !== false ? 'text-gray-600' : 'text-gray-400'}`}>minutes</span>
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <button 
                  onClick={() => setFormData({...formData, warnBeforeShiftEndEnabled: formData.warnBeforeShiftEndEnabled === false ? true : false})}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.warnBeforeShiftEndEnabled !== false ? 'bg-[#4d9e5f]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.warnBeforeShiftEndEnabled !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
            
            {/* Block Delivery Action */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#fcfdfc]">
              <div>
                <h4 className="text-xs font-bold text-gray-800 mb-1">Block Delivery Actions (End of Shift)</h4>
                <p className="text-[11px] text-gray-500 max-w-lg">Blocks operations such as Scan, Go Shipping, Delivered, Re-delivered, and Return to warehouse when the shift ends.</p>
              </div>
              <button 
                onClick={() => setFormData({...formData, blockDeliveryActionsAtEnd: !formData.blockDeliveryActionsAtEnd})}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.blockDeliveryActionsAtEnd ? 'bg-[#4d9e5f]' : 'bg-gray-300'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.blockDeliveryActionsAtEnd ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            
            {/* Allow Return All */}
            <div className="p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-800 mb-1">Force "Return to Warehouse" Prompt</h4>
                <p className="text-[11px] text-gray-500 max-w-lg">Shows a popup prompting the shipper to return all currently held orders to the warehouse. Orders will be marked as "Returning local hub".</p>
              </div>
              <button 
                onClick={() => setFormData({...formData, allowReturnAllAtEnd: !formData.allowReturnAllAtEnd})}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.allowReturnAllAtEnd ? 'bg-[#4d9e5f]' : 'bg-gray-300'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.allowReturnAllAtEnd ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
