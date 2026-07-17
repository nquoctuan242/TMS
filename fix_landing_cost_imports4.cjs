const fs = require('fs');
let appContent = fs.readFileSync('App.tsx', 'utf8');

if (!appContent.includes('MOCK_LANDING_COST_CONFIGS } from')) {
    appContent = appContent.replace(
        "import { MOCK_SHIPMENT,",
        "import { MOCK_SHIPMENT, MOCK_LANDING_COST_CONFIGS,"
    );
    fs.writeFileSync('App.tsx', appContent);
    console.log("Fixed import");
} else {
    console.log("Already imported");
}
