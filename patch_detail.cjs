const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf8');

const effectBlock = `  useEffect(() => {
    if (configId) {
      const config = MOCK_DELIVERY_SLA_CONFIGS.find(c => c.id === configId);
      if (config) setFormData(config);
    }
  }, [configId]);`;

const newEffectBlock = `  useEffect(() => {
    if (configId) {
      const config = MOCK_DELIVERY_SLA_CONFIGS.find(c => c.id === configId);
      if (config) setFormData(config);
    } else {
      setFormData({
        id: '',
        serviceCode: 'NEXTDAY',
        serviceName: 'Next-day delivery',
        cutoffTime: '15:00',
        beforeCutoffDeliverTime: '23:59',
        beforeCutoffDaysAdd: 1,
        afterCutoffDeliverTime: '18:00',
        afterCutoffDaysAdd: 2,
        lateAlertMinutes: 30,
        storeOverrides: []
      });
    }
  }, [configId]);`;

content = content.replace(effectBlock, newEffectBlock);

const headerBlock = `          <div className="flex items-center gap-3">
             <span className="bg-[#111827] text-white text-xs px-2.5 py-1 font-bold rounded">
               {formData.serviceCode}
             </span>
             <h2 className="text-lg font-bold text-[#111827]">{formData.serviceName}</h2>
          </div>`;

const newHeaderBlock = `          {!configId ? (
             <div className="flex items-center gap-3">
               <select 
                 value={formData.serviceCode}
                 onChange={(e) => {
                   const code = e.target.value;
                   let name = code;
                   if (code === 'NEXTDAY') name = 'Next-day delivery';
                   if (code === 'ECONOMY') name = 'Economy delivery';
                   if (code === 'INTERNATIONAL') name = 'International delivery';
                   setFormData({...formData, serviceCode: code, serviceName: name});
                 }}
                 className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-blue-500 font-bold bg-[#111827] text-white uppercase"
               >
                 <option value="NEXTDAY">NEXTDAY</option>
                 <option value="ECONOMY">ECONOMY</option>
                 <option value="INTERNATIONAL">INTERNATIONAL</option>
               </select>
               <input 
                 type="text" 
                 value={formData.serviceName}
                 onChange={(e) => setFormData({...formData, serviceName: e.target.value})}
                 className="border border-gray-300 rounded px-2 py-1.5 text-sm outline-none focus:border-blue-500 font-bold text-gray-800"
               />
             </div>
          ) : (
             <div className="flex items-center gap-3">
               <span className="bg-[#111827] text-white text-xs px-2.5 py-1 font-bold rounded">
                 {formData.serviceCode}
               </span>
               <h2 className="text-lg font-bold text-[#111827]">{formData.serviceName}</h2>
             </div>
          )}`;

content = content.replace(headerBlock, newHeaderBlock);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
