import React, { useState } from 'react';
import { Vehicle } from '../types';

interface VehicleListViewProps {
  onRowClick: (id: string) => void;
  onCreateClick: () => void;
}

export function VehicleListView({ onRowClick, onCreateClick }: VehicleListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      licensePlate: '51C-812.44',
      makeModel: 'Hyundai Mighty EX8',
      vehicleType: 'Xe tải 8 tấn',
      source: 'Sở hữu',
      vin: 'RLHXABCD1234567',
      engineNumber: 'D4GA-9911',
      manufactureYear: 2022,
      inServiceDate: '15/03/2022',
      storeDefault: 'Store 123',
      vehiclePurpose: 'Delivery',
      status: 'blocked',
      statusReason: 'Phù hiệu đã hết hạn 7 ngày. Chặn giao chuyến mới; chuyến đang chạy vẫn hoàn thành.',
      currentMileage: 142500,
      remainingValue: 612000000,
      documents: [
        { id: '1', type: 'Đăng kiểm', expirationDate: '10/09/2026', remainingDays: 45, status: 'expiring', hasScan: true },
        { id: '2', type: 'Bảo hiểm TNDS', expirationDate: '01/03/2027', remainingDays: 217, status: 'valid', hasScan: true },
        { id: '3', type: 'Phù hiệu xe tải', expirationDate: '20/07/2026', remainingDays: -7, status: 'expired', hasScan: false },
        { id: '4', type: 'GP kinh doanh VT', expirationDate: '12/12/2028', remainingDays: 868, status: 'valid', hasScan: true },
      ],
      drivers: [
        { id: '1', name: 'Trần Văn Bình', role: 'Tài xế chính' },
        { id: '2', name: 'Lê Hoàng Nam', role: 'Tài xế thay phiên' }
      ]
    }
  ]);

  const filteredVehicles = vehicles.filter(v => 
    v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.makeModel.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (v.vehiclePurpose && v.vehiclePurpose.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Vehicle Management</h2>
        <button 
          onClick={onCreateClick}
          className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2 shadow-sm"
        >
          <i className="fa-solid fa-plus"></i> Add Vehicle
        </button>
      </div>
      
      <div className="px-4 pt-3 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search by license plate, make/model, purpose..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#4d9e5f]"
          />
        </div>
      </div>

      <div className="p-4 overflow-x-auto flex-1">
        <table className="w-full text-left text-[12px] bg-white border border-gray-200">
          <thead className="bg-[#f8fafc] text-gray-600 font-bold border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 border-r border-gray-200">License Plate</th>
              <th className="px-4 py-3 border-r border-gray-200">Make / Model</th>
              <th className="px-4 py-3 border-r border-gray-200">Type</th>
              <th className="px-4 py-3 border-r border-gray-200">Purpose</th>
              <th className="px-4 py-3 border-r border-gray-200">Store Default</th>
              <th className="px-4 py-3 border-r border-gray-200 text-center">Status</th>
              <th className="px-4 py-3 text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {filteredVehicles.map(v => (
              <tr key={v.id} className="hover:bg-blue-50/50 transition-colors cursor-pointer group" onClick={() => onRowClick(v.id)}>
                <td className="px-4 py-3 border-r border-gray-100 font-bold text-[#1b4d3e]">{v.licensePlate}</td>
                <td className="px-4 py-3 border-r border-gray-100">{v.makeModel}</td>
                <td className="px-4 py-3 border-r border-gray-100">{v.vehicleType}</td>
                <td className="px-4 py-3 border-r border-gray-100 font-medium text-gray-900">{v.vehiclePurpose || '-'}</td>
                <td className="px-4 py-3 border-r border-gray-100">{v.storeDefault || "None"}</td>
                <td className="px-4 py-3 border-r border-gray-100 text-center">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold \${
                    v.status === 'active' ? 'bg-green-100 text-green-700' :
                    v.status === 'blocked' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {v.status === 'active' ? 'Active' : v.status === 'blocked' ? 'Blocked' : 'Maintenance'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-500 hover:text-blue-700 font-medium flex items-center justify-center gap-1 mx-auto transition-colors group-hover:scale-105">
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredVehicles.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No vehicles found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
