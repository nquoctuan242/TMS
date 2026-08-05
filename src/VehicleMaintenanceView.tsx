import React, { useState } from 'react';

export function VehicleMaintenanceView() {
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);

  const [tickets, setTickets] = useState([
    { id: '1', ticketNo: 'MT-2408-001', licensePlate: '51C-812.44', type: 'Periodic', description: 'Thay nhớt, lọc nhớt 10,000km', scheduledDate: '15/08/2026', status: 'Pending', cost: 0, alertTask: 'TSK-1029', alertTaskStatus: 'In Progress' },
    { id: '2', ticketNo: 'MT-2408-002', licensePlate: '60A-337.19', type: 'Repair', description: 'Thay má phanh trước', scheduledDate: '12/08/2026', status: 'In Progress', cost: 1200000, alertTask: 'TSK-1031', alertTaskStatus: 'Finished' },
    { id: '3', ticketNo: 'MT-2407-015', licensePlate: '51C-812.44', type: 'Periodic', description: 'Bảo dưỡng cấp lớn 40,000km', scheduledDate: '25/07/2026', status: 'Completed', cost: 4500000 },
    { id: '4', ticketNo: 'MT-2407-010', licensePlate: '29H-551.02', type: 'Inspection', description: 'Kiểm tra hệ thống lạnh', scheduledDate: '10/07/2026', status: 'Completed', cost: 350000 }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">Pending</span>;
      case 'In Progress':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-blue-50 text-blue-700 border border-blue-200">In Progress</span>;
      case 'Completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-green-50 text-green-700 border border-green-200">Completed</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-red-50 text-red-700 border border-red-200">Cancelled</span>;
      default:
        return null;
    }
  };

  const filteredTickets = activeTab === 'All' ? tickets : tickets.filter(t => t.status === activeTab);

  return (
    <div className="bg-gray-50/50 min-h-full p-6 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-blue-500">
            <div className="text-2xl font-bold text-gray-900">{tickets.length}</div>
            <div className="text-[13px] text-gray-500 mt-1">Total Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-yellow-500">
            <div className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'Pending').length}</div>
            <div className="text-[13px] text-gray-500 mt-1">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-blue-400">
            <div className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'In Progress').length}</div>
            <div className="text-[13px] text-gray-500 mt-1">In Progress</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-green-600">
            <div className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === 'Completed').length}</div>
            <div className="text-[13px] text-gray-500 mt-1">Completed</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-xl">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search by task no, license plate..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2563eb]"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg border border-gray-200 p-0.5 shadow-sm">
              {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors border-r last:border-r-0 border-gray-200 ${activeTab === tab ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-600 hover:text-gray-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button 
              onClick={() => { setEditingTicket(null); setShowModal(true); }}
              className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <i className="fa-solid fa-plus"></i> Create Maintenance Request
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <h2 className="font-bold text-gray-900">Maintenance Tasks</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-bold">Task No</th>
                  <th className="px-6 py-4 font-bold">License Plate</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Description</th>
                  <th className="px-6 py-4 font-bold">Scheduled Date</th>
                  <th className="px-6 py-4 font-bold">Cost</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Alert Task</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredTickets.map((ticket, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 group">
                    <td className="px-6 py-4 font-medium text-[#2563eb]">{ticket.ticketNo}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{ticket.licensePlate}</td>
                    <td className="px-6 py-4 text-gray-800">{ticket.type}</td>
                    <td className="px-6 py-4 text-gray-600">{ticket.description}</td>
                    <td className="px-6 py-4 text-gray-600">{ticket.scheduledDate}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{ticket.cost > 0 ? `${ticket.cost.toLocaleString()}₫` : '-'}</td>
                    <td className="px-6 py-4">{getStatusBadge(ticket.status)}</td>
                    <td className="px-6 py-4">
                      {ticket.alertTask ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-[#2563eb] hover:underline cursor-pointer font-medium text-[12px]">{ticket.alertTask}</span>
                          <span className={`text-[10px] uppercase font-bold ${ticket.alertTaskStatus === 'In Progress' ? 'text-blue-600' : ticket.alertTaskStatus === 'Finished' ? 'text-green-600' : 'text-gray-500'}`}>{ticket.alertTaskStatus}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-[12px]">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => { setEditingTicket(ticket); setShowModal(true); }}
                        className="px-3 py-1 bg-white border border-gray-200 rounded text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      No maintenance tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">{editingTicket ? 'Edit Maintenance Task' : 'Create Maintenance Task'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">License Plate</label>
                  <input type="text" defaultValue={editingTicket?.licensePlate || ''} id="ticLicenseInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="e.g. 51C-812.44" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Maintenance Type</label>
                  <select defaultValue={editingTicket?.type || 'Periodic'} id="ticTypeInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]">
                    <option value="Periodic">Periodic</option>
                    <option value="Repair">Repair</option>
                    <option value="Inspection">Inspection</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Description</label>
                  <textarea defaultValue={editingTicket?.description || ''} id="ticDescInput" rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="Describe the maintenance tasks..."></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Scheduled Date</label>
                    <input type="date" defaultValue={editingTicket?.scheduledDate ? editingTicket.scheduledDate.split('/').reverse().join('-') : ''} id="ticDateInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Cost (VND)</label>
                    <input type="number" defaultValue={editingTicket?.cost || 0} id="ticCostInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                  </div>
                </div>
                {editingTicket && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Status</label>
                    <select defaultValue={editingTicket.status} id="ticStatusInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]">
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100">Cancel</button>
                <button onClick={() => {
                   const licenseInput = document.getElementById('ticLicenseInput') as HTMLInputElement;
                   const typeInput = document.getElementById('ticTypeInput') as HTMLSelectElement;
                   const descInput = document.getElementById('ticDescInput') as HTMLTextAreaElement;
                   const dateInput = document.getElementById('ticDateInput') as HTMLInputElement;
                   const costInput = document.getElementById('ticCostInput') as HTMLInputElement;
                   const statusInput = document.getElementById('ticStatusInput') as HTMLSelectElement;
                   
                   const formatDate = (dateStr: string) => {
                     if (!dateStr) return '';
                     const parts = dateStr.split('-');
                     return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : dateStr;
                   };

                   const newTicket = {
                      id: editingTicket?.id || Date.now().toString(),
                      ticketNo: editingTicket?.ticketNo || `MT-${Math.floor(1000 + Math.random() * 9000)}`,
                      licensePlate: licenseInput.value,
                      type: typeInput.value,
                      description: descInput.value,
                      scheduledDate: formatDate(dateInput.value),
                      cost: parseInt(costInput.value) || 0,
                      status: statusInput ? statusInput.value : 'Pending'
                   };
                   
                   let newTickets = [...tickets];
                   if (editingTicket) {
                      newTickets = newTickets.map(t => t.id === editingTicket.id ? newTicket : t);
                   } else {
                      newTickets.unshift(newTicket);
                   }
                   setTickets(newTickets);
                   setShowModal(false);
                }} className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">Save Task</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
