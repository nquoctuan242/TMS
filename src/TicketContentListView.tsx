import React from 'react';

export function TicketContentListView({ onRowClick, onCreateClick }: { onRowClick: (id: string) => void, onCreateClick: () => void }) {
  const templates = [
    { id: '1', ticketType: 'Delivery Delayed', updatedAt: '07/07/2026' },
    { id: '2', ticketType: 'DCR Failure', updatedAt: '07/07/2026' },
    { id: '3', ticketType: 'FAD Failure', updatedAt: '07/07/2026' }
  ];

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Automated Ticket Content Templates</h2>
        <button 
          onClick={onCreateClick}
          className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2 shadow-sm"
        >
          <i className="fa-solid fa-plus"></i> Create Template
        </button>
      </div>

      <div className="p-4 overflow-x-auto flex-1">
        <table className="w-full text-left text-[12px] bg-white border border-gray-200">
          <thead className="bg-[#f8fafc] text-gray-600 font-bold border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 border-r border-gray-200">Ticket Type</th>
              <th className="px-4 py-3 border-r border-gray-200 w-48">Last Updated</th>
              <th className="px-4 py-3 text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {templates.map(tpl => (
              <tr key={tpl.id} className="hover:bg-blue-50/50 transition-colors cursor-pointer group" onClick={() => onRowClick(tpl.id)}>
                <td className="px-4 py-3 border-r border-gray-100 font-bold text-[#1b4d3e]">{tpl.ticketType}</td>
                <td className="px-4 py-3 border-r border-gray-100 text-gray-500">{tpl.updatedAt}</td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-500 hover:text-blue-700 font-medium flex items-center justify-center gap-1 mx-auto transition-colors group-hover:scale-105">
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
           <i className="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
           <div className="text-xs text-blue-800">
             <p className="font-bold mb-1">How Automated Tickets Work</p>
             <p>When system events match the configured ticket types, a new ticket is automatically created using the template configurations defined here. Shippers will receive notifications on their Mobile App to provide explanations based on these setups.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
