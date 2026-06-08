const fs = require('fs');

const content = fs.readFileSync('App.tsx', 'utf8');

const targetStr = `                       <div>
                         <label className="text-sm text-gray-800 font-bold mb-3 block tracking-wide">Applied Order Types (Select at least 1) <span className="text-red-500">*</span></label>
                         <div className="flex items-center gap-6 text-sm text-gray-600">
                           <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors select-none"><input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4" /> <span className="font-medium">Online Orders</span></label>
                           <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors select-none"><input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4" /> <span className="font-medium">Internal Transfer Orders</span></label>
                         </div>
                       </div>`;

const replaceStr = `                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                         <div>
                           <label className="text-sm text-gray-800 font-bold mb-3 block tracking-wide">Applied Order Types (Select at least 1) <span className="text-red-500">*</span></label>
                           <div className="flex items-center gap-6 text-sm text-gray-600">
                             <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors select-none"><input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4" /> <span className="font-medium">Online Orders</span></label>
                             <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors select-none"><input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4" /> <span className="font-medium">Internal Transfer Orders</span></label>
                           </div>
                         </div>
                         <div>
                           <label className="text-sm text-gray-800 font-bold mb-3 block tracking-wide">Type reference <span className="text-red-500">*</span></label>
                           <div className="relative">
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white font-medium shadow-sm transition-all h-[38px]">
                               <option>Shipment late</option>
                               <option>Shipment invalid POD</option>
                               <option>First Attempt Delivery</option>
                             </select>
                             <i className="fa-solid fa-chevron-down absolute right-3 top-[13px] text-xs text-gray-500 pointer-events-none"></i>
                           </div>
                         </div>
                       </div>`;

if (content.includes(targetStr)) {
  const newContent = content.replace(targetStr, replaceStr);
  fs.writeFileSync('App.tsx', newContent);
  console.log('SUCCESS');
} else {
  console.log('TARGET NO MATCH');
}
