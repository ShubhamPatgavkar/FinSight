import React, { useState } from 'react';
import { Download, Calendar, FileText, TrendingUp } from 'lucide-react';
import { useDashboard } from '../hooks/useDashboard';
import { useTransactions } from '../hooks/useTransactions';
import { exportToCSV } from '../utils/csvExport';

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const { dashboardData } = useDashboard();
  const { transactions } = useTransactions({
    dateRange,
    category: 'All Categories',
    status: 'All Status',
    search: ''
  });

  const generateReport = (type: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (type) {
      case 'transactions':
        exportToCSV(transactions, `transactions-report-${timestamp}.csv`);
        break;
      case 'summary':
        if (dashboardData) {
          const summaryData = [
            {
              metric: 'Total Revenue',
              value: dashboardData.summary.totalRevenue,
              period: `${dateRange.start} to ${dateRange.end}`
            },
            {
              metric: 'Total Expenses',
              value: dashboardData.summary.totalExpenses,
              period: `${dateRange.start} to ${dateRange.end}`
            },
            {
              metric: 'Net Profit',
              value: dashboardData.summary.netProfit,
              period: `${dateRange.start} to ${dateRange.end}`
            },
            {
              metric: 'Total Transactions',
              value: dashboardData.summary.totalTransactions,
              period: `${dateRange.start} to ${dateRange.end}`
            }
          ];
          
          const csvContent = [
            ['Metric', 'Value', 'Period'].join(','),
            ...summaryData.map(item => [
              item.metric,
              item.value,
              item.period
            ].join(','))
          ].join('\n');

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', `summary-report-${timestamp}.csv`);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        break;
    }
  };

  const reportTypes = [
    {
      title: 'Transaction Report',
      description: 'Detailed list of all transactions within the selected date range',
      icon: FileText,
      type: 'transactions',
      color: 'bg-blue-500'
    },
    {
      title: 'Financial Summary',
      description: 'High-level overview of revenue, expenses, and profit metrics',
      icon: TrendingUp,
      type: 'summary',
      color: 'bg-green-500'
    },
    {
      title: 'Category Analysis',
      description: 'Breakdown of spending and income by category',
      icon: Calendar,
      type: 'category',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Reports</h2>
        <p className="text-slate-400">Generate and export detailed financial reports</p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Report Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none border border-slate-600"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          
          return (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${report.color}/20`}>
                  <Icon className={`w-6 h-6 text-white`} />
                </div>
                <h3 className="text-lg font-semibold text-white">{report.title}</h3>
              </div>
              
              <p className="text-slate-400 text-sm mb-6">{report.description}</p>
              
              <button
                onClick={() => generateReport(report.type)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          );
        })}
      </div>

      {dashboardData && (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                ${dashboardData.summary.totalRevenue.toLocaleString()}
              </p>
              <p className="text-slate-400 text-sm">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">
                ${dashboardData.summary.totalExpenses.toLocaleString()}
              </p>
              <p className="text-slate-400 text-sm">Total Expenses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                ${dashboardData.summary.netProfit.toLocaleString()}
              </p>
              <p className="text-slate-400 text-sm">Net Profit</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">
                {dashboardData.summary.totalTransactions}
              </p>
              <p className="text-slate-400 text-sm">Transactions</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};