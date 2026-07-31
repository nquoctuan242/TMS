const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

// Maintenance modal
content = content.replace(
  "editingMaintenance ? 'Cập nhật bảo dưỡng' : 'Thêm bảo dưỡng'",
  "editingMaintenance ? 'Update Maintenance' : 'Add Maintenance'"
);
content = content.replace('<label className="text-xs font-bold text-gray-700">Ngày</label>', '<label className="text-xs font-bold text-gray-700">Date</label>');
content = content.replace('<label className="text-xs font-bold text-gray-700">Loại</label>', '<label className="text-xs font-bold text-gray-700">Type</label>');
content = content.replace('<option value="periodic">Định kỳ</option>', '<option value="periodic">Periodic</option>');
content = content.replace('<option value="repair">Sửa chữa</option>', '<option value="repair">Repair</option>');
content = content.replace('<label className="text-xs font-bold text-gray-700">Nội dung</label>', '<label className="text-xs font-bold text-gray-700">Description</label>');
content = content.replace('<label className="text-xs font-bold text-gray-700">Số KM (km)</label>', '<label className="text-xs font-bold text-gray-700">Mileage (km)</label>');
content = content.replace('<label className="text-xs font-bold text-gray-700">Chi phí (VND)</label>', '<label className="text-xs font-bold text-gray-700">Cost (VND)</label>');

// Costs modal
content = content.replace('<label className="text-xs font-bold text-gray-700">Nhiên liệu (VND)</label>', '<label className="text-xs font-bold text-gray-700">Fuel Cost (VND)</label>');
content = content.replace('<label className="text-xs font-bold text-gray-700">Bảo dưỡng (VND)</label>', '<label className="text-xs font-bold text-gray-700">Maintenance Cost (VND)</label>');
content = content.replace('<label className="text-xs font-bold text-gray-700">Phạt nguội (VND)</label>', '<label className="text-xs font-bold text-gray-700">Fines (VND)</label>');
content = content.replace('<label className="text-xs font-bold text-gray-700">Chi phí / km (VND)</label>', '<label className="text-xs font-bold text-gray-700">Cost / km (VND)</label>');

fs.writeFileSync('src/VehicleDetailView.tsx', content);
console.log('Modals translated');
