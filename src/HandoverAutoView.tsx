import React, { useState } from 'react';
import { HandoverManifest, HandoverSubOrder } from '../types';
import { MOCK_HANDOVER_MANIFESTS, MOCK_PENDING_HANDOVER_ORDERS } from '../constants';
import { HandoverPrintModal } from './HandoverPrintModal';

interface HandoverAutoViewProps {
  onRowClick: (manifest: HandoverManifest) => void;
  manifests: HandoverManifest[];
  pendingOrders: HandoverSubOrder[];
  onUpdateManifests: (manifests: HandoverManifest[]) => void;
  onUpdatePendingOrders: (orders: HandoverSubOrder[]) => void;
  onSeal?: (manifestId: string) => void;
  onDispatch?: (manifestId: string, dispatchData: { carrier?: string; driverName: string; driverPhone: string; plateNumber: string; reference: string }) => void;
}

export function HandoverAutoView({
  onRowClick,
  manifests,
  pendingOrders,
  onUpdateManifests,
  onUpdatePendingOrders,
  onSeal,
  onDispatch
}: HandoverAutoViewProps) {
  // Filters
  const [searchCode, setSearchCode] = useState('');
  const [carrierFilter, setCarrierFilter] = useState('');
  const [pickupAddressFilter, setPickupAddressFilter] = useState('');
  const [deliveryAddressFilter, setDeliveryAddressFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [createdDateFilter, setCreatedDateFilter] = useState('');

  // Selected for multi-action
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Print Modal
  const [printManifest, setPrintManifest] = useState<HandoverManifest | null>(null);

  // Dispatch Modal State (Directly accessible from outside list)
  const [dispatchingManifest, setDispatchingManifest] = useState<HandoverManifest | null>(null);
  const [dispatchForm, setDispatchForm] = useState({
    carrier: 'SPX Express',
    driverName: 'Nguyen Van Hai',
    driverPhone: '0908 123 456',
    plateNumber: '59C-912.84',
    reference: ''
  });

  const [simulationAlert, setSimulationAlert] = useState<string | null>(null);

  // Dynamic unique options for dropdowns
  const pickupOptions = Array.from(new Set(manifests.map(m => m.originHub).concat([
    'Hasaki Central Hub - District 10',
    'Hasaki Warehouse North'
  ]))).filter(Boolean);

  const deliveryOptions = Array.from(new Set(manifests.map(m => m.destinationHub).concat([
    'SPX Express Hub Cu Chi',
    'Viettel Post Hub Song Than',
    'GHN Hub Tan Binh',
    'GHTK Hub Binh Chanh'
  ]))).filter(Boolean);

  // Filtered List
  const filteredManifests = manifests.filter(m => {
    if (searchCode && !m.manifestCode.toLowerCase().includes(searchCode.toLowerCase()) && !m.originHub.toLowerCase().includes(searchCode.toLowerCase()) && !m.destinationHub.toLowerCase().includes(searchCode.toLowerCase())) {
      return false;
    }
    if (carrierFilter === 'UNASSIGNED') {
      if (m.status === 'Dispatched' && m.carrier) return false;
    } else if (carrierFilter) {
      if (m.status !== 'Dispatched' || m.carrier !== carrierFilter) return false;
    }
    if (pickupAddressFilter && m.originHub !== pickupAddressFilter && !m.originAddress.toLowerCase().includes(pickupAddressFilter.toLowerCase())) {
      return false;
    }
    if (deliveryAddressFilter && m.destinationHub !== deliveryAddressFilter && !m.destinationAddress.toLowerCase().includes(deliveryAddressFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter && m.status !== statusFilter) return false;
    if (createdDateFilter) {
      // createdDateFilter is in YYYY-MM-DD
      const [year, month, day] = createdDateFilter.split('-');
      const dmy = `${day}/${month}/${year}`;
      const mdy = `${month}/${day}/${year}`;
      const ymd = `${year}-${month}-${day}`;
      if (!m.createdAt.includes(dmy) && !m.createdAt.includes(mdy) && !m.createdAt.includes(ymd)) {
        return false;
      }
    }
    return true;
  });

  // Core business logic: Ingest an order
  const processIncomingOrder = (newOrder: HandoverSubOrder) => {
    // 1. Check if an OPEN manifest already exists for the matching pickup & delivery points (route)
    const existingOpenIndex = manifests.findIndex(
      m => m.status === 'Open' &&
           m.originHub.toLowerCase() === newOrder.originStore.toLowerCase() &&
           m.destinationHub.toLowerCase() === newOrder.destinationHub.toLowerCase()
    );

    if (existingOpenIndex !== -1) {
      // Group order into existing open manifest
      const targetManifest = manifests[existingOpenIndex];
      const updatedOrders = [...targetManifest.orders, { ...newOrder, status: 'In Manifest' as const }];
      const updatedManifest: HandoverManifest = {
        ...targetManifest,
        orders: updatedOrders,
        totalOrders: updatedOrders.length,
        totalWeight: parseFloat((targetManifest.totalWeight + newOrder.weight).toFixed(2)),
        totalCod: targetManifest.totalCod + newOrder.codAmount
      };

      const nextManifests = [...manifests];
      nextManifests[existingOpenIndex] = updatedManifest;
      onUpdateManifests(nextManifests);

      // Remove from pending if present
      onUpdatePendingOrders(pendingOrders.filter(p => p.id !== newOrder.id));

      setSimulationAlert(`Order ${newOrder.orderCode} successfully auto-grouped into existing Open Manifest: ${targetManifest.manifestCode}`);
    } else {
      // AUTO CREATE BRAND NEW MANIFEST on first incoming order! (Carrier is unassigned until dispatch)
      const newManifestId = `man-${Date.now()}`;
      const codeSeq = (manifests.length + 1).toString().padStart(3, '0');
      const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const newManifestCode = `HO-${todayStr}-${codeSeq}`;

      const brandNewManifest: HandoverManifest = {
        id: newManifestId,
        manifestCode: newManifestCode,
        carrier: '', // Not dispatched yet! Carrier is empty
        originHub: newOrder.originStore,
        originAddress: newOrder.originAddress,
        destinationHub: newOrder.destinationHub,
        destinationAddress: newOrder.destinationAddress,
        status: 'Open',
        cutoffTime: '18:00',
        createdAt: new Date().toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        totalOrders: 1,
        totalWeight: newOrder.weight,
        totalCod: newOrder.codAmount,
        notes: `Auto-generated upon first order arrival (${newOrder.orderCode}). Open for incoming orders. Carrier unassigned until dispatch.`,
        orders: [{ ...newOrder, status: 'In Manifest' as const }]
      };

      onUpdateManifests([brandNewManifest, ...manifests]);
      onUpdatePendingOrders(pendingOrders.filter(p => p.id !== newOrder.id));

      setSimulationAlert(`First order ${newOrder.orderCode} arrived! Auto-created brand-new Handover Manifest: ${newManifestCode}`);
    }

    setTimeout(() => {
      setSimulationAlert(null);
    }, 6000);
  };

  // Top header action handlers
  const handleTopSeal = () => {
    if (selectedIds.length > 0) {
      const openSelected = manifests.filter(m => selectedIds.includes(m.id) && m.status === 'Open');
      if (openSelected.length === 0) {
        alert('None of the selected manifests are Open. Please select an Open manifest to seal.');
        return;
      }
      if (window.confirm(`Seal ${openSelected.length} selected open manifest(s)? This will lock the manifest(s) and auto-generate new open manifest(s).`)) {
        openSelected.forEach(m => handleSealManifest(m.id));
        setSelectedIds([]);
      }
      return;
    }

    const openManifests = manifests.filter(m => m.status === 'Open');
    if (openManifests.length === 0) {
      alert('There are no open manifests currently available to seal.');
      return;
    }
    handleSealManifest(openManifests[0].id);
  };

  const handleTopDispatch = () => {
    if (selectedIds.length > 0) {
      const candidate = manifests.find(m => selectedIds.includes(m.id) && m.status !== 'Dispatched');
      if (!candidate) {
        alert('All selected manifests are already dispatched. Please select an open or sealed manifest.');
        return;
      }
      handleOpenDispatchModal(candidate);
      return;
    }

    const candidate = manifests.find(m => m.status === 'Sealed') || manifests.find(m => m.status === 'Open');
    if (candidate) {
      handleOpenDispatchModal(candidate);
      return;
    }
    alert('There are no open or sealed manifests available to dispatch.');
  };

  // Seal manifest action: Locks manifest and AUTO CREATES NEW OPEN MANIFEST for the same route!
  const handleSealManifest = (manifestId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const target = manifests.find(m => m.id === manifestId);
    if (!target) return;

    if (!window.confirm(`Seal and lock manifest ${target.manifestCode}? This will freeze the manifest and auto-generate a new open manifest for subsequent orders.`)) {
      return;
    }

    if (onSeal) {
      onSeal(manifestId);
    } else {
      const now = new Date().toLocaleString();
      const sealedManifest: HandoverManifest = {
        ...target,
        status: 'Sealed',
        sealedAt: now,
        notes: target.notes ? `${target.notes} | Sealed at ${now}.` : `Sealed at ${now}.`
      };

      // 2. AUTO GENERATE A NEW OPEN MANIFEST FOR THE SAME ROUTE! (Carrier is empty)
      const newManifestId = `man-${Date.now()}`;
      const codeSeq = (manifests.length + 1).toString().padStart(3, '0');
      const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const newManifestCode = `HO-${todayStr}-${codeSeq}`;

      const newOpenManifest: HandoverManifest = {
        id: newManifestId,
        manifestCode: newManifestCode,
        carrier: '', // Unassigned until dispatched
        originHub: target.originHub,
        originAddress: target.originAddress,
        destinationHub: target.destinationHub,
        destinationAddress: target.destinationAddress,
        status: 'Open',
        cutoffTime: target.cutoffTime || '18:00',
        createdAt: now,
        totalOrders: 0,
        totalWeight: 0,
        totalCod: 0,
        notes: `Auto-generated follow-up manifest after sealing ${target.manifestCode}. Ready for subsequent orders.`,
        orders: []
      };

      const nextManifests = manifests.map(m => m.id === manifestId ? sealedManifest : m);
      onUpdateManifests([newOpenManifest, ...nextManifests]);
    }

    setSimulationAlert(`Manifest ${target.manifestCode} sealed! Automatically generated new open manifest for route [${target.originHub} -> ${target.destinationHub}].`);
    setTimeout(() => setSimulationAlert(null), 7000);
  };

  // Open Dispatch Modal from list
  const handleOpenDispatchModal = (m: HandoverManifest, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Non-dispatched manifests don't have a carrier yet. Suggest a default carrier from sub-orders or SPX Express.
    const defaultCarrier = (m.status === 'Dispatched' && m.carrier) ? m.carrier : (m.orders[0]?.carrierCode || 'SPX Express');
    setDispatchForm({
      carrier: defaultCarrier,
      driverName: 'Nguyen Van Hai',
      driverPhone: '0908 123 456',
      plateNumber: '59C-912.84',
      reference: `DISP-${defaultCarrier.replace(/\s+/g, '').toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`
    });
    setDispatchingManifest(m);
  };

  // Confirm Dispatch
  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchingManifest) return;
    if (!dispatchForm.carrier) {
      alert("Please select a carrier partner");
      return;
    }
    if (!dispatchForm.driverName.trim()) {
      alert("Please enter driver name");
      return;
    }

    if (onDispatch) {
      onDispatch(dispatchingManifest.id, dispatchForm);
    } else {
      const now = new Date().toLocaleString();
      const wasOpen = dispatchingManifest.status === 'Open';
      const updated = manifests.map(m => m.id === dispatchingManifest.id ? {
        ...m,
        carrier: dispatchForm.carrier,
        status: 'Dispatched' as const,
        dispatchedAt: now,
        carrierDriverName: dispatchForm.driverName,
        carrierDriverPhone: dispatchForm.driverPhone,
        carrierPlateNumber: dispatchForm.plateNumber,
        dispatchReference: dispatchForm.reference,
        orders: m.orders.map(o => ({ ...o, status: 'Dispatched' as const }))
      } : m);

      // If dispatched directly from Open status, auto-generate follow-up open manifest for subsequent orders
      if (wasOpen) {
        const newManifestId = `man-${Date.now()}`;
        const codeSeq = (manifests.length + 1).toString().padStart(3, '0');
        const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const newManifestCode = `HO-${todayStr}-${codeSeq}`;

        const newOpenManifest: HandoverManifest = {
          id: newManifestId,
          manifestCode: newManifestCode,
          carrier: '', // Unassigned until dispatched
          originHub: dispatchingManifest.originHub,
          originAddress: dispatchingManifest.originAddress,
          destinationHub: dispatchingManifest.destinationHub,
          destinationAddress: dispatchingManifest.destinationAddress,
          status: 'Open',
          cutoffTime: dispatchingManifest.cutoffTime || '18:00',
          createdAt: now,
          totalOrders: 0,
          totalWeight: 0,
          totalCod: 0,
          notes: `Auto-generated follow-up manifest after dispatching ${dispatchingManifest.manifestCode}. Ready for subsequent orders.`,
          orders: []
        };
        onUpdateManifests([newOpenManifest, ...updated]);
      } else {
        onUpdateManifests(updated);
      }
    }

    setSimulationAlert(`Manifest ${dispatchingManifest.manifestCode} successfully dispatched to carrier ${dispatchForm.carrier}!`);
    setDispatchingManifest(null);
    setTimeout(() => setSimulationAlert(null), 6000);
  };

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b px-4 py-3 bg-white">
        <div className="flex items-center gap-4">
          <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-layer-group text-[#4d9e5f]"></i>
            Handover Manifest List
          </h2>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 animate-in slide-in-from-left duration-200">
              <span className="text-[11px] font-bold text-gray-400 uppercase">{selectedIds.length} selected</span>
              {manifests.some(m => selectedIds.includes(m.id) && m.status === 'Open') && (
                <button
                  onClick={() => {
                    const openSelected = manifests.filter(m => selectedIds.includes(m.id) && m.status === 'Open');
                    if (window.confirm(`Seal ${openSelected.length} selected open manifest(s)?`)) {
                      openSelected.forEach(m => handleSealManifest(m.id));
                      setSelectedIds([]);
                    }
                  }}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                >
                  <i className="fa-solid fa-lock text-[10px]"></i> Seal Selected
                </button>
              )}
              {manifests.some(m => selectedIds.includes(m.id) && m.status !== 'Dispatched') && (
                <button
                  onClick={() => {
                    const candidate = manifests.find(m => selectedIds.includes(m.id) && m.status !== 'Dispatched');
                    if (candidate) {
                      handleOpenDispatchModal(candidate);
                    }
                  }}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                >
                  <i className="fa-solid fa-truck-fast text-[10px]"></i> Dispatch Selected
                </button>
              )}
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Top Right Header Commands: Seal and Dispatch to Carrier */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleTopSeal}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
            title="Seal Manifest (Lock & auto-generate new open manifest)"
          >
            <i className="fa-solid fa-lock text-[11px]"></i>
            Seal
          </button>
          <button
            onClick={handleTopDispatch}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
            title="Dispatch to Carrier partner"
          >
            <i className="fa-solid fa-truck-fast text-[11px]"></i>
            Dispatch to Carrier
          </button>
        </div>
      </div>

      {/* Floating Simulation Alert Toast */}
      {simulationAlert && (
        <div className="mx-4 mt-3 p-3.5 rounded-lg bg-gradient-to-r from-emerald-600 to-[#1b4d3e] text-white shadow-md flex items-center justify-between animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <i className="fa-solid fa-circle-check text-white"></i>
            <span>{simulationAlert}</span>
          </div>
          <button
            onClick={() => setSimulationAlert(null)}
            className="text-white/70 hover:text-white text-xs px-2"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Filter Section */}
      <div className="p-4 bg-gray-50/70 border-b space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Search Manifest / Route</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchCode}
                  onChange={e => setSearchCode(e.target.value)}
                  placeholder="Manifest code, store, hub..."
                  className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
                />
                <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-gray-400 text-xs"></i>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Carrier Partner</label>
              <select
                value={carrierFilter}
                onChange={e => setCarrierFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
              >
                <option value="">All Carriers</option>
                <option value="UNASSIGNED">Unassigned (Not yet dispatched)</option>
                <option value="SPX Express">SPX Express</option>
                <option value="GHTK">GHTK</option>
                <option value="GHN">GHN</option>
                <option value="Viettel Post">Viettel Post</option>
                <option value="FedEx">FedEx</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pickup Address</label>
              <select
                value={pickupAddressFilter}
                onChange={e => setPickupAddressFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
              >
                <option value="">All Pickup Addresses</option>
                {pickupOptions.map(hub => (
                  <option key={hub} value={hub}>{hub}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Delivery Address</label>
              <select
                value={deliveryAddressFilter}
                onChange={e => setDeliveryAddressFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
              >
                <option value="">All Delivery Addresses</option>
                {deliveryOptions.map(hub => (
                  <option key={hub} value={hub}>{hub}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Manifest Status</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
              >
                <option value="">All Statuses</option>
                <option value="Open">Open (Accepting Orders)</option>
                <option value="Sealed">Sealed (Locked)</option>
                <option value="Dispatched">Dispatched</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Created Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={createdDateFilter}
                  onChange={e => setCreatedDateFilter(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => {
                  setSearchCode('');
                  setCarrierFilter('');
                  setPickupAddressFilter('');
                  setDeliveryAddressFilter('');
                  setStatusFilter('');
                  setCreatedDateFilter('');
                }}
                className="px-3.5 py-1.5 border border-gray-300 bg-white rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 transition-colors"
                title="Reset Filters"
              >
                <i className="fa-solid fa-rotate-left"></i> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Manifest Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3.5 border-r border-gray-200 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredManifests.length && filteredManifests.length > 0}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedIds(filteredManifests.map(m => m.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f]"
                  />
                </th>
                <th className="px-4 py-3.5 border-r border-gray-200">Manifest Code</th>
                <th className="px-4 py-3.5 border-r border-gray-200">Carrier</th>
                <th className="px-4 py-3.5 border-r border-gray-200">Pickup Address</th>
                <th className="px-4 py-3.5 border-r border-gray-200">Delivery Address</th>
                <th className="px-4 py-3.5 border-r border-gray-200 text-center">Sub-Orders</th>
                <th className="px-4 py-3.5 border-r border-gray-200 text-center">Gross Wt (kg)</th>
                <th className="px-4 py-3.5 border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3.5 border-r border-gray-200">Created At</th>
                <th className="px-4 py-3.5 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredManifests.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center text-gray-400">
                    <div className="space-y-2">
                      <i className="fa-solid fa-folder-open text-4xl text-gray-300"></i>
                      <p className="text-sm font-semibold">No handover manifests found.</p>
                      <p className="text-xs text-gray-400">Waiting for inbound orders to auto-generate handover manifests.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredManifests.map(m => (
                  <tr
                    key={m.id}
                    onClick={() => onRowClick(m)}
                    className={`hover:bg-green-50/40 transition-colors cursor-pointer ${
                      selectedIds.includes(m.id) ? 'bg-green-50/60' : ''
                    }`}
                  >
                    <td className="px-4 py-3 border-r border-gray-100 text-center" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(m.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, m.id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== m.id));
                          }
                        }}
                        className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f]"
                      />
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 font-mono font-bold text-[#1b4d3e]">
                      <div className="flex items-center gap-2">
                        <span>{m.manifestCode}</span>
                        {m.status === 'Open' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active & Ingesting"></span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 font-semibold text-gray-900">
                      {m.status === 'Dispatched' && m.carrier ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1.5">
                          <i className="fa-solid fa-truck text-[10px]"></i>
                          {m.carrier}
                        </span>
                      ) : (
                        <span className="text-gray-400 font-normal italic text-[11px]" title="Carrier will be assigned upon dispatch">
                          -
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 max-w-[180px] truncate" title={m.originHub}>
                      {m.originHub}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 max-w-[200px] truncate" title={m.destinationHub}>
                      {m.destinationHub}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 text-center font-bold text-gray-900">
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-[11px]">
                        {m.totalOrders}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 text-center font-mono">
                      {m.totalWeight.toFixed(1)}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        m.status === 'Open' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        m.status === 'Sealed' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        m.status === 'Dispatched' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 text-gray-500 text-[11px] whitespace-nowrap">
                      {m.createdAt}
                    </td>
                    <td className="px-4 py-2.5 text-center" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Print Button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setPrintManifest(m);
                          }}
                          className="w-7 h-7 rounded-lg text-gray-500 hover:text-[#1b4d3e] hover:bg-[#eaf4ee] transition-colors flex items-center justify-center shrink-0"
                          title="Print Handover Manifest"
                        >
                          <i className="fa-solid fa-print text-xs"></i>
                        </button>

                        {/* Detail Chevron */}
                        <button
                          onClick={() => onRowClick(m)}
                          className="w-7 h-7 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex items-center justify-center shrink-0"
                          title="View Detail"
                        >
                          <i className="fa-solid fa-chevron-right text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      {/* Dispatch to Carrier Modal (Directly on List View) */}
      {dispatchingManifest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1b4d3e] flex items-center gap-2">
                  <i className="fa-solid fa-truck-fast text-blue-600"></i>
                  Dispatch Manifest to Carrier
                </h3>
                <p className="text-xs text-gray-500">
                  Manifest: <span className="font-mono font-bold text-gray-800">{dispatchingManifest.manifestCode}</span>
                </p>
              </div>
              <button
                onClick={() => setDispatchingManifest(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <i className="fa-solid fa-xmark text-base"></i>
              </button>
            </div>

            <form onSubmit={handleConfirmDispatch} className="p-6 space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg border text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Origin (Pickup Hub):</span>
                  <span className="font-bold text-gray-800">{dispatchingManifest.originHub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Destination (Drop-off):</span>
                  <span className="font-bold text-gray-800">{dispatchingManifest.destinationHub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Packages:</span>
                  <span className="font-bold text-gray-800">{dispatchingManifest.totalOrders} packages ({dispatchingManifest.totalWeight.toFixed(2)} kg)</span>
                </div>
              </div>

              {/* Carrier Selection */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-700 uppercase">Carrier Partner *</label>
                <select
                  required
                  value={dispatchForm.carrier}
                  onChange={e => {
                    const c = e.target.value;
                    setDispatchForm({
                      ...dispatchForm,
                      carrier: c,
                      reference: `DISP-${c.replace(/\s+/g, '').toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none bg-white font-medium focus:ring-1 focus:ring-blue-500"
                >
                  <option value="SPX Express">SPX Express</option>
                  <option value="GHTK">GHTK</option>
                  <option value="GHN">GHN</option>
                  <option value="Viettel Post">Viettel Post</option>
                  <option value="FedEx">FedEx</option>
                </select>
                <p className="text-[10px] text-gray-400 italic">Select carrier partner for actual vehicle dispatching</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Driver Name *</label>
                  <input
                    type="text"
                    required
                    value={dispatchForm.driverName}
                    onChange={e => setDispatchForm({...dispatchForm, driverName: e.target.value})}
                    placeholder="e.g. Nguyen Van Hai"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Driver Phone</label>
                  <input
                    type="text"
                    value={dispatchForm.driverPhone}
                    onChange={e => setDispatchForm({...dispatchForm, driverPhone: e.target.value})}
                    placeholder="e.g. 0908 123 456"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Vehicle Plate #</label>
                  <input
                    type="text"
                    value={dispatchForm.plateNumber}
                    onChange={e => setDispatchForm({...dispatchForm, plateNumber: e.target.value})}
                    placeholder="e.g. 59C-912.84"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-700 uppercase">Dispatch Reference</label>
                  <input
                    type="text"
                    value={dispatchForm.reference}
                    onChange={e => setDispatchForm({...dispatchForm, reference: e.target.value})}
                    placeholder="e.g. DISP-SPX-001"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setDispatchingManifest(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <i className="fa-solid fa-check"></i> Complete Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Master Handover Manifest */}
      <HandoverPrintModal
        isOpen={!!printManifest}
        manifest={printManifest}
        onClose={() => setPrintManifest(null)}
      />

    </div>
  );
}
