import React, { useState } from 'react';
import { PurchaseOrder, Item } from './types';

interface ShipmentPlanningModalProps {
  po: PurchaseOrder;
  onClose: () => void;
  onConfirm: (plannedItems: { itemCode: string; plannedQty: number }[]) => void;
}

export function ShipmentPlanningModal({ po, onClose, onConfirm }: ShipmentPlanningModalProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQtyChange = (itemCode: string, qty: number, maxQty: number) => {
    if (qty < 0) qty = 0;
    if (qty > maxQty) qty = maxQty;
    setQuantities({ ...quantities, [itemCode]: qty });
  };

  const handleConfirm = () => {
    const plannedItems = Object.entries(quantities)
      .filter(([_, qty]) => (qty as number) > 0)
      .map(([itemCode, plannedQty]) => ({ itemCode, plannedQty: plannedQty as number }));
    onConfirm(plannedItems);
  };

  const totalPlannedQty = Object.values(quantities).reduce((a, b) => (a as number) + (b as number), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Shipment Planning</h3>
            <p className="text-xs text-gray-500">PO: {po.poCode}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-sm text-gray-600 mb-6">
            Assign the quantity for each line item to be included in this specific delivery trip.
          </p>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#f8f9fc] text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-bold border-b border-gray-100">Item</th>
                  <th className="px-4 py-3 font-bold border-b border-gray-100 text-right">Total Qty</th>
                  <th className="px-4 py-3 font-bold border-b border-gray-100 text-right">Remaining</th>
                  <th className="px-4 py-3 font-bold border-b border-gray-100 text-right w-32">Plan Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {po.items?.map((item, idx) => {
                  const remaining = item.quantity; // Since we don't track previously shipped in UI yet, we assume full quantity
                  const currentPlan = quantities[item.code] || 0;
                  
                  return (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-gray-900">{item.code}</div>
                        <div className="text-xs text-gray-500">{item.name}</div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{item.quantity.toLocaleString()} {item.unit}</td>
                      <td className="px-4 py-3 text-right font-medium text-blue-600">{remaining.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={currentPlan === 0 ? '' : currentPlan}
                          placeholder="0"
                          min="0"
                          max={remaining}
                          onChange={(e) => handleQtyChange(item.code, parseInt(e.target.value) || 0, remaining)}
                          className="w-full text-right bg-white border border-gray-300 rounded px-2 py-1.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-bold text-gray-900"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-sm font-bold text-gray-700">
            Total Planned Quantity: <span className="text-blue-600">{totalPlannedQty.toLocaleString()}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 font-bold text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={totalPlannedQty === 0}
              className="px-5 py-2 font-bold text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <i className="fa-solid fa-calendar-check"></i> Create Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
