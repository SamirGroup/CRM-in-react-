import { create } from 'zustand';
import type { Branch } from '@/types';

interface BranchesState {
  branches: Branch[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchBranches: () => Promise<void>;
  addBranch: (branch: Branch) => void;
  updateBranch: (id: string, branch: Partial<Branch>) => void;
  deleteBranch: (id: string) => void;
  setActiveBranch: (id: string) => void;
  activeBranchId: string | null;
}

export const useBranchesStore = create<BranchesState>((set, get) => ({
  branches: [],
  isLoading: false,
  error: null,
  activeBranchId: null,

  fetchBranches: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: API chaqiruvni qo'shish
      // const data = await branchesApi.getAll();
      
      // Mock data (hozircha)
      const mockBranches: Branch[] = [
        {
          id: '1',
          name: 'Toshkent Markaziy',
          address: 'Toshkent sh., Amir Temur ko\'chasi 1',
          phone: '+998 71 123 45 67',
          is_active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Samarqand',
          address: 'Samarqand sh., Registon ko\'chasi 10',
          phone: '+998 66 234 56 78',
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ];
      
      set({ branches: mockBranches, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Filiallarni yuklash xatosi',
        isLoading: false 
      });
    }
  },

  addBranch: (branch: Branch) => {
    set((state) => ({ branches: [...state.branches, branch] }));
  },

  updateBranch: (id: string, update: Partial<Branch>) => {
    set((state) => ({
      branches: state.branches.map((b) =>
        b.id === id ? { ...b, ...update } : b
      ),
    }));
  },

  deleteBranch: (id: string) => {
    set((state) => ({
      branches: state.branches.filter((b) => b.id !== id),
    }));
  },

  setActiveBranch: (id: string) => {
    set({ activeBranchId: id });
  },
}));
