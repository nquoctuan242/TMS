import React, { useState } from 'react';
import { MOCK_DELIVERY_SLA_CONFIGS } from '../constants';
import { DeliverySLAConfig } from '../types';

interface DeliverySLAListViewProps {
  onEdit: (id: string) => void;
  onCreate: () => void;
}

export function DeliverySLAListView({ onEdit, onCreate }: DeliverySLAListViewProps) {
  const [configs] = useState<DeliverySLAConfig[]>(MOCK_DELIVERY_SLA_CONFIGS);

  const formatDaysAdd = (days: number) => {
    if (days === 0) return 'same day';
    if (days === 1) return '+1 day';
    return `+${days} days`;
  };

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Delivery SLA Management</h2>
        <button 
          onClick={onCreate}
          className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Configuration
        </button>
      </div>
      <div className="p-4 flex-1">
        <div className="border border-gray-100 rounded overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8f9fa] text-gray-500 font-bold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 w-1/5 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 w-32 uppercase tracking-wider">Cutoff</th>
                <th className="px-4 py-3 flex-1 uppercase tracking-wider">Delivery Rule</th>
                <th className="px-4 py-3 w-40 uppercase tracking-wider">Late Alert</th>
                <th className="px-4 py-3 w-40 uppercase tracking-wider">Location Overrides</th>
                <th className="px-4 py-3 w-20 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-600 font-medium bg-white">
              {configs.map((config) => (
                <tr key={config.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-bold text-gray-800">{config.serviceName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[#d32f2f] bg-red-50 px-2 py-1 rounded font-bold">
                      {config.cutoffTime}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-gray-500">
                    <div>
                      before → <span className="text-gray-800 font-bold">{config.beforeCutoffDeliverTime}</span> {formatDaysAdd(config.beforeCutoffDaysAdd)} ·
                    </div>
                    <div>
                      after → <span className="text-gray-800 font-bold">{config.afterCutoffDeliverTime}</span> {formatDaysAdd(config.afterCutoffDaysAdd)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[#b45309] bg-[#fef3c7] px-2 py-1 rounded font-medium text-[11px]">
                      {config.lateAlertMinutes} min before
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[11px] font-bold mr-1">
                      {config.locationOverrides.length}
                    </span>
                    locations
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button 
                      onClick={() => onEdit(config.id)}
                      className="text-[#1976d2] font-medium text-[13px] flex items-center justify-end gap-1 hover:underline"
                    >
                      Detail <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
