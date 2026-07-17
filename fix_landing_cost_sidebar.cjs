const fs = require('fs');

let appContent = fs.readFileSync('App.tsx', 'utf8');

const sidebarLandingCost = `          <SidebarItem 
            icon="fa-money-bill-transfer" 
            label="Landing Cost" 
            active={currentView === 'landing-cost-list' || currentView === 'landing-cost-detail'} 
            onClick={() => setCurrentView('landing-cost-list')}
          />
`;

const sidebarConfigs = `          <SidebarItem 
            icon="fa-gear" 
            label="Configs" `;

if (!appContent.includes('label="Landing Cost"')) {
    appContent = appContent.replace(sidebarConfigs, sidebarLandingCost + sidebarConfigs);
    fs.writeFileSync('App.tsx', appContent);
    console.log("Updated App.tsx sidebar!");
} else {
    console.log("Sidebar already has Landing Cost");
}
