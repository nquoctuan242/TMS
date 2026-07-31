import React, { useState } from 'react';

export function OperationView() {
  const [showModal, setShowModal] = useState(false);
  const [showTripsModal, setShowTripsModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [selectedRecordForTrips, setSelectedRecordForTrips] = useState<any>(null);

  const [records, setRecords] = useState([
    { id: '1', date: '31/07/2026', vehicle: '51C-812.44', driver: 'Nguyen Van A', checkIn: '07:00', checkOut: '17:30', startOdo: 45000, endOdo: 45150, distance: 150 },
    { id: '2', date: '31/07/2026', vehicle: '60A-337.19', driver: 'Tran Van B', checkIn: '08:15', checkOut: '', startOdo: 120500, endOdo: null, distance: null },
    { id: '3', date: '30/07/2026', vehicle: '51C-812.44', driver: 'Le Van C', checkIn: '06:30', checkOut: '18:00', startOdo: 44800, endOdo: 45000, distance: 200 }
  ]);

  const mockTrips = [
    { start: 'Kho Hưng Yên', end: 'Kho Hà Nội', distance: 30, startTime: '08:00', endTime: '09:30' },
    { start: 'Kho Hà Nội', end: 'Điểm giao quận Cầu Giấy', distance: 15, startTime: '10:00', endTime: '11:00' },
    { start: 'Điểm giao quận Cầu Giấy', end: 'Kho Bắc Ninh', distance: 45, startTime: '13:30', endTime: '15:00' }
  ];

  const filteredRecords = records;

  return (
    <div className="bg-gray-50/50 min-h-full p-6 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-blue-500">
            <div className="text-2xl font-bold text-gray-900">{records.length}</div>
            <div className="text-[13px] text-gray-500 mt-1">Total Records</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-green-600">
            <div className="text-2xl font-bold text-gray-900">{records.reduce((acc, r) => acc + (r.distance || 0), 0).toLocaleString()} km</div>
            <div className="text-[13px] text-gray-500 mt-1">Total Distance</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-xl">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search by vehicle, driver..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2563eb]"
            />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setEditingRecord(null); setShowModal(true); }}
              className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <i className="fa-solid fa-plus"></i> Record Usage
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <h2 className="font-bold text-gray-900">Vehicle Usage Log</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Vehicle</th>
                  <th className="px-6 py-4 font-bold">Driver</th>
                  <th className="px-6 py-4 font-bold">Check-in</th>
                  <th className="px-6 py-4 font-bold">Check-out</th>
                  <th className="px-6 py-4 font-bold">Start Odo</th>
                  <th className="px-6 py-4 font-bold">End Odo</th>
                  <th className="px-6 py-4 font-bold">Distance</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRecords.map((record, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 group">
                    <td className="px-6 py-4 text-gray-600">{record.date}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{record.vehicle}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{record.driver}</td>
                    <td className="px-6 py-4 text-gray-600">{record.checkIn}</td>
                    <td className="px-6 py-4 text-gray-600">{record.checkOut || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{record.startOdo.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-600">{record.endOdo ? record.endOdo.toLocaleString() : '-'}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{record.distance ? record.distance + ' km' : '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => { setSelectedRecordForTrips(record); setShowTripsModal(true); }}
                          className="px-3 py-1 bg-blue-50 border border-blue-100 rounded text-[12px] font-medium text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                          <i className="fa-solid fa-map-location-dot"></i> Trips
                        </button>
                        <button 
                          onClick={() => { setEditingRecord(record); setShowModal(true); }}
                          className="px-3 py-1 bg-white border border-gray-200 rounded text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      No usage records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">{editingRecord ? 'Edit Usage Record' : 'Record Vehicle Usage'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Date</label>
                  <input type="date" defaultValue={editingRecord?.date ? editingRecord.date.split('/').reverse().join('-') : new Date().toISOString().split('T')[0]} id="recDateInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Vehicle</label>
                    <input type="text" defaultValue={editingRecord?.vehicle || ''} id="recVehicleInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="e.g. 51C-812.44" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Driver</label>
                    <input type="text" defaultValue={editingRecord?.driver || ''} id="recDriverInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="Driver name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Check-in Time</label>
                    <input type="time" defaultValue={editingRecord?.checkIn || ''} id="recCheckInInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Check-out Time</label>
                    <input type="time" defaultValue={editingRecord?.checkOut || ''} id="recCheckOutInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Start Odometer (km)</label>
                    <input type="number" defaultValue={editingRecord?.startOdo || ''} id="recStartOdoInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">End Odometer (km)</label>
                    <input type="number" defaultValue={editingRecord?.endOdo || ''} id="recEndOdoInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                  </div>
                </div>
              </div>
              <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100">Cancel</button>
                <button onClick={() => {
                   const dateInput = document.getElementById('recDateInput') as HTMLInputElement;
                   const vehicleInput = document.getElementById('recVehicleInput') as HTMLInputElement;
                   const driverInput = document.getElementById('recDriverInput') as HTMLInputElement;
                   const checkInInput = document.getElementById('recCheckInInput') as HTMLInputElement;
                   const checkOutInput = document.getElementById('recCheckOutInput') as HTMLInputElement;
                   const startOdoInput = document.getElementById('recStartOdoInput') as HTMLInputElement;
                   const endOdoInput = document.getElementById('recEndOdoInput') as HTMLInputElement;
                   
                   const formatDate = (dateStr: string) => {
                     if (!dateStr) return '';
                     const parts = dateStr.split('-');
                     return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : dateStr;
                   };

                   const startOdo = parseInt(startOdoInput.value);
                   const endOdo = endOdoInput.value ? parseInt(endOdoInput.value) : null;
                   let distance = null;
                   if (!isNaN(startOdo) && endOdo !== null && !isNaN(endOdo)) {
                     distance = endOdo - startOdo;
                   }

                   const newRecord = {
                      id: editingRecord?.id || Date.now().toString(),
                      date: formatDate(dateInput.value),
                      vehicle: vehicleInput.value,
                      driver: driverInput.value,
                      checkIn: checkInInput.value,
                      checkOut: checkOutInput.value,
                      startOdo: isNaN(startOdo) ? 0 : startOdo,
                      endOdo: endOdo,
                      distance: distance
                   };
                   
                   let newRecords = [...records];
                   if (editingRecord) {
                      newRecords = newRecords.map(r => r.id === editingRecord.id ? newRecord : r);
                   } else {
                      newRecords.unshift(newRecord);
                   }
                   setRecords(newRecords);
                   setShowModal(false);
                }} className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">Save Record</button>
              </div>
            </div>
          </div>
        )}

        {/* Trips Modal */}
        {showTripsModal && selectedRecordForTrips && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50/50">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Daily Trips Details</h3>
                  <div className="text-sm text-gray-500 mt-1 flex gap-4">
                    <span><i className="fa-regular fa-calendar mr-1"></i> {selectedRecordForTrips.date}</span>
                    <span><i className="fa-solid fa-truck mr-1"></i> {selectedRecordForTrips.vehicle}</span>
                    <span><i className="fa-solid fa-user-tie mr-1"></i> {selectedRecordForTrips.driver}</span>
                  </div>
                </div>
                <button onClick={() => setShowTripsModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              <div className="p-0 overflow-y-auto bg-white flex-1">
                <table className="w-full text-left text-[13px]">
                  <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-white sticky top-0">
                    <tr>
                      <th className="px-6 py-4 font-bold">Start Location</th>
                      <th className="px-6 py-4 font-bold">End Location</th>
                      <th className="px-6 py-4 font-bold">Time</th>
                      <th className="px-6 py-4 font-bold text-right">Distance (km)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockTrips.map((trip, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            {trip.start}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            {trip.end}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {trip.startTime} - {trip.endTime}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          {trip.distance}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50/80">
                      <td colSpan={3} className="px-6 py-4 font-bold text-right text-gray-900">Total Distance:</td>
                      <td className="px-6 py-4 text-right font-bold text-[#2563eb]">{mockTrips.reduce((acc, t) => acc + t.distance, 0)} km</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border-t p-4 flex justify-end bg-white rounded-b-xl">
                <button onClick={() => setShowTripsModal(false)} className="px-6 py-2 border rounded-md text-sm font-medium hover:bg-gray-100">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
