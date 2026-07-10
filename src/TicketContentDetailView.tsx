import React, { useState } from 'react';

export function TicketContentDetailView({ ticketId, onBack }: { ticketId: string | null, onBack: () => void }) {
  const isCreate = !ticketId;
  const [formData, setFormData] = useState({
    ticketType: ticketId === '1' ? 'Delivery Delayed' : ticketId === '2' ? 'DCR Failure' : ticketId === '3' ? 'FAD Failure' : '',
    priority: 'High',
    subject: ticketId === '1' ? 'Order Delayed' : ticketId === '2' ? 'DCR Failure — Delivery Compliance Violation' : ticketId === '3' ? 'FAD Failure — First-Attempt Delivery' : '',
    reason: ticketId === '1' ? 'Delayed Order' : ticketId === '2' ? 'Scan incomplete / Invalid POD' : ticketId === '3' ? 'Returned local hub' : '',
    explanationReasons: [
        { id: 1, text: 'Shipper was involved in an accident' },
        { id: 2, text: 'Vehicle breakdown' },
        { id: 3, text: 'Weather conditions' }
      ],
      conditions: ticketId === '1' 
      ? [{ id: 1, label: 'Default', descriptionTemplate: 'Order "{order_code}": {delay_minutes}-min delay\nCommitted deadline: {committed_deadline}\n(UTC+7)' }]
      : ticketId === '2' 
      ? [
          { id: 1, label: 'Scan Incomplete', descriptionTemplate: 'Order {order_code}: DCR FAIL on {incident_date} — Scan incomplete\nStatus sequence missing or out of order.' },
          { id: 2, label: 'Invalid POD', descriptionTemplate: 'Order {order_code}: DCR FAIL on {incident_date} — Invalid POD photo\nNo photo captured or upload failed.' },
          { id: 3, label: 'GPS Out of Range', descriptionTemplate: 'Order {order_code}: DCR FAIL on {incident_date} — GPS out of range\nDevice location exceeds {gps_distance} from delivery address.' }
        ]
      : ticketId === '3' 
      ? [{ id: 1, label: 'FAD Failed', descriptionTemplate: 'Order {order_code}: Returned to local hub on {incident_date}' }]
      : [{ id: 1, label: 'Condition 1', descriptionTemplate: '' }]
  });

  const [previewExpanded, setPreviewExpanded] = useState(true);
  const [activePreviewConditionId, setActivePreviewConditionId] = useState<number>(formData.conditions[0]?.id || 1);

  // Helper to get mock description for preview
  const getPreviewDescription = () => {
    const activeCondition = formData.conditions.find(c => c.id === activePreviewConditionId) || formData.conditions[0];
    if (!activeCondition) return '...';
    
    let desc = activeCondition.descriptionTemplate || '';
    desc = desc.replace(/{order_code}/g, 'ORD-2026-0417');
    desc = desc.replace(/{ticket_code}/g, 'TK-2026-102');
    desc = desc.replace(/{delay_minutes}/g, '30');
    desc = desc.replace(/{committed_deadline}/g, '08/07/2026 13:46');
    desc = desc.replace(/{incident_date}/g, '08/07/2026');
    desc = desc.replace(/{gps_distance}/g, '350m');
    desc = desc.replace(/{shipper_name}/g, 'Nguyen Van An');
    return desc;
  };

  const previewDescription = getPreviewDescription();

  const addExplanationReason = () => {
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

  const addCondition = () => {
    const newId = Math.max(...formData.conditions.map(c => c.id), 0) + 1;
    setFormData({
      ...formData,
      conditions: [...formData.conditions, { id: newId, label: '', descriptionTemplate: '' }]
    });
  };

  const updateCondition = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  const removeCondition = (id: number) => {
    if (formData.conditions.length <= 1) return;
    const newConditions = formData.conditions.filter(c => c.id !== id);
    setFormData({ ...formData, conditions: newConditions });
    if (activePreviewConditionId === id) {
      setActivePreviewConditionId(newConditions[0].id);
    }
  };

  const insertVariable = (e: React.MouseEvent, variable: string) => {
    e.preventDefault(); // Prevent losing focus
    
    const activeEl = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
    if (!activeEl || (activeEl.tagName !== 'INPUT' && activeEl.tagName !== 'TEXTAREA')) {
        return;
    }

    const start = activeEl.selectionStart || 0;
    const end = activeEl.selectionEnd || 0;
    const val = activeEl.value;

    const newVal = val.substring(0, start) + variable + val.substring(end);
    
    const fieldName = activeEl.name;
    const dataId = activeEl.getAttribute('data-id');

    if (fieldName === 'subject') {
        setFormData(prev => ({ ...prev, subject: newVal }));
    } else if (fieldName === 'reason') {
        setFormData(prev => ({ ...prev, reason: newVal }));
    } else if (fieldName === 'description') {
        if (dataId) {
             const id = parseInt(dataId, 10);
             setFormData(prev => ({
                ...prev,
                conditions: prev.conditions.map(c => c.id === id ? { ...c, descriptionTemplate: newVal } : c)
             }));
        }
    }
    
    setTimeout(() => {
        activeEl.focus();
        activeEl.setSelectionRange(start + variable.length, start + variable.length);
    }, 0);
  };

  const VariablePills = ({ variables, title }: { variables: string[], title?: string }) => (
    <div className="mt-1.5">
      {title && <span className="text-[10px] text-gray-400 mr-2">{title}</span>}
      <div className="flex flex-wrap gap-1.5 inline-flex">
        {variables.map(v => (
          <button 
            key={v}
            onMouseDown={(e) => insertVariable(e, v)}
            className="text-[10px] font-mono bg-purple-50 hover:bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded transition-colors cursor-pointer border border-purple-100 hover:border-purple-300"
            title="Click to insert"
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded shadow-sm min-h-full flex flex-col overflow-hidden animate-in fade-in duration-300">
      <div className="bg-[#1b4d3e] px-4 py-3 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h2 className="font-bold tracking-wide">
            {isCreate ? 'Create Template Config' : `Template Config: ${formData.ticketType}`}
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-[#4d9e5f] rounded text-xs font-bold hover:bg-[#3d7d4c] shadow-sm transition-colors" onClick={onBack}>
            <i className="fa-solid fa-floppy-disk mr-2"></i> Save Template
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
          
          <div className="flex-1 space-y-6 w-full">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-[#1b4d3e] text-sm mb-4 border-b pb-2 flex items-center gap-2">
                 <i className="fa-solid fa-bolt text-yellow-500"></i> Basic Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Ticket Type</label>
                  {isCreate ? (
                     <input type="text" value={formData.ticketType} onChange={e => setFormData({...formData, ticketType: e.target.value})} placeholder="Enter ticket type" className="w-full border border-gray-300 rounded px-3 py-2 text-xs bg-white outline-none focus:border-[#4d9e5f] font-bold text-gray-700" />
                  ) : (
                     <input type="text" value={formData.ticketType} readOnly className="w-full border border-gray-200 rounded px-3 py-2 text-xs bg-gray-50 outline-none font-bold text-gray-700" />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Default Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] text-red-600 font-bold bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <h3 className="font-bold text-[#1b4d3e] text-sm flex items-center gap-2">
                   <i className="fa-solid fa-file-lines text-blue-500"></i> Content Template
                </h3>
              </div>
              
              <div className="space-y-5">
                 <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Subject Template</label>
                  <input 
                    name="subject"
                    type="text" 
                    value={formData.subject} 
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium" 
                  />
                  <VariablePills variables={['{order_code}', '{ticket_code}', '{shipper_name}']} title="Available variables:" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Reason Default Value</label>
                  <input 
                    name="reason"
                    type="text" 
                    value={formData.reason} 
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#4d9e5f] bg-white font-medium text-gray-600" 
                  />
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-gray-700">Description</label>
                    <button 
                      onClick={addCondition}
                      className="text-[#4d9e5f] hover:text-[#3d7d4c] text-xs font-bold flex items-center gap-1 bg-[#4d9e5f]/10 hover:bg-[#4d9e5f]/20 px-2 py-1 rounded transition-colors"
                    >
                      <i className="fa-solid fa-plus"></i> Add Condition Label
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.conditions.map((cond) => (
                      <div key={cond.id} className="border border-gray-200 rounded bg-gray-50/50 relative overflow-hidden group">
                        {formData.conditions.length > 1 && (
                          <button 
                            onClick={() => removeCondition(cond.id)}
                            className="absolute right-2 top-2 text-gray-400 hover:text-red-500 w-6 h-6 flex items-center justify-center rounded transition-colors z-10"
                            title="Remove condition"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        )}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
                        <div className="p-4 pl-5 space-y-3">
                          <div className="space-y-1 w-full max-w-sm">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Condition Label</label>
                            <input 
                              type="text" 
                              value={cond.label} 
                              onChange={(e) => updateCondition(cond.id, 'label', e.target.value)}
                              placeholder="e.g., GPS Out of Range"
                              className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs outline-none focus:border-blue-400 bg-white font-medium text-gray-700" 
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Condition Description Template</label>
                            <textarea 
                              name="description"
                              data-id={cond.id}
                              rows={3}
                              value={cond.descriptionTemplate} 
                              onChange={(e) => updateCondition(cond.id, 'descriptionTemplate', e.target.value)}
                              placeholder="Enter description template for this condition..."
                              className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-blue-400 font-mono text-gray-700 bg-white" 
                            />
                            <VariablePills variables={['{order_code}', '{delay_minutes}', '{committed_deadline}', '{incident_date}', '{gps_distance}', '{shipper_name}']} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
          </div>
          
          {/* Ticket Preview Section */}
          <div className="w-full lg:w-[400px] shrink-0 sticky top-0">
            <button 
              onClick={() => setPreviewExpanded(!previewExpanded)}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-700 uppercase tracking-wider mb-3 transition-colors"
            >
              <i className={`fa-solid fa-caret-${previewExpanded ? 'down' : 'right'} w-3`}></i> TICKET PREVIEW
            </button>
            
            {previewExpanded && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                {/* Red left border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d32f2f]"></div>
                
                <div className="p-4 pl-5">
                   {formData.conditions.length > 1 && (
                     <div className="mb-4 pb-3 border-b border-gray-100">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Previewing Condition:</label>
                       <select 
                         value={activePreviewConditionId}
                         onChange={(e) => setActivePreviewConditionId(Number(e.target.value))}
                         className="w-full border border-gray-200 rounded px-2 py-1 text-xs outline-none bg-gray-50 text-gray-700 font-medium"
                       >
                         {formData.conditions.map(c => (
                           <option key={c.id} value={c.id}>{c.label || 'Unnamed Condition'}</option>
                         ))}
                       </select>
                     </div>
                   )}
                   
                   <div className="text-[10px] font-bold text-[#d32f2f] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 mt-2">
                     {formData.ticketType || 'TICKET TYPE'} <span className="text-gray-300">•</span> {formData.priority || 'PRIORITY'}
                   </div>
                   
                   <h4 className="text-[15px] font-bold text-gray-900 mb-2">
                     {formData.subject || 'Subject...'}
                   </h4>
                   
                   <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-4 pb-4 border-b border-gray-100">
                     <span>Order <span className="font-bold text-gray-700">ORD-2026-0417</span></span>
                     <span>Shipper <span className="font-bold text-gray-700">Nguyen Van An</span></span>
                   </div>
                   
                   <div className="space-y-3">
                     <div className="text-[12px] text-gray-600">
                        <span className="font-bold text-gray-800">Reason: </span>
                        {formData.reason || '...'}
                     </div>
                     
                     <div className="text-[12px] font-mono text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {previewDescription || '...'}
                     </div>
                   </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
