import { create } from 'zustand';



type Store = {
  currentAccount: {id: string, name: string} | null;
  setCurrentAccount: (data: {id: string, name: string} | null) => void;
}

export const useAccountsStore = create<Store>((set) => ({
  currentAccount: null,
  setCurrentAccount: (data: {id: string, name: string} | null) => set({currentAccount: data}),
}))