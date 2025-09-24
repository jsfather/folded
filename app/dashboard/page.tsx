"use client";

import { useState, useEffect } from "react";
import { Transaction, MonthlyStats } from "@/lib/types/transaction";
import { getTransactions, getMonthlyStats } from "@/lib/services/transactions";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { MonthlyStatsComponent } from "@/components/monthly-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BarChart3 } from "lucide-react";
import { Header } from "@/components/header";
import { translations } from "@/lib/translations";

type View = "transactions" | "stats" | "add" | "edit";

export default function Dashboard() {
  const [view, setView] = useState<View>("transactions");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    return new Date().toISOString().substring(0, 7); // YYYY-MM
  });
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [transactionsData, statsData] = await Promise.all([
        getTransactions(selectedMonth),
        getMonthlyStats(new Date().getFullYear()),
      ]);

      setTransactions(transactionsData);
      setMonthlyStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFormSuccess = () => {
    setView("transactions");
    setSelectedTransaction(undefined);
    loadData();
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setView("edit");
  };

  const handleCancel = () => {
    setView("transactions");
    setSelectedTransaction(undefined);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{translations.loadingExpenseTracker}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-red-600 mb-4">{error}</div>
            <Button onClick={loadData} className="w-full">
              {translations.tryAgain}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddTransaction = () => {
    setView("add");
    setSelectedTransaction(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onAddTransaction={handleAddTransaction} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={view === "transactions" ? "default" : "outline"}
            onClick={() => setView("transactions")}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            {translations.transactions}
          </Button>
          <Button
            variant={view === "stats" ? "default" : "outline"}
            onClick={() => setView("stats")}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            {translations.statistics}
          </Button>
        </div>

        {/* Content */}
        {view === "transactions" && (
          <div className="space-y-6">
            {/* Month Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{translations.transactions}</span>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-3 py-1 border rounded-md bg-background"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList
                  transactions={transactions}
                  onEdit={handleEdit}
                  onDelete={loadData}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {view === "stats" && (
          <MonthlyStatsComponent
            stats={monthlyStats}
            currentMonth={selectedMonth}
          />
        )}

        {(view === "add" || view === "edit") && (
          <TransactionForm
            transaction={selectedTransaction}
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
