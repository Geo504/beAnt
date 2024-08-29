import { create } from 'zustand';



type Store = {
  profileUrlImage: string;
  setProfileUrlImage: (url: string) => void;
}

export const useNavbarStore = create<Store>()((set) => ({
  profileUrlImage: "",
  setProfileUrlImage: (url: string) => set({profileUrlImage: url}),
}))