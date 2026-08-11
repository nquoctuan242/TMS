const fs = require('fs');
let content = fs.readFileSync('src/ServicePricingDetailView.tsx', 'utf-8');

// Replace in first table (List of Charges)
content = content.replace(
  '<th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Fee</th>\n                                 <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight From ({'>'})</th>\n                                 <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight To ({\'≤\'})</th>\n                                 <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Distance From</th>\n                                 <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Distance To</th>',
  '<th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Base Price</th>\n                                 <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight From ({'>'})</th>\n                                 <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight To ({\'≤\'})</th>'
);

content = content.replace(
  '<td className="px-3 py-2.5 border-r border-gray-100">\n                                    <input type="number" defaultValue="0" className="w-16 bg-transparent outline-none" />\n                                 </td>\n                                 <td className="px-3 py-2.5 border-r border-gray-100">\n                                    <input type="number" defaultValue="5" className="w-16 bg-transparent outline-none" />\n                                 </td>\n                                 <td className="px-3 py-2.5 border-r border-gray-100 text-gray-300 italic">\n                                    <input type="number" placeholder="--" className="w-16 bg-transparent outline-none" />\n                                 </td>\n                                 <td className="px-3 py-2.5 border-r border-gray-100 text-gray-300 italic">\n                                    <input type="number" placeholder="--" className="w-16 bg-transparent outline-none" />\n                                 </td>',
  '<td className="px-3 py-2.5 border-r border-gray-100">\n                                    <input type="number" defaultValue="0" className="w-16 bg-transparent outline-none" />\n                                 </td>\n                                 <td className="px-3 py-2.5 border-r border-gray-100">\n                                    <input type="number" defaultValue="5" className="w-16 bg-transparent outline-none" />\n                                 </td>'
);

// Replace in second table (Remote Area Surcharges)
content = content.replace(
  '<th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Fee</th>\n                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight From ({'>'})</th>\n                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight To ({\'≤\'})</th>\n                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Distance From</th>\n                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Distance To</th>',
  '<th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Base Price</th>\n                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight From ({'>'})</th>\n                                    <th className="px-3 py-2 border-r border-gray-200 whitespace-nowrap">Weight To ({\'≤\'})</th>'
);

content = content.replace(
  '<td className="px-3 py-2.5 border-r border-gray-100">0</td>\n                                    <td className="px-3 py-2.5 border-r border-gray-100">0</td>\n                                    <td className="px-3 py-2.5 border-r border-gray-100 text-gray-300 italic">0</td>\n                                    <td className="px-3 py-2.5 border-r border-gray-100 text-gray-300 italic">0</td>',
  '<td className="px-3 py-2.5 border-r border-gray-100">0</td>\n                                    <td className="px-3 py-2.5 border-r border-gray-100">0</td>'
);

fs.writeFileSync('src/ServicePricingDetailView.tsx', content);
