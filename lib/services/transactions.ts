import { createClient } from "@/lib/supabase/client";
import {
  Transaction,
  CreateTransactionData,
  UpdateTransactionData,
  MonthlyStats,
} from "@/lib/types/transaction";

export async function getTransactions(month?: string): Promise<Transaction[]> {
  const supabase = createClient();

  let query = supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false });

  if (month) {
    const startDate = `${month}-01`;
    const endDate = new Date(
      new Date(startDate).getFullYear(),
      new Date(startDate).getMonth() + 1,
      0
    )
      .toISOString()
      .split("T")[0];

    query = query.gte("date", startDate).lte("date", endDate);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }

  return data || [];
}

export async function createTransaction(
  transactionData: CreateTransactionData
): Promise<Transaction> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      ...transactionData,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create transaction: ${error.message}`);
  }

  return data;
}

export async function updateTransaction(
  transactionData: UpdateTransactionData
): Promise<Transaction> {
  const supabase = createClient();

  const { id, ...updateData } = transactionData;

  const { data, error } = await supabase
    .from("transactions")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update transaction: ${error.message}`);
  }

  return data;
}

export async function deleteTransaction(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete transaction: ${error.message}`);
  }
}

export async function getMonthlyStats(year: number): Promise<MonthlyStats[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select("type, amount, date")
    .gte("date", `${year}-01-01`)
    .lt("date", `${year + 1}-01-01`);

  if (error) {
    throw new Error(`Failed to fetch monthly stats: ${error.message}`);
  }

  // Group by month and calculate stats
  const monthlyData: Record<string, MonthlyStats> = {};

  data?.forEach((transaction) => {
    const month = transaction.date.substring(0, 7); // YYYY-MM

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        totalIncome: 0,
        totalExpenses: 0,
        netAmount: 0,
        transactionCount: 0,
      };
    }

    if (transaction.type === "income") {
      monthlyData[month].totalIncome += Number(transaction.amount);
    } else {
      monthlyData[month].totalExpenses += Number(transaction.amount);
    }

    monthlyData[month].transactionCount++;
  });

  // Calculate net amounts and sort by month
  return Object.values(monthlyData)
    .map((stats) => ({
      ...stats,
      netAmount: stats.totalIncome - stats.totalExpenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
