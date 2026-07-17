import React from 'react';
import { LandingCostConfig } from '../types';

interface LandingCostListViewProps {
  configs: LandingCostConfig[];
  onAddNew: () => void;
  onEdit: (config: LandingCostConfig) => void;
}

export function LandingCostListView({ configs, onAddNew, onEdit }: LandingCostListViewProps) {
  return (
    <div className="bg-[#f8fafc] min-h-full py-6 px-4 pb-24 font-sans animate-in fade-in duration-300">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Landing Cost Configs</h1>
            <p className="text-sm text-gray-500">Manage rules and formulas for calculating landing costs.</p>
          </div>
          <button 
            onClick={onAddNew}
            className="bg-[#1b4d3e] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#153a2f] shadow-sm transition-colors flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Add Config
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                <th className="p-4 border-b border-gray-100">Name</th>
                <th className="p-4 border-b border-gray-100">Type</th>
                <th className="p-4 border-b border-gray-100">Formula</th>
                <th className="p-4 border-b border-gray-100">Active</th>
                <th className="p-4 border-b border-gray-100 w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {configs.map((config) => (
                <tr key={config.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-800">{config.name}</td>
                  <td className="p-4"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold border border-blue-100">{config.type}</span></td>
                  <td className="p-4 font-mono text-xs text-gray-500">{config.formula}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${config.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                      {config.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => onEdit(config)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {configs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 italic text-sm">
                    No landing cost configs found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
