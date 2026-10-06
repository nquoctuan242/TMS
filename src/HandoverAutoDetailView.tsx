import React, { useState } from 'react';
import { HandoverManifest, HandoverSubOrder } from '../types';

interface HandoverAutoDetailViewProps {
  manifest: HandoverManifest;
  pendingOrders: HandoverSubOrder[];
  onBack: () => void;
  onSeal: (manifestId: string) => void;
  onDispatch: (manifestId: string, dispatchData: { carrier?: string; driverName: string; driverPhone: string; plateNumber: string; reference: string }) => void;
  onAddOrders: (manifestId: string, orderIds: string[]) => void;
  onRemoveOrder: (manifestId: string, orderId: string) => void;
  onPrint: (manifest: HandoverManifest) => void;
}

export const HandoverAutoDetailView: React.FC<HandoverAutoDetailViewProps> = ({
  manifest,
  pendingOrders,
  onBack,
  onSeal,
  onDispatch,
  onAddOrders,
  onRemoveOrder,
  onPrint,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPendingIds, setSelectedPendingIds] = useState<string[]>([]);
  const [quickInputCode, setQuickInputCode] = useState('');
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchForm, setDispatchForm] = useState({
    carrier: manifest.carrier || manifest.orders[0]?.carrierCode || 'SPX Express',
    driverName: 'Nguyen Van Hai',
    driverPhone: '0908 123 456',
    plateNumber: '59C-912.84',
    reference: `DISP-${(manifest.carrier || manifest.orders[0]?.carrierCode || 'SPX').replace(/\s+/g, '').toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`
  });

  const [confirmSealModal, setConfirmSealModal] = useState(false);

  // Filter child orders inside manifest
  const filteredOrders = manifest.orders.filter(ord => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      ord.orderCode.toLowerCase().includes(term) ||
      ord.trackingNumber.toLowerCase().includes(term) ||
      ord.receiverName.toLowerCase().includes(term) ||
      ord.receiverPhone.toLowerCase().includes(term) ||
      ord.receiverAddress.toLowerCase().includes(term)
    );
  });

  // Filter pending orders matching this route
  const availablePendingOrders = pendingOrders.filter(
    po => po.originStore === manifest.originHub && po.destinationHub === manifest.destinationHub
  );

  const handleConfirmAddOrders = () => {
    if (selectedPendingIds.length === 0) return;
    onAddOrders(manifest.id, selectedPendingIds);
    setSelectedPendingIds([]);
    setIsAddModalOpen(false);
  };

  const handleQuickAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInputCode.trim()) return;
    const found = pendingOrders.find(
      p => p.orderCode.toLowerCase() === quickInputCode.trim().toLowerCase() ||
           p.trackingNumber.toLowerCase() === quickInputCode.trim().toLowerCase()
    );
    if (found) {
      onAddOrders(manifest.id, [found.id]);
      setQuickInputCode('');
      setIsAddModalOpen(false);
    } else {
      alert(`No pending order found matching code "${quickInputCode}". Please verify code or ensure order belongs to this route.`);
    }
  };

  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchForm.driverName.trim()) {
      alert("Please enter driver name");
      return;
    }
    onDispatch(manifest.id, dispatchForm);
    setIsDispatchModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <i className="fa-solid fa-house"></i>
          <span>/</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={onBack}>Shipments</span>
          <span>/</span>
          <span className="hover:text-gray-700 cursor-pointer" onClick={onBack}>Handover Auto</span>
          <span>/</span>
          <span className="text-[#1b4d3e] font-bold font-mono">{manifest.manifestCode}</span>
        </div>

        <button
          onClick={onBack}
          className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Handover List
        </button>
      </nav>

      {/* Main Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaf4ee] text-[#1b4d3e] flex items-center justify-center font-bold text-lg shadow-inner">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-black text-[#1b4d3e] tracking-tight font-mono">
                  {manifest.manifestCode}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  manifest.status === 'Open' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 ring-2 ring-emerald-50' :
                  manifest.status === 'Sealed' ? 'bg-amber-50 text-amber-700 border border-amber-200 ring-2 ring-amber-50' :
                  manifest.status === 'Dispatched' ? 'bg-blue-50 text-blue-700 border border-blue-200 ring-2 ring-blue-50' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  <i className={`fa-solid mr-1.5 ${
                    manifest.status === 'Open' ? 'fa-unlock' :
                    manifest.status === 'Sealed' ? 'fa-lock' :
                    manifest.status === 'Dispatched' ? 'fa-truck-fast' : 'fa-circle'
                  }`}></i>
                  {manifest.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* When Open: Allow adding orders, sealing, or dispatching */}
            {manifest.status === 'Open' && (
              <>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <i className="fa-solid fa-plus text-[#4d9e5f]"></i> Add Sub-Orders ({availablePendingOrders.length} pending)
                </button>
                <button
                  onClick={() => setConfirmSealModal(true)}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <i className="fa-solid fa-lock"></i> Seal Manifest (Lock)
                </button>
                <button
                  onClick={() => setIsDispatchModalOpen(true)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <i className="fa-solid fa-truck-fast"></i> Dispatch to Carrier
                </button>
              </>
            )}

            {/* When Sealed: Allow dispatching to carrier */}
            {manifest.status === 'Sealed' && (
              <button
                onClick={() => setIsDispatchModalOpen(true)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <i className="fa-solid fa-truck-fast"></i> Dispatch to Carrier
              </button>
            )}

            {/* Print Master Manifest */}
            <button
              onClick={() => onPrint(manifest)}
              className="px-5 py-2 bg-[#1b4d3e] hover:bg-[#14392e] text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <i className="fa-solid fa-print"></i> Print Handover Manifest
            </button>
          </div>
        </div>

        {manifest.status === 'Sealed' && (
          <div className="px-6 py-2.5 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-amber-600"></i>
              <span>
                <strong>Manifest Locked:</strong> This handover manifest has been sealed at <strong>{manifest.sealedAt}</strong>. Content is immutable. A fresh open manifest has been auto-generated for subsequent orders.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-700">Ready for Driver Handover</span>
          </div>
        )}

        {manifest.status === 'Dispatched' && (
          <div className="px-6 py-2.5 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-circle-check text-blue-600"></i>
              <span>
                <strong>Dispatched to Carrier:</strong> Handed over to <strong>{manifest.carrierDriverName}</strong> ({manifest.carrierPlateNumber}) at <strong>{manifest.dispatchedAt}</strong>. Ref: <strong>{manifest.dispatchReference}</strong>.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 font-mono">{manifest.dispatchReference}</span>
          </div>
        )}

        {/* Detailed Route & Metrics Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white">
          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <i className="fa-solid fa-location-dot text-[#4d9e5f]"></i> Pickup Address
            </span>
            <p className="text-sm font-bold text-gray-800">{manifest.originHub}</p>
            <p className="text-xs text-gray-500 leading-snug line-clamp-2">{manifest.originAddress}</p>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <i className="fa-solid fa-warehouse text-indigo-500"></i> Delivery Address
            </span>
            <p className="text-sm font-bold text-gray-800">{manifest.destinationHub}</p>
            <p className="text-xs text-gray-500 leading-snug line-clamp-2">{manifest.destinationAddress}</p>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-gray-50 border border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
              <i className="fa-solid fa-truck text-amber-500"></i> Carrier Partner
            </span>
            <p className="text-sm font-bold text-gray-800">
              {manifest.status === 'Dispatched' && manifest.carrier ? manifest.carrier : <span className="text-gray-400 font-normal italic text-xs">Unassigned (at dispatch)</span>}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>Cutoff: <strong className="text-orange-600 font-mono">{manifest.cutoffTime || '18:00'}</strong></span>
              <span>Created: <span className="text-gray-600">{manifest.createdAt.split(' ')[0]}</span></span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#f0f8f3] border border-[#d8ecdf] flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#1b4d3e] uppercase tracking-wider block">
              Handover Aggregate Metrics
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1 text-center">
              <div>
                <span className="text-xs text-gray-500 block">Orders</span>
                <span className="text-base font-black text-gray-900">{manifest.totalOrders}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Weight</span>
                <span className="text-base font-black text-gray-900">{manifest.totalWeight.toFixed(1)} <span className="text-[10px] font-normal">kg</span></span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Sub-Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Table Title Bar */}
        <div className="px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-sm text-[#1b4d3e] uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-boxes-stacked"></i>
              Sub-Orders in Manifest ({manifest.orders.length})
            </h2>
            {manifest.status === 'Open' ? (
              <span className="px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full">
                Editable
              </span>
            ) : (
              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">
                Locked
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Search within orders */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders in manifest..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-64 pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] focus:border-[#4d9e5f] bg-white"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-gray-400 text-xs"></i>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {manifest.status === 'Open' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 bg-[#4d9e5f] hover:bg-[#3d7d4c] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <i className="fa-solid fa-plus"></i> Add Orders
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 border-r border-gray-200 w-10 text-center">#</th>
                <th className="px-4 py-3 border-r border-gray-200">Order Code</th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Weight</th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Status</th>
                <th className="px-4 py-3 text-center w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-400 italic">
                    {manifest.orders.length === 0 ? (
                      <div className="space-y-2">
                        <i className="fa-solid fa-inbox text-3xl text-gray-300"></i>
                        <p>No sub-orders in this manifest yet.</p>
                        {manifest.status === 'Open' && (
                          <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-4 py-1.5 bg-[#4d9e5f] text-white rounded text-xs font-bold hover:bg-[#3d7d4c]"
                          >
                            <i className="fa-solid fa-plus mr-1"></i> Add Sub-Orders Now
                          </button>
                        )}
                      </div>
                    ) : (
                      "No orders matching search query."
                    )}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord, idx) => (
                  <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 border-r border-gray-100 text-center text-gray-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 font-mono font-bold text-[#1b4d3e]">
                      {ord.orderCode}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 text-center font-mono font-bold">
                      {ord.weight} kg
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-700">
                        {ord.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {manifest.status === 'Open' ? (
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove sub-order "${ord.orderCode}" from this manifest?`)) {
                              onRemoveOrder(manifest.id, ord.id);
                            }
                          }}
                          className="w-7 h-7 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors inline-flex items-center justify-center"
                          title="Remove Order from Manifest"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs" title="Manifest is locked">
                          <i className="fa-solid fa-lock"></i>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {manifest.orders.length > 0 && (
              <tfoot className="bg-gray-50 text-xs font-bold text-gray-800 border-t border-gray-200">
                <tr>
                  <td colSpan={2} className="px-4 py-3 text-right uppercase tracking-wider text-[11px] text-gray-600 border-r border-gray-200">
                    Manifest Totals:
                  </td>
                  <td className="px-4 py-3 text-center font-mono border-r border-gray-200">
                    {manifest.totalWeight.toFixed(2)} kg
                  </td>
                  <td colSpan={2} className="px-4 py-3 text-center text-gray-500 text-[11px]">
                    {manifest.totalOrders} total sub-orders
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

      </div>

      {/* Modal: Add Sub-Orders */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1b4d3e]">Add Sub-Orders into Manifest</h3>
                <p className="text-xs text-gray-500">
                  Target Route: <span className="font-semibold text-gray-700">{manifest.originHub}</span> &rarr; <span className="font-semibold text-gray-700">{manifest.destinationHub}</span>
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-base"></i>
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              
              {/* Quick Barcode / Code Scan Input */}
              <form onSubmit={handleQuickAddOrder} className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 flex gap-2 items-center">
                <i className="fa-solid fa-barcode text-[#4d9e5f] text-lg pl-1"></i>
                <input
                  type="text"
                  placeholder="Scan barcode or type Order Code / Tracking # and press Enter..."
                  value={quickInputCode}
                  onChange={e => setQuickInputCode(e.target.value)}
                  className="flex-1 bg-white border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#4d9e5f] hover:bg-[#3d7d4c] text-white rounded text-xs font-bold transition-all shadow-sm"
                >
                  Quick Add
                </button>
              </form>

              {/* Pending Orders Selection Table */}
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2 flex items-center justify-between">
                  <span>Available Pending Orders ({availablePendingOrders.length})</span>
                  {availablePendingOrders.length > 0 && (
                    <button
                      onClick={() => {
                        if (selectedPendingIds.length === availablePendingOrders.length) {
                          setSelectedPendingIds([]);
                        } else {
                          setSelectedPendingIds(availablePendingOrders.map(p => p.id));
                        }
                      }}
                      className="text-[#4d9e5f] hover:underline text-[11px] font-bold"
                    >
                      {selectedPendingIds.length === availablePendingOrders.length ? "Deselect All" : "Select All"}
                    </button>
                  )}
                </h4>

                {availablePendingOrders.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 border border-dashed rounded-lg bg-gray-50">
                    <i className="fa-solid fa-clipboard-check text-2xl mb-1 text-gray-300"></i>
                    <p className="text-xs">No pending orders currently matching this route.</p>
                    <p className="text-[11px] text-gray-400 mt-1">Use "Simulate Inbound Order" on the main list to generate orders.</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-100 text-gray-700 font-bold border-b sticky top-0">
                        <tr>
                          <th className="p-2.5 w-10 text-center">
                            <input
                              type="checkbox"
                              checked={selectedPendingIds.length === availablePendingOrders.length && availablePendingOrders.length > 0}
                              onChange={e => {
                                if (e.target.checked) {
                                  setSelectedPendingIds(availablePendingOrders.map(p => p.id));
                                } else {
                                  setSelectedPendingIds([]);
                                }
                              }}
                              className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f]"
                            />
                          </th>
                          <th className="p-2.5">Order Code</th>
                          <th className="p-2.5">Carrier Tracking #</th>
                          <th className="p-2.5">Receiver</th>
                          <th className="p-2.5 text-center">Weight</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {availablePendingOrders.map(po => (
                          <tr
                            key={po.id}
                            onClick={() => {
                              if (selectedPendingIds.includes(po.id)) {
                                setSelectedPendingIds(selectedPendingIds.filter(id => id !== po.id));
                              } else {
                                setSelectedPendingIds([...selectedPendingIds, po.id]);
                              }
                            }}
                            className={`cursor-pointer hover:bg-green-50/50 transition-colors ${
                              selectedPendingIds.includes(po.id) ? 'bg-green-50/80' : ''
                            }`}
                          >
                            <td className="p-2.5 text-center">
                              <input
                                type="checkbox"
                                checked={selectedPendingIds.includes(po.id)}
                                onChange={() => {}} // handled by row click
                                className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f]"
                              />
                            </td>
                            <td className="p-2.5 font-mono font-bold text-[#1b4d3e]">{po.orderCode}</td>
                            <td className="p-2.5 font-mono text-blue-700">{po.trackingNumber}</td>
                            <td className="p-2.5">
                              <div>{po.receiverName}</div>
                              <div className="text-[10px] text-gray-400">{po.receiverPhone}</div>
                            </td>
                            <td className="p-2.5 text-center font-mono">{po.weight} kg</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

            <div className="px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                {selectedPendingIds.length} orders selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={selectedPendingIds.length === 0}
                  onClick={handleConfirmAddOrders}
                  className="px-5 py-2 bg-[#1b4d3e] hover:bg-[#14392e] disabled:opacity-50 disabled:pointer-events-none text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Add Selected to Manifest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Confirm Seal Manifest */}
      {confirmSealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl">
              <i className="fa-solid fa-lock"></i>
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-gray-900">Seal Manifest (Lock)</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Sealing manifest <strong>{manifest.manifestCode}</strong> will freeze its order list ({manifest.totalOrders} orders) and lock it for carrier handover.
              </p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
              <div className="flex items-start gap-2">
                <i className="fa-solid fa-bolt-lightning text-blue-600 mt-0.5"></i>
                <div>
                  <strong>Automatic Rule Trigger:</strong> Upon sealing, the system will <strong>automatically generate a fresh Open Manifest</strong> for this exact route so upcoming orders can continue being captured seamlessly!
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setConfirmSealModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfirmSealModal(false);
                  onSeal(manifest.id);
                }}
                className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
              >
                Confirm & Seal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Dispatch to Carrier */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#1b4d3e]">Dispatch Manifest to Carrier</h3>
                <p className="text-xs text-gray-500">Manifest: <span className="font-mono font-bold text-gray-700">{manifest.manifestCode}</span></p>
              </div>
              <button
                onClick={() => setIsDispatchModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <i className="fa-solid fa-xmark text-base"></i>
              </button>
            </div>

            <form onSubmit={handleConfirmDispatch} className="p-6 space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg border text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Route:</span>
                  <span className="font-bold text-gray-800">{manifest.originHub} &rarr; {manifest.destinationHub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Packages:</span>
                  <span className="font-bold text-gray-800">{manifest.totalOrders} packages</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Weight:</span>
                  <span className="font-bold text-gray-800">{manifest.totalWeight.toFixed(2)} kg</span>
                </div>
              </div>

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
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-xs outline-none bg-white font-medium"
                >
                  <option value="SPX Express">SPX Express</option>
                  <option value="GHTK">GHTK</option>
                  <option value="GHN">GHN</option>
                  <option value="Viettel Post">Viettel Post</option>
                  <option value="FedEx">FedEx</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  onClick={() => setIsDispatchModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-check"></i> Complete Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
