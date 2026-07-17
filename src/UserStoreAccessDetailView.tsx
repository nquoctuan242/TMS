import React, { useState } from 'react';

interface UserStoreAccessDetailViewProps {
  user: any;
  stores: any[];
  onBack: () => void;
  onSave: (user: any) => void;
}

export function UserStoreAccessDetailView({ user, stores, onBack, onSave }: UserStoreAccessDetailViewProps) {
  const [editingUser, setEditingUser] = useState<any>(user || {});
  const [expandedStoreCountries, setExpandedStoreCountries] = useState<string[]>([]);
  const [addedStoreCountries, setAddedStoreCountries] = useState<string[]>([]);
  const [showAddCountryDropdown, setShowAddCountryDropdown] = useState(false);
  const [showAddSpecificStorePopup, setShowAddSpecificStorePopup] = useState<string | null>(null);
  const [specificStoreSearch, setSpecificStoreSearch] = useState('');
  const [assignedStoreSearch, setAssignedStoreSearch] = useState<Record<string, string>>({});

  if (!user) return null;

  return (
    <div className="bg-[#f8fafc] min-h-full flex flex-col animate-in slide-in-from-right duration-300 relative pb-20">
      <div className="bg-white border-b px-4 py-3 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Store Access: {editingUser.fullName}</h2>
            <div className="text-[10px] text-gray-500 font-medium">{editingUser.email} • {editingUser.username}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onBack}
            className="px-4 py-1.5 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(editingUser)}
            className="px-4 py-1.5 bg-[#4d9e5f] text-white rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors shadow-sm"
          >
            Save Access
          </button>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
          <h3 className="text-[#4d9e5f] font-bold text-xs uppercase flex items-center gap-2 border-b pb-2">
            <i className="fa-solid fa-store"></i> Store Access
          </h3>
          <div className="space-y-4">
            
            {/* Quick Assign by Levels */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Grant Access by Location</div>
                {(() => {
                  if (!editingUser.companyIds || editingUser.companyIds.length === 0) return null;
                  const assignedCountries = [...new Set((editingUser.storeIds || []).map((id: string) => stores.find(s => s.id === id)?.country).filter(Boolean) as string[])];
                  const availableCountries = [...new Set(stores.filter(s => (editingUser.companyIds || []).includes(s.companyId)).map(s => s.country).filter(Boolean) as string[])];
                  const displayedCountries = [...new Set([...assignedCountries, ...addedStoreCountries])].filter(c => availableCountries.includes(c));
                  const remainingCountries = availableCountries.filter(c => !displayedCountries.includes(c));

                  return (
                    remainingCountries.length > 0 && (
                      <div className="relative">
                        <button 
                          onClick={() => setShowAddCountryDropdown(!showAddCountryDropdown)}
                          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded transition-colors"
                        >
                          <i className="fa-solid fa-plus mr-1"></i> Add Country
                        </button>
                        {showAddCountryDropdown && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded shadow-lg border border-gray-200 z-10 py-1">
                            {remainingCountries.map(country => (
                              <button
                                key={country}
                                onClick={() => {
                                  setAddedStoreCountries([...addedStoreCountries, country]);
                                  setShowAddCountryDropdown(false);
                                  if (!expandedStoreCountries.includes(country)) {
                                    setExpandedStoreCountries([...expandedStoreCountries, country]);
                                  }
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-xs text-gray-700 font-medium"
                              >
                                {country}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  );
                })()}
              </div>

              {!editingUser.companyIds || editingUser.companyIds.length === 0 ? (
                <div className="text-xs text-gray-500 italic p-4 bg-gray-50 rounded border border-gray-100 text-center">
                  Please assign a company first to see available stores.
                </div>
              ) : (
                <div className="space-y-3">
                  {(() => {
                    const assignedCountries = [...new Set((editingUser.storeIds || []).map((id: string) => stores.find(s => s.id === id)?.country).filter(Boolean) as string[])];
                    const availableCountries = [...new Set(stores.filter(s => (editingUser.companyIds || []).includes(s.companyId)).map(s => s.country).filter(Boolean) as string[])];
                    const displayedCountries = [...new Set([...assignedCountries, ...addedStoreCountries])].filter(c => availableCountries.includes(c));
                    
                    if (displayedCountries.length === 0) {
                      return (
                        <div className="text-xs text-gray-500 italic p-4 bg-gray-50 rounded border border-gray-100 text-center">
                          No store access granted yet. Click "Add Country" to begin.
                        </div>
                      );
                    }

                    return displayedCountries.map(country => {
                      const countryStores = stores.filter(s => s.country === country && (editingUser.companyIds || []).includes(s.companyId));
                      const isExpanded = expandedStoreCountries.includes(country);
                      
                      const searchTerm = (assignedStoreSearch[country] || '').toLowerCase();
                      const filteredCountryStores = countryStores.filter(s => 
                        !searchTerm || 
                        s.name.toLowerCase().includes(searchTerm) ||
                        (s.stateProvince || '').toLowerCase().includes(searchTerm) ||
                        (s.ward || '').toLowerCase().includes(searchTerm)
                      );

                      const assignedInCountry = countryStores.filter(s => (editingUser.storeIds || []).includes(s.id));
                      
                      return (
                        <div key={country} className="border border-gray-200 rounded-md overflow-hidden bg-white">
                          <div className="bg-gray-50 px-3 py-2 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => {
                                  if (isExpanded) {
                                    setExpandedStoreCountries(expandedStoreCountries.filter(c => c !== country));
                                  } else {
                                    setExpandedStoreCountries([...expandedStoreCountries, country]);
                                  }
                                }}
                                className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
                              >
                                <i className={`fa-solid ${isExpanded ? 'fa-caret-down' : 'fa-caret-right'}`}></i>
                              </button>
                              <span className="text-xs font-bold text-gray-800">{country}</span>
                              <span className="bg-white border border-gray-200 text-gray-500 text-[9px] px-1.5 py-0.5 rounded font-bold">
                                {assignedInCountry.length} / {countryStores.length} stores
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {assignedInCountry.length < countryStores.length && (
                                <button
                                  onClick={() => setShowAddSpecificStorePopup(country)}
                                  className="text-[10px] font-bold text-[#4d9e5f] hover:text-[#3d7d4c] px-2 py-1 rounded hover:bg-[#4d9e5f]/10 transition-colors"
                                >
                                  + Add Stores
                                </button>
                              )}
                              <button 
                                onClick={() => {
                                  const allIdsInCountry = countryStores.map(s => s.id);
                                  setEditingUser((prev: any) => ({
                                    ...prev,
                                    storeIds: (prev.storeIds || []).filter((id: string) => !allIdsInCountry.includes(id))
                                  }));
                                  setAddedStoreCountries(addedStoreCountries.filter(c => c !== country));
                                }}
                                className="text-[10px] font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                              >
                                Remove All
                              </button>
                            </div>
                          </div>
                          
                          {isExpanded && (
                            <div className="p-3">
                              {assignedInCountry.length > 0 ? (
                                <div className="space-y-3">
                                  <div className="relative">
                                    <i className="fa-solid fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]"></i>
                                    <input 
                                      type="text" 
                                      placeholder="Search assigned stores..." 
                                      value={assignedStoreSearch[country] || ''}
                                      onChange={(e) => setAssignedStoreSearch({...assignedStoreSearch, [country]: e.target.value})}
                                      className="w-full pl-7 pr-3 py-1.5 border border-gray-200 rounded text-xs outline-none focus:border-[#4d9e5f] bg-gray-50 focus:bg-white"
                                    />
                                  </div>
                                  
                                  <div className="max-h-[250px] overflow-y-auto border border-gray-100 rounded-md">
                                    <table className="w-full text-left text-xs bg-white">
                                      <thead className="bg-gray-50 text-gray-600 font-bold sticky top-0 border-b border-gray-100">
                                        <tr>
                                          <th className="px-3 py-1.5 border-r border-gray-100">Store</th>
                                          <th className="px-3 py-1.5 border-r border-gray-100">State / Prov</th>
                                          <th className="px-3 py-1.5 border-r border-gray-100">Ward</th>
                                          <th className="px-3 py-1.5 text-center w-16">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-50">
                                        {assignedInCountry.filter(s => 
                                          !searchTerm || 
                                          s.name.toLowerCase().includes(searchTerm) ||
                                          (s.stateProvince || '').toLowerCase().includes(searchTerm) ||
                                          (s.ward || '').toLowerCase().includes(searchTerm)
                                        ).map(store => (
                                          <tr key={store.id} className="hover:bg-gray-50/50">
                                            <td className="px-3 py-1.5 border-r border-gray-50 text-gray-800 font-medium">{store.name}</td>
                                            <td className="px-3 py-1.5 border-r border-gray-50 text-gray-500">{store.stateProvince || '-'}</td>
                                            <td className="px-3 py-1.5 border-r border-gray-50 text-gray-500">{store.ward || '-'}</td>
                                            <td className="px-3 py-1.5 text-center">
                                              <button 
                                                onClick={() => {
                                                  setEditingUser((prev: any) => ({
                                                    ...prev,
                                                    storeIds: (prev.storeIds || []).filter((id: string) => id !== store.id)
                                                  }));
                                                }}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                              >
                                                <i className="fa-solid fa-trash-can text-[10px]"></i>
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <p className="text-xs text-gray-400 mb-2">No stores assigned in {country}.</p>
                                  <button
                                    onClick={() => setShowAddSpecificStorePopup(country)}
                                    className="text-[10px] font-bold text-[#4d9e5f] hover:text-[#3d7d4c] px-3 py-1.5 rounded border border-[#4d9e5f]/30 hover:bg-[#4d9e5f]/10 transition-colors"
                                  >
                                    Add Stores Now
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddSpecificStorePopup && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-[100] px-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-[#1b4d3e]">Add Specific Store in {showAddSpecificStorePopup}</h3>
              <button onClick={() => {setShowAddSpecificStorePopup(null); setSpecificStoreSearch('');}} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-hidden flex flex-col">
              <div className="relative mb-4">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                <input 
                  type="text" 
                  placeholder={`Search stores in ${showAddSpecificStorePopup}...`}
                  value={specificStoreSearch}
                  onChange={(e) => setSpecificStoreSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-[#4d9e5f]"
                />
              </div>
              <div className="border rounded-md overflow-hidden bg-white max-h-[400px] overflow-y-auto">
                 <table className="w-full text-left text-xs bg-white">
                   <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold sticky top-0 border-b">
                     <tr>
                       <th className="px-4 py-2 border-r">Store Name</th>
                       <th className="px-4 py-2 border-r">State / Province</th>
                       <th className="px-4 py-2 border-r">Ward</th>
                       <th className="px-4 py-2 text-center w-24">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y text-gray-600 font-medium">
                      {stores.filter(s => {
                        const term = specificStoreSearch.toLowerCase();
                        let isMatch = s.country === showAddSpecificStorePopup && 
                                      ((editingUser.companyIds || []).length === 0 || (editingUser.companyIds || []).includes(s.companyId));
                        if (!isMatch) return false;
                        if (!term) return true;
                        return s.name.toLowerCase().includes(term) || (s.stateProvince || '').toLowerCase().includes(term) || (s.ward || '').toLowerCase().includes(term);
                      }).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-400 italic">No stores found.</td>
                        </tr>
                      ) : (
                        stores.filter(s => {
                          const term = specificStoreSearch.toLowerCase();
                          let isMatch = s.country === showAddSpecificStorePopup && 
                                      ((editingUser.companyIds || []).length === 0 || (editingUser.companyIds || []).includes(s.companyId));
                          if (!isMatch) return false;
                          if (!term) return true;
                          return s.name.toLowerCase().includes(term) || (s.stateProvince || '').toLowerCase().includes(term) || (s.ward || '').toLowerCase().includes(term);
                        }).map(store => {
                          const isAssigned = (editingUser.storeIds || []).includes(store.id);
                          return (
                            <tr key={store.id} className="hover:bg-gray-50/50">
                              <td className="px-4 py-2 border-r">{store.name}</td>
                              <td className="px-4 py-2 border-r">{store.stateProvince || '-'}</td>
                              <td className="px-4 py-2 border-r">{store.ward || '-'}</td>
                              <td className="px-4 py-2 text-center">
                                {isAssigned ? (
                                  <span className="text-xs font-bold text-gray-400 cursor-not-allowed">Added</span>
                                ) : (
                                  <button 
                                    onClick={() => {
                                      setEditingUser((prev: any) => ({
                                        ...prev,
                                        storeIds: [...(prev.storeIds || []), store.id]
                                      }));
                                    }}
                                    className="text-[10px] font-bold text-[#4d9e5f] border border-[#4d9e5f] px-2 py-0.5 rounded hover:bg-[#4d9e5f] hover:text-white transition-colors"
                                  >
                                    Add
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                   </tbody>
                 </table>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button 
                onClick={() => {setShowAddSpecificStorePopup(null); setSpecificStoreSearch('');}}
                className="bg-[#4d9e5f] text-white px-6 py-2 rounded text-sm font-bold hover:bg-[#3d7d4c]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
