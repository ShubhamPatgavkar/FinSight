import React from 'react';
import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const WalletPage: React.FC = () => {
  const walletData = {
    balance: 45210.50,
    cards: [
      {
        id: 1,
        type: 'Primary',
        number: '**** **** **** 4532',
        balance: 25000,
        color: 'bg-gradient-to-r from-blue-600 to-purple-600'
      },
      {
        id: 2,
        type: 'Business',
        number: '**** **** **** 8901',
        balance: 20210.50,
        color: 'bg-gradient-to-r from-green-600 to-teal-600'
      }
    ],
    recentActivity: [
      { id: 1, type: 'income', description: 'Salary Deposit', amount: 5000, date: '2024-01-15' },
      { id: 2, type: 'expense', description: 'Office Rent', amount: -1200, date: '2024-01-14' },
      { id: 3, type: 'income', description: 'Freelance Project', amount: 2500, date: '2024-01-13' },
      { id: 4, type: 'expense', description: 'Software License', amount: -299, date: '2024-01-12' }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Wallet</h2>
        <p className="text-slate-400">Manage your accounts and view recent activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Total Balance</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Funds</span>
              </button>
            </div>
            <p className="text-4xl font-bold text-white mb-2">
              ${walletData.balance.toLocaleString()}
            </p>
            <p className="text-green-400 text-sm">+12.5% from last month</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Your Cards</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Add Card</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {walletData.cards.map((card) => (
                <div key={card.id} className={`${card.color} p-6 rounded-xl text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm opacity-80">{card.type}</span>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <p className="text-lg font-mono mb-4">{card.number}</p>
                  <p className="text-2xl font-bold">${card.balance.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {walletData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'income' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {activity.type === 'income' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{activity.description}</p>
                    <p className="text-slate-400 text-xs">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  activity.amount > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ArrowUpRight className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Send Money</h3>
          <p className="text-slate-400 text-sm mb-4">Transfer funds to other accounts</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Send
          </button>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ArrowDownLeft className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Request Money</h3>
          <p className="text-slate-400 text-sm mb-4">Request payment from others</p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            Request
          </button>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-white font-semibold mb-2">Pay Bills</h3>
          <p className="text-slate-400 text-sm mb-4">Pay your bills directly</p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
            Pay Bills
          </button>
        </div>
      </div>
    </div>
  );
};