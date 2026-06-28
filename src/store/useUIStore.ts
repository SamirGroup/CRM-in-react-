import { create } from 'zustand';

interface UIState {
  isMobileNavOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
  
  // Actions
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  toggleSearch: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  isSearchOpen: false,
  activeModal: null,

  toggleMobileNav: () => {
    set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen }));
  },

  closeMobileNav: () => {
    set({ isMobileNavOpen: false });
  },

  toggleSearch: () => {
    set((state) => ({ isSearchOpen: !state.isSearchOpen }));
  },

  openModal: (modalId: string) => {
    set({ activeModal: modalId });
  },

  closeModal: () => {
    set({ activeModal: null });
  },
}));
