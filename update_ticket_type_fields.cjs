const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const startStr = `<div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply to Order Types</label>`;
const endStr = `<div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Status</label>`;

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `<div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply to Order Types</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(editingTicketType.applyOrderTypes || []).map(type => (
                          <span key={type} className="bg-[#e9f2ee] text-[#1b4d3e] px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 border border-[#cbe1d4]">
                            {type}
                            <button onClick={() => setEditingTicketType({...editingTicketType, applyOrderTypes: (editingTicketType.applyOrderTypes || []).filter(t => t !== type)})} className="hover:text-red-500 opacity-70 hover:opacity-100 transition-opacity"><i className="fa-solid fa-xmark"></i></button>
                          </span>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Type and press Enter to add order type..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = e.currentTarget.value.trim();
                            if (val && !(editingTicketType.applyOrderTypes || []).includes(val)) {
                               setEditingTicketType({...editingTicketType, applyOrderTypes: [...(editingTicketType.applyOrderTypes || []), val]});
                            }
                            e.currentTarget.value = '';
                          }
                        }}
                        className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-2 text-[12px] text-gray-600 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white transition-all h-[34px]"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply to Service Types</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(editingTicketType.applyServiceTypes || []).map(type => (
                          <span key={type} className="bg-[#e9f2ee] text-[#1b4d3e] px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 border border-[#cbe1d4]">
                            {type}
                            <button onClick={() => setEditingTicketType({...editingTicketType, applyServiceTypes: (editingTicketType.applyServiceTypes || []).filter(t => t !== type)})} className="hover:text-red-500 opacity-70 hover:opacity-100 transition-opacity"><i className="fa-solid fa-xmark"></i></button>
                          </span>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Type and press Enter to add service type..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = e.currentTarget.value.trim();
                            if (val && !(editingTicketType.applyServiceTypes || []).includes(val)) {
                               setEditingTicketType({...editingTicketType, applyServiceTypes: [...(editingTicketType.applyServiceTypes || []), val]});
                            }
                            e.currentTarget.value = '';
                          }
                        }}
                        className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-2 text-[12px] text-gray-600 outline-none focus:ring-1 focus:ring-[#4d9e5f] bg-white transition-all h-[34px]"
                      />
                    </div>
                    `;

  content = content.slice(0, startIndex) + replacement + content.slice(endIndex);
  fs.writeFileSync('App.tsx', content);
  console.log("Replaced");
} else {
  console.log("Could not find markers.");
}
