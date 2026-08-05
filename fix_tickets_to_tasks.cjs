const fs = require('fs');
let content = fs.readFileSync('src/VehicleMaintenanceView.tsx', 'utf-8');
content = content.replace('Total Tickets', 'Total Tasks');
content = content.replace('Search by ticket no, license plate...', 'Search by task no, license plate...');
content = content.replace('Maintenance Tickets', 'Maintenance Tasks');
content = content.replace('Ticket No', 'Task No');
content = content.replace('No maintenance tickets found.', 'No maintenance tasks found.');
fs.writeFileSync('src/VehicleMaintenanceView.tsx', content);
