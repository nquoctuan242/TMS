const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(
  '<label className="text-[13px] font-bold text-gray-800 tracking-wide">If target missed, apply penalty:</label>',
  '<label className="text-[13px] font-bold text-gray-800 tracking-wide">{selectedIncentiveModel === \'deduction\' ? \'If target missed, apply penalty:\' : \'If target achieved, apply bonus:\'}</label>'
);

content = content.replace(
  '<option>Per late/invalid</option>',
  '{selectedIncentiveModel === \'deduction\' ? <option>Per late/invalid ticket</option> : <option>Per successful order</option>}'
);

content = content.replace(
  'Penalty amount is derived from finalized violation tickets (Set in OPS System).',
  '{selectedIncentiveModel === \'deduction\' ? \'Penalty amount is derived from finalized violation tickets (Set in OPS System).\' : \'Bonus amount is derived from successful order completions.\'}'
);

fs.writeFileSync('App.tsx', content);
