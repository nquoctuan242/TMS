import React, { useState } from 'react';
import { DeclareCartonCatalogModal } from './DeclareCartonCatalogModal';

export function LandingCostCalculatorView() {
  const [items, setItems] = useState([
    {
      id: '1',
      sku: '',
      productName: '',
      fobPrice: '1',
      cur: 'USD',
      co: 'VN',
      expHs: '',
      impHs: '',
      unit: 'Piece',
      itemsPerUnit: '1',
      qty: '1',
      totalItems: '1',
      l: '1',
      w: '1',
      h: '1',
      nw: '1',
      cbm: '0',
      vw: '0',
      calcNw: '1',
      cw: '1'
    }
  ]);

  const [showCartonModal, setShowCartonModal] = useState(false);

  const [packingGroups, setPackingGroups] = useState([
    {
      id: '1',
      title: 'GROUP 1',
      type: 'S-02 (30 x 20 x 15 cm | Max GW: 29.5 kg)',
      l: '30',
      w: '20',
      h: '15',
      padL: '1',
      padW: '1',
      padH: '1',
      gw: '0.14',
      items: []
    },
    {
      id: '2',
      title: 'GROUP 2',
      type: 'M-02 (40 x 30 x 20 cm | Max GW: 36.3 kg)',
      l: '40',
      w: '30',
      h: '20',
      padL: '1',
      padW: '1',
      padH: '1',
      gw: '0.25',
      items: []
    }
  ]);

  return (
    <div className="bg-[#f8fafc] min-h-full flex flex-col items-center py-6 px-4 pb-24 animate-in fade-in duration-300 relative font-sans">
      <div className="w-full max-w-[1400px]">
        
        {/* Top Warning Banner */}
        <div className="bg-[#fff8e6] border border-[#ffebaa] text-[#b38a00] p-3 rounded-lg flex items-start gap-2 mb-4 text-xs font-medium">
          <i className="fa-solid fa-circle-exclamation mt-0.5"></i>
          <span>Values tagged AI are reference ESTIMATES, NOT official figures — verify against official tariff schedules/HS codes & actual carrier quotes before use. Hasaki & the AI provider accept no liability.</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-sm mb-6 border border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-800">Landing Cost Calculator</h1>
            </div>
            <p className="text-sm text-gray-500">Determine import/export duties and shipping costs per item</p>
          </div>
          <button className="bg-[#1b4d3e] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#153a2f] shadow-sm transition-colors flex items-center gap-2">
            <i className="fa-regular fa-calendar-check"></i> Check Cargo Ready Date
          </button>
        </div>

        {/* Origin & Destination */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center gap-2 bg-gray-50/50">
            <i className="fa-solid fa-location-dot text-gray-400"></i>
            <h3 className="font-bold text-gray-700 text-sm">Origin & Destination</h3>
          </div>
          <div className="p-5 grid grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">ORIGIN</span>
                <button className="text-blue-500 hover:text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-pen"></i> Edit
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/30 text-gray-400 italic text-sm">
                Please select origin
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">DESTINATION</span>
                <button className="text-blue-500 hover:text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors">
                  <i className="fa-solid fa-pen"></i> Edit
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50/30 text-gray-400 italic text-sm">
                Please select destination
              </div>
            </div>
          </div>
        </div>

        {/* Item Declaration */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-cube text-gray-400"></i>
              <h3 className="font-bold text-gray-700 text-sm">Item Declaration</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <span>L:</span>
                <select className="border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 bg-white">
                  <option>cm</option>
                </select>
                <span className="ml-2">W:</span>
                <select className="border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 bg-white">
                  <option>kg</option>
                </select>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <button className="text-gray-400 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-not-allowed">
                <i className="fa-solid fa-wand-magic-sparkles"></i> AI Suggest
              </button>
              <button className="text-[#1b4d3e] border border-[#1b4d3e] hover:bg-green-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors">
                <i className="fa-solid fa-download"></i> Export Data
              </button>
              <button className="text-[#1b4d3e] border border-[#1b4d3e] hover:bg-green-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors">
                <i className="fa-solid fa-upload"></i> Import Data
              </button>
              <button className="text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors">
                <i className="fa-solid fa-plus"></i> Add Row
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>SKU</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>PRODUCT NAME</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>FOB PRICE</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>CUR</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>CO</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>EXP HS</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>IMP HS</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>UNIT</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>ITEMS/UNIT</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap" rowSpan={2}>QTY</th>
                  <th className="p-3 border-b border-gray-100 font-bold whitespace-nowrap border-r border-gray-200" rowSpan={2}>TOTAL ITEMS</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center border-r border-gray-200 text-blue-600" colSpan={4}>DIMENSIONS & WEIGHT (UNIT)</th>
                  <th className="p-2 border-b border-gray-200 font-bold text-center text-[#4d9e5f]" colSpan={4}>CALCULATED METRICS</th>
                  <th className="p-3 border-b border-gray-100 font-bold w-10" rowSpan={2}></th>
                </tr>
                <tr className="bg-gray-50 text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                  <th className="p-2 border-b border-gray-100 font-bold text-center text-blue-600">L (CM)</th>
                  <th className="p-2 border-b border-gray-100 font-bold text-center text-blue-600">W (CM)</th>
                  <th className="p-2 border-b border-gray-100 font-bold text-center text-blue-600">H (CM)</th>
                  <th className="p-2 border-b border-gray-100 font-bold text-center border-r border-gray-200 text-blue-600">NW (KG)</th>
                  <th className="p-2 border-b border-gray-100 font-bold text-center text-[#4d9e5f]">CBM</th>
                  <th className="p-2 border-b border-gray-100 font-bold text-center text-[#4d9e5f]">VW (KG)</th>
                  <th className="p-2 border-b border-gray-100 font-bold text-center text-[#4d9e5f]">NW (KG)</th>
                  <th className="p-2 border-b border-gray-100 font-bold text-center text-[#4d9e5f]">C.W (KG)</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-700 bg-white">
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2">
                      <input type="text" placeholder="e.g. SKU-001" className="w-24 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500" />
                    </td>
                    <td className="p-2">
                      <input type="text" placeholder="Product name..." className="w-32 border border-transparent hover:border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500" />
                    </td>
                    <td className="p-2">
                      <input type="text" value={item.fobPrice} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-right" readOnly />
                    </td>
                    <td className="p-2 text-center">{item.cur}</td>
                    <td className="p-2 text-center">{item.co}</td>
                    <td className="p-2">
                      <input type="text" placeholder="e.g. 123456" className="w-24 border border-transparent hover:border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-gray-400" />
                    </td>
                    <td className="p-2">
                      <input type="text" placeholder="e.g. 123456" className="w-24 border border-transparent hover:border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-gray-400" />
                    </td>
                    <td className="p-2">
                      <select className="w-24 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 bg-white">
                        <option>Piece</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input type="text" value={item.itemsPerUnit} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-center" readOnly />
                    </td>
                    <td className="p-2">
                      <input type="text" value={item.qty} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-center" readOnly />
                    </td>
                    <td className="p-2 text-center font-bold border-r border-gray-200">{item.totalItems}</td>
                    <td className="p-2">
                      <input type="text" value={item.l} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-center" readOnly />
                    </td>
                    <td className="p-2">
                      <input type="text" value={item.w} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-center" readOnly />
                    </td>
                    <td className="p-2">
                      <input type="text" value={item.h} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-center" readOnly />
                    </td>
                    <td className="p-2 border-r border-gray-200">
                      <input type="text" value={item.nw} className="w-16 border border-gray-200 rounded px-2 py-1 outline-none focus:border-blue-500 text-center" readOnly />
                    </td>
                    <td className="p-2 text-center text-[#4d9e5f] font-medium">{item.cbm}</td>
                    <td className="p-2 text-center text-[#4d9e5f] font-medium">{item.vw}</td>
                    <td className="p-2 text-center text-[#4d9e5f] font-medium">{item.calcNw}</td>
                    <td className="p-2 text-center text-[#4d9e5f] font-bold">{item.cw}</td>
                    <td className="p-2 text-center">
                      <button className="text-red-400 hover:text-red-600 transition-colors">
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 text-xs font-bold text-gray-700">
                <tr>
                  <td colSpan={9} className="p-3 text-right">Total:</td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-center border-r border-gray-200">1</td>
                  <td colSpan={4} className="border-r border-gray-200"></td>
                  <td className="p-3 text-center text-[#4d9e5f]">0</td>
                  <td className="p-3 text-center text-[#4d9e5f]">0</td>
                  <td className="p-3 text-center text-[#4d9e5f]">1</td>
                  <td className="p-3 text-center text-[#4d9e5f]">1 kg</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Packaging Plan */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-box-open text-gray-400"></i>
              <h3 className="font-bold text-gray-700 text-sm">Packaging Plan</h3>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowCartonModal(true)} className="text-[#1b4d3e] border border-[#1b4d3e] bg-white hover:bg-green-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors">
                <i className="fa-solid fa-file-import"></i> Import Packing Cartons
              </button>
              <button className="text-gray-700 border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded text-xs font-bold transition-colors">
                Collapse All
              </button>
              <button className="text-gray-400 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 cursor-not-allowed">
                <i className="fa-solid fa-bolt"></i> Auto-Generate
              </button>
              <button className="bg-[#1b4d3e] text-white hover:bg-[#153a2f] px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors shadow-sm">
                <i className="fa-solid fa-plus"></i> Add Packing Group
              </button>
            </div>
          </div>
          
          <div className="p-5">
            {packingGroups.map((group, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden mb-5 last:mb-0">
                <div className="bg-gray-50/80 p-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-500 hover:text-gray-800 transition-colors">
                      <i className="fa-solid fa-caret-down"></i>
                    </button>
                    <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded">{group.title}</span>
                    <select className="border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-500 bg-white min-w-[280px]">
                      <option>{group.type}</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#4d9e5f] bg-green-50 border border-green-100 px-2 py-1 rounded">0 cartons</span>
                    <button className="text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors bg-white">
                      <i className="fa-solid fa-rotate-right"></i> Calculate
                    </button>
                    <button className="text-red-400 hover:text-red-600 transition-colors p-1">
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-7 gap-4 mb-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">L (CM)</label>
                      <input type="text" value={group.l} className="w-full border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 bg-gray-50" readOnly />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">W (CM)</label>
                      <input type="text" value={group.w} className="w-full border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 bg-gray-50" readOnly />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">H (CM)</label>
                      <input type="text" value={group.h} className="w-full border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 bg-gray-50" readOnly />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">PADDING L (CM)</label>
                      <div className="relative">
                        <input type="text" value={group.padL} className="w-full border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 pr-8" readOnly />
                        <i className="fa-regular fa-circle-xmark absolute right-2.5 top-2.5 text-gray-300 cursor-pointer hover:text-gray-500"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">PADDING W (CM)</label>
                      <div className="relative">
                        <input type="text" value={group.padW} className="w-full border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 pr-8" readOnly />
                        <i className="fa-regular fa-circle-xmark absolute right-2.5 top-2.5 text-gray-300 cursor-pointer hover:text-gray-500"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">PADDING H (CM)</label>
                      <div className="relative">
                        <input type="text" value={group.padH} className="w-full border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 pr-8" readOnly />
                        <i className="fa-regular fa-circle-xmark absolute right-2.5 top-2.5 text-gray-300 cursor-pointer hover:text-gray-500"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">GW (KG)</label>
                      <div className="relative">
                        <input type="text" value={group.gw} className="w-full border border-gray-200 rounded px-3 py-2 text-xs outline-none focus:border-blue-500 pr-8" readOnly />
                        <i className="fa-regular fa-circle-xmark absolute right-2.5 top-2.5 text-gray-300 cursor-pointer hover:text-gray-500"></i>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 mb-4">
                    Inner dims: 29.0 x 19.0 x 14.0 cm • Outer CBM/carton: 0.0090 m³ • Tare: 0.00 kg • Total GW: 0.00 kg
                  </p>

                  <div className="border border-gray-200 border-dashed rounded-lg">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100 border-dashed">
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-1/4">SKU</th>
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-1/6">ITEMS / CARTON</th>
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-1/6"># CARTONS</th>
                          <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-1/6">MAX CAPACITY</th>
                          <th className="p-3 text-[10px] font-bold text-[#4d9e5f] uppercase tracking-wider w-1/6">PACKED</th>
                          <th className="p-3 text-[10px] font-bold text-blue-600 uppercase tracking-wider w-1/6">CAN PACK MORE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-xs text-gray-400 border-b border-gray-100 border-dashed">
                            No items in this group. Click "Add SKU Row" below.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-3 text-center">
                      <button className="text-gray-600 hover:text-gray-900 text-xs font-bold flex items-center justify-center gap-2 w-full py-1">
                        <i className="fa-solid fa-plus"></i> Add SKU Row
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      {showCartonModal && <DeclareCartonCatalogModal onClose={() => setShowCartonModal(false)} />}
    </div>
  );
}
