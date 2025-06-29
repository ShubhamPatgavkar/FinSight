import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  TrendingUp, 
  PieChart, 
  Settings, 
  FileText,
  Wallet,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', active: true },
  { id: 'transactions', icon: CreditCard, label: 'Transactions' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
  { id: 'reports', icon: PieChart, label: 'Reports' },
  { id: 'wallet', icon: Wallet, label: 'Wallet' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'documents', icon: FileText, label: 'Documents' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemSelect }) => {
  return (
    <aside className="bg-slate-900 w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemSelect(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};