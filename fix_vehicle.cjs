const fs = require('fs');

let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

// 1. Documents view: add Issue Date
// Table Header
content = content.replace(
  /<th className="px-6 py-4 font-bold">Expiration Date<\/th>/,
  '<th className="px-6 py-4 font-bold">Issue Date</th>\n                        <th className="px-6 py-4 font-bold">Expiration Date</th>'
);

// Table Body
content = content.replace(
  /<td className="px-6 py-4 text-gray-600">\{doc.expirationDate\}<\/td>/,
  '<td className="px-6 py-4 text-gray-600">{doc.issueDate || \'N/A\'}</td>\n                          <td className="px-6 py-4 text-gray-600">{doc.expirationDate}</td>'
);

// Mock Data
content = content.replace(
  /\{ id: '1', type: 'Vehicle Inspection'/,
  "{ id: '1', type: 'Vehicle Inspection', issueDate: '10/09/2025'"
);
content = content.replace(
  /\{ id: '2', type: 'Civil Liability Insurance'/,
  "{ id: '2', type: 'Civil Liability Insurance', issueDate: '01/03/2026'"
);
content = content.replace(
  /\{ id: '3', type: 'Transport Badge'/,
  "{ id: '3', type: 'Transport Badge', issueDate: '20/07/2025'"
);
content = content.replace(
  /\{ id: '4', type: 'Transport Business License'/,
  "{ id: '4', type: 'Transport Business License', issueDate: '12/12/2027'"
);

// Modal fields for Document
const docIssueDateInput = `              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Issue Date</label>
                <input 
                  type="date"
                  defaultValue={editingDoc?.issueDate ? editingDoc.issueDate.split('/').reverse().join('-') : ''}
                  id="docIssueInput"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Expiration Date</label>`;

content = content.replace(
  /<div className="space-y-1">\s*<label className="text-xs font-bold text-gray-700">Expiration Date<\/label>/,
  docIssueDateInput
);

// 2. Vehicle Information: add Fuel Quota
const fuelQuotaField = `                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Fuel Quota</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.fuelQuota || '15L / 100km'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Ownership</span>`;

content = content.replace(
  /<div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">\s*<span className="text-\[13px\] text-gray-500">Ownership<\/span>/,
  fuelQuotaField
);

// 3. Vehicle Status: add Edit Status functionality
const statusSectionOld = `            {/* Vehicle Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-6">Vehicle Status</h3>`;

const statusSectionNew = `            {/* Vehicle Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Vehicle Status</h3>
                <button 
                  onClick={() => setShowStatusModal(true)}
                  className="text-xs font-bold text-[#2563eb] hover:text-blue-700 flex items-center gap-1"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit Profile
                </button>
              </div>`;

content = content.replace(statusSectionOld, statusSectionNew);

// Add state for showStatusModal
content = content.replace(
  /const \[showEditModal, setShowEditModal\] = useState\(false\);/,
  "const [showEditModal, setShowEditModal] = useState(false);\n  const [showStatusModal, setShowStatusModal] = useState(false);"
);

// Add Status Modal markup
const statusModalMarkup = `      {/* Status Edit Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Vehicle Profile</h3>
              <button onClick={() => setShowStatusModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Current Mileage (km)</label>
                <input 
                  type="number"
                  value={formData.currentMileage}
                  onChange={(e) => setFormData({...formData, currentMileage: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Remaining Value (VND)</label>
                <input 
                  type="number"
                  value={formData.remainingValue}
                  onChange={(e) => setFormData({...formData, remainingValue: parseInt(e.target.value) || 0})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" 
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50/50 rounded-b-xl">
              <button 
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowStatusModal(false)}
                className="px-6 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-bold hover:bg-blue-600 shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}`;

content = content.replace(/\{\/\* Document Modal \*\/\}/, statusModalMarkup);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
console.log("Updated VehicleDetailView.tsx");
