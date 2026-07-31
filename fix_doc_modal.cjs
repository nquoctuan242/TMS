const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

// 1. Convert mockDocs to state and add Issue Date
const oldMockDocs = `  const mockDocs = [
    { licensePlate: '51C-812.44', type: 'Transport Badge', docNo: 'PH-2024-0912', expiration: '20/07/2026', remaining: -7, status: 'Expired', hasScan: false },
    { licensePlate: '60A-337.19', type: 'Vehicle Inspection', docNo: 'DK-8841122', expiration: '22/07/2026', remaining: -5, status: 'Expired', hasScan: true },
    { licensePlate: '51C-812.44', type: 'Vehicle Inspection', docNo: 'DK-7712095', expiration: '10/09/2026', remaining: 45, status: 'Expiring soon', hasScan: true },
    { licensePlate: '29H-551.02', type: 'Civil Liability Insurance', docNo: 'BH-KD-33410', expiration: '28/08/2026', remaining: 32, status: 'Expiring soon', hasScan: true },
    { licensePlate: '51C-812.44', type: 'Civil Liability Insurance', docNo: 'BH-KD-90183', expiration: '01/03/2027', remaining: 217, status: 'Valid', hasScan: true },
    { licensePlate: '72B-118.76', type: 'Transport Business License', docNo: 'GP-VT-2211', expiration: '12/12/2028', remaining: 868, status: 'Valid', hasScan: true }
  ];`;

const newMockDocs = `  const [docs, setDocs] = useState<any[]>([
    { id: '1', licensePlate: '51C-812.44', type: 'Transport Badge', docNo: 'PH-2024-0912', issueDate: '20/07/2025', expiration: '20/07/2026', remaining: -7, status: 'Expired', hasScan: false },
    { id: '2', licensePlate: '60A-337.19', type: 'Vehicle Inspection', docNo: 'DK-8841122', issueDate: '22/01/2026', expiration: '22/07/2026', remaining: -5, status: 'Expired', hasScan: true },
    { id: '3', licensePlate: '51C-812.44', type: 'Vehicle Inspection', docNo: 'DK-7712095', issueDate: '10/03/2026', expiration: '10/09/2026', remaining: 45, status: 'Expiring soon', hasScan: true },
    { id: '4', licensePlate: '29H-551.02', type: 'Civil Liability Insurance', docNo: 'BH-KD-33410', issueDate: '28/08/2025', expiration: '28/08/2026', remaining: 32, status: 'Expiring soon', hasScan: true },
    { id: '5', licensePlate: '51C-812.44', type: 'Civil Liability Insurance', docNo: 'BH-KD-90183', issueDate: '01/03/2026', expiration: '01/03/2027', remaining: 217, status: 'Valid', hasScan: true },
    { id: '6', licensePlate: '72B-118.76', type: 'Transport Business License', docNo: 'GP-VT-2211', issueDate: '12/12/2023', expiration: '12/12/2028', remaining: 868, status: 'Valid', hasScan: true }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);`;

content = content.replace(oldMockDocs, newMockDocs);

// 2. Add Issue Date column header and body
content = content.replace(
  '<th className="px-6 py-4 font-bold">Expiration Date</th>',
  '<th className="px-6 py-4 font-bold">Issue Date</th>\n                <th className="px-6 py-4 font-bold">Expiration Date</th>'
);

content = content.replace(
  '<td className="px-6 py-4 text-gray-600">{doc.expiration}</td>',
  '<td className="px-6 py-4 text-gray-600">{doc.issueDate}</td>\n                  <td className="px-6 py-4 text-gray-600">{doc.expiration}</td>'
);

// 3. Update table mapping from mockDocs to docs
content = content.replace(
  'mockDocs.map((doc, idx) => (',
  'docs.map((doc, idx) => ('
);

// 4. Update the "Add Document" button to open modal
content = content.replace(
  '<button className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">',
  '<button onClick={() => { setEditingDoc(null); setShowModal(true); }} className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">'
);

// 5. Update the "Renew" button to open modal
content = content.replace(
  '<button className="px-3 py-1 bg-white border border-gray-200 rounded text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">',
  '<button onClick={() => { setEditingDoc(doc); setShowModal(true); }} className="px-3 py-1 bg-white border border-gray-200 rounded text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">'
);

// 6. Add modal at the end before final div closing
const modalHtml = `
      {/* Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">{editingDoc ? 'Renew Document' : 'Add Document'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">License Plate</label>
                <input type="text" defaultValue={editingDoc?.licensePlate || ''} id="docLicenseInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Document Type</label>
                <select defaultValue={editingDoc?.type || 'Transport Badge'} id="docTypeInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]">
                  <option value="Transport Badge">Transport Badge</option>
                  <option value="Vehicle Inspection">Vehicle Inspection</option>
                  <option value="Civil Liability Insurance">Civil Liability Insurance</option>
                  <option value="Transport Business License">Transport Business License</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Document Number</label>
                <input type="text" defaultValue={editingDoc?.docNo || ''} id="docNoInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Issue Date</label>
                  <input type="date" defaultValue={editingDoc?.issueDate ? editingDoc.issueDate.split('/').reverse().join('-') : ''} id="docIssueInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Expiration Date</label>
                  <input type="date" defaultValue={editingDoc?.expiration ? editingDoc.expiration.split('/').reverse().join('-') : ''} id="docExpInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                </div>
              </div>
            </div>
            <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100">Cancel</button>
              <button onClick={() => {
                 const licenseInput = document.getElementById('docLicenseInput');
                 const typeInput = document.getElementById('docTypeInput');
                 const docNoInput = document.getElementById('docNoInput');
                 const issueInput = document.getElementById('docIssueInput');
                 const expInput = document.getElementById('docExpInput');
                 
                 const formatDate = (dateStr) => {
                   if (!dateStr) return '';
                   const parts = dateStr.split('-');
                   return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : dateStr;
                 };

                 const newDoc = {
                    id: editingDoc?.id || Date.now().toString(),
                    licensePlate: licenseInput.value,
                    type: typeInput.value,
                    docNo: docNoInput.value,
                    issueDate: formatDate(issueInput.value),
                    expiration: formatDate(expInput.value),
                    remaining: 365,
                    status: 'Valid',
                    hasScan: false
                 };
                 
                 let newDocs = [...docs];
                 if (editingDoc) {
                    newDocs = newDocs.map(d => d.id === editingDoc.id ? newDoc : d);
                 } else {
                    newDocs.unshift(newDoc);
                 }
                 setDocs(newDocs);
                 setShowModal(false);
              }} className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">Save Document</button>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace(
  '    </div></div>\n  );\n}',
  modalHtml + '    </div></div>\n  );\n}'
);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
