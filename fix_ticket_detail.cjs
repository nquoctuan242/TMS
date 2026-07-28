const fs = require('fs');
let content = fs.readFileSync('src/TicketContentDetailView.tsx', 'utf8');

const targetHeader = `export function TicketContentDetailView({ ticketId, onBack }: { ticketId: string | null, onBack: () => void }) {`;
const newHeader = `export function TicketContentDetailView({ ticketId, onBack, stores }: { ticketId: string | null, onBack: () => void, stores: any[] }) {`;
content = content.replace(targetHeader, newHeader);

const stateInitTarget = `    explanationReasons: [
        { id: 1, text: 'Shipper was involved in an accident' },
        { id: 2, text: 'Vehicle breakdown' },
        { id: 3, text: 'Weather conditions' }
      ],`;
const newStateInit = `    country: 'Vietnam (VN)',
    stateProvince: ticketId === '2' ? 'Ho Chi Minh' : '',
    storeId: ticketId === '3' ? '2' : '',
    explanationReasons: [
        { id: 1, text: 'Shipper was involved in an accident' },
        { id: 2, text: 'Vehicle breakdown' },
        { id: 3, text: 'Weather conditions' }
      ],`;
content = content.replace(stateInitTarget, newStateInit);

const insertLocationScopeTarget = `              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Ticket Type</label>`;

const newLocationScopeTarget = `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Ticket Type</label>`;

// wait, let's just insert it after the end of Basic Info div.
const endOfBasicInfoStr = `                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">`;

const locationScopeInjection = `                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6 mt-6">
              <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <i className="fa-solid fa-earth-asia text-[#4d9e5f]"></i>
                <h3 className="font-bold text-[#1b4d3e] text-sm uppercase tracking-wider">Location Scope</h3>
              </div>
              <div className="p-5">
                <div className="text-[11px] text-gray-500 mb-4 bg-blue-50 text-blue-700 p-3 rounded border border-blue-100 flex items-start gap-2">
                  <i className="fa-solid fa-circle-info mt-0.5"></i>
                  <span>If you select a specific Store, this configuration applies only to that store. Otherwise, it falls back to State/Province, then Country.</span>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Country</label>
                    <select 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    >
                      <option value="Vietnam (VN)">Vietnam (VN)</option>
                      <option value="Thailand (TH)">Thailand (TH)</option>
                      <option value="Malaysia (MY)">Malaysia (MY)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">State / Province</label>
                    <select 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                      value={formData.stateProvince}
                      onChange={(e) => setFormData({...formData, stateProvince: e.target.value, storeId: ''})}
                    >
                      <option value="">All (Apply to Country)</option>
                      <option value="Ho Chi Minh">Ho Chi Minh</option>
                      <option value="Ha Noi">Ha Noi</option>
                      <option value="Da Nang">Da Nang</option>
                      <option value="Binh Duong">Binh Duong</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Store</label>
                    <select 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium"
                      value={formData.storeId || ''}
                      onChange={(e) => setFormData({...formData, storeId: e.target.value})}
                    >
                      <option value="">All (Apply to State/Country)</option>
                      {stores && stores.map(store => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">`;

content = content.replace(endOfBasicInfoStr, locationScopeInjection);
fs.writeFileSync('src/TicketContentDetailView.tsx', content);
console.log('src/TicketContentDetailView.tsx updated');
