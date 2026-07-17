const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const targetStr = `          ) : currentView === 'service-delivery-config' ? (`;

const replaceStr = `          ) : currentView === 'user-store-access-list' ? (
             <UserStoreAccessListView
               users={users}
               roles={MOCK_ROLES}
               onRowClick={(user) => {
                 setEditingUser(user);
                 setCurrentView('user-store-access-detail');
               }}
             />
          ) : currentView === 'user-store-access-detail' ? (
             <UserStoreAccessDetailView
               user={editingUser}
               stores={stores}
               onBack={() => setCurrentView('user-store-access-list')}
               onSave={(updatedUser) => {
                 setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
                 setCurrentView('user-store-access-list');
               }}
             />
          ) : currentView === 'service-delivery-config' ? (`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync('App.tsx', content);
    console.log("Updated App render!");
} else {
    console.log("Target render string not found!");
}
