const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');
const oldBlock = fs.readFileSync('old_block.txt', 'utf-8');

const slcTableSection = `        {/* Service Level Configs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <div>
                <h3 className="font-bold text-[#111827] text-sm">Service Level Configs</h3>
                <p className="text-xs text-gray-500 mt-1">Configure partner and weight attributes for multiple carriers/customers</p>
              </div>
              <button 
                onClick={() => {
                  setEditingSlc({
                    id: Date.now().toString(),
                    partner: 'Carrier',
                    volumetricDivisor: 5000,
                    weightRoundStep: 0.5,
                    weightRoundMethod: 'up',
                    minChargeableWeight: 1,
                    maxWeight: 30,
                    isActive: true
                  });
                  setShowSlcModal(true);
                }}
                className="bg-white border border-[#3b5998] text-[#3b5998] px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-plus"></i> Add config
              </button>
           </div>
           
           <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#f8fafc] text-gray-600 font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Partner</th>
                    <th className="px-4 py-3 text-right">Vol. Divisor</th>
                    <th className="px-4 py-3 text-right">Weight Step</th>
                    <th className="px-4 py-3 text-center">Round Method</th>
                    <th className="px-4 py-3 text-right">Min Wt.</th>
                    <th className="px-4 py-3 text-right">Max Wt.</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {formData.serviceLevelConfigs && formData.serviceLevelConfigs.map((config, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{config.partner}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.volumetricDivisor}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.weightRoundStep}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{config.weightRoundMethod}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.minChargeableWeight}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{config.maxWeight}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={\`px-2 py-1 rounded-full text-[10px] font-bold \${config.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}\`}>
                          {config.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => {
                            setEditingSlc(config);
                            setShowSlcModal(true);
                          }}
                          className="text-[#3b5998] hover:text-blue-800 transition-colors"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!formData.serviceLevelConfigs || formData.serviceLevelConfigs.length === 0) && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500 text-[13px]">
                        No service level configs defined.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
           </div>
        </div>`;

content = content.replace(oldBlock, slcTableSection);
fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
