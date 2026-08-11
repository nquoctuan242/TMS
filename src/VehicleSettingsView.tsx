import React, { useState } from 'react';
import { VehicleTypeConfig, DocumentTypeThreshold, VehiclePurposeConfig } from '../types';

export function VehicleSettingsView() {
  const [activeTab, setActiveTab] = useState<'vehicleType' | 'docThreshold' | 'vehiclePurpose'>('vehicleType');
  
  // MOCK DATA FOR VEHICLE TYPES
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypeConfig[]>([
    { id: '1', code: 'TX-CON', name: 'Car', unit: 'Seats', maintenanceCycle: '10,000 km', description: '' },
    { id: '2', code: 'TX-TAI', name: 'Truck', unit: 'Tons', maintenanceCycle: '15,000 km', description: '' },
    { id: '3', code: 'TX-DK', name: 'Tractor Trailer', unit: 'Tons', maintenanceCycle: '20,000 km', description: '' },
    { id: '4', code: 'TX-BAN', name: 'Pickup Truck', unit: 'Tons', maintenanceCycle: '12,000 km', description: '' },
    { id: '5', code: 'TX-KHACH', name: 'Passenger Bus', unit: 'Seats', maintenanceCycle: '10,000 km', description: '' }
  ]);
  const [editingType, setEditingType] = useState<Partial<VehicleTypeConfig>>({});
  const [showTypeForm, setShowTypeForm] = useState(true);

  // MOCK DATA FOR VEHICLE PURPOSES
  const [vehiclePurposes, setVehiclePurposes] = useState<VehiclePurposeConfig[]>([
    { id: '1', code: 'VP-DELIVERY', name: 'Delivery', description: 'Used for regular delivery operations' },
    { id: '2', code: 'VP-TRANSFER', name: 'Transfer', description: 'Used for internal transfer between stores' },
    { id: '3', code: 'VP-MAINTENANCE', name: 'Maintenance', description: 'Used for maintenance service' },
  ]);
  const [editingPurpose, setEditingPurpose] = useState<Partial<VehiclePurposeConfig>>({});
  const [showPurposeForm, setShowPurposeForm] = useState(true);

  // MOCK DATA FOR DOC THRESHOLDS
  const [docThresholds, setDocThresholds] = useState<DocumentTypeThreshold[]>([
    { id: '1', documentType: 'Vehicle Inspection', group: 'Legal', blockVehicleOnExpiry: true, reminder1Days: 30, reminder2Days: 15, escalateDays: 7, blockDays: 0 },
    { id: '2', documentType: 'Civil Liability Insurance', group: 'Legal', blockVehicleOnExpiry: true, reminder1Days: 30, reminder2Days: 15, escalateDays: 7, blockDays: 0 },
    { id: '3', documentType: 'Transport Badge', group: 'Legal', blockVehicleOnExpiry: true, reminder1Days: 30, reminder2Days: 15, escalateDays: 7, blockDays: 0 },
    { id: '4', documentType: 'Transport Business License', group: 'Legal', blockVehicleOnExpiry: false, reminder1Days: 30, reminder2Days: 15, escalateDays: 7, blockDays: 0 },
    { id: '5', documentType: 'Physical Damage Insurance', group: 'Financial', blockVehicleOnExpiry: false, reminder1Days: 30, reminder2Days: 15, escalateDays: 7, blockDays: 0 }
  ]);
  const [selectedThreshold, setSelectedThreshold] = useState<DocumentTypeThreshold>({
    id: '',
    documentType: '',
    group: 'Legal',
    blockVehicleOnExpiry: true,
    reminder1Days: 30,
    reminder2Days: 15,
    escalateDays: 7,
    blockDays: 0
  });

  return (
    <div className="bg-[#f0f2f5] min-h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Top Tabs Navigation */}
      <div className="bg-white border-b px-6 flex items-center gap-6">
        <button 
          className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'vehicleType' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('vehicleType')}
        >
          MD • Vehicle Type
        </button>
        <button 
          className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'docThreshold' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('docThreshold')}
        >
          MD • Document Type & Threshold
        </button>
        <button 
          className={`py-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'vehiclePurpose' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('vehiclePurpose')}
        >
          MD • Vehicle Purpose
        </button>
      </div>

      <div className="flex-1 p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {activeTab === 'vehicleType' && (
          <>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-[#1b4d3e] mb-2">Master Data • Vehicle Types & Specifications</h1>
              <p className="text-sm text-gray-600">The foundational step. Every vehicle declared must select a type from here, inheriting the load unit and default maintenance cycle.</p>
            </div>
            
            <div className="bg-indigo-50 text-indigo-800 p-4 rounded-lg text-[13px] border border-indigo-100 flex items-start gap-2">
              <i className="fa-solid fa-circle-info mt-0.5"></i>
              <div>
                <strong>Why do this first:</strong> Without vehicle types, the vehicle declaration screen has nothing to select. The default maintenance cycle set here will apply to all vehicles of the same type.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* List Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">Vehicle Types List</h3>
                      <span className="text-[12px] text-gray-400">{vehicleTypes.length} types</span>
                   </div>

                </div>
                <div className="overflow-x-auto p-0">
                  <table className="w-full text-left text-[13px]">
                    <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 font-bold">Code</th>
                        <th className="px-6 py-4 font-bold">Type Name</th>
                        <th className="px-6 py-4 font-bold">Unit</th>
                        <th className="px-6 py-4 font-bold">Maint. Cycle</th>
                        <th className="px-6 py-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {vehicleTypes.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4 font-medium text-gray-800">{t.code}</td>
                          <td className="px-6 py-4 font-medium text-gray-800">{t.name}</td>
                          <td className="px-6 py-4 text-gray-600">{t.unit}</td>
                          <td className="px-6 py-4 font-medium text-gray-800">{t.maintenanceCycle}</td>
                          <td className="px-6 py-4 text-right">
                             <button onClick={() => { setEditingType(t); setShowTypeForm(true); }} className="text-[#2563eb] hover:text-blue-800 text-[13px] font-medium transition-colors">
                               Edit
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-fit">
                 <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">{editingType.id ? 'Edit Vehicle Type' : 'Add Vehicle Type'}</h3>
                 </div>
                 {showTypeForm ? (
                    <div className="p-6 flex flex-col gap-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <label className="text-[12px] font-medium text-gray-600">Type Code</label>
                             <input value={editingType.code || ''} onChange={e => setEditingType({...editingType, code: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[12px] font-medium text-gray-600">Type Name</label>
                             <input value={editingType.name || ''} onChange={e => setEditingType({...editingType, name: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[12px] font-medium text-gray-600">Measurement Unit</label>
                             <input value={editingType.unit || ''} onChange={e => setEditingType({...editingType, unit: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[12px] font-medium text-gray-600">Default Maintenance Cycle</label>
                             <input value={editingType.maintenanceCycle || ''} onChange={e => setEditingType({...editingType, maintenanceCycle: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" />
                          </div>
                       </div>
                       <div className="space-y-1">
                           <label className="text-[12px] font-medium text-gray-600">Description</label>
                           <input placeholder="Internal note (optional)..." value={editingType.description || ''} onChange={e => setEditingType({...editingType, description: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" />
                       </div>
                       
                       <div className="flex gap-3 mt-2">
                           <button onClick={() => {
                               if (editingType.id) {
                                   setVehicleTypes(vehicleTypes.map(t => t.id === editingType.id ? editingType as VehicleTypeConfig : t));
                               } else {
                                   setVehicleTypes([...vehicleTypes, { ...editingType, id: Date.now().toString() } as VehicleTypeConfig]);
                               }
                               setEditingType({});
                               alert('Vehicle type saved!');
                           }} className="bg-[#2563eb] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm">
                              Save Type
                           </button>
                           <button onClick={() => setEditingType({})} className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors">
                              Clear Form
                           </button>

                       </div>

                       <div className="mt-4 bg-purple-50 text-purple-800 p-4 rounded-lg text-[12px] border border-purple-100 flex items-start gap-2">
                          <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
                          <div>
                            <strong>Note:</strong> Cannot delete a vehicle type when vehicles are assigned to it — must transfer vehicles to another type first.
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="p-8 text-center text-gray-400 text-sm">
                       Select a vehicle type to edit or create a new one.
                    </div>
                 )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'vehiclePurpose' && (
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
                      <button onClick={() => setEditingPurpose({})} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors">
                        Clear Form
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

        {activeTab === 'docThreshold' && (
          <>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-[#1b4d3e] mb-2">Master Data • Document Types & Warning Thresholds</h1>
              <p className="text-sm text-gray-600">Declare document types and set thresholds for the TMS warning engine to know when to remind, when to escalate, when to block the vehicle.</p>
            </div>
            
            <div className="bg-purple-50 text-purple-800 p-4 rounded-lg text-[13px] border border-purple-100 flex items-start gap-2">
              <i className="fa-solid fa-link mt-0.5 text-purple-600"></i>
              <div>
                <strong className="text-purple-900">Engine connection:</strong> The thresholds set here are the parameters the warning engine uses to calculate "expiring / expired" and decide actions on the vehicle. Editing the threshold changes the warning behavior system-wide.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* List Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">Document Types</h3>
                      <span className="text-[12px] text-gray-400">{docThresholds.length} types</span>
                   </div>

                </div>
                <div className="overflow-x-auto p-0">
                  <table className="w-full text-left text-[13px]">
                    <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 font-bold">Document Type</th>
                        <th className="px-6 py-4 font-bold">Group</th>
                        <th className="px-6 py-4 font-bold">Block Vehicle On Expiry</th>
                        <th className="px-6 py-4 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {docThresholds.map(t => (
                        <tr key={t.id} onClick={() => setSelectedThreshold(t)} className={`cursor-pointer transition-colors group ${selectedThreshold.id === t.id ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}>
                          <td className="px-6 py-4 font-medium text-gray-800">{t.documentType}</td>
                          <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${t.group === 'Legal' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                {t.group}
                              </span>
                          </td>
                          <td className="px-6 py-4">
                             {t.blockVehicleOnExpiry ? (
                               <span className="text-red-600 font-medium flex items-center gap-1.5 text-[12px]"><i className="fa-solid fa-circle text-[6px]"></i> Yes</span>
                             ) : (
                               <span className="text-gray-500 font-medium flex items-center gap-1.5 text-[12px]"><i className="fa-solid fa-circle text-[6px] text-gray-300"></i> No</span>
                             )}
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button className="text-[#2563eb] hover:text-blue-800 text-[13px] font-medium transition-colors">
                               Edit
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Threshold Config Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-fit">
                 <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">{selectedThreshold.id ? 'Threshold Configuration • ' + selectedThreshold.documentType : 'Add Document Type & Threshold'}</h3>
                 </div>
                 
                 <div className="p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-4 mb-4">
                       <div className="space-y-1">
                          <label className="text-[12px] font-medium text-gray-600">Document Type Name</label>
                          <input 
                            value={selectedThreshold.documentType || ''} 
                            onChange={(e) => setSelectedThreshold({...selectedThreshold, documentType: e.target.value})} 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]" 
                            placeholder="e.g. Transport Badge"
                          />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <label className="text-[12px] font-medium text-gray-600">Group</label>
                             <select 
                               value={selectedThreshold.group || 'Legal'} 
                               onChange={(e) => setSelectedThreshold({...selectedThreshold, group: e.target.value})} 
                               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]"
                             >
                               <option value="Legal">Legal</option>
                               <option value="Financial">Financial</option>
                             </select>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[12px] font-medium text-gray-600">Block Vehicle on Expiry</label>
                             <select 
                               value={selectedThreshold.blockVehicleOnExpiry ? 'yes' : 'no'} 
                               onChange={(e) => setSelectedThreshold({...selectedThreshold, blockVehicleOnExpiry: e.target.value === 'yes'})} 
                               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#2563eb]"
                             >
                               <option value="yes">Yes</option>
                               <option value="no">No</option>
                             </select>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col gap-5 border-t border-gray-100 pt-6">
                       <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                          <span className="text-[13px] font-medium text-gray-700">Reminder 1 (expiring soon)</span>
                          <div className="flex items-center gap-2">
                             <span className="text-[12px] text-gray-500">before</span>
                             <input type="number" value={selectedThreshold.reminder1Days} onChange={(e) => setSelectedThreshold({...selectedThreshold, reminder1Days: parseInt(e.target.value)})} className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-[13px] outline-none focus:border-[#2563eb]" />
                             <span className="text-[12px] text-gray-500">days</span>
                          </div>
                       </div>
                       
                       <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                          <span className="text-[13px] font-medium text-gray-700">Reminder 2</span>
                          <div className="flex items-center gap-2">
                             <span className="text-[12px] text-gray-500">before</span>
                             <input type="number" value={selectedThreshold.reminder2Days} onChange={(e) => setSelectedThreshold({...selectedThreshold, reminder2Days: parseInt(e.target.value)})} className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-[13px] outline-none focus:border-[#2563eb]" />
                             <span className="text-[12px] text-gray-500">days</span>
                          </div>
                       </div>

                       <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                          <span className="text-[13px] font-medium text-gray-700">Escalate to manager</span>
                          <div className="flex items-center gap-2">
                             <span className="text-[12px] text-gray-500">before</span>
                             <input type="number" value={selectedThreshold.escalateDays} onChange={(e) => setSelectedThreshold({...selectedThreshold, escalateDays: parseInt(e.target.value)})} className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-[13px] outline-none focus:border-[#2563eb]" />
                             <span className="text-[12px] text-gray-500">days</span>
                          </div>
                       </div>

                       <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                          <span className="text-[13px] font-medium text-gray-700">Block dispatch</span>
                          <div className="flex items-center gap-2">
                             <span className="text-[12px] text-gray-500">overdue</span>
                             <input type="number" value={selectedThreshold.blockDays} onChange={(e) => setSelectedThreshold({...selectedThreshold, blockDays: parseInt(e.target.value)})} className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-[13px] outline-none focus:border-[#2563eb]" />
                             <span className="text-[12px] text-gray-500">days</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button onClick={() => {
                            if (!selectedThreshold.documentType) {
                                alert('Please enter Document Type Name');
                                return;
                            }
                            if (selectedThreshold.id) {
                                setDocThresholds(docThresholds.map(t => t.id === selectedThreshold.id ? selectedThreshold : t));
                            } else {
                                const newThreshold = { ...selectedThreshold, id: Date.now().toString() };
                                setDocThresholds([...docThresholds, newThreshold]);
                            }
                            setSelectedThreshold({
                                id: '',
                                documentType: '',
                                group: 'Legal',
                                blockVehicleOnExpiry: true,
                                reminder1Days: 30,
                                reminder2Days: 15,
                                escalateDays: 7,
                                blockDays: 0
                            });
                            alert('Thresholds saved successfully!');
                        }} className="bg-[#2563eb] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm">
                           Save Thresholds
                        </button>
                        <button onClick={() => setSelectedThreshold({
                            id: '',
                            documentType: '',
                            group: 'Legal',
                            blockVehicleOnExpiry: true,
                            reminder1Days: 30,
                            reminder2Days: 15,
                            escalateDays: 7,
                            blockDays: 0
                        })} className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors">
                           Clear Form
                        </button>

                    </div>

                    <div className="mt-2 bg-purple-50 text-purple-800 p-4 rounded-lg text-[12px] border border-purple-100 flex items-start gap-2">
                       <div>
                         <strong className="text-purple-900">Apply:</strong> Thresholds apply per document type. Types with "Block vehicle = No" (e.g. Transport Business License) only remind, do not block dispatch.
                       </div>
                    </div>

                 </div>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
