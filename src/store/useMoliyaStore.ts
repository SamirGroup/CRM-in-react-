import { create } from 'zustand';
import type { MoliyaTransaction, MoliyaPlan } from '@/types';

interface MoliyaState {
  transactions: MoliyaTransaction[];
  plans: MoliyaPlan[];
  incomeCategories: string[];
  expenseCategories: string[];
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  addTransaction: (tx: MoliyaTransaction) => void;
  addPlan: (plan: MoliyaPlan) => void;
  addCategory: (type: 'income' | 'expense', name: string) => void;
}

export const useMoliyaStore = create<MoliyaState>((set) => ({
  transactions: [],
  plans: [],
  incomeCategories: ['Сотувдан тушум', 'Қарз қайтаришдан тушум', 'Бошқа тушум'],
  expenseCategories: ['Ижара', 'Иш ҳақи', 'Логистика', 'Бошқа харажат'],
  isLoading: false,

  fetchTransactions: async () => {
    set({ isLoading: true });

    const today = new Date().toISOString();
    const mockTransactions: MoliyaTransaction[] = [
      { id: 't1', type: 'income', amount: 4500000, accountId: '1', accountName: 'Нақд UZS касса', category: 'Сотувдан тушум', contact: 'Алишер Каримов', date: today, created_at: today },
      { id: 't2', type: 'income', amount: 1800000, accountId: '3', accountName: 'Банк ҳ/р', category: 'Қарз қайтаришдан тушум', date: today, created_at: today },
      { id: 't3', type: 'expense', amount: 1200000, accountId: '3', accountName: 'Банк ҳ/р', category: 'Ижара', date: today, created_at: today },
      { id: 't4', type: 'expense', amount: 650000, accountId: '1', accountName: 'Нақд UZS касса', category: 'Логистика', date: today, created_at: today },
    ];

    set({ transactions: mockTransactions, isLoading: false });
  },

  fetchPlans: async () => {
    set({ isLoading: true });

    const month = new Date().toISOString().slice(0, 7);
    const now = new Date().toISOString();
    const mockPlans: MoliyaPlan[] = [
      { id: 'p1', type: 'income', amount: 80000000, category: 'Сотувдан тушум', period: month, created_at: now },
      { id: 'p2', type: 'expense', amount: 45000000, category: 'Ижара', period: month, created_at: now },
    ];

    set({ plans: mockPlans, isLoading: false });
  },

  addTransaction: (tx) => {
    set((state) => ({ transactions: [tx, ...state.transactions] }));
  },

  addPlan: (plan) => {
    set((state) => ({ plans: [plan, ...state.plans] }));
  },

  addCategory: (type, name) => {
    if (type === 'income') {
      set((state) => ({ incomeCategories: [...state.incomeCategories, name] }));
    } else {
      set((state) => ({ expenseCategories: [...state.expenseCategories, name] }));
    }
  },
}));
