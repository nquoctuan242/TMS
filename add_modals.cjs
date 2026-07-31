const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

const targetModalPoint = `{/* Manage Drivers Modal */}`;

const newModals = `{/* Maintenance Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">{editingMaintenance ? 'Cập nhật bảo dưỡng' : 'Thêm bảo dưỡng'}</h3>
              <button onClick={() => setShowMaintenanceModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Ngày</label>
                <input type="date" defaultValue={editingMaintenance?.date ? editingMaintenance.date.split('/').reverse().join('-') : ''} id="maintDateInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Loại</label>
                <select defaultValue={editingMaintenance?.type || 'periodic'} id="maintTypeInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]">
                  <option value="periodic">Định kỳ</option>
                  <option value="repair">Sửa chữa</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Nội dung</label>
                <input type="text" defaultValue={editingMaintenance?.content || ''} id="maintContentInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Số KM (km)</label>
                <input type="number" defaultValue={editingMaintenance?.mileage || 0} id="maintMileageInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Chi phí (VND)</label>
                <input type="number" defaultValue={editingMaintenance?.cost || 0} id="maintCostInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
            </div>
            <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button onClick={() => setShowMaintenanceModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100">Cancel</button>
              <button onClick={() => {
                 const dateInput = document.getElementById('maintDateInput') as HTMLInputElement;
                 const typeInput = document.getElementById('maintTypeInput') as HTMLSelectElement;
                 const contentInput = document.getElementById('maintContentInput') as HTMLInputElement;
                 const mileageInput = document.getElementById('maintMileageInput') as HTMLInputElement;
                 const costInput = document.getElementById('maintCostInput') as HTMLInputElement;
                 
                 const dateParts = dateInput.value.split('-');
                 const dateStr = dateParts.length === 3 ? \`\${dateParts[2]}/\${dateParts[1]}/\${dateParts[0]}\` : dateInput.value;
                 
                 const newRecord = {
                    id: editingMaintenance?.id || Date.now().toString(),
                    date: dateStr,
                    type: typeInput.value as any,
                    content: contentInput.value,
                    mileage: parseInt(mileageInput.value) || 0,
                    cost: parseInt(costInput.value) || 0
                 };
                 
                 let newRecords = [...(formData.maintenanceRecords || [])];
                 if (editingMaintenance) {
                    newRecords = newRecords.map(r => r.id === editingMaintenance.id ? newRecord : r);
                 } else {
                    newRecords.unshift(newRecord);
                 }
                 setFormData({...formData, maintenanceRecords: newRecords});
                 setShowMaintenanceModal(false);
              }} className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Record</button>
            </div>
          </div>
        </div>
      )}

      {/* Costs Modal */}
      {showCostsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Costs</h3>
              <button onClick={() => setShowCostsModal(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Month</label>
                <input type="number" value={formData.costs?.month || 7} onChange={e => setFormData({...formData, costs: {...(formData.costs as any), month: parseInt(e.target.value) || 1}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Nhiên liệu (VND)</label>
                <input type="number" value={formData.costs?.fuelCost || 0} onChange={e => setFormData({...formData, costs: {...(formData.costs as any), fuelCost: parseInt(e.target.value) || 0}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Bảo dưỡng (VND)</label>
                <input type="number" value={formData.costs?.maintenanceCost || 0} onChange={e => setFormData({...formData, costs: {...(formData.costs as any), maintenanceCost: parseInt(e.target.value) || 0}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Phạt nguội (VND)</label>
                <input type="number" value={formData.costs?.fines || 0} onChange={e => setFormData({...formData, costs: {...(formData.costs as any), fines: parseInt(e.target.value) || 0}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Chi phí / km (VND)</label>
                <input type="number" value={formData.costs?.costPerKm || 0} onChange={e => setFormData({...formData, costs: {...(formData.costs as any), costPerKm: parseInt(e.target.value) || 0}})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
              </div>
            </div>
            <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
              <button onClick={() => setShowCostsModal(false)} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100">Cancel</button>
              <button onClick={() => setShowCostsModal(false)} className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Costs</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Drivers Modal */}`;

content = content.replace(targetModalPoint, newModals);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
