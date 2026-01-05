
import React, { useState } from 'react';
import { MOCK_SHIPMENT, MOCK_HISTORY } from './constants';
import { ShipmentData, HistoryEntry } from './types';

const STORES = [
  '568 Lũy Bán Bích',
  '123 Nguyễn Trãi',
  '456 Lê Văn Sỹ',
  '789 Cách Mạng Tháng 8',
  'Kho trung tâm - Quận 12'
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General information');
  const [shipment, setShipment] = useState<ShipmentData>(MOCK_SHIPMENT);
  const [history, setHistory] = useState<HistoryEntry[]>(MOCK_HISTORY);
  
  // Modal states
  const [isReDeliveryModalOpen, setIsReDeliveryModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  
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

  const getCurrentTimestamp = () => {
    return new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/\//g, '/').replace(',', '');
  };

  const handleSaveReDelivery = () => {
    if (!reDeliveryDate) {
      alert('Please select a delivery date and time.');
      return;
    }

    const formattedDate = new Date(reDeliveryDate).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(/\//g, '/').replace(',', '');

    const newHistoryEntry: HistoryEntry = {
      status: 'Re-delivery Scheduled',
      time: getCurrentTimestamp(),
      performedBy: 'Nguyễn Quốc Tuấn',
      note: `Scheduled re-delivery for: ${formattedDate} at Store: ${selectedStore}`,
      carrierStatus: 'Pending',
    };

    setHistory([newHistoryEntry, ...history]);
    setIsReDeliveryModalOpen(false);
    setReDeliveryDate('');
    setSelectedStore(STORES[0]);
  };

  const handleConfirmReturnToWarehouse = () => {
    const newHistoryEntry: HistoryEntry = {
      status: 'Returned to Warehouse',
      time: getCurrentTimestamp(),
      performedBy: 'Nguyễn Quốc Tuấn',
      note: `Confirmed return to warehouse: ${selectedReturnStore} and marked order as closed.`,
      carrierStatus: 'Closed',
    };

    setHistory([newHistoryEntry, ...history]);
    setIsReturnModalOpen(false);
    setSelectedReturnStore(STORES[0]);
  };

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
          <SidebarItem icon="fa-gauge" label="Dashboard" />
          <SidebarItem icon="fa-box" label="Orders" />
          <SidebarItem icon="fa-truck-arrow-right" label="Shipments" active hasSubItems>
             <div className="ml-8 mt-2 space-y-2">
                <div className="text-xs font-medium text-white/90 bg-white/10 px-3 py-2 rounded-l-full">Shipment List</div>
                <div className="text-xs font-medium text-white/60 hover:text-white px-3 py-1 cursor-pointer">Master Bill</div>
             </div>
          </SidebarItem>
          <SidebarItem icon="fa-car-side" label="Fleet" />
          <SidebarItem icon="fa-chart-pie" label="Report" />
          <SidebarItem icon="fa-handshake" label="Partner" />
          <SidebarItem icon="fa-gears" label="Configs" />
          <SidebarItem icon="fa-gear" label="Settings" />
          <SidebarItem icon="fa-user-shield" label="Admin" />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-[#4d9e5f] text-white px-4 h-12 flex items-center justify-between sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4 shrink-0">
            <button className="md:hidden"><i className="fa-solid fa-bars"></i></button>
            <div className="flex items-center gap-2 font-semibold">
              <i className="fa-solid fa-list-ul"></i>
              <span>Shipment List</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-10 relative group hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/70 group-focus-within:text-white transition-colors">
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </div>
            <input
              type="text"
              placeholder="Search all..."
              className="block w-full bg-white/15 border border-white/20 rounded py-1.5 pl-10 pr-3 text-sm placeholder-white/70 focus:outline-none focus:bg-white/25 focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all text-white"
            />
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
          <nav className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <i className="fa-solid fa-house"></i>
              <span className="text-gray-300">/</span>
              <span className="hover:text-gray-700 cursor-pointer">Shipments</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-800 font-medium">Shipment Detail</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <i className="fa-solid fa-link"></i>
            </button>
          </nav>

          <div className="bg-white rounded-t border-t border-x flex p-1 gap-1">
            <TabButton active={activeTab === 'General information'} onClick={() => setActiveTab('General information')} icon="fa-circle-info" label="General information" />
            <TabButton active={activeTab === 'Partner information'} onClick={() => setActiveTab('Partner information')} icon="fa-truck-fast" label="Partner information" />
            <TabButton active={activeTab === 'Items information'} onClick={() => setActiveTab('Items information')} icon="fa-cart-shopping" label="Items information" />
          </div>

          <div className="bg-white border p-4 flex flex-wrap gap-4 items-center justify-between shadow-sm">
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => handleAction('Returning warehouse')}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded shadow-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-arrow-rotate-left"></i>
                Returning warehouse
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Is Return:</span>
                <span className="px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded font-bold uppercase text-[10px]">
                  No
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => handleAction('Re-delivered')}
                className="px-6 py-2 bg-[#4d9e5f] text-white font-bold rounded shadow-sm hover:bg-[#3d7d4c] active:scale-95 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-rotate-right"></i>
                Re-delivered
              </button>
              <button 
                onClick={() => handleAction('Return to warehouse')}
                className="px-6 py-2 bg-orange-500 text-white font-bold rounded shadow-sm hover:bg-orange-600 active:scale-95 transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-warehouse"></i>
                Return to warehouse
              </button>
            </div>
          </div>

          <div className="bg-white border-x border-b rounded-b p-6 space-y-10 shadow-sm">
            <section>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#4d9e5f] rounded-full"></span>
                Shipment information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 border rounded overflow-hidden">
                <InfoRow label="Shipment code" value={shipment.shipmentCode} bold />
                <InfoRow label="Order codes" value={<span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded text-[11px] border border-blue-100">{shipment.orderCodes[0]}</span>} />
                <InfoRow label="Customer code" value={<span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded text-[11px] border border-purple-100 font-mono">{shipment.customerCode}</span>} />
                
                <InfoRow label="Amount" value={<span className="text-blue-600 font-bold">{shipment.amount.toFixed(3)} {shipment.currency}</span>} />
                <InfoRow label="Empty" value="" />
                <InfoRow label="Empty" value="" />

                <InfoRow label="Total dimensions (LxWxH)" value={shipment.dimensions} />
                <InfoRow label="Weight" value={shipment.weight} />
                <InfoRow label="Volume (Inch)" value={shipment.volume} />

                <InfoRow label="Shipping cost" value={<span className="text-[#4d9e5f] font-bold">{shipment.shippingCost.toFixed(3)}</span>} />
                <InfoRow label="Empty" value="" />
                <InfoRow label="Empty" value="" />

                <InfoRow label="Carrier name" value={<span className="text-[#4d9e5f] bg-green-50 px-2 py-0.5 rounded text-[11px] border border-green-100">{shipment.carrierName}</span>} />
                <InfoRow label="Shipper name" value={<span className="text-gray-800 bg-gray-50 px-2 py-0.5 rounded text-[11px] border border-gray-100">{shipment.shipperName}</span>} />
                <InfoRow label="Empty" value="" />

                <InfoRow label="Tracking number" value={<span className="text-[#4d9e5f] bg-green-50 px-2 py-0.5 rounded text-[11px] border border-green-100">{shipment.trackingNumber}</span>} />
                <InfoRow label="Empty" value="" />
                <InfoRow label="Empty" value="" />

                <InfoRow label="Status description" value={shipment.statusDescription} fullWidth />
                <InfoRow label="Note" value={shipment.note} fullWidth />
              </div>
            </section>

            <section>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#4d9e5f] rounded-full"></span>
                Shipment history
              </h3>
              <div className="overflow-x-auto border rounded">
                <table className="w-full text-[13px] text-left">
                  <thead className="bg-[#f8f9fa] border-b text-gray-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="px-4 py-3 border-r">Status</th>
                      <th className="px-4 py-3 border-r">Time</th>
                      <th className="px-4 py-3 border-r">Performed By</th>
                      <th className="px-4 py-3 border-r">Note</th>
                      <th className="px-4 py-3 border-r text-center">Carrier status</th>
                      <th className="px-4 py-3 text-center">POD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-gray-700">
                    {history.map((entry, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-r">
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                            entry.status === 'Returning warehouse' || entry.status === 'Re-delivery Scheduled' || entry.status === 'Returned to Warehouse'
                              ? 'text-blue-600 bg-blue-50 border-blue-100' 
                              : 'text-orange-600 bg-orange-50 border-orange-100'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 border-r text-gray-500">{entry.time}</td>
                        <td className="px-4 py-3 border-r font-medium">{entry.performedBy}</td>
                        <td className="px-4 py-3 border-r text-gray-500 italic text-[12px]">{entry.note}</td>
                        <td className="px-4 py-3 border-r text-center">{entry.carrierStatus || '-'}</td>
                        <td className="px-4 py-3 text-center">
                          {entry.podImageUrl ? (
                            <img src={entry.podImageUrl} alt="POD" className="w-7 h-7 rounded border object-cover inline-block" />
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* MODALS */}
      {isReDeliveryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReDeliveryModalOpen(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-md z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-[#4d9e5f] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2"><i className="fa-solid fa-calendar-check"></i> Schedule Re-delivery</h3>
              <button onClick={() => setIsReDeliveryModalOpen(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Return to Store/Warehouse</label>
                <select
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#4d9e5f] outline-none bg-white transition cursor-pointer"
                >
                  {STORES.map((store) => (
                    <option key={store} value={store}>{store}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-[10px] text-gray-400 italic flex items-center gap-1">
                  <i className="fa-solid fa-location-dot"></i> Default: Nearest location detected
                </p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Re-delivery Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={reDeliveryDate} 
                  onChange={(e) => setReDeliveryDate(e.target.value)} 
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#4d9e5f] outline-none transition" 
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2 border-t">
              <button onClick={() => setIsReDeliveryModalOpen(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium">Cancel</button>
              <button onClick={handleSaveReDelivery} className="px-6 py-2 bg-[#4d9e5f] text-white font-bold rounded shadow-md hover:bg-[#3d7d4c] active:scale-95 transition-all">Save Schedule</button>
            </div>
          </div>
        </div>
      )}

      {isReturnModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReturnModalOpen(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-md z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-orange-500 p-4 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2"><i className="fa-solid fa-triangle-exclamation"></i> Confirm Return</h3>
              <button onClick={() => setIsReturnModalOpen(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                 <i className="fa-solid fa-warehouse text-4xl text-orange-200 mb-4"></i>
                 <p className="font-bold text-lg mb-2 text-gray-800">Return to Warehouse?</p>
                 <p className="text-sm text-gray-500">Please select the return location to close this order.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Return to Store/Warehouse</label>
                  <select
                    value={selectedReturnStore}
                    onChange={(e) => setSelectedReturnStore(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500 outline-none bg-white transition cursor-pointer"
                  >
                    {STORES.map((store) => (
                      <option key={store} value={store}>{store}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-center gap-3 border-t">
              <button onClick={() => setIsReturnModalOpen(false)} className="px-6 py-2 border rounded text-gray-500 w-full hover:bg-white transition font-medium">No, Back</button>
              <button onClick={handleConfirmReturnToWarehouse} className="px-6 py-2 bg-orange-500 text-white font-bold rounded shadow w-full hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2">
                <i className="fa-solid fa-check"></i> Yes, Close Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem: React.FC<{ icon: string; label: string; active?: boolean; hasSubItems?: boolean; children?: React.ReactNode }> = ({ icon, label, active, hasSubItems, children }) => (
  <div className="mb-1">
    <div className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${active ? 'bg-white/10 text-white border-l-4 border-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
      <i className={`fa-solid ${icon} w-5 text-center`}></i>
      <span className="flex-1 text-sm font-medium">{label}</span>
      {hasSubItems && <i className="fa-solid fa-chevron-down text-[10px]"></i>}
    </div>
    {children}
  </div>
);

const TabButton: React.FC<{ active: boolean; label: string; icon: string; onClick: () => void }> = ({ active, label, icon, onClick }) => (
  <button onClick={onClick} className={`px-4 py-2 text-xs font-semibold rounded flex items-center gap-2 transition-all ${active ? 'bg-[#f8f9fa] text-[#4d9e5f] border-b-2 border-[#4d9e5f]' : 'text-gray-400 hover:bg-gray-50'}`}>
    <i className={`fa-solid ${icon}`}></i> {label}
  </button>
);

const InfoRow: React.FC<{ label: string; value: React.ReactNode; bold?: boolean; fullWidth?: boolean }> = ({ label, value, bold, fullWidth }) => {
  if (label === 'Empty') return <div className="bg-white border-b border-r last:border-r-0 min-h-[40px]"></div>;
  return (
    <div className={`flex items-center min-h-[40px] border-b border-r last:border-r-0 ${fullWidth ? 'md:col-span-3' : ''}`}>
      <div className="w-1/3 md:w-40 bg-[#f8f9fa] px-4 py-2 h-full flex items-center border-r font-bold text-gray-600 text-[10px] uppercase tracking-wider shrink-0">
        {label}
      </div>
      <div className={`flex-1 px-4 py-2 text-[13px] ${bold ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
        {value}
      </div>
    </div>
  );
};

export default App;
