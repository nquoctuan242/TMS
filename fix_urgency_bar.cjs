const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

const oldBars = `  const getUrgencyBar = (status: string) => {
    switch (status) {
      case 'Expired':
        return <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-[#d32f2f] w-full rounded-full"></div></div>;
      case 'Expiring soon':
        return <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-[#f57c00] w-1/2 rounded-full"></div></div>;
      case 'Valid':
        return <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-[#388e3c] w-3/4 rounded-full"></div></div>;
      default:
        return null;
    }
  };`;

const newBars = `  const getUrgencyBar = (status: string) => {
    switch (status) {
      case 'Expired':
        return <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden flex"><div className="h-full bg-[#d32f2f] w-full rounded-full"></div></div>;
      case 'Expiring soon':
        return <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden flex"><div className="h-full bg-[#d97706] w-1/2 rounded-full"></div></div>;
      case 'Valid':
        return <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden flex"><div className="h-full bg-[#16a34a] w-1/4 rounded-full"></div></div>;
      default:
        return null;
    }
  };`;

content = content.replace(oldBars, newBars);

// Fix renew button
content = content.replace(
  '<button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-[12px] font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">',
  '<button className="px-3 py-1 bg-white border border-gray-200 rounded text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">'
);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
