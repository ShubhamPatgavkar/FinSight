import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { RevenueChart } from '../components/RevenueChart';
import { CategoryChart } from '../components/CategoryChart';
import { useDashboard } from '../hooks/useDashboard';

export const AnalyticsPage: React.FC = () => {
  const { dashboardData, loading } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const growthMetrics = [
    {
      title: 'Revenue Growth',
      value: '+12.5%',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      description: 'vs last month'
    },
    {
      title: 'Expense Growth',
      value: '+8.2%',
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      description: 'vs last month'
    },
    {
      title: 'Profit Margin',
      value: '38.6%',
      icon: DollarSign,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      description: 'current margin'
    },
    {
      title: 'Transaction Volume',
      value: '+15.3%',
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      description: 'vs last month'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Analytics</h2>
        <p className="text-slate-400">Detailed insights into your financial performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {growthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          
          return (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              
              <div>
                <p className={`text-2xl font-bold mb-1 ${metric.color}`}>
                  {metric.value}
                </p>
                <p className="text-sm text-slate-400 mb-1">{metric.title}</p>
                <p className="text-xs text-slate-500">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {dashboardData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={dashboardData.chartData} />
          <CategoryChart data={dashboardData.categoryData} />
        </div>
      )}

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <p className="text-slate-300 text-sm">Top Expense Category</p>
                <p className="text-white font-semibold">Marketing</p>
              </div>
              <div className="text-right">
                <p className="text-red-400 font-semibold">$12,000</p>
                <p className="text-slate-400 text-sm">24% of total</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <p className="text-slate-300 text-sm">Top Revenue Source</p>
                <p className="text-white font-semibold">Sales</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold">$25,000</p>
                <p className="text-slate-400 text-sm">42% of total</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <p className="text-slate-300 text-sm">Average Transaction</p>
                <p className="text-white font-semibold">$2,280</p>
              </div>
              <div className="text-right">
                <p className="text-blue-400 font-semibold">+5.2%</p>
                <p className="text-slate-400 text-sm">vs last month</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <p className="text-slate-300 text-sm">Monthly Recurring</p>
                <p className="text-white font-semibold">$8,500</p>
              </div>
              <div className="text-right">
                <p className="text-purple-400 font-semibold">Stable</p>
                <p className="text-slate-400 text-sm">recurring revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};