import express from 'express';
import Transaction from '../models/Transaction.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get dashboard summary
router.get('/summary', auth, async (req, res) => {
  try {
    const userId = req.userId;
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    // Get all transactions for current year
    const transactions = await Transaction.find({
      userId,
      date: { $gte: startOfYear, $lte: endOfYear }
    });

    // Calculate metrics
    const totalRevenue = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netProfit = totalRevenue - totalExpenses;
    const totalTransactions = transactions.length;

    // Monthly data for chart
    const monthlyData = [];
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(currentYear, month, 1);
      const monthEnd = new Date(currentYear, month + 1, 0);
      
      const monthTransactions = transactions.filter(t => 
        t.date >= monthStart && t.date <= monthEnd
      );

      const revenue = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      monthlyData.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        revenue,
        expenses
      });
    }

    // Category breakdown
    const categoryData = {};
    transactions.forEach(transaction => {
      if (!categoryData[transaction.category]) {
        categoryData[transaction.category] = 0;
      }
      categoryData[transaction.category] += transaction.amount;
    });

    const categoryArray = Object.entries(categoryData).map(([name, value], index) => ({
      name,
      value,
      color: [
        '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', 
        '#EF4444', '#06B6D4', '#84CC16', '#F97316'
      ][index % 8]
    }));

    res.json({
      summary: {
        totalRevenue,
        totalExpenses,
        netProfit,
        totalTransactions
      },
      chartData: monthlyData,
      categoryData: categoryArray
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent transactions
router.get('/recent-transactions', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ date: -1 })
      .limit(5)
      .populate('userId', 'firstName lastName avatar');

    res.json({ transactions });
  } catch (error) {
    console.error('Recent transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;