const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const targetMenuStr = `                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'service-delivery-config' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('service-delivery-config')}
                >
                  Service Delivery
                </div>
             </div>
          </SidebarItem>`;

const replaceMenuStr = `                <div 
                  className={\`text-xs font-medium px-3 py-2 rounded-l-full cursor-pointer \${currentView === 'service-delivery-config' ? 'text-white/90 bg-white/10' : 'text-white/60 hover:text-white'}\`}
                  onClick={() => setCurrentView('service-delivery-config')}
                >
                  Service Delivery
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
    fs.writeFileSync('App.tsx', content);
    console.log("Updated Sidebar and Titles");
} else {
    console.log("Target string not found!");
}
