const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf8');

const oldMockDataEnd = `    drivers: isCreate ? [] : [
      { id: '1', name: 'Trần Văn Bình', role: 'Main driver' },
      { id: '2', name: 'Lê Hoàng Nam', role: 'Relief driver' }
    ]
  });`;

const newMockDataEnd = `    drivers: isCreate ? [] : [
      { id: '1', name: 'Trần Văn Bình', role: 'Main driver' },
      { id: '2', name: 'Lê Hoàng Nam', role: 'Relief driver' }
    ],
    maintenanceRecords: isCreate ? [] : [
      { id: '1', date: '20/06/2026', type: 'periodic', content: 'Thay dầu máy, lọc gió', mileage: 142500, cost: 2500000 },
      { id: '2', date: '15/03/2026', type: 'periodic', content: 'Bảo dưỡng cấp 2', mileage: 128000, cost: 4100000 },
      { id: '3', date: '02/02/2026', type: 'repair', content: 'Thay má phanh trước', mileage: 121300, cost: 1800000 }
    ],
    costs: isCreate ? { fuelCost: 0, maintenanceCost: 0, fines: 0, costPerKm: 0, month: 7 } : {
      fuelCost: 8400000, maintenanceCost: 2500000, fines: 0, costPerKm: 6480, month: 7
    }
  });`;

content = content.replace(oldMockDataEnd, newMockDataEnd);

// Add modals state
content = content.replace(
  /const \[editingDoc, setEditingDoc\] = useState<any>\(null\);/,
  "const [editingDoc, setEditingDoc] = useState<any>(null);\n  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);\n  const [showCostsModal, setShowCostsModal] = useState(false);\n  const [editingMaintenance, setEditingMaintenance] = useState<any>(null);"
);

fs.writeFileSync('src/VehicleDetailView.tsx', content);
