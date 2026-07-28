import React, { useState } from 'react';
import { Vehicle, VehicleDocument } from '../types';

interface VehicleDetailViewProps {
  vehicleId: string | null;
  onBack: () => void;
}

export function VehicleDetailView({ vehicleId, onBack }: VehicleDetailViewProps) {
  const isCreate = !vehicleId;

  // Mock data for the specific layout requested
  const [formData, setFormData] = useState<Vehicle>({
    id: vehicleId || '',
    licensePlate: isCreate ? '' : '51C-812.44',
    makeModel: isCreate ? '' : 'Hyundai Mighty EX8',
    vehicleType: isCreate ? '' : '8-ton Truck',
    source: isCreate ? '' : 'Owned',
    vin: isCreate ? '' : 'RLHXABCD1234567',
    engineNumber: isCreate ? '' : 'D4GA-9911',
    manufactureYear: isCreate ? new Date().getFullYear() : 2022,
    inServiceDate: isCreate ? '' : '15/03/2022',
    department: isCreate ? '' : 'Logistics South',
    status: isCreate ? 'active' : 'blocked',
    statusReason: isCreate ? '' : 'Badge expired 7 days ago. Blocked new dispatch; ongoing transfers still complete.',
    currentMileage: isCreate ? 0 : 142500,
    remainingValue: isCreate ? 0 : 612000000,
    documents: isCreate ? [] : [
      { id: '1', type: 'Vehicle Inspection', expirationDate: '10/09/2026', remainingDays: 45, status: 'expiring', hasScan: true },
      { id: '2', type: 'Civil Liability Insurance', expirationDate: '01/03/2027', remainingDays: 217, status: 'valid', hasScan: true },
      { id: '3', type: 'Transport Badge', expirationDate: '20/07/2026', remainingDays: -7, status: 'expired', hasScan: false },
      { id: '4', type: 'Transport Business License', expirationDate: '12/12/2028', remainingDays: 868, status: 'valid', hasScan: true },
    ],
    drivers: isCreate ? [] : [
      { id: '1', name: 'Trần Văn Bình', role: 'Main driver' },
      { id: '2', name: 'Lê Hoàng Nam', role: 'Relief driver' }
    ]
  });

  const [activeTab, setActiveTab] = useState('documents');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showManageDrivers, setShowManageDrivers] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any>(null);

  const getStatusBadge = (status: VehicleDocument['status']) => {
    switch (status) {
      case 'valid':
        return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Valid</span>;
      case 'expiring':
        return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Expiring soon</span>;
      case 'expired':
        return <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Expired</span>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-[#f0f2f5] min-h-full flex flex-col animate-in fade-in duration-300">
      {/* Document Modal */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">{editingDoc ? 'Update Document' : 'Add Document'}</h3>
              <button onClick={() => setShowDocModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Document Type</label>
                <select 
                  defaultValue={editingDoc?.type || ''} 
                  id="docTypeInput"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" 
                >
                  <option value="" disabled>Select document type...</option>
                  <option value="Vehicle Inspection">Vehicle Inspection</option>
                  <option value="Civil Liability Insurance">Civil Liability Insurance</option>
                  <option value="Transport Badge">Transport Badge</option>
                  <option value="Transport Business License">Transport Business License</option>
                  <option value="Physical Damage Insurance">Physical Damage Insurance</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Expiration Date</label>
                <input 
                  type="date"
                  defaultValue={editingDoc ? editingDoc.expirationDate.split('/').reverse().join('-') : ''}
                  id="docExpInput"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" 
                />
              </div>
              <div className="space-y-1 mt-2">
                <label className="text-xs font-bold text-gray-700 block mb-2">Upload Scan / Certificate</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-400 transition-colors cursor-pointer relative">
                    <i className="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
                    <span className="text-sm font-medium">Click to upload or drag and drop</span>
                    <span className="text-xs">PDF, JPG, PNG (max 5MB)</span>
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                {editingDoc?.hasScan && (
                   <div className="mt-3 flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-700">
                     <i className="fa-solid fa-file-pdf"></i>
                     <span className="flex-1 truncate">current_certificate.pdf</span>
                     <button className="text-blue-500 hover:text-blue-800"><i className="fa-solid fa-xmark"></i></button>
                   </div>
                )}
              </div>
              <div className="mt-2 bg-yellow-50 text-yellow-800 p-3 rounded-lg text-xs border border-yellow-200">
                 <i className="fa-solid fa-clock-rotate-left mr-1"></i>
                 An activity log will be recorded for this action.
              </div>
            </div>
            <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button onClick={() => setShowDocModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100">Cancel</button>
              <button onClick={() => {
                 const typeInput = document.getElementById('docTypeInput') as HTMLInputElement;
                 const expInput = document.getElementById('docExpInput') as HTMLInputElement;
                 
                 const dateStr = expInput.value.split('-').reverse().join('/');
                 if (editingDoc) {
                    const newDocs = formData.documents.map(d => d.id === editingDoc.id ? { ...d, type: typeInput.value, expirationDate: dateStr, hasScan: true } : d);
                    setFormData({...formData, documents: newDocs});
                 } else {
                    const newDoc = {
                       id: Date.now().toString(),
                       type: typeInput.value || 'New Document',
                       expirationDate: dateStr || '01/01/2030',
                       remainingDays: 999,
                       status: 'valid' as any,
                       hasScan: true
                    };
                    setFormData({...formData, documents: [...formData.documents, newDoc]});
                 }
                 setShowDocModal(false);
                 alert('Document saved successfully. Log recorded!');
              }} className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Document</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">License Plate</label>
                <input value={formData.licensePlate} onChange={e => setFormData({...formData, licensePlate: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Make / Model</label>
                <input value={formData.makeModel} onChange={e => setFormData({...formData, makeModel: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Vehicle Type</label>
                <select value={formData.vehicleType} onChange={e => setFormData({...formData, vehicleType: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]">
                  <option value="" disabled>Select vehicle type...</option>
                  <option value="Car (10,000 km)">Car (10,000 km)</option>
                  <option value="Truck (15,000 km)">Truck (15,000 km)</option>
                  <option value="Tractor Trailer (20,000 km)">Tractor Trailer (20,000 km)</option>
                  <option value="Pickup Truck (12,000 km)">Pickup Truck (12,000 km)</option>
                  <option value="Passenger Bus (10,000 km)">Passenger Bus (10,000 km)</option>
                  <option value="8-ton Truck">8-ton Truck (Legacy)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">VIN</label>
                <input value={formData.vin} onChange={e => setFormData({...formData, vin: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Engine Number</label>
                <input value={formData.engineNumber} onChange={e => setFormData({...formData, engineNumber: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Manufacture Year</label>
                <input type="number" value={formData.manufactureYear} onChange={e => setFormData({...formData, manufactureYear: parseInt(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Ownership</label>
                <select value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]">
                  <option value="Owned">Owned</option>
                  <option value="Leased">Leased</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">In-service Date</label>
                <input value={formData.inServiceDate} onChange={e => setFormData({...formData, inServiceDate: e.target.value})} placeholder="DD/MM/YYYY" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#4d9e5f]" />
              </div>
            </div>
            <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100">Cancel</button>
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Drivers Modal */}
      {showManageDrivers && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Manage Drivers</h3>
              <button onClick={() => setShowManageDrivers(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-3">
                {formData.drivers.map((driver, idx) => (
                  <div key={idx} className="flex items-center justify-between border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[13px]">
                        {getInitials(driver.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{driver.name}</span>
                        <span className="text-xs text-gray-500">{driver.role}</span>
                      </div>
                    </div>
                    <button onClick={() => {
                        const newDrivers = formData.drivers.filter((_, i) => i !== idx);
                        setFormData({...formData, drivers: newDrivers});
                    }} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                 <button onClick={() => {
                     const newDriver = { id: Date.now().toString(), name: 'New Driver', role: 'Relief driver' };
                     setFormData({...formData, drivers: [...formData.drivers, newDriver]});
                 }} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                   <i className="fa-solid fa-plus"></i> Add Driver
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-[#1b4d3e] transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">
          {isCreate ? 'Add New Vehicle' : 'Vehicle Details'}
        </h2>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="bg-[#111827] text-white font-mono text-2xl font-bold px-6 py-4 rounded-lg tracking-wider border-2 border-gray-300">
              {formData.licensePlate || 'XX-XXXXX'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">{formData.makeModel || 'Make / Model'}</h1>
              <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-2">
                <span>{formData.vehicleType || 'Vehicle Type'}</span>
                <span>•</span>
                <span>VIN {formData.vin || '...'}</span>
                <span>•</span>
                <span>Year {formData.manufactureYear}</span>
                <span>•</span>
                <span>{formData.source || 'Ownership'}</span>
              </div>

            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowEditModal(true)} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Edit Profile
            </button>
            <button onClick={() => { alert('Saved successfully!'); onBack(); }} className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
              <i className="fa-solid fa-floppy-disk"></i> Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Vehicle Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-bold text-gray-900">Vehicle Information</h3>
                <span className="text-[12px] text-gray-400">Master data</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">License Plate</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.licensePlate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">VIN</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.vin}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Make / Model</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.makeModel}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Engine Number</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.engineNumber}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Vehicle Type</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.vehicleType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Manufacture Year</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.manufactureYear}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">Ownership</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.source}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                  <span className="text-[13px] text-gray-500">In-service Date</span>
                  <span className="text-[13px] font-bold text-gray-900">{formData.inServiceDate}</span>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center border-b border-gray-100 px-2 pt-2">
                <button 
                  className={`px-4 py-3 text-[13px] font-bold border-b-2 flex items-center gap-2 ${activeTab === 'documents' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('documents')}
                >
                  Documents <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-[10px]">4</span>
                </button>
                <button 
                  className={`px-4 py-3 text-[13px] font-bold border-b-2 flex items-center gap-2 ${activeTab === 'maintenance' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('maintenance')}
                >
                  Maintenance <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-[10px]">6</span>
                </button>
                <button 
                  className={`px-4 py-3 text-[13px] font-bold border-b-2 flex items-center gap-2 ${activeTab === 'operations' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('operations')}
                >
                  Operations <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-[10px]">128</span>
                </button>
                <button 
                  className={`px-4 py-3 text-[13px] font-bold border-b-2 flex items-center gap-2 ${activeTab === 'costs' ? 'border-[#2563eb] text-[#2563eb]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('costs')}
                >
                  Costs
                </button>
              </div>

              {activeTab === 'documents' && (
                <div className="p-0 overflow-x-auto">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                     <span className="text-xs text-gray-500"><i className="fa-solid fa-circle-info mr-1"></i> Changes will be automatically logged to vehicle history.</span>
                     <button onClick={() => { setEditingDoc(null); setShowDocModal(true); }} className="text-xs font-bold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                        <i className="fa-solid fa-plus"></i> Add Document
                     </button>
                  </div>
                  <table className="w-full text-left text-[13px]">
                    <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 font-bold">Document Type</th>
                        <th className="px-6 py-4 font-bold">Expiration Date</th>
                        <th className="px-6 py-4 font-bold">Remaining</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Certificate</th>
                        <th className="px-6 py-4 font-bold w-[60px]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {formData.documents.map((doc, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 group">
                          <td className="px-6 py-4 font-medium text-gray-800">{doc.type}</td>
                          <td className="px-6 py-4 text-gray-600">{doc.expirationDate}</td>
                          <td className="px-6 py-4 text-gray-600">{doc.remainingDays} days</td>
                          <td className="px-6 py-4">
                            {getStatusBadge(doc.status)}
                          </td>
                          <td className="px-6 py-4">
                            {doc.hasScan ? (
                              <button className="text-[#2563eb] hover:text-blue-800 font-medium text-[12px] transition-colors">
                                <i className="fa-solid fa-file-pdf mr-1"></i> View scan
                              </button>
                            ) : (
                              <span className="text-gray-400 text-[12px]">Not available</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => { setEditingDoc(doc); setShowDocModal(true); }} className="text-gray-400 hover:text-[#2563eb] transition-colors opacity-0 group-hover:opacity-100">
                               <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Side Panels) */}
          <div className="flex flex-col gap-6">
            
            {/* Vehicle Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-6">Vehicle Status</h3>
              
              {formData.status === 'blocked' && (
                <div className="flex flex-col items-center text-center border-b border-gray-100 pb-6 mb-6">
                  <div className="bg-red-50 text-red-700 px-4 py-1.5 rounded-full font-bold text-[13px] flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-circle text-[8px]"></i> Dispatch Blocked
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                    {formData.statusReason}
                  </p>
                  <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    Manual Unlock
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Current Mileage</span>
                  <span className="text-[14px] font-bold text-gray-900">
                    {formData.currentMileage.toLocaleString()} km
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-gray-500">Remaining Value</span>
                  <span className="text-[14px] font-bold text-gray-900">
                    {formData.remainingValue.toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Drivers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Assigned Drivers</h3>
                <button onClick={() => setShowManageDrivers(true)} className="text-[#2563eb] text-[13px] font-medium hover:underline">
                  Manage
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {formData.drivers.map((driver, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[13px]">
                      {getInitials(driver.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900">{driver.name}</span>
                      <span className="text-[12px] text-gray-500">{driver.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
