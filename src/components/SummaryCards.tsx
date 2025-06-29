import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { SummaryMetrics } from '../types';

interface SummaryCardsProps {
  metrics: SummaryMetrics;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: metrics.totalRevenue,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      change: '+12.5%'
    },
    {
      title: 'Total Expenses',
      value: metrics.totalExpenses,
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      change: '+8.2%'
    },
    {
      title: 'Net Profit/Loss',
      value: metrics.netProfit,
      icon: DollarSign,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      change: '+15.3%'
    },
    {
      title: 'Total Transactions',
      value: metrics.totalTransactions,
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      change: '+5.7%',
      isCount: true
    }
  ];

  const formatValue = (value: number, isCount: boolean = false) => {
    if (isCount) return value.toLocaleString();
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <span className="text-sm text-green-400 font-medium">{card.change}</span>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-white mb-1">
                {formatValue(card.value, card.isCount)}
              </p>
              <p className="text-sm text-slate-400">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};