const fs = require('fs');
let content = fs.readFileSync('src/ZoneRuleDetailView.tsx', 'utf-8');

// 1. replace carrierId -> partner
content = content.replace(/carrierId: ''/g, "partner: ''");
content = content.replace(/{formData.carrierId}/g, "{formData.partner}");
content = content.replace(/carrierId: e.target.value/g, "partner: e.target.value");
content = content.replace(/Carrier ID<\/label>/g, "Partner</label>");

// 2. replace matchType input with select
const selectHtml = `<select 
                    value={formData.matchType}
                    onChange={e => setFormData({...formData, matchType: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                  >
                    <option value="">Select Match Type</option>
                    <option value="SPECIAL">SPECIAL</option>
                    <option value="SAME_PROVINCE">SAME_PROVINCE</option>
                    <option value="REGION_MATRIX">REGION_MATRIX</option>
                  </select>`;

const oldInput = `<input 
                    type="text" 
                    value={formData.matchType}
                    onChange={e => setFormData({...formData, matchType: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#1b4d3e]"
                    placeholder="e.g. Exact, Prefix"
                  />`;

content = content.replace(oldInput, selectHtml);

fs.writeFileSync('src/ZoneRuleDetailView.tsx', content);
