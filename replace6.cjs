const fs = require('fs');

const content = fs.readFileSync('App.tsx', 'utf8');

const targetStr = `                        <select
                          value={editingTicketType.typeReference || ''}
                          onChange={e => setEditingTicketType({...editingTicketType, typeReference: e.target.value})}
                          className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-2 text-[12px] text-gray-800 outline-none focus:ring-1 focus:ring-[#4d9e5f] appearance-none bg-white font-medium transition-all h-[34px]"
                        >`;

const replaceStr = `                        <select
                          value={editingTicketType.typeReference || ''}
                          onChange={e => {
                            const newTypeRef = e.target.value;
                            const isPodScan = newTypeRef === 'POD scan compliance';
                            setEditingTicketType({
                              ...editingTicketType, 
                              typeReference: newTypeRef,
                              ...(isPodScan ? {
                                podScanCompletionRate: true,
                                podValidPod: true,
                                podGpsAccuracy: true
                              } : {})
                            });
                          }}
                          className="w-full border border-[#e5e7eb] rounded-[4px] px-3 py-2 text-[12px] text-gray-800 outline-none focus:ring-1 focus:ring-[#4d9e5f] appearance-none bg-white font-medium transition-all h-[34px]"
                        >`;

if (content.includes(targetStr)) {
  const newContent = content.replace(targetStr, replaceStr);
  fs.writeFileSync('App.tsx', newContent);
  console.log('SUCCESS');
} else {
  console.log('TARGET NO MATCH');
}
