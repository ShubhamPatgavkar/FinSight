import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

interface TransactionFormData {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  status: 'Paid' | 'Pending';
}

interface TransactionModalProps {
  onClose: () => void;
  onTransactionUpdated: () => void;
  transaction?: any;
  mode: 'add' | 'edit';
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  onClose,
  onTransactionUpdated,
  transaction,
  mode
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<TransactionFormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      status: 'Paid'
    }
  });

  const transactionType = watch('type');

  useEffect(() => {
    if (mode === 'edit' && transaction) {
      reset({
        type: transaction.amount > 0 ? 'income' : 'expense',
        category: transaction.category,
        amount: Math.abs(transaction.amount),
        description: transaction.description,
        date: transaction.date.split('T')[0],
        status: transaction.status
      });
    }
  }, [mode, transaction, reset]);

  const categories = [
    'Software', 'Marketing', 'Consulting', 'Office Supplies', 
    'Utilities', 'Sales', 'Investment', 'Freelance', 'Salary', 'Other'
  ];

  const onSubmit = async (data: TransactionFormData) => {
    try {
      if (mode === 'add') {
        await axios.post('/transactions', data);
        toast.success('Transaction added successfully!');
      } else {
        await axios.put(`/transactions/${transaction.id}`, data);
        toast.success('Transaction updated successfully!');
      }
      onTransactionUpdated();
    } catch (error: any) {
      const message = error.response?.data?.message || `Failed to ${mode} transaction`;
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">
            {mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="income"
                  {...register('type', { required: 'Transaction type is required' })}
                  className="text-green-500 focus:ring-green-500"
                />
                <span className="text-green-400">Income</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="expense"
                  {...register('type', { required: 'Transaction type is required' })}
                  className="text-red-500 focus:ring-red-500"
                />
                <span className="text-red-400">Expense</span>
              </label>
            </div>
            {errors.type && (
              <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Category
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full bg-slate-700 text-white rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-slate-600"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be greater than 0' }
                })}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-slate-600"
                placeholder="0.00"
              />
            </div>
            {errors.amount && (
              <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={3}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-slate-600 resize-none"
                placeholder="Enter transaction description"
              />
            </div>
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="date"
                  {...register('date', { required: 'Date is required' })}
                  className="w-full bg-slate-700 text-white rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-slate-600"
                />
              </div>
              {errors.date && (
                <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status
              </label>
              <select
                {...register('status')}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-slate-600"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                mode === 'add' ? 'Add Transaction' : 'Update Transaction'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};