const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

// Translations for Maintenance tab
content = content.replace('<th className="px-6 py-4 font-bold">NGÀY</th>', '<th className="px-6 py-4 font-bold">Date</th>');
content = content.replace('<th className="px-6 py-4 font-bold">LOẠI</th>', '<th className="px-6 py-4 font-bold">Type</th>');
content = content.replace('<th className="px-6 py-4 font-bold">NỘI DUNG</th>', '<th className="px-6 py-4 font-bold">Description</th>');
content = content.replace('<th className="px-6 py-4 font-bold">KM LÚC LÀM</th>', '<th className="px-6 py-4 font-bold">Mileage at Service</th>');
content = content.replace('<th className="px-6 py-4 font-bold">CHI PHÍ</th>', '<th className="px-6 py-4 font-bold">Cost</th>');

content = content.replace(
  /<span className="px-3 py-1 rounded-full text-\[12px\] bg-gray-100 text-gray-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"><\/span> Định kỳ<\/span>/g,
  '<span className="px-3 py-1 rounded-full text-[12px] bg-gray-100 text-gray-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Periodic</span>'
);

content = content.replace(
  /<span className="px-3 py-1 rounded-full text-\[12px\] bg-red-50 text-red-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-500"><\/span> Sửa chữa<\/span>/g,
  '<span className="px-3 py-1 rounded-full text-[12px] bg-red-50 text-red-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Repair</span>'
);

content = content.replace(
  /Kế tiếp: bảo dưỡng cấp 1 khi đạt <strong className="text-\[#d97706\]">150\.000 km<\/strong> \(còn ~7\.500 km\)\./g,
  'Next: Level 1 maintenance at <strong className="text-[#d97706]">150,000 km</strong> (remaining ~7,500 km).'
);

// Translations for Costs tab
content = content.replace(
  /<span className="text-\[13px\] text-gray-500">Nhiên liệu \(tháng \{formData\.costs\?\.month \|\| 7\}\)<\/span>/g,
  '<span className="text-[13px] text-gray-500">Fuel Cost (Month {formData.costs?.month || 7})</span>'
);

content = content.replace(
  /<span className="text-\[13px\] text-gray-500">Bảo dưỡng \(tháng \{formData\.costs\?\.month \|\| 7\}\)<\/span>/g,
  '<span className="text-[13px] text-gray-500">Maintenance Cost (Month {formData.costs?.month || 7})</span>'
);

content = content.replace(
  /<span className="text-\[13px\] text-gray-500">Phạt nguội<\/span>/g,
  '<span className="text-[13px] text-gray-500">Fines</span>'
);

content = content.replace(
  /<span className="text-\[13px\] text-gray-500">Chi phí \/ km<\/span>/g,
  '<span className="text-[13px] text-gray-500">Cost / km</span>'
);

content = content.replace(
  /<p className="text-\[13px\] text-gray-500">Tổng hợp tự động từ Bảo dưỡng \+ nhiên liệu \+ phạt nguội\.<\/p>/g,
  '<div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center"><p className="text-[14px] font-bold text-gray-900">Total Cost</p><p className="text-[18px] font-bold text-[#2563eb]">{((formData.costs?.fuelCost || 0) + (formData.costs?.maintenanceCost || 0) + (formData.costs?.fines || 0)).toLocaleString()}₫</p></div>'
);


fs.writeFileSync('src/VehicleDetailView.tsx', content);
console.log('Translated');
