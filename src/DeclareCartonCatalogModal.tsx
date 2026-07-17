import React, { useState } from 'react';

interface DeclareCartonCatalogModalProps {
  onClose: () => void;
  routeFrom?: string;
  routeTo?: string;
}

export function DeclareCartonCatalogModal({ onClose, routeFrom = 'VN', routeTo = 'US' }: DeclareCartonCatalogModalProps) {
  const [cartons, setCartons] = useState([
    { id: 1, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-XS01', name: 'XS-01', tier: '1', outerL: '15', outerW: '10', outerH: '7', paddingL: '0.5', paddingW: '0.5', paddingR: '0.5', tare: '0.03', maxGw: '29.5', cbm: '0.001' },
    { id: 2, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-XS02', name: 'XS-02', tier: '1', outerL: '20', outerW: '15', outerH: '10', paddingL: '0.5', paddingW: '0.5', paddingR: '0.5', tare: '0.07', maxGw: '29.5', cbm: '0.003' },
    { id: 3, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-S01', name: 'S-01', tier: '2', outerL: '25', outerW: '20', outerH: '15', paddingL: '1', paddingW: '1', paddingR: '1', tare: '0.12', maxGw: '29.5', cbm: '0.007' },
    { id: 4, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-S02', name: 'S-02', tier: '2', outerL: '30', outerW: '20', outerH: '15', paddingL: '1', paddingW: '1', paddingR: '1', tare: '0.14', maxGw: '29.5', cbm: '0.009' },
    { id: 5, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-S03', name: 'S-03', tier: '2', outerL: '30', outerW: '25', outerH: '20', paddingL: '1', paddingW: '1', paddingR: '1', tare: '0.19', maxGw: '29.5', cbm: '0.015' },
    { id: 6, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-M01', name: 'M-01', tier: '3', outerL: '35', outerW: '25', outerH: '20', paddingL: '2', paddingW: '2', paddingR: '2', tare: '0.21', maxGw: '36.3', cbm: '0.017' },
    { id: 7, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-M02', name: 'M-02', tier: '3', outerL: '40', outerW: '30', outerH: '20', paddingL: '2', paddingW: '2', paddingR: '2', tare: '0.26', maxGw: '36.3', cbm: '0.024' },
    { id: 8, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-M03', name: 'M-03', tier: '3', outerL: '45', outerW: '35', outerH: '25', paddingL: '2', paddingW: '2', paddingR: '2', tare: '0.36', maxGw: '36.3', cbm: '0.039' },
    { id: 9, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-L01', name: 'L-01', tier: '4', outerL: '50', outerW: '40', outerH: '30', paddingL: '2.5', paddingW: '2.5', paddingR: '2.5', tare: '0.47', maxGw: '43.1', cbm: '0.060' },
    { id: 10, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-L02', name: 'L-02', tier: '4', outerL: '60', outerW: '40', outerH: '30', paddingL: '2.5', paddingW: '2.5', paddingR: '2.5', tare: '0.54', maxGw: '43.1', cbm: '0.072' },
    { id: 11, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-L03', name: 'L-03', tier: '4', outerL: '60', outerW: '45', outerH: '35', paddingL: '2.5', paddingW: '2.5', paddingR: '2.5', tare: '0.64', maxGw: '43.1', cbm: '0.094' },
    { id: 12, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-XL01', name: 'XL-01', tier: '5', outerL: '60', outerW: '50', outerH: '40', paddingL: '3', paddingW: '3', paddingR: '3', tare: '1.11', maxGw: '54.4', cbm: '0.120' },
    { id: 13, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-XL02', name: 'XL-02', tier: '5', outerL: '70', outerW: '50', outerH: '40', paddingL: '3', paddingW: '3', paddingR: '3', tare: '1.25', maxGw: '54.4', cbm: '0.140' },
    { id: 14, fromCountry: 'VN', toCountry: 'US', code: 'VN-US-XL03', name: 'XL-03', tier: '5', outerL: '70', outerW: '60', outerH: '50', paddingL: '3', paddingW: '3', paddingR: '3', tare: '1.61', maxGw: '54.4', cbm: '0.210' },
  ]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center font-sans animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-7xl w-[95vw] max-h-[90vh] flex flex-col m-4 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Declare carton catalog</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#e6f4f1] text-[#1b4d3e] text-xs font-medium rounded-md border border-[#cce8e2]">
              route {routeFrom} → {routeTo}
            </span>
            <span className="text-sm text-gray-500">· {cartons.length} cartons (system default)</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Import (CSV/Excel)
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <i className="fa-solid fa-download"></i> Download template
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <i className="fa-solid fa-plus"></i> Add carton
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            The list applies per route (from → to) & is saved for future use.
          </p>

          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
              <thead className="sticky top-0 bg-white shadow-sm z-10">
                <tr className="text-[10px] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="p-3 border-r border-gray-100">From country</th>
                  <th className="p-3 border-r border-gray-100">To Country</th>
                  <th className="p-3 border-r border-gray-100">Code</th>
                  <th className="p-3 border-r border-gray-100">Carton Name</th>
                  <th className="p-3 border-r border-gray-100">tier</th>
                  <th className="p-3 border-r border-gray-100">L (CM)</th>
                  <th className="p-3 border-r border-gray-100">W (CM)</th>
                  <th className="p-3 border-r border-gray-100">H (CM)</th>
                  <th className="p-3 border-r border-gray-100">paddingL (CM)</th>
                  <th className="p-3 border-r border-gray-100">paddingW (CM)</th>
                  <th className="p-3 border-r border-gray-100">paddingR (CM)</th>
                  <th className="p-3 border-r border-gray-100">tare (KG)</th>
                  <th className="p-3 border-r border-gray-100">maxGW (KG)</th>
                  <th className="p-3 border-r border-gray-100">CBM</th>
                  <th className="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cartons.map((carton) => (
                  <tr key={carton.id} className="hover:bg-gray-50/50 text-xs">
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.fromCountry} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.toCountry} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.code} className="w-24 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.name} className="w-20 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.tier} className="w-12 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.outerL} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.outerW} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.outerH} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.paddingL} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.paddingW} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.paddingR} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.tare} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.maxGw} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-100">
                      <input type="text" value={carton.cbm} className="w-16 border border-gray-200 rounded px-2 py-1 text-center outline-none focus:border-blue-500" readOnly />
                    </td>
                    <td className="p-2 text-center">
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
