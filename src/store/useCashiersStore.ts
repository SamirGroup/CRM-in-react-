import { create } from 'zustand';

export interface CashierRow {
  id: string;
  account: string;
  sales: number;
  salesCount: number;
  avgCheck: number;
  creditSales: number;
  discount: number;
  returns: number;
  income: number;
  expense: number;
}

interface CashiersState {
  cashiers: CashierRow[];
  isLoading: boolean;
  fetchCashiers: () => Promise<void>;
}

export const useCashiersStore = create<CashiersState>((set) => ({
  cashiers: [],
  isLoading: false,

  fetchCashiers: async () => {
    set({ isLoading: true });

    const mockCashiers: CashierRow[] = [
      {
        id: '1',
        account: 'Админ CONDOR BAZA SKLAD',
        sales: 48500000,
        salesCount: 62,
        avgCheck: 782258,
        creditSales: 4200000,
        discount: 1150000,
        returns: 980000,
        income: 47300000,
        expense: 3200000,
      },
      {
        id: '2',
        account: 'Касса CONDOR BAZA SKLAD',
        sales: 77250000,
        salesCount: 91,
        avgCheck: 849450,
        creditSales: 6800000,
        discount: 2050000,
        returns: 1420000,
        income: 75600000,
        expense: 5400000,
      },
      {
        id: '3',
        account: 'Сотувчи Зарина К.',
        sales: 31600000,
        salesCount: 47,
        avgCheck: 672340,
        creditSales: 1900000,
        discount: 760000,
        returns: 540000,
        income: 31000000,
        expense: 1800000,
      },
    ];

    set({ cashiers: mockCashiers, isLoading: false });
  },
}));
