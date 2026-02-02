
import React, { useState } from 'react';
import { MOCK_SHIPMENT, MOCK_HISTORY } from './constants';
import { ShipmentData, HistoryEntry, TransitPoint } from './types';

const STORES_LIST_MOCK = [
  { id: '1', customer: 'Tu Van', name: 'Van Store', phone: '0987267289', email: 'vanlnt@hasaki.vn', street: '568 Lũy Bán Bích', stateProvince: 'Thành phố Hồ Chí Minh', distanceFetched: true, lastDistance: '12.5 km' },
  { id: '2', customer: 'Hasaki', name: 'Hasaki Warehouse', phone: '0281234567', email: 'warehouse@hasaki.vn', street: '71 Hoàng Hoa Thám', stateProvince: 'Thành phố Hồ Chí Minh', distanceFetched: false },
];

const STORES = [
  'Hasaki Warehouse - 71 Hoang Hoa Tham',
  'Store 123 - 568 Luy Ban Bich',
  'Warehouse Q12 - Le Van Khuong',
  'Tan Binh Hub',
  'District 10 Hub'
];

interface Company {
  id: string;
  code: string;
  name: string;
  address: string;
  taxNo: string;
  contactName?: string;
  contractNumber?: string;
  email?: string;
  designation?: string;
  signatureImage?: string;
}

interface Store {
  id: string;
  customer: string;
  name: string;
  phone: string;
  email: string;
  region: string;
  country: string;
  stateProvince: string;
  ward: string;
  street: string;
  streetSecondary: string;
  latitude: string;
  longitude: string;
  postalCode: string;
  radius: string;
  zoneCount: string;
  distanceFetched?: boolean;
  lastDistance?: string;
}

interface StoreHistory {
  id: string;
  date: string;
  user: string;
  field: string;
  oldValue: string;
  newValue: string;
  note: string;
}

const MOCK_STORE_HISTORY: StoreHistory[] = [
  { id: '1', date: '20/01/2026 15:30:12', user: 'Nguyen Quoc Tuan', field: 'Radius', oldValue: '0', newValue: '5', note: 'Update delivery radius for new policy' },
  { id: '2', date: '19/01/2026 09:12:45', user: 'Admin', field: 'Phone', oldValue: '0900000000', newValue: '0987267289', note: 'Corrected contact information' },
  { id: '3', date: '15/01/2026 14:00:00', user: 'System', field: 'Status', oldValue: 'New', newValue: 'Active', note: 'Store verification completed' },
];

const MOCK_COMPANIES: Company[] = [
  { id: '1', code: 'CMP001', name: 'Hasaki Beauty & Spa', address: '71 Hoang Hoa Tham, Ward 13, Tan Binh', taxNo: '0313158132', contactName: 'Mr. John Doe', email: 'admin@hasaki.vn' },
  { id: '2', code: 'CMP002', name: 'OMS Logistics Solutions', address: '456 Le Van Sy, District 3, HCM', taxNo: '0398765432', contactName: 'Ms. Jane Smith', email: 'jane@oms.vn' },
];

interface ShipmentListItem {
  id: string;
  code: string;
  order: string;
  customer: string;
  carrier: string;
  shipper: string;
  status: string;
  priority: string;
  createdAt: string;
  targetStore?: string; 
}

