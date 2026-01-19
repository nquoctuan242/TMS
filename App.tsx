
import React, { useState } from 'react';
import { MOCK_SHIPMENT, MOCK_HISTORY } from './constants';
import { ShipmentData, HistoryEntry, TransitPoint } from './types';

const STORES = [
  'Hasaki Warehouse - 71 Hoang Hoa Tham',
  'Store 123 - 568 Luy Ban Bich',
  'Warehouse Q12 - Le Van Khuong',
  'Tan Binh Hub',
  'District 10 Hub'
];

const MOCK_SHIPMENTS_LIST = [
  { id: '1', code: 'S260119G19E', order: '2601192TO9', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: '', status: 'Cancelled', priority: 'normal', createdAt: '19/01/2026 13:29:15' },
  { id: '2', code: 'S260119DMX6', order: '260119MOHQ', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: '', status: 'Delivered', priority: 'normal', createdAt: '19/01/2026 11:14:04' },
  { id: '3', code: 'S260119QLN1', order: '2601199TVU', customer: 'OMS - NOW_20250606121235', carrier: 'Yun Express', shipper: '', status: 'Delivered', priority: 'normal', createdAt: '19/01/2026 10:01:09' },
  { id: '4', code: 'S260119P4W0', order: '260119XVHR', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: 'AnhHung Xa Lo', status: 'Returned Local Hub', priority: 'normal', createdAt: '19/01/2026 09:55:03' },
  { id: '5', code: 'S260119LNC4', order: '260119KEBK', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: '', status: 'Waiting for Pickup', priority: 'normal', createdAt: '19/01/2026 09:23:06' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'shipment-list' | 'shipment-detail' | 'stores-list' | 'store-edit'>('shipment-list');
  const [activeTab, setActiveTab] = useState('General information');
  const [shipment, setShipment] = useState<ShipmentData>(MOCK_SHIPMENT);
  const [history, setHistory] = useState<HistoryEntry[]>(MOCK_HISTORY);
  const [listShipments, setListShipments] = useState(MOCK_SHIPMENTS_LIST);
  
  // Modal states
  const [isReDeliveryModalOpen, setIsReDeliveryModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isReturningLocalHubModalOpen, setIsReturningLocalHubModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
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

  const handleStatusChange = (id: string, newStatus: string) => {
    if (newStatus === 'Returning Local Hub' || newStatus === 'Returning warehouse') {
      setSelectedShipmentId(id);
      setPendingStatus(newStatus);
      setIsReturningLocalHubModalOpen(true);
    } else {
      setListShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    }
  };

  const confirmReturnAction = () => {
    if (selectedShipmentId && pendingStatus) {
      const finalStatus = pendingStatus === 'Returning Local Hub' ? 'Returned Local Hub' : 'Returned Warehouse';
      
      setListShipments(prev => prev.map(s => s.id === selectedShipmentId ? { ...s, status: finalStatus } : s));
      setIsReturningLocalHubModalOpen(false);
      
      // Update Detail View if it's the same shipment
      const targetShipment = listShipments.find(s => s.id === selectedShipmentId);
      if (shipment.shipmentCode === targetShipment?.code) {
          const newPoint: TransitPoint = {
              name: pendingStatus === 'Returning Local Hub' ? 'Local Hub' : 'Target Warehouse',
              location: selectedReturnStore,
              type: 'warehouse',
              statusLabel: 'Returning'
          };
          setShipment(prev => ({...prev, transitPoints: [...prev.transitPoints, newPoint]}));
          
          setHistory([{
            status: finalStatus,
            time: getCurrentTimestamp(),
            performedBy: 'Nguyen Quoc Tuan',
            note: `Shipment marked as ${finalStatus} at ${selectedReturnStore}`,
            carrierStatus: 'In Transit',
          }, ...history]);
      }
      
      setSelectedShipmentId(null);
      setPendingStatus(null);
    }
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
    setHistory([{
      status: 'Re-delivery Scheduled',
      time: getCurrentTimestamp(),
      performedBy: 'Nguyen Quoc Tuan',
      note: `Scheduled re-delivery for: ${reDeliveryDate} at Store: ${selectedStore}.`,
      carrierStatus: 'Pending',
    }, ...history]);
    setIsReDeliveryModalOpen(false);
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
    setHistory([{
      status: 'Returned to Warehouse',
      time: getCurrentTimestamp(),
      performedBy: 'Nguyen Quoc Tuan',
      note: `Confirmed return to: ${selectedReturnStore}.`,
      carrierStatus: 'Closed',
    }, ...history]);
    setIsReturnModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-[13px]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1b4d3e] text-white hidden md:flex flex-col sticky top-0 h-screen shrink-0 z-[60]">
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
            active={currentView === 'shipment-list' || currentView === 'shipment-detail'} 
            hasSubItems 
            onClick={() => setCurrentView('shipment-list')}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer ${currentView === 'shipment-list' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setCurrentView('shipment-list')}
                >
                  Shipment List
                </div>
                <div 
                  className={`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer ${currentView === 'shipment-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setCurrentView('shipment-detail')}
                >
                  Master Bill
                </div>
             </div>
          </SidebarItem>
          <SidebarItem icon="fa-car-side" label="Fleet" onClick={() => {}} />
          <SidebarItem icon="fa-chart-pie" label="Report" onClick={() => {}} />
          <SidebarItem icon="fa-handshake" label="Partner" onClick={() => {}} />
          <SidebarItem icon="fa-gears" label="Configs" onClick={() => {}} />
          <SidebarItem icon="fa-gear" label="Settings" active={currentView === 'stores-list'} hasSubItems onClick={() => setCurrentView('stores-list')}>
             <div className="ml-8 mt-2 space-y-2">
                <div className="text-xs font-medium text-white/60 hover:text-white px-3 py-2 rounded-l-full cursor-pointer">Stores</div>
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
              <span>{currentView === 'shipment-list' ? 'Shipment List' : 'Shipment Detail'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm shrink-0">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[#4d9e5f]">
                <i className="fa-solid fa-user text-xs"></i>
              </div>
              <span className="hidden lg:inline">Nguyen Quoc Tuan</span>
              <i className="fa-solid fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {currentView === 'shipment-list' ? (
            <div className="space-y-4 animate-in fade-in duration-300">
               {/* Breadcrumb */}
               <nav className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                 <i className="fa-solid fa-house"></i>
                 <span>/</span>
                 <span>Shipments</span>
                 <span>/</span>
                 <span className="text-gray-800 font-medium">Shipment List</span>
               </nav>

               {/* Filters */}
               <div className="bg-white border rounded p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-orange-500 uppercase">Shipment Code</label>
                    <input type="text" placeholder="Enter shipment code" className="w-full px-3 py-1.5 border rounded outline-none focus:ring-1 focus:ring-[#4d9e5f] text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-orange-500 uppercase">Order Code</label>
                    <input type="text" placeholder="Enter order code" className="w-full px-3 py-1.5 border rounded outline-none focus:ring-1 focus:ring-[#4d9e5f] text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-orange-500 uppercase">Customer</label>
                    <select className="w-full px-3 py-1.5 border rounded outline-none focus:ring-1 focus:ring-[#4d9e5f] text-xs bg-white">
                      <option>Input to Search customer</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-orange-500 uppercase">Carrier</label>
                    <select className="w-full px-3 py-1.5 border rounded outline-none focus:ring-1 focus:ring-[#4d9e5f] text-xs bg-white">
                      <option>Select carrier</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-orange-500 uppercase">Shipper</label>
                    <select className="w-full px-3 py-1.5 border rounded outline-none focus:ring-1 focus:ring-[#4d9e5f] text-xs bg-white">
                      <option>Input to Select shipper</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-orange-500 uppercase">Shipment status</label>
                    <select className="w-full px-3 py-1.5 border rounded outline-none focus:ring-1 focus:ring-[#4d9e5f] text-xs bg-white">
                      <option>Select shipment status</option>
                    </select>
                  </div>
                  <div className="lg:col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-orange-500 uppercase">Created at</label>
                    <div className="flex items-center gap-2">
                      <input type="date" defaultValue="2026-01-13" className="w-full px-3 py-1.5 border rounded text-xs outline-none" />
                      <span className="text-gray-400">→</span>
                      <input type="date" defaultValue="2026-01-19" className="w-full px-3 py-1.5 border rounded text-xs outline-none" />
                    </div>
                  </div>
                  <div className="lg:col-span-1 flex items-end gap-2">
                    <button className="px-4 py-1.5 border border-gray-300 rounded text-xs font-bold hover:bg-gray-50 flex items-center gap-2 transition-all">
                      <i className="fa-solid fa-rotate-left"></i> Reset
                    </button>
                    <button className="px-6 py-1.5 bg-[#1b4d3e] text-white rounded text-xs font-bold hover:bg-[#153a2f] flex items-center gap-2 transition-all">
                      <i className="fa-solid fa-magnifying-glass"></i> Search
                    </button>
                  </div>
               </div>

               {/* Table Actions */}
               <div className="flex justify-end gap-2">
                  <button className="px-4 py-1 border rounded text-xs text-gray-400 font-medium bg-white">Assign Shipper</button>
                  <button className="px-4 py-1 border rounded text-xs text-gray-400 font-medium bg-white">Dispatching</button>
                  <button className="px-4 py-1 border rounded text-xs text-gray-400 font-medium bg-white">Print Label</button>
               </div>

               {/* Table Content */}
               <div className="bg-white border rounded shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[12px]">
                      <thead className="bg-[#c2d6ce] text-gray-800 font-bold border-b">
                        <tr>
                          <th className="px-3 py-2 border-r w-10 text-center"><input type="checkbox" className="rounded" /></th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Shipment Code</th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Order Codes</th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Customer</th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Carrier</th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Shipper</th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Status</th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Priority</th>
                          <th className="px-4 py-2 border-r whitespace-nowrap">Created at</th>
                          <th className="px-4 py-2 whitespace-nowrap">Estm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-gray-600">
                        {listShipments.map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-3 border-r text-center"><input type="checkbox" className="rounded" /></td>
                            <td className="px-4 py-3 border-r">
                              <div className="flex items-center gap-2">
                                <span className="text-blue-500 font-medium bg-blue-50 px-3 py-1 rounded border border-blue-100 cursor-pointer hover:bg-blue-100" onClick={() => setCurrentView('shipment-detail')}>{s.code}</span>
                                <i className="fa-regular fa-copy text-orange-400 cursor-pointer"></i>
                              </div>
                            </td>
                            <td className="px-4 py-3 border-r text-gray-800 font-medium">{s.order}</td>
                            <td className="px-4 py-3 border-r truncate max-w-[200px]">{s.customer}</td>
                            <td className="px-4 py-3 border-r">{s.carrier}</td>
                            <td className="px-4 py-3 border-r">{s.shipper || '-'}</td>
                            <td className="px-4 py-3 border-r">
                               <select 
                                 value={s.status} 
                                 onChange={(e) => handleStatusChange(s.id, e.target.value)}
                                 className="px-2 py-1 border rounded bg-white text-[11px] font-medium min-w-[140px] focus:ring-1 focus:ring-[#4d9e5f] outline-none transition-all"
                               >
                                 <option value="Cancelled">Cancelled</option>
                                 <option value="Delivered">Delivered</option>
                                 <option value="Waiting for Pickup">Waiting for Pickup</option>
                                 <option value="Returning Local Hub">Returning Local Hub</option>
                                 <option value="Returned Local Hub">Returned Local Hub</option>
                                 <option value="Returning warehouse">Returning warehouse</option>
                                 <option value="Dispatched">Dispatched</option>
                               </select>
                            </td>
                            <td className="px-4 py-3 border-r text-blue-600 font-medium">{s.priority}</td>
                            <td className="px-4 py-3 border-r font-mono">{s.createdAt}</td>
                            <td className="px-4 py-3 text-gray-400">21/...</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="bg-gray-50 border-t p-3 flex items-center justify-between text-xs text-gray-500">
                    <div>Total: {listShipments.length}</div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border rounded bg-white"><i className="fa-solid fa-chevron-left text-[10px]"></i></button>
                      <button className="px-2.5 py-1 bg-white border border-[#4d9e5f] text-[#4d9e5f] font-bold rounded">1</button>
                      <button className="px-2.5 py-1 bg-white border border-gray-200 rounded">2</button>
                      <span>...</span>
                      <button className="px-2 py-1 border rounded bg-white"><i className="fa-solid fa-chevron-right text-[10px]"></i></button>
                      <select className="border rounded bg-white px-2 py-1 ml-2">
                        <option>20 / page</option>
                      </select>
                    </div>
                  </div>
               </div>
            </div>
          ) : (
            <>
              {/* Shipment Detail View */}
              <nav className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="fa-solid fa-house"></i>
                  <span>/</span>
                  <span className="hover:text-gray-700 cursor-pointer" onClick={() => setCurrentView('shipment-list')}>Shipments</span>
                  <span>/</span>
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

                <section>
                   <h3 className="font-bold text-[#1b4d3e] mb-6 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-4 bg-[#4d9e5f] rounded-full"></span>Shipping Route</h3>
                   <div className="bg-white border rounded p-12 shadow-inner overflow-x-auto">
                      <div className="flex items-center justify-between min-w-[800px] relative">
                         <div className="flex flex-col items-center text-center w-[180px] z-10">
                            <div className="w-14 h-14 bg-[#e8f5e9] text-[#4d9e5f] rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-white ring-1 ring-gray-100">
                               <i className="fa-solid fa-building-circle-arrow-right text-2xl"></i>
                            </div>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sender</span>
                            <p className="text-[11px] font-medium text-gray-800 leading-tight">
                               <span className="bg-gray-200 text-gray-500 px-1 py-0.5 rounded mr-1 text-[9px] font-bold">WH</span>
                               {shipment.senderAddress}
                            </p>
                         </div>
                         {shipment.transitPoints.map((point, idx) => (
                            <React.Fragment key={idx}>
                               <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                                  <div className="w-full h-[1px] bg-gray-100 absolute top-[28px] z-0"></div>
                                  <div className="bg-white px-2 py-1 rounded-full border border-gray-50 shadow-sm z-10 mb-8">
                                     <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap uppercase tracking-tighter">{point.statusLabel || 'In Transit'}</span>
                                  </div>
                               </div>
                               <div className="flex flex-col items-center text-center w-[180px] z-10">
                                  <div className="w-16 h-16 bg-white border border-[#ffccbc] rounded-lg flex items-center justify-center mb-4 shadow-sm relative group overflow-hidden">
                                     <i className="fa-solid fa-cart-shopping text-[#ff7043] text-2xl"></i>
                                     <div className="absolute top-0 right-0 p-0.5 bg-orange-50 rounded-bl-lg"><i className="fa-solid fa-store text-[8px] text-orange-300"></i></div>
                                     <div className="absolute bottom-0 w-full bg-[#fff3e0] py-0.5 border-t border-[#ffe0b2]">
                                        <span className="text-[8px] font-bold text-[#e64a19] uppercase tracking-tighter">{point.name}</span>
                                     </div>
                                  </div>
                                  <p className="text-[11px] font-bold text-gray-900 leading-tight">{point.location}</p>
                                  <div className="mt-2 text-gray-200"><i className="fa-solid fa-chevron-right text-[10px]"></i></div>
                               </div>
                            </React.Fragment>
                         ))}
                         <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                            <div className="w-full h-[1px] bg-gray-100 absolute top-[28px] z-0"></div>
                            <div className="bg-white px-2 py-1 rounded-full border border-gray-50 shadow-sm z-10 mb-8">
                               <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap uppercase tracking-tighter">Delivered</span>
                            </div>
                         </div>
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
          )}
        </main>
      </div>

      {/* GENERALIZED RETURN MODAL: Handles both Local Hub and Warehouse */}
      {isReturningLocalHubModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsReturningLocalHubModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[500px] z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#133e33] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-[15px]">
                <i className="fa-solid fa-warehouse"></i> 
                {pendingStatus === 'Returning Local Hub' ? 'Return Local Hub' : 'Return Warehouse'}
              </h3>
              <button onClick={() => setIsReturningLocalHubModalOpen(false)} className="hover:opacity-70 transition-opacity">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            
            <div className="p-8">
              {/* Warning Alert Box */}
              <div className="mb-8 flex items-start gap-4 p-4 bg-[#fff8f1] rounded-lg border border-[#ffe8d1]">
                <div className="bg-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-bold text-lg">!</span>
                </div>
                <p className="text-[14px] text-[#8c5216] leading-snug">
                  You are changing the status to <b className="text-[#a65d1b]">"{pendingStatus}"</b>. Please select the destination warehouse.
                </p>
              </div>

              {/* Field Label */}
              <label className="block text-[11px] font-bold text-[#7a869a] uppercase tracking-wider mb-2">SELECT WAREHOUSE/STORE</label>
              
              {/* Select Input */}
              <div className="relative">
                <select 
                  value={selectedReturnStore} 
                  onChange={(e) => setSelectedReturnStore(e.target.value)} 
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:ring-2 focus:ring-[#4d9e5f] outline-none bg-white transition cursor-pointer text-[14px] shadow-sm appearance-none"
                >
                  {STORES.map((store) => (<option key={store} value={store}>{store}</option>))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-8 py-5 flex justify-end items-center gap-8 border-t border-gray-100">
              <button 
                onClick={() => setIsReturningLocalHubModalOpen(false)} 
                className="text-[14px] text-[#7a869a] hover:text-gray-800 font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmReturnAction} 
                className="px-8 py-2.5 bg-[#52a468] text-white font-bold rounded-md shadow-md hover:bg-[#468c58] transition-all transform hover:scale-[1.02] active:scale-95 text-[14px]"
              >
                Confirm
              </button>
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
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${active ? 'bg-white/10 text-white border-l-4 border-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      <i className={`fa-solid ${icon} w-5 text-center`}></i>
      <span className="flex-1 text-sm font-medium">{label}</span>
      {hasSubItems && <i className="fa-solid fa-chevron-down text-[10px]"></i>}
    </div>
    {children}
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
