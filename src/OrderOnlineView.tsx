import React, { useState, useRef, useEffect } from 'react';
import { OnlineOrder } from '../types';
import { MOCK_ONLINE_ORDERS } from '../constants';

const QUICK_VIEW_REASONS = [
  'Customer support',
  'Check delivery route',
  'Check COD balance',
  'Check call logs',
  'Check order history',
  'Check late order',
  'Warehouse return for shipper',
  'Check pending order',
  'Incident handling',
  'Developer operations',
];

export function OrderOnlineView({ onRowClick, onCreateClick }: { onRowClick: (id: string) => void, onCreateClick: () => void }) {
  const [orders] = useState<OnlineOrder[]>(MOCK_ONLINE_ORDERS);
  const [revealedOrders, setRevealedOrders] = useState<Record<string, { reason: string; viewedAt: string }>>({});
  const [targetOrderForReveal, setTargetOrderForReveal] = useState<OnlineOrder | null>(null);
  const [reasonInput, setReasonInput] = useState('');
  const [reasonError, setReasonError] = useState('');
  const reasonTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (targetOrderForReveal) {
      setTimeout(() => {
        reasonTextareaRef.current?.focus();
      }, 50);
    }
  }, [targetOrderForReveal]);

  const handleOpenReasonModal = (order: OnlineOrder) => {
    setTargetOrderForReveal(order);
    setReasonInput('');
    setReasonError('');
  };

  const handleCloseReasonModal = () => {
    setTargetOrderForReveal(null);
    setReasonInput('');
    setReasonError('');
  };

  const handleQuickReasonClick = (reason: string) => {
    setReasonError('');
    const trimmed = reasonInput.trim();
    if (!trimmed || QUICK_VIEW_REASONS.includes(trimmed)) {
      setReasonInput(reason);
    } else if (!trimmed.toLowerCase().includes(reason.toLowerCase())) {
      setReasonInput(`${trimmed}, ${reason}`);
    }
    reasonTextareaRef.current?.focus();
  };

  const handleConfirmReason = () => {
    const trimmed = reasonInput.trim();
    if (!trimmed) {
      setReasonError('Please enter or select a reason before confirming.');
      reasonTextareaRef.current?.focus();
      return;
    }
    if (targetOrderForReveal) {
      setRevealedOrders(prev => ({
        ...prev,
        [targetOrderForReveal.id]: {
          reason: trimmed,
          viewedAt: new Date().toLocaleTimeString(),
        },
      }));
    }
    handleCloseReasonModal();
  };

  const handleHideAddress = (orderId: string) => {
    setRevealedOrders(prev => {
      const next = { ...prev };
      delete next[orderId];
      return next;
    });
  };

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="bg-[#6db575] flex items-center justify-between px-4 py-2 text-white">
        <h2 className="font-bold text-sm tracking-wider flex items-center gap-2">
            <i className="fa-solid fa-bars"></i> Online
        </h2>
        <div className="flex items-center gap-2">
            <button 
                onClick={onCreateClick}
                className="bg-[#2c6e3b] px-4 py-1.5 rounded text-xs font-bold hover:bg-[#20512b] transition-colors flex items-center gap-1 shadow-sm"
            >
                <i className="fa-solid fa-plus"></i> Create
            </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-wrap items-center gap-3 border-b border-gray-100 bg-gray-50/50">
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#d48c3b] uppercase">Order Code</label>
            <input type="text" placeholder="Enter order code" className="w-40 px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500" />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#d48c3b] uppercase">Customer Order Code</label>
            <input type="text" placeholder="Enter customer order code" className="w-48 px-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500" />
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#d48c3b] uppercase">Customer</label>
            <div className="relative">
                <input type="text" placeholder="Input to Search customer" className="w-48 pl-3 pr-8 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500" />
                <i className="fa-solid fa-chevron-down absolute right-3 top-2.5 text-gray-400 text-[10px]"></i>
            </div>
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#d48c3b] uppercase">Status</label>
            <div className="relative">
                <select className="w-48 pl-3 pr-8 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500 appearance-none bg-white">
                    <option value="">Select order status</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-2.5 text-gray-400 text-[10px] pointer-events-none"></i>
            </div>
        </div>
        <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#d48c3b] uppercase">Order Date Range</label>
            <div className="relative">
                <input type="text" placeholder="2026-06-26 -> 2026-07-02" className="w-56 pl-3 pr-8 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-blue-500" />
                <i className="fa-regular fa-calendar absolute right-3 top-2 text-gray-400"></i>
            </div>
        </div>
        
        <div className="flex items-end gap-2 ml-auto mt-4">
            <button className="px-4 py-1.5 border border-gray-300 bg-white rounded text-xs font-medium hover:bg-gray-50 flex items-center gap-2">
                <i className="fa-solid fa-rotate-right"></i> Reset
            </button>
            <button className="px-4 py-1.5 bg-[#2c6e3b] text-white rounded text-xs font-bold hover:bg-[#20512b] flex items-center gap-2 shadow-sm">
                <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
        </div>
      </div>

      <div className="p-4 flex-1 min-w-0">
         <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
           <div className="overflow-x-auto">
             <table className="w-full min-w-[1280px] text-left text-xs">
                 <thead className="bg-[#cbdccb] text-[#3e5f41]">
                     <tr>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Order Code</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Customer Order Code</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Customer</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Carrier</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Tracking Number</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Status</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Created At (UTC+7)</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Estimated Delivery Time (UTC+7)</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap">Order Type</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] whitespace-nowrap min-w-[250px]">Pick Address</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] text-center whitespace-nowrap w-16">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 bg-white">
                     {orders.map(order => {
                         const isRevealed = Boolean(revealedOrders[order.id]);
                         const fullAddress = order.pickAddressFull || order.pickActions;

                         return (
                             <tr 
                                 key={order.id} 
                                 className="hover:bg-blue-50/50 transition-colors"
                             >
                                 <td className="px-3 py-2 border-r border-gray-100 whitespace-nowrap">
                                     <div className="flex items-center justify-between gap-2">
                                         <span className="text-blue-500 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-100" onClick={() => onRowClick(order.id)}>{order.orderCode}</span>
                                         <i className="fa-regular fa-copy text-[#d48c3b] cursor-pointer" title="Copy" onClick={() => navigator.clipboard?.writeText(order.orderCode)}></i>
                                     </div>
                                 </td>
                                 <td className="px-3 py-2 border-r border-gray-100 font-medium whitespace-nowrap">{order.customerOrderCode}</td>
                                 <td className="px-3 py-2 border-r border-gray-100">
                                     <span className="text-purple-600 border border-purple-200 bg-purple-50 px-2 py-0.5 rounded text-[10px] font-bold block truncate max-w-[150px]" title={order.customer}>
                                         {order.customer}
                                     </span>
                                 </td>
                                 <td className="px-3 py-2 border-r border-gray-100 whitespace-nowrap">
                                     <span className="text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold">
                                         {order.carrier}
                                     </span>
                                 </td>
                                 <td className="px-3 py-2 border-r border-gray-100 whitespace-nowrap">
                                     <div className="flex items-center justify-between gap-2">
                                         <span className="text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold">{order.trackingNumber}</span>
                                         <i className="fa-solid fa-arrow-up-right-from-square text-[#d48c3b] cursor-pointer" title="Track"></i>
                                     </div>
                                 </td>
                                 <td className="px-3 py-2 border-r border-gray-100 font-medium whitespace-nowrap">
                                     {order.status === 'Dispatched' ? (
                                        <div className="flex items-center gap-1.5 text-gray-700">
                                            <i className="fa-solid fa-truck-fast text-blue-500"></i> {order.status}
                                        </div>
                                     ) : order.status === 'Out for delivery' ? (
                                         <div className="flex items-center gap-1.5 text-gray-700">
                                            <i className="fa-solid fa-motorcycle text-orange-500"></i> {order.status}
                                        </div>
                                     ) : (
                                         <div className="flex items-center gap-1.5 text-gray-700">
                                            <i className="fa-solid fa-circle-check text-green-500"></i> {order.status}
                                        </div>
                                     )}
                                 </td>
                                 <td className="px-3 py-2 border-r border-gray-100 text-gray-600 whitespace-nowrap">{order.createdAt}</td>
                                 <td className="px-3 py-2 border-r border-gray-100 text-gray-600 whitespace-nowrap">{order.estimatedDeliveryTime}</td>
                                 <td className="px-3 py-2 border-r border-gray-100 text-gray-600 whitespace-nowrap">{order.orderType}</td>
                                 <td className="px-3 py-2 border-r border-gray-100 min-w-[250px] max-w-[300px]">
                                     <div className="flex items-center gap-2">
                                         {isRevealed ? (
                                             <button
                                                 type="button"
                                                 onClick={(e) => {
                                                     e.stopPropagation();
                                                     handleHideAddress(order.id);
                                                 }}
                                                 className="shrink-0 w-6 h-6 rounded border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                                                 title="Hide address"
                                                 aria-label="Hide address"
                                             >
                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                                     <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                                     <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                                     <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                                                     <line x1="1" y1="1" x2="23" y2="23" />
                                                 </svg>
                                             </button>
                                         ) : (
                                             <button
                                                 type="button"
                                                 onClick={(e) => {
                                                     e.stopPropagation();
                                                     handleOpenReasonModal(order);
                                                 }}
                                                 className="shrink-0 w-6 h-6 rounded border border-[#b5ccb6] bg-[#eef6ef] flex items-center justify-center text-[#2c6e3b] hover:text-white hover:bg-[#2c6e3b] transition-colors cursor-pointer shadow-sm"
                                                 title="View hidden pick address"
                                                 aria-label="View hidden pick address"
                                             >
                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                     <circle cx="12" cy="12" r="3" />
                                                 </svg>
                                             </button>
                                         )}

                                         {isRevealed ? (
                                             <span
                                                 className="text-gray-800 font-medium text-[11px] leading-snug break-words"
                                                 title={`Viewed reason: ${revealedOrders[order.id].reason}`}
                                             >
                                                 {fullAddress}
                                             </span>
                                         ) : (
                                             <span
                                                 className="text-gray-600 text-[11px] truncate"
                                                 title="Address is masked. Click the eye icon to enter a reason and view."
                                             >
                                                 {order.pickActions}
                                             </span>
                                         )}
                                     </div>
                                 </td>
                                 <td className="px-3 py-2 text-center whitespace-nowrap">
                                     <i className="fa-solid fa-pen text-blue-500 cursor-pointer hover:text-blue-700" onClick={() => onRowClick(order.id)}></i>
                                 </td>
                             </tr>
                         );
                     })}
                     {orders.length === 0 && (
                         <tr>
                             <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                                 No orders found
                             </td>
                         </tr>
                     )}
                 </tbody>
             </table>
           </div>
         </div>
      </div>

      {/* Reason Required Popup Modal */}
      {targetOrderForReveal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-in fade-in duration-150"
          onClick={handleCloseReasonModal}
        >
          <div
            className="bg-white rounded-md shadow-2xl w-full max-w-[560px] px-8 py-8 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Exclamation Icon Circle */}
            <div className="w-[68px] h-[68px] rounded-full bg-[#ff4538] flex items-center justify-center mx-auto mb-5 shadow-sm">
              <span className="text-white text-[42px] font-bold leading-none select-none">!</span>
            </div>

            {/* Title */}
            <p className="text-center text-[#333333] text-[15px] mb-3.5">
              Please enter the reason to view this information <span className="text-[#ff4538]">*</span>
            </p>

            {/* Reason Input Textarea */}
            <div>
              <textarea
                ref={reasonTextareaRef}
                value={reasonInput}
                onChange={(e) => {
                  setReasonInput(e.target.value);
                  if (reasonError && e.target.value.trim()) {
                    setReasonError('');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleConfirmReason();
                  }
                }}
                rows={4}
                className={`w-full p-3 border ${
                  reasonError ? 'border-[#ff4538] ring-1 ring-[#ff4538]/30' : 'border-[#767676] focus:border-[#333333]'
                } rounded-[2px] text-sm text-gray-800 outline-none resize-none transition-colors`}
              />
              {reasonError && (
                <p className="text-xs text-[#ff4538] mt-1 font-medium">{reasonError}</p>
              )}
            </div>

            {/* Quick-Select Reason Tags */}
            <div className="mt-4 flex flex-wrap gap-2.5">
              {QUICK_VIEW_REASONS.map((reason) => {
                const isSelected = reasonInput.trim().toLowerCase() === reason.toLowerCase();
                return (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => handleQuickReasonClick(reason)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#dfe5ec] border-[#9aa5b1] text-gray-900 font-medium'
                        : 'bg-[#eff1f3] border-[#cfd4da] text-[#333333] hover:bg-[#e2e6ea]'
                    }`}
                  >
                    {reason}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={handleCloseReasonModal}
                className="bg-[#ff4538] hover:bg-[#e5392d] text-white text-sm font-medium px-8 py-2.5 rounded-[4px] shadow-md transition-colors min-w-[116px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReason}
                className="bg-[#28962c] hover:bg-[#217d24] text-white text-sm font-medium px-8 py-2.5 rounded-[4px] shadow-md transition-colors min-w-[116px] cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
