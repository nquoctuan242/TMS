const fs = require('fs');

const content = `import React, { useState, useEffect } from 'react';
import { DeliverySLAConfig, DeliverySLALocationOverride } from '../types';
import { MOCK_DELIVERY_SLA_CONFIGS } from '../constants';

interface DeliverySLADetailViewProps {
  configId: string | null;
  stores: any[];
  onBack: () => void;
}

export function DeliverySLADetailView({ configId, stores, onBack }: DeliverySLADetailViewProps) {
  const [formData, setFormData] = useState<DeliverySLAConfig | null>(null);
  
  const [enableCutoffRule, setEnableCutoffRule] = useState(false);
  const [enableAlerting, setEnableAlerting] = useState(false);

  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [editingOverride, setEditingOverride] = useState<any>(null);

  useEffect(() => {
    if (configId) {
      const config = MOCK_DELIVERY_SLA_CONFIGS.find(c => c.id === configId);
      if (config) {
        setFormData(config);
        setEnableCutoffRule(!!config.cutoffTime);
        setEnableAlerting(config.lateAlertMinutes > 0);
      }
    } else {
      setFormData({
        id: '',
        serviceName: '',
        cutoffTime: '15:00',
        beforeCutoffDeliverTime: '23:59',
        beforeCutoffDaysAdd: 1,
        afterCutoffDeliverTime: '18:00',
        afterCutoffDaysAdd: 2,
        lateAlertMinutes: 30,
        locationOverrides: []
      });
      setEnableCutoffRule(false);
      setEnableAlerting(false);
    }
  }, [configId]);

  if (!formData) return null;

  const formatDaysAdd = (days: number) => {
    if (days === 0) return 'same day';
    if (days === 1) return '+1 day';
    return \`+\${days} days\`;
  };

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
          <div className="flex items-center gap-3">
             <h2 className="text-lg font-bold text-[#111827]">{configId ? (formData.serviceName || 'Edit Configuration') : 'New Configuration'}</h2>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-4 py-1.5 bg-[#3b5998] text-white rounded text-sm font-medium hover:bg-[#2d4373] transition-colors shadow-sm"
        >
          Save changes
        </button>
      </div>

      <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
        
        {/* Main Config Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           {/* Visual Timeline - Only show if cutoff rule is enabled */}
           {enableCutoffRule && (
             <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex h-16 rounded overflow-hidden text-white text-[11px] font-bold">
                   <div className="bg-[#059669] px-4 py-2 flex flex-col justify-center w-3/5">
                      <div className="uppercase tracking-wider opacity-90 mb-1">Before Cutoff → End of Day</div>
                      <div className="text-sm">deliver {formData.beforeCutoffDeliverTime} · {formatDaysAdd(formData.beforeCutoffDaysAdd)}</div>
                   </div>
                   <div className="bg-[#d97706] px-4 py-2 flex flex-col justify-center w-2/5">
                      <div className="uppercase tracking-wider opacity-90 mb-1">From Cutoff Onward</div>
                      <div className="text-sm">deliver {formData.afterCutoffDeliverTime} · {formatDaysAdd(formData.afterCutoffDaysAdd)}</div>
                   </div>
                </div>
                <div className="flex text-[10px] text-gray-400 font-bold mt-2 px-1 relative">
                   <div className="w-full flex justify-between absolute border-t border-dashed border-gray-300 top-2 -z-10 left-0 right-0"></div>
                   <span className="bg-gray-50 pr-2 z-10">00:00</span>
                   <span className="bg-gray-50 px-2 z-10 ml-[25%]">06:00</span>
                   <span className="bg-gray-50 px-2 z-10 ml-[25%]">12:00</span>
                   <span className="bg-gray-50 px-2 z-10 ml-[25%]">18:00</span>
                   <span className="bg-gray-50 pl-2 z-10 ml-auto">24:00</span>
                </div>
             </div>
           )}
           
           <div className="p-6">
              {/* Service Details */}
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Service Details</h3>
                 <div className="max-w-md">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Service Name</label>
                    <input 
                      type="text" 
                      value={formData.serviceName}
                      onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                      placeholder="e.g. Same-day delivery"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Cutoff Time & Location Overrides */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#111827] text-sm">Delivery Rule & Location Scope</h3>
                <p className="text-xs text-gray-500 mt-1">Configure delivery timeframes before and after cutoff time</p>
              </div>
              {!enableCutoffRule && (
                <button 
                  onClick={() => setEnableCutoffRule(true)}
                  className="bg-white border border-[#3b5998] text-[#3b5998] px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Add config
                </button>
              )}
           </div>
           
           {enableCutoffRule && (
             <>
               <div className="p-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Cutoff Time</label>
                      <input 
                        type="time" 
                        value={formData.cutoffTime}
                        onChange={(e) => setFormData({...formData, cutoffTime: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                      />
                      <p className="text-[10px] text-gray-500 mt-1.5">Orders packed before this time will be processed using the Before Cutoff rule.</p>
                    </div>

                    <div className="border border-gray-200 rounded p-4 bg-gray-50">
                      <label className="text-[11px] font-bold text-[#059669] tracking-tight block mb-3">Before Cutoff Delivery Rule</label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-gray-500 block mb-1">Deliver By Time</label>
                          <input 
                            type="time" 
                            value={formData.beforeCutoffDeliverTime}
                            onChange={(e) => setFormData({...formData, beforeCutoffDeliverTime: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] text-gray-500 block mb-1">Days to Add</label>
                          <input 
                            type="number" 
                            value={formData.beforeCutoffDaysAdd}
                            onChange={(e) => setFormData({...formData, beforeCutoffDaysAdd: parseInt(e.target.value) || 0})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded p-4 bg-gray-50">
                      <label className="text-[11px] font-bold text-[#d97706] tracking-tight block mb-3">After Cutoff Delivery Rule</label>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-gray-500 block mb-1">Deliver By Time</label>
                          <input 
                            type="time" 
                            value={formData.afterCutoffDeliverTime}
                            onChange={(e) => setFormData({...formData, afterCutoffDeliverTime: e.target.value})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                          />
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] text-gray-500 block mb-1">Days to Add</label>
                          <input 
                            type="number" 
                            value={formData.afterCutoffDaysAdd}
                            onChange={(e) => setFormData({...formData, afterCutoffDaysAdd: parseInt(e.target.value) || 0})}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="p-5 border-t border-b border-gray-100 flex items-center justify-between bg-gray-50">
                  <div>
                    <h3 className="font-bold text-[#111827] text-sm">Location overrides</h3>
                    <p className="text-xs text-gray-500 mt-1">{formData.locationOverrides?.length || 0} locations override the default for this service</p>
                  </div>
                  <button 
                    onClick={() => {
                      setEditingOverride({
                        id: Math.random().toString(36).substr(2, 9),
                        country: 'Vietnam (VN)',
                        stateProvince: '',
                        storeId: '',
                        effectiveFrom: new Date().toISOString().split('T')[0]
                      });
                      setShowOverrideModal(true);
                    }}
                    className="border border-[#3b5998] text-[#3b5998] px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 bg-white"
                  >
                    <i className="fa-solid fa-plus"></i> Add override
                  </button>
               </div>
               
               {formData.locationOverrides && formData.locationOverrides.length > 0 && (
                 <table className="w-full text-left text-xs">
                    <thead className="text-gray-500 font-bold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-5 py-3">Location Scope</th>
                        <th className="px-5 py-3">Delivery Rule</th>
                        <th className="px-5 py-3">Effective From</th>
                        <th className="px-5 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-gray-800 bg-white">
                      {formData.locationOverrides.map((override) => (
                        <tr key={override.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-5 py-4 font-medium">
                             <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-gray-800">{override.country}</span>
                                {override.stateProvince && (
                                   <>
                                      <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
                                      <span className="text-gray-700">{override.stateProvince}</span>
                                   </>
                                )}
                                {override.storeId && (
                                   <>
                                      <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
                                      <span className="text-[#3b5998] font-bold">{stores.find(s => s.id === override.storeId)?.name || override.storeId}</span>
                                   </>
                                )}
                             </div>
                          </td>
                          <td className="px-5 py-4 text-xs text-gray-500 italic">Inherits from general config</td>
                          <td className="px-5 py-4 text-gray-500">{override.effectiveFrom}</td>
                          <td className="px-5 py-4 text-right">
                             <button 
                                onClick={() => {
                                  setEditingOverride(override);
                                  setShowOverrideModal(true);
                                }}
                                className="text-[#3b5998] font-medium hover:underline mr-3"
                             >
                                Edit
                             </button>
                             <button 
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this override?')) {
                                    setFormData({
                                      ...formData,
                                      locationOverrides: formData.locationOverrides.filter(o => o.id !== override.id)
                                    });
                                  }
                                }}
                                className="text-[#d32f2f] font-medium hover:underline"
                             >
                                Delete
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               )}
             </>
           )}
        </div>

        {/* Alerting */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#111827] text-sm">Alerting</h3>
                <p className="text-xs text-gray-500 mt-1">Configure automated alerts for delayed deliveries</p>
              </div>
              {!enableAlerting && (
                <button 
                  onClick={() => setEnableAlerting(true)}
                  className="bg-white border border-[#3b5998] text-[#3b5998] px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Add config
                </button>
              )}
           </div>
           
           {enableAlerting && (
             <div className="p-6 border-t border-gray-100">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Late Alert Time (Minutes)</label>
                <div className="flex items-center gap-3">
                   <input
                      type="number"
                      value={formData.lateAlertMinutes}
                      onChange={(e) => setFormData({...formData, lateAlertMinutes: parseInt(e.target.value) || 0})}
                      className="w-24 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500"
                   />
                   <span className="text-xs text-gray-600">min before ETA</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 max-w-sm">
                   Raise an "about to be late" alert this many minutes before the estimated delivery time
                </p>
             </div>
           )}
        </div>

      </div>

      {showOverrideModal && editingOverride && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-[#111827]">Location Scope Override</h3>
              <button onClick={() => setShowOverrideModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Country</label>
                  <select 
                    value={editingOverride.country}
                    onChange={(e) => setEditingOverride({...editingOverride, country: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800 bg-white"
                  >
                    <option value="Vietnam (VN)">Vietnam (VN)</option>
                    <option value="Thailand (TH)">Thailand (TH)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">State / Province</label>
                  <select 
                    value={editingOverride.stateProvince || ''}
                    onChange={(e) => setEditingOverride({...editingOverride, stateProvince: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800 bg-white"
                  >
                    <option value="">All States/Provinces</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Ha Noi">Ha Noi</option>
                    <option value="Da Nang">Da Nang</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Store</label>
                  <select 
                    value={editingOverride.storeId || ''}
                    onChange={(e) => setEditingOverride({...editingOverride, storeId: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800 bg-white"
                  >
                    <option value="">All Stores in Scope</option>
                    {stores.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <hr className="border-gray-100" />
              
              <div className="w-1/3">
                 <label className="text-[11px] font-bold text-gray-700 tracking-tight block mb-1.5">Effective From</label>
                 <input 
                   type="date" 
                   value={editingOverride.effectiveFrom}
                   onChange={(e) => setEditingOverride({...editingOverride, effectiveFrom: e.target.value})}
                   className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 text-gray-800"
                 />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button 
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-1.5 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const exists = formData.locationOverrides.some(o => o.id === editingOverride.id);
                  setFormData({
                    ...formData,
                    locationOverrides: exists 
                      ? formData.locationOverrides.map(o => o.id === editingOverride.id ? editingOverride : o)
                      : [...(formData.locationOverrides || []), editingOverride]
                  });
                  setShowOverrideModal(false);
                }}
                className="bg-[#3b5998] text-white px-6 py-1.5 rounded text-xs font-bold hover:bg-[#2d4373] transition-colors shadow-sm"
              >
                Save Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
