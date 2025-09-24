'use client';

import { MonthlyStats } from '@/lib/types/transaction';
import { formatCurrency } from '@/lib/services/transactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface MonthlyStatsProps {
  stats: MonthlyStats[];
  currentMonth: string;
}

export function MonthlyStatsComponent({ stats, currentMonth }: MonthlyStatsProps) {
  const currentMonthStats = stats.find(stat => stat.month === currentMonth);
  const totalIncome = stats.reduce((sum, stat) => sum + stat.totalIncome, 0);
  const totalExpenses = stats.reduce((sum, stat) => sum + stat.totalExpenses, 0);
  const netTotal = totalIncome - totalExpenses;

  const formatMonthName = (monthStr: string) => {
    const date = new Date(monthStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-6">
      {/* Current Month Overview */}
      {currentMonthStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Income This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(currentMonthStats.totalIncome)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expenses This Month</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(currentMonthStats.totalExpenses)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net This Month</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                currentMonthStats.netAmount >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(currentMonthStats.netAmount)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Total Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Net Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${
              netTotal >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(netTotal)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      {stats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.month} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <h3 className="font-medium">{formatMonthName(stat.month)}</h3>
                    <p className="text-sm text-gray-500">{stat.transactionCount} transactions</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600">
                      Income: {formatCurrency(stat.totalIncome)}
                    </div>
                    <div className="text-sm text-red-600">
                      Expenses: {formatCurrency(stat.totalExpenses)}
                    </div>
                    <div className={`font-medium ${
                      stat.netAmount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Net: {formatCurrency(stat.netAmount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}