const fs = require('fs');
let content = fs.readFileSync('src/VehicleListView.tsx', 'utf-8');

// 1. Add searchQuery state
content = content.replace(
  'const [vehicles] = useState<Vehicle[]>([',
  `const [searchQuery, setSearchQuery] = useState('');\n  const [vehicles] = useState<Vehicle[]>([`
);

// 2. Add vehiclePurpose to mock data
content = content.replace(
  "storeDefault: 'Store 123',",
  "storeDefault: 'Store 123',\n      vehiclePurpose: 'Delivery',"
);

// 3. Add search input UI before the table
const searchUI = `      <div className="px-4 pt-3 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search by license plate, make/model, purpose..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-[#4d9e5f]"
          />
        </div>
      </div>`;

content = content.replace(
  '<div className="p-4 overflow-x-auto flex-1">',
  searchUI + '\n      <div className="p-4 overflow-x-auto flex-1">'
);

// 4. Update the mapping to use filteredVehicles
content = content.replace(
  'const [vehicles] = useState<Vehicle[]>([',
  `// filter logic
  const filteredVehicles = vehicles.filter(v => 
    v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.makeModel.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (v.vehiclePurpose && v.vehiclePurpose.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const [vehicles] = useState<Vehicle[]>([`
);

// Because I can't put reference before declaration, let me fix it properly
content = content.replace(
  '// filter logic\n  const filteredVehicles = vehicles.filter',
  '  const [vehicles] = useState<Vehicle[]>([ // dummy replace'
);
// I will rewrite this part using regex or a better way.
