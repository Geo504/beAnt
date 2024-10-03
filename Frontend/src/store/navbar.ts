import { create } from 'zustand';

type UserData = {
  id: string;
  email: string;
};

type Store = {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  profileUrlImage: string;
  setProfileUrlImage: (url: string) => void;
}

export const useNavbarStore = create<Store>()((set) => ({
  userData: null,
  setUserData: (data: UserData | null) => set({userData: data}),
  profileUrlImage: "",
  setProfileUrlImage: (url: string) => set({profileUrlImage: url}),
}))