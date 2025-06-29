export interface Transaction {
  id: string;
  date: string;
  category: string;
  amount: number;
  status: 'Paid' | 'Pending';
  user: {
    name: string;
    avatar: string;
  };
  description: string;
}

export interface SummaryMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  totalTransactions: number;
}

export interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface FilterState {
  dateRange: {
    start: string;
    end: string;
  };
  category: string;
  status: string;
  search: string;
}