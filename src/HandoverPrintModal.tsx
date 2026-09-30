import React from 'react';
import { HandoverManifest } from '../types';

interface HandoverPrintModalProps {
  manifest: HandoverManifest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HandoverPrintModal: React.FC<HandoverPrintModalProps> = ({
  manifest,
  isOpen,
  onClose
}) => {
  if (!isOpen || !manifest) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedCod = new Intl.NumberFormat('en-US').format(manifest.totalCod);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Controls Header (Hidden in Print) */}
        <div className="print:hidden px-6 py-4 bg-gray-900 text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#4d9e5f] flex items-center justify-center text-white">
              <i className="fa-solid fa-print"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">Print Handover Manifest</h3>
              <p className="text-xs text-gray-400 font-mono">{manifest.manifestCode} • {manifest.carrier || 'Pending Dispatch'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#4d9e5f] hover:bg-[#3d7d4c] text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <i className="fa-solid fa-print"></i> Print Manifest
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <i className="fa-solid fa-xmark text-base"></i>
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="p-8 overflow-y-auto print:p-0 print:m-0 print:overflow-visible bg-white text-gray-900 font-sans printable-manifest">
          
          {/* Header */}
          <div className="border-b-2 border-gray-900 pb-5 mb-6 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-[#1b4d3e] text-white flex items-center justify-center font-black text-xs">H</span>
                <h1 className="text-xl font-black tracking-tight text-[#1b4d3e] uppercase">
                  HASAKI LOGISTICS SYSTEM
                </h1>
              </div>
              <p className="text-xs text-gray-500 font-medium">Automated Shipment Handover & Dispatch Manifest</p>
              <p className="text-[11px] text-gray-400">Headquarters: 71 Hoang Hoa Tham, Ward 13, Tan Binh Dist, Ho Chi Minh City</p>
            </div>

            <div className="text-right space-y-1">
              <div className="inline-block px-3 py-1 bg-gray-100 rounded border border-gray-300 font-mono font-bold text-sm tracking-wider text-gray-800">
                {manifest.manifestCode}
              </div>
              <p className="text-[11px] text-gray-500">Date: <span className="font-semibold text-gray-800">{new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
              <p className="text-[11px] text-gray-500">Status: <span className="font-bold uppercase text-[#1b4d3e]">{manifest.status}</span></p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-black tracking-wider uppercase text-gray-900">
              OFFICIAL GOODS HANDOVER MANIFEST & CARRIER DISPATCH NOTE
            </h2>
            <p className="text-xs text-gray-500 italic mt-0.5">
              (Document for signing & legal custody transfer between Shipper / Warehouse and Carrier)
            </p>
          </div>

          {/* Logistics Route Information Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs">
            <div className="space-y-1.5 border-r border-gray-200 pr-4">
              <div className="flex items-center gap-2 text-[#1b4d3e] font-bold uppercase text-[11px]">
                <i className="fa-solid fa-warehouse"></i>
                <span>Pickup Address</span>
              </div>
              <p className="font-semibold text-gray-800">{manifest.originHub}</p>
              <p className="text-gray-600 text-[11px] leading-relaxed">{manifest.originAddress}</p>
              <p className="text-gray-500 text-[11px]">Created At: <span className="font-medium text-gray-700">{manifest.createdAt}</span></p>
            </div>

            <div className="space-y-1.5 pl-2">
              <div className="flex items-center gap-2 text-indigo-700 font-bold uppercase text-[11px]">
                <i className="fa-solid fa-truck-ramp-box"></i>
                <span>Delivery Address</span>
              </div>
              <p className="font-semibold text-gray-800">{manifest.destinationHub}</p>
              <p className="text-gray-600 text-[11px] leading-relaxed">{manifest.destinationAddress}</p>
              <div className="flex items-center gap-4 text-[11px]">
                <span>Carrier: <strong className="text-gray-900">{manifest.status === 'Dispatched' && manifest.carrier ? manifest.carrier : 'Unassigned (Pending Dispatch)'}</strong></span>
                {manifest.cutoffTime && <span>Cutoff: <strong className="text-red-600">{manifest.cutoffTime}</strong></span>}
              </div>
            </div>
          </div>

          {/* Dispatch Metadata (If available) */}
          {(manifest.status === 'Dispatched' || manifest.carrierDriverName) && (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs grid grid-cols-4 gap-3 text-blue-950">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Driver Name</span>
                <span className="font-bold">{manifest.carrierDriverName || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Driver Phone</span>
                <span className="font-bold font-mono">{manifest.carrierDriverPhone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Vehicle Plate</span>
                <span className="font-bold font-mono">{manifest.carrierPlateNumber || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Dispatch Ref</span>
                <span className="font-bold font-mono">{manifest.dispatchReference || 'N/A'}</span>
              </div>
            </div>
          )}

          {/* Key Totals Bar */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-50 border rounded-lg text-center">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">Total Packages</span>
              <span className="text-xl font-black text-gray-900">{manifest.totalOrders}</span>
              <span className="text-[10px] text-gray-400 block">packages</span>
            </div>
            <div className="p-3 bg-gray-50 border rounded-lg text-center">
              <span className="text-[10px] font-bold uppercase text-gray-500 block">Total Gross Weight</span>
              <span className="text-xl font-black text-gray-900">{manifest.totalWeight.toFixed(2)}</span>
              <span className="text-[10px] text-gray-400 block">kg</span>
            </div>
          </div>

          {/* Sub-Orders List Table */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase text-gray-700 tracking-wider mb-2 flex items-center justify-between">
              <span>Itemized Sub-Order List ({manifest.orders.length} orders)</span>
              <span className="text-[10px] text-gray-400 font-normal">All items physically inspected</span>
            </h4>
            
            <table className="w-full text-left text-xs border border-gray-300 border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
                  <th className="p-2 border-r border-gray-300 w-8 text-center">#</th>
                  <th className="p-2 border-r border-gray-300 w-32">Order Code</th>
                  <th className="p-2 border-r border-gray-300 w-36">Carrier Tracking #</th>
                  <th className="p-2 border-r border-gray-300">Receiver & Destination</th>
                  <th className="p-2 border-r border-gray-300 w-20 text-center">Weight</th>
                  <th className="p-2 border-r border-gray-300 w-28 text-right">COD (VND)</th>
                  <th className="p-2 w-20 text-center">Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {manifest.orders.map((ord, idx) => (
                  <tr key={ord.id} className="text-gray-800">
                    <td className="p-2 border-r border-gray-300 text-center text-gray-500 font-mono">{idx + 1}</td>
                    <td className="p-2 border-r border-gray-300 font-mono font-bold text-gray-900">{ord.orderCode}</td>
                    <td className="p-2 border-r border-gray-300 font-mono text-blue-800 font-semibold">{ord.trackingNumber}</td>
                    <td className="p-2 border-r border-gray-300">
                      <div className="font-semibold text-gray-900">{ord.receiverName} - <span className="font-mono text-gray-600 text-[11px]">{ord.receiverPhone}</span></div>
                      <div className="text-[11px] text-gray-500 line-clamp-1">{ord.receiverAddress}</div>
                    </td>
                    <td className="p-2 border-r border-gray-300 text-center font-mono">{ord.weight} kg</td>
                    <td className="p-2 border-r border-gray-300 text-right font-mono font-semibold">
                      {ord.codAmount > 0 ? new Intl.NumberFormat('en-US').format(ord.codAmount) : '-'}
                    </td>
                    <td className="p-2 text-center">
                      <div className="w-4 h-4 border border-gray-400 mx-auto rounded-sm"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold border-t-2 border-gray-300 text-gray-900">
                  <td colSpan={4} className="p-2 text-right border-r border-gray-300 uppercase text-[11px]">
                    Total Handover Summary:
                  </td>
                  <td className="p-2 text-center border-r border-gray-300 font-mono">
                    {manifest.totalWeight.toFixed(2)} kg
                  </td>
                  <td className="p-2 text-right border-r border-gray-300 font-mono text-[#1b4d3e]">
                    {formattedCod}
                  </td>
                  <td className="p-2 text-center text-[10px] text-gray-500">
                    {manifest.orders.length} pkgs
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Legal Compliance Declaration */}
          <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[10px] text-gray-600 mb-8 leading-relaxed">
            <strong>Confirmation & Legal Notice:</strong> By signing below, both parties confirm that all listed goods and packages have been handed over with intact security seals, correct quantity, and undamaged outer packaging. Any discrepancy or damage must be annotated on this manifest prior to departure.
          </div>

          {/* Signature Blocks for Signing */}
          <div className="grid grid-cols-2 gap-8 text-center pt-2">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-gray-900">Handover Representative (Sender / Warehouse)</p>
              <p className="text-[10px] text-gray-500 italic">(Sign and write full name)</p>
              <div className="h-24 flex items-end justify-center border-b border-dashed border-gray-400 mx-8 pb-2">
                <span className="text-xs font-semibold text-gray-400">Signature / Seal</span>
              </div>
              <p className="text-xs font-medium text-gray-700 pt-2">Full Name: _______________________</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-gray-900">Carrier Representative / Driver (Receiver)</p>
              <p className="text-[10px] text-gray-500 italic">(Sign and write full name & vehicle plate)</p>
              <div className="h-24 flex items-end justify-center border-b border-dashed border-gray-400 mx-8 pb-2">
                <span className="text-xs font-semibold text-gray-400">Signature</span>
              </div>
              <p className="text-xs font-medium text-gray-700 pt-2">Full Name: _______________________</p>
            </div>
          </div>

          {/* Footer Timestamp */}
          <div className="mt-10 pt-4 border-t text-[10px] text-gray-400 flex items-center justify-between">
            <span>Generated by Hasaki Logistics WMS • Handover Auto System</span>
            <span>Printed on: {new Date().toLocaleString('en-US')}</span>
          </div>

        </div>

        {/* Modal Bottom Controls */}
        <div className="print:hidden px-6 py-3 bg-gray-50 border-t flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Ensure printer scale is set to "Default" or "Fit to page width"
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors text-gray-700"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-[#1b4d3e] hover:bg-[#14392e] text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <i className="fa-solid fa-print"></i> Print Manifest (Ctrl+P)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
