const fs = require('fs');

// 1. types.ts
let typesContent = fs.readFileSync('types.ts', 'utf-8');
typesContent = typesContent.replace(/destCondition: string;/g, 'isRemote: boolean;');
fs.writeFileSync('types.ts', typesContent);

// 2. constants.tsx
let constContent = fs.readFileSync('constants.tsx', 'utf-8');
constContent = constContent.replace(/destCondition: 'Equals',/g, 'isRemote: true,');
constContent = constContent.replace(/destCondition: 'Starts With',/g, 'isRemote: false,');
fs.writeFileSync('constants.tsx', constContent);

// 3. ZoneRuleListView.tsx
let listContent = fs.readFileSync('src/ZoneRuleListView.tsx', 'utf-8');
listContent = listContent.replace(
  /<th className="px-4 py-3 uppercase tracking-wider font-bold">Dest Condition<\/th>/g,
  '<th className="px-4 py-3 uppercase tracking-wider font-bold">Is Remote</th>'
);
listContent = listContent.replace(
  /<td className="px-4 py-3 text-gray-700">{config.destCondition}<\/td>/g,
  '<td className="px-4 py-3 text-gray-700">{config.isRemote ? "TRUE" : "FALSE"}</td>'
);
fs.writeFileSync('src/ZoneRuleListView.tsx', listContent);

// 4. ZoneRuleDetailView.tsx
let detailContent = fs.readFileSync('src/ZoneRuleDetailView.tsx', 'utf-8');
detailContent = detailContent.replace(/destCondition: '',/g, 'isRemote: false,');

const oldInput = `                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Dest Condition</label>
                  <input 
                    type="text" 
                    value={formData.destCondition}
                    onChange={e => setFormData({...formData, destCondition: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. Equals, Starts With"
                  />
                </div>`;

const selectHtml = `                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Is Remote</label>
                  <select 
                    value={formData.isRemote ? 'TRUE' : 'FALSE'}
                    onChange={e => setFormData({...formData, isRemote: e.target.value === 'TRUE'})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="TRUE">TRUE</option>
                    <option value="FALSE">FALSE</option>
                  </select>
                </div>`;

detailContent = detailContent.replace(oldInput, selectHtml);
fs.writeFileSync('src/ZoneRuleDetailView.tsx', detailContent);
