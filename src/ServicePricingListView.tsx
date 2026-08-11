import React, { useState } from 'react';
import { MOCK_SERVICE_PRICING } from '../constants';
import { ServicePricing } from '../types';
import { ServicePricingDetailView } from './ServicePricingDetailView';

export function ServicePricingListView() {
  const [pricings, setPricings] = useState<ServicePricing[]>(MOCK_SERVICE_PRICING);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (editingId !== null) {
    return (
      <ServicePricingDetailView 
        pricingId={editingId === 'new' ? null : editingId}
        onBack={() => setEditingId(null)}
        onSave={(data) => {
          if (editingId === 'new') {
            setPricings([...pricings, { ...data, id: Math.random().toString() }]);
          } else {
            setPricings(pricings.map(p => p.id === data.id ? data : p));
          }
          setEditingId(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setEditingId('new')}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
        >
          <i className="fa-solid fa-plus"></i> Create Service Pricing
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#d5e3da] text-xs text-gray-800">
            <tr>
              <th className="px-4 py-3 font-bold border-b border-gray-200 w-16"></th>
              <th className="px-4 py-3 font-bold border-b border-gray-200">Code</th>
              <th className="px-4 py-3 font-bold border-b border-gray-200">Version Name</th>
              <th className="px-4 py-3 font-bold border-b border-gray-200">Effective Date (UTC+7)</th>
              <th className="px-4 py-3 font-bold border-b border-gray-200">Expired Date (UTC+7)</th>
              <th className="px-4 py-3 font-bold border-b border-gray-200">Dynamic Pricing Schema</th>
              <th className="px-4 py-3 font-bold border-b border-gray-200">Status</th>
              <th className="px-4 py-3 font-bold border-b border-gray-200">Note</th>
              <th className="px-4 py-3 font-bold border-b border-gray-200 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {pricings.map(pricing => (
              <tr key={pricing.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-4 py-3 border-r border-gray-200 text-center bg-[#8bc39d]">
                  <button className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100">
                    <i className="fa-regular fa-copy text-gray-500 text-xs"></i>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span className="text-blue-500 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded text-xs">
                    {pricing.code}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-800">{pricing.versionName}</td>
                <td className="px-4 py-3 text-gray-800">{pricing.effectiveDate}</td>
                <td className="px-4 py-3 text-gray-800">{pricing.expiredDate}</td>
                <td className="px-4 py-3 text-gray-800">
                   <span className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">{pricing.dynamicPricingSchema}</span>
                </td>
                <td className="px-4 py-3 text-gray-800">{pricing.status}</td>
                <td className="px-4 py-3 text-gray-800">{pricing.note}</td>
                <td className="px-4 py-3 text-center space-x-3">
                  <button onClick={() => setEditingId(pricing.id)} className="text-blue-500 hover:text-blue-700">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
            {pricings.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                  No service pricing found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
