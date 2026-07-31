const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

// Add import for MOCK_STORES
content = content.replace(
  `import { MOCK_DELIVERY_SLA_CONFIGS } from '../constants';`,
  `import { MOCK_DELIVERY_SLA_CONFIGS, MOCK_STORES } from '../constants';`
);

// Replace property names
content = content.replace(/storeOverrides/g, 'locationOverrides');

// Replace table header and scope text
content = content.replace(
  `{/* Store Overrides */}\n        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">\n           <div className="p-5 border-b border-gray-100">\n              <h3 className="font-bold text-[#111827] text-sm">Store overrides</h3>\n              <p className="text-xs text-gray-500 mt-1">{formData.locationOverrides.length} stores override the default for this service</p>`,
  `{/* Location Overrides */}\n        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">\n           <div className="p-5 border-b border-gray-100">\n              <h3 className="font-bold text-[#111827] text-sm">Location overrides</h3>\n              <p className="text-xs text-gray-500 mt-1">{formData.locationOverrides.length} locations override the default for this service</p>`
);

content = content.replace(
  `<th className="px-5 py-3">Store</th>`,
  `<th className="px-5 py-3">Location Scope</th>`
);

content = content.replace(
  `<td className="px-5 py-4 font-medium">{override.storeName}</td>`,
  `<td className="px-5 py-4 font-medium">
                       <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-gray-800">{override.country}</span>
                          {override.stateProvince && (
                             <>
                                <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
                                <span className="text-gray-700">{override.stateProvince}</span>
                             </>
                          )}
                          {override.storeId && (
                             <>
                                <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
                                <span className="text-[#3b5998] font-bold">{MOCK_STORES.find(s => s.id === override.storeId)?.name || override.storeId}</span>
                             </>
                          )}
                       </div>
                    </td>`
);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
console.log('detail view updated');
