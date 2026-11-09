import React, { useState, useRef, useEffect } from 'react';
import { OnlineOrder, OrderHistoryItem } from '../types';
import { DEFAULT_ORDER_HISTORY, MOCK_ONLINE_ORDERS } from '../constants';

interface OrderOnlineDetailViewProps {
  order: OnlineOrder | null;
  onBack: () => void;
}

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

export function OrderOnlineDetailView({ order: propOrder, onBack }: OrderOnlineDetailViewProps) {
  // Use propOrder or fallback to the reference order from screenshot
  const order: OnlineOrder = propOrder || MOCK_ONLINE_ORDERS[0];

  const [activeTab, setActiveTab] = useState('General Information');
  const [shippingVendor, setShippingVendor] = useState(order.vendor || 'FedEx');
  const [isEditMode, setIsEditMode] = useState(false);

  // Order history privacy lock state (hidden by default)
  const [isHistoryRevealed, setIsHistoryRevealed] = useState(false);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [reasonInput, setReasonInput] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [viewedReason, setViewedReason] = useState<{ reason: string; time: string } | null>(null);
  const reasonTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isReasonModalOpen) {
      setTimeout(() => {
        reasonTextareaRef.current?.focus();
      }, 50);
    }
  }, [isReasonModalOpen]);

  const handleOpenReasonModal = () => {
    setReasonInput('');
    setReasonError('');
    setIsReasonModalOpen(true);
  };

  const handleCloseReasonModal = () => {
    setIsReasonModalOpen(false);
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
    setViewedReason({
      reason: trimmed,
      time: new Date().toLocaleTimeString(),
    });
    setIsHistoryRevealed(true);
    handleCloseReasonModal();
  };

  const handleToggleHistory = () => {
    if (isHistoryRevealed) {
      setIsHistoryRevealed(false);
    } else {
      handleOpenReasonModal();
    }
  };

  const VENDOR_SERVICES: Record<string, string[]> = {
    FedEx: ['FIRST_OVERNIGHT', 'PRIORITY_OVERNIGHT', 'STANDARD_OVERNIGHT', 'FEDEX_2_DAY_AM', 'FEDEX_2_DAY', 'FEDEX_EXPRESS_SAVER', 'FEDEX_GROUND', 'SMART_POST'],
    UPS: ['NextDayAirEarlyAM', 'NextDayAir', 'NextDayAirSaver', '2ndDayAirAM', '2ndDayAir', '3DaySelect', 'Ground'],
    USPS: ['Express', 'Priority', 'GroundAdvantage'],
  };

  const historyItems: OrderHistoryItem[] = order.history && order.history.length > 0
    ? order.history
    : DEFAULT_ORDER_HISTORY;

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'completed') {
      return (
        <span className="text-green-600 border border-green-500 bg-green-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Completed
        </span>
      );
    }
    if (s === 'delivered') {
      return (
        <span className="text-green-600 border border-green-500 bg-green-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Delivered
        </span>
      );
    }
    if (s === 'out for delivery') {
      return (
        <span className="text-orange-500 border border-orange-400 bg-orange-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Out for delivery
        </span>
      );
    }
    if (s === 'picked up') {
      return (
        <span className="text-[#0fa4a9] border border-cyan-400 bg-cyan-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Picked up
        </span>
      );
    }
    if (s.includes('picked up waiting confirmation')) {
      return (
        <span className="text-[#d97706] border border-amber-400 bg-amber-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Picked up waiting confirmation
        </span>
      );
    }
    if (s.includes('waiting for pickup')) {
      return (
        <span className="text-[#d97706] border border-amber-400 bg-amber-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Waiting for pickup
        </span>
      );
    }
    if (s === 'packed') {
      return (
        <span className="text-blue-500 border border-blue-400 bg-blue-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Packed
        </span>
      );
    }
    if (s === 'dispatched') {
      return (
        <span className="text-blue-500 border border-blue-400 bg-blue-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          Dispatched
        </span>
      );
    }
    if (s === 'new') {
      return (
        <span className="text-gray-700 border border-gray-400 bg-gray-50/70 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
          New
        </span>
      );
    }
    return (
      <span className="text-gray-600 border border-gray-300 bg-gray-50 px-2 py-0.5 rounded text-[11px] font-medium inline-block">
        {status}
      </span>
    );
  };

  return (
    <div className="bg-[#f3f4f6] flex flex-col h-full overflow-hidden animate-in fade-in duration-300 text-xs">
      {/* Header Bar */}
      <div className="bg-[#6db575] flex items-center justify-between px-4 py-2 text-white shrink-0">
        <h2 className="font-bold text-sm tracking-wider flex items-center gap-2">
          <i className="fa-solid fa-bars"></i> Order Detail
        </h2>

        <div className="flex flex-1 max-w-xl mx-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-white/70"></i>
          </div>
          <input
            type="text"
            placeholder="Search by order code, shipment code, tracking number..."
            className="block w-full pl-9 pr-3 py-1.5 border-transparent rounded bg-black/10 text-white placeholder-white/70 focus:outline-none focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 text-xs transition-colors"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              className="w-4 h-3 object-cover rounded-sm"
              alt="EN"
            />
            EN <i className="fa-solid fa-chevron-down text-[10px]"></i>
          </div>
          <div className="flex items-center gap-1.5 opacity-90">
            <i className="fa-regular fa-clock"></i> 09/11/26 11:47 UTC+7
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-white/10 px-2 py-1 rounded">
            <i className="fa-solid fa-user"></i>
            <span>Nguyễn Quốc Tuấn</span>
            <i className="fa-solid fa-chevron-down text-[10px]"></i>
          </div>
        </div>
      </div>

      {/* Breadcrumb Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b shrink-0">
        <nav className="flex items-center gap-2 text-xs text-gray-500">
          <i className="fa-solid fa-house"></i>
          <span>/</span>
          <span className="cursor-pointer hover:text-gray-800" onClick={onBack}>
            Orders
          </span>
          <span>/</span>
          <span className="cursor-pointer hover:text-gray-800" onClick={onBack}>
            Online
          </span>
          <span>/</span>
          <span className="text-gray-800 font-medium">Order Detail</span>
        </nav>
        <i className="fa-solid fa-link text-gray-400 hover:text-gray-600 cursor-pointer"></i>
      </div>

      {/* Tabs & Action Buttons */}
      <div className="flex px-4 border-b border-gray-200 gap-1 bg-white pt-2.5 shrink-0 items-center justify-between shadow-2xs">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'General Information', icon: 'fa-circle-info', color: 'text-blue-500' },
            { id: 'Partner Information', icon: 'fa-handshake', color: 'text-orange-500' },
            { id: 'Items Information', icon: 'fa-cart-shopping', color: 'text-blue-400' },
            { id: 'Service', icon: 'fa-headset', color: 'text-green-500' },
            { id: 'Carrier Information', icon: 'fa-truck', color: 'text-red-400' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border-t-2 rounded-t transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#2c6e3b] text-[#2c6e3b] bg-gray-50/50 shadow-2xs'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <i className={`fa-solid ${tab.icon} ${isActive ? tab.color : 'opacity-60'}`}></i>
                {tab.id}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mb-1.5 shrink-0">
          {/* Show / Hide History Button */}
          <button
            type="button"
            onClick={handleToggleHistory}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            title={isHistoryRevealed ? 'Hide order history' : 'Click to enter reason and view order history'}
          >
            {isHistoryRevealed ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-gray-600">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
                <span>Hide</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-gray-600">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Show</span>
              </>
            )}
          </button>

          {/* Edit / Save Button */}
          <button
            type="button"
            onClick={() => setIsEditMode(!isEditMode)}
            className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <i className={`fa-solid ${isEditMode ? 'fa-check text-[#2c6e3b]' : 'fa-pen text-gray-600'}`}></i>
            <span>{isEditMode ? 'Done' : 'Edit'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 overflow-y-auto flex-1 bg-[#f3f4f6]">
        {activeTab === 'General Information' ? (
          <div className="bg-white rounded border border-gray-200 shadow-sm p-6 space-y-6">
            {/* Order Information 3-Column Key-Value Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3.5 gap-x-6 text-[13px] border-b border-gray-100 pb-6">
              {/* Row 1 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Order Code</span>
                <span className="font-bold text-gray-900">{order.orderCode}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-44 shrink-0 font-bold text-gray-800">Customer Order Code</span>
                <span className="border border-blue-400 bg-blue-50/70 text-blue-600 px-3 py-0.5 rounded text-xs font-semibold">
                  {order.customerOrderCode}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-bold text-gray-800">Customer</span>
                <span className="font-bold text-gray-900">{order.customer || 'HASAKI LLC'}</span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Total Amount</span>
                <span className="text-blue-500 font-bold hover:underline cursor-pointer">
                  {order.totalAmount || '41 USD'}
                </span>
              </div>
              <div></div>
              <div></div>

              {/* Row 3 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Status</span>
                <span className="text-green-600 border border-green-500 bg-green-50 px-2.5 py-0.5 rounded text-xs font-medium">
                  {order.status || 'Completed'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-44 shrink-0 font-bold text-gray-800">Is Return</span>
                <span className="text-red-500 border border-red-300 bg-red-50 px-3 py-0.5 rounded text-xs font-medium">
                  {order.isReturn ? 'Yes' : 'No'}
                </span>
              </div>
              <div></div>

              {/* Row 4 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Order Type</span>
                <span className="text-gray-900">{order.orderType || 'Domestic'}</span>
              </div>
              <div></div>
              <div></div>

              {/* Row 5 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Transport Type</span>
                <span className="text-gray-900">{order.transportType || 'Unspecified'}</span>
              </div>
              <div></div>
              <div></div>

              {/* Row 6 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Payment Method</span>
                <span className="text-gray-900">{order.paymentMethod || 'Unspecified'}</span>
              </div>
              <div></div>
              <div></div>

              {/* Row 7 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Order Category</span>
                <span className="text-gray-900">{order.orderCategory || 'Cosmetics'}</span>
              </div>
              <div></div>
              <div></div>

              {/* Row 8 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Cod</span>
                <span className="text-gray-900 font-mono">{order.cod || '***'}</span>
              </div>
              <div></div>
              <div></div>

              {/* Row 9 */}
              <div className="flex items-center gap-3">
                <span className="w-36 shrink-0 font-bold text-gray-800">Note</span>
                <span className="text-gray-500">{order.note || '—'}</span>
              </div>
              <div></div>
              <div></div>
            </div>

            {/* Order History Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-[#3b7e47] font-bold text-sm tracking-tight">Order History</h3>

                  {/* Eye Toggle Button */}
                  <button
                    type="button"
                    onClick={handleToggleHistory}
                    className={`w-7 h-7 rounded border flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                      isHistoryRevealed
                        ? 'border-gray-200 bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        : 'border-[#b5ccb6] bg-[#eef6ef] text-[#2c6e3b] hover:text-white hover:bg-[#2c6e3b]'
                    }`}
                    title={isHistoryRevealed ? 'Hide order history' : 'Click to enter reason and view Order History'}
                    aria-label={isHistoryRevealed ? 'Hide order history' : 'View order history'}
                  >
                    {isHistoryRevealed ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {isHistoryRevealed && viewedReason && (
                  <span className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded">
                    Unlocked for: <strong className="text-gray-700">{viewedReason.reason}</strong>
                  </span>
                )}
              </div>

              {/* When Hidden: Display neat privacy masked box with eye unlock button */}
              {!isHistoryRevealed ? (
                <div className="border border-dashed border-[#b5ccb6] rounded-lg bg-[#fafcfa] p-8 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#eef6ef] text-[#2c6e3b] flex items-center justify-center shadow-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div className="space-y-1 max-w-md">
                    <p className="font-bold text-gray-800 text-sm">Order History is Hidden</p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      This information contains timestamped audit logs. Click the eye button below to enter your access reason and view history.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenReasonModal}
                    className="mt-1 px-4 py-2 bg-[#2c6e3b] hover:bg-[#20512b] text-white rounded text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>View Order History</span>
                  </button>
                </div>
              ) : (
                /* When Revealed: Display Full History Table Matching Screenshot */
                <div className="border border-gray-200 rounded overflow-hidden shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[900px]">
                      <thead className="bg-[#cbdccb] text-[#3e5f41]">
                        <tr>
                          <th className="px-4 py-2.5 font-bold border-b border-[#b5ccb6] w-52">Status</th>
                          <th className="px-4 py-2.5 font-bold border-b border-[#b5ccb6] w-60">Time (UTC+7)</th>
                          <th className="px-4 py-2.5 font-bold border-b border-[#b5ccb6] w-60">Local time</th>
                          <th className="px-4 py-2.5 font-bold border-b border-[#b5ccb6] w-48">Performed By</th>
                          <th className="px-4 py-2.5 font-bold border-b border-[#b5ccb6]">Note</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white">
                        {historyItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                            <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                              {getStatusBadge(item.status)}
                            </td>
                            <td className="px-4 py-2.5 text-gray-700 font-mono whitespace-nowrap text-[11px]">
                              {item.timeUTC7}
                            </td>
                            <td className="px-4 py-2.5 text-gray-600 font-mono whitespace-nowrap text-[11px]">
                              {item.localTime}
                            </td>
                            <td className="px-4 py-2.5 text-gray-800 font-medium whitespace-nowrap">
                              {item.performedBy}
                            </td>
                            <td className="px-4 py-2.5 text-gray-700 leading-relaxed text-[11px]">
                              {item.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'Carrier Information' ? (
          <div className="bg-white rounded border border-gray-200 shadow-sm p-6 min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-5xl">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">Carrier</label>
                <div className="relative">
                  <select
                    defaultValue={order.carrier || 'Easypost'}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 appearance-none bg-white"
                  >
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
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 appearance-none bg-white"
                  >
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
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-500 appearance-none bg-white">
                    {shippingVendor &&
                      VENDOR_SERVICES[shippingVendor]?.map((svc) => (
                        <option key={svc} value={svc}>
                          {svc}
                        </option>
                      ))}
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-gray-400 text-[10px] pointer-events-none"></i>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">Shipper</label>
                <input
                  type="text"
                  placeholder="Shipper"
                  defaultValue=""
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">Type</label>
                <input
                  type="text"
                  placeholder="Type"
                  defaultValue=""
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">Vehicle</label>
                <input
                  type="text"
                  placeholder="Vehicle"
                  defaultValue=""
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-700 block">Note</label>
                <input
                  type="text"
                  placeholder="Note"
                  defaultValue=""
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 placeholder-gray-300"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded border border-gray-200 shadow-sm p-6 min-h-[400px] flex flex-col items-center justify-center text-gray-400 space-y-2">
            <i className="fa-solid fa-folder-open text-3xl opacity-40"></i>
            <p className="text-xs font-medium">Content for tab "{activeTab}"</p>
            <p className="text-[11px] text-gray-400">Order: {order.orderCode} ({order.customerOrderCode})</p>
          </div>
        )}
      </div>

      {/* Reason Required Popup Modal (English version from attached spec) */}
      {isReasonModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 animate-in fade-in duration-150"
          onClick={handleCloseReasonModal}
        >
          <div
            className="bg-white rounded-md shadow-2xl w-full max-w-[560px] px-8 py-8 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Coral-red circle with exclamation mark */}
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
                placeholder="Enter your reason here..."
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

            {/* Action Buttons: Cancel (Red) & Confirm (Green) */}
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