const MOCK_SHIPMENTS_LIST: ShipmentListItem[] = [
  { id: '1', code: 'S260119G19E', order: '2601192TO9', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: '', status: 'Cancelled', priority: 'normal', createdAt: '19/01/2026 13:29:15' },
  { id: '2', code: 'S260119DMX6', order: '260119MOHQ', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: '', status: 'Delivered', priority: 'normal', createdAt: '19/01/2026 11:14:04' },
  { id: '3', code: 'S260119QLN1', order: '2601199TVU', customer: 'OMS - NOW_20250606121235', carrier: 'Yun Express', shipper: '', status: 'Delivered', priority: 'normal', createdAt: '19/01/2026 10:01:09' },
  { id: '4', code: 'S260119P4W0', order: '260119XVHR', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: 'AnhHung Xa Lo', status: 'Returned Local Hub', priority: 'normal', createdAt: '19/01/2026 09:55:03', targetStore: STORES[0] },
  { id: '5', code: 'S260119LNC4', order: '260119KEBK', customer: 'OMS - NOW_20250606121235', carrier: 'Hasaki Express', shipper: '', status: 'Waiting for Pickup', priority: 'normal', createdAt: '19/01/2026 09:23:06' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'shipment-list' | 'shipment-detail' | 'contract-list' | 'company-list' | 'company-detail' | 'store-list' | 'store-detail'>('shipment-list');
  const [activeContractTab, setActiveContractTab] = useState('Remote Area Surcharges');
  const [shipment, setShipment] = useState<ShipmentData>(MOCK_SHIPMENT);
  const [history, setHistory] = useState<HistoryEntry[]>(MOCK_HISTORY);
  const [listShipments, setListShipments] = useState<ShipmentListItem[]>(MOCK_SHIPMENTS_LIST);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [stores, setStores] = useState<Store[]>(STORES_LIST_MOCK as any);
  const [editingCompany, setEditingCompany] = useState<Partial<Company>>({});
  const [isGettingDistance, setIsGettingDistance] = useState(false);
  const [editingStore, setEditingStore] = useState<Partial<Store>>({
    customer: 'Tu Van',
    name: 'Van Store',
    phone: '0987267289',
    email: 'vanlnt@hasaki.vn',
    region: 'Asian',
    country: 'Vietnam',
    stateProvince: 'Thành phố Hồ Chí Minh',
    ward: 'Phường Tân Phú',
    street: '568 Lũy Bán Bích',
    latitude: '0',
    longitude: '0',
    postalCode: '700000',
    radius: '5',
    zoneCount: '1',
    distanceFetched: true,
    lastDistance: '12.5 km'
  });

  // Modal states
  const [isReDeliveryModalOpen, setIsReDeliveryModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isReturningLocalHubModalOpen, setIsReturningLocalHubModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);
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
    if (newStatus === 'Returning Local Hub' || newStatus === 'Returning warehouse' || newStatus === 'Returned Local Hub') {
      const targetShipment = listShipments.find(s => s.id === id);
      setSelectedShipmentId(id);
      setPendingStatus(newStatus);
      
      if (newStatus === 'Returned Local Hub' && targetShipment?.targetStore) {
        setSelectedReturnStore(targetShipment.targetStore);
      } else if (newStatus !== 'Returned Local Hub') {
        setSelectedReturnStore(targetShipment?.targetStore || STORES[0]);
      }
      
      setIsReturningLocalHubModalOpen(true);
    } else {
      setListShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    }
  };

  const confirmReturnAction = () => {
    if (selectedShipmentId && pendingStatus) {
      let finalStatus = pendingStatus;
      if (pendingStatus === 'Returning Local Hub') finalStatus = 'Returned Local Hub';
      if (pendingStatus === 'Returning warehouse') finalStatus = 'Returned Warehouse';
      
      setListShipments(prev => prev.map(s => 
        s.id === selectedShipmentId 
          ? { ...s, status: finalStatus, targetStore: selectedReturnStore } 
          : s
      ));
      
      setIsReturningLocalHubModalOpen(false);
      
      const targetShipmentItem = listShipments.find(s => s.id === selectedShipmentId);
      if (shipment.shipmentCode === targetShipmentItem?.code) {
          const newPoint: TransitPoint = {
              name: pendingStatus.includes('Local Hub') ? 'Local Hub' : 'Target Warehouse',
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
    setIsReDeliveryModalOpen(false);
  };

  const handleSaveCompany = () => {
    if (!editingCompany.code || !editingCompany.name || !editingCompany.address || !editingCompany.taxNo) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingCompany.id) {
      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? (editingCompany as Company) : c));
    } else {
      const newCompany: Company = {
        ...(editingCompany as Company),
        id: Math.random().toString(36).substr(2, 9),
      };
      setCompanies(prev => [...prev, newCompany]);
    }
    setCurrentView('company-list');
  };

  const startEditCompany = (company: Company) => {
    setEditingCompany(company);
    setCurrentView('company-detail');
  };

  const startCreateCompany = () => {
    setEditingCompany({});
    setCurrentView('company-detail');
  };

  const handleUpdateStore = () => {
    if (!editingStore.name || !editingStore.customer || !editingStore.phone) {
        alert("Please fill in the required fields (*)");
        return;
    }
    alert("Store updated successfully!");
    setCurrentView('store-list');
  };

  const handleGetDistance = () => {
    setIsGettingDistance(true);
    setTimeout(() => {
      setEditingStore(prev => ({ ...prev, distanceFetched: true, lastDistance: '15.8 km' }));
      setIsGettingDistance(false);
      alert("Distance information synchronized!");
    }, 1500);
  };

  const startEditStore = (store: Store) => {
    setEditingStore(store);
    setCurrentView('store-detail');
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
          />
          <SidebarItem icon="fa-car-side" label="Fleet" onClick={() => {}} />
          <SidebarItem icon="fa-chart-pie" label="Report" onClick={() => {}} />
          <SidebarItem 
            icon="fa-handshake" 
            label="Partner" 
            active={currentView === 'contract-list' || currentView === 'company-list' || currentView === 'company-detail'} 
            hasSubItems
            onClick={() => {}}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer ${currentView === 'company-list' || currentView === 'company-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setCurrentView('company-list')}
                >
                  Company
                </div>
                <div 
                  className={`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer ${currentView === 'contract-list' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setCurrentView('contract-list')}
                >
                  Contract
                </div>
             </div>
          </SidebarItem>
          <SidebarItem icon="fa-gears" label="Configs" onClick={() => {}} />
          <SidebarItem 
            icon="fa-gear" 
            label="Settings" 
            active={currentView === 'store-list' || currentView === 'store-detail'} 
            hasSubItems 
            onClick={() => {}}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer ${currentView === 'store-list' || currentView === 'store-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}`}
                  onClick={() => setCurrentView('store-list')}
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
              <span>
                {currentView === 'store-list' ? 'Store List' :
                 currentView === 'store-detail' ? 'Store Detail' :
                 currentView === 'company-list' ? 'Company List' : 
                 currentView === 'company-detail' ? 'Company Detail' : 
                 currentView === 'contract-list' ? 'Contract Management' : 
                 currentView === 'shipment-list' ? 'Shipment List' : 'Shipment Detail'}
              </span>
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
          {currentView === 'store-list' ? (
             <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
               <div className="flex items-center justify-between border-b px-4 py-3">
                 <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Store List</h2>
                 <button 
                   onClick={() => { setEditingStore({}); setCurrentView('store-detail'); }}
                   className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2"
                 >
                   <i className="fa-solid fa-plus"></i> Add Store
                 </button>
               </div>
               <div className="p-4">
                 <div className="border border-gray-100 rounded overflow-hidden">
                   <table className="w-full text-left text-xs">
                     <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
                       <tr>
                         <th className="px-4 py-3 border-r">Customer</th>
                         <th className="px-4 py-3 border-r">Store Name</th>
                         <th className="px-4 py-3 border-r">Phone</th>
                         <th className="px-4 py-3 border-r">Address</th>
                         <th className="px-4 py-3 text-center">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y text-gray-600 font-medium">
                       {stores.map(store => (
                         <tr key={store.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="px-4 py-3 border-r">{store.customer}</td>
                           <td className="px-4 py-3 border-r font-bold text-gray-700">{store.name}</td>
                           <td className="px-4 py-3 border-r">{store.phone}</td>
                           <td className="px-4 py-3 border-r truncate max-w-[300px]">{store.street}, {store.stateProvince}</td>
                           <td className="px-4 py-3">
                             <div className="flex items-center justify-center gap-4">
                               <i 
                                 onClick={() => startEditStore(store)}
                                 className="fa-regular fa-pen-to-square text-gray-400 cursor-pointer hover:text-[#4d9e5f] transition-colors"
                               ></i>
                               <i className="fa-solid fa-trash-can text-red-300 cursor-pointer hover:text-red-500 transition-colors"></i>
                             </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
          ) : currentView === 'store-detail' ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Breadcrumb Header */}
                <div className="px-4 py-3 border-b flex items-center justify-between text-gray-400 text-xs">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-house"></i>
                      <span>/</span>
                      <span>Configs</span>
                      <span>/</span>
                      <span className="text-gray-800 font-medium">Stores</span>
                    </div>
                    <i className="fa-solid fa-link text-gray-800"></i>
                </div>

                {/* Form Content */}
                <div className="p-6 relative bg-white">
                    {/* Background Watermark/Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden select-none flex flex-wrap gap-x-60 gap-y-40 p-20">
                      {Array(20).fill(0).map((_, i) => <span key={i} className="text-4xl font-bold -rotate-45 text-black">qc</span>)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
                      <FormSelect
                          label="Customer"
                          required
                          value={editingStore.customer}
                          onChange={val => setEditingStore({...editingStore, customer: val})}
                          options={['Tu Van', 'Hasaki', 'Other']}
                      />
                      <FormInputDetail
                          label="Name"
                          required
                          value={editingStore.name}
                          onChange={val => setEditingStore({...editingStore, name: val})}
                          showClear
                      />
                      <FormInputDetail
                          label="Phone"
                          required
                          value={editingStore.phone}
                          onChange={val => setEditingStore({...editingStore, phone: val})}
                          showClear
                      />
                      <FormInputDetail
                          label="Email"
                          value={editingStore.email}
                          onChange={val => setEditingStore({...editingStore, email: val})}
                          showClear
                      />
                      <FormSelect
                          label="Region"
                          required
                          value={editingStore.region}
                          onChange={val => setEditingStore({...editingStore, region: val})}
                          options={['Asian', 'Europe', 'America']}
                      />
                      <FormSelect
                          label="Country"
                          required
                          value={editingStore.country}
                          onChange={val => setEditingStore({...editingStore, country: val})}
                          options={['Vietnam', 'Thailand', 'China']}
                      />
                      <FormSelect
                          label="State/Province"
                          required
                          value={editingStore.stateProvince}
                          onChange={val => setEditingStore({...editingStore, stateProvince: val})}
                          options={['Thành phố Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng']}
                      />
                      <FormSelect
                          label="Ward"
                          required
                          value={editingStore.ward}
                          onChange={val => setEditingStore({...editingStore, ward: val})}
                          options={['Phường Tân Phú', 'Phường 13', 'Phường Bến Thành']}
                      />
                      <FormInputDetail
                          label="Street"
                          required
                          value={editingStore.street}
                          onChange={val => setEditingStore({...editingStore, street: val})}
                          showClear
                      />
                      <FormInputDetail
                          label="Street Secondary"
                          value={editingStore.streetSecondary}
                          onChange={val => setEditingStore({...editingStore, streetSecondary: val})}
                          placeholder="Enter Street Secondary"
                      />
                      <FormInputDetail
                          label="Latitude"
                          value={editingStore.latitude}
                          onChange={val => setEditingStore({...editingStore, latitude: val})}
                          showClear
                      />
                      <FormInputDetail
                          label="Longitude"
                          value={editingStore.longitude}
                          onChange={val => setEditingStore({...editingStore, longitude: val})}
                          showClear
                      />
                      <FormInputDetail
                          label="Postal Code"
                          required
                          value={editingStore.postalCode}
                          onChange={val => setEditingStore({...editingStore, postalCode: val})}
                          showClear
                      />
                      <FormInputDetail
                          label="Radius (Km)"
                          value={editingStore.radius}
                          onChange={val => setEditingStore({...editingStore, radius: val})}
                          showClear
                      />
                      <FormInputDetail
                          label="Zone Count"
                          value={editingStore.zoneCount}
                          onChange={val => setEditingStore({...editingStore, zoneCount: val})}
                          showClear
                      />
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t pt-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={handleGetDistance}
                          disabled={isGettingDistance}
                          className={`px-6 py-2 rounded font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                            isGettingDistance ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#1b4d3e] text-white hover:bg-[#153a2f]'
                          }`}
                        >
                          {isGettingDistance ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-arrows-spin"></i>}
                          Get Distance
                        </button>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Status:</span>
                          {editingStore.distanceFetched ? (
                            <span className="text-[#4d9e5f] font-bold flex items-center gap-1">
                              <i className="fa-solid fa-circle-check"></i> Fetched ({editingStore.lastDistance})
                            </span>
                          ) : (
                            <span className="text-orange-400 font-bold flex items-center gap-1">
                              <i className="fa-solid fa-circle-exclamation"></i> Not Fetched
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                          onClick={handleUpdateStore}
                          className="bg-[#2d6a4f] text-white px-8 py-2 rounded font-bold text-xs hover:bg-[#1b4332] transition-colors shadow-sm"
                      >
                          Update Store
                      </button>
                    </div>
                </div>
              </div>

              {/* Store History Section */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b flex items-center gap-2">
                  <i className="fa-solid fa-clock-rotate-left text-[#4d9e5f]"></i>
                  <h3 className="font-bold text-[#1b4d3e] text-sm uppercase tracking-wider">History of Changes</h3>
                </div>
                <div className="p-4">
                  <div className="border border-gray-100 rounded overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b">
                        <tr>
                          <th className="px-4 py-3 border-r whitespace-nowrap">Date & Time</th>
                          <th className="px-4 py-3 border-r whitespace-nowrap">Performed By</th>
                          <th className="px-4 py-3 border-r whitespace-nowrap">Field Changed</th>
                          <th className="px-4 py-3 border-r whitespace-nowrap">Old Value</th>
                          <th className="px-4 py-3 border-r whitespace-nowrap">New Value</th>
                          <th className="px-4 py-3">Note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-gray-600 font-medium">
                        {MOCK_STORE_HISTORY.map(entry => (
                          <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3 border-r font-mono whitespace-nowrap">{entry.date}</td>
                            <td className="px-4 py-3 border-r">{entry.user}</td>
                            <td className="px-4 py-3 border-r text-[#4d9e5f]">{entry.field}</td>
                            <td className="px-4 py-3 border-r text-gray-400 line-through">{entry.oldValue}</td>
                            <td className="px-4 py-3 border-r text-gray-800 font-bold">{entry.newValue}</td>
                            <td className="px-4 py-3 italic">{entry.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === 'company-list' ? (
            <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Companies</h2>
                <button 
                  onClick={startCreateCompany}
                  className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Create New
                </button>
              </div>
              <div className="p-4">
                <div className="border border-gray-100 rounded overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 border-r">Company Code</th>
                        <th className="px-4 py-3 border-r">Company Name</th>
                        <th className="px-4 py-3 border-r">Tax No</th>
                        <th className="px-4 py-3 border-r">Email</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-gray-600 font-medium">
                      {companies.map(company => (
                        <tr key={company.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 border-r font-mono text-[#4d9e5f]">{company.code}</td>
                          <td className="px-4 py-3 border-r">{company.name}</td>
                          <td className="px-4 py-3 border-r">{company.taxNo}</td>
                          <td className="px-4 py-3 border-r text-blue-500">{company.email || '-'}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-4">
                              <i 
                                onClick={() => startEditCompany(company)}
                                className="fa-regular fa-pen-to-square text-gray-400 cursor-pointer hover:text-[#4d9e5f] transition-colors"
                              ></i>
                              <i className="fa-solid fa-trash-can text-red-300 cursor-pointer hover:text-red-500 transition-colors"></i>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : currentView === 'company-detail' ? (
            <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => setCurrentView('company-list')} className="text-gray-400 hover:text-gray-600">
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">
                    {editingCompany.id ? 'Update Company' : 'Create New Company'}
                  </h2>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setCurrentView('company-list')} className="px-4 py-1.5 border border-gray-300 rounded text-xs font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
                   <button onClick={handleSaveCompany} className="bg-[#4d9e5f] text-white px-6 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] shadow-sm">Save Company</button>
                </div>
              </div>

              <div className="p-8 space-y-8 max-w-5xl mx-auto w-full">
                {/* General Information Section */}
                <div className="space-y-6">
                  <h3 className="text-[#4d9e5f] font-bold text-xs uppercase flex items-center gap-2 border-b pb-2">
                    <i className="fa-solid fa-building"></i> General Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormInput 
                      label="Company Code" 
                      required 
                      value={editingCompany.code} 
                      onChange={val => setEditingCompany({...editingCompany, code: val})} 
                    />
                    <FormInput 
                      label="Company Name" 
                      required 
                      value={editingCompany.name} 
                      onChange={val => setEditingCompany({...editingCompany, name: val})} 
                    />
                    <FormInput 
                      label="Address" 
                      required 
                      colSpan={2}
                      value={editingCompany.address} 
                      onChange={val => setEditingCompany({...editingCompany, address: val})} 
                    />
                    <FormInput 
                      label="Tax No" 
                      required 
                      value={editingCompany.taxNo} 
                      onChange={val => setEditingCompany({...editingCompany, taxNo: val})} 
                    />
                    <FormInput 
                      label="Email" 
                      value={editingCompany.email} 
                      onChange={val => setEditingCompany({...editingCompany, email: val})} 
                    />
                  </div>
                </div>

                {/* Contact & Contract Section */}
                <div className="space-y-6">
                  <h3 className="text-[#4d9e5f] font-bold text-xs uppercase flex items-center gap-2 border-b pb-2">
                    <i className="fa-solid fa-file-signature"></i> Contact & Contract Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormInput 
                      label="Contract Name" 
                      value={editingCompany.contactName} 
                      onChange={val => setEditingCompany({...editingCompany, contactName: val})} 
                    />
                    <FormInput 
                      label="Contract Number" 
                      value={editingCompany.contractNumber} 
                      onChange={val => setEditingCompany({...editingCompany, contractNumber: val})} 
                    />
                    <FormInput 
                      label="Designation/Title" 
                      value={editingCompany.designation} 
                      onChange={val => setEditingCompany({...editingCompany, designation: val})} 
                    />
                  </div>
                </div>

                {/* Signature Section */}
                <div className="space-y-6">
                  <h3 className="text-[#4d9e5f] font-bold text-xs uppercase flex items-center gap-2 border-b pb-2">
                    <i className="fa-solid fa-signature"></i> Image Signature
                  </h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-300 group-hover:text-[#4d9e5f] transition-colors mb-2"></i>
                    <span className="text-xs font-medium text-gray-500">Click or drag to upload signature image</span>
                    <span className="text-[10px] text-gray-400 mt-1">Supports PNG, JPG (Max 2MB)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : currentView === 'contract-list' ? (
            <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
               {/* View Header Tabs */}
               <div className="flex items-center justify-between border-b px-4 py-2">
                  <div className="flex gap-6">
                    <button onClick={() => setActiveContractTab('List of Charges')} className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeContractTab === 'List of Charges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>List of Charges</button>
                    <button onClick={() => setActiveContractTab('Remote Area Surcharges')} className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeContractTab === 'Remote Area Surcharges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Remote Area Surcharges</button>
                    <button onClick={() => setActiveContractTab('Extra Fees')} className={`text-xs font-bold pb-2 transition-all border-b-2 ${activeContractTab === 'Extra Fees' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>Extra Fees</button>
                  </div>
                  <button className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors shadow-sm">Save All Changes</button>
               </div>

               {/* View Body */}
               <div className="p-4 space-y-6">
                  {/* Section Title */}
                  <h2 className="text-[#4d9e5f] font-bold text-sm">International (VN - US)</h2>

                  {/* Route Bar */}
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

                  {/* Action Button */}
                  <div className="flex justify-end">
                     <button className="border border-[#4d9e5f] text-[#4d9e5f] px-3 py-1.5 rounded flex items-center gap-2 text-[12px] font-bold hover:bg-green-50 transition-colors">
                        <i className="fa-solid fa-plus"></i> Add Remote Area Surcharges
                     </button>
                  </div>

                  {/* Config Box */}
                  <div className="border border-gray-100 rounded-lg shadow-sm overflow-hidden bg-white relative">
                     {/* Watermark/Pattern Overlay simulation */}
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
                           {/* Define Regions */}
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

                           {/* LEADTIME FIELD */}
                           <div className="space-y-2">
                              <label className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1 tracking-tight">
                                 Leadtime (h)
                              </label>
                              <div className="relative">
                                 <input 
                                    type="text" 
                                    defaultValue="2"
                                    className="w-full border border-[#e5e7eb] rounded-[6px] px-3 py-2 text-[12px] text-gray-800 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white transition-all shadow-sm h-10"
                                 />
                              </div>
                           </div>
                        </div>

                        {/* Add Row Button */}
                        <div className="flex justify-end relative z-10">
                           <button className="bg-white border border-gray-300 text-gray-600 px-3 py-1 rounded flex items-center gap-2 text-[11px] font-bold hover:bg-gray-50 transition-all shadow-sm">
                              <i className="fa-solid fa-plus"></i> Add Row
                           </button>
                        </div>

                        {/* Config Table */}
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
                           {/* Scroll Indicator simulation */}
                           <div className="bg-gray-100 h-1.5 w-full mt-auto relative overflow-hidden">
                              <div className="absolute left-0 top-0 h-full w-1/4 bg-gray-300 rounded-full"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ) : currentView === 'shipment-list' ? (
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

              <div className="bg-white border rounded p-6 space-y-8 shadow-sm">
                <div className="flex gap-4 items-center mb-6 border-b pb-4">
                  <button onClick={() => handleAction('Re-delivered')} className="px-6 py-2 bg-[#4d9e5f] text-white font-bold rounded shadow-sm hover:bg-[#3d7d4c] transition-all flex items-center gap-2 text-sm"><i className="fa-solid fa-rotate-right"></i> Re-delivered</button>
                  <button onClick={() => handleAction('Return to warehouse')} className="px-6 py-2 bg-[#f97316] text-white font-bold rounded shadow-sm hover:bg-orange-600 transition-all flex items-center gap-2 text-sm"><i className="fa-solid fa-warehouse"></i> Return to warehouse</button>
                </div>

                <section>
                  <h3 className="font-bold text-[#1b4d3e] mb-4 flex items-center gap-2 text-xs uppercase tracking-wider"><span className="w-1 h-4 bg-[#4d9e5f] rounded-full"></span>Shipment information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 border rounded overflow-hidden">
                    <InfoRow label="Shipment code" value={shipment.shipmentCode} bold />
                    <InfoRow label="Order codes" value={<span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded text-[11px] border border-blue-100">{shipment.orderCodes[0]}</span>} />
                    <InfoRow label="Customer code" value={shipment.customerCode} />
                    <InfoRow label="Amount" value={`${shipment.amount.toFixed(3)} ${shipment.currency}`} bold />
                    <InfoRow label="Weight" value={shipment.weight} />
                    <InfoRow label="Carrier" value={shipment.carrierName} />
                  </div>
                </section>
              </div>
            </>
          )}
        </main>
      </div>

      {/* RE-DELIVERY MODAL */}
      {isReDeliveryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsReDeliveryModalOpen(false)}></div>
          <div className="bg-white rounded shadow-2xl w-full max-w-md z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-[#4d9e5f] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider"><i className="fa-solid fa-calendar-check"></i> Schedule Re-delivery</h3>
              <button onClick={() => setIsReDeliveryModalOpen(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-6 space-y-4">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Select Next Point</label>
              <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="w-full px-3 py-2 border rounded text-sm bg-white">
                {STORES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2 border-t">
              <button onClick={() => setIsReDeliveryModalOpen(false)} className="px-4 py-2 text-sm text-gray-500">Cancel</button>
              <button onClick={handleSaveReDelivery} className="px-6 py-2 bg-[#4d9e5f] text-white font-bold rounded text-sm">Add to Route</button>
            </div>
          </div>
        </div>
      )}

      {/* RETURN MODAL */}
      {isReturningLocalHubModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsReturningLocalHubModalOpen(false)}></div>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[500px] z-10 overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-[#133e33] p-4 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-[15px]">
                <i className="fa-solid fa-warehouse"></i> 
                {pendingStatus === 'Returned Local Hub' ? 'Confirm Return' : (pendingStatus?.includes('Local Hub') ? 'Return Local Hub' : 'Return Warehouse')}
              </h3>
              <button onClick={() => setIsReturningLocalHubModalOpen(false)}><i className="fa-solid fa-xmark text-lg"></i></button>
            </div>
            
            <div className="p-8">
              <div className="mb-8 flex items-start gap-4 p-4 bg-[#fff8f1] rounded-lg border border-[#ffe8d1]">
                <div className="bg-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"><span className="font-bold text-lg">!</span></div>
                <p className="text-[14px] text-[#8c5216] leading-snug">
                  You are changing the status to <b className="text-[#a65d1b]">"{pendingStatus}"</b>. 
                  {pendingStatus === 'Returned Local Hub' ? " Please confirm the arrival at the previously assigned hub." : " Please select the destination warehouse."}
                </p>
              </div>

              <label className="block text-[11px] font-bold text-[#7a869a] uppercase mb-2">SELECT WAREHOUSE/STORE</label>
              
              <div className="relative">
                <select 
                  value={selectedReturnStore} 
                  disabled={pendingStatus === 'Returned Local Hub'}
                  onChange={(e) => setSelectedReturnStore(e.target.value)} 
                  className={`w-full px-4 py-3 border border-[#d1d5db] rounded-lg outline-none bg-white transition text-[14px] shadow-sm appearance-none ${
                    pendingStatus === 'Returned Local Hub' ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'focus:ring-2 focus:ring-[#4d9e5f] cursor-pointer'
                  }`}
                >
                  {STORES.map((store) => (<option key={store} value={store}>{store}</option>))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <i className={`fa-solid ${pendingStatus === 'Returned Local Hub' ? 'fa-lock' : 'fa-chevron-down'} text-xs opacity-40`}></i>
                </div>
              </div>
            </div>

            <div className="bg-white px-8 py-5 flex justify-end gap-8 border-t">
              <button onClick={() => setIsReturningLocalHubModalOpen(false)} className="text-[14px] text-[#7a869a] font-bold">Cancel</button>
              <button onClick={confirmReturnAction} className="px-8 py-2.5 bg-[#52a468] text-white font-bold rounded-md shadow-md">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FormInput: React.FC<{ 
  label: string; 
  required?: boolean; 
  value?: string; 
  onChange: (val: string) => void;
  colSpan?: number;
}> = ({ label, required, value, onChange, colSpan = 1 }) => (
  <div className={`space-y-1.5 ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type="text" 
      value={value || ''} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-[#e5e7eb] rounded-[6px] px-3 py-2 text-[12px] text-gray-800 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white transition-all shadow-sm h-10"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const FormInputDetail: React.FC<{ 
  label: string; 
  required?: boolean; 
  value?: string; 
  onChange: (val: string) => void;
  placeholder?: string;
  showClear?: boolean;
}> = ({ label, required, value, onChange, placeholder, showClear }) => (
  <div className="space-y-1">
    <label className="text-[11px] font-bold text-gray-700 tracking-tight flex items-center gap-1">
      {required && <span className="text-red-500">*</span>} {label}
    </label>
    <div className="relative">
      <input 
        type="text" 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-2 text-[12px] text-gray-600 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white transition-all h-[34px]"
        placeholder={placeholder}
      />
      {showClear && value && (
        <button 
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
            <i className="fa-solid fa-circle-xmark text-[11px]"></i>
        </button>
      )}
    </div>
  </div>
);

const FormSelect: React.FC<{ 
  label: string; 
  required?: boolean; 
  value?: string; 
  onChange: (val: string) => void;
  options: string[];
}> = ({ label, required, value, onChange, options }) => (
  <div className="space-y-1">
    <label className="text-[11px] font-bold text-gray-700 tracking-tight flex items-center gap-1">
      {required && <span className="text-red-500">*</span>} {label}
    </label>
    <div className="relative">
      <select 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-2 text-[12px] text-gray-600 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white appearance-none h-[34px]"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none"></i>
    </div>
  </div>
);

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

const InfoRow: React.FC<{ label: string; value: React.ReactNode; bold?: boolean }> = ({ label, value, bold }) => (
  <div className="flex items-center min-h-[40px] border-b border-r last:border-r-0">
    <div className="w-40 bg-[#f8f9fa] px-4 py-2 h-full flex items-center border-r font-bold text-gray-600 text-[9px] uppercase tracking-wider">{label}</div>
    <div className={`flex-1 px-4 py-2 text-[12px] ${bold ? 'font-bold' : ''}`}>{value}</div>
  </div>
);

export default App;
