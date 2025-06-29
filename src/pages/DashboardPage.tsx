import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { SummaryCards } from '../components/SummaryCards';
import { RevenueChart } from '../components/RevenueChart';
import { CategoryChart } from '../components/CategoryChart';
import { TransactionFilters } from '../components/TransactionFilters';
import { TransactionTable } from '../components/TransactionTable';
import { TransactionModal } from '../components/TransactionModal';
import { TransactionsPage } from './TransactionsPage';
import { AnalyticsPage } from './AnalyticsPage';
import { ReportsPage } from './ReportsPage';
import { WalletPage } from './WalletPage';
import { SettingsPage } from './SettingsPage';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../hooks/useDashboard';
import { useTransactions } from '../hooks/useTransactions';
import { exportToCSV } from '../utils/csvExport';
import { FilterState } from '../types';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: '', end: '' },
    category: 'All Categories',
    status: 'All Status',
    search: ''
  });

  const { dashboardData, loading: dashboardLoading } = useDashboard();
  const { transactions, loading: transactionsLoading, refetch } = useTransactions(filters);

  const handleExport = () => {
    if (transactions.length > 0) {
      exportToCSV(transactions, `finsight-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  const handleTransactionAdded = () => {
    refetch();
    setShowAddModal(false);
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'transactions':
        return <TransactionsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'wallet':
        return <WalletPage />;
      case 'settings':
        return <SettingsPage />;
      case 'users':
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">Users Management</h3>
            <p className="text-slate-400">This feature is coming soon!</p>
          </div>
        );
      case 'documents':
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">Document Management</h3>
            <p className="text-slate-400">This feature is coming soon!</p>
          </div>
        );
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Financial Dashboard</h2>
                <p className="text-slate-400">Monitor your financial performance and track key metrics</p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <span>+</span>
                <span>Add Transaction</span>
              </button>
            </div>
            
            {dashboardData && (
              <>
                <SummaryCards metrics={dashboardData.summary} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <RevenueChart data={dashboardData.chartData} />
                  <CategoryChart data={dashboardData.categoryData} />
                </div>
              </>
            )}
            
            <TransactionFilters 
              filters={filters}
              onFiltersChange={setFilters}
              onExport={handleExport}
            />
            
            <TransactionTable 
              transactions={transactions} 
              loading={transactionsLoading}
              onTransactionUpdated={refetch}
            />
          </>
        );
    }
  };

  if (dashboardLoading && activeMenuItem === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar activeItem={activeMenuItem} onItemSelect={setActiveMenuItem} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={user?.fullName || 'User'} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {showAddModal && (
        <TransactionModal
          mode="add"
          onClose={() => setShowAddModal(false)}
          onTransactionUpdated={handleTransactionAdded}
        />
      )}
    </div>
  );
};