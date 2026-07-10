const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const targetStr = `<div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Country</label>`;

const replacementStr = `<div className="flex items-center justify-between pt-2">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight">Auto Create Ticket</label>
                      <button 
                        onClick={() => setEditingTicketType({...editingTicketType, autoCreateTicket: !editingTicketType.autoCreateTicket})}
                        className={\`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none \${editingTicketType.autoCreateTicket ? 'bg-[#4d9e5f]' : 'bg-gray-300'}\`}
                      >
                        <span className={\`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out \${editingTicketType.autoCreateTicket ? 'translate-x-4' : 'translate-x-0'}\`} />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 tracking-tight block">Country</label>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync('App.tsx', content);
    console.log("Added Auto Create Ticket toggle");
} else {
    console.log("Could not find the target string for Auto Create Ticket.");
}
