const fs = require('fs');
let content = fs.readFileSync('src/TicketContentDetailView.tsx', 'utf8');

// 1. Add explanationReasons to formData state
content = content.replace(
  "conditions: ticketId === '1'",
  "explanationReasons: [\n        { id: 1, text: 'Shipper was involved in an accident' },\n        { id: 2, text: 'Vehicle breakdown' },\n        { id: 3, text: 'Weather conditions' }\n      ],\n      conditions: ticketId === '1'"
);

// 2. Add methods for Explanation Reasons
const addConditionStr = `  const addCondition = () => {`;
const newMethodsStr = `  const addExplanationReason = () => {
    const newId = Math.max(...(formData.explanationReasons || []).map(r => r.id), 0) + 1;
    setFormData({
      ...formData,
      explanationReasons: [...(formData.explanationReasons || []), { id: newId, text: '' }]
    });
  };

  const updateExplanationReason = (id: number, text: string) => {
    setFormData({
      ...formData,
      explanationReasons: (formData.explanationReasons || []).map(r => r.id === id ? { ...r, text } : r)
    });
  };

  const removeExplanationReason = (id: number) => {
    setFormData({
      ...formData,
      explanationReasons: (formData.explanationReasons || []).filter(r => r.id !== id)
    });
  };

  const addCondition = () => {`;
content = content.replace(addConditionStr, newMethodsStr);

// 3. Add Explanation Information section before the end of the left pane
const endConditionsStr = `                  </div>
                  
                </div>
              </div>
            </div>
          </div>`;

const explanationSectionStr = `                  </div>
                </div>

                {/* Explanation Information Table */}
                <div className="pt-6 mt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold text-gray-700 flex items-center gap-2">
                      <i className="fa-solid fa-list-check text-[#4d9e5f]"></i> Explanation Information
                    </h3>
                    <button 
                      onClick={addExplanationReason}
                      className="text-[#4d9e5f] hover:text-[#3d7d4c] text-xs font-bold flex items-center gap-1 bg-[#4d9e5f]/10 hover:bg-[#4d9e5f]/20 px-2 py-1 rounded transition-colors"
                    >
                      <i className="fa-solid fa-plus"></i> Add Reason
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#f8fafc] text-gray-600 font-bold border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-2 w-12 text-center">No.</th>
                          <th className="px-4 py-2">Pre-defined Violation Reason</th>
                          <th className="px-4 py-2 w-16 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-gray-700">
                        {(formData.explanationReasons || []).length > 0 ? (
                          (formData.explanationReasons || []).map((reason, index) => (
                            <tr key={reason.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-2 text-center text-gray-400 font-medium">{index + 1}</td>
                              <td className="px-4 py-2">
                                <input 
                                  type="text" 
                                  value={reason.text}
                                  onChange={(e) => updateExplanationReason(reason.id, e.target.value)}
                                  placeholder="Enter explanation reason..."
                                  className="w-full border-none bg-transparent px-0 py-1 text-xs outline-none focus:ring-0 text-gray-700 font-medium placeholder-gray-400" 
                                />
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button 
                                  onClick={() => removeExplanationReason(reason.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors w-6 h-6 rounded hover:bg-red-50 flex items-center justify-center mx-auto"
                                  title="Remove reason"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3} className="px-4 py-6 text-center text-gray-400 italic">
                              No explanation reasons defined. Click "Add Reason" to create options for shippers.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 italic">
                    <i className="fa-solid fa-circle-info mr-1"></i> These reasons will be shown as a dropdown when a user explains this type of ticket.
                  </div>
                </div>

              </div>
            </div>
          </div>`;
content = content.replace(endConditionsStr, explanationSectionStr);

fs.writeFileSync('src/TicketContentDetailView.tsx', content);
