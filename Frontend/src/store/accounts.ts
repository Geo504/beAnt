import { create } from 'zustand';



type Store = {
  favoriteAccountId: string;
  setFavoriteAccountId: (accountId: string) => void;
  selectedAccountId: string;
  setSelectedAccountId: (accountId: string) => void;
}

export const useAccountsStore = create<Store>((set) => ({
  favoriteAccountId: "",
  setFavoriteAccountId: (accountId: string ) => set({favoriteAccountId: accountId}),
  selectedAccountId: "",
  setSelectedAccountId: (accountId: string) => set({selectedAccountId: accountId}),
}))