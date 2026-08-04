import React, { useState } from 'react';

export function VehicleDocumentsView() {
  const [activeTab, setActiveTab] = useState('All');

  const [docs, setDocs] = useState<any[]>([
    { id: '1', licensePlate: '51C-812.44', type: 'Transport Badge', docNo: 'PH-2024-0912', issueDate: '20/07/2025', expiration: '20/07/2026', remaining: -7, status: 'Expired', hasScan: false, alertTask: 'TSK-1029', alertTaskStatus: 'In Progress' },
    { id: '2', licensePlate: '60A-337.19', type: 'Vehicle Inspection', docNo: 'DK-8841122', issueDate: '22/01/2026', expiration: '22/07/2026', remaining: -5, status: 'Expired', hasScan: true, alertTask: 'TSK-1031', alertTaskStatus: 'In Progress' },
    { id: '3', licensePlate: '51C-812.44', type: 'Vehicle Inspection', docNo: 'DK-7712095', issueDate: '10/03/2026', expiration: '10/09/2026', remaining: 45, status: 'Expiring soon', hasScan: true, alertTask: 'TSK-1102', alertTaskStatus: 'Finished' },
    { id: '4', licensePlate: '29H-551.02', type: 'Civil Liability Insurance', docNo: 'BH-KD-33410', issueDate: '28/08/2025', expiration: '28/08/2026', remaining: 32, status: 'Expiring soon', hasScan: true },
    { id: '5', licensePlate: '51C-812.44', type: 'Civil Liability Insurance', docNo: 'BH-KD-90183', issueDate: '01/03/2026', expiration: '01/03/2027', remaining: 217, status: 'Valid', hasScan: true },
    { id: '6', licensePlate: '72B-118.76', type: 'Transport Business License', docNo: 'GP-VT-2211', issueDate: '12/12/2023', expiration: '12/12/2028', remaining: 868, status: 'Valid', hasScan: true }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);

  const getUrgencyBar = (status: string) => {
    switch (status) {
      case 'Expired':
        return <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden flex"><div className="h-full bg-[#d32f2f] w-full rounded-full"></div></div>;
      case 'Expiring soon':
        return <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden flex"><div className="h-full bg-[#d97706] w-1/2 rounded-full"></div></div>;
      case 'Valid':
        return <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden flex"><div className="h-full bg-[#16a34a] w-1/4 rounded-full"></div></div>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Expired':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] bg-red-50 text-red-600 flex items-center gap-1.5 w-fit font-medium"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Expired</span>;
      case 'Expiring soon':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] bg-yellow-50 text-yellow-700 flex items-center gap-1.5 w-fit font-medium"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Expiring soon</span>;
      case 'Valid':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] bg-green-50 text-green-600 flex items-center gap-1.5 w-fit font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Valid</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-full p-6 animate-in fade-in duration-300"><div className="max-w-7xl mx-auto">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-red-600">
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-[13px] text-gray-500 mt-1">Expired</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-yellow-500">
          <div className="text-2xl font-bold text-gray-900">7</div>
          <div className="text-[13px] text-gray-500 mt-1">Expiring soon (≤30 days)</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-green-600">
          <div className="text-2xl font-bold text-gray-900">142</div>
          <div className="text-[13px] text-gray-500 mt-1">Valid</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-blue-500">
          <div className="text-2xl font-bold text-gray-900">5</div>
          <div className="text-[13px] text-gray-500 mt-1">Missing scan</div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="relative flex-1 max-w-xl">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search by license plate, document type..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2563eb]"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg border border-gray-200 p-0.5 shadow-sm">
            {['All', 'Expired', 'Expiring soon', 'Valid'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium transition-colors border-r last:border-r-0 border-gray-200 ${activeTab === tab ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-600 hover:text-gray-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button onClick={() => { setEditingDoc(null); setShowModal(true); }} className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
            <i className="fa-solid fa-plus"></i> Add Document
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <h2 className="font-bold text-gray-900">Fleet Documents List</h2>
          <span className="text-xs text-gray-500">152 documents - sorted by urgency</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-bold">License Plate</th>
                <th className="px-6 py-4 font-bold">Document Type</th>
                <th className="px-6 py-4 font-bold">Document Number</th>
                <th className="px-6 py-4 font-bold">Issue Date</th>
                <th className="px-6 py-4 font-bold">Expiration Date</th>
                <th className="px-6 py-4 font-bold">Remaining</th>
                <th className="px-6 py-4 font-bold">Urgency Level</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Alert Task</th>
                <th className="px-6 py-4 font-bold">Certificate</th>
                <th className="px-6 py-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {docs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 group">
                  <td className="px-6 py-4 font-bold text-gray-900">{doc.licensePlate}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{doc.type}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.docNo}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.issueDate}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.expiration}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.remaining} days</td>
                  <td className="px-6 py-4">{getUrgencyBar(doc.status)}</td>
                  <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                  <td className="px-6 py-4">
                    {doc.alertTask ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-[#2563eb] hover:underline cursor-pointer font-medium text-[12px]">{doc.alertTask}</span>
                        <span className={`text-[10px] uppercase font-bold ${doc.alertTaskStatus === 'In Progress' ? 'text-blue-600' : doc.alertTaskStatus === 'Finished' ? 'text-green-600' : 'text-gray-500'}`}>{doc.alertTaskStatus}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-[12px]">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {doc.hasScan ? (
                      <button className="text-[#2563eb] hover:text-blue-800 font-medium text-[12px] transition-colors">
                        View scan
                      </button>
                    ) : (
                      <span className="text-gray-400 text-[12px]">Missing</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => { setEditingDoc(doc); setShowModal(true); }} className="px-3 py-1 bg-white border border-gray-200 rounded text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Renew
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Scanned Certificate</label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer bg-gray-50 border border-gray-300 border-dashed rounded-lg px-4 py-3 text-center hover:bg-gray-100 transition-colors flex flex-col items-center justify-center">
                    <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-lg mb-1"></i>
                    <span className="text-xs text-gray-500 font-medium">Click to upload file (PDF, JPG)</span>
                    <input type="file" id="docScanInput" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100">Cancel</button>
              <button onClick={() => {
                 const licenseInput = document.getElementById('docLicenseInput') as HTMLInputElement;
                 const typeInput = document.getElementById('docTypeInput') as HTMLSelectElement;
                 const docNoInput = document.getElementById('docNoInput') as HTMLInputElement;
                 const issueInput = document.getElementById('docIssueInput') as HTMLInputElement;
                 const expInput = document.getElementById('docExpInput') as HTMLInputElement;
                 
                 const formatDate = (dateStr) => {
                   if (!dateStr) return '';
                   const parts = dateStr.split('-');
                   return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : dateStr;
                 };

                 const scanInput = document.getElementById('docScanInput') as HTMLInputElement;
                 const newDoc = {
                    id: editingDoc?.id || Date.now().toString(),
                    licensePlate: licenseInput.value,
                    type: typeInput.value,
                    docNo: docNoInput.value,
                    issueDate: formatDate(issueInput.value),
                    expiration: formatDate(expInput.value),
                    remaining: 365,
                    status: 'Valid',
                    hasScan: scanInput?.files?.length ? true : (editingDoc ? editingDoc.hasScan : false)
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
    </div></div>
  );
}
