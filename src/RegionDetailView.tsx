import React, { useState, useEffect, useRef } from 'react';
import { Region } from '../types';

interface RegionDetailViewProps {
  region: Region | null;
  onSave: (region: Omit<Region, 'id' | 'createdAt'>) => void;
  onBack: () => void;
}

// Vietnam New Administrative Standard (34 Provinces & Municipalities: 6 Central Municipalities + 28 Provinces)
const VIETNAM_PROVINCES_NEW_34 = [
  // 6 Central Municipalities
  'Ha Noi',
  'Ho Chi Minh City',
  'Hue',
  'Da Nang',
  'Can Tho',
  'Hai Phong',
  // 28 Provinces
  'An Giang',
  'Bac Ninh',
  'Ca Mau',
  'Cao Bang',
  'Dien Bien',
  'Dak Lak',
  'Dong Nai',
  'Dong Thap',
  'Gia Lai',
  'Ha Tinh',
  'Hung Yen',
  'Khanh Hoa',
  'Lai Chau',
  'Lang Son',
  'Lao Cai',
  'Lam Dong',
  'Nghe An',
  'Ninh Binh',
  'Phu Tho',
  'Quang Ngai',
  'Quang Ninh',
  'Quang Tri',
  'Son La',
  'Tay Ninh',
  'Thanh Hoa',
  'Thai Nguyen',
  'Tuyen Quang',
  'Vinh Long'
];

// Vietnam Old Administrative Standard (63 Provinces & Cities prior to reorganization)
const VIETNAM_PROVINCES_OLD_63 = [
  'An Giang', 'Ba Ria - Vung Tau', 'Bac Giang', 'Bac Kan', 'Bac Lieu', 'Bac Ninh', 'Ben Tre', 'Binh Dinh', 
  'Binh Duong', 'Binh Phuoc', 'Binh Thuan', 'Ca Mau', 'Can Tho', 'Cao Bang', 'Da Nang', 'Dak Lak', 
  'Dak Nong', 'Dien Bien', 'Dong Nai', 'Dong Thap', 'Gia Lai', 'Ha Giang', 'Ha Nam', 'Ha Noi', 
  'Ha Tinh', 'Hai Duong', 'Hai Phong', 'Hau Giang', 'Hoa Binh', 'Ho Chi Minh City', 'Hung Yen', 'Khanh Hoa', 
  'Kien Giang', 'Kon Tum', 'Lai Chau', 'Lam Dong', 'Lang Son', 'Lao Cai', 'Long An', 'Nam Dinh', 
  'Nghe An', 'Ninh Binh', 'Ninh Thuan', 'Phu Tho', 'Phu Yen', 'Quang Binh', 'Quang Nam', 'Quang Ngai', 
  'Quang Ninh', 'Quang Tri', 'Soc Trang', 'Son La', 'Tay Ninh', 'Thai Binh', 'Thai Nguyen', 'Thanh Hoa', 
  'Thua Thien Hue', 'Tien Giang', 'Tra Vinh', 'Tuyen Quang', 'Vinh Long', 'Vinh Phuc', 'Yen Bai'
];

const MOCK_STATES_INTERNATIONAL: Record<string, string[]> = {
  'Thailand': [
    'Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Nonthaburi', 'Krabi', 'Surat Thani', 'Chonburi', 'Khon Kaen'
  ],
  'Indonesia': [
    'Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Palembang', 'Yogyakarta'
  ],
  'United States': [
    'California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois', 'Ohio', 'Georgia', 'North Carolina', 'Washington'
  ]
};

const SUGGESTED_PARTNERS: Record<'Customer' | 'Carrier', string[]> = {
  'Customer': [
    'Shopee Vietnam',
    'Lazada Vietnam',
    'TikTok Shop',
    'Tiki Corporation',
    'Amazon Retail',
    'Vinamilk Logistics',
    'Unilever Vietnam',
    'Samsung Electronics'
  ],
  'Carrier': [
    'DHL Express',
    'FedEx',
    'VNPost (Vietnam Post)',
    'Viettel Post',
    'Giao Hàng Nhanh (GHN)',
    'Giao Hàng Tiết Kiệm (GHTK)',
    'J&T Express',
    'Ninja Van Vietnam'
  ]
};

