import { Transaction, ChartData, CategoryData, SummaryMetrics } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    category: 'Software',
    amount: 2500,
    status: 'Paid',
    user: {
      name: 'John Smith',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
    },
    description: 'Annual software license'
  },
  {
    id: '2',
    date: '2024-01-14',
    category: 'Marketing',
    amount: -1200,
    status: 'Paid',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
    },
    description: 'Digital advertising campaign'
  },
  {
    id: '3',
    date: '2024-01-13',
    category: 'Consulting',
    amount: 5000,
    status: 'Pending',
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
    },
    description: 'Strategic consulting project'
  },
  {
    id: '4',
    date: '2024-01-12',
    category: 'Office Supplies',
    amount: -350,
    status: 'Paid',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/2381019/pexels-photo-2381019.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
    },
    description: 'Monthly office supplies'
  },
  {
    id: '5',
    date: '2024-01-11',
    category: 'Sales',
    amount: 3200,
    status: 'Paid',
    user: {
      name: 'David Brown',
      avatar: 'https://images.pexels.com/photos/2381022/pexels-photo-2381022.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
    },
    description: 'Product sales revenue'
  },
  {
    id: '6',
    date: '2024-01-10',
    category: 'Utilities',
    amount: -450,
    status: 'Pending',
    user: {
      name: 'Lisa Davis',
      avatar: 'https://images.pexels.com/photos/2381020/pexels-photo-2381020.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
    },
    description: 'Monthly utility bills'
  }
];

export const chartData: ChartData[] = [
  { month: 'Jan', revenue: 12000, expenses: 8000 },
  { month: 'Feb', revenue: 15000, expenses: 9500 },
  { month: 'Mar', revenue: 18000, expenses: 11000 },
  { month: 'Apr', revenue: 16000, expenses: 10500 },
  { month: 'May', revenue: 22000, expenses: 13000 },
  { month: 'Jun', revenue: 25000, expenses: 15000 },
  { month: 'Jul', revenue: 28000, expenses: 16500 },
  { month: 'Aug', revenue: 24000, expenses: 14000 },
  { month: 'Sep', revenue: 26000, expenses: 15500 },
  { month: 'Oct', revenue: 30000, expenses: 18000 },
  { month: 'Nov', revenue: 32000, expenses: 19000 },
  { month: 'Dec', revenue: 35000, expenses: 20000 }
];

export const categoryData: CategoryData[] = [
  { name: 'Software', value: 15000, color: '#3B82F6' },
  { name: 'Marketing', value: 12000, color: '#8B5CF6' },
  { name: 'Office Supplies', value: 8000, color: '#10B981' },
  { name: 'Utilities', value: 6000, color: '#F59E0B' },
  { name: 'Consulting', value: 10000, color: '#EF4444' },
  { name: 'Sales', value: 25000, color: '#06B6D4' }
];

export const summaryMetrics: SummaryMetrics = {
  totalRevenue: 285000,
  totalExpenses: 175000,
  netProfit: 110000,
  totalTransactions: 1250
};