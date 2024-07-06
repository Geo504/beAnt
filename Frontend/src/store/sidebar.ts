import { create } from 'zustand';



type Store = {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
  openTag: string;
  setOpenTag: (tag: string) => void;
}

export const useSidebarStore = create<Store>()((set) => ({
  sidebarOpen: false,
  setSidebarOpen: () => set(state => ({ sidebarOpen: !state.sidebarOpen})),
  openTag: "",
  setOpenTag: (tag: string) => set({openTag: tag}),
}))



// export const useStore = create<Store>()((set) => ({
//   user: null,
//   updateUser: (userData: User | null) => set({user: userData }),
// }))