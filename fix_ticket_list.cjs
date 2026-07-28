const fs = require('fs');
let content = fs.readFileSync('src/TicketContentListView.tsx', 'utf8');

const targetStr = `const templates = [
    { id: '1', ticketType: 'Delivery Delayed', updatedAt: '07/07/2026' },
    { id: '2', ticketType: 'DCR Failure', updatedAt: '07/07/2026' },
    { id: '3', ticketType: 'FAD Failure', updatedAt: '07/07/2026' }
  ];`;

const overrideSection = `const templates = [
    { id: '1', ticketType: 'Delivery Delayed', country: 'Vietnam (VN)', stateProvince: 'All', store: 'All', updatedAt: '07/07/2026' },
    { id: '2', ticketType: 'DCR Failure', country: 'Vietnam (VN)', stateProvince: 'Ho Chi Minh', store: 'All', updatedAt: '07/07/2026' },
    { id: '3', ticketType: 'FAD Failure', country: 'Vietnam (VN)', stateProvince: 'All', store: 'Van Store', updatedAt: '07/07/2026' }
  ];`;

content = content.replace(targetStr, overrideSection);

const tableHeaderStr = `<tr>
              <th className="px-4 py-3 border-r border-gray-200">Ticket Type</th>
              <th className="px-4 py-3 border-r border-gray-200 w-48">Last Updated</th>
              <th className="px-4 py-3 text-center w-28">Action</th>
            </tr>`;

const newTableHeader = `<tr>
              <th className="px-4 py-3 border-r border-gray-200">Ticket Type</th>
              <th className="px-4 py-3 border-r border-gray-200">Country</th>
              <th className="px-4 py-3 border-r border-gray-200">State / Province</th>
              <th className="px-4 py-3 border-r border-gray-200">Store</th>
              <th className="px-4 py-3 border-r border-gray-200 w-48">Last Updated</th>
              <th className="px-4 py-3 text-center w-28">Action</th>
            </tr>`;
content = content.replace(tableHeaderStr, newTableHeader);

const tableBodyStr = `<td className="px-4 py-3 border-r border-gray-100 font-bold text-[#1b4d3e]">{tpl.ticketType}</td>
                <td className="px-4 py-3 border-r border-gray-100 text-gray-500">{tpl.updatedAt}</td>`;

const newTableBody = `<td className="px-4 py-3 border-r border-gray-100 font-bold text-[#1b4d3e]">{tpl.ticketType}</td>
                <td className="px-4 py-3 border-r border-gray-100 text-gray-700">{tpl.country}</td>
                <td className="px-4 py-3 border-r border-gray-100 text-gray-700">
                  {tpl.stateProvince === 'All' ? <span className="text-gray-400 italic">All States</span> : tpl.stateProvince}
                </td>
                <td className="px-4 py-3 border-r border-gray-100 text-gray-700">
                  {tpl.store === 'All' ? <span className="text-gray-400 italic">All Stores</span> : tpl.store}
                </td>
                <td className="px-4 py-3 border-r border-gray-100 text-gray-500">{tpl.updatedAt}</td>`;
content = content.replace(tableBodyStr, newTableBody);

fs.writeFileSync('src/TicketContentListView.tsx', content);
console.log('src/TicketContentListView.tsx updated');
