export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string; // ISO date string
  created_at: string;
  updated_at: string;
}

export interface CreateTransactionData {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string; // ISO date string
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id: string;
}

export interface MonthlyStats {
  month: string; // YYYY-MM format
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  transactionCount: number;
}