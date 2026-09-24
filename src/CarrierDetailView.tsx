import React, { useState } from 'react';
import { Carrier, ShippingVendorService } from '../types';

interface CarrierDetailViewProps {
  carrier: Carrier | null;
  onBack?: () => void;
  onSave?: (carrier: Carrier) => void;
}

export const INTERNAL_SERVICES = [
  'Same day',
  'Next day',
  'Standard',
  'Express'
] as const;

export type InternalServiceType = typeof INTERNAL_SERVICES[number];

export function CarrierDetailView({ carrier, onBack, onSave }: CarrierDetailViewProps) {
  const [formData, setFormData] = useState<Carrier | null>(carrier);
  const [activeTab, setActiveTab] = useState('General information');
  const [vendorStatuses, setVendorStatuses] = useState<Record<number, boolean>>({});
  const [expandedVendors, setExpandedVendors] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    (carrier?.shippingVendors || []).forEach((_, idx) => {
      initial[idx] = true;
    });
    return initial;
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!formData) return <div className="p-6 text-sm text-gray-500">No carrier selected.</div>;

  const isAggregator = formData.integrationType === 'Shipping Aggregator';

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
    const newVendors = [...(formData.shippingVendors || []), { vendorName: '', services: [] }];
    updateField('shippingVendors', newVendors);
    setExpandedVendors(prev => ({ ...prev, [newVendors.length - 1]: true }));
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
      services: [
        ...(newVendors[vendorIndex].services || []),
        { code: '', name: '', internalService: '', isActive: true }
      ]
    };
    updateField('shippingVendors', newVendors);
  };

  const updateService = (
    vendorIndex: number,
    serviceIndex: number,
    field: keyof ShippingVendorService,
    val: any
  ) => {
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

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between border-b px-6 py-3.5 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-[#1b4d3e] transition-colors"
              title="Back to Carrier List"
            >
              <i className="fa-solid fa-arrow-left text-sm"></i>
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">
                {formData.carrierName ? `Carrier: ${formData.carrierName}` : 'Carrier Details'}
              </h2>
              {isAggregator && (
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                  <i className="fa-solid fa-network-wired text-[9px]"></i>
                  Shipping Aggregator
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-400">
              Configure credentials, integration scope, shipping vendors and service mapping
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-green-600 font-semibold flex items-center gap-1 mr-2 animate-pulse">
              <i className="fa-solid fa-circle-check"></i> Saved successfully
            </span>
          )}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            type="button"
            onClick={handleSave}
            className="bg-[#2c6e3b] text-white px-5 py-1.5 rounded text-xs font-bold hover:bg-[#20512b] shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-solid fa-check"></i>
            Update Carrier
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-6 border-b border-gray-200 gap-1 bg-white pt-2">
        {['General information'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === tab
                ? 'border-[#2c6e3b] text-[#2c6e3b] bg-white font-bold'
                : 'border-transparent text-gray-500 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-xs">
          {/* General Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
            {/* Row 1 */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Carrier Code
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.carrierCode} 
                  onChange={(e) => updateField('carrierCode', e.target.value)} 
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" 
                />
                <i 
                  className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]" 
                  onClick={() => updateField('carrierCode', '')}
                ></i>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Carrier Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.carrierName} 
                  onChange={(e) => updateField('carrierName', e.target.value)} 
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" 
                />
                <i 
                  className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]" 
                  onClick={() => updateField('carrierName', '')}
                ></i>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Phone Number
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.phoneNumber} 
                  onChange={(e) => updateField('phoneNumber', e.target.value)} 
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" 
                />
                <i 
                  className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]" 
                  onClick={() => updateField('phoneNumber', '')}
                ></i>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Address
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={(e) => updateField('address', e.target.value)} 
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white" 
                />
                <i 
                  className="fa-solid fa-circle-xmark absolute right-2 top-2 text-gray-300 hover:text-gray-400 cursor-pointer text-[10px]" 
                  onClick={() => updateField('address', '')}
                ></i>
              </div>
            </div>

            {/* Row 2 */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Carrier API Reference
              </label>
              <select 
                value={formData.carrierApiReference} 
                onChange={(e) => updateField('carrierApiReference', e.target.value)} 
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white"
              >
                <option value="EASYPOST">EASYPOST</option>
                <option value="UPS">UPS</option>
                <option value="USPS">USPS</option>
                <option value="FEDEX">FEDEX</option>
                <option value="SHIPPO">SHIPPO</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Carrier Type
              </label>
              <select 
                value={formData.carrierType} 
                onChange={(e) => updateField('carrierType', e.target.value)} 
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white"
              >
                <option value="External">External</option>
                <option value="Internal">Internal</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Integration Type
              </label>
              <select 
                value={formData.integrationType} 
                onChange={(e) => updateField('integrationType', e.target.value)} 
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white font-medium"
              >
                <option value="Shipping Aggregator">Shipping Aggregator</option>
                <option value="Direct API">Direct API</option>
                <option value="Actual Carrier">Actual Carrier</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700 flex items-center">
                <span className="text-red-500 mr-1">*</span>Status
              </label>
              <select 
                value={formData.status} 
                onChange={(e) => updateField('status', e.target.value)} 
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Row 3 */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700">Tax code</label>
              <input 
                type="text" 
                value={formData.taxCode || ''} 
                onChange={(e) => updateField('taxCode', e.target.value)} 
                placeholder="Tax Code" 
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white placeholder-gray-300" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700">Email</label>
              <input 
                type="text" 
                value={formData.email || ''} 
                onChange={(e) => updateField('email', e.target.value)} 
                placeholder="Email" 
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white placeholder-gray-300" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-gray-700">Country</label>
              <select 
                value={formData.country} 
                onChange={(e) => updateField('country', e.target.value)} 
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Vietnam (VN)">Vietnam (VN)</option>
                <option value="United States (US)">United States (US)</option>
                <option value="Thailand (TH)">Thailand (TH)</option>
                <option value="Indonesia (ID)">Indonesia (ID)</option>
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

          {/* Shipping Vendors Section */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200 gap-2">
              <div className="flex items-center gap-2.5">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                  Shipping Vendors
                </label>
                {isAggregator ? (
                  <span className="text-[11px] bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200 inline-flex items-center gap-1.5 shadow-xs">
                    <i className="fa-solid fa-link text-[10px]"></i>
                    Shipping Aggregator (Configured with Internal Services)
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-400">
                    (Direct / Standard Vendor configuration)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-medium text-gray-500" title="Enable to purchase shipping service from this vendor">
                  Buy Service
                </span>
              </div>
            </div>

            {isAggregator && (
              <div className="bg-blue-50/60 border border-blue-200/80 rounded p-3 text-[11px] text-blue-800 flex items-start gap-2">
                <i className="fa-solid fa-circle-info text-blue-600 mt-0.5"></i>
                <div>
                  <span className="font-bold">Shipping Aggregator Service Mapping:</span> Each shipping vendor service can be mapped to an <strong>Internal Service</strong> (combo box below) so that routing, automation rules, and customer-facing service names are standardized across all vendors.
                </div>
              </div>
            )}

            <div className="space-y-4">
              {formData.shippingVendors?.map((vendor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 shadow-xs">
                  {/* Vendor Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <button 
                      onClick={() => toggleVendorExpand(index)}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200/60 rounded transition-colors"
                      title={expandedVendors[index] ? 'Collapse Vendor' : 'Expand Vendor'}
                    >
                      <i className={`fa-solid fa-chevron-${expandedVendors[index] ? 'down' : 'right'} text-xs`}></i>
                    </button>
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        value={vendor.vendorName || ''} 
                        onChange={(e) => updateVendorName(index, e.target.value)} 
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white font-medium"
                        placeholder="Vendor Name (e.g. FedEx Express, UPS, VNPost...)"
                      />
                      {vendor.vendorName && (
                        <i 
                          className="fa-solid fa-circle-xmark absolute right-3 top-2.5 text-gray-300 hover:text-gray-400 cursor-pointer text-xs" 
                          onClick={() => updateVendorName(index, '')}
                        ></i>
                      )}
                    </div>
                    <div 
                      className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors shrink-0 ${vendorStatuses[index] !== false ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                      onClick={() => toggleVendorStatus(index)}
                      title="Buy Service Status"
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${vendorStatuses[index] !== false ? 'left-4.5' : 'left-0.5'}`}></div>
                    </div>
                    <button 
                      onClick={() => removeVendor(index)} 
                      className="text-gray-400 hover:text-red-600 w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 transition-colors ml-1"
                      title="Delete Vendor"
                    >
                      <i className="fa-regular fa-trash-can text-sm"></i>
                    </button>
                  </div>
                  
                  {/* Expanded Vendor Details */}
                  {expandedVendors[index] && (
                    <div className="pl-4 ml-2 border-l-2 border-emerald-200 pt-1 space-y-4">
                      {/* Pickup / Dropoff toggles */}
                      <div className="bg-white p-3 rounded border border-gray-200/80 shadow-2xs">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                          Pickup / Dropoff Capabilities
                        </div>
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

                      {/* Services Configuration Table */}
                      <div className="bg-white p-3.5 rounded border border-gray-200 shadow-2xs">
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                            Service Configuration List ({vendor.services?.length || 0})
                          </span>
                          {isAggregator && (
                            <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                              <i className="fa-solid fa-list-check mr-1"></i> Internal Service column enabled
                            </span>
                          )}
                        </div>

                        {/* Column Headers */}
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2 border-b border-gray-100 pb-1.5">
                          <div className={isAggregator ? 'flex-1' : 'flex-1'}>
                            Shipping Vendor Service Code <span className="text-red-500">*</span>
                          </div>
                          <div className={isAggregator ? 'flex-1' : 'flex-1'}>
                            Shipping Vendor Service Name <span className="text-red-500">*</span>
                          </div>
                          {isAggregator && (
                            <div className="flex-1 flex items-center gap-1.5 text-blue-800">
                              <i className="fa-solid fa-network-wired text-[9px]"></i>
                              <span>Internal Service</span>
                              <span className="text-[9px] bg-blue-100 text-blue-700 font-normal px-1 rounded">Combo Box</span>
                            </div>
                          )}
                          <div className="w-10 text-center" title="Active Status">Status</div>
                          <div className="w-8"></div>
                        </div>

                        {/* Service Rows */}
                        <div className="space-y-2">
                          {vendor.services?.map((svc, sIndex) => {
                            return (
                              <div key={sIndex} className="flex items-center gap-2 group hover:bg-gray-50/80 p-1 rounded transition-colors">
                                {/* Service Code */}
                                <div className={isAggregator ? 'flex-1' : 'flex-1'}>
                                  <input 
                                    type="text" 
                                    value={svc.code} 
                                    onChange={(e) => updateService(index, sIndex, 'code', e.target.value)} 
                                    placeholder="e.g. PRIORITY_OVERNIGHT"
                                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white font-mono"
                                  />
                                </div>

                                {/* Service Name */}
                                <div className={isAggregator ? 'flex-1' : 'flex-1'}>
                                  <input 
                                    type="text" 
                                    value={svc.name} 
                                    onChange={(e) => updateService(index, sIndex, 'name', e.target.value)} 
                                    placeholder="e.g. FedEx Priority Overnight"
                                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white"
                                  />
                                </div>

                                {/* Internal Service (Combo box for Shipping Aggregator) */}
                                {isAggregator && (
                                  <div className="flex-1 flex items-center gap-1">
                                    <div className="relative w-full flex items-center">
                                      <select
                                        value={
                                          INTERNAL_SERVICES.find(s => s.toLowerCase() === (svc.internalService || '').toLowerCase().replace(/_/g, ' '))
                                          || svc.internalService
                                          || ''
                                        }
                                        onChange={(e) => updateService(index, sIndex, 'internalService', e.target.value)}
                                        className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white font-medium cursor-pointer"
                                      >
                                        <option value="">-- Select Internal Service --</option>
                                        {INTERNAL_SERVICES.map(option => (
                                          <option key={option} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                        {svc.internalService && !INTERNAL_SERVICES.some(s => s.toLowerCase() === svc.internalService?.toLowerCase().replace(/_/g, ' ')) && (
                                          <option value={svc.internalService}>{svc.internalService}</option>
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                )}

                                {/* Status Toggle */}
                                <div className="w-10 flex justify-center">
                                  <div 
                                    className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors shrink-0 ${svc.isActive !== false ? 'bg-[#2c6e3b]' : 'bg-gray-300'}`}
                                    onClick={() => updateService(index, sIndex, 'isActive', svc.isActive === false ? true : false)}
                                    title={svc.isActive !== false ? "Service Active" : "Service Inactive"}
                                  >
                                    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${svc.isActive !== false ? 'left-4.5' : 'left-0.5'}`}></div>
                                  </div>
                                </div>

                                {/* Delete Service Action */}
                                <button 
                                  onClick={() => removeService(index, sIndex)} 
                                  className="text-gray-400 hover:text-red-600 w-8 h-7 flex items-center justify-center rounded hover:bg-red-50 transition-colors"
                                  title="Remove Service"
                                >
                                  <i className="fa-solid fa-xmark text-xs"></i>
                                </button>
                              </div>
                            );
                          })}

                          {(!vendor.services || vendor.services.length === 0) && (
                            <div className="text-xs text-gray-400 italic py-2 text-center bg-gray-50 rounded border border-dashed border-gray-200">
                              No services configured for this vendor. Click "Add Service" below to create one.
                            </div>
                          )}

                          <button 
                            type="button"
                            onClick={() => addService(index)} 
                            className="mt-2 text-xs font-bold text-[#2c6e3b] hover:text-[#20512b] flex items-center gap-1.5 px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                          >
                            <i className="fa-solid fa-plus text-[10px]"></i> Add Service
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {(!formData.shippingVendors || formData.shippingVendors.length === 0) && (
                <div className="text-center py-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-xs text-gray-500">
                  No shipping vendors added for this carrier yet.
                </div>
              )}
            </div>

            <div>
              <button 
                type="button"
                onClick={addVendor} 
                className="px-3.5 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#2c6e3b] flex items-center gap-1.5 bg-white transition-colors shadow-2xs"
              >
                <i className="fa-solid fa-plus text-[10px]"></i> Add Shipping Vendor
              </button>
            </div>
          </div>

          {/* Note Field */}
          <div className="mt-8 space-y-1 pt-4 border-t border-gray-200">
            <label className="text-[11px] font-medium text-gray-700 block">Note</label>
            <input 
              type="text" 
              value={formData.note || ''} 
              onChange={(e) => updateField('note', e.target.value)} 
              placeholder="Internal notes or remarks..." 
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs text-gray-800 outline-none focus:border-blue-500 bg-white placeholder-gray-300" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
