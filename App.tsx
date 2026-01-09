
import React, { useState } from 'react';
import { MOCK_SHIPMENT, MOCK_HISTORY } from './constants';
import { ShipmentData, HistoryEntry, TransitPoint } from './types';

const STORES = [
  '568 Lũy Bán Bích',
  '123 Nguyễn Trãi',
  '456 Lê Văn Sỹ',
  '789 Cách Mạng Tháng 8',
  'Kho trung tâm - Quận 12'
];

const MOCK_STORE_LIST = [
  { id: '1', name: 'SPA - 363 TO NGOC VAN', state: 'Ho Chi Minh', country: 'Vietnam', radius: 50, zoneCount: 12 },
  { id: '2', name: 'SPA - GENERAL', state: 'Ho Chi Minh', country: 'Vietnam', radius: 30, zoneCount: 8 },
  { id: '3', name: 'STOCK-TRANSHIPMENT', state: 'Hanoi', country: 'Vietnam', radius: 100, zoneCount: 24 },
  { id: '4', name: 'STOCK - 43 TAN HAI', state: 'Ho Chi Minh', country: 'Vietnam', radius: 45, zoneCount: 10 },
  { id: '5', name: 'SHOP - 176 PHAN DANG LUU', state: 'Ho Chi Minh', country: 'Vietnam', radius: 40, zoneCount: 9 },
  { id: '6', name: 'SHOP - 94 LE VAN VIET', state: 'Ho Chi Minh', country: 'Vietnam', radius: 55, zoneCount: 15 },
  { id: '7', name: 'SPA - 447 PHAN VAN TRI', state: 'Ho Chi Minh', country: 'Vietnam', radius: 35, zoneCount: 7 },
  { id: '8', name: 'SPA - 6 NGUYEN ANH THU', state: 'Ho Chi Minh', country: 'Vietnam', radius: 60, zoneCount: 18 },
  { id: '9', name: 'SPA - 304 LE VAN QUOI', state: 'Ho Chi Minh', country: 'Vietnam', radius: 25, zoneCount: 6 },
  { id: '10', name: 'WH - F3 - 182 CAU GIAY', state: 'Hanoi', country: 'Vietnam', radius: 150, zoneCount: 30 },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'shipment-detail' | 'stores-list' | 'store-edit'>('shipment-detail');
  const [activeTab, setActiveTab] = useState('General information');
  const [shipment, setShipment] = useState<ShipmentData>(MOCK_SHIPMENT);
  const [history, setHistory] = useState<HistoryEntry[]>(MOCK_HISTORY);
  const [storeSearchQuery, setStoreSearchQuery] = useState('');
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  
  const [isReDeliveryModalOpen, setIsReDeliveryModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  
  const [reDeliveryDate, setReDeliveryDate] = useState('');
  const [selectedStore, setSelectedStore] = useState(STORES[0]);
  const [selectedReturnStore, setSelectedReturnStore] = useState(STORES[0]);

  const handleAction = (action: string) => {
    if (action === 'Re-delivered') {
      setIsReDeliveryModalOpen(true);
    } else if (action === 'Return to warehouse') {
      setIsReturnModalOpen(true);
    } else {
      alert(`Action triggered: ${action}`);
    }
  };

  const handleImport = () => {
    setShowTemplateModal(true);
  };

  const handleExport = () => {
    const headers = "id,name,country,state,radius,zoneCount\n";
    const rows = MOCK_STORE_LIST.map(s => `${s.id},"${s.name}","${s.country}","${s.state}",${s.radius},${s.zoneCount}`).join("\n");
    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "stores_list_export.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCurrentTimestamp = () => {
    return new Date().toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).replace(/\//g, '/').replace(',', '');
  };

  const handleSaveReDelivery = () => {
    if (!reDeliveryDate) {
      alert('Please select a delivery date and time.');
      return;
    }

    const formattedDate = new Date(reDeliveryDate).toLocaleString('en-GB', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }).replace(/\//g, '/').replace(',', '');

    const newTransitPoint: TransitPoint = {
      name: 'Re-delivery Point',
      location: selectedStore,
      type: 'store',
      statusLabel: 'Re-delivering'
    };

    setShipment(prev => ({
      ...prev,
      isReDelivered: true,
      isReturned: false,
      transitPoints: [...prev.transitPoints, newTransitPoint]
    }));

    const newHistoryEntry: HistoryEntry = {
      status: 'Re-delivery Scheduled',
      time: getCurrentTimestamp(),
      performedBy: 'Nguyễn Quốc Tuấn',
      note: `Scheduled re-delivery for: ${formattedDate} at Store: ${selectedStore}.`,
      carrierStatus: 'Pending',
    };

    setHistory([newHistoryEntry, ...history]);
    setIsReDeliveryModalOpen(false);
    setReDeliveryDate('');
    setSelectedStore(STORES[0]);
  };

  const handleConfirmReturnToWarehouse = () => {
    const newTransitPoint: TransitPoint = {
      name: 'Return Target',
      location: selectedReturnStore,
      type: 'warehouse',
      statusLabel: 'Returning'
    };

    setShipment(prev => ({
      ...prev,
      isReturned: true,
      transitPoints: [...prev.transitPoints, newTransitPoint]
    }));

    const newHistoryEntry: HistoryEntry = {
      status: 'Returned to Warehouse',
      time: getCurrentTimestamp(),
      performedBy: 'Nguyễn Quốc Tuấn',
      note: `Confirmed return to: ${selectedReturnStore}.`,
      carrierStatus: 'Closed',
    };

    setHistory([newHistoryEntry, ...history]);
    setIsReturnModalOpen(false);
    setSelectedReturnStore(STORES[0]);
  };

  const filteredStores = MOCK_STORE_LIST.filter(store => 
    store.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) &&
    store.state.toLowerCase().includes(stateSearchQuery.toLowerCase()) &&
    store.country.toLowerCase().includes(countrySearchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1b4d3e] text-white hidden md:flex flex-col sticky top-0 h-screen shrink-0">
        <div className="p-4 flex items-center gap-2 border-b border-white/10 h-12">
          <div className="bg-white p-1 rounded">
             <i className="fa-solid fa-truck-fast text-[#1b4d3e] text-sm"></i>
          </div>
          <span className="font-bold tracking-tight">HASAKI TMS</span>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <SidebarItem icon="fa-gauge" label="Dashboard" onClick={() => {}} />
          <SidebarItem icon="fa-box" label="Orders" onClick={() => {}} />
          <SidebarItem 
            icon="fa-truck-arrow-right" 
            label="Shipments" 
            active={currentView === 'shipment-detail'} 
            hasSubItems 
            onClick={() => setCurrentView('shipment-detail')}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer ${currentView === 'shipment-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setCurrentView('shipment-detail')}
                >
                  Shipment List
                </div>
                <div className="text-xs font-medium text-white/60 hover:text-white px-3 py-1 cursor-pointer">Master Bill</div>
             </div>
          </SidebarItem>
          <SidebarItem icon="fa-car-side" label="Fleet" onClick={() => {}} />
          <SidebarItem icon="fa-chart-pie" label="Report" onClick={() => {}} />
          <SidebarItem icon="fa-handshake" label="Partner" onClick={() => {}} />
          <SidebarItem icon="fa-gears" label="Configs" onClick={() => {}} />
          <SidebarItem icon="fa-gear" label="Settings" active={currentView === 'stores-list' || currentView === 'store-edit'} hasSubItems onClick={() => {}}>
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer ${currentView === 'stores-list' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setCurrentView('stores-list')}
                >
                  Stores
                </div>
             </div>
          </SidebarItem>
          <SidebarItem icon="fa-user-shield" label="Admin" onClick={() => {}} />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-[#4d9e5f] text-white px-4 h-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4 shrink-0">
            <button className="md:hidden"><i className="fa-solid fa-bars"></i></button>
            <div className="flex items-center gap-2 font-semibold">
              <i className="fa-solid fa-list-ul"></i>
              <span>{currentView === 'shipment-detail' ? 'Shipment Detail' : (currentView === 'stores-list' ? 'Stores' : 'Store Edit')}</span>
            </div>
          </div>
          <div className="flex-1 max-w-2xl mx-10 relative group hidden sm:block text-sm">
             <span className="font-semibold">{currentView === 'stores-list' ? 'Stores' : ''}</span>
          </div>
          <div className="flex items-center gap-3 text-sm shrink-0">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[#4d9e5f]">
                <i className="fa-solid fa-user text-xs"></i>
              </div>
              <span className="hidden lg:inline">Nguyễn Quốc Tuấn</span>
              <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {currentView === 'shipment-detail' ? (
            <>
              <nav className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="fa-solid fa-house"></i>
                  <span className="text-gray-300">/</span>
                  <span className="hover:text-gray-700 cursor-pointer">Shipments</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-800 font-medium">Shipment Detail</span>
                </div>
              </nav>

              <div className="bg-white border p-4 flex flex-wrap gap-4 items-center justify-between shadow-sm rounded mb-4">
                <div className="flex gap-4 items-center">
                  <button onClick={() => handleAction('Returning warehouse')} className="px-6 py-2 bg-[#2563eb] text-white font-bold rounded shadow-sm hover:bg-blue-700 transition-all flex items-center gap-2 text-sm"><i className="fa-solid fa-arrow-rotate-left"></i> Returning warehouse</button>
                  <div className="flex items-center gap-2 text-sm"><span className="text-gray-400 font-medium">Is Return:</span><span className="px-2 py-1 bg-[#fff5f5] text-[#e03131] border border-[#ffc9c9] rounded font-bold uppercase text-[11px]">NO</span></div>
                  <div className={`px-4 py-2 bg-[#c05621] text-white font-bold rounded shadow-sm flex items-center gap-2 text-sm transition-opacity duration-300 ${shipment.isReDelivered ? 'opacity-100' : 'opacity-40 grayscale'}`}>Re-delivered</div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleAction('Re-delivered')} className="px-6 py-2 bg-[#4d9e5f] text-white font-bold rounded shadow-sm hover:bg-[#3d7d4c] transition-all flex items-center gap-2 text-sm"><i className="fa-solid fa-rotate-right"></i> Re-delivered</button>
                  <button onClick={() => handleAction('Return to warehouse')} className="px-6 py-2 bg-[#f97316] text-white font-bold rounded shadow-sm hover:bg-orange-600 transition-all flex items-center gap-2 text-sm"><i className="fa-solid fa-warehouse"></i> Return to warehouse</button>
                </div>
              </div>

              <div className="bg-white border rounded p-6 space-y-8 shadow-sm">
                <section>
                  <h3 className="font-bold text-[#1b4d3e] mb-4 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-4 bg-[#4d9e5f] rounded-full"></span>Shipment information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 border rounded overflow-hidden">
                    <InfoRow label="Shipment code" value={shipment.shipmentCode} bold />
                    <InfoRow label="Order codes" value={<span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded text-[11px] border border-blue-100">{shipment.orderCodes[0]}</span>} />
                    <InfoRow label="Customer code" value={<span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded text-[11px] border border-purple-100 font-mono">{shipment.customerCode}</span>} />
                    <InfoRow label="Amount" value={<span className="text-blue-600 font-bold">{shipment.amount.toFixed(3)} {shipment.currency}</span>} />
                    <InfoRow label="Weight" value={shipment.weight.toFixed(3)} />
                    <InfoRow label="Volume (Cm)" value={shipment.volume.toFixed(3)} />
                    <InfoRow label="Total dimensions (LxWxH)" value={shipment.dimensions} />
                    <InfoRow label="Shipping cost" value={<span className="text-[#4d9e5f] font-bold">{shipment.shippingCost.toFixed(3)}</span>} />
                    <InfoRow label="Empty" value="" />
                    <InfoRow label="Carrier name" value={<span className="text-[#4d9e5f] bg-green-50 px-2 py-0.5 rounded text-[11px] border border-green-100">{shipment.carrierName}</span>} />
                    <InfoRow label="Shipper name" value={<span className={`px-2 py-0.5 rounded text-[11px] border ${shipment.shipperName === '-' ? 'text-gray-400 bg-gray-50 border-gray-100 italic' : 'text-gray-800 bg-gray-50 border-gray-100'}`}>{shipment.shipperName}</span>} />
                    <InfoRow label="Empty" value="" />
                    <InfoRow label="Tracking number" value={<span className="text-[#4d9e5f] bg-green-50 px-2 py-0.5 rounded text-[11px] border border-green-100">{shipment.trackingNumber}</span>} />
                    <InfoRow label="Zone" value={<span className="bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1 rounded font-bold text-[12px] uppercase shadow-sm">{shipment.zone}</span>} />
                    <InfoRow label="Empty" value="" />
                    <InfoRow label="Status description" value={shipment.statusDescription} fullWidth />
                    <InfoRow label="Note" value={shipment.note} fullWidth />
                  </div>
                </section>

                {/* DYNAMIC MULTI-NODE SHIPPING ROUTE SECTION */}
                <section>
                   <h3 className="font-bold text-[#1b4d3e] mb-6 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-4 bg-[#4d9e5f] rounded-full"></span>Shipping Route</h3>
                   <div className="bg-white border rounded p-8 md:p-12 shadow-inner overflow-x-auto">
                      <div className="flex items-center justify-between min-w-[800px] relative">
                         
                         {/* SENDER Node */}
                         <div className="flex flex-col items-center text-center w-[180px] z-10">
                            <div className="w-14 h-14 bg-[#e8f5e9] text-[#4d9e5f] rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-white ring-1 ring-gray-100">
                               <i className="fa-solid fa-building-circle-arrow-right text-2xl"></i>
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sender</span>
                            <p className="text-[11px] font-medium text-gray-800 leading-tight">
                               <span className="bg-gray-200 text-gray-500 px-1 py-0.5 rounded mr-1 text-[9px] font-bold">KHO</span>
                               {shipment.senderAddress}
                            </p>
                         </div>

                         {/* Intermediate Nodes Mapping */}
                         {shipment.transitPoints.map((point, idx) => (
                            <React.Fragment key={idx}>
                               {/* Path Connector Segment */}
                               <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                                  <div className="w-full h-[1px] bg-gray-100 absolute top-[28px] z-0"></div>
                                  <div className="bg-white px-2 py-1 rounded-full border border-gray-50 shadow-sm z-10 mb-8">
                                     <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap uppercase tracking-tighter">
                                        {point.statusLabel || 'In Transit'}
                                     </span>
                                  </div>
                               </div>

                               {/* TRANSIT Node */}
                               <div className="flex flex-col items-center text-center w-[180px] z-10">
                                  <div className="w-16 h-16 bg-white border border-[#ffccbc] rounded-lg flex items-center justify-center mb-4 shadow-sm relative group overflow-hidden">
                                     <i className="fa-solid fa-cart-shopping text-[#ff7043] text-2xl"></i>
                                     <div className="absolute top-0 right-0 p-0.5 bg-orange-50 rounded-bl-lg">
                                        <i className="fa-solid fa-store text-[8px] text-orange-300"></i>
                                     </div>
                                     <div className="absolute bottom-0 w-full bg-[#fff3e0] py-0.5 border-t border-[#ffe0b2]">
                                        <span className="text-[8px] font-bold text-[#e64a19] uppercase tracking-tighter">{point.name}</span>
                                     </div>
                                  </div>
                                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{point.location}</p>
                                  <div className="mt-2 text-gray-200"><i className="fa-solid fa-chevron-right text-[10px]"></i></div>
                               </div>
                            </React.Fragment>
                         ))}

                         {/* Final Leg Connector */}
                         <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                            <div className="w-full h-[1px] bg-gray-100 absolute top-[28px] z-0"></div>
                            <div className="bg-white px-2 py-1 rounded-full border border-gray-50 shadow-sm z-10 mb-8">
                               <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap uppercase tracking-tighter">Delivered</span>
                            </div>
                         </div>

                         {/* RECEIVER Node */}
                         <div className="flex flex-col items-center text-center w-[180px] z-10">
                            <div className="w-14 h-14 bg-[#e3f2fd] text-[#1e88e5] rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-white ring-1 ring-gray-100">
                               <i className="fa-solid fa-truck-ramp-box text-2xl"></i>
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Receiver</span>
                            <p className="text-[11px] font-medium text-gray-800 leading-tight">{shipment.receiverAddress}</p>
                         </div>
                      </div>
                   </div>
                </section>

                <section>
                   <h3 className="font-bold text-[#1b4d3e] mb-4 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-4 bg-[#4d9e5f] rounded-full"></span>Shipment history</h3>
                   <div className="border rounded overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                         <thead className="bg-[#f8f9fa] border-b text-gray-600 font-bold uppercase tracking-tighter">
                            <tr>
                               <th className="px-4 py-3 border-r">Status</th>
                               <th className="px-4 py-3 border-r">Time</th>
                               <th className="px-4 py-3 border-r">Performed By</th>
                               <th className="px-4 py-3 border-r">Note</th>
                               <th className="px-4 py-3 border-r">Carrier status</th>
                               <th className="px-4 py-3">POD</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y text-gray-700">
                            {history.map((entry, idx) => (
                               <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 border-r whitespace-nowrap">
                                     <span className={`px-2 py-1 rounded font-bold text-[9px] uppercase border ${
                                       entry.status.includes('Scheduled') ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                                       entry.status.includes('Returned') ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                       'bg-gray-100 text-gray-600 border-gray-200'
                                     }`}>
                                       {entry.status}
                                     </span>
                                  </td>
                                  <td className="px-4 py-3 border-r text-gray-500 whitespace-nowrap font-mono">{entry.time}</td>
                                  <td className="px-4 py-3 border-r font-medium">{entry.performedBy}</td>
                                  <td className="px-4 py-3 border-r">{entry.note}</td>
                                  <td className="px-4 py-3 border-r text-gray-400">{entry.carrierStatus || '-'}</td>
                                  <td className="px-4 py-3">
                                     {entry.podImageUrl ? (
                                        <img src={entry.podImageUrl} alt="POD" className="w-8 h-8 rounded border shadow-sm cursor-pointer hover:scale-110 transition-transform" />
                                     ) : <span className="text-gray-300">-</span>}
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </section>
              </div>
            </>
          ) : currentView === 'stores-list' ? (
            <div className="max-w-full">
               <nav className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <i className="fa-solid fa-house"></i>
                  <span>/</span>
                  <span className="hover:text-gray-700 cursor-pointer">Configs</span>
                  <span>/</span>
                  <span className="text-gray-800 font-medium">Stores</span>
                </div>
              </nav>

              <div className="bg-white border rounded shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4 bg-white">
                  <div className="flex flex-1 flex-wrap items-center gap-3">
                    <div className="relative w-full max-w-[180px]">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <i className="fa-solid fa-globe text-xs"></i>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Country..." 
                        value={countrySearchQuery}
                        onChange={(e) => setCountrySearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#4d9e5f] focus:border-[#4d9e5f] outline-none transition-all"
                      />
                    </div>
                    <div className="relative w-full max-w-[180px]">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <i className="fa-solid fa-location-dot text-xs"></i>
                      </div>
                      <input 
                        type="text" 
                        placeholder="State/Province..." 
                        value={stateSearchQuery}
                        onChange={(e) => setStateSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#4d9e5f] focus:border-[#4d9e5f] outline-none transition-all"
                      />
                    </div>
                    <div className="relative w-full max-w-xs">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <i className="fa-solid fa-magnifying-glass text-xs"></i>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Search store name..." 
                        value={storeSearchQuery}
                        onChange={(e) => setStoreSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-[#4d9e5f] focus:border-[#4d9e5f] outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={handleImport} className="px-4 py-1.5 border border-gray-300 text-gray-700 font-medium rounded text-sm hover:bg-gray-50 transition flex items-center gap-2 text-xs font-bold"><i className="fa-solid fa-file-import text-blue-500"></i> Import</button>
                    <button onClick={handleExport} className="px-4 py-1.5 border border-gray-300 text-gray-700 font-medium rounded text-sm hover:bg-gray-50 transition flex items-center gap-2 text-xs font-bold"><i className="fa-solid fa-file-export text-orange-500"></i> Export</button>
                    <button onClick={() => setCurrentView('store-edit')} className="px-4 py-1.5 bg-[#1b4d3e] text-white font-bold rounded text-sm hover:bg-[#153a2f] transition flex items-center gap-2 text-xs font-bold"><i className="fa-solid fa-plus"></i> Create</button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto">
                   <table className="w-full text-left text-[13px] border-collapse">
                      <thead className="bg-[#f8f9fa] border-b text-gray-600 font-bold">
                        <tr>
                          <th className="px-4 py-3 border-r w-[30%]">Name</th>
                          <th className="px-4 py-3 border-r w-[15%]">Country</th>
                          <th className="px-4 py-3 border-r w-[15%]">State/Province</th>
                          <th className="px-4 py-3 border-r w-[10%] text-center whitespace-nowrap">Radius (Km)</th>
                          <th className="px-4 py-3 border-r w-[15%] text-center">Zone Count</th>
                          <th className="px-4 py-3 text-center w-[15%]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-gray-700">
                        {filteredStores.map((store) => (
                          <tr key={store.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border-r font-medium text-blue-600 hover:underline cursor-pointer">{store.name}</td>
                            <td className="px-4 py-3 border-r">{store.country}</td>
                            <td className="px-4 py-3 border-r">{store.state}</td>
                            <td className="px-4 py-3 border-r text-center">{store.radius}</td>
                            <td className="px-4 py-3 border-r text-center">{store.zoneCount}</td>
                            <td className="px-4 py-3 text-center">
                              <button onClick={() => setCurrentView('store-edit')} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded transition"><i className="fa-solid fa-pencil"></i></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>

                <div className="p-4 border-t bg-gray-50 flex items-center justify-between text-[13px] text-gray-600">
                   <div>Total: {filteredStores.length} of 804</div>
                   <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border rounded bg-white hover:bg-gray-50"><i className="fa-solid fa-chevron-left text-[10px]"></i></button>
                      <button className="px-3 py-1 border rounded bg-[#1b4d3e] text-white font-bold">1</button>
                      <button className="px-2 py-1 border rounded bg-white hover:bg-gray-50"><i className="fa-solid fa-chevron-right text-[10px]"></i></button>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
               <nav className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="fa-solid fa-house"></i>
                  <span className="text-gray-300">/</span>
                  <span className="hover:text-gray-700 cursor-pointer" onClick={() => setCurrentView('stores-list')}>Configs</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-800 font-medium">Store Detail</span>
                </div>
              </nav>

              <div className="bg-white border rounded shadow-sm p-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField label="Customer" required type="select" options={['OMS']} />
                    <FormField label="Name" required value="OMSS" />
                    <FormField label="Phone" required value="0987267289" />
                    <FormField label="Email" placeholder="Enter Email" />
                    <FormField label="Region" required type="select" options={['North America']} />
                    <FormField label="Country" required type="select" options={['United States']} />
                    <FormField label="State/Province" required type="select" options={['Hawaii']} />
                    <FormField label="City" required type="select" options={['Aiea']} />
                    <FormField label="Street" required value="99055 kauhale st Aiea Hawaii USA" />
                    <FormField label="Street Secondary" placeholder="Enter Street Secondary" />
                    <FormField label="Latitude" value="0" />
                    <FormField label="Longitude" value="0" />
                    <FormField label="Postal Code" required value="96701" />
                    <FormField label="Radius (Km)" placeholder="Enter Radius" type="number" />
                    <FormField label="Zone Count" placeholder="Enter Zone Count" type="number" />
                 </div>
                 <div className="flex justify-end mt-10 gap-3">
                    <button onClick={() => setCurrentView('stores-list')} className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded shadow-sm hover:bg-gray-50 transition-all">Cancel</button>
                    <button className="px-6 py-2.5 bg-[#1b4d3e] text-white font-bold rounded shadow-sm hover:bg-[#153a2f] transition-all flex items-center gap-2 text-sm">Update Store</button>
                 </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowTemplateModal(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-lg z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="p-4 text-white flex items-center justify-between bg-blue-600">
              <h3 className="font-bold flex items-center gap-2"><i className="fa-solid fa-file-import"></i> Import Stores Template</h3>
              <button onClick={() => setShowTemplateModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6 text-sm">
              <p className="text-gray-600 mb-6 font-medium">Download the template file to ensure your data is formatted correctly before importing.</p>
              <div className="flex flex-col gap-5">
                 <button className="w-full py-2.5 rounded font-bold text-white shadow-sm transition-all flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"><i className="fa-solid fa-download"></i> Download Template</button>
                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-all bg-gray-50/50">
                    <i className="fa-solid fa-cloud-arrow-up text-4xl mb-3"></i>
                    <span className="font-medium text-[13px]">Click or drag file here to upload</span>
                 </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2 border-t">
              <button onClick={() => setShowTemplateModal(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">Cancel</button>
              <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded shadow-md hover:bg-blue-700 text-sm">Process Import</button>
            </div>
          </div>
        </div>
      )}

      {/* Re-delivery Modal */}
      {isReDeliveryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReDeliveryModalOpen(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-md z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-[#4d9e5f] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><i className="fa-solid fa-calendar-check"></i> Schedule Re-delivery</h3>
              <button onClick={() => setIsReDeliveryModalOpen(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Select Next Point</label>
                <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-[#4d9e5f] outline-none bg-white transition cursor-pointer text-sm">
                  {STORES.map((store) => (<option key={store} value={store}>{store}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Date & Time</label>
                <input type="datetime-local" value={reDeliveryDate} onChange={(e) => setReDeliveryDate(e.target.value)} className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-[#4d9e5f] outline-none transition text-sm" />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2 border-t">
              <button onClick={() => setIsReDeliveryModalOpen(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">Cancel</button>
              <button onClick={handleSaveReDelivery} className="px-6 py-2 bg-[#4d9e5f] text-white font-bold rounded shadow-md hover:bg-[#3d7d4c] transition-all text-sm">Add to Route</button>
            </div>
          </div>
        </div>
      )}

      {/* Return to Warehouse Modal */}
      {isReturnModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReturnModalOpen(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-md z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-orange-500 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><i className="fa-solid fa-triangle-exclamation"></i> Confirm Return</h3>
              <button onClick={() => setIsReturnModalOpen(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6 text-center">
              <i className="fa-solid fa-warehouse text-4xl text-orange-200 mb-4"></i>
              <p className="font-bold text-lg mb-2 text-gray-800">Return to Warehouse?</p>
              <div className="mt-4 text-left">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Return Point</label>
                <select value={selectedReturnStore} onChange={(e) => setSelectedReturnStore(e.target.value)} className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-orange-500 outline-none bg-white transition cursor-pointer text-sm">
                  {STORES.map((store) => (<option key={store} value={store}>{store}</option>))}
                </select>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-center gap-3 border-t">
              <button onClick={() => setIsReturnModalOpen(false)} className="px-6 py-2 border rounded text-gray-500 w-full hover:bg-white transition font-medium">No, Back</button>
              <button onClick={handleConfirmReturnToWarehouse} className="px-6 py-2 bg-orange-500 text-white font-bold rounded shadow w-full hover:bg-orange-600 transition-all flex items-center justify-center gap-2 text-sm"><i className="fa-solid fa-check"></i> Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem: React.FC<{ icon: string; label: string; active?: boolean; hasSubItems?: boolean; children?: React.ReactNode; onClick?: () => void }> = ({ icon, label, active, hasSubItems, children, onClick }) => (
  <div className="mb-1">
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${active ? 'bg-white/10 text-white border-l-4 border-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      <i className={`fa-solid ${icon} w-5 text-center`}></i>
      <span className="flex-1 text-sm font-medium">{label}</span>
      {hasSubItems && <i className="fa-solid fa-chevron-down text-[10px]"></i>}
    </div>
    {children}
  </div>
);

const FormField: React.FC<{ label: string; required?: boolean; value?: string; placeholder?: string; type?: 'text' | 'select' | 'number'; options?: string[] }> = ({ label, required, value, placeholder, type = 'text', options }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{required && <span className="text-red-500 mr-1">*</span>}{label}</label>
    {type === 'select' ? (
      <select className="w-full px-3 py-2 border rounded text-sm bg-white focus:ring-1 focus:ring-[#4d9e5f] outline-none transition">
        {options?.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    ) : (
      <input type={type} defaultValue={value} placeholder={placeholder} className="w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-[#4d9e5f] outline-none transition" />
    )}
  </div>
);

const InfoRow: React.FC<{ label: string; value: React.ReactNode; bold?: boolean; fullWidth?: boolean }> = ({ label, value, bold, fullWidth }) => {
  if (label === 'Empty') return <div className="bg-white border-b border-r last:border-r-0 min-h-[40px] flex-1"></div>;
  return (
    <div className={`flex items-center min-h-[40px] border-b border-r last:border-r-0 ${fullWidth ? 'md:col-span-3' : ''}`}>
      <div className="w-1/3 md:w-40 bg-[#f8f9fa] px-4 py-2 h-full flex items-center border-r font-bold text-gray-600 text-[9px] uppercase tracking-wider shrink-0">{label}</div>
      <div className={`flex-1 px-4 py-2 text-[12px] ${bold ? 'font-bold text-gray-900' : 'text-gray-700'}`}>{value}</div>
    </div>
  );
};

export default App;
