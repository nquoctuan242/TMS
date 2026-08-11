import React, { useState, useEffect } from 'react';
import { ServicePricing } from '../types';
import { MOCK_SERVICE_PRICING } from '../constants';

interface ServicePricingDetailViewProps {
  pricingId: string | null;
  onBack: () => void;
  onSave: (data: ServicePricing) => void;
}

export function ServicePricingDetailView({ pricingId, onBack, onSave }: ServicePricingDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'List of Charges' | 'Remote Area Surcharges' | 'Extra fees'>('Remote Area Surcharges');
  const [formData, setFormData] = useState<ServicePricing | null>(null);

  useEffect(() => {
    if (pricingId) {
      const p = MOCK_SERVICE_PRICING.find(x => x.id === pricingId);
      if (p) setFormData(p);
    } else {
      setFormData({
        id: '',
        code: '',
        versionName: '',
        effectiveDate: '',
        expiredDate: '',
        status: 'Not Yet Started',
        note: '',
        dynamicPricingSchema: 'ZONE_BASED'
      });
    }
  }, [pricingId]);

  if (!formData) return null;

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h3 className="font-bold text-gray-800">{pricingId ? 'Edit Service Pricing' : 'New Service Pricing'}</h3>
        </div>
        <button 
          onClick={() => onSave(formData)}
          className="bg-[#1b4d3e] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#13372c] transition-colors shadow-sm"
        >
          Save
        </button>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Code</label>
            <input 
              type="text" 
              value={formData.code}
              onChange={e => setFormData({...formData, code: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
              placeholder="e.g. PRC922542"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Version Name</label>
            <input 
              type="text" 
              value={formData.versionName}
              onChange={e => setFormData({...formData, versionName: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
              placeholder="e.g. Service Pricing for..."
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Effective Date (UTC+7)</label>
            <input 
              type="text" 
              value={formData.effectiveDate}
              onChange={e => setFormData({...formData, effectiveDate: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Expired Date (UTC+7)</label>
            <input 
              type="text" 
              value={formData.expiredDate}
              onChange={e => setFormData({...formData, expiredDate: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Dynamic Pricing Schema</label>
            <select 
              value={formData.dynamicPricingSchema}
              onChange={e => setFormData({...formData, dynamicPricingSchema: e.target.value as any})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
            >
              <option value="ZONE_BASED">ZONE_BASED</option>
              <option value="DISTANCE_BASED">DISTANCE_BASED</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Status</label>
            <select 
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value as any})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
            >
              <option value="Effective">Effective</option>
              <option value="Not Yet Started">Not Yet Started</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Note</label>
            <textarea 
              value={formData.note}
              onChange={e => setFormData({...formData, note: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e] min-h-[80px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 bg-white">
        <div className="flex gap-6 px-6 pt-2 border-b">
          <button onClick={() => setActiveTab('List of Charges')} className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeTab === 'List of Charges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>List of Charges</button>
          <button onClick={() => setActiveTab('Remote Area Surcharges')} className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeTab === 'Remote Area Surcharges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Remote Area Surcharges</button>
          <button onClick={() => setActiveTab('Extra fees')} className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeTab === 'Extra fees' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Extra fees</button>
        </div>
        <div className="p-6 bg-gray-50/30">
           {activeTab === 'Remote Area Surcharges' ? (
              
              <div className="space-y-6">
                  <h2 className="text-[#4d9e5f] font-bold text-sm">International (VN - US)</h2>
                  <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-full p-2 px-6 flex items-center gap-10 shadow-sm">
                    <div className="flex items-center gap-2">
                       <i className="fa-solid fa-earth-americas text-[#4d9e5f]"></i>
                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Route:</span>
                       <span className="text-xs font-bold text-gray-700">Vietnam</span>
                       <i className="fa-solid fa-arrow-right-long text-gray-300"></i>
                       <span className="text-xs font-bold text-gray-700">United States</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">VAT:</span>
                       <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold">0%</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Currency:</span>
                       <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">USD</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                     <button className="border border-[#4d9e5f] text-[#4d9e5f] px-3 py-1.5 rounded flex items-center gap-2 text-[12px] font-bold hover:bg-green-50 transition-colors">
                        <i className="fa-solid fa-plus"></i> Add Remote Area Surcharges
                     </button>
                  </div>
                  <div className="border border-gray-100 rounded-lg shadow-sm overflow-hidden bg-white relative">
                     <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden select-none flex flex-wrap gap-20 p-20">
                        {Array(10).fill(0).map((_, i) => <span key={i} className="text-4xl font-bold -rotate-45 text-black">QC</span>)}
                     </div>
                     <div className="p-4 flex items-center justify-between border-b">
                        <div className="bg-blue-600 text-white px-3 py-1 text-[11px] font-bold rounded shadow-sm uppercase tracking-wide">Surcharge Remote Zone</div>
                        <button className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 transition-colors">
                           <i className="fa-solid fa-trash-can"></i> Remove
                        </button>
                     </div>
                     <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                           <div className="space-y-2">
                              <label className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 tracking-tight">
                                 Define Remote Regions <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                 <select className="w-full border border-[#e5e7eb] rounded-[6px] px-3 py-2 text-[12px] text-gray-400 focus:ring-1 focus:ring-[#4d9e5f] outline-none bg-white appearance-none cursor-pointer h-10 shadow-sm">
                                    <option>Select state/province</option>
                                 </select>
                                 <i className="fa-solid fa-chevron-down absolute right-3 top-[13px] text-[10px] text-gray-400 pointer-events-none"></i>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 tracking-tight">
                                 Leadtime (h)
                              </label>
                              <div className="relative">
                                 <input type="text" defaultValue="2" className="w-full border border-[#e5e7eb] rounded-[6px] px-3 py-2 text-[12px] text-gray-800 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white transition-all shadow-sm h-10" />
                              </div>
                           </div>
                        </div>
                        <div className="flex justify-end relative z-10">
                           <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded flex items-center gap-2 text-[11px] font-bold hover:bg-gray-50 transition-all shadow-sm">
                              <i className="fa-solid fa-plus"></i> Add Row
                           </button>
                        </div>
                        <div className="border border-gray-100 rounded overflow-hidden relative z-10">
                           <table className="w-full text-left text-[11px] border-collapse">
                              <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
                                 <tr>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Service Type</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Category</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Calculate Fee Type</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Calculation Condition</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Fee</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight From ({'>'})</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight To ({'≤'})</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Distance From</th>
                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Distance To</th>
                                    <th className="px-3 py-2 text-center">Actions</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y text-gray-600 font-medium">
                                 <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-3 py-2.5 border-r border-gray-100">Express 1H</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100">Document</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100">Percentage</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100">Weight (kg)</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100">0</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100">0</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100">0</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100 text-gray-300 italic">0</td>
                                    <td className="px-3 py-2.5 border-r border-gray-100 text-gray-300 italic">0</td>
                                    <td className="px-3 py-2.5">
                                       <div className="flex items-center justify-center gap-3">
                                          <i className="fa-regular fa-copy text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"></i>
                                          <i className="fa-solid fa-trash-can text-red-300 cursor-pointer hover:text-red-500 transition-colors"></i>
                                       </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <div className="bg-gray-100 h-1.5 w-full mt-auto relative overflow-hidden">
                              <div className="absolute left-0 top-0 h-full w-1/4 bg-gray-300 rounded-full"></div>
                           </div>
                        </div>
                     </div>
                  </div>
              </div>

           ) : (
              <div className="text-gray-500 py-10 text-center">{activeTab} Content</div>
           )}
        </div>
      </div>
    </div>
  );
}

