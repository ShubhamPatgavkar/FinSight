import React, { useState } from 'react';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Transaction } from '../types';
import { TransactionModal } from './TransactionModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onTransactionUpdated: () => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ 
  transactions, 
  loading, 
  onTransactionUpdated 
}) => {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    return {
      formatted: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(Math.abs(amount)),
      isPositive,
      className: isPositive ? 'text-green-400' : 'text-red-400'
    };
  };

  const handleDelete = async () => {
    if (!deletingTransaction) return;
    
    try {
      setIsDeleting(true);
      await axios.delete(`/transactions/${deletingTransaction.id}`);
      toast.success('Transaction deleted successfully!');
      onTransactionUpdated();
      setDeletingTransaction(null);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete transaction';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setOpenDropdown(null);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setDeletingTransaction(transaction);
    setOpenDropdown(null);
  };

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="p-8 text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        
        {transactions.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-slate-300">User</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-300">Date</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-300">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-300">Amount</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-300">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const amount = formatAmount(transaction.amount);
                  
                  return (
                    <tr key={transaction.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={transaction.user.avatar}
                            alt={transaction.user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-white font-medium">{transaction.user.name}</p>
                            <p className="text-slate-400 text-sm">{transaction.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">{formatDate(transaction.date)}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-slate-600 text-slate-300 rounded-full text-sm">
                          {transaction.category}
                        </span>
                      </td>
                      <td className={`py-4 px-6 font-semibold ${amount.className}`}>
                        {amount.isPositive ? '+' : '-'}{amount.formatted}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          transaction.status === 'Paid' 
                            ? 'bg-green-400/20 text-green-400' 
                            : 'bg-yellow-400/20 text-yellow-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <button
                            onClick={() => setOpenDropdown(openDropdown === transaction.id ? null : transaction.id)}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          
                          {openDropdown === transaction.id && (
                            <div className="absolute right-0 top-full mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                              <button
                                onClick={() => handleEdit(transaction)}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteClick(transaction)}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-slate-600 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingTransaction && (
        <TransactionModal
          mode="edit"
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onTransactionUpdated={() => {
            setEditingTransaction(null);
            onTransactionUpdated();
          }}
        />
      )}

      {deletingTransaction && (
        <DeleteConfirmModal
          title="Delete Transaction"
          message="Are you sure you want to delete this transaction? This action cannot be undone."
          onClose={() => setDeletingTransaction(null)}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};