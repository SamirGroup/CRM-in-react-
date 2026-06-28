import { create } from 'zustand';

export interface CashFlowItem {
  id: string;
  name: string;
  amount: number;
}

export interface AccountFlowRow {
  id: string;
  name: string;
  income: number;
  expense: number;
}

interface CashFlowDetailState {
  incomeItems: CashFlowItem[];
  expenseItems: CashFlowItem[];
  accountFlows: AccountFlowRow[];
  isLoading: boolean;
  fetchDetail: () => Promise<void>;
  updateIncomeAmount: (id: string, amount: number) => void;
  updateExpenseAmount: (id: string, amount: number) => void;
  updateAccountFlow: (id: string, field: 'income' | 'expense', value: number) => void;
}

export const useCashFlowDetailStore = create<CashFlowDetailState>((set) => ({
  incomeItems: [],
  expenseItems: [],
  accountFlows: [],
  isLoading: false,

  fetchDetail: async () => {
    set({ isLoading: true });

    const mockIncome: CashFlowItem[] = [
      { id: 'i1', name: 'Сотувлардан тушум', amount: 75000000 },
      { id: 'i2', name: 'Қарз қайтариш', amount: 6800000 },
      { id: 'i3', name: 'Бошқа тушумлар', amount: 2200000 },
    ];

    const mockExpense: CashFlowItem[] = [
      { id: 'e1', name: 'Маҳсулот харидлари', amount: 32000000 },
      { id: 'e2', name: 'Иш ҳақи', amount: 8500000 },
      { id: 'e3', name: 'Ижара', amount: 3800000 },
      { id: 'e4', name: 'Логистика', amount: 2400000 },
      { id: 'e5', name: 'Бошқа харажатлар', amount: 300000 },
    ];

    const mockAccountFlows: AccountFlowRow[] = [
      { id: 'a1', name: 'Нақд UZS касса', income: 38000000, expense: 22000000 },
      { id: 'a2', name: 'Пластик CLICK карта', income: 24500000, expense: 9800000 },
      { id: 'a3', name: 'Банк ҳ/р', income: 18500000, expense: 14200000 },
      { id: 'a4', name: 'Нақд захира', income: 3000000, expense: 1000000 },
    ];

    set({ incomeItems: mockIncome, expenseItems: mockExpense, accountFlows: mockAccountFlows, isLoading: false });
  },

  updateIncomeAmount: (id, amount) => {
    set((state) => ({
      incomeItems: state.incomeItems.map((item) => (item.id === id ? { ...item, amount } : item)),
    }));
  },

  updateExpenseAmount: (id, amount) => {
    set((state) => ({
      expenseItems: state.expenseItems.map((item) => (item.id === id ? { ...item, amount } : item)),
    }));
  },

  updateAccountFlow: (id, field, value) => {
    set((state) => ({
      accountFlows: state.accountFlows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    }));
  },
}));
