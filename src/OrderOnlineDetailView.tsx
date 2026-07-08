import React, { useState } from 'react';
import { OnlineOrder } from '../types';

interface OrderOnlineDetailViewProps {
  order: OnlineOrder | null;
  onBack: () => void;
}

export function OrderOnlineDetailView({ order, onBack }: OrderOnlineDetailViewProps) {
  const [activeTab, setActiveTab] = useState('Carrier information');
  const [shippingVendor, setShippingVendor] = useState('');
  const isCreate = !order;

  const VENDOR_SERVICES: Record<string, string[]> = {
    'FedEx': ['FIRST_OVERNIGHT', 'PRIORITY_OVERNIGHT', 'STANDARD_OVERNIGHT', 'FEDEX_2_DAY_AM', 'FEDEX_2_DAY', 'FEDEX_EXPRESS_SAVER', 'FEDEX_GROUND', 'SMART_POST'],
    'UPS': ['NextDayAirEarlyAM', 'NextDayAir', 'NextDayAirSaver', '2ndDayAirAM', '2ndDayAir', '3DaySelect', 'Ground'],
    'USPS': ['Express', 'Priority', 'GroundAdvantage']
  };

  return (
    <div className="bg-gray-50 flex flex-col h-full overflow-hidden animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-[#6db575] flex items-center justify-between px-4 py-2 text-white shrink-0">
        <h2 className="font-bold text-sm tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-bars"></i> {isCreate ? 'Create Order' : 'Edit Order'}
        </h2>
        
        <div className="flex flex-1 max-w-xl mx-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-white/70"></i>
            </div>
            <input 
                type="text" 
                placeholder="Search by order code, shipment code, tracking number..." 
                className="block w-full pl-9 pr-3 py-1.5 border-transparent rounded bg-black/10 text-white placeholder-white/70 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 sm:text-xs transition-colors"
            />
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
                <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" className="w-4 h-3 object-cover rounded-sm" alt="EN" />
                EN <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
            <div className="flex items-center gap-1.5 opacity-90">
                <i className="fa-regular fa-clock"></i> UTC+7
            </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shrink-0">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
             <i className="fa-solid fa-house"></i>
             <span>/</span>
             <span className="cursor-pointer hover:text-gray-800" onClick={onBack}>Orders</span>
             <span>/</span>
             <span className="cursor-pointer hover:text-gray-800" onClick={onBack}>Online</span>
             <span>/</span>
             <span className="text-gray-800 font-medium">{isCreate ? 'Create Order' : 'Edit Order'}</span>
          </nav>
          <i className="fa-solid fa-link text-gray-400 hover:text-gray-600 cursor-pointer"></i>
      </div>

      {/* Tabs */}
      <div className="flex px-4 border-b border-gray-200 gap-1 bg-gray-50 pt-3 shrink-0 items-center justify-between">
        <div className="flex gap-1">
            {[
            { id: 'General information', icon: 'fa-circle-info', color: 'text-blue-500' },
            { id: 'Partner information', icon: 'fa-handshake', color: 'text-orange-500' },
            { id: 'Items information', icon: 'fa-cart-shopping', color: 'text-blue-400' },
            { id: 'Service', icon: 'fa-headset', color: 'text-green-500' },
            { id: 'Carrier information', icon: 'fa-truck', color: 'text-red-400' }
            ].map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-t-2 rounded-t transition-all ${
                activeTab === tab.id
                    ? 'border-[#2c6e3b] text-[#2c6e3b] bg-white shadow-sm'
                    : 'border-transparent text-gray-500 hover:bg-white/60'
                }`}
            >
                <i className={`fa-solid ${tab.icon} ${activeTab === tab.id ? tab.color : 'opacity-70'}`}></i>
                {tab.id}
            </button>
            ))}
        </div>
        <div className="mb-2">
            <button className="bg-[#2c6e3b] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#20512b] shadow-sm flex items-center gap-1.5">
                <i className="fa-solid fa-plus"></i> {isCreate ? 'Create order' : 'Save'}
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto flex-1 bg-gray-50">
          <div className="bg-white rounded border border-gray-200 shadow-sm p-6 min-h-[400px]">
              {activeTab === 'Carrier information' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl">
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block">Carrier</label>
                          <div className="relative">
                              <select className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-500 outline-none focus:border-blue-500 appearance-none bg-white">
                                  <option value="">Select carrier</option>
                                  <option value="Easypost">Easypost</option>
                                  <option value="Hasaki Express">Hasaki Express</option>
                              </select>
                              <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-[10px] pointer-events-none"></i>
                          </div>
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block">Shipping Vendor</label>
                          <div className="relative">
                              <select 
                                value={shippingVendor}
                                onChange={(e) => setShippingVendor(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-500 outline-none focus:border-blue-500 appearance-none bg-white"
                              >
                                  <option value="">Select shipping vendor</option>
                                  <option value="FedEx">FedEx</option>
                                  <option value="UPS">UPS</option>
                                  <option value="USPS">USPS</option>
                              </select>
                              <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-[10px] pointer-events-none"></i>
                          </div>
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block">Shipping Vendor Service</label>
                          <div className="relative">
                              <select className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-500 outline-none focus:border-blue-500 appearance-none bg-white">
                                  <option value="">Select service</option>
                                  {shippingVendor && VENDOR_SERVICES[shippingVendor]?.map(svc => (
                                      <option key={svc} value={svc}>{svc}</option>
                                  ))}
                              </select>
                              <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-[10px] pointer-events-none"></i>
                          </div>
                      </div>
                      
                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block">Shipper</label>
                          <input type="text" placeholder="Shipper" className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300" />
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block">Type</label>
                          <input type="text" placeholder="Type" className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300" />
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block">Vehicle</label>
                          <input type="text" placeholder="Vehicle" className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300" />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                          <label className="text-xs font-bold text-gray-700 block">Note</label>
                          <input type="text" placeholder="Note" className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300" />
                      </div>
                  </div>
              ) : (
                  <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
                      Select Carrier information tab to view contents
                  </div>
              )}
          </div>
      </div>

    </div>
  );
}
