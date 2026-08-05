const fs = require('fs');
let content = fs.readFileSync('src/VehicleSettingsView.tsx', 'utf-8');

// 1. Add import for VehiclePurposeConfig
content = content.replace(
  "import { VehicleTypeConfig, DocumentTypeThreshold } from '../types';",
  "import { VehicleTypeConfig, DocumentTypeThreshold, VehiclePurposeConfig } from '../types';"
);

// 2. Change activeTab type
content = content.replace(
  "useState<'vehicleType' | 'docThreshold'>('vehicleType');",
  "useState<'vehicleType' | 'docThreshold' | 'vehiclePurpose'>('vehicleType');"
);

// 3. Add vehiclePurposes state
const purposeState = `  // MOCK DATA FOR VEHICLE PURPOSES
  const [vehiclePurposes, setVehiclePurposes] = useState<VehiclePurposeConfig[]>([
    { id: '1', code: 'VP-DELIVERY', name: 'Delivery', description: 'Used for regular delivery operations' },
    { id: '2', code: 'VP-TRANSFER', name: 'Transfer', description: 'Used for internal transfer between stores' },
    { id: '3', code: 'VP-MAINTENANCE', name: 'Maintenance', description: 'Used for maintenance service' },
  ]);
  const [editingPurpose, setEditingPurpose] = useState<Partial<VehiclePurposeConfig>>({});
  const [showPurposeForm, setShowPurposeForm] = useState(true);

`;
content = content.replace(
  "  // MOCK DATA FOR DOC THRESHOLDS",
  purposeState + "  // MOCK DATA FOR DOC THRESHOLDS"
);

// 4. Add tab button
const purposeTabBtn = `        <button 
          className={\`py-4 text-[13px] font-bold border-b-2 transition-colors \${activeTab === 'vehiclePurpose' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}\`}
          onClick={() => setActiveTab('vehiclePurpose')}
        >
          MD • Vehicle Purpose
        </button>
`;
content = content.replace(
  "        <button \n          className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'docThreshold' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}\n          onClick={() => setActiveTab('docThreshold')}\n        >\n          MD • Document Type & Threshold\n        </button>\n      </div>",
  "        <button \n          className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'docThreshold' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}\n          onClick={() => setActiveTab('docThreshold')}\n        >\n          MD • Document Type & Threshold\n        </button>\n" + purposeTabBtn + "      </div>"
);

// 5. Add tab content
const purposeTabContent = `        {activeTab === 'vehiclePurpose' && (
          <>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-[#1b4d3e] mb-2">Master Data • Vehicle Purposes</h1>
              <p className="text-sm text-gray-600">Manage the purposes for which vehicles are used in the fleet.</p>
            </div>
            
            <div className="bg-indigo-50 text-indigo-800 p-4 rounded-lg text-[13px] border border-indigo-100 flex items-start gap-2">
              <i className="fa-solid fa-circle-info mt-0.5"></i>
              <div>
                <strong>Information:</strong> Defining vehicle purposes helps categorize fleet usage and reporting.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* List Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">Vehicle Purposes List</h3>
                      <span className="text-[12px] text-gray-400">{vehiclePurposes.length} purposes</span>
                   </div>
                </div>
                <div className="overflow-x-auto p-0">
                  <table className="w-full text-left text-[13px]">
                    <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 font-bold">Code</th>
                        <th className="px-6 py-4 font-bold">Name</th>
                        <th className="px-6 py-4 font-bold">Description</th>
                        <th className="px-6 py-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {vehiclePurposes.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4 font-medium text-gray-800">{p.code}</td>
                          <td className="px-6 py-4 font-medium text-gray-800">{p.name}</td>
                          <td className="px-6 py-4 text-gray-600">{p.description}</td>
                          <td className="px-6 py-4 text-right">
                             <button onClick={() => { setEditingPurpose(p); setShowPurposeForm(true); }} className="text-[#2563eb] hover:text-blue-800 text-[13px] font-medium transition-colors">
                               Edit
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Form Panel */}
              <div>
                {showPurposeForm ? (
                  <div className="bg-white rounded-xl shadow-sm border border-[#2563eb]/20 p-6 flex flex-col relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#2563eb]"></div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900">{editingPurpose.id ? 'Edit Vehicle Purpose' : 'Create Vehicle Purpose'}</h3>
                      <button onClick={() => setShowPurposeForm(false)} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-xmark text-lg"></i>
                      </button>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="space-y-1">
                        <label className="text-[13px] font-bold text-gray-700">Code <span className="text-red-500">*</span></label>
                        <input value={editingPurpose.code || ''} onChange={e => setEditingPurpose({...editingPurpose, code: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" placeholder="e.g. VP-DELIVERY" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[13px] font-bold text-gray-700">Name <span className="text-red-500">*</span></label>
                        <input value={editingPurpose.name || ''} onChange={e => setEditingPurpose({...editingPurpose, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" placeholder="e.g. Delivery" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[13px] font-bold text-gray-700">Description</label>
                        <input value={editingPurpose.description || ''} onChange={e => setEditingPurpose({...editingPurpose, description: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" placeholder="Description..." />
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setShowPurposeForm(false)} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors">
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          if (!editingPurpose.code || !editingPurpose.name) {
                            alert('Code and Name are required.');
                            return;
                          }
                          const newPurpose = {
                            id: editingPurpose.id || Date.now().toString(),
                            code: editingPurpose.code || '',
                            name: editingPurpose.name || '',
                            description: editingPurpose.description || ''
                          };
                          let newPurposes = [...vehiclePurposes];
                          if (editingPurpose.id) {
                            newPurposes = newPurposes.map(p => p.id === newPurpose.id ? newPurpose : p);
                          } else {
                            newPurposes.push(newPurpose);
                          }
                          setVehiclePurposes(newPurposes);
                          setShowPurposeForm(false);
                          setEditingPurpose({});
                        }}
                        className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <i className="fa-solid fa-floppy-disk"></i> Save Purpose
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full bg-white rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                    <div className="w-12 h-12 bg-blue-50 text-[#2563eb] rounded-full flex items-center justify-center text-xl mb-4">
                      <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Select a Purpose to Edit</h3>
                    <p className="text-[13px] text-gray-500 mb-4 max-w-[250px]">Click Edit on a purpose in the list, or create a new one.</p>
                    <button 
                      onClick={() => { setEditingPurpose({}); setShowPurposeForm(true); }}
                      className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <i className="fa-solid fa-plus"></i> Create New Purpose
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
`;

content = content.replace(
  "        {activeTab === 'docThreshold' && (",
  purposeTabContent + "\n        {activeTab === 'docThreshold' && ("
);

fs.writeFileSync('src/VehicleSettingsView.tsx', content);
