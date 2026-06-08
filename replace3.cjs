const fs = require('fs');

const content = fs.readFileSync('App.tsx', 'utf8');

// 1. Add state variables if not exists
let newContent = content;
if (!newContent.includes('selectedIncentiveModel')) {
  const stateInjectionStr = `  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>(MOCK_PAYROLL_PERIODS);
  const [selectedIncentiveModel, setSelectedIncentiveModel] = useState<'deduction' | 'performance_bonus'>('deduction');
  const [kpiRules, setKpiRules] = useState([{ id: 1, name: 'KPI 1' }]);`;
  newContent = newContent.replace("  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>(MOCK_PAYROLL_PERIODS);", stateInjectionStr);
}

const targetFormHtml = `                 <div>
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
                     <div className="p-5 space-y-6">`;

const replaceFormHtml = `                 <div>
                   <h3 className="text-gray-800 font-bold text-sm mb-3">Incentive Model</h3>
                   <div className="flex flex-col sm:flex-row gap-4 text-left">
                     <div 
                        onClick={() => setSelectedIncentiveModel('deduction')}
                        className={\`flex-1 border-2 \${selectedIncentiveModel === 'deduction' ? 'border-red-400 bg-red-50/50' : 'border-transparent bg-white hover:border-gray-200'} rounded-xl p-4 cursor-pointer relative shadow-sm transition-all hover:shadow-md\`}
                     >
                       <div className="flex items-start gap-3">
                         <div className="mt-0.5"><i className={\`\${selectedIncentiveModel === 'deduction' ? 'fa-solid fa-circle-dot text-red-500' : 'fa-regular fa-circle text-gray-300'}\`}></i></div>
                         <div>
                           <div className="font-bold text-gray-900 text-sm">Deduction (Penalty)</div>
                           <div className="text-gray-500 text-[13px] mt-1 leading-relaxed">Deduct commission if shipper misses KPI target.</div>
                         </div>
                       </div>
                     </div>
                     <div 
                        onClick={() => setSelectedIncentiveModel('performance_bonus')}
                        className={\`flex-1 border-2 \${selectedIncentiveModel === 'performance_bonus' ? 'border-blue-400 bg-blue-50/50' : 'border-transparent bg-white hover:border-gray-200'} rounded-xl p-4 cursor-pointer relative shadow-sm transition-all hover:shadow-md\`}
                     >
                       <div className="flex items-start gap-3">
                         <div className="mt-0.5"><i className={\`\${selectedIncentiveModel === 'performance_bonus' ? 'fa-solid fa-circle-dot text-blue-500' : 'fa-regular fa-circle text-gray-300'}\`}></i></div>
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
                   <div className="flex items-center justify-end mb-4">
                     <button onClick={() => setKpiRules([...kpiRules, { id: Date.now(), name: \`KPI \${kpiRules.length + 1}\` }])} className="border border-gray-300 bg-white text-gray-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2 transition-colors">
                       <i className="fa-solid fa-plus"></i> Add KPI
                     </button>
                   </div>
                   
                   <div className="space-y-6">
                   {kpiRules.map((rule, index) => (
                   <div key={rule.id} className={\`border \${selectedIncentiveModel === 'deduction' ? 'border-red-200' : 'border-blue-200'} bg-white rounded-xl shadow-sm overflow-hidden\`}>
                     <div className={\`\${selectedIncentiveModel === 'deduction' ? 'bg-red-50/70 border-red-100' : 'bg-blue-50/70 border-blue-100'} px-4 py-3 flex items-center justify-between border-b\`}>
                       <div className="flex items-center gap-3 flex-1 max-w-sm">
                         <input 
                           type="text" 
                           value={rule.name}
                           onChange={(e) => {
                             const newRules = [...kpiRules];
                             newRules[index].name = e.target.value;
                             setKpiRules(newRules);
                           }}
                           className="font-bold text-gray-900 text-sm bg-white border border-gray-300 rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                           placeholder="Enter KPI name"
                         />
                         <span className={\`\${selectedIncentiveModel === 'deduction' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider whitespace-nowrap\`}>
                           {selectedIncentiveModel === 'deduction' ? 'Deduction (Penalty)' : 'Performance Bonus'}
                         </span>
                       </div>
                       <button onClick={() => setKpiRules(kpiRules.filter(r => r.id !== rule.id))} className={\`text-gray-400 hover:\${selectedIncentiveModel === 'deduction' ? 'text-red-600' : 'text-blue-600'} transition-colors\`}><i className="fa-regular fa-trash-can"></i></button>
                     </div>
                     <div className="p-5 space-y-6">`;

const targetFormHtmlEnd = `                     </div>
                   </div>
                 </div>

               </div>`;

const replaceFormHtmlEnd = `                     </div>
                   </div>
                   ))}
                   {kpiRules.length === 0 && (
                     <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                       <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                         <i className="fa-solid fa-chart-line text-gray-400 text-xl"></i>
                       </div>
                       <h3 className="text-sm font-bold text-gray-900 mb-1">No KPIs defined</h3>
                       <p className="text-xs text-gray-500 max-w-[250px] mx-auto mb-4">Create KPI rules to evaluate shipper performance and calculate incentives.</p>
                       <button onClick={() => setKpiRules([{ id: Date.now(), name: 'KPI 1' }])} className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 shadow-sm transition-colors mx-auto flex items-center gap-2">
                         <i className="fa-solid fa-plus"></i> Add First KPI
                       </button>
                     </div>
                   )}
                   </div>
                 </div>

               </div>`;

if (newContent.includes(targetFormHtml)) {
  newContent = newContent.replace(targetFormHtml, replaceFormHtml);
  newContent = newContent.replace(targetFormHtmlEnd, replaceFormHtmlEnd);
  fs.writeFileSync('App.tsx', newContent);
  console.log('SUCCESS');
} else {
  console.log('TARGET NO MATCH');
}
