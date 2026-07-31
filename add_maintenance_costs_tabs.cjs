const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

const targetStr = `              )}
            </div>
          </div>

          {/* Right Column (Side Panels) */}`;

const newTabs = `              )}

              {activeTab === 'maintenance' && (
                <div className="p-0 overflow-x-auto">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50/50">
                     <span className="text-xs text-gray-500"><i className="fa-solid fa-circle-info mr-1"></i> Changes will be automatically logged.</span>
                     <button onClick={() => { setEditingMaintenance(null); setShowMaintenanceModal(true); }} className="text-xs font-bold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                        <i className="fa-solid fa-plus"></i> Add Record
                     </button>
                  </div>
                  <table className="w-full text-left text-[13px]">
                    <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 font-bold">NGÀY</th>
                        <th className="px-6 py-4 font-bold">LOẠI</th>
                        <th className="px-6 py-4 font-bold">NỘI DUNG</th>
                        <th className="px-6 py-4 font-bold">KM LÚC LÀM</th>
                        <th className="px-6 py-4 font-bold">CHI PHÍ</th>
                        <th className="px-6 py-4 font-bold w-[60px]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {formData.maintenanceRecords?.map((record: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50/50 group">
                          <td className="px-6 py-4 text-gray-800">{record.date}</td>
                          <td className="px-6 py-4">
                             {record.type === 'periodic' ? (
                               <span className="px-3 py-1 rounded-full text-[12px] bg-gray-100 text-gray-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Định kỳ</span>
                             ) : (
                               <span className="px-3 py-1 rounded-full text-[12px] bg-red-50 text-red-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Sửa chữa</span>
                             )}
                          </td>
                          <td className="px-6 py-4 text-gray-600">{record.content}</td>
                          <td className="px-6 py-4 text-gray-600">{record.mileage.toLocaleString()}</td>
                          <td className="px-6 py-4 text-gray-600">{record.cost.toLocaleString()}₫</td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => { setEditingMaintenance(record); setShowMaintenanceModal(true); }} className="text-gray-400 hover:text-[#2563eb] transition-colors opacity-0 group-hover:opacity-100">
                               <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 bg-gray-50/50 text-sm text-gray-500 border-t border-gray-100">
                     Kế tiếp: bảo dưỡng cấp 1 khi đạt <strong className="text-[#d97706]">150.000 km</strong> (còn ~7.500 km).
                  </div>
                </div>
              )}

              {activeTab === 'costs' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="font-bold text-gray-900">Costs (Tháng {formData.costs?.month || 7})</h4>
                     <button onClick={() => setShowCostsModal(true)} className="text-xs font-bold text-[#2563eb] hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                        <i className="fa-solid fa-pen-to-square"></i> Edit Costs
                     </button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-6">
                     <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                        <span className="text-[13px] text-gray-500">Nhiên liệu (tháng {formData.costs?.month || 7})</span>
                        <span className="text-[14px] font-bold text-gray-900">{formData.costs?.fuelCost.toLocaleString()}₫</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                        <span className="text-[13px] text-gray-500">Bảo dưỡng (tháng {formData.costs?.month || 7})</span>
                        <span className="text-[14px] font-bold text-gray-900">{formData.costs?.maintenanceCost.toLocaleString()}₫</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                        <span className="text-[13px] text-gray-500">Phạt nguội</span>
                        <span className="text-[14px] font-bold text-gray-900">{formData.costs?.fines.toLocaleString()}₫</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                        <span className="text-[13px] text-gray-500">Chi phí / km</span>
                        <span className="text-[14px] font-bold text-gray-900">{formData.costs?.costPerKm.toLocaleString()}₫</span>
                     </div>
                  </div>
                  <p className="text-[13px] text-gray-500">Tổng hợp tự động từ Bảo dưỡng + nhiên liệu + phạt nguội.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Side Panels) */}`;

content = content.replace(targetStr, newTabs);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
