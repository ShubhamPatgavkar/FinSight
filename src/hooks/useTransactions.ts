import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Transaction, FilterState } from '../types';

export const useTransactions = (filters: FilterState) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.category !== 'All Categories') params.append('category', filters.category);
      if (filters.status !== 'All Status') params.append('status', filters.status);
      if (filters.dateRange.start) params.append('startDate', filters.dateRange.start);
      if (filters.dateRange.end) params.append('endDate', filters.dateRange.end);
      
      const response = await axios.get(`/transactions?${params.toString()}`);
      
      // Transform the data to match the expected format
      const transformedTransactions = response.data.transactions.map((transaction: any) => ({
        id: transaction._id,
        date: transaction.date,
        category: transaction.category,
        amount: transaction.type === 'expense' ? -transaction.amount : transaction.amount,
        status: transaction.status,
        user: {
          name: transaction.userId ? `${transaction.userId.firstName} ${transaction.userId.lastName}` : 'Unknown User',
          avatar: transaction.userId?.avatar || 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
        },
        description: transaction.description
      }));
      
      setTransactions(transformedTransactions);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
};