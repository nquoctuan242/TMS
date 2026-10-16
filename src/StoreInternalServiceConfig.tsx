import React, { useState } from 'react';
import { InternalServiceCoverage } from '../types';

interface StoreInternalServiceConfigProps {
  store: any;
  onChange: (updatedStore: any) => void;
}

const VIETNAM_PROVINCES = [
  'Thành phố Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Bình Dương',
  'Đồng Nai',
  'Bà Rịa - Vũng Tàu',
  'Long An',
  'Hải Phòng',
  'Cần Thơ',
  'Tiền Giang',
  'Bắc Ninh',
  'Hưng Yên',
  'Quảng Ninh',
  'Khánh Hòa',
  'Lâm Đồng',
  'Thừa Thiên Huế',
  'Nghệ An',
  'Thanh Hóa',
  'Kiên Giang',
  'An Giang',
  'Bến Tre',
  'Tây Ninh',
  'Bình Phước'
];

const THAILAND_PROVINCES = [
  'Bangkok',
  'Nonthaburi',
  'Samut Prakan',
  'Pathum Thani',
  'Chiang Mai',
  'Phuket',
  'Chonburi'
];

const US_STATES = [
  'California',
  'Texas',
  'Florida',
  'New York',
  'Washington',
  'Illinois'
];

const COUNTRIES = [
  'Vietnam',
  'Thailand',
  'United States',
  'China',
  'Singapore',
  'Malaysia',
  'Philippines'
];