export const RegionDetailView: React.FC<RegionDetailViewProps> = ({ region, onSave, onBack }) => {
  const [formData, setFormData] = useState<Omit<Region, 'id' | 'createdAt'>>({
    code: '',
    name: '',
    country: 'Vietnam',
    description: '',
    status: 'Active',
    partnerType: 'All',
    partnerNames: [],
    partnerName: '',
    states: []
  });

  // Vietnam address standard: only 2 options: 'new' (34 Provinces/Cities) | 'old' (63 Provinces/Cities)
  const [vnAddressStandard, setVnAddressStandard] = useState<'new' | 'old'>('new');

  // State search & add
  const [stateSearchInput, setStateSearchInput] = useState('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [mappedStateFilter, setMappedStateFilter] = useState('');
  const stateDropdownRef = useRef<HTMLDivElement>(null);

  // Partner search & add
  const [partnerSearchInput, setPartnerSearchInput] = useState('');
  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);
  const partnerDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (region) {
      const initialPartnerNames = region.partnerNames && region.partnerNames.length > 0
        ? region.partnerNames
        : region.partnerName
          ? region.partnerName.split(',').map(s => s.trim()).filter(Boolean)
          : [];

      setFormData({
        code: region.code,
        name: region.name,
        country: region.country || 'Vietnam',
        description: region.description || '',
        status: region.status || 'Active',
        partnerType: region.partnerType || 'All',
        partnerNames: initialPartnerNames,
        partnerName: initialPartnerNames.join(', '),
        states: region.states || []
      });
    }
  }, [region]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(e.target as Node)) {
        setIsStateDropdownOpen(false);
      }
      if (partnerDropdownRef.current && !partnerDropdownRef.current.contains(e.target as Node)) {
        setIsPartnerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute available states based on country & Vietnam address standard
  const getCountryStates = (): { name: string; tag?: string }[] => {
    if (formData.country === 'Vietnam') {
      if (vnAddressStandard === 'new') {
        return VIETNAM_PROVINCES_NEW_34.map(name => ({ name, tag: 'New Standard (34)' }));
      }
      return VIETNAM_PROVINCES_OLD_63.map(name => ({ name, tag: 'Old Standard (63)' }));
    }
    return (MOCK_STATES_INTERNATIONAL[formData.country] || []).map(name => ({ name }));
  };

  const availableCountryStateObjs = getCountryStates();
  const allCountryStateNames = availableCountryStateObjs.map(s => s.name);
  const currentMappedStates = formData.states || [];

  // Available states for search (excluding already mapped)
  const unmappedStates = availableCountryStateObjs.filter(
    s => !currentMappedStates.includes(s.name) &&
    s.name.toLowerCase().includes(stateSearchInput.toLowerCase())
  );

  const handleAddState = (stateName: string) => {
    const trimmed = stateName.trim();
    if (!trimmed) return;
    if (currentMappedStates.includes(trimmed)) return;
    
    setFormData(prev => ({
      ...prev,
      states: [...(prev.states || []), trimmed]
    }));
    setStateSearchInput('');
    setIsStateDropdownOpen(false);
  };

  const handleRemoveState = (stateName: string) => {
    setFormData(prev => ({
      ...prev,
      states: (prev.states || []).filter(s => s !== stateName)
    }));
  };

  const handleAddAllStates = () => {
    setFormData(prev => ({
      ...prev,
      states: Array.from(new Set([...(prev.states || []), ...allCountryStateNames]))
    }));
    setStateSearchInput('');
    setIsStateDropdownOpen(false);
  };

  const handleClearAllStates = () => {
    setFormData(prev => ({
      ...prev,
      states: []
    }));
  };

  // Partner Management
  const currentPartnerType = formData.partnerType || 'All';
  const partnerList = formData.partnerNames || [];
  const suggestedList = currentPartnerType !== 'All' ? SUGGESTED_PARTNERS[currentPartnerType] : [];
  const filteredSuggestions = suggestedList.filter(
    p => !partnerList.includes(p) && p.toLowerCase().includes(partnerSearchInput.toLowerCase())
  );

  const handleAddPartner = (partner: string) => {
    const trimmed = partner.trim();
    if (!trimmed) return;
    if (partnerList.includes(trimmed)) return;
    const nextList = [...partnerList, trimmed];
    setFormData(prev => ({
      ...prev,
      partnerNames: nextList,
      partnerName: nextList.join(', ')
    }));
    setPartnerSearchInput('');
    setIsPartnerDropdownOpen(false);
  };

  const handleRemovePartner = (partner: string) => {
    const nextList = partnerList.filter(p => p !== partner);
    setFormData(prev => ({
      ...prev,
      partnerNames: nextList,
      partnerName: nextList.join(', ')
    }));
  };

  // Filtered mapped states in the log table
  const displayMappedStates = currentMappedStates.filter(s =>
    s.toLowerCase().includes(mappedStateFilter.toLowerCase())
  );

  return (
    <div className="bg-white rounded shadow-sm h-full flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-3.5 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-[#1b4d3e] transition-colors"
            title="Back to list"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <div>
            <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">
              {region ? `Edit Region: ${region.name}` : 'Create New Region'}
            </h2>
            <span className="text-[11px] text-gray-400">
              Configure region boundaries, partner scopes, and mapped states/provinces
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => onSave(formData)}
            className="bg-[#4d9e5f] text-white px-5 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-check"></i>
            Save Region
          </button>
        </div>
      </div>
      
      {/* Body Content */}
      <div className="p-6 overflow-y-auto space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-[#4d9e5f]"></i>
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 tracking-tight block">
                Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                placeholder="e.g. REG-001"
                className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 tracking-tight block">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Northern Region"
                className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Country</label>
              <select
                value={formData.country}
                onChange={(e) => {
                  const newCountry = e.target.value;
                  setFormData({...formData, country: newCountry, states: []});
                  setStateSearchInput('');
                }}
                className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
              >
                <option value="Vietnam">Vietnam</option>
                <option value="Thailand">Thailand</option>
                <option value="Indonesia">Indonesia</option>
                <option value="United States">United States</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as 'Active' | 'Inactive'})}
                className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="md:col-span-2 lg:col-span-4 space-y-1">
              <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Additional details about this region..."
                rows={2}
                className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50 resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Partner Scope */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <i className="fa-solid fa-handshake text-[#4d9e5f]"></i>
              Apply To (Partner Scope)
            </h3>
            {formData.partnerType !== 'All' && (
              <span className="text-xs text-gray-500 font-medium">
                {partnerList.length} {formData.partnerType}{partnerList.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply To</label>
              <select
                value={formData.partnerType}
                onChange={(e) => {
                  const pType = e.target.value as 'All' | 'Customer' | 'Carrier';
                  setFormData({
                    ...formData,
                    partnerType: pType,
                    partnerNames: pType === 'All' ? [] : formData.partnerNames,
                    partnerName: pType === 'All' ? '' : formData.partnerName
                  });
                  setPartnerSearchInput('');
                }}
                className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50 font-medium"
              >
                <option value="All">All</option>
                <option value="Customer">Customer</option>
                <option value="Carrier">Carrier</option>
              </select>
              <p className="text-[11px] text-gray-400 mt-1">
                {formData.partnerType === 'All' 
                  ? 'Applies to all operations, customers, and carriers.' 
                  : `Select one or multiple ${formData.partnerType?.toLowerCase()}s for this region.`}
              </p>
            </div>

            {/* When Customer or Carrier is selected: multi-selection */}
            {formData.partnerType !== 'All' && (
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-gray-700 tracking-tight block">
                  Select {formData.partnerType}s (Choose 1 or multiple)
                </label>
                
                {/* Search & Add Partner Input */}
                <div className="relative" ref={partnerDropdownRef}>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={partnerSearchInput}
                        onChange={(e) => {
                          setPartnerSearchInput(e.target.value);
                          setIsPartnerDropdownOpen(true);
                        }}
                        onFocus={() => setIsPartnerDropdownOpen(true)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (partnerSearchInput.trim()) {
                              handleAddPartner(partnerSearchInput);
                            }
                          }
                        }}
                        placeholder={`Search or type ${formData.partnerType?.toLowerCase()} name...`}
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f]"
                      />
                      <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-xs"></i>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddPartner(partnerSearchInput)}
                      disabled={!partnerSearchInput.trim()}
                      className="bg-[#4d9e5f] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#3d7d4c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i>
                      Add
                    </button>
                  </div>

                  {/* Dropdown Suggestions */}
                  {isPartnerDropdownOpen && filteredSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto z-30">
                      <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b">
                        Suggested {formData.partnerType}s
                      </div>
                      {filteredSuggestions.map(partner => (
                        <div
                          key={partner}
                          onClick={() => handleAddPartner(partner)}
                          className="px-3 py-2 text-xs text-gray-700 hover:bg-[#eefcf1] hover:text-[#1b4d3e] cursor-pointer flex items-center justify-between transition-colors"
                        >
                          <span>{partner}</span>
                          <i className="fa-solid fa-plus text-[10px] text-gray-400 hover:text-[#4d9e5f]"></i>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Partners Chips Log */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 bg-gray-50/80 rounded border border-gray-200 items-center">
                    {partnerList.length === 0 ? (
                      <span className="text-xs text-gray-400 italic">No {formData.partnerType?.toLowerCase()} added yet. Type or pick above.</span>
                    ) : (
                      partnerList.map(partner => (
                        <span 
                          key={partner}
                          className="inline-flex items-center gap-1.5 bg-white border border-[#4d9e5f]/40 text-[#1b4d3e] px-2.5 py-1 rounded-md text-xs font-medium shadow-xs"
                        >
                          <span>{partner}</span>
                          <button
                            type="button"
                            onClick={() => handleRemovePartner(partner)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-0.5"
                            title="Remove"
                          >
                            <i className="fa-solid fa-xmark text-[11px]"></i>
                          </button>
                        </span>
                      ))
                    )}
                    {partnerList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, partnerNames: [], partnerName: '' }));
                        }}
                        className="text-[11px] text-red-600 hover:underline ml-auto font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* State / Province Mapping */}
        <div className="bg-white rounded border border-gray-200 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <i className="fa-solid fa-map-location-dot text-[#4d9e5f]"></i>
                State / Province Mapping
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Search state/province name to add into this region. Added items are logged below.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#eefcf1] text-[#1b4d3e] font-bold px-2.5 py-1 rounded-full text-xs border border-[#4d9e5f]/20">
                {currentMappedStates.length} States Mapped
              </span>
              {currentMappedStates.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllStates}
                  className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded border border-red-200 transition-colors font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Toggle for Vietnam Address Standard: Only 2 options (New - 34 vs Old - 63) */}
          {formData.country === 'Vietnam' && (
            <div className="mb-4 bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#4d9e5f] text-white flex items-center justify-center text-xs shadow-xs">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                    Vietnam Address Standard
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 font-semibold px-1.5 py-0.2 rounded">Option</span>
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Select between New Standard (34 provinces & municipalities) or Old Standard (63 provinces & cities)
                  </div>
                </div>
              </div>

              {/* Segmented Control Switch - ONLY 2 options: New (34) & Old (63) */}
              <div className="inline-flex bg-white p-1 rounded-lg border border-gray-200 shadow-xs self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setVnAddressStandard('new');
                    setStateSearchInput('');
                  }}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    vnAddressStandard === 'new'
                      ? 'bg-[#1b4d3e] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="fa-solid fa-circle-check text-[10px]"></i>
                  <span>New ({VIETNAM_PROVINCES_NEW_34.length} Provinces/Cities)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVnAddressStandard('old');
                    setStateSearchInput('');
                  }}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                    vnAddressStandard === 'old'
                      ? 'bg-[#1b4d3e] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="fa-solid fa-clock-rotate-left text-[10px]"></i>
                  <span>Old ({VIETNAM_PROVINCES_OLD_63.length} Provinces/Cities)</span>
                </button>
              </div>
            </div>
          )}

          {/* Search & Add State Bar */}
          <div className="mb-5 bg-gray-50 p-3.5 rounded border border-gray-200">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1" ref={stateDropdownRef}>
                <div className="relative">
                  <input
                    type="text"
                    value={stateSearchInput}
                    onChange={(e) => {
                      setStateSearchInput(e.target.value);
                      setIsStateDropdownOpen(true);
                    }}
                    onFocus={() => setIsStateDropdownOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (unmappedStates.length > 0) {
                          handleAddState(unmappedStates[0].name);
                        } else if (stateSearchInput.trim()) {
                          handleAddState(stateSearchInput.trim());
                        }
                      }
                    }}
                    placeholder={
                      formData.country === 'Vietnam'
                        ? vnAddressStandard === 'new'
                          ? `Search in New Standard (34 provinces & cities: Ha Noi, Ho Chi Minh City, Da Nang, Hue...)...`
                          : `Search in Old Standard (63 provinces & cities)...`
                        : `Type to search State/Province in ${formData.country}...`
                    }
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] bg-white"
                  />
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-xs"></i>
                </div>

                {/* Dropdown Suggestions */}
                {isStateDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-56 overflow-y-auto z-30">
                    <div className="px-3 py-1.5 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b flex justify-between items-center">
                      <span>Available Suggestions ({unmappedStates.length})</span>
                      <span className="text-gray-400 normal-case font-normal text-[10px]">Click or press Enter to add</span>
                    </div>
                    {unmappedStates.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-400">
                        {allCountryStateNames.length > 0 && unmappedStates.length === 0 && !stateSearchInput
                          ? 'All provinces/cities in this standard have already been mapped!'
                          : `No province/city found matching "${stateSearchInput}"`}
                      </div>
                    ) : (
                      unmappedStates.slice(0, 35).map(st => (
                        <div
                          key={st.name}
                          onClick={() => handleAddState(st.name)}
                          className="px-3 py-2 text-xs text-gray-700 hover:bg-[#eefcf1] hover:text-[#1b4d3e] cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-b-0 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{st.name}</span>
                            {st.tag && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                st.tag.includes('New')
                                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                {st.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#4d9e5f] font-semibold flex items-center gap-1">
                            <i className="fa-solid fa-plus text-[10px]"></i> Add
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (stateSearchInput.trim()) {
                      handleAddState(stateSearchInput.trim());
                    } else if (unmappedStates.length > 0) {
                      handleAddState(unmappedStates[0].name);
                    }
                  }}
                  disabled={!stateSearchInput.trim() && unmappedStates.length === 0}
                  className="bg-[#4d9e5f] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#3d7d4c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap"
                >
                  <i className="fa-solid fa-plus text-[11px]"></i>
                  Add State
                </button>

                {unmappedStates.length > 0 && (
                  <button
                    type="button"
                    onClick={handleAddAllStates}
                    className="border border-gray-300 bg-white text-gray-700 px-3 py-2 rounded text-xs font-semibold hover:bg-gray-50 hover:text-[#1b4d3e] transition-colors whitespace-nowrap"
                  >
                    Add All ({unmappedStates.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Log Table of Added States */}
          <div className="border border-gray-200 rounded overflow-hidden">
            <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-bold text-gray-700 flex items-center gap-2">
                <span>Mapped States Log</span>
                <span className="bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded text-[11px]">
                  {displayMappedStates.length} {displayMappedStates.length !== currentMappedStates.length ? `of ${currentMappedStates.length}` : ''}
                </span>
              </div>

              {currentMappedStates.length > 5 && (
                <div className="relative w-56">
                  <input
                    type="text"
                    value={mappedStateFilter}
                    onChange={(e) => setMappedStateFilter(e.target.value)}
                    placeholder="Filter mapped states..."
                    className="w-full pl-8 pr-3 py-1 bg-white border border-gray-200 rounded text-xs focus:outline-none focus:border-[#4d9e5f]"
                  />
                  <i className="fa-solid fa-filter absolute left-2.5 top-2 text-gray-400 text-[10px]"></i>
                </div>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-600 border-b w-16">#</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-600 border-b">State / Province</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-600 border-b">Standard Type</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-600 border-b">Country</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-600 border-b">Mapping Status</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-600 border-b text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayMappedStates.map((stateName, idx) => {
                    const isNewStandard = VIETNAM_PROVINCES_NEW_34.includes(stateName);
                    const isOldOnly = VIETNAM_PROVINCES_OLD_63.includes(stateName) && !isNewStandard;

                    return (
                      <tr key={stateName} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                        <td className="px-4 py-2 text-xs text-gray-400 font-mono">{idx + 1}</td>
                        <td className="px-4 py-2 text-xs font-semibold text-gray-800 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isNewStandard ? 'bg-[#4d9e5f]' : 'bg-amber-500'}`}></span>
                          {stateName}
                        </td>
                        <td className="px-4 py-2 text-xs">
                          {formData.country === 'Vietnam' ? (
                            isNewStandard ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                <i className="fa-solid fa-circle-check text-[9px]"></i> New Standard (34)
                              </span>
                            ) : isOldOnly ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <i className="fa-solid fa-clock-rotate-left text-[9px]"></i> Old Standard (63)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                                Custom / Other
                              </span>
                            )
                          ) : (
                            <span className="text-gray-400 text-[11px]">Standard</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-600">{formData.country}</td>
                        <td className="px-4 py-2 text-xs">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                            <i className="fa-solid fa-check text-[9px]"></i> Mapped
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveState(stateName)}
                            className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                            title={`Remove ${stateName}`}
                          >
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {displayMappedStates.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-gray-400 text-xs">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <i className="fa-solid fa-map-pin text-gray-300 text-2xl"></i>
                          <span>
                            {currentMappedStates.length === 0 
                              ? 'No states or provinces mapped yet. Use the search input above to add.'
                              : 'No mapped states match your filter.'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
