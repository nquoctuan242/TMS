const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const targetMenuStr = `          <SidebarItem 
            icon="fa-gear" 
            label="Settings" 
            active={currentView === 'store-list' || currentView === 'store-detail' || currentView === 'it-route-list' || currentView === 'it-route-detail' || currentView === 'service-delivery-config'} 
            hasSubItems 
            onClick={() => {}}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'store-list' || currentView === 'store-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('store-list')}
                >
                  Stores
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'it-route-list' || currentView === 'it-route-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('it-route-list')}
                >
                  IT Route
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'service-delivery-config' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('service-delivery-config')}
                >
                  Service Delivery Time
                </div>
             </div>
          </SidebarItem>`;

const replaceMenuStr = `          <SidebarItem 
            icon="fa-gear" 
            label="Configs" 
            active={currentView === 'store-list' || currentView === 'store-detail' || currentView === 'it-route-list' || currentView === 'it-route-detail' || currentView === 'service-delivery-config' || currentView === 'user-store-access-list' || currentView === 'user-store-access-detail'} 
            hasSubItems 
            onClick={() => {}}
          >
             <div className="ml-8 mt-2 space-y-2">
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'store-list' || currentView === 'store-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('store-list')}
                >
                  Stores
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'it-route-list' || currentView === 'it-route-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('it-route-list')}
                >
                  IT Route
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'service-delivery-config' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('service-delivery-config')}
                >
                  Service Delivery Time
                </div>
                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'user-store-access-list' || currentView === 'user-store-access-detail' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('user-store-access-list')}
                >
                  User Store Access
                </div>
             </div>
          </SidebarItem>`;

if (content.includes(targetMenuStr)) {
    content = content.replace(targetMenuStr, replaceMenuStr);
    
    // Also update breadcrumb title
    const titleTarget = "                 currentView === 'company-detail' ? 'Company Detail' :";
    const titleReplace = "                 currentView === 'company-detail' ? 'Company Detail' :\n                 currentView === 'user-store-access-list' ? 'User Store Access' :\n                 currentView === 'user-store-access-detail' ? 'User Store Access Detail' :";
    content = content.replace(titleTarget, titleReplace);
    
    fs.writeFileSync('App.tsx', content);
    console.log("Updated Sidebar and Titles");
} else {
    console.log("Target string not found!");
}
