const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

const oldBars = `  const getUrgencyBar = (status: string) => {
    switch (status) {
      case 'Expired':
        return <div className="w-16 h-1.5 bg-red-100 rounded-full overflow-hidden"><div className="h-full bg-red-600 w-full"></div></div>;
      case 'Expiring soon':
        return <div className="w-16 h-1.5 bg-yellow-100 rounded-full overflow-hidden"><div className="h-full bg-yellow-600 w-2/3"></div></div>;
      case 'Valid':
        return <div className="w-16 h-1.5 bg-green-100 rounded-full overflow-hidden"><div className="h-full bg-green-600 w-1/3"></div></div>;
      default:
        return null;
    }
  };`;

const newBars = `  const getUrgencyBar = (status: string) => {
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

content = content.replace(oldBars, newBars);

// Badges
const oldBadges = `  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Expired':
        return <span className="px-3 py-1 rounded-full text-[12px] bg-red-50 text-red-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Expired</span>;
      case 'Expiring soon':
        return <span className="px-3 py-1 rounded-full text-[12px] bg-yellow-50 text-yellow-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Expiring soon</span>;
      case 'Valid':
        return <span className="px-3 py-1 rounded-full text-[12px] bg-green-50 text-green-700 flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Valid</span>;
      default:
        return null;
    }
  };`;

const newBadges = `  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Expired':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] bg-red-50 text-red-600 flex items-center gap-1.5 w-fit font-medium"><span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Expired</span>;
      case 'Expiring soon':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] bg-yellow-50 text-yellow-700 flex items-center gap-1.5 w-fit font-medium"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Expiring soon</span>;
      case 'Valid':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] bg-green-50 text-green-600 flex items-center gap-1.5 w-fit font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Valid</span>;
      default:
        return null;
    }
  };`;

content = content.replace(oldBadges, newBadges);


fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
