import React, { useState } from 'react';
import { HazmatGroupConfig } from '../types';
import { MOCK_HAZMAT_GROUPS } from '../constants';

interface HazmatGroupConfigViewProps {
  onBack?: () => void;
}

export const HazmatGroupConfigView: React.FC<HazmatGroupConfigViewProps> = () => {
  const [hazmatList, setHazmatList] = useState<HazmatGroupConfig[]>(MOCK_HAZMAT_GROUPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [filterIsHazmat, setFilterIsHazmat] = useState<string>('ALL');
  const [filterHandlingGroup, setFilterHandlingGroup] = useState<string>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HazmatGroupConfig | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<HazmatGroupConfig>>({
    hazmatGroup: '',
    hazardClass: '3',
    isHazmat: true,
    nhanLQ: true,
    nhanMuiTen: true,
    handlingGroup: 'HAZMAT_TRAY',
    lqMaxMl: 1000,
    unNumber: 'UN1266',
    description: '',
    packingInstructions: ''
  });

  // Filtered Items
  const filteredList = hazmatList.filter(item => {
    const groupNameNoUnderscore = item.hazmatGroup.replace(/_/g, ' ');
    const handlingGroupNoUnderscore = item.handlingGroup.replace(/_/g, ' ');

    const matchesSearch =
      item.hazmatGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      groupNameNoUnderscore.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      handlingGroupNoUnderscore.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesClass = filterClass === 'ALL' || item.hazardClass === filterClass;
    const matchesIsHazmat =
      filterIsHazmat === 'ALL' ||
      (filterIsHazmat === 'Y' && item.isHazmat) ||
      (filterIsHazmat === 'N' && !item.isHazmat);
    const matchesHandling = filterHandlingGroup === 'ALL' || item.handlingGroup === filterHandlingGroup;

    return matchesSearch && matchesClass && matchesIsHazmat && matchesHandling;
  });

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      hazmatGroup: '',
      hazardClass: '3',
      isHazmat: true,
      nhanLQ: true,
      nhanMuiTen: true,
      handlingGroup: 'HAZMAT_TRAY',
      lqMaxMl: 1000,
      unNumber: 'UN1266',
      description: '',
      packingInstructions: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: HazmatGroupConfig) => {
    setEditingItem(item);
    setFormData({
      ...item
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, groupName: string) => {
    const cleanName = groupName.replace(/_/g, ' ');
    if (window.confirm(`Are you sure you want to delete hazmat group "${cleanName}"?`)) {
      setHazmatList(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hazmatGroup?.trim()) {
      alert('Please enter a Hazmat Group code');
      return;
    }

    const cleanGroup = formData.hazmatGroup.trim().toUpperCase().replace(/\s+/g, '_');

    if (editingItem) {
      // Update
      setHazmatList(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? ({
                ...item,
                ...formData,
                hazmatGroup: cleanGroup,
                hazardClass: formData.hazardClass || '—',
                isHazmat: !!formData.isHazmat,
                nhanLQ: !!formData.nhanLQ,
                nhanMuiTen: !!formData.nhanMuiTen,
                handlingGroup: formData.handlingGroup || 'NORMAL',
                lqMaxMl: formData.isHazmat ? (formData.lqMaxMl ?? 0) : null,
                unNumber: formData.isHazmat ? (formData.unNumber || 'UN9999') : '—',
                updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
              } as HazmatGroupConfig)
            : item
        )
      );
    } else {
      // Create new
      const newItem: HazmatGroupConfig = {
        id: `hz-${Date.now()}`,
        hazmatGroup: cleanGroup,
        hazardClass: formData.hazardClass || '—',
        isHazmat: !!formData.isHazmat,
        nhanLQ: !!formData.nhanLQ,
        nhanMuiTen: !!formData.nhanMuiTen,
        handlingGroup: formData.handlingGroup || 'NORMAL',
        lqMaxMl: formData.isHazmat ? (formData.lqMaxMl ?? 0) : null,
        unNumber: formData.isHazmat ? (formData.unNumber || 'UN9999') : '—',
        description: formData.description || '',
        packingInstructions: formData.packingInstructions || '',
        carrierAllowed: ['All Carriers'],
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setHazmatList(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all hazmat group configurations back to default standard?')) {
      setHazmatList(MOCK_HAZMAT_GROUPS);
    }
  };

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      
      {/* Filter & Action Bar */}
      <div className="p-4 border-b border-gray-100 bg-gray-50/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search Hazmat Group, UN Number, Handling Group..."
              className="w-full bg-white border border-gray-300 rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] focus:border-[#4d9e5f]"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2.5 text-gray-400 text-xs"></i>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>

          {/* Quick Filters & Add Button */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterClass}
              onChange={e => setFilterClass(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
            >
              <option value="ALL">All Hazard Classes</option>
              <option value="3">Class 3 (Flammable Liquid)</option>
              <option value="2.1">Class 2.1 (Flammable Gas)</option>
              <option value="9">Class 9 (Misc / Battery)</option>
              <option value="—">Class — (Non-Hazmat)</option>
            </select>

            <select
              value={filterIsHazmat}
              onChange={e => setFilterIsHazmat(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
            >
              <option value="ALL">All Hazmat Statuses</option>
              <option value="Y">Hazmat Only (Yes)</option>
              <option value="N">Non-Hazmat (No)</option>
            </select>

            <select
              value={filterHandlingGroup}
              onChange={e => setFilterHandlingGroup(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
            >
              <option value="ALL">All Handling Groups</option>
              <option value="HAZMAT_TRAY">Hazmat Tray</option>
              <option value="LANE_LITHIUM">Lane Lithium</option>
              <option value="NORMAL">Normal</option>
            </select>

            {(searchTerm || filterClass !== 'ALL' || filterIsHazmat !== 'ALL' || filterHandlingGroup !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterClass('ALL');
                  setFilterIsHazmat('ALL');
                  setFilterHandlingGroup('ALL');
                }}
                className="px-2.5 py-1.5 text-xs text-gray-500 hover:text-red-600 font-medium transition-colors"
              >
                <i className="fa-solid fa-rotate-left mr-1"></i> Reset
              </button>
            )}

            <button
              onClick={handleOpenCreate}
              className="px-3.5 py-1.5 bg-[#4d9e5f] hover:bg-[#3d7d4c] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ml-auto"
            >
              <i className="fa-solid fa-plus text-xs"></i>
              <span>Add Hazmat Group</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed View Table (Default View) */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
            <tr>
              <th className="px-4 py-3.5 border-r border-gray-200">
                Hazmat Group
              </th>
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                Hazard Class
              </th>
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                Is Hazmat
              </th>
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                LQ Label
              </th>
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                Arrow Label
              </th>
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                Handling Group
              </th>
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                LQ Max Volume (ml)
              </th>
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                UN Number
              </th>
              <th className="px-4 py-3.5 text-center w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                  <i className="fa-solid fa-folder-open text-3xl mb-2 text-gray-300 block"></i>
                  No Hazmat Groups found matching the current filters.
                </td>
              </tr>
            ) : (
              filteredList.map(item => {
                const cleanGroupDisplay = item.hazmatGroup.replace(/_/g, ' ');
                const cleanHandlingDisplay = item.handlingGroup.replace(/_/g, ' ');
                const isLithium = item.hazmatGroup === 'LITHIUM_BATTERY';

                return (
                  <tr
                    key={item.id}
                    className={`transition-colors ${
                      isLithium ? 'bg-[#fff5f5] hover:bg-[#ffebeb]' : 'hover:bg-green-50/40'
                    }`}
                  >
                    {/* Hazmat Group & Description */}
                    <td className="px-4 py-3.5 border-r border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs text-[#1b4d3e]">
                          {cleanGroupDisplay}
                        </span>
                        {item.isHazmat && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Hazmat Regulated"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                        {item.description || 'Standard classification'}
                      </p>
                    </td>

                    {/* Hazard Class */}
                    <td className="px-4 py-3.5 border-r border-gray-100 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-gray-100 text-gray-800">
                        {item.hazardClass !== '—' ? `Class ${item.hazardClass}` : '—'}
                      </span>
                    </td>

                    {/* Is Hazmat */}
                    <td className="px-4 py-3.5 border-r border-gray-100 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          item.isHazmat
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {item.isHazmat ? 'Yes' : 'No'}
                      </span>
                    </td>

                    {/* LQ Label */}
                    <td className="px-4 py-3.5 border-r border-gray-100 text-center">
                      {item.nhanLQ ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
                          <i className="fa-solid fa-diamond text-[8px]"></i>
                          YES
                        </span>
                      ) : (
                        <span className="text-gray-400 font-normal">—</span>
                      )}
                    </td>

                    {/* Arrow Label */}
                    <td className="px-4 py-3.5 border-r border-gray-100 text-center">
                      {item.nhanMuiTen ? (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 inline-flex items-center gap-1">
                          <i className="fa-solid fa-arrows-up-to-line text-[9px]"></i>
                          YES
                        </span>
                      ) : (
                        <span className="text-gray-400 font-normal">—</span>
                      )}
                    </td>

                    {/* Handling Group */}
                    <td className="px-4 py-3.5 border-r border-gray-100 text-center font-mono">
                      <span
                        className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                          item.handlingGroup === 'HAZMAT_TRAY'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : item.handlingGroup === 'LANE_LITHIUM'
                            ? 'bg-rose-100 text-rose-900 border border-rose-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cleanHandlingDisplay}
                      </span>
                    </td>

                    {/* LQ Max Volume (ml) */}
                    <td className="px-4 py-3.5 border-r border-gray-100 text-center font-mono font-bold text-gray-800">
                      {item.lqMaxMl !== null ? `${item.lqMaxMl.toLocaleString()} ml` : '—'}
                    </td>

                    {/* UN Number */}
                    <td className="px-4 py-3.5 border-r border-gray-100 text-center font-mono font-black text-blue-700">
                      {item.unNumber}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="w-7 h-7 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
                          title="Edit Group"
                        >
                          <i className="fa-regular fa-pen-to-square text-xs"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.hazmatGroup)}
                          className="w-7 h-7 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center"
                          title="Delete Group"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-3 bg-gray-50/80 border-t flex flex-wrap items-center justify-between text-xs text-gray-500 gap-3">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-gray-900">{filteredList.length}</strong> of <strong className="text-gray-900">{hazmatList.length}</strong> groups</span>
        </div>

        <button
          onClick={handleResetDefaults}
          className="text-gray-500 hover:text-gray-900 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <i className="fa-solid fa-rotate-left text-[11px]"></i> Reset to Standard
        </button>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                  <i className="fa-solid fa-triangle-exclamation text-sm"></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    {editingItem ? `Edit Hazmat Group: ${editingItem.hazmatGroup.replace(/_/g, ' ')}` : 'Add New Hazmat Group'}
                  </h3>
                  <p className="text-xs text-gray-400">Configure dangerous goods classification and packaging flags</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-base"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                    Hazmat Group Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hazmatGroup?.replace(/_/g, ' ') || ''}
                    onChange={e => setFormData({ ...formData, hazmatGroup: e.target.value.toUpperCase() })}
                    placeholder="e.g. PERFUME, NAIL, AEROSOL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                    Hazard Class
                  </label>
                  <select
                    value={formData.hazardClass || '3'}
                    onChange={e => setFormData({ ...formData, hazardClass: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none bg-white font-mono"
                  >
                    <option value="3">3 (Flammable Liquid)</option>
                    <option value="2.1">2.1 (Flammable Gas / Aerosol)</option>
                    <option value="9">9 (Miscellaneous / Lithium Battery)</option>
                    <option value="4.1">4.1 (Flammable Solid)</option>
                    <option value="8">8 (Corrosive Substance)</option>
                    <option value="—">— (Non-Hazardous / Safe)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                    Handling Group
                  </label>
                  <select
                    value={formData.handlingGroup || 'HAZMAT_TRAY'}
                    onChange={e => setFormData({ ...formData, handlingGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none bg-white font-mono font-bold"
                  >
                    <option value="HAZMAT_TRAY">Hazmat Tray (Spill Tray Protected)</option>
                    <option value="LANE_LITHIUM">Lane Lithium (Dedicated Battery Lane)</option>
                    <option value="NORMAL">Normal (Standard Conveyor / Sorting)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                    UN Number
                  </label>
                  <input
                    type="text"
                    value={formData.unNumber || ''}
                    onChange={e => setFormData({ ...formData, unNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. UN1266, UN1263, UN1950"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                  LQ Max Volume (ml)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={formData.lqMaxMl ?? ''}
                  onChange={e => setFormData({ ...formData, lqMaxMl: e.target.value === '' ? null : parseInt(e.target.value, 10) })}
                  placeholder="e.g. 5000, 1000, 0 (leave blank for Non-Hazmat)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] font-mono"
                />
                <span className="text-[10px] text-gray-400 block">Maximum inner container liquid volume exempt under Limited Quantity provisions</span>
              </div>

              {/* Toggles */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <span className="font-bold text-gray-800 uppercase tracking-wider text-[10px] block">
                  Packaging & Label Flags
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-[#4d9e5f]">
                    <input
                      type="checkbox"
                      checked={!!formData.isHazmat}
                      onChange={e => setFormData({ ...formData, isHazmat: e.target.checked })}
                      className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold block text-gray-800">Is Hazmat (Yes)</span>
                      <span className="text-[10px] text-gray-400">Classified as DG</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-[#4d9e5f]">
                    <input
                      type="checkbox"
                      checked={!!formData.nhanLQ}
                      onChange={e => setFormData({ ...formData, nhanLQ: e.target.checked })}
                      className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold block text-gray-800">LQ Label</span>
                      <span className="text-[10px] text-gray-400">Black diamond marking</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-[#4d9e5f]">
                    <input
                      type="checkbox"
                      checked={!!formData.nhanMuiTen}
                      onChange={e => setFormData({ ...formData, nhanMuiTen: e.target.checked })}
                      className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold block text-gray-800">Arrow Label (↑↑)</span>
                      <span className="text-[10px] text-gray-400">Orientation marking</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                  Description / Product Examples
                </label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Perfumery products with flammable solvents"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                  Warehouse Packing Instructions
                </label>
                <textarea
                  rows={2}
                  value={formData.packingInstructions || ''}
                  onChange={e => setFormData({ ...formData, packingInstructions: e.target.value })}
                  placeholder="e.g. Pack upright in hazmat spill tray with absorbent pads..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
                />
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1b4d3e] hover:bg-[#14392e] text-white rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>{editingItem ? 'Save Changes' : 'Create Group'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
