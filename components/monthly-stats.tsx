"use client";

import { MonthlyStats } from "@/lib/types/transaction";
import { formatCurrency } from "@/lib/services/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { translations } from "@/lib/translations";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface MonthlyStatsProps {
  stats: MonthlyStats[];
  currentMonth: string;
}

export function MonthlyStatsComponent({
  stats,
  currentMonth,
}: MonthlyStatsProps) {
  const currentMonthStats = stats.find((stat) => stat.month === currentMonth);
  const totalIncome = stats.reduce((sum, stat) => sum + stat.totalIncome, 0);
  const totalExpenses = stats.reduce(
    (sum, stat) => sum + stat.totalExpenses,
    0
  );
  const netTotal = totalIncome - totalExpenses;

  const formatMonthName = (monthStr: string) => {
    try {
      const date = new Date(monthStr + "-01");
      const jalaliDate = new DateObject(date).convert(persian, persian_fa);
      return jalaliDate.format("MMMM YYYY");
    } catch {
      // Fallback to original format if conversion fails
      const date = new Date(monthStr + "-01");
      return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Month Overview */}
      {currentMonthStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {translations.incomeThisMonth}
              </CardTitle>
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
              <CardTitle className="text-sm font-medium">
                {translations.expensesThisMonth}
              </CardTitle>
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
              <CardTitle className="text-sm font-medium">
                {translations.netThisMonth}
              </CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  currentMonthStats.netAmount >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
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
            <CardTitle className="text-lg">
              {translations.totalIncome}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {translations.totalExpenses}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{translations.netAmount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-3xl font-bold ${
                netTotal >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(netTotal)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Breakdown */}
      {stats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{translations.monthlyBreakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div
                  key={stat.month}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">
                      {formatMonthName(stat.month)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {stat.transactionCount} {translations.transactionsCount}
                    </p>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-green-600">
                      {translations.income}: {formatCurrency(stat.totalIncome)}
                    </div>
                    <div className="text-sm text-red-600">
                      {translations.expense}:{" "}
                      {formatCurrency(stat.totalExpenses)}
                    </div>
                    <div
                      className={`font-medium ${
                        stat.netAmount >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {translations.netAmount}: {formatCurrency(stat.netAmount)}
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
