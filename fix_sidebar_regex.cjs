const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace('label="Settings"', 'label="Configs"');
content = content.replace(
  "active={currentView === 'store-list' || currentView === 'store-detail' || currentView === 'it-route-list' || currentView === 'it-route-detail' || currentView === 'service-delivery-config'}",
  "active={currentView === 'store-list' || currentView === 'store-detail' || currentView === 'it-route-list' || currentView === 'it-route-detail' || currentView === 'service-delivery-config' || currentView === 'user-store-access-list' || currentView === 'user-store-access-detail'}"
);

const serviceDeliveryItem = `                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'service-delivery-config' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('service-delivery-config')}
                >
                  Service Delivery Time
                </div>`;

const userStoreAccessItem = `                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'user-store-access-list' || currentView === 'user-store-access-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('user-store-access-list')}
                >
                  User Store Access
                </div>`;

if (content.includes(serviceDeliveryItem)) {
    content = content.replace(serviceDeliveryItem, serviceDeliveryItem + '\n' + userStoreAccessItem);
} else {
    console.log("Could not find serviceDeliveryItem to inject User Store Access menu.");
}

const titleTarget = "                 currentView === 'company-detail' ? 'Company Detail' :";
const titleReplace = "                 currentView === 'company-detail' ? 'Company Detail' :\n                 currentView === 'user-store-access-list' ? 'User Store Access' :\n                 currentView === 'user-store-access-detail' ? 'User Store Access Detail' :";
content = content.replace(titleTarget, titleReplace);

fs.writeFileSync('App.tsx', content);
console.log("Updated Configs menu and Titles");
