const fs = require('fs');

const content = fs.readFileSync('App.tsx', 'utf8');

const targetStr = ") : currentView === 'ticket-list' ? (";

if (content.includes(targetStr)) {
  const replacement = `) : currentView === 'payroll-period-list' ? (
             <div className="bg-[#f2f6f4] min-h-full flex flex-col p-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[#1b4d3e] font-bold text-lg">Payroll Period</h2>
                    <p className="text-gray-500 text-xs mt-1">Manage commission payroll periods</p>
                  </div>
                  <button onClick={() => setCurrentView('payroll-period-detail')} className="bg-[#1b4d3e] text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-[#153a2f] shadow-sm flex items-center gap-2 transition-colors">
                    <i className="fa-solid fa-plus"></i> Create Period
                  </button>
                </div>
                
                <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <div className="relative w-1/3 min-w-[250px]">
                      <input type="text" placeholder="Search periods..." className="w-full border border-gray-200 rounded-md pl-9 pr-3 py-2 text-xs outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f] bg-white transition-all" />
                      <i className="fa-solid fa-magnifying-glass absolute left-3 top-[10px] text-gray-400"></i>
                    </div>
                  </div>
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f8fafc] text-gray-700 font-bold border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-3 w-[25%] hover:bg-gray-100 transition-colors">Version Name</th>
                        <th className="px-6 py-3 w-[20%] hover:bg-gray-100 transition-colors">Cycle</th>
                        <th className="px-6 py-3 w-[25%] hover:bg-gray-100 transition-colors">Effective Time</th>
                        <th className="px-6 py-3 w-[20%] hover:bg-gray-100 transition-colors">Applied Location</th>
                        <th className="px-6 py-3 w-[10%] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                      {payrollPeriods.map((period) => (
                        <tr key={period.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-800">{period.versionName}</td>
                          <td className="px-6 py-4 font-medium">{period.cycle}</td>
                          <td className="px-6 py-4 font-medium">{period.effectiveTime}</td>
                          <td className="px-6 py-4 whitespace-pre-wrap leading-relaxed">{period.appliedLocation}</td>
                          <td className="px-6 py-4 text-right space-x-3 text-gray-400">
                            <button onClick={() => setCurrentView('payroll-period-detail')} className="hover:text-blue-500 transition-colors"><i className="fa-regular fa-pen-to-square"></i></button>
                            <button className="hover:text-red-500 transition-colors"><i className="fa-regular fa-trash-can"></i></button>
                          </td>
                        </tr>
                      ))}
                      {payrollPeriods.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No payroll periods found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
             </div>
           ) : currentView === 'payroll-period-detail' ? (
             <div className="bg-[#f8fafc] min-h-full flex flex-col items-center py-6 px-4 pb-24 animate-in fade-in duration-300 relative">
               <div className="w-full flex justify-start max-w-[900px] mb-4">
                 <button onClick={() => setCurrentView('payroll-period-list')} className="text-gray-500 hover:text-gray-900 transition-colors text-sm font-bold flex items-center gap-2">
                   <i className="fa-solid fa-arrow-left"></i> Back to Periods
                 </button>
               </div>
               <div className="w-full max-w-[900px] space-y-6">
                 
                 <div>
                   <h3 className="text-gray-800 font-bold text-sm mb-3">Incentive Model</h3>
                   <div className="flex flex-col sm:flex-row gap-4 text-left">
                     <div className="flex-1 border-2 border-red-400 bg-red-50/50 rounded-xl p-4 cursor-pointer relative shadow-sm transition-all hover:shadow-md">
                       <div className="flex items-start gap-3">
                         <div className="mt-0.5"><i className="fa-solid fa-circle-dot text-red-500"></i></div>
                         <div>
                           <div className="font-bold text-gray-900 text-sm">Deduction (Penalty)</div>
                           <div className="text-gray-500 text-[13px] mt-1 leading-relaxed">Deduct commission if shipper misses KPI target.</div>
                         </div>
                       </div>
                     </div>
                     <div className="flex-1 border-2 border-transparent bg-white rounded-xl p-4 cursor-pointer hover:border-gray-200 transition-all shadow-sm">
                       <div className="flex items-start gap-3">
                         <div className="mt-0.5"><i className="fa-regular fa-circle text-gray-300"></i></div>
                         <div>
                           <div className="font-bold text-gray-900 text-sm">Performance Bonus</div>
                           <div className="text-gray-500 text-[13px] mt-1 leading-relaxed">Award bonus when shipper achieves or exceeds KPI target.</div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2 transition-colors">
                   <i className="fa-regular fa-eye"></i> Review KPI Summary
                 </button>

                 <div>
                   <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                       <h3 className="text-gray-900 font-bold text-lg">On-time Delivery Rate (SLA)</h3>
                       <button className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                         <i className="fa-regular fa-circle-info text-xs"></i>
                       </button>
                     </div>
                     <button className="border border-gray-300 bg-white text-gray-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2 transition-colors">
                       <i className="fa-solid fa-plus"></i> Add SLA Rule
                     </button>
                   </div>
                   
                   <div className="border border-red-200 bg-white rounded-xl shadow-sm overflow-hidden">
                     <div className="bg-red-50/70 px-4 py-3 flex items-center justify-between border-b border-red-100">
                       <div className="flex items-center gap-3">
                         <span className="font-bold text-gray-900 text-sm">SLA Rule 1</span>
                         <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Deduction (Penalty)</span>
                       </div>
                       <button className="text-gray-400 hover:text-red-600 transition-colors"><i className="fa-regular fa-trash-can"></i></button>
                     </div>
                     <div className="p-5 space-y-6">
                       <div>
                         <label className="text-sm text-gray-800 font-bold mb-3 block tracking-wide">Applied Order Types (Select at least 1) <span className="text-red-500">*</span></label>
                         <div className="flex items-center gap-6 text-sm text-gray-600">
                           <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors select-none"><input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4" /> <span className="font-medium">Online Orders</span></label>
                           <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors select-none"><input type="checkbox" defaultChecked className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4" /> <span className="font-medium">Internal Transfer Orders</span></label>
                         </div>
                       </div>

                       <div>
                         <label className="text-sm text-gray-800 font-bold mb-4 block tracking-wide">Service Level</label>
                         <div className="space-y-5 pl-2">
                           <div>
                             <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2.5">ONLINE SERVICES</div>
                             <div className="flex flex-wrap gap-2.5">
                               {['2 Hours', 'Sameday', 'Nextday', 'Express', 'Standard'].map(svc => (
                                 <label key={svc} className="flex items-center gap-2 border border-[#1b4d3e] text-[#1b4d3e] bg-green-50/30 px-3.5 py-1.5 rounded-md text-[13px] cursor-pointer font-bold hover:bg-green-50 transition-colors shadow-sm select-none">
                                   <input type="checkbox" defaultChecked className="rounded text-[#1b4d3e] focus:ring-[#1b4d3e] border-[#1b4d3e] bg-white h-3.5 w-3.5" />
                                   {svc}
                                 </label>
                               ))}
                             </div>
                           </div>
                           <div>
                             <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-2.5">IT SERVICES</div>
                             <div className="flex flex-wrap gap-2.5">
                               {['Sameday', '48 Hours'].map(svc => (
                                 <label key={svc} className="flex items-center gap-2 border border-[#1b4d3e] text-[#1b4d3e] bg-green-50/30 px-3.5 py-1.5 rounded-md text-[13px] cursor-pointer font-bold hover:bg-green-50 transition-colors shadow-sm select-none">
                                   <input type="checkbox" defaultChecked className="rounded text-[#1b4d3e] focus:ring-[#1b4d3e] border-[#1b4d3e] bg-white h-3.5 w-3.5" />
                                   {svc}
                                 </label>
                               ))}
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 mt-2 border-t border-gray-100">
                         <div className="space-y-2">
                           <label className="text-[13px] font-bold text-gray-800 tracking-wide">Rule Incentive Model</label>
                           <div className="relative">
                             <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white font-medium shadow-sm transition-all">
                               <option>Use main model (Deduction)</option>
                               <option>Performance Bonus</option>
                             </select>
                             <i className="fa-solid fa-chevron-down absolute right-3 top-[10px] text-xs text-gray-500 pointer-events-none"></i>
                           </div>
                           <p className="text-[11px] text-gray-500 leading-snug">Override the main period setting for this specific rule.</p>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[13px] font-bold text-gray-800 tracking-wide">Target Threshold</label>
                           <div className="relative border border-gray-300 rounded-lg overflow-hidden flex shadow-sm bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                             <div className="bg-gray-50 border-r border-gray-200 px-3 py-2 text-gray-500 flex items-center justify-center font-bold">&ge;</div>
                             <input type="text" defaultValue="97" className="w-full px-3 py-2 text-sm outline-none font-bold text-gray-800" />
                             <div className="px-3 py-2 text-gray-500 flex items-center justify-center text-sm bg-gray-50 border-l border-gray-200 font-bold">%</div>
                           </div>
                           <p className="text-[11px] text-gray-500 leading-snug">Minimum KPI the shipper must achieve.</p>
                         </div>
                         <div className="space-y-2">
                           <label className="text-[13px] font-bold text-gray-800 tracking-wide">If target missed, apply penalty:</label>
                           <div className="flex flex-col xl:flex-row gap-2 items-start">
                             <div className="relative w-full xl:w-auto xl:flex-1">
                               <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white font-medium shadow-sm transition-all">
                                 <option>Per late/invalid</option>
                               </select>
                               <i className="fa-solid fa-chevron-down absolute right-3 top-[10px] text-xs text-gray-500 pointer-events-none"></i>
                             </div>
                             <div className="bg-gray-50 border border-gray-200 rounded p-2 text-[10px] text-gray-600 leading-snug w-full xl:w-[150px] shadow-sm">
                               Penalty amount is derived from finalized violation tickets (Set in OPS System).
                             </div>
                           </div>
                         </div>
                       </div>

                     </div>
                   </div>
                 </div>

               </div>
               
               <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-gray-200 p-4 px-6 flex justify-between items-center z-20 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                 <button onClick={() => setCurrentView('payroll-period-list')} className="px-6 py-2 border border-gray-300 font-bold rounded-lg text-[13px] text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">Cancel</button>
                 <button onClick={() => setCurrentView('payroll-period-list')} className="bg-[#1b4d3e] text-white px-8 py-2 rounded-lg text-[13px] font-bold hover:bg-[#153a2f] shadow-md transition-all flex items-center gap-2">
                   <i className="fa-solid fa-floppy-disk"></i> Save Period
                 </button>
               </div>
             </div>
           ) : currentView === 'ticket-list' ? (`;

  const newContent = content.replace(targetStr, replacement);
  fs.writeFileSync('App.tsx', newContent);
  console.log('SUCCESS');
} else {
  console.log('TARGET NO MATCH');
}
