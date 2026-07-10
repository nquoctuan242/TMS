const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const regexOrder = /<div className="col-span-2 space-y-1">\s*<label className="text-\[11px\] font-bold text-gray-700 tracking-tight block">Apply to Order Types<\/label>\s*<div className="flex gap-4 mt-1">\s*\{\['Online', 'IT'\]\.map\(type => \([\s\S]*?\}\)\)\}\s*<\/div>\s*<\/div>/;

const replacementOrder = `<div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply to Order Types</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(editingTicketType.applyOrderTypes || []).map(type => (
                          <span key={type} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1">
                            {type}
                            <button onClick={() => setEditingTicketType({...editingTicketType, applyOrderTypes: (editingTicketType.applyOrderTypes || []).filter(t => t !== type)})} className="hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                          </span>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Type and press Enter to add..."
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
                    </div>`;

content = content.replace(regexOrder, replacementOrder);

const regexService = /<div className="col-span-2 space-y-1">\s*<label className="text-\[11px\] font-bold text-gray-700 tracking-tight block">Apply to Service Types<\/label>\s*<div className="flex flex-wrap gap-4 mt-1">\s*\{\['Standard', 'Same day', '2h', '4h'\]\.map\(type => \([\s\S]*?\}\)\)\}\s*<\/div>\s*<\/div>/;

const replacementService = `<div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply to Service Types</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {(editingTicketType.applyServiceTypes || []).map(type => (
                          <span key={type} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1">
                            {type}
                            <button onClick={() => setEditingTicketType({...editingTicketType, applyServiceTypes: (editingTicketType.applyServiceTypes || []).filter(t => t !== type)})} className="hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                          </span>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Type and press Enter to add..."
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
                    </div>`;

content = content.replace(regexService, replacementService);

fs.writeFileSync('App.tsx', content);

