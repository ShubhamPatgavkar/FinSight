import { Transaction } from '../types';

export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions.csv') => {
  const headers = ['Date', 'User', 'Category', 'Amount', 'Status', 'Description'];
  
  const csvContent = [
    headers.join(','),
    ...transactions.map(transaction => [
      transaction.date,
      `"${transaction.user.name}"`,
      transaction.category,
      transaction.amount,
      transaction.status,
      `"${transaction.description}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};