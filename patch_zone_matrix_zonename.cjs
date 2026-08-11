const fs = require('fs');

// 1. types.ts
let typesContent = fs.readFileSync('types.ts', 'utf-8');
typesContent = typesContent.replace(/zoneId: string;/g, 'zoneName: string;');
fs.writeFileSync('types.ts', typesContent);

// 2. constants.tsx
let constContent = fs.readFileSync('constants.tsx', 'utf-8');
constContent = constContent.replace(/zoneId: '2'/g, "zoneName: 'Nội miền'");
constContent = constContent.replace(/zoneId: '3'/g, "zoneName: 'Cận miền'");
constContent = constContent.replace(/zoneId: '4'/g, "zoneName: 'Liên miền (cách vùng)'");
fs.writeFileSync('constants.tsx', constContent);

// 3. ZoneMatrixListView.tsx
let listContent = fs.readFileSync('src/ZoneMatrixListView.tsx', 'utf-8');
listContent = listContent.replace(/Zone ID<\/th>/g, 'Zone Name</th>');
listContent = listContent.replace(/{config.zoneId}<\/td>/g, '{config.zoneName}</td>');
fs.writeFileSync('src/ZoneMatrixListView.tsx', listContent);

// 4. ZoneMatrixDetailView.tsx
let detailContent = fs.readFileSync('src/ZoneMatrixDetailView.tsx', 'utf-8');
detailContent = detailContent.replace(/zoneId: '',/g, "zoneName: '',");

const oldInput = `                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Zone ID</label>
                  <input 
                    type="text" 
                    value={formData.zoneId}
                    onChange={e => setFormData({...formData, zoneId: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. 2, 3, 4"
                  />
                </div>`;

const selectHtml = `                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Zone Name</label>
                  <select 
                    value={formData.zoneName}
                    onChange={e => setFormData({...formData, zoneName: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="">Select Zone</option>
                    <option value="Nội miền">Nội miền</option>
                    <option value="Cận miền">Cận miền</option>
                    <option value="Liên miền (cách vùng)">Liên miền (cách vùng)</option>
                  </select>
                </div>`;

detailContent = detailContent.replace(oldInput, selectHtml);
fs.writeFileSync('src/ZoneMatrixDetailView.tsx', detailContent);
