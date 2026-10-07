import React, { useState } from 'react';
import { HazmatGroupConfig, CarrierApiConfig } from '../types';
import { MOCK_HAZMAT_GROUPS } from '../constants';

interface HazmatGroupConfigViewProps {
  onBack?: () => void;
}

const COMMON_CARRIERS = [
  'Easyship (item flag)',
  'EasyPost — USPS',
  'EasyPost — FedEx/DHL',
  'SPX Express',
  'GHN (Giao Hang Nhanh)',
  'GHTK (Giao Hang Tiet Kiem)',
  'Viettel Post',
  'DHL Express',
  'FedEx Express'
];

export const HazmatGroupConfigView: React.FC<HazmatGroupConfigViewProps> = () => {
  const [hazmatList, setHazmatList] = useState<HazmatGroupConfig[]>(MOCK_HAZMAT_GROUPS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [filterIsHazmat, setFilterIsHazmat] = useState<string>('ALL');
  const [filterHandlingGroup, setFilterHandlingGroup] = useState<string>('ALL');

  // Expanded Row for inline Carrier API preview
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // Detail Modal State
  const [viewingDetailItem, setViewingDetailItem] = useState<HazmatGroupConfig | null>(null);
  const [detailTab, setDetailTab] = useState<'carrier_api' | 'overview'>('carrier_api');

  // Create/Edit Modal State
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
    dgNature: 'Flammable liquid, Class 3',
    description: '',
    packingInstructions: '',
    carrierApiConfigs: [
      { id: '1', carrier: 'Easyship (item flag)', parameterField: 'item_flag', parameterValue: 'contains_liquids = true', description: 'Liquid flag on line item' },
      { id: '2', carrier: 'EasyPost — USPS', parameterField: 'hazmat_type', parameterValue: 'CLASS_3', description: 'USPS hazmat authorization' },
      { id: '3', carrier: 'EasyPost — FedEx/DHL', parameterField: 'hazmat_type', parameterValue: 'LIMITED_QUANTITY / ORMD', description: 'FedEx/DHL ground limited quantity' }
    ]
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
      (item.dgNature && item.dgNature.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.carrierApiConfigs && item.carrierApiConfigs.some(c =>
        c.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.parameterValue.toLowerCase().includes(searchTerm.toLowerCase())
      ));

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
      dgNature: 'Flammable liquid, Class 3',
      description: '',
      packingInstructions: '',
      carrierApiConfigs: [
        { id: `c-${Date.now()}-1`, carrier: 'Easyship (item flag)', parameterField: 'item_flag', parameterValue: 'contains_liquids = true', description: 'Liquid flag on line item' },
        { id: `c-${Date.now()}-2`, carrier: 'EasyPost — USPS', parameterField: 'hazmat_type', parameterValue: 'CLASS_3', description: 'USPS hazmat code' },
        { id: `c-${Date.now()}-3`, carrier: 'EasyPost — FedEx/DHL', parameterField: 'hazmat_type', parameterValue: 'LIMITED_QUANTITY / ORMD', description: 'FedEx/DHL ground limit' }
      ]
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: HazmatGroupConfig) => {
    setEditingItem(item);
    setFormData({
      ...item,
      carrierApiConfigs: item.carrierApiConfigs ? [...item.carrierApiConfigs] : []
    });
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item: HazmatGroupConfig) => {
    setViewingDetailItem(item);
    setDetailTab('carrier_api');
  };

  const handleDelete = (id: string, groupName: string) => {
    const cleanName = groupName.replace(/_/g, ' ');
    if (window.confirm(`Are you sure you want to delete hazmat group "${cleanName}"?`)) {
      setHazmatList(prev => prev.filter(item => item.id !== id));
      if (viewingDetailItem?.id === id) {
        setViewingDetailItem(null);
      }
    }
  };

  const handleAddCarrierParam = () => {
    const newConfig: CarrierApiConfig = {
      id: `c-param-${Date.now()}`,
      carrier: 'Easyship (item flag)',
      parameterField: 'item_flag',
      parameterValue: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      carrierApiConfigs: [...(prev.carrierApiConfigs || []), newConfig]
    }));
  };

  const handleRemoveCarrierParam = (index: number) => {
    setFormData(prev => ({
      ...prev,
      carrierApiConfigs: prev.carrierApiConfigs?.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateCarrierParam = (index: number, field: keyof CarrierApiConfig, value: string) => {
    setFormData(prev => ({
      ...prev,
      carrierApiConfigs: prev.carrierApiConfigs?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
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
                dgNature: formData.dgNature || '',
                carrierApiConfigs: formData.carrierApiConfigs || [],
                updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
              } as HazmatGroupConfig)
            : item
        )
      );

      // If viewing the same detail item, update it in view
      if (viewingDetailItem?.id === editingItem.id) {
        setViewingDetailItem({
          ...viewingDetailItem,
          ...formData,
          hazmatGroup: cleanGroup,
          hazardClass: formData.hazardClass || '—',
          isHazmat: !!formData.isHazmat,
          nhanLQ: !!formData.nhanLQ,
          nhanMuiTen: !!formData.nhanMuiTen,
          handlingGroup: formData.handlingGroup || 'NORMAL',
          lqMaxMl: formData.isHazmat ? (formData.lqMaxMl ?? 0) : null,
          unNumber: formData.isHazmat ? (formData.unNumber || 'UN9999') : '—',
          dgNature: formData.dgNature || '',
          carrierApiConfigs: formData.carrierApiConfigs || []
        } as HazmatGroupConfig);
      }
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
        dgNature: formData.dgNature || '',
        description: formData.description || '',
        packingInstructions: formData.packingInstructions || '',
        carrierAllowed: ['All Carriers'],
        carrierApiConfigs: formData.carrierApiConfigs || [],
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };
      setHazmatList(prev => [...prev, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all hazmat group configurations back to default standard?')) {
      setHazmatList(MOCK_HAZMAT_GROUPS);
      if (viewingDetailItem) {
        const found = MOCK_HAZMAT_GROUPS.find(h => h.id === viewingDetailItem.id);
        if (found) setViewingDetailItem(found);
      }
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
              placeholder="Search Hazmat Group, DG Nature, Carrier API params..."
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
              <th className="px-4 py-3.5 border-r border-gray-200 text-center">
                Carrier API Mappings
              </th>
              <th className="px-4 py-3.5 text-center w-28">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                  <i className="fa-solid fa-folder-open text-3xl mb-2 text-gray-300 block"></i>
                  No Hazmat Groups found matching the current filters.
                </td>
              </tr>
            ) : (
              filteredList.map(item => {
                const cleanGroupDisplay = item.hazmatGroup.replace(/_/g, ' ');
                const cleanHandlingDisplay = item.handlingGroup.replace(/_/g, ' ');
                const isLithium = item.hazmatGroup.includes('LITHIUM');
                const isExpanded = expandedRowId === item.id;
                const carrierCount = item.carrierApiConfigs?.length || 0;

                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`transition-colors cursor-pointer ${
                        isLithium ? 'bg-[#fff5f5] hover:bg-[#ffebeb]' : 'hover:bg-green-50/40'
                      }`}
                      onClick={() => setExpandedRowId(isExpanded ? null : item.id)}
                    >
                      {/* Hazmat Group & Description */}
                      <td className="px-4 py-3.5 border-r border-gray-100">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedRowId(isExpanded ? null : item.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 transition-colors mr-0.5"
                            title={isExpanded ? 'Collapse Carrier API details' : 'Expand Carrier API details'}
                          >
                            <i className={`fa-solid ${isExpanded ? 'fa-chevron-down text-emerald-600' : 'fa-chevron-right'} text-[10px]`}></i>
                          </button>
                          <span className="font-mono font-black text-xs text-[#1b4d3e]">
                            {cleanGroupDisplay}
                          </span>
                          {item.isHazmat && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Hazmat Regulated"></span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-tight pl-4">
                          {item.dgNature || item.description || 'Standard classification'}
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

                      {/* Carrier API Mappings Preview Badge */}
                      <td className="px-4 py-3.5 border-r border-gray-100 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDetail(item);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-2xs"
                          title="Click to view full Carrier API mapping values"
                        >
                          <i className="fa-solid fa-network-wired text-[10px] text-emerald-600"></i>
                          <span>{carrierCount} Carriers</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(item)}
                            className="w-7 h-7 rounded-lg text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                            title="View Detail & Carrier API Parameters"
                          >
                            <i className="fa-regular fa-eye text-xs"></i>
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="w-7 h-7 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
                            title="Edit Group & Carrier API Params"
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

                    {/* Expandable Inline Carrier API Parameters Table */}
                    {isExpanded && (
                      <tr className="bg-gray-50/90 border-b border-gray-200 animate-in fade-in duration-200">
                        <td colSpan={10} className="p-4 pl-10">
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-2xs space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#1b4d3e]"></span>
                                <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
                                  Carrier API Transmit Parameters ({cleanGroupDisplay})
                                </h4>
                                <span className="text-[11px] text-gray-500 italic">
                                  — {item.dgNature || item.description}
                                </span>
                              </div>
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="text-xs text-[#1b4d3e] hover:underline font-semibold flex items-center gap-1"
                              >
                                <i className="fa-solid fa-pen text-[10px]"></i>
                                <span>Edit Carrier Parameters</span>
                              </button>
                            </div>

                            {item.carrierApiConfigs && item.carrierApiConfigs.length > 0 ? (
                              <div className="overflow-x-auto rounded border border-gray-100">
                                <table className="w-full text-left text-xs">
                                  <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
                                    <tr>
                                      <th className="px-3.5 py-2 border-r border-gray-200 w-[28%]">Carrier</th>
                                      <th className="px-3.5 py-2 border-r border-gray-200 w-[22%]">Parameter Field</th>
                                      <th className="px-3.5 py-2 border-r border-gray-200 w-[30%]">API Value to Fill</th>
                                      <th className="px-3.5 py-2">Notes</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                    {item.carrierApiConfigs.map((c, idx) => (
                                      <tr key={c.id || idx} className="hover:bg-gray-50/80">
                                        <td className="px-3.5 py-2 border-r border-gray-100 font-bold text-gray-800">
                                          {c.carrier}
                                        </td>
                                        <td className="px-3.5 py-2 border-r border-gray-100 font-mono text-gray-600">
                                          {c.parameterField || 'item flag / hazmat type'}
                                        </td>
                                        <td className="px-3.5 py-2 border-r border-gray-100">
                                          <code className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                            {c.parameterValue}
                                          </code>
                                        </td>
                                        <td className="px-3.5 py-2 text-gray-500 text-[11px]">
                                          {c.description || 'Transmit during shipment creation API call'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic py-2">
                                No carrier API parameters configured for this group. Click Edit to add carrier mappings.
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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

      {/* HAZMAT GROUP DETAIL MODAL (Including Carrier API Parameters) */}
      {viewingDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1b4d3e] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/20">
                  <i className="fa-solid fa-shield-halved text-base"></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <span>{viewingDetailItem.hazmatGroup.replace(/_/g, ' ')}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-white/20 text-white border border-white/30">
                      {viewingDetailItem.hazardClass !== '—' ? `Class ${viewingDetailItem.hazardClass}` : 'Non-DG'}
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-200">
                    {viewingDetailItem.dgNature || viewingDetailItem.description || 'Hazmat Group Specification & Carrier API'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingDetailItem(null)}
                className="text-white/70 hover:text-white p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 px-6 pt-2">
              <button
                onClick={() => setDetailTab('carrier_api')}
                className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
                  detailTab === 'carrier_api'
                    ? 'border-[#1b4d3e] text-[#1b4d3e] bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <i className="fa-solid fa-network-wired"></i>
                <span>Carrier API Parameters</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800">
                  {viewingDetailItem.carrierApiConfigs?.length || 0}
                </span>
              </button>

              <button
                onClick={() => setDetailTab('overview')}
                className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
                  detailTab === 'overview'
                    ? 'border-[#1b4d3e] text-[#1b4d3e] bg-white rounded-t-lg'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <i className="fa-solid fa-circle-info"></i>
                <span>Packaging & Regulation Details</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              
              {detailTab === 'carrier_api' ? (
                /* CARRIER API INTEGRATION PARAMETERS TAB */
                <div className="space-y-4">
                  
                  {/* Top info notice */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-info text-amber-600 mt-0.5"></i>
                    <div>
                      <span className="font-bold text-amber-900 block text-xs">
                        Carrier API Dangerous Goods Payload Configuration
                      </span>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Khi đơn hàng có sản phẩm thuộc nhóm <strong>{viewingDetailItem.hazmatGroup.replace(/_/g, ' ')}</strong>, hệ thống tự động truyền các cờ và mã hazmat tương ứng dưới đây vào payload API gửi đến hãng vận chuyển.
                      </p>
                    </div>
                  </div>

                  {/* Carrier Parameters Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-2.5 border-r border-gray-200 w-[28%]">
                            Carrier
                          </th>
                          <th className="px-4 py-2.5 border-r border-gray-200 w-[22%]">
                            Parameter Field
                          </th>
                          <th className="px-4 py-2.5 border-r border-gray-200 w-[30%]">
                            Value to Fill (API Payload)
                          </th>
                          <th className="px-4 py-2.5">
                            Notes / Requirement
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {viewingDetailItem.carrierApiConfigs && viewingDetailItem.carrierApiConfigs.length > 0 ? (
                          viewingDetailItem.carrierApiConfigs.map((config, index) => (
                            <tr key={config.id || index} className="hover:bg-gray-50/60">
                              <td className="px-4 py-3 border-r border-gray-100 font-bold text-gray-900">
                                <div className="flex items-center gap-2">
                                  <i className="fa-solid fa-truck-fast text-[#4d9e5f] text-xs"></i>
                                  <span>{config.carrier}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 border-r border-gray-100 font-mono text-gray-700">
                                {config.parameterField || 'item flag'}
                              </td>
                              <td className="px-4 py-3 border-r border-gray-100">
                                <div className="flex items-center justify-between gap-2">
                                  <code className="px-2.5 py-1 rounded text-xs font-mono font-black bg-amber-50 text-amber-900 border border-amber-200 block truncate">
                                    {config.parameterValue}
                                  </code>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard?.writeText(config.parameterValue);
                                      alert(`Copied "${config.parameterValue}" to clipboard`);
                                    }}
                                    className="text-gray-400 hover:text-gray-700 p-1"
                                    title="Copy API value"
                                  >
                                    <i className="fa-regular fa-copy text-xs"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-600 text-[11px]">
                                {config.description || 'Required for hazmat air/ground clearance'}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-4 py-6 text-center text-gray-400 italic">
                              No carrier parameters configured.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Live JSON Payload Example Card */}
                  <div className="p-4 bg-gray-900 text-gray-200 rounded-lg space-y-2 border border-gray-800">
                    <div className="flex items-center justify-between text-gray-400 text-[11px] font-mono">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <i className="fa-solid fa-code"></i>
                        <span>Sample Outbound Carrier API Payload (JSON)</span>
                      </span>
                      <span>POST /v2/shipments</span>
                    </div>
                    <pre className="text-[11px] font-mono text-gray-300 bg-black/40 p-3 rounded border border-gray-800 overflow-x-auto">
{`{
  "reference_id": "ORD-2026-8801",
  "parcel": {
    "weight_grams": 450,
    "hazmat_classification": {
      "hazmat_group": "${viewingDetailItem.hazmatGroup}",
      "hazard_class": "${viewingDetailItem.hazardClass}",
      "un_number": "${viewingDetailItem.unNumber}",
      "lq_max_ml": ${viewingDetailItem.lqMaxMl ?? 'null'}
    },
    "carrier_specific_parameters": {
${(viewingDetailItem.carrierApiConfigs || []).map(c => `      "${c.carrier}": "${c.parameterValue}"`).join(',\n')}
    }
  }
}`}
                    </pre>
                  </div>

                </div>
              ) : (
                /* OVERVIEW & REGULATIONS TAB */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Hazard Class</span>
                      <span className="text-base font-black text-gray-800 mt-0.5 block">{viewingDetailItem.hazardClass}</span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Regulated</span>
                      <span className={`text-base font-black mt-0.5 block ${viewingDetailItem.isHazmat ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {viewingDetailItem.isHazmat ? 'Yes (Hazmat)' : 'No (Safe)'}
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">LQ Diamond Label</span>
                      <span className="text-base font-black text-blue-700 mt-0.5 block">
                        {viewingDetailItem.nhanLQ ? 'Required (YES)' : 'None (—)'}
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Orientation Arrow</span>
                      <span className="text-base font-black text-purple-700 mt-0.5 block">
                        {viewingDetailItem.nhanMuiTen ? 'Required (↑↑)' : 'None (—)'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Conveyor Handling Protocol</span>
                      <span className="font-mono font-bold text-gray-800 text-xs block">{viewingDetailItem.handlingGroup}</span>
                      <p className="text-[11px] text-gray-500">
                        {viewingDetailItem.handlingGroup === 'HAZMAT_TRAY'
                          ? 'Routed in spill-containment trays to prevent conveyor contamination.'
                          : viewingDetailItem.handlingGroup === 'LANE_LITHIUM'
                          ? 'Dedicated sorting lane for battery parcels to prevent impact or shock.'
                          : 'Standard sorting lane without hazmat restrictions.'}
                      </p>
                    </div>

                    <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Limited Quantity Limit (ml)</span>
                      <span className="font-mono font-bold text-gray-800 text-xs block">
                        {viewingDetailItem.lqMaxMl !== null ? `${viewingDetailItem.lqMaxMl.toLocaleString()} ml` : 'No volume limit (safe)'}
                      </span>
                      <p className="text-[11px] text-gray-500">
                        Maximum inner container fluid volume eligible under Limited Quantity provisions.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Warehouse Packing Instructions</span>
                    <p className="text-xs text-gray-700">
                      {viewingDetailItem.packingInstructions || 'Standard packing protocol without hazmat restrictions.'}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-gray-50 border-t flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                Last updated: {viewingDetailItem.updatedAt || 'Recently'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const itemToEdit = viewingDetailItem;
                    setViewingDetailItem(null);
                    handleOpenEdit(itemToEdit);
                  }}
                  className="px-4 py-1.5 bg-[#1b4d3e] hover:bg-[#14392e] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Edit Configuration</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingDetailItem(null)}
                  className="px-4 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CREATE / EDIT CONFIGURATION MODAL (Including Carrier API Parameters section) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                  <i className="fa-solid fa-triangle-exclamation text-sm"></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    {editingItem ? `Edit Hazmat Group: ${editingItem.hazmatGroup.replace(/_/g, ' ')}` : 'Add New Hazmat Group'}
                  </h3>
                  <p className="text-xs text-gray-400">Configure dangerous goods classification and Carrier API parameters</p>
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
              
              {/* Basic Group Info */}
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

              {/* DG Nature & UN Number */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                    Bản chất DG (DG Nature / Classification)
                  </label>
                  <input
                    type="text"
                    value={formData.dgNature || ''}
                    onChange={e => setFormData({ ...formData, dgNature: e.target.value })}
                    placeholder="e.g. Flammable liquid, Class 3 hoặc Lithium-ion lắp trong máy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                    UN Number
                  </label>
                  <input
                    type="text"
                    value={formData.unNumber || ''}
                    onChange={e => setFormData({ ...formData, unNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. UN1266, UN1263, UN1950, UN3481"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] font-mono"
                  />
                </div>
              </div>

              {/* Handling Group & LQ Volume */}
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
                </div>
              </div>

              {/* Toggles */}
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl space-y-2.5">
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

              {/* CARRIER API INTEGRATION PARAMETERS (CORE NEW SECTION) */}
              <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#1b4d3e] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <i className="fa-solid fa-network-wired"></i>
                      <span>Thông số apply cho các carrier khi truyền API</span>
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-0.5">
                      Carrier and corresponding parameter values to transmit in API payload
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCarrierParam}
                    className="px-2.5 py-1 bg-[#1b4d3e] hover:bg-[#14392e] text-white rounded text-xs font-bold flex items-center gap-1 shadow-2xs"
                  >
                    <i className="fa-solid fa-plus text-[10px]"></i>
                    <span>Add Carrier</span>
                  </button>
                </div>

                {/* Carrier Param Table / Rows */}
                <div className="space-y-2">
                  {(!formData.carrierApiConfigs || formData.carrierApiConfigs.length === 0) ? (
                    <div className="text-center py-4 bg-white rounded-lg border border-dashed border-gray-300 text-gray-400">
                      No carrier API parameters defined. Click "Add Carrier" to add a mapping.
                    </div>
                  ) : (
                    formData.carrierApiConfigs.map((config, index) => (
                      <div
                        key={config.id || index}
                        className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs space-y-2"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-gray-500 uppercase block mb-0.5">Carrier</label>
                            <input
                              type="text"
                              list="common-carriers"
                              value={config.carrier}
                              onChange={e => handleUpdateCarrierParam(index, 'carrier', e.target.value)}
                              placeholder="e.g. Easyship (item flag)"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] font-semibold"
                            />
                            <datalist id="common-carriers">
                              {COMMON_CARRIERS.map(c => (
                                <option key={c} value={c} />
                              ))}
                            </datalist>
                          </div>

                          <div>
                            <label className="text-[9px] font-bold text-gray-500 uppercase block mb-0.5">Parameter Field</label>
                            <input
                              type="text"
                              value={config.parameterField || ''}
                              onChange={e => handleUpdateCarrierParam(index, 'parameterField', e.target.value)}
                              placeholder="e.g. item_flag, hazmat_type"
                              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] font-mono"
                            />
                          </div>

                          <div className="relative">
                            <label className="text-[9px] font-bold text-gray-500 uppercase block mb-0.5">
                              API Value to Fill <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                required
                                value={config.parameterValue}
                                onChange={e => handleUpdateCarrierParam(index, 'parameterValue', e.target.value)}
                                placeholder="e.g. contains_liquids = true"
                                className="w-full px-2 py-1.5 border border-amber-300 bg-amber-50/40 rounded text-xs outline-none focus:ring-1 focus:ring-[#4d9e5f] font-mono font-bold text-amber-900"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveCarrierParam(index)}
                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove carrier parameter"
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={config.description || ''}
                            onChange={e => handleUpdateCarrierParam(index, 'description', e.target.value)}
                            placeholder="Optional notes / API documentation reference..."
                            className="w-full px-2 py-1 border border-gray-200 rounded text-[11px] text-gray-600 outline-none"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Description & Packing Instructions */}
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

              {/* Form Buttons */}
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
