const fs = require('fs');

let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');

// Remove the timeline block
content = content.replace(/\{\s*enableCutoffRule\s*&&\s*\([\s\S]*?<div className="p-6">/, '<div className="p-6">');

// Update Example Config auto-run block
const newExampleSection = `               {/* Example Section */}
               <div className="bg-blue-50/50 p-5 border-t border-b border-blue-100 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-[#3b5998]">
                     <i className="fa-solid fa-circle-info"></i>
                     <h3 className="font-bold text-sm">Example Config auto-run</h3>
                  </div>
                  <p className="text-xs text-gray-600">If an order is created today (<span className="font-bold">{new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</span>):</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                     <div className="bg-white border border-gray-200 rounded p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#059669]"></div>
                        <div className="text-[11px] font-bold text-[#059669] mb-1">Created BEFORE {formData.cutoffTime || '14:00'}</div>
                        <div className="text-xs text-gray-700">
                           <span className="text-gray-500 block mb-1">Expected Delivery SLA:</span>
                           <span className="font-bold text-sm">
                             {new Date(Date.now() + (formData.beforeCutoffDaysAdd || 0) * 86400000).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })} by {formData.beforeCutoffDeliverTime || '12:00'}
                           </span>
                        </div>
                     </div>
                     
                     <div className="bg-white border border-gray-200 rounded p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#d97706]"></div>
                        <div className="text-[11px] font-bold text-[#d97706] mb-1">Created AFTER {formData.cutoffTime || '14:00'}</div>
                        <div className="text-xs text-gray-700">
                           <span className="text-gray-500 block mb-1">Expected Delivery SLA:</span>
                           <span className="font-bold text-sm">
                             {new Date(Date.now() + (formData.afterCutoffDaysAdd || 0) * 86400000).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })} by {formData.afterCutoffDeliverTime || '12:00'}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>`;

content = content.replace(/\{\/\* Example Section \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, newExampleSection);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
