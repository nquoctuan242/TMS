import React, { useState } from 'react';

export function CostAndFuelView() {
  const [activeTab, setActiveTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);

  const [expenses, setExpenses] = useState([
    { id: '1', date: '31/07/2026', vehicle: '51C-812.44', driver: 'Nguyen Van A', type: 'Fuel', amount: 850000, description: 'Đổ xăng A95' },
    { id: '4', date: '30/07/2026', vehicle: '29H-551.02', driver: 'Pham Van D', type: 'Fuel', amount: 1200000, description: 'Đổ dầu DO 0.05S' },
  ]);

  const getExpenseBadge = (type: string) => {
    switch (type) {
      case 'Fuel':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-red-50 text-red-700 border border-red-200"><i className="fa-solid fa-gas-pump mr-1"></i> Fuel</span>;
      case 'Maintenance':
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-purple-50 text-purple-700 border border-purple-200"><i className="fa-solid fa-wrench mr-1"></i> Maintenance</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-gray-50 text-gray-700 border border-gray-200"><i className="fa-solid fa-receipt mr-1"></i> Other</span>;
    }
  };

  const filteredExpenses = activeTab === 'All' ? expenses : expenses.filter(e => e.type === activeTab);

  const totalCost = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const fuelCost = expenses.filter(e => e.type === 'Fuel').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-gray-50/50 min-h-full p-6 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-blue-500">
            <div className="text-2xl font-bold text-gray-900">{totalCost.toLocaleString()} ₫</div>
            <div className="text-[13px] text-gray-500 mt-1">Total Expenses</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-4 border-l-red-500">
            <div className="text-2xl font-bold text-gray-900">{fuelCost.toLocaleString()} ₫</div>
            <div className="text-[13px] text-gray-500 mt-1">Total Fuel Cost</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-xl">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search by vehicle, driver, description..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2563eb]"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg border border-gray-200 p-0.5 shadow-sm overflow-x-auto max-w-[400px] sm:max-w-none">
              {['All', 'Fuel', 'Maintenance', 'Other'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-[13px] font-medium transition-colors border-r last:border-r-0 border-gray-200 whitespace-nowrap ${activeTab === tab ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-600 hover:text-gray-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button 
              onClick={() => { setEditingExpense(null); setShowModal(true); }}
              className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <i className="fa-solid fa-plus"></i> Add Expense
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
            <h2 className="font-bold text-gray-900">Cost & Fuel Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Vehicle</th>
                  <th className="px-6 py-4 font-bold">Driver</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Description</th>
                  <th className="px-6 py-4 font-bold text-right">Amount (VND)</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredExpenses.map((expense, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 group">
                    <td className="px-6 py-4 text-gray-600">{expense.date}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{expense.vehicle}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{expense.driver}</td>
                    <td className="px-6 py-4">{getExpenseBadge(expense.type)}</td>
                    <td className="px-6 py-4 text-gray-600">{expense.description}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-right">{expense.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => { setEditingExpense(expense); setShowModal(true); }}
                        className="px-3 py-1 bg-white border border-gray-200 rounded text-[12px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No expenses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Date</label>
                    <input type="date" defaultValue={editingExpense?.date ? editingExpense.date.split('/').reverse().join('-') : new Date().toISOString().split('T')[0]} id="expDateInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Expense Type</label>
                    <select defaultValue={editingExpense?.type || 'Fuel'} id="expTypeInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]">
                      <option value="Fuel">Fuel</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Vehicle</label>
                    <input type="text" defaultValue={editingExpense?.vehicle || ''} id="expVehicleInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="e.g. 51C-812.44" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Driver</label>
                    <input type="text" defaultValue={editingExpense?.driver || ''} id="expDriverInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="Driver name" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Amount (VND)</label>
                  <input type="number" defaultValue={editingExpense?.amount || ''} id="expAmountInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="e.g. 100000" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Description</label>
                  <textarea defaultValue={editingExpense?.description || ''} id="expDescInput" rows={2} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" placeholder="Expense details..."></textarea>
                </div>
              </div>
              <div className="border-t p-4 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100">Cancel</button>
                <button onClick={() => {
                   const dateInput = document.getElementById('expDateInput') as HTMLInputElement;
                   const typeInput = document.getElementById('expTypeInput') as HTMLSelectElement;
                   const vehicleInput = document.getElementById('expVehicleInput') as HTMLInputElement;
                   const driverInput = document.getElementById('expDriverInput') as HTMLInputElement;
                   const amountInput = document.getElementById('expAmountInput') as HTMLInputElement;
                   const descInput = document.getElementById('expDescInput') as HTMLTextAreaElement;
                   
                   const formatDate = (dateStr: string) => {
                     if (!dateStr) return '';
                     const parts = dateStr.split('-');
                     return parts.length === 3 ? parts[2] + '/' + parts[1] + '/' + parts[0] : dateStr;
                   };

                   const newExpense = {
                      id: editingExpense?.id || Date.now().toString(),
                      date: formatDate(dateInput.value),
                      type: typeInput.value,
                      vehicle: vehicleInput.value,
                      driver: driverInput.value,
                      amount: parseInt(amountInput.value) || 0,
                      description: descInput.value
                   };
                   
                   let newExpenses = [...expenses];
                   if (editingExpense) {
                      newExpenses = newExpenses.map(e => e.id === editingExpense.id ? newExpense : e);
                   } else {
                      newExpenses.unshift(newExpense);
                   }
                   setExpenses(newExpenses);
                   setShowModal(false);
                }} className="px-4 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">Save Expense</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
