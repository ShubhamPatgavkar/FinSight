import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionFilters } from '../components/TransactionFilters';
import { TransactionTable } from '../components/TransactionTable';
import { TransactionModal } from '../components/TransactionModal';
import { useTransactions } from '../hooks/useTransactions';
import { exportToCSV } from '../utils/csvExport';
import { FilterState } from '../types';

export const TransactionsPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: '', end: '' },
    category: 'All Categories',
    status: 'All Status',
    search: ''
  });

  const { transactions, loading, refetch } = useTransactions(filters);

  const handleExport = () => {
    if (transactions.length > 0) {
      exportToCSV(transactions, `finsight-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    }
  };

  const handleTransactionUpdated = () => {
    refetch();
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Transactions</h2>
          <p className="text-slate-400">Manage and track all your financial transactions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </button>
      </div>
      
      <TransactionFilters 
        filters={filters}
        onFiltersChange={setFilters}
        onExport={handleExport}
      />
      
      <TransactionTable 
        transactions={transactions} 
        loading={loading}
        onTransactionUpdated={refetch}
      />

      {showAddModal && (
        <TransactionModal
          mode="add"
          onClose={() => setShowAddModal(false)}
          onTransactionUpdated={handleTransactionUpdated}
        />
      )}
    </div>
  );
};