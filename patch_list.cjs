const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLAListView.tsx', 'utf8');

content = content.replace(
  `export function DeliverySLAListView({ onEdit }: DeliverySLAListViewProps) {`,
  `export function DeliverySLAListView({ onEdit, onCreate }: DeliverySLAListViewProps) {`
);

content = content.replace(
  `<div className="flex items-center justify-between border-b px-4 py-3">\n        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Delivery SLA Management</h2>\n      </div>`,
  `<div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">Delivery SLA Management</h2>
        <button 
          onClick={onCreate}
          className="bg-[#4d9e5f] text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-[#3d7d4c] transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Add Configuration
        </button>
      </div>`
);

fs.writeFileSync('src/DeliverySLAListView.tsx', content);
