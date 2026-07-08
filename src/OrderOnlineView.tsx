import React, { useState } from 'react';
import { OnlineOrder } from '../types';
import { MOCK_ONLINE_ORDERS } from '../constants';

export function OrderOnlineView({ onRowClick, onCreateClick }: { onRowClick: (id: string) => void, onCreateClick: () => void }) {
  const [orders, setOrders] = useState<OnlineOrder[]>(MOCK_ONLINE_ORDERS);

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

      <div className="p-4 flex-1 overflow-x-auto">
         <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm min-w-[1200px]">
             <table className="w-full text-left text-xs">
                 <thead className="bg-[#cbdccb] text-[#3e5f41]">
                     <tr>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-32">Order Code</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-40">Customer Order Code</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-48">Customer</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-32">Carrier</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-40">Tracking Number</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-32">Status</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-32">Created At (UTC+7)</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-44">Estimated Delivery Time (UTC+7)</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] w-24">Order Type</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] border-r border-[#b5ccb6] min-w-[200px]">Pick Actions</th>
                         <th className="px-3 py-3 font-bold border-b border-[#b5ccb6] text-center w-16">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 bg-white">
                     {orders.map(order => (
                         <tr 
                             key={order.id} 
                             className="hover:bg-blue-50/50 transition-colors"
                         >
                             <td className="px-3 py-2 border-r border-gray-100">
                                 <div className="flex items-center justify-between">
                                     <span className="text-blue-500 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded cursor-pointer hover:bg-blue-100" onClick={() => onRowClick(order.id)}>{order.orderCode}</span>
                                     <i className="fa-regular fa-copy text-[#d48c3b] cursor-pointer" title="Copy"></i>
                                 </div>
                             </td>
                             <td className="px-3 py-2 border-r border-gray-100 font-medium">{order.customerOrderCode}</td>
                             <td className="px-3 py-2 border-r border-gray-100">
                                 <span className="text-purple-600 border border-purple-200 bg-purple-50 px-2 py-0.5 rounded text-[10px] font-bold block truncate max-w-[160px]" title={order.customer}>
                                     {order.customer}
                                 </span>
                             </td>
                             <td className="px-3 py-2 border-r border-gray-100">
                                 <span className="text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold">
                                     {order.carrier}
                                 </span>
                             </td>
                             <td className="px-3 py-2 border-r border-gray-100">
                                 <div className="flex items-center justify-between">
                                     <span className="text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold">{order.trackingNumber}</span>
                                     <i className="fa-solid fa-arrow-up-right-from-square text-[#d48c3b] cursor-pointer" title="Track"></i>
                                 </div>
                             </td>
                             <td className="px-3 py-2 border-r border-gray-100 font-medium">
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
                             <td className="px-3 py-2 border-r border-gray-100 text-gray-600">{order.createdAt}</td>
                             <td className="px-3 py-2 border-r border-gray-100 text-gray-600">{order.estimatedDeliveryTime}</td>
                             <td className="px-3 py-2 border-r border-gray-100 text-gray-600">{order.orderType}</td>
                             <td className="px-3 py-2 border-r border-gray-100 text-gray-600 text-[10px] truncate max-w-[200px]" title={order.pickActions}>{order.pickActions}</td>
                             <td className="px-3 py-2 text-center">
                                 <i className="fa-solid fa-pen text-blue-500 cursor-pointer hover:text-blue-700" onClick={() => onRowClick(order.id)}></i>
                             </td>
                         </tr>
                     ))}
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
  );
}
