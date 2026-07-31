const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

content = content.replace(
  `<th className="px-5 py-3">Location Scope</th>
                  <th className="px-5 py-3">Cutoff</th>
                  <th className="px-5 py-3">Before Cutoff → Deliver</th>
                  <th className="px-5 py-3">After Cutoff → Deliver</th>
                  <th className="px-5 py-3">Effective From</th>
                  <th className="px-5 py-3 text-right">Actions</th>`,
  `<th className="px-5 py-3">Location Scope</th>
                  <th className="px-5 py-3">Delivery Rule</th>
                  <th className="px-5 py-3">Effective From</th>
                  <th className="px-5 py-3 text-right">Actions</th>`
);

content = content.replace(
  `<td className="px-5 py-4 font-medium">{override.cutoffTime}</td>
                    <td className="px-5 py-4 text-[11px]">
                       <span className="font-medium mr-1">{override.beforeCutoffDeliverTime}</span>
                       <span className="text-[10px] font-bold text-[#059669] bg-[#d1fae5] px-1.5 py-0.5 rounded">{formatDaysAdd(override.beforeCutoffDaysAdd)}</span>
                    </td>
                    <td className="px-5 py-4 text-[11px]">
                       <span className="font-medium mr-1">{override.afterCutoffDeliverTime}</span>
                       <span className="text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-1.5 py-0.5 rounded">{formatDaysAdd(override.afterCutoffDaysAdd)}</span>
                    </td>`,
  `<td className="px-5 py-4 text-xs text-gray-500 italic">Inherits from general config</td>`
);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
