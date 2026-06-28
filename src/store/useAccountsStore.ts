import { create } from 'zustand';
import { Banknote, CreditCard, Landmark, Archive, type LucideIcon } from 'lucide-react';

export interface AccountRow {
  id: string;
  name: string;
  balance: number;
  icon: LucideIcon;
  color: string;
}

interface AccountsState {
  accounts: AccountRow[];
  isLoading: boolean;
  fetchAccounts: () => Promise<void>;
}

export const useAccountsStore = create<AccountsState>((set) => ({
  accounts: [],
  isLoading: false,

  fetchAccounts: async () => {
    set({ isLoading: true });

    const mockAccounts: AccountRow[] = [
      { id: '1', name: 'Нақд UZS касса', balance: 184300000, icon: Banknote, color: 'var(--naf-chart-series-4)' },
      { id: '2', name: 'Пластик CLICK карта', balance: 96750000, icon: CreditCard, color: 'var(--naf-chart-series-2)' },
      { id: '3', name: 'Банк ҳ/р', balance: 412800000, icon: Landmark, color: 'var(--naf-accent)' },
      { id: '4', name: 'Нақд захира', balance: 25600000, icon: Archive, color: 'var(--naf-chart-series-5)' },
    ];

    set({ accounts: mockAccounts, isLoading: false });
  },
}));
