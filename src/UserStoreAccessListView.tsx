import React, { useState } from 'react';

interface UserStoreAccessListViewProps {
  users: any[];
  roles: any[];
  onRowClick: (user: any) => void;
}

export function UserStoreAccessListView({ users, roles, onRowClick }: UserStoreAccessListViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded shadow-sm min-h-full flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-[#1b4d3e] font-bold text-sm uppercase tracking-wider">User Store Access</h2>
      </div>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3 w-full">
          <div className="relative flex-1 max-w-md">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Search shippers / users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded text-xs w-full focus:outline-none focus:border-[#4d9e5f] focus:ring-1 focus:ring-[#4d9e5f]"
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="border border-gray-100 rounded overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#e9f2ee] text-[#1b4d3e] font-bold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 border-r">Username</th>
                <th className="px-4 py-3 border-r">Full Name</th>
                <th className="px-4 py-3 border-r">Role</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.map(user => {
                const role = roles.find((r: any) => r.id === user.roleId);
                return (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onRowClick(user)}
                  >
                    <td className="px-4 py-3 border-r">{user.username}</td>
                    <td className="px-4 py-3 border-r font-medium text-gray-900">{user.fullName}</td>
                    <td className="px-4 py-3 border-r">{role?.name || 'Unknown'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400 italic">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