const SERVICE_TYPE_OPTIONS = [
  { id: '2H Express', label: '2H Express (Giao siêu tốc 2H)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { id: 'Same Day', label: 'Same Day (Giao trong ngày)', color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { id: 'Standard Internal', label: 'Standard Internal (Giao tiêu chuẩn)', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { id: 'Internal Transfer', label: 'Internal Transfer (Trung chuyển IT)', color: 'bg-amber-50 text-amber-800 border-amber-200' }
];

export const StoreInternalServiceConfig: React.FC<StoreInternalServiceConfigProps> = ({ store, onChange }) => {
  const isServiceEnabled = store.enableInternalService !== false;
  const coverages: InternalServiceCoverage[] = store.internalServiceCoverages || [];

  const [selectedCountryToAdd, setSelectedCountryToAdd] = useState('Vietnam');
  const [customCityInputs, setCustomCityInputs] = useState<Record<number, string>>({});
  const [selectedCityDropdowns, setSelectedCityDropdowns] = useState<Record<number, string>>({});

  const handleToggleService = () => {
    onChange({
      ...store,
      enableInternalService: !isServiceEnabled
    });
  };

  const handleAddCoverage = (country: string = 'Vietnam', specificCities: string[] = []) => {
    const isAll = specificCities.length === 0;
    const newCoverage: InternalServiceCoverage = {
      id: `cov-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      country: country,
      allowedAllCities: isAll,
      cities: isAll ? ['Toàn quốc (All Cities)'] : specificCities,
      serviceTypes: ['2H Express', 'Same Day', 'Standard Internal'],
      maxRadiusKm: 25,
      status: true,
      notes: ''
    };
    onChange({
      ...store,
      enableInternalService: true,
      internalServiceCoverages: [...coverages, newCoverage]
    });
  };

  const handleUpdateCoverage = (index: number, updated: InternalServiceCoverage) => {
    const updatedCoverages = [...coverages];
    updatedCoverages[index] = updated;
    onChange({
      ...store,
      internalServiceCoverages: updatedCoverages
    });
  };

  const handleRemoveCoverage = (index: number) => {
    const updatedCoverages = coverages.filter((_, i) => i !== index);
    onChange({
      ...store,
      internalServiceCoverages: updatedCoverages
    });
  };

  const handleAddCityToRule = (ruleIndex: number, city: string) => {
    if (!city || !city.trim()) return;
    const rule = coverages[ruleIndex];
    const cleanCity = city.trim();
    const currentCities = rule.allowedAllCities ? [] : (rule.cities || []);
    if (currentCities.includes(cleanCity)) return;

    handleUpdateCoverage(ruleIndex, {
      ...rule,
      allowedAllCities: false,
      cities: [...currentCities, cleanCity]
    });
  };

  const handleRemoveCityFromRule = (ruleIndex: number, cityToRemove: string) => {
    const rule = coverages[ruleIndex];
    const newCities = (rule.cities || []).filter(c => c !== cityToRemove);
    handleUpdateCoverage(ruleIndex, {
      ...rule,
      cities: newCities
    });
  };

  const handleToggleServiceTypeInRule = (ruleIndex: number, serviceName: string) => {
    const rule = coverages[ruleIndex];
    const current = rule.serviceTypes || [];
    const next = current.includes(serviceName)
      ? current.filter(s => s !== serviceName)
      : [...current, serviceName];
    handleUpdateCoverage(ruleIndex, {
      ...rule,
      serviceTypes: next
    });
  };

  const getProvincesForCountry = (country: string) => {
    if (country === 'Vietnam') return VIETNAM_PROVINCES;
    if (country === 'Thailand') return THAILAND_PROVINCES;
    if (country === 'United States') return US_STATES;
    return ['Main City', 'Secondary City'];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
      
      {/* Card Header */}
      <div className="px-5 py-3.5 bg-gray-50/80 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1b4d3e] border border-emerald-100 flex items-center justify-center text-sm shadow-2xs">
            <i className="fa-solid fa-route"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#1b4d3e] text-sm uppercase tracking-wider">
                Internal Delivery Service Scope Config
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isServiceEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
              }`}>
                {isServiceEnabled ? 'Service Active' : 'Service Disabled'}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Cấu hình phạm vi dịch vụ giao hàng nội bộ (Internal) được phép giao trong các City / Country nào
            </p>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-3">
          {/* Master Enable/Disable Switch */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
            <span className="text-[11px] font-semibold text-gray-700">Internal Service:</span>
            <button
              type="button"
              onClick={handleToggleService}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isServiceEnabled ? 'bg-[#4d9e5f]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isServiceEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Add Area Button */}
          <button
            type="button"
            onClick={() => handleAddCoverage(selectedCountryToAdd, [])}
            className="bg-[#1b4d3e] hover:bg-[#153a2f] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <i className="fa-solid fa-plus text-[10px]"></i>
            <span>Add Coverage Area</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 space-y-4">

        {/* Warning banner when service is disabled */}
        {!isServiceEnabled && (
          <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-center space-y-2">
            <i className="fa-solid fa-ban text-gray-400 text-2xl"></i>
            <h4 className="text-xs font-bold text-gray-700 uppercase">
              Internal Delivery Service is Currently Disabled for this Store
            </h4>
            <p className="text-[11px] text-gray-500 max-w-md mx-auto">
              Khi tắt tính năng này, cửa hàng sẽ không thể tự điều phối shipper giao hàng nội bộ (Internal). Các đơn hàng sẽ bắt buộc phải chuyển sang hãng vận chuyển đối tác thứ 3 (3PL).
            </p>
            <button
              type="button"
              onClick={handleToggleService}
              className="mt-2 px-4 py-1.5 bg-[#4d9e5f] hover:bg-[#3d7d4c] text-white rounded text-xs font-bold transition-colors shadow-2xs"
            >
              <i className="fa-solid fa-power-off mr-1.5"></i>
              Enable Internal Service
            </button>
          </div>
        )}

        {isServiceEnabled && (
          <>
            {/* Quick Presets Bar */}
            <div className="bg-[#f7faf8] p-3 rounded-lg border border-[#e2eee6] flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                <i className="fa-solid fa-bolt text-amber-500 text-xs"></i>
                <span className="font-bold text-[#1b4d3e]">Quick Coverage Presets:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddCoverage('Vietnam', [store.stateProvince || 'Thành phố Hồ Chí Minh'])}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#1b4d3e] border border-gray-200 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <i className="fa-solid fa-location-dot text-emerald-600 text-[10px]"></i>
                  <span>Nội tỉnh Store ({store.stateProvince || 'TP. HCM'})</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddCoverage('Vietnam', ['Thành phố Hồ Chí Minh', 'Bình Dương', 'Đồng Nai', 'Long An'])}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#1b4d3e] border border-gray-200 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <i className="fa-solid fa-city text-blue-600 text-[10px]"></i>
                  <span>TP.HCM & Các tỉnh lân cận</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddCoverage('Vietnam', ['Hà Nội', 'Bắc Ninh', 'Hưng Yên'])}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#1b4d3e] border border-gray-200 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <i className="fa-solid fa-map text-purple-600 text-[10px]"></i>
                  <span>Hà Nội & Vùng phụ cận</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddCoverage('Vietnam', [])}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#1b4d3e] border border-gray-200 rounded text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <i className="fa-solid fa-globe text-amber-600 text-[10px]"></i>
                  <span>Toàn quốc (All Cities in Vietnam)</span>
                </button>
              </div>
            </div>

            {/* List of Coverage Areas */}
            {coverages.length === 0 ? (
              <div className="text-center py-8 bg-gray-50/50 rounded-lg border border-dashed border-gray-200 text-gray-400 space-y-2">
                <i className="fa-solid fa-map-location-dot text-2xl text-gray-300"></i>
                <p className="text-xs font-semibold text-gray-600">
                  Chưa có phạm vi giao hàng Internal nào được cấu hình cho Store này.
                </p>
                <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                  Vui lòng thêm quốc gia và các thành phố/tỉnh mà shipper nội bộ của cửa hàng được phép phục vụ.
                </p>
                <button
                  type="button"
                  onClick={() => handleAddCoverage('Vietnam', [store.stateProvince || 'Thành phố Hồ Chí Minh'])}
                  className="mt-2 px-3.5 py-1.5 bg-[#1b4d3e] text-white rounded text-xs font-bold hover:bg-[#153a2f] transition-colors"
                >
                  + Thêm phạm vi mặc định ({store.stateProvince || 'TP. HCM'})
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {coverages.map((rule, index) => {
                  const countryProvinces = getProvincesForCountry(rule.country);
                  const isAllCities = rule.allowedAllCities || (rule.cities && rule.cities.includes('Toàn quốc (All Cities)'));

                  return (
                    <div
                      key={rule.id || index}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-all hover:border-gray-300"
                    >
                      {/* Rule Item Header */}
                      <div className="px-4 py-2.5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-[#e9f2ee] text-[#1b4d3e] flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                              <i className="fa-solid fa-flag text-emerald-600 text-[11px]"></i>
                              <span>Country:</span>
                              <span className="text-[#1b4d3e] font-black">{rule.country}</span>
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              isAllCities ? 'bg-amber-100 text-amber-800' : 'bg-blue-50 text-blue-800'
                            }`}>
                              {isAllCities ? 'Toàn quốc (All Cities)' : `${rule.cities?.length || 0} Cities Selected`}
                            </span>
                          </div>
                        </div>

                        {/* Active toggle and Delete button */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-gray-500">
                              {rule.status ? 'Active' : 'Inactive'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateCoverage(index, { ...rule, status: !rule.status })}
                              className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                rule.status ? 'bg-[#4d9e5f]' : 'bg-gray-300'
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                  rule.status ? 'translate-x-3' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveCoverage(index)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Xóa phạm vi giao hàng này"
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        </div>
                      </div>

                      {/* Rule Item Body */}
                      <div className="p-4 space-y-4 text-xs">
                        
                        {/* Country & Mode Selector */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* Country Selector */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight block">
                              Quốc gia (Country)
                            </label>
                            <select
                              value={rule.country}
                              onChange={(e) => {
                                const newCountry = e.target.value;
                                handleUpdateCoverage(index, {
                                  ...rule,
                                  country: newCountry,
                                  cities: []
                                });
                              }}
                              className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#4d9e5f] bg-white font-semibold"
                            >
                              {COUNTRIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </div>

                          {/* Delivery Scope Mode Radio */}
                          <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight block">
                              Phạm vi Thành phố (City Coverage Mode)
                            </label>
                            <div className="flex items-center gap-3 pt-0.5">
                              <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium">
                                <input
                                  type="radio"
                                  name={`mode-${rule.id || index}`}
                                  checked={!isAllCities}
                                  onChange={() => {
                                    handleUpdateCoverage(index, {
                                      ...rule,
                                      allowedAllCities: false,
                                      cities: rule.cities.filter(c => c !== 'Toàn quốc (All Cities)')
                                    });
                                  }}
                                  className="text-[#4d9e5f] focus:ring-[#4d9e5f]"
                                />
                                <span>Chỉ định các City / Tỉnh cụ thể</span>
                              </label>

                              <label className="flex items-center gap-1.5 cursor-pointer text-gray-700 font-medium">
                                <input
                                  type="radio"
                                  name={`mode-${rule.id || index}`}
                                  checked={isAllCities}
                                  onChange={() => {
                                    handleUpdateCoverage(index, {
                                      ...rule,
                                      allowedAllCities: true,
                                      cities: ['Toàn quốc (All Cities)']
                                    });
                                  }}
                                  className="text-[#4d9e5f] focus:ring-[#4d9e5f]"
                                />
                                <span>Tất cả các City trong quốc gia ({rule.country})</span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* City Tags & City Picker (When Specific Cities is active) */}
                        {!isAllCities && (
                          <div className="p-3 bg-gray-50/70 border border-gray-200 rounded-lg space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight flex items-center gap-1">
                                <i className="fa-solid fa-city text-emerald-600"></i>
                                <span>Danh sách Tỉnh/Thành phố được phép giao ({rule.cities?.length || 0}):</span>
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleUpdateCoverage(index, {
                                      ...rule,
                                      cities: countryProvinces.slice(0, 5)
                                    });
                                  }}
                                  className="text-[10px] text-emerald-700 hover:underline font-bold"
                                >
                                  + Chọn 5 thành phố lớn nhất
                                </button>
                                <span className="text-gray-300">|</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleUpdateCoverage(index, { ...rule, cities: [] });
                                  }}
                                  className="text-[10px] text-red-500 hover:underline font-semibold"
                                >
                                  Xóa hết
                                </button>
                              </div>
                            </div>

                            {/* Active City Badges */}
                            <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-white rounded border border-gray-200">
                              {(!rule.cities || rule.cities.length === 0) ? (
                                <span className="text-xs text-gray-400 italic py-0.5">
                                  Chưa chọn City nào. Hãy chọn từ danh sách hoặc nhập tên bên dưới.
                                </span>
                              ) : (
                                rule.cities.map((city) => (
                                  <span
                                    key={city}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs"
                                  >
                                    <i className="fa-solid fa-location-dot text-[10px] text-emerald-600"></i>
                                    <span>{city}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveCityFromRule(index, city)}
                                      className="ml-1 text-emerald-600 hover:text-red-500 transition-colors"
                                      title={`Xóa ${city}`}
                                    >
                                      <i className="fa-solid fa-xmark text-[11px]"></i>
                                    </button>
                                  </span>
                                ))
                              )}
                            </div>

                            {/* Add City Inputs: Quick Dropdown + Custom Input */}
                            <div className="flex flex-wrap gap-2 pt-1 items-center">
                              {/* Quick select from known provinces */}
                              <div className="flex items-center gap-1.5 flex-1 min-w-[220px]">
                                <select
                                  value={selectedCityDropdowns[index] || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val) {
                                      handleAddCityToRule(index, val);
                                      setSelectedCityDropdowns({ ...selectedCityDropdowns, [index]: '' });
                                    }
                                  }}
                                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-[#4d9e5f] bg-white font-medium"
                                >
                                  <option value="">+ Chọn nhanh Tỉnh/Thành phố...</option>
                                  {countryProvinces
                                    .filter(p => !(rule.cities || []).includes(p))
                                    .map(p => (
                                      <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                              </div>

                              {/* Custom City Input */}
                              <div className="flex items-center gap-1.5 flex-1 min-w-[220px]">
                                <input
                                  type="text"
                                  value={customCityInputs[index] || ''}
                                  onChange={(e) => setCustomCityInputs({ ...customCityInputs, [index]: e.target.value })}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      const val = customCityInputs[index];
                                      if (val) {
                                        handleAddCityToRule(index, val);
                                        setCustomCityInputs({ ...customCityInputs, [index]: '' });
                                      }
                                    }
                                  }}
                                  placeholder="Hoặc nhập tên Tỉnh/City khác..."
                                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#4d9e5f] bg-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const val = customCityInputs[index];
                                    if (val) {
                                      handleAddCityToRule(index, val);
                                      setCustomCityInputs({ ...customCityInputs, [index]: '' });
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-[#4d9e5f] hover:bg-[#3d7d4c] text-white rounded text-xs font-bold transition-colors shrink-0"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Applicable Service Types & Delivery Parameters */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                          
                          {/* Allowed Internal Service Types */}
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight block">
                              Loại dịch vụ Internal áp dụng (Allowed Services)
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {SERVICE_TYPE_OPTIONS.map(svc => {
                                const isChecked = (rule.serviceTypes || []).includes(svc.id);
                                return (
                                  <label
                                    key={svc.id}
                                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                                      isChecked
                                        ? 'bg-emerald-50/60 border-emerald-300 text-[#1b4d3e] font-bold'
                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => handleToggleServiceTypeInRule(index, svc.id)}
                                      className="rounded border-gray-300 text-[#4d9e5f] focus:ring-[#4d9e5f] w-3.5 h-3.5"
                                    />
                                    <span className="text-[11px] truncate">{svc.label}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>

                          {/* Max Radius & Delivery Notes */}
                          <div className="space-y-2.5">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight block flex items-center justify-between">
                                <span>Bán kính giao tối đa (Max Radius)</span>
                                <span className="text-gray-400 font-normal">Nhập 0 nếu không giới hạn km</span>
                              </label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="0"
                                  step="5"
                                  value={rule.maxRadiusKm ?? 25}
                                  onChange={(e) => {
                                    handleUpdateCoverage(index, {
                                      ...rule,
                                      maxRadiusKm: parseFloat(e.target.value) || 0
                                    });
                                  }}
                                  className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:border-[#4d9e5f] font-mono font-bold pl-8"
                                />
                                <i className="fa-solid fa-compass absolute left-2.5 top-2.5 text-gray-400 text-xs"></i>
                                <span className="absolute right-3 top-1.5 text-xs text-gray-500 font-bold">Km</span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight block">
                                Ghi chú điều phối (Routing Notes)
                              </label>
                              <input
                                type="text"
                                value={rule.notes || ''}
                                onChange={(e) => handleUpdateCoverage(index, { ...rule, notes: e.target.value })}
                                placeholder="e.g. Giao hàng nội thành TP.HCM và các kho vệ tinh"
                                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-[#4d9e5f]"
                              />
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Summary statistics bar */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-earth-americas text-emerald-600"></i>
                  <span>Quốc gia phục vụ: <strong className="text-gray-900">{new Set(coverages.map(c => c.country)).size}</strong></span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-city text-blue-600"></i>
                  <span>Phạm vi City: <strong className="text-gray-900">
                    {coverages.some(c => c.allowedAllCities) ? 'Toàn quốc (All Cities) + Tỉnh chọn lọc' : `${coverages.reduce((acc, c) => acc + (c.cities?.length || 0), 0)} Tỉnh/Thành`}
                  </strong></span>
                </span>
              </div>
              <span className="text-[11px] text-gray-400 italic">
                * Dữ liệu được lưu trữ tự động khi bấm nút "Update Store" ở trên
              </span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
