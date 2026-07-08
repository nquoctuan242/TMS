import React, { useState } from 'react';
import { Carrier } from '../types';

interface CarrierDetailViewProps {
  carrier: Carrier | null;
}

export function CarrierDetailView({ carrier }: CarrierDetailViewProps) {
  const [formData, setFormData] = useState<Carrier | null>(carrier);
  const [activeTab, setActiveTab] = useState('General information');
  const [vendorStatuses, setVendorStatuses] = useState<Record<number, boolean>>({});
  const [expandedVendors, setExpandedVendors] = useState<Record<number, boolean>>({});

  if (!formData) return <div className="p-4 text-sm text-gray-500">Loading...</div>;

  const updateField = (field: keyof Carrier, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const toggleVendorStatus = (index: number) => {
    setVendorStatuses(prev => ({
      ...prev,
      [index]: prev[index] !== undefined ? !prev[index] : false,
    }));
  };

  const toggleVendorExpand = (index: number) => {
    setExpandedVendors(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addVendor = () => {
    updateField('shippingVendors', [...(formData.shippingVendors || []), { vendorName: '', services: [] }]);
    setExpandedVendors(prev => ({ ...prev, [formData.shippingVendors?.length || 0]: true }));
  };

  const updateVendorName = (index: number, val: string) => {
    const newVendors = [...(formData.shippingVendors || [])];
    newVendors[index] = { ...newVendors[index], vendorName: val };
    updateField('shippingVendors', newVendors);
  };

  const updateVendorField = (index: number, field: string, val: any) => {
    const newVendors = [...(formData.shippingVendors || [])];
    newVendors[index] = { ...newVendors[index], [field]: val };
    updateField('shippingVendors', newVendors);
  };

  const addService = (vendorIndex: number) => {
    const newVendors = [...(formData.shippingVendors || [])];
    newVendors[vendorIndex] = {
      ...newVendors[vendorIndex],
      services: [...(newVendors[vendorIndex].services || []), { code: '', name: '', isActive: true }]
    };
    updateField('shippingVendors', newVendors);
  };

  const updateService = (vendorIndex: number, serviceIndex: number, field: 'code' | 'name' | 'isActive', val: any) => {
    const newVendors = [...(formData.shippingVendors || [])];
    const newServices = [...(newVendors[vendorIndex].services || [])];
    newServices[serviceIndex] = { ...newServices[serviceIndex], [field]: val };
    newVendors[vendorIndex] = { ...newVendors[vendorIndex], services: newServices };
    updateField('shippingVendors', newVendors);
  };

  const removeService = (vendorIndex: number, serviceIndex: number) => {
    const newVendors = [...(formData.shippingVendors || [])];
    const newServices = newVendors[vendorIndex].services?.filter((_, i) => i !== serviceIndex);
    newVendors[vendorIndex] = { ...newVendors[vendorIndex], services: newServices || [] };
    updateField('shippingVendors', newVendors);
  };

  const removeVendor = (index: number) => {
    const newVendors = formData.shippingVendors?.filter((_, i) => i !== index);
    updateField('shippingVendors', newVendors || []);
  };

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Tabs */}
      <div className="flex px-4 border-b border-gray-200 gap-1 bg-white pt-2">
        {['General information'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-bold border-t-2 rounded-t transition-all ${
              activeTab === tab
                ? 'border-[#2c6e3b] text-[#2c6e3b] bg-white'
                : 'border-transparent text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="border border-gray-100 rounded-lg p-6 bg-white shadow-sm">
          
          <div className="flex justify-end mb-6">
             <button className="bg-[#2c6e3b] text-white px-5 py-2 rounded text-xs font-bold hover:bg-[#20512b] shadow-sm">
                 Update Carrier
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
             {/* Row 1 */}
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Carrier Code</label>
                 <div className="relative">
                     <input type="text" value={formData.carrierCode} onChange={(e) => updateField('carrierCode', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" />
                     <i className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]"></i>
                 </div>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Carrier Name</label>
                 <div className="relative">
                     <input type="text" value={formData.carrierName} onChange={(e) => updateField('carrierName', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" />
                     <i className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]"></i>
                 </div>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Phone Number</label>
                 <div className="relative">
                     <input type="text" value={formData.phoneNumber} onChange={(e) => updateField('phoneNumber', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" />
                     <i className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]"></i>
                 </div>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Address</label>
                 <div className="relative">
                     <input type="text" value={formData.address} onChange={(e) => updateField('address', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" />
                     <i className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]"></i>
                 </div>
             </div>

             {/* Row 2 */}
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Carrier API Reference</label>
                 <select value={formData.carrierApiReference} onChange={(e) => updateField('carrierApiReference', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white">
                     <option value="EASYPOST">EASYPOST</option>
                 </select>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Carrier Type</label>
                 <select value={formData.carrierType} onChange={(e) => updateField('carrierType', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white">
                     <option value="External">External</option>
                     <option value="Internal">Internal</option>
                 </select>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Integration Type</label>
                 <select value={formData.integrationType} onChange={(e) => updateField('integrationType', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white">
                     <option value="Shipping Aggregator">Shipping Aggregator</option>
                     <option value="Direct API">Direct API</option>
                 </select>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 flex items-center"><span className="text-red-500 mr-1">*</span>Status</label>
                 <select value={formData.status} onChange={(e) => updateField('status', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white">
                     <option value="Active">Active</option>
                     <option value="Inactive">Inactive</option>
                 </select>
             </div>

             {/* Row 3 */}
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700">Tax code</label>
                 <input type="text" value={formData.taxCode} onChange={(e) => updateField('taxCode', e.target.value)} placeholder="Tax Code" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white placeholder-gray-300" />
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700">Email</label>
                 <input type="text" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white placeholder-gray-300" />
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700">Country</label>
                 <select value={formData.country} onChange={(e) => updateField('country', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white">
                     <option value="Vietnam (VN)">Vietnam (VN)</option>
                     <option value="United States (US)">United States (US)</option>
                 </select>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 block mb-1.5">Is Master Bill</label>
                 <div 
                    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${formData.isMasterBill ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                    onClick={() => updateField('isMasterBill', !formData.isMasterBill)}
                 >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${formData.isMasterBill ? 'left-4.5' : 'left-0.5'}`}></div>
                 </div>
             </div>

             {/* Row 4 */}
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 block mb-1.5">Supports Customs Declaration</label>
                 <div 
                    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${formData.supportsCustomsDeclaration ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                    onClick={() => updateField('supportsCustomsDeclaration', !formData.supportsCustomsDeclaration)}
                 >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${formData.supportsCustomsDeclaration ? 'left-4.5' : 'left-0.5'}`}></div>
                 </div>
             </div>
             <div className="space-y-1">
                 <label className="text-[11px] font-medium text-gray-700 block mb-1.5">Enable Pickup Service</label>
                 <div 
                    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${formData.enablePickupService ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                    onClick={() => updateField('enablePickupService', !formData.enablePickupService)}
                 >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${formData.enablePickupService ? 'left-4.5' : 'left-0.5'}`}></div>
                 </div>
             </div>
          </div>

          <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2">
                  <label className="text-[11px] font-medium text-gray-700 flex-1 block">Shipping Vendors</label>
                  <label className="text-[11px] font-medium text-gray-700 shrink-0 block mr-1" title="Enable to purchase shipping service from this vendor">Buy Service</label>
              </div>
              <div className="space-y-4">
                 {formData.shippingVendors?.map((vendor, index) => (
                    <div key={index} className="border border-gray-200 rounded p-4 bg-gray-50/50">
                        <div className="flex items-center gap-2 mb-3">
                            <button 
                                onClick={() => toggleVendorExpand(index)}
                                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <i className={`fa-solid fa-chevron-${expandedVendors[index] ? 'down' : 'right'} text-[10px]`}></i>
                            </button>
                            <div className="relative flex-1">
                                <input 
                                    type="text" 
                                    value={vendor.vendorName || ''} 
                                    onChange={(e) => updateVendorName(index, e.target.value)} 
                                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white font-medium"
                                    placeholder="Vendor Name"
                                />
                                <i className="fa-solid fa-circle-xmark absolute right-3 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]" onClick={() => updateVendorName(index, '')}></i>
                            </div>
                            <div 
                               className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${vendorStatuses[index] !== false ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                               onClick={() => toggleVendorStatus(index)}
                            >
                               <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${vendorStatuses[index] !== false ? 'left-4.5' : 'left-0.5'}`}></div>
                            </div>
                            <button onClick={() => removeVendor(index)} className="text-red-500 hover:text-red-700 w-6 flex justify-center ml-2">
                                <i className="fa-regular fa-trash-can text-sm"></i>
                            </button>
                        </div>
                        
                        {expandedVendors[index] && (
                        <div className="pl-4 ml-3 border-l-2 border-gray-200 pt-2">
                            <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-100">
                               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Pickup / Dropoff</div>
                               <div className="flex flex-wrap items-center gap-6">
                                   <div className="flex items-center gap-2">
                                       <label className="text-[11px] text-gray-700 font-medium">Pickup Free</label>
                                        <div 
                                           className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors shrink-0 ${vendor.pickupFree !== false ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                                           onClick={() => updateVendorField(index, 'pickupFree', vendor.pickupFree === false ? true : false)}
                                        >
                                           <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${vendor.pickupFree !== false ? 'left-4.5' : 'left-0.5'}`}></div>
                                        </div>
                                   </div>
                                   <div className="flex items-center gap-2">
                                       <label className="text-[11px] text-gray-700 font-medium">Pickup On-demand</label>
                                        <div 
                                           className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors shrink-0 ${vendor.pickupOnDemand !== false ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                                           onClick={() => updateVendorField(index, 'pickupOnDemand', vendor.pickupOnDemand === false ? true : false)}
                                        >
                                           <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${vendor.pickupOnDemand !== false ? 'left-4.5' : 'left-0.5'}`}></div>
                                        </div>
                                   </div>
                                   <div className="flex items-center gap-2">
                                       <label className="text-[11px] text-gray-700 font-medium">Dropoff</label>
                                        <div 
                                           className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors shrink-0 ${vendor.dropoff !== false ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                                           onClick={() => updateVendorField(index, 'dropoff', vendor.dropoff === false ? true : false)}
                                        >
                                           <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${vendor.dropoff !== false ? 'left-4.5' : 'left-0.5'}`}></div>
                                        </div>
                                   </div>
                               </div>
                           </div>

                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex">
                                <div className="flex-1">Shipping Vendor Service Code</div>
                                <div className="flex-1 ml-2">Shipping Vendor Service Name</div>
                                <div className="w-8"></div>
                            </div>
                            <div className="space-y-2">
                                {vendor.services?.map((svc, sIndex) => (
                                    <div key={sIndex} className="flex items-center gap-2">
                                        <input 
                                            type="text" 
                                            value={svc.code} 
                                            onChange={(e) => updateService(index, sIndex, 'code', e.target.value)} 
                                            placeholder="Code"
                                            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white"
                                        />
                                        <input 
                                            type="text" 
                                            value={svc.name} 
                                            onChange={(e) => updateService(index, sIndex, 'name', e.target.value)} 
                                            placeholder="Name"
                                            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white"
                                        />
                                        <div 
                                           className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${svc.isActive !== false ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                                           onClick={() => updateService(index, sIndex, 'isActive', svc.isActive === false ? true : false)}
                                           title={svc.isActive !== false ? "Service Enabled" : "Service Disabled"}
                                        >
                                           <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${svc.isActive !== false ? 'left-4.5' : 'left-0.5'}`}></div>
                                        </div>
                                        <button onClick={() => removeService(index, sIndex)} className="text-red-400 hover:text-red-600 w-8 flex justify-center" title="Remove Service">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                ))}
                                {(!vendor.services || vendor.services.length === 0) && (
                                    <div className="text-xs text-gray-400 italic py-1">No services configured</div>
                                )}
                                <button onClick={() => addService(index)} className="mt-2 text-[10px] font-bold text-[#2c6e3b] hover:text-[#20512b] flex items-center gap-1">
                                    <i className="fa-solid fa-plus"></i> Add Service
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                 ))}
              </div>
              <div>
                  <button onClick={addVendor} className="px-3 py-1.5 border border-gray-300 rounded text-[11px] font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 bg-white">
                      <i className="fa-solid fa-plus text-[10px]"></i> Add vendor
                  </button>
              </div>
          </div>

          <div className="mt-6 space-y-1">
              <label className="text-[11px] font-medium text-gray-700 block">Note</label>
              <input type="text" value={formData.note} onChange={(e) => updateField('note', e.target.value)} placeholder="Note" className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white placeholder-gray-300" />
          </div>

        </div>
      </div>
    </div>
  );
}
