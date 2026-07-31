const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { ShiftControlConfig, ShiftBreakConfig } from '../types';
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
    restBreaks: [],
    mealBreaks: [],
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    if (configId) {
      const existing = MOCK_SHIFT_CONTROL_CONFIGS.find(c => c.id === configId);
      if (existing) setFormData(existing);
    }
  }, [configId]);

  const renderBreakList = (title: string, type: 'restBreaks' | 'mealBreaks', icon: string) => {
    const breaks = formData[type] || [];
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className={\`fa-solid \${icon} text-[#4d9e5f]\`}></i>
              <h3 className="font-bold text-[#1b4d3e] text-sm uppercase tracking-wider">{title}</h3>
            </div>
            <button 
              onClick={() => {
                 const newBreak: ShiftBreakConfig = { id: Math.random().toString(36).substr(2, 9), startTime: '12:00', endTime: '13:00', warnBeforeMinutes: 15, isActive: true, turnOffApp: false };
                 setFormData({ ...formData, [type]: [...breaks, newBreak] });
              }}
              className="text-[#4d9e5f] hover:text-[#1b4d3e] text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <i className="fa-solid fa-plus-circle"></i> Add {title}
            </button>
          </div>
          <div className="p-4">
            {breaks.length === 0 ? (
              <div className="text-center py-6 text-gray-400 italic text-xs border border-dashed rounded-md bg-gray-50/50">
                No {title} configurations.
              </div>
            ) : (
              <div className="space-y-4">
                {breaks.map((b, index) => (
                  <div key={b.id} className="border border-gray-200 rounded-lg overflow-hidden relative group bg-white">
                     <div className="absolute top-2 right-2 flex gap-2">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-500">ACTIVE</span>
                            <button 
                              onClick={() => {
                                const newBreaks = [...breaks];
                                newBreaks[index] = { ...b, isActive: !b.isActive };
                                setFormData({ ...formData, [type]: newBreaks });
                              }}
                              className={\`relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${b.isActive ? 'bg-[#4d9e5f]' : 'bg-gray-300'}\`}
                            >
                              <span className={\`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${b.isActive ? 'translate-x-3' : 'translate-x-0'}\`} />
                            </button>
                         </div>
                         <button 
                           onClick={() => {
                              const newBreaks = breaks.filter((_, i) => i !== index);
                              setFormData({ ...formData, [type]: newBreaks });
                           }} 
                           className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                         >
                           <i className="fa-solid fa-trash-can text-[10px]"></i>
                         </button>
                     </div>
                     <div className="p-4 pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Start Time</label>
                          <input 
                            type="time" 
                            value={b.startTime} 
                            onChange={(e) => {
                               const newBreaks = [...breaks];
                               newBreaks[index] = { ...b, startTime: e.target.value };
                               setFormData({ ...formData, [type]: newBreaks });
                            }}
                            className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">End Time</label>
                          <input 
                            type="time" 
                            value={b.endTime} 
                            onChange={(e) => {
                               const newBreaks = [...breaks];
                               newBreaks[index] = { ...b, endTime: e.target.value };
                               setFormData({ ...formData, [type]: newBreaks });
                            }}
                            className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Warning (Mins Before)</label>
                          <input 
                            type="number" 
                            value={b.warnBeforeMinutes} 
                            onChange={(e) => {
                               const newBreaks = [...breaks];
                               newBreaks[index] = { ...b, warnBeforeMinutes: parseInt(e.target.value) || 0 };
                               setFormData({ ...formData, [type]: newBreaks });
                            }}
                            className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Turn off App during break</label>
                          <div className="h-[30px] flex items-center">
                            <button 
                              onClick={() => {
                                const newBreaks = [...breaks];
                                newBreaks[index] = { ...b, turnOffApp: !b.turnOffApp };
                                setFormData({ ...formData, [type]: newBreaks });
                              }}
                              className={\`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${b.turnOffApp ? 'bg-red-500' : 'bg-gray-300'}\`}
                            >
                              <span className={\`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${b.turnOffApp ? 'translate-x-4' : 'translate-x-0'}\`} />
                            </button>
                            <span className="ml-2 text-[10px] font-medium text-gray-600">{b.turnOffApp ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-lg font-bold text-[#1b4d3e]">
              {isCreate ? 'Create Shift Control' : 'Edit Shift Control'}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Configure operational rules and shift settings</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-bold hover:bg-gray-50 transition-colors"
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
        {/* Location Scope */}
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

        {/* Shift End Rules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
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
                    className={\`w-20 border rounded px-3 py-1.5 text-xs outline-none focus:border-[#4d9e5f] text-center font-bold \${formData.warnBeforeShiftEndEnabled !== false ? 'border-gray-300' : 'border-gray-200 bg-gray-50 text-gray-400'}\`}
                    value={formData.warnBeforeShiftEndMinutes}
                    onChange={(e) => setFormData({...formData, warnBeforeShiftEndMinutes: parseInt(e.target.value) || 0})}
                  />
                  <span className={\`text-xs font-medium \${formData.warnBeforeShiftEndEnabled !== false ? 'text-gray-600' : 'text-gray-400'}\`}>minutes</span>
                </div>
                <div className="h-6 w-px bg-gray-200"></div>
                <button 
                  onClick={() => setFormData({...formData, warnBeforeShiftEndEnabled: formData.warnBeforeShiftEndEnabled === false ? true : false})}
                  className={\`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${formData.warnBeforeShiftEndEnabled !== false ? 'bg-[#4d9e5f]' : 'bg-gray-300'}\`}
                >
                  <span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${formData.warnBeforeShiftEndEnabled !== false ? 'translate-x-5' : 'translate-x-0'}\`} />
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
                className={\`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${formData.blockDeliveryActionsAtEnd ? 'bg-[#4d9e5f]' : 'bg-gray-300'}\`}
              >
                <span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${formData.blockDeliveryActionsAtEnd ? 'translate-x-5' : 'translate-x-0'}\`} />
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
                className={\`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${formData.allowReturnAllAtEnd ? 'bg-[#4d9e5f]' : 'bg-gray-300'}\`}
              >
                <span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${formData.allowReturnAllAtEnd ? 'translate-x-5' : 'translate-x-0'}\`} />
              </button>
            </div>
          </div>
        </div>

        {renderBreakList('Rest Break', 'restBreaks', 'fa-mug-hot')}
        {renderBreakList('Meal Break', 'mealBreaks', 'fa-utensils')}

      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/ShiftControlDetailView.tsx', code);
console.log('Done');
