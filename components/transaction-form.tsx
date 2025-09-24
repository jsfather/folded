"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createTransaction,
  updateTransaction,
} from "@/lib/services/transactions";
import { Transaction, CreateTransactionData } from "@/lib/types/transaction";
import { translations } from "@/lib/translations";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

interface TransactionFormProps {
  transaction?: Transaction;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TransactionForm({
  transaction,
  onSuccess,
  onCancel,
}: TransactionFormProps) {
  const [formData, setFormData] = useState<CreateTransactionData>({
    type: transaction?.type || "expense",
    amount: transaction?.amount || 0,
    description: transaction?.description || "",
    date: transaction?.date || new Date().toISOString().split("T")[0],
  });
  const [selectedDate, setSelectedDate] = useState<DateObject>(
    transaction?.date
      ? new DateObject(new Date(transaction.date))
      : new DateObject()
  );
  const [useCurrentTime, setUseCurrentTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Convert Persian date to Gregorian for database storage
      const dateToStore = useCurrentTime
        ? new Date().toISOString().split("T")[0]
        : selectedDate.toDate().toISOString().split("T")[0];

      const dataToSubmit = {
        ...formData,
        date: dateToStore,
      };

      if (transaction) {
        await updateTransaction({ ...dataToSubmit, id: transaction.id });
      } else {
        await createTransaction(dataToSubmit);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : translations.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {transaction
            ? translations.editTransaction
            : translations.addTransaction}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">{translations.type}</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as "income" | "expense",
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
              required
            >
              <option value="expense">{translations.expense}</option>
              <option value="income">{translations.income}</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">{translations.amount}</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              required
              className="text-left"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{translations.description}</Label>
            <Input
              id="description"
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">{translations.date}</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useCurrentTime"
                  checked={useCurrentTime}
                  onChange={(e) => setUseCurrentTime(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="useCurrentTime" className="text-sm">
                  {translations.useCurrentTime}
                </Label>
              </div>
              {!useCurrentTime && (
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => {
                    if (date && typeof date === "object" && "toDate" in date) {
                      setSelectedDate(date as DateObject);
                    }
                  }}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder={translations.selectDate}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                />
              )}
              {useCurrentTime && (
                <div className="text-sm text-gray-600 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  {new DateObject()
                    .convert(persian, persian_fa)
                    .format("YYYY/MM/DD HH:mm")}
                </div>
              )}
            </div>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading
                ? `${translations.loading}`
                : transaction
                ? translations.edit
                : translations.add}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              {translations.cancel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
