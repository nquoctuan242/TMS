import React, { useState, useEffect } from 'react';
import { Region } from '../types';

interface RegionDetailViewProps {
  region: Region | null;
  onSave: (region: Omit<Region, 'id' | 'createdAt'>) => void;
  onBack: () => void;
}

const MOCK_STATES: Record<string, string[]> = {
  'Vietnam': ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hai Phong', 'Can Tho', 'Dong Nai', 'Binh Duong', 'Quang Ninh', 'Vinh Phuc', 'Bac Ninh', 'Hai Duong', 'Hung Yen', 'Ha Nam', 'Nam Dinh', 'Thai Binh', 'Ninh Binh', 'Thanh Hoa', 'Nghe An', 'Ha Tinh', 'Quang Binh', 'Quang Tri', 'Thua Thien Hue', 'Quang Nam', 'Quang Ngai', 'Binh Dinh', 'Phu Yen', 'Khanh Hoa', 'Ninh Thuan', 'Binh Thuan', 'Kon Tum', 'Gia Lai', 'Dak Lak', 'Dak Nong', 'Lam Dong', 'Binh Phuoc', 'Tay Ninh', 'Ba Ria - Vung Tau', 'Long An', 'Tien Giang', 'Ben Tre', 'Tra Vinh', 'Vinh Long', 'Dong Thap', 'An Giang', 'Kien Giang', 'Hau Giang', 'Soc Trang', 'Bac Lieu', 'Ca Mau', 'Ha Giang', 'Cao Bang', 'Bac Kan', 'Tuyen Quang', 'Lao Cai', 'Yen Bai', 'Thai Nguyen', 'Lang Son', 'Bac Giang', 'Phu Tho', 'Dien Bien', 'Lai Chau', 'Son La', 'Hoa Binh'],
  'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Nonthaburi'],
  'Indonesia': ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Medan']
};

export const RegionDetailView: React.FC<RegionDetailViewProps> = ({ region, onSave, onBack }) => {
  const [formData, setFormData] = useState<Omit<Region, 'id' | 'createdAt'>>({
    code: '',
    name: '',
    country: 'Vietnam',
    description: '',
    status: 'Active',
    partnerType: 'All',
    partnerName: '',
    states: []
  });

  useEffect(() => {
    if (region) {
      setFormData({
        code: region.code,
        name: region.name,
        country: region.country,
        description: region.description,
        status: region.status,
        partnerType: region.partnerType || 'All',
        partnerName: region.partnerName || '',
        states: region.states || []
      });
    }
  }, [region]);

  const availableStates = MOCK_STATES[formData.country] || [];

  return (
    <div className="bg-white rounded shadow-sm h-full flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-[#1b4d3e] transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">
            {region ? `Edit Region: ${region.name}` : 'Create New Region'}
          </h2>
        </div>
        <button 
          onClick={() => onSave(formData)}
          className="bg-[#4d9e5f] text-white px-6 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors shadow-sm"
        >
          Save Region
        </button>
      </div>
      
      <div className="p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Region Info */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              placeholder="e.g. REG-001"
              className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Name <span className="text-red-500">*</span></label>
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
              onChange={(e) => setFormData({...formData, country: e.target.value, states: []})}
              className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
            >
              <option value="Vietnam">Vietnam</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
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

          {/* Partner Scope */}
          <div className="md:col-span-2 mt-2">
            <h3 className="text-xs font-bold text-gray-800 mb-4 border-b pb-2">Partner Scope (Optional)</h3>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply To</label>
            <select
              value={formData.partnerType}
              onChange={(e) => setFormData({...formData, partnerType: e.target.value as 'All' | 'Customer' | 'Carrier'})}
              className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
            >
              <option value="All">All Partners (Global)</option>
              <option value="Customer">Specific Customer</option>
              <option value="Carrier">Specific Carrier</option>
            </select>
          </div>
          {formData.partnerType !== 'All' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 tracking-tight block">{formData.partnerType} Name</label>
              <input
                type="text"
                value={formData.partnerName}
                onChange={(e) => setFormData({...formData, partnerName: e.target.value})}
                placeholder={`Enter ${formData.partnerType?.toLowerCase()} name...`}
                className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50"
              />
            </div>
          )}

          {/* State Mapping */}
          <div className="md:col-span-2 mt-2">
            <h3 className="text-xs font-bold text-gray-800 mb-4 border-b pb-2">State / Province Mapping</h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-[11px] text-gray-500 mb-4">Select the states/provinces that belong to this region.</p>
              <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {availableStates.map(state => (
                  <label key={state} className={`flex items-center gap-2 border rounded px-3 py-2 cursor-pointer transition-colors ${formData.states?.includes(state) ? 'bg-[#eefcf1] border-[#4d9e5f]' : 'bg-white hover:bg-gray-100 border-gray-200'}`}>
                    <input 
                      type="checkbox" 
                      className="accent-[#4d9e5f] w-3.5 h-3.5"
                      checked={formData.states?.includes(state) || false}
                      onChange={(e) => {
                        const currentStates = formData.states || [];
                        if (e.target.checked) {
                          setFormData({...formData, states: [...currentStates, state]});
                        } else {
                          setFormData({...formData, states: currentStates.filter(s => s !== state)});
                        }
                      }} 
                    />
                    <span className={`text-[11px] font-medium ${formData.states?.includes(state) ? 'text-[#1b4d3e]' : 'text-gray-700'}`}>{state}</span>
                  </label>
                ))}
                {availableStates.length === 0 && (
                  <div className="text-[11px] text-gray-400">No states available for this country.</div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Additional details about this region..."
              rows={3}
              className="w-full border border-gray-200 rounded px-3 py-2 text-[12px] text-gray-800 outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] transition-all bg-gray-50/50 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
