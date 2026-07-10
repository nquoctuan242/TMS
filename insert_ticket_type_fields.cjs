const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const regex = /<div className="space-y-1">\s*<label className="text-\[11px\] font-bold text-gray-700 tracking-tight block">Status<\/label>/;

const replacement = `<div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply to Order Types</label>
                      <div className="flex gap-4 mt-1">
                        {['Online', 'IT'].map(type => (
                          <label key={type} className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={(editingTicketType.applyOrderTypes || []).includes(type)}
                              onChange={(e) => {
                                const currentTypes = editingTicketType.applyOrderTypes || [];
                                const newTypes = e.target.checked 
                                  ? [...currentTypes, type]
                                  : currentTypes.filter(t => t !== type);
                                setEditingTicketType({...editingTicketType, applyOrderTypes: newTypes});
                              }}
                              className="w-3.5 h-3.5 rounded text-[#4d9e5f] focus:ring-[#4d9e5f]"
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Apply to Service Types</label>
                      <div className="flex flex-wrap gap-4 mt-1">
                        {['Standard', 'Same day', '2h', '4h'].map(type => (
                          <label key={type} className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={(editingTicketType.applyServiceTypes || []).includes(type)}
                              onChange={(e) => {
                                const currentTypes = editingTicketType.applyServiceTypes || [];
                                const newTypes = e.target.checked 
                                  ? [...currentTypes, type]
                                  : currentTypes.filter(t => t !== type);
                                setEditingTicketType({...editingTicketType, applyServiceTypes: newTypes});
                              }}
                              className="w-3.5 h-3.5 rounded text-[#4d9e5f] focus:ring-[#4d9e5f]"
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Status</label>`;

content = content.replace(regex, replacement);
fs.writeFileSync('App.tsx', content);

