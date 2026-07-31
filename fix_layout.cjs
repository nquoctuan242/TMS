const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

const oldLayout = `              {/* Service Details */}
              <div className="mb-8">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Service Details</h3>
                 <div className="max-w-md">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Service Name</label>
                    <input 
                      type="text" 
                      value={formData.serviceName}
                      onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                      placeholder="e.g. Same-day delivery"
                    />
                 </div>
              </div>
              
              {/* Delivery Rule */}
              <div>
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Delivery Rule</h3>
                 
                 <div className="mb-6">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Cutoff Time</label>
                    <input 
                      type="time" 
                      value={formData.cutoffTime}
                      onChange={(e) => setFormData({...formData, cutoffTime: e.target.value})}
                      className="w-48 border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                    />
                    <p className="text-[10px] text-gray-500 mt-1.5">Orders packed before this time will be processed using the Before Cutoff rule.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">`;

const newLayout = `              {/* Service Details */}
              <div className="mb-8">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Service Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Service Name</label>
                      <input 
                        type="text" 
                        value={formData.serviceName}
                        onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800"
                        placeholder="e.g. Same-day delivery"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Cutoff Time</label>
                      <input 
                        type="time" 
                        value={formData.cutoffTime}
                        onChange={(e) => setFormData({...formData, cutoffTime: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-800 bg-white"
                      />
                      <p className="text-[10px] text-gray-500 mt-1.5">Orders packed before this time will be processed using the Before Cutoff rule.</p>
                    </div>
                 </div>
              </div>
              
              {/* Delivery Rule */}
              <div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">`;

content = content.replace(oldLayout, newLayout);
fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
console.log('Layout updated');
